import type { QueryObserverResult } from "@tanstack/svelte-query";
import {
  useGetApiQuoteToken,
  type BaseWatchList,
  type QuoteTokenResponse,
} from "./queries.js";
import { splitArrayAtDelimiters } from "./utils.js";

export type FeedData = {
  [symbol: string]: {
    name: string;
    bid: number;
    ask: number;
    last: number;
  };
};

const QUOTE_CHANNEL = 1;
const CANDLE_CHANNEL = 3;

export function useWebSocket({
  watchlist,
  allFeedData,
}: {
  watchlist?: BaseWatchList;
  allFeedData: FeedData;
}) {
  let apiQuoteToken = $state<QueryObserverResult<
    QuoteTokenResponse,
    Error
  > | null>(null);
  let apiQuoteTokenStore = useGetApiQuoteToken();
  apiQuoteTokenStore.subscribe((value) => {
    apiQuoteToken = value;
  });

  let ws: WebSocket | null = $state(null);

  const feedSubscriptionMessage = $derived.by(
    () => (channel?: typeof QUOTE_CHANNEL | typeof CANDLE_CHANNEL) => {
      const newFeedData: Record<number, {}[]> = {
        [QUOTE_CHANNEL]: [],
        [CANDLE_CHANNEL]: [],
      };
      watchlist?.["watchlist-entries"]?.forEach(({ symbol }) => {
        newFeedData[QUOTE_CHANNEL].push({
          symbol,
          type: "Quote",
        });
        newFeedData[CANDLE_CHANNEL].push({
          symbol,
          type: "Candle",
        });
      }) || [];

      if (!channel || channel === QUOTE_CHANNEL) {
        ws!.send(
          JSON.stringify({
            type: "FEED_SUBSCRIPTION",
            channel: QUOTE_CHANNEL,
            add: newFeedData[QUOTE_CHANNEL],
          }),
        );
      }

      if (!channel || channel === CANDLE_CHANNEL) {
        ws!.send(
          JSON.stringify({
            type: "FEED_SUBSCRIPTION",
            channel: CANDLE_CHANNEL,
            add: newFeedData[CANDLE_CHANNEL],
          }),
        );
      }
    },
  );

  $effect(() => {
    if (apiQuoteToken?.isSuccess) {
      if (!ws) {
        ws = new WebSocket(apiQuoteToken.data.data["dxlink-url"]);
      }

      if (watchlist && WebSocket.OPEN === ws.readyState) {
        feedSubscriptionMessage();
      }

      ws.onopen = () => {
        ws!.send(
          JSON.stringify({
            type: "SETUP",
            channel: 0,
            keepaliveTimeout: 60,
            acceptKeepaliveTimeout: 60,
            version: "1.0.0",
          }),
        );
      };

      ws.onmessage = (event) => {
        const data = JSON.parse(event.data);
        console.log(data);

        switch (data.type) {
          case "SETUP":
            ws!.send(
              JSON.stringify({
                type: "AUTH",
                channel: 0,
                token: apiQuoteToken?.data?.data.token,
              }),
            );
            break;

          case "AUTH_STATE":
            if (data.state === "AUTHORIZED") {
              ws!.send(
                JSON.stringify({
                  type: "CHANNEL_REQUEST",
                  channel: QUOTE_CHANNEL,
                  service: "FEED",
                  parameters: { contract: "AUTO" },
                }),
              );
              ws!.send(
                JSON.stringify({
                  type: "CHANNEL_REQUEST",
                  channel: CANDLE_CHANNEL,
                  service: "FEED",
                  parameters: { contract: "AUTO" },
                }),
              );
            }
            break;

          case "CHANNEL_OPENED":
            feedSubscriptionMessage(data.channel);
            break;

          case "FEED_DATA": {
            splitArrayAtDelimiters(
              data.data[1],
              data.channel === QUOTE_CHANNEL ? "Quote" : "Candle",
            )
              .filter(Array.isArray)
              .forEach((fd) => {
                const newData =
                  data.channel === QUOTE_CHANNEL
                    ? {
                        name: fd[0],
                        bid: fd[6],
                        ask: fd[10],
                      }
                    : {
                        name: fd[0],
                        last: fd[10],
                      };

                allFeedData[fd[0]] = { ...allFeedData[fd[0]], ...newData };
              });
            break;
          }
        }
      };
    }
  });
}

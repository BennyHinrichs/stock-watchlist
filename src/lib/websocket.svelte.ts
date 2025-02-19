import { type QueryObserverResult } from "@tanstack/svelte-query";
import {
  useGetApiQuoteToken,
  type BaseWatchList,
  type QuoteTokenResponse,
} from "./queries.js";
import { splitArrayAtDelimiters } from "./utils.js";
import { allFeedData, symbolData } from "../routes/state.svelte.js";

export type FeedData = {
  [symbol: string]: {
    name: string;
    bid: number;
    ask: number;
    last: number;
  };
};

export type SymbolData = {
  name: string;
  time: string;
  open: number;
  high: number;
  low: number;
  close: number;
};

const QUOTE_CHANNEL = 1;
const CANDLE_CHANNEL = 3;

let ws: WebSocket | null = $state(null);

export function useWebSocket({
  watchlist,
  symbol,
}: {
  watchlist?: BaseWatchList;
  symbol?: string;
}) {
  let apiQuoteToken = $state<QueryObserverResult<
    QuoteTokenResponse,
    Error
  > | null>(null);
  let apiQuoteTokenStore = useGetApiQuoteToken();
  apiQuoteTokenStore.subscribe((value) => {
    apiQuoteToken = value;
  });

  const feedSubscriptionMessage = $derived.by(
    () => (channel?: typeof QUOTE_CHANNEL | typeof CANDLE_CHANNEL) => {
      const newFeedData: Record<number, {}[]> = {
        [QUOTE_CHANNEL]: [],
        [CANDLE_CHANNEL]: [],
      };

      if (watchlist) {
        watchlist["watchlist-entries"]?.forEach(({ symbol }) => {
          newFeedData[QUOTE_CHANNEL].push({
            symbol,
            type: "Quote",
          });
          newFeedData[CANDLE_CHANNEL].push({
            symbol,
            type: "Candle",
          });
        });
      } else if (symbol) {
        newFeedData[CANDLE_CHANNEL].push({
          symbol: `${symbol}{=30m}`,
          type: "Candle",
          fromTime: Date.now() - 1000 * 60 * 60 * 24,
        });
      }

      if (
        newFeedData[QUOTE_CHANNEL].length &&
        (!channel || channel === QUOTE_CHANNEL)
      ) {
        ws!.send(
          JSON.stringify({
            type: "FEED_SUBSCRIPTION",
            channel: QUOTE_CHANNEL,
            add: newFeedData[QUOTE_CHANNEL],
          }),
        );
      }

      if (
        newFeedData[CANDLE_CHANNEL].length &&
        (!channel || channel === CANDLE_CHANNEL)
      ) {
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

      if ((watchlist || symbol) && WebSocket.OPEN === ws.readyState) {
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
            const newData: FeedData = {};
            const newSymbolData: SymbolData[] = [];
            let shouldUpdateSymbol = false;

            splitArrayAtDelimiters(
              data.data[1],
              data.channel === QUOTE_CHANNEL ? "Quote" : "Candle",
            )
              .filter(Array.isArray)
              .forEach((fd) => {
                if (watchlist) {
                  const [name] = fd as [string];
                  const newFdData =
                    data.channel === QUOTE_CHANNEL
                      ? {
                          name,
                          bid: fd[6] as number,
                          ask: fd[10] as number,
                        }
                      : {
                          name,
                          last: fd[10] as number,
                        };

                  newData[name] = {
                    ...allFeedData.current[name],
                    ...newFdData,
                  };
                } else if (symbol && fd[0].includes("{")) {
                  shouldUpdateSymbol = true;
                  if (fd[7] && fd[10]) {
                    newSymbolData.push({
                      name: symbol,
                      time: new Date(fd[4] as number).toISOString(),
                      open: fd[7] as number,
                      high: fd[8] as number,
                      low: fd[9] as number,
                      close: fd[10] as number,
                    });
                  }
                }
              });

            if (watchlist) {
              allFeedData.current = { ...allFeedData.current, ...newData };
            } else if (shouldUpdateSymbol) {
              symbolData.current = [...newSymbolData];
            }
            break;
          }
        }
      };
    }
  });
}

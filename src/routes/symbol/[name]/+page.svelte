<script lang="ts">
  import { base } from "$app/paths";
  import { page } from "$app/state";
  import { useWebSocket, type SymbolData } from "$lib/websocket.svelte.js";
  import { allFeedData, symbolData } from "../../state.svelte.js";
  import {
    Chart,
    Svg,
    Axis,
    Bars,
    Points,
    Highlight,
    Tooltip,
  } from "layerchart";
  import { PeriodType, format } from "@layerstack/utils";
  import { scaleBand, scaleOrdinal } from "d3-scale";
  import { checkUserCredentials } from "$lib/credentials.svelte.js";

  checkUserCredentials(page.url);

  const symbol = page.params.name;

  $effect(() => useWebSocket({ symbol }));
</script>

<div class="flex flex-col justify-between gap-4 py-6 max-sm:flex-col">
  <div class="flex flex-col gap-4">
    <a href={`${base}/`}><h1 class="text-4xl uppercase">👁️ Watchlists 📈</h1></a
    >
    <div class="flex items-end justify-between">
      <h1 class="text-4xl text-amber-400 uppercase" title="symbol name">
        ${symbol}
      </h1>
      <div class="flex flex-col items-end gap-1">
        <span class="text-gray-500 uppercase" title="last price">
          {#if allFeedData.current[symbol]}
            (${allFeedData.current[symbol].last})
          {:else}
            ($?)
          {/if}
        </span>
        <span>Past 24 Hours</span>
      </div>
    </div>
  </div>

  {#if !symbolData[symbol]}
    <p>Loading...</p>
  {:else if symbolData[symbol]?.length === 0}
    <p>No data available</p>
  {:else}
    <div class="h-[300px] rounded border p-4">
      <Chart
        data={symbolData[symbol]}
        x="time"
        xScale={scaleBand().paddingInner(0.4)}
        y={["high", "low"]}
        yNice
        c={(d: SymbolData) => (d.close < d.open ? "desc" : "asc")}
        cScale={scaleOrdinal()}
        cDomain={["desc", "asc"]}
        cRange={["#e41a1c", "#4daf4a"]}
        padding={{ left: 16, bottom: 24 }}
        tooltip={{ mode: "bisect-x" }}
      >
        <Svg>
          <Axis placement="left" grid rule ticks={10} />
          <Axis placement="bottom" rule format={(d) => ""} />
          <Points links={{ class: "stroke-gray-400" }} r={0} />
          <Bars y={(d) => [d.open, d.close]} radius={2} />
          <Highlight area={{ class: "opacity-10" }} />
        </Svg>
        <Tooltip.Root let:data>
          <Tooltip.Header
            >{format(data.time, PeriodType.TimeOnly)}</Tooltip.Header
          >
          <Tooltip.List>
            <Tooltip.Item label="Open" value={data.open} format="decimal" />
            <Tooltip.Item label="Close" value={data.close} format="decimal" />
            <Tooltip.Item label="High" value={data.high} format="decimal" />
            <Tooltip.Item label="Low" value={data.low} format="decimal" />
          </Tooltip.List>
        </Tooltip.Root>
      </Chart>
    </div>
  {/if}
</div>

<script lang="ts">
  import { base } from "$app/paths";
  import { page } from "$app/state";
  import { useWebSocket, type SymbolData } from "$lib/websocket.svelte.js";
  import { symbolData } from "../../state.svelte.js";
  import { Chart, Svg, Axis, Bars, Points } from "layerchart";
  import { scaleBand, scaleOrdinal } from "d3-scale";
  // import * as Tooltip from "$lib/components/ui/tooltip/index.js";

  const symbol = page.params.name;
  // let data = $state({});

  $effect(() => useWebSocket({ symbol }));
</script>

<div class="flex flex-col justify-between gap-4 py-6 max-sm:flex-col">
  <div class="flex flex-col gap-4">
    <a href={`${base}/`}><h1 class="text-4xl uppercase">👁️ Watchlists 📈</h1></a
    >
    <h1 class="text-4xl text-amber-400 uppercase">${symbol}</h1>
  </div>

  <div class="h-[300px] rounded border p-4">
    <Chart
      data={symbolData.current}
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
        <Points links r={0} />
        <Bars y={(d) => [d.open, d.close]} radius={2} />
        <!-- <Highlight area /> -->
      </Svg>
      <!-- <Tooltip.Root let:data>
        <h3>{data?.time}</h3>
        <div class="flex flex-col gap-2">
          <p>Open {data?.open}</p>
          <p>Close {data?.close}</p>
          <p>High {data?.high}</p>
          <p>Low {data?.low}</p>
        </div>
      </Tooltip.Root> -->
    </Chart>
  </div>

  {#each symbolData.current as sd}
    <div>
      <p>{sd.time}</p>
      <p>Open ${sd.open}</p>
      <p>Close ${sd.close}</p>
      <p>High ${sd.high}</p>
      <p>Low ${sd.low}</p>
    </div>
  {/each}
</div>

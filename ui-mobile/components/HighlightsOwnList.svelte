<script lang="ts">
  import type { HighlightMetadata } from '../types/HighlightMetadata';
  import HighlightsOwnListCard from './HighlightsOwnListCard.svelte';
  import HighlightsOwnListCardCompact from './HighlightsOwnListCardCompact.svelte';

  export let list: HighlightMetadata[];
  export let isCompact: boolean;
  export let toggleCompact: () => void;
</script>

<div class="flex flex-col w-full justify-start items-center px-4 space-y-2">
  <div class="flex flex-row w-full justify-between items-center">
    <p class="font-sans font-bold text-3xl">
      {`Highlights`}
    </p>
    <div
      class="flex flex-row h-12 w-auto justify-between items-center px-4 py-2 space-x-2 rounded-full bg-base-200"
    >
      <div
        role={`button`}
        class="flex flex-row h-full justify-center items-center rounded-full px-4
        {isCompact ? `bg-base-100 text-white/70` : `bg-base-200`}"
        on:click|preventDefault={() => toggleCompact()}
      >
        <p class="font-sans font-semibold text-lg">
          {`Compact`}
        </p>
      </div>
      <div
        role={`button`}
        class="flex flex-row h-full justify-center items-center rounded-full px-4
        {!isCompact ? `bg-base-100 text-white/70` : `bg-base-200`}"
        on:click|preventDefault={() => toggleCompact()}
      >
        <p class="font-sans font-semibold text-lg">
          {`Full`}
        </p>
      </div>
    </div>
  </div>

  <div
    class="flex flex-col w-full justify-start items-start
    {isCompact ? `space-y-0 divide-y divide-slate-600` : `space-y-4`}"
  >
    {#each list as highlight}
      {#key highlight.id}
        {#if isCompact}
          <HighlightsOwnListCardCompact {highlight} />
        {:else}
          <HighlightsOwnListCard {highlight} />
        {/if}
      {/key}
    {/each}
  </div>
</div>

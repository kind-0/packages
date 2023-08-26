<script lang="ts">
  import type { HighlightMetadata } from '../types/HighlightMetadata';
  import HighlightListCard from './HighlightsFollowingListCard.svelte';

  export let list: HighlightMetadata[];
</script>

<div class="flex flex-col w-full justify-start items-center px-4 space-y-2">
  <div class="flex flex-row w-full justify-start items-center">
    <p class="font-sans font-bold text-3xl">
      {`Highlights`}
    </p>
  </div>

  <div class="flex flex-col w-full justify-start items-start space-y-4">
    {#each list as highlight}
      {#key highlight.id}
        <HighlightListCard {highlight} />
      {/key}
    {/each}
  </div>
</div>

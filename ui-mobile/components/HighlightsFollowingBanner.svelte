<script lang="ts">
  import type { HighlightMetadata } from '../types/HighlightMetadata';
  import HighlightsBannerCard from './HighlightsFollowingBannerCard.svelte';

  export let list: HighlightMetadata[];
</script>

<div class="grid grid-rows-1 grid-flow-col h-auto w-screen gap-6 px-4 overflow-x-scroll">
  {#each list as highlight}
    <HighlightsBannerCard {highlight} />
  {/each}
</div>

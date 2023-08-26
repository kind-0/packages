<script lang="ts">
  import type { HighlightMetadata } from '../types/HighlightMetadata';
    import StarsCard from './StarsCard.svelte';
    import ZapsCard from './ZapsCard.svelte';

  export let highlight: HighlightMetadata;
  $: ({ title, preview, author, zaps, stars } = highlight);
</script>

<div class="flex flex-col h-auto w-56 justify-between space-y-4">
  <div
    class="flex flex-col h-80 w-full justify-between items-center py-4 px-6 bg-base-200 rounded-2xl"
  >
    <div class="flex flex-col w-full space-y-3">
      <p class="font-sans font-bold text-lg capitalize line-clamp-3">
        {title}
      </p>

      <p class="font-sans font-medium text-base line-clamp-4">
        {preview}
      </p>
    </div>

    <div class="flex flex-col w-full justify-start items-start space-y-3">
      <ZapsCard {zaps} />
      <StarsCard {stars} />
    </div>
  </div>

  <div class="flex flex-row w-full justify-center items-center px-1 space-x-1">
    <div class="flex w-8">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        class="w-6 h-6"
      >
        <path
          fill-rule="evenodd"
          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-5.5-2.5a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0zM10 12a5.99 5.99 0 00-4.793 2.39A6.483 6.483 0 0010 16.5a6.483 6.483 0 004.793-2.11A5.99 5.99 0 0010 12z"
          clip-rule="evenodd"
        />
      </svg>
    </div>
    <p class="font-sans font-medium text-base truncate">
      {author}
    </p>
  </div>
</div>

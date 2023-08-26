<script lang="ts">
  import type { HighlightMetadata } from '../types/HighlightMetadata';

  export let highlight: HighlightMetadata;

  $: ({ title, preview} = highlight);
</script>

<div
  class="flex flex-col w-full justify-start items-start pt-2 px-4 bg-base-200 first:rounded-t-2xl last:rounded-b-2xl"
>
  <div class="flex flex-col h-24 w-full justify-between items-center py-2">
    <div class="flex flex-row w-full justify-between items-center">
      <div class="flex flex-row space-x-2">
        <div
          class="flex flex-col w-10 h-10 items-start justify-center p-2 space-y-1 bg-slate-800 rounded-xl"
        >
          <div class="flex h-[2px] w-full bg-slate-300 rounded-full" />
          <div class="flex h-[2px] w-full bg-slate-300 rounded-full" />
          <div class="flex h-[2px] w-full bg-slate-300 rounded-full" />
          <div class="flex h-[2px] w-[40%] bg-slate-300 rounded-full" />
        </div>
        <div class="flex flex-row h-full w-32 items-center">
          <p class="font-sans font-semibold text-base line-clamp-2 leading-tight">
            {title}
          </p>
        </div>
      </div>
      <div class="flex flex-row w-auto justify-center items-center space-x-2">
        <p class="font-sans font-semibold text-lg">
          {`You`}
        </p>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          class="w-10 h-10"
        >
          <path
            fill-rule="evenodd"
            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-5.5-2.5a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0zM10 12a5.99 5.99 0 00-4.793 2.39A6.483 6.483 0 0010 16.5a6.483 6.483 0 004.793-2.11A5.99 5.99 0 0010 12z"
            clip-rule="evenodd"
          />
        </svg>
      </div>
    </div>
    <div class="flex flex-row w-full justify-center items-center px-2">
      <p class="font-sans font-medium text-sm line-clamp-1">
        {`"${preview}"`}
      </p>
    </div>
  </div>
</div>

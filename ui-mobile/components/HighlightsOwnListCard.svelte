<script lang="ts">
  import ZapsCard  from './ZapsCard.svelte';
  import { formatDateCreated } from '@kind0/utils';
  import type { HighlightMetadata } from '../types/HighlightMetadata';

  export let highlight: HighlightMetadata;
  
  $: ({ author, dateCreated, title, preview, marginNotes, zaps, commentsList } = highlight);
</script>

<div class="flex flex-col w-full justify-center items-center">
  <div
    class="flex flex-col w-full justify-start items-start p-4 bg-base-200 rounded-2xl drop-shadow-xl"
  >
    <div class="flex flex-row w-full justify-start items-center space-x-4">
      <div class="flex flex-row w-auto">
        <div class="flex h-8 w-8 bg-base-content rounded-xl" />
      </div>
      <div class="flex flex-row flex-1 justify-between items-center pr-2">
        <p class="font-sans font-semibold text-lg line-clamp-1 truncate">
          {title}
        </p>

        <p class="font-sans font-medium text-base">
          {`${formatDateCreated(dateCreated)}`}
        </p>
      </div>
    </div>
    <div class="flex flex-row w-full justify-center items-center">
      <div class="flex flex-row h-full w-4 justify-center items-center py-4">
        <div class="flex w-2 h-full bg-orange-400 rounded-xl">{`.`}</div>
      </div>
      <div class="flex flex-col min-h-64 w-full justify-start items-start p-4">
        <p class="font-sans font-medium text-base">
          {preview}
        </p>
      </div>
    </div>
    <div class="flex flex-row w-full justify-center items-center">
      <p class="font-sans font-medium text-base">
        {marginNotes}
      </p>
    </div>
    <div class="flex flex-row w-full justify-start items-center pt-4 px-2 space-x-4">
      <div class="flex">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          class="w-8 h-8"
        >
          <path
            fill-rule="evenodd"
            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-5.5-2.5a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0zM10 12a5.99 5.99 0 00-4.793 2.39A6.483 6.483 0 0010 16.5a6.483 6.483 0 004.793-2.11A5.99 5.99 0 0010 12z"
            clip-rule="evenodd"
          />
        </svg>
      </div>

      <div class="flex flex-row justify-start flex-1">
        <p class="font-sans font-semibold text-lg">
          {author}
        </p>
      </div>
      <ZapsCard {zaps} />
      <div class="flex">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-8 h-8"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z"
          />
        </svg>
      </div>
    </div>
  </div>
  {#if commentsList?.length}
    <div class="flex flex-row h-28 w-full justify-start items-center pl-4 -mt-8">
      <div
        class="flex flex-row h-16 w-full justify-start items-end pl-1 pb-3 bg-base-200 rounded-b-xl"
      >
        <div class="flex flex-row w-full justify-center items-center space-x-2">
          <div class="avatar-group -space-x-4">
            {#each commentsList as _, lI}
              <div class="w-8">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  class="w-8 h-8"
                >
                  <path
                    fill-rule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-5.5-2.5a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0zM10 12a5.99 5.99 0 00-4.793 2.39A6.483 6.483 0 0010 16.5a6.483 6.483 0 004.793-2.11A5.99 5.99 0 0010 12z"
                    clip-rule="evenodd"
                  />
                </svg>
              </div>
            {/each}
          </div>
          <div class="flex flex-row">
            <p class="font-sans font-medium text-base">
              {`${commentsList[0].author} & ${commentsList.length} commented`}
            </p>
          </div>
        </div>
      </div>
    </div>
  {/if}
</div>

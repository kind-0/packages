<script lang="ts">
  export let title: string;
  export let subtitle: string | undefined | null = undefined;
  export let timestamp: number | undefined | null = undefined;
</script>

<div class="flex flex-row items-start justify-stretch w-full {$$props.class}">
  <div class="min-w-0 flex-1 flex flex-col md:flex-row items-end justify-between flew-wrap gap-1">
    <h1 class="text-2xl font-bold leading-7 sm:truncate sm:text-4xl sm:tracking-tight">
      {title}
    </h1>
    <div class="flex flex-col sm:mt-0 sm:flex-row sm:flex-wrap sm:space-x-6">
      {#if subtitle}
        <h2 class="flex items-center font-light text-base">
          {subtitle || ''}
        </h2>
      {/if}

      {#if timestamp}
        <div class="mt-2 flex items-center text-sm">
          <svg
            class="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fill-rule="evenodd"
              d="M5.75 2a.75.75 0 01.75.75V4h7V2.75a.75.75 0 011.5 0V4h.25A2.75 2.75 0 0118 6.75v8.5A2.75 2.75 0 0115.25 18H4.75A2.75 2.75 0 012 15.25v-8.5A2.75 2.75 0 014.75 4H5V2.75A.75.75 0 015.75 2zm-1 5.5c-.69 0-1.25.56-1.25 1.25v6.5c0 .69.56 1.25 1.25 1.25h10.5c.69 0 1.25-.56 1.25-1.25v-6.5c0-.69-.56-1.25-1.25-1.25H4.75z"
              clip-rule="evenodd"
            />
          </svg>
          {timestamp}
        </div>
      {/if}
    </div>
  </div>
  <div class="flex">
    <slot />
  </div>
</div>

<style lang="postcss">
    div.w-full {
        @apply border-b border-base-300 pb-2;
    }

    h1 {
        @apply lg:text-5xl;
    }

    h2 {
        @apply lg:text-2xl;
    }
</style>
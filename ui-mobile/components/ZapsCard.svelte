<script lang="ts">
  import { formatZapAmount } from '@kind0/utils';

  export let zaps: number;
</script>

<div
  class="flex flex-row w-auto justify-center items-center bg-base-100 rounded-xl py-1 px-4 space-x-2"
>
  <p class="font-sans font-semibold text-base">
    {formatZapAmount(zaps)}
  </p>
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-4 h-4">
    <path
      d="M11.983 1.907a.75.75 0 00-1.292-.657l-8.5 9.5A.75.75 0 002.75 12h6.572l-1.305 6.093a.75.75 0 001.292.657l8.5-9.5A.75.75 0 0017.25 8h-6.572l1.305-6.093z"
    />
  </svg>
</div>

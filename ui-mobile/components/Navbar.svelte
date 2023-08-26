<script lang="ts">
  export let pathname: string;
</script>

<nav class="flex flex-row h-[46px] w-full bg-base-100 px-4">
  <div class="flex flex-row h-full basis-1/4 justify-start items-end">
    <div class="flex">
      <a href={`/`}>
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
      </a>
    </div>
  </div>
  <div class="flex flex-row h-full basis-1/2 justify-center items-end">
    <p class="font-sans font-semibold text-lg capitalize line-clamp-1">
      {pathname.split(`/`)[2]}
    </p>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-6 h-6">
      <path
        fill-rule="evenodd"
        d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
        clip-rule="evenodd"
      />
    </svg>
  </div>
  <div class="flex flex-row h-full basis-1/4 justify-end items-end">
    <div class="flex">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        class="w-[28px] h-[28px]"
      >
        <path
          fill-rule="evenodd"
          d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
          clip-rule="evenodd"
        />
      </svg>
    </div>
  </div>
</nav>

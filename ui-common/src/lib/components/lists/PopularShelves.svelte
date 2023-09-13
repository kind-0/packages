<!--
    This component shows lists of popular lists
-->
<script lang="ts">
  import MenuItem from "../Menu/MenuItem.svelte";
  import { Name } from "@nostr-dev-kit/ndk-svelte-components";
  import NDKSvelte from "@nostr-dev-kit/ndk-svelte";

  export let pathname: string
  export let ndk: NDKSvelte
  export let lists: any[]
</script>

{#if lists?.length > 1}
  <ul class="menu bg-base-200 w-full rounded-box">
      <li class="menu-title">POPULAR LISTS</li>

      {#each lists as item}
          <MenuItem href={`/highlights/a/${item.encode()}`} {pathname}>
              <Name {ndk} user={item.author} />'s
              {item.name}
          </MenuItem>
      {/each}
  </ul>
{/if}
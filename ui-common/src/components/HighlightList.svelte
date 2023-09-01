<script lang="ts">
    import HighlightListItem from "./HighlightListItem.svelte";
    import type { NDKHighlight } from "@kind0/nostr";
    import { setContext } from "svelte";
    import NDK from '@nostr-dev-kit/ndk';

    export let items: NDKHighlight[] = [];
    export let expandedContext: boolean = true;
    export let ndk: NDK

    export let skipTitle: boolean = false;

    setContext("skipTitle", skipTitle);
</script>

<div class="flex flex-col gap-4 overflow-hidden w-full">
    {#each items as item (item.id)}
        <HighlightListItem
            class=""
            {expandedContext}
            highlight={item}
            {skipTitle}
            disableClick={true}
            itemClass={$$props.itemsClass}
            {ndk}
        />
    {/each}
</div>
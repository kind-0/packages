<script lang="ts">
    import type { NDKHighlight } from "@nostr-dev-kit/ndk";
    import type NDKArticle from "@nostr-dev-kit/ndk";
    import type { NDKEvent } from "@nostr-dev-kit/ndk";
    import { EventContent } from "@nostr-dev-kit/ndk-svelte-components";
    import { ndk } from "../../../../stores/ndk.js";

    export let highlight: NDKHighlight;
    export let article: NDKArticle | NDKEvent | string | undefined = undefined;
    export let expandedContext: boolean = true;

    let highlightedId: string;
    let floatedHighlightBorder: boolean = false;

    let contextWithHighlight = highlight.content;

    $: if (article?.content && highlightedId !== article.id) {
        highlightedId = article.id;

        try {
            if (expandedContext && article && article.content?.length < 2000) {
                floatedHighlightBorder = true;

                contextWithHighlight = article.content.replace(highlight.content, `<span class='mark-wrapper'><span class="mark-wrapper-inner"></span><mark>${highlight.content}</mark></span>`);
            } else {
                contextWithHighlight = `<mark>${highlight.content}</mark>`;
            }
        } catch (e) {
            console.trace(highlight);
            console.error(e);
        }
    }

    $: if (highlight.id !== highlightedId && !article?.content) {
        highlightedId = highlight.id;

        if (highlight.context) {

            if (!highlight.context.match(highlight.content)) {
                console.log(`could not find it`)
            }

            contextWithHighlight = highlight.context.replace(highlight.content, `<mark>${highlight.content}</mark>`);
        } else {
            contextWithHighlight = `<mark>${highlight.content}</mark>`;
        }
    }
</script>

<div class="flex flex-row justify-center items-stretch gap-4 md:font-serif leading-[1.8rem]">
    {#if !floatedHighlightBorder}
        <div class="bg-accent h-100 rounded-lg quote-line shrink-0"></div>
    {/if}
    <div class="flex-grow">
        <EventContent
            ndk={$ndk}
            event={highlight}
            content={contextWithHighlight}
        />
    </div>
</div>

<style>
    :global(.mark-wrapper) {
        padding: 0 0.125rem;
    }

    :global(.mark-wrapper-inner) {
        z-index: 9;
        position: absolute;
        margin-top: -10px;
        left: 0;
        @apply border-l-8 border-accent;
        width: 10px;
        height: 50px;
    }

    .quote-line {
        width: 4px !important;
    }
</style>
<script lang="ts">
    import type { NDKEvent } from "@nostr-dev-kit/ndk";
    import EventCardFooter from "./EventCardFooter.svelte";
    import EventCardActions from "./EventCardActions.svelte";
    import { Eye } from "phosphor-svelte";

    export let event: NDKEvent;
    export let authorAction: string | undefined = undefined;
    export let skipHeader = false;
    export let skipFooter = false;
    export let disableZaps = false;
    export let disableBookmark = false;
    export let eventCardActionsComponent: any = EventCardActions;

    let showHeader: boolean;

    $: showHeader = !skipHeader && ($$slots.header) || ($$slots.headerTime);

    let showMutedEvent = false;
</script>

<div class="
    card card-compact px-2 pt-2 rounded-2xl group {$$props.class??""}
" on:mouseenter on:mouseleave>
    <div class="card-body flex flex-col text-base gap-4">
        {#if !event.muted() || showMutedEvent}
            {#if showHeader}
                <div class="flex flex-row justify-between gap-4 md:gap-12">
                    {#if $$slots.header}
                        <div class="flex-grow">
                            <slot name="header" />
                        </div>
                    {:else}
                        <div>&nbsp;</div>
                    {/if}

                    <div class="flex flex-row items-center gap-4 self-end">
                        {#if $$slots.headerTime}
                            <slot name="headerTime" />
                        {/if}
                    </div>
                </div>
            {/if}

            <div class="event-card--content">
                <slot />
            </div>

            {#if !skipFooter}
                {#if !$$slots.footer}
                    <EventCardFooter
                        {event}
                        {authorAction}
                        on:reply
                        {eventCardActionsComponent}
                        {disableZaps}
                        {disableBookmark}
                    >
                        <slot slot="extraActions" name="extraActions" />
                    </EventCardFooter>
                {:else}
                    <slot name="footer" />
                {/if}
            {/if}
        {:else}
            <div class="flex flex-row items-center gap-4">
                <span class="whitespace-nowrap text-sm capitalize">
                    {event.muted()}
                    Muted.
                </span>

                <div class="tooltip" data-tip="Click to display">
                    <button
                        class="btn btn-sm btn-circle"
                        on:click={() => showMutedEvent = true}
                    >
                        <Eye />
                    </button>
                </div>
            </div>
        {/if}
    </div>
</div>

<style>
    .card.card-compact .card-body {
        @apply text-base;
    }

    .event-card--content {
        @apply text-lg;
        font-weight: 300 !important;
    }

    .event-card--content {
        @apply max-h-96 overflow-y-auto;
    }
</style>
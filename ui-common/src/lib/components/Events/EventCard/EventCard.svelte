<script lang="ts">
    import type { NDKEvent } from "@nostr-dev-kit/ndk";
    import EventCardFooter from "./EventCardFooter.svelte";
    import EventCardActions from "./EventCardActions.svelte";

    export let event: NDKEvent;
    export let authorAction: string | undefined = undefined;
    export let skipHeader = false;
    export let skipFooter = false;
    export let disableZaps = false;
    export let disableBookmark = false;
    export let eventCardActionsComponent: any = EventCardActions;

    /**
     * Whether this event should be expandible so that clicking on it
     * will open a thread view
     */
    export let expandible = true;

    let deleted = false;

    function toggleDrawer(e: MouseEvent) {
        const { target } = e;

        // if target is an <a> or <button> return
        if (target instanceof HTMLAnchorElement || target instanceof HTMLButtonElement) {
            return;
        }

        // $rightDrawerContent = event;
    }

    let showHeader: boolean;

    $: showHeader = !skipHeader && ($$slots.header) || ($$slots.headerTime);
</script>

{#if !deleted}
    <div class="
        card card-compact px-2 pt-2 !rounded-none md:!rounded-2xl group {$$props.class??""}
    " on:mouseenter on:mouseleave on:click={toggleDrawer}>
        <div class="card-body flex flex-col text-base gap-4">
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
                    >
                        <slot slot="extraActions" name="extraActions" />
                    </EventCardFooter>
                {:else}
                    <slot name="footer" />
                {/if}
            {/if}
        </div>
    </div>
{/if}

<style>
    .card.card-compact .card-body {
        @apply text-base;
    }

    :global(.event-card--content) {
        @apply text-lg;
        font-weight: 300 !important;
    }
</style>
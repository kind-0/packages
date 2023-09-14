<script lang="ts">
    import type { NDKEvent } from "@nostr-dev-kit/ndk";
    import RelativeTime from "../../RelativeTime.svelte";

    import { ndk } from "../../../stores/ndk.js";

    import EventCardActions from "./EventCardActions.svelte";
    import Avatar from "../../User/Avatar.svelte";
    import Name from "../../User/Name.svelte";
    import EventCardDropdown from "./EventCardDropdown.svelte";

    export let event: NDKEvent;
    export let authorAction: string | undefined = undefined;
    export let skipHeader = false;
    export let skipFooter = false;

    /**
     * Whether this event should be expandible so that clicking on it
     * will open a thread view
     */
    export let expandible = true;

    function linkToEvent() {
        return `/e/${event.encode()}`;
    }

    let deleted = false;

    function toggleDrawer(e: MouseEvent) {
        const { target } = e;

        // if target is an <a> or <button> return
        if (target instanceof HTMLAnchorElement || target instanceof HTMLButtonElement) {
            return;
        }


        // $rightDrawerContent = event;
    }
</script>

{#if !deleted}
    <div class="
        card card-compact !rounded-none md:!rounded-2xl group {$$props.class??""}
    " on:mouseenter on:mouseleave on:click={toggleDrawer}>
        <div class="card-body flex flex-col text-base gap-4">
            {#if !skipHeader}
                <div class="flex flex-row justify-between gap-4 md:gap-12">
                    <slot name="header" />

                    <div class="flex flex-row items-center gap-4">
                        <div class="md:opacity-10 group-hover:opacity-100">
                            <EventCardDropdown
                                {event}
                                on:deleted={() => deleted = true}
                            />
                        </div>

                        {#if event.created_at}
                            <a href={linkToEvent()}>
                                <RelativeTime
                                    {event}
                                    class="text-sm whitespace-nowrap"
                                />
                            </a>
                        {/if}
                    </div>
                </div>
            {/if}

            <slot />

            {#if !skipFooter && !$$slots.footer}
                <div class="flex flex-row items-center justify-between">
                    <a
                        href="/p/{event.author.npub}"
                        class="flex flex-row items-center gap-2 text-sm"
                    >
                        <Avatar user={event.author} size="small" />
                        <div class="text-xs hidden md:block">
                            {#if authorAction}
                                <span>
                                    {authorAction}
                                </span>
                            {/if}

                            <span
                                class="text-xs font-semibold"
                            >
                                <Name ndk={$ndk} user={event.author} />
                            </span>
                        </div>
                    </a>


                    <div>
                        <EventCardActions {event} />
                    </div>
                </div>
            {:else if !skipFooter}
                <slot name="footer" />
            {/if}
        </div>
    </div>
{/if}

<style>
    .card.card-compact .card-body {
        @apply text-base;
    }
</style>
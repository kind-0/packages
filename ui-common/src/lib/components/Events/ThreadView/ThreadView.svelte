<script lang="ts">
    import type { Hexpubkey, NDKEvent } from "@nostr-dev-kit/ndk";
    import { derived } from 'svelte/store';
    import { fade } from 'svelte/transition';
    import EventCard from "../EventCard/EventCard.svelte";
    import { EventContent } from "@nostr-dev-kit/ndk-svelte-components";
    import { ndk } from "../../../stores/ndk";
    import { onDestroy } from "svelte";
    import ElementConnector from "../../ElementConnector.svelte";
  import SubtleButton from "../../buttons/SubtleButton.svelte";

    export let event: NDKEvent;
    export let skipEvent = false;
    export let eventCardActionsComponent: any = undefined;
    export let whitelistPubkeys: Set<Hexpubkey> | undefined = undefined;
    export let useWhitelist = true;

    const replies = $ndk.storeSubscribe({
        kinds: [1],
        ...event.filter()
    }, { closeOnEose: false, groupableDelay: 100 });

    onDestroy(() => {
        replies.unsubscribe();
    })

    const actualReplies = derived(replies, ($replies) => {
        return $replies.filter((r: NDKEvent) => isReply(r));
    });

    function isReply(e: NDKEvent): boolean {
        // check if event is tagged with a reply marker
        const opTagId = event.tagId();

        const replyMarker = e.tags.find(tag => {
            return (
                tag[1] === opTagId &&
                tag[3] === 'reply'
            );
        })

        if (replyMarker) return true;

        // check if the event has valid markers, if it does and we don't have an explicit reply, this was
        // probably a reply to a reply or a mention
        const hasMarker = e.tags.find(tag => ["reply", "mention"].includes(tag[3]));

        if (hasMarker) return false;

        return true;
    }

    let eventContainer: HTMLElement;
</script>

<div class="flex flex-col gap-6" transition:fade={{ duration: 500 }}>
    {#if !skipEvent}
        <div class="event-wrapper w-full" bind:this={eventContainer}>
            <EventCard
                {event}
                on:reply
                skipHeader={!$$slots.header}
                class="border border-base-300 w-full"
                {eventCardActionsComponent}
            >
                <slot slot="header" name="header" />
                <EventContent ndk={$ndk} {event} class="event-content" />
            </EventCard>
        </div>
    {/if}

    {#if $actualReplies?.length > 0}
        <div class="max-lg:pl-4 lg:pl-12">
            <div class="flex flex-col gap-4">
                {#each $actualReplies as reply}
                    {#if !whitelistPubkeys || !useWhitelist || whitelistPubkeys.has(reply.pubkey)}
                        <ElementConnector
                            from={eventContainer}
                            topOffset={80}
                        >
                            <svelte:self
                                event={reply}
                                on:reply
                                skipEvent={false}
                                {eventCardActionsComponent}
                            />
                        </ElementConnector>
                    {:else if whitelistPubkeys && useWhitelist && !whitelistPubkeys.has(reply.pubkey)}
                        <div class="flex flex-col gap-4">
                            <div class="flex flex-row gap-2 items-center">
                                <span class="text-base-content flex-grow ui-common-font-light">This reply was hidden because it is out of your network</span>
                                <button class="btn btn-sm btn-ghost capitalize" on:click={() => useWhitelist = false}>Show anyway</button>
                            </div>
                        </div>
                    {/if}
                {/each}
            </div>
        </div>
    {/if}
</div>

<style lang="postcss">
    :global(.event-content a) {
        @apply text-accent;
    }

    :global(.event-content span.name) {
        @apply text-accent;
    }
</style>
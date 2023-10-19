<script lang="ts">
    import type { Hexpubkey, NDKEvent, NDKEventId } from "@nostr-dev-kit/ndk";
    import type { Readable } from 'svelte/store';
    import { fade } from 'svelte/transition';
    import EventCard from "../EventCard/EventCard.svelte";
    import { EventContent } from "@nostr-dev-kit/ndk-svelte-components";
    import { ndk } from "../../../stores/ndk";
    import { SvelteComponent, onDestroy } from "svelte";
    import ElementConnector from "../../ElementConnector.svelte";

    type ExtraItem = {
        component: typeof SvelteComponent;
        props: any;
    }
    type ExtraItemFetcher = (event: NDKEvent) => Readable<ExtraItem[]>;

    export let event: NDKEvent;
    export let skipEvent = false;
    export let eventCardActionsComponent: any = undefined;
    export let whitelistPubkeys: Set<Hexpubkey> | undefined = undefined;
    export let useWhitelist = true;
    export let extraItemsFetcher: ExtraItemFetcher | undefined = undefined;

    // Event IDs that are part of the thread
    let threadIds = new Map<NDKEventId, NDKEvent>();
    let replyIds = new Map<NDKEventId, NDKEvent>();

    let eventsByAuthor = new Set<NDKEventId>([event.id]);

    threadIds.set(event.id, event);

    /**
     * Extra events are events that might be coming from alternative sources
     * instead of coming from a relay
     */
    let extraItems: Readable<ExtraItem[]>;

    if (extraItemsFetcher) {
        extraItems = extraItemsFetcher(event);
    }

    let replies = $ndk.storeSubscribe({
        kinds: [1],
        "#e": Array.from(threadIds.keys())
    }, { closeOnEose: false, groupableDelay: 100 });

    $: {
        const threadIdCountBefore = threadIds.size;
        const replyIdCountBefore = replyIds.size;

        // Update eventsByAuthor
        for (const taggedEvent of $replies) {
            if (taggedEvent.pubkey === event.pubkey)
                eventsByAuthor.add(taggedEvent.id);
        }

        // Find threaded events and replies
        for (const taggedEvent of $replies) {
            if (eventIsPartOfThread(taggedEvent))
                threadIds.set(taggedEvent.id, taggedEvent);
        }

        for (const taggedEvent of $replies) {
            if (threadIds.has(taggedEvent.id)) continue;
            if (eventIsReply(taggedEvent))
                replyIds.set(taggedEvent.id, taggedEvent);
        }

        // Do we need to redo our filter?
        if (threadIdCountBefore < threadIds.size) {
            replies.unsubscribe();
            replies = $ndk.storeSubscribe({
                kinds: [1],
                "#e": Array.from(threadIds.keys())
            }, { closeOnEose: false, groupableDelay: 100, subId: "thread-filter" });
            threadIds = threadIds;
        }

        if (replyIdCountBefore < replyIds.size) {
            replyIds = replyIds;
        }
    }

    function eventIsPartOfThread(e: NDKEvent): boolean {
        // must be same author
        if (event.pubkey !== e.pubkey) return false;

        // Check if all tagged events are by the original author
        const taggedEventIds = e.getMatchingTags("e").map(tag => tag[1]);
        const allTaggedEventsAreByOriginalAuthor = taggedEventIds.every(id => eventsByAuthor.has(id));

        return allTaggedEventsAreByOriginalAuthor;
    }

    function eventIsReply(event: NDKEvent): boolean {
        return isReply(event);
    }

    onDestroy(() => {
        replies.unsubscribe();
    })

    function isReply(e: NDKEvent): boolean {
        const replyMarker = e.tags.find(tag => {
            return (
                threadIds.has(tag[1]) &&
                tag[3] === 'reply'
            );
        })

        if (replyMarker) return true;

        // check if the event has valid markers, if it does and we don't have an explicit reply, this was
        // probably a reply to a reply or a mention
        const hasMarker = !!e.tags.find(tag => ["reply", "mention"].includes(tag[3]));
        if (hasMarker) return false;

        // if we don't have markers, check if there are tags for other events that the main event
        // does not have
        const expectedTags = event.getMatchingTags("e").map(tag => tag[1]);
        expectedTags.push(event.id);

        // return true if there are no unexpected e tags
        return e.getMatchingTags("e").every(tag => expectedTags.includes(tag[1]));
    }

    function sortThread(a: NDKEvent, b: NDKEvent): number {
        return a.created_at - b.created_at;
    }

    function sortReplies(a: NDKEvent, b: NDKEvent): number {
        return a.created_at - b.created_at;
    }

    let eventContainer: HTMLElement;
</script>

<div class="flex flex-col gap-6" transition:fade={{ duration: 500 }}>
    {#if !skipEvent}
        <div class="event-wrapper w-full join-vertical join" bind:this={eventContainer}>
            {#each Array.from(threadIds.values()).sort(sortThread) as event (event.id)}
                <EventCard
                    {event}
                    on:reply
                    skipHeader={!$$slots.header}
                    class="border border-base-300 w-full join-item"
                    {eventCardActionsComponent}
                >
                    <slot slot="header" name="header" />
                    <EventContent ndk={$ndk} {event} class="event-content" />
                </EventCard>
            {/each}
        </div>
    {/if}

    {#if replyIds.size > 0 || $extraItems}
        <div class="max-lg:pl-4 lg:pl-12">
            <div class="flex flex-col gap-4">
                {#each $extraItems as item (item.props.key)}
                    <ElementConnector
                        from={eventContainer}
                        topOffset={80}
                    >
                        <svelte:component this={item.component}
                            {...item.props}
                        />
                    </ElementConnector>
                {/each}

                {#each Array.from(replyIds.values()).sort(sortReplies) as reply (reply.id)}
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
                                {whitelistPubkeys}
                                {useWhitelist}
                                {extraItemsFetcher}
                            />
                        </ElementConnector>
                    {:else if whitelistPubkeys && useWhitelist && !whitelistPubkeys.has(reply.pubkey)}
                        <div class="flex flex-col gap-4">
                            <div class="flex flex-row gap-2 items-center">
                                <span class="text-base-content flex-grow ui-common-font-light">This reply was hidden</span>
                                <button class="btn btn-sm bg-base-300 capitalize" on:click={() => useWhitelist = false}>Show anyway</button>
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
        @apply text-white;
    }

    :global(.list-container) {
        @apply flex flex-col gap-32;
    }

    :global(.event-card--content h1.article--title) {
        @apply text-2xl font-semibold text-base-100-content;
    }

    :global(.event-card--content .article p) {
        @apply mb-4;
    }

    :global(.event-card--content .article h1) {
        @apply text-lg font-semibold mb-4;
    }

    :global(.event-card--content .article ul) {
        @apply list-disc ml-4;
    }
</style>
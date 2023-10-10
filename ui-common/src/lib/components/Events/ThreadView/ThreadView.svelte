<script lang="ts">
    import type { Hexpubkey, NDKEvent, NDKEventId } from "@nostr-dev-kit/ndk";
    import { Readable, derived } from 'svelte/store';
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

    /**
     * Extra events are events that might be coming from alternative sources
     * instead of coming from a relay
     */
    let extraItems: Readable<ExtraItem[]>;

    if (extraItemsFetcher) {
        extraItems = extraItemsFetcher(event);
    }

    const replies = $ndk.storeSubscribe({
        kinds: [1],
        ...event.filter()
    }, { closeOnEose: false, groupableDelay: 100 });

    onDestroy(() => {
        replies.unsubscribe();
    })

    // derived store with the replies directly to this event
    const filteredReplies = derived(replies, ($replies) => {
        return $replies.filter((r: NDKEvent) => isReply(r));
    });

    let threadEvents: Readable<NDKEvent[]>;
    let actualReplies: Readable<NDKEvent[]>;

    if (!skipEvent) {
        threadEvents = derived(filteredReplies, ($replies) => {
            const eventsByOriginalAuthor = new Set<NDKEventId>();
            eventsByOriginalAuthor.add(event.id);

            // Add all events authored by the author of the main event of this ThreadView
            for (const reply of $replies) {
                if (reply.pubkey === event.pubkey) {
                    eventsByOriginalAuthor.add(reply.id);
                }
            }

            // Filter the events that have, as e tags, the id of an event authored by the original author
            return $replies.filter((r: NDKEvent) => {
                // reply is by the same author as the original event
                if (r.pubkey !== event.pubkey) return false;

                const taggedEventsIds = r.getMatchingTags("e").map(tag => tag[1]);
                const allTaggedEventsAreByOriginalAuthor = taggedEventsIds.every(id => eventsByOriginalAuthor.has(id));

                return allTaggedEventsAreByOriginalAuthor;
            });
        });

        // derived store of all events that are in filteredReplies but not in threadEvents
        actualReplies = derived([filteredReplies, threadEvents], ([$replies, $threadEvents]) => {
            const threadEventsIds = new Set($threadEvents.map(e => e.id));

            return $replies.filter(e => !threadEventsIds.has(e.id));
        });
    } else {
        actualReplies = filteredReplies;
    }

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

        // if we don't have markers, check if there are tags for other events that the main event
        // does not have
        const expectedTags = event.getMatchingTags("e").map(tag => tag[1]);
        expectedTags.push(event.id);

        // return true if there are no unexpected e tags
        return e.getMatchingTags("e").every(tag => expectedTags.includes(tag[1]));
    }

    let eventContainer: HTMLElement;
</script>

<div class="flex flex-col gap-6" transition:fade={{ duration: 500 }}>
    {#if !skipEvent}
        <div class="event-wrapper w-full join-vertical join" bind:this={eventContainer}>
            <EventCard
                {event}
                on:reply
                skipHeader={!$$slots.header}
                class="border border-base-300 w-full join-iten"
                {eventCardActionsComponent}
            >
                <slot slot="header" name="header" />
                <EventContent ndk={$ndk} {event} class="event-content" />
            </EventCard>

            {#each $threadEvents as event (event.id)}
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

    {#if $actualReplies?.length > 0 || $extraItems}
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

                {#each $actualReplies as reply (reply.id)}
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
                                <span class="text-base-content flex-grow ui-common-font-light">This reply was hidden because it is out of your network</span>
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
</style>
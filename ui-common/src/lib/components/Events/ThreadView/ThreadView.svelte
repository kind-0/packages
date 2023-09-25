<script lang="ts">
    import type { NDKEvent } from "@nostr-dev-kit/ndk";
    import { derived } from 'svelte/store';
    import { fade } from 'svelte/transition';
    import EventCard from "../EventCard/EventCard.svelte";
    import { EventContent } from "@nostr-dev-kit/ndk-svelte-components";
    import { ndk } from "../../../stores/ndk";
    import { onDestroy } from "svelte";

    export let event: NDKEvent;
    export let skipEvent = false;

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

        // check if the event has reply markers
        const hasReplyMarker = e.tags.find(tag => tag[3] === 'reply');

        if (hasReplyMarker) return false;

        return true;
    }
</script>

<div class="flex flex-col gap-4 my-2 w-96" transition:fade={{ duration: 500 }}>
    {#if !skipEvent}
        <EventCard {event} class="border border-base-300 w-full">
            <EventContent ndk={$ndk} {event} />
        </EventCard>
    {/if}

    {#if $actualReplies?.length > 0}
        <div class="flex flex-col gap-4 max-lg:pl-4 lg:pl-12">
            {#each $actualReplies as reply}
                <svelte:self event={reply} skipEvent={false} />
            {/each}
        </div>
    {/if}
</div>
<script lang="ts">
    import Avatar from "../../User/Avatar.svelte";
    import Name from "../../User/Name.svelte";
    import EventCardDropdown from "./EventCardDropdown.svelte";
    import RelativeTime from "../../RelativeTime.svelte";

    import EventCardActions from "./EventCardActions.svelte";
    import { ndk } from "../../../stores/ndk.js";
    import { NDKEvent } from "@nostr-dev-kit/ndk";

    export let event: NDKEvent;
    export let authorAction: string | undefined = undefined;
    export let disableZaps = false;
    export let disableBookmark = false;
    export let eventCardActionsComponent = EventCardActions;

    function linkToEvent() {
        return `/e/${event.encode()}`;
    }
</script>

<div class="flex flex-row items-center justify-between">
    <div class="flex flex-row items-center gap-4">
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

        {#if event.created_at}
            <a href={linkToEvent()}>
                <RelativeTime
                    {event}
                    class="text-xs whitespace-nowrap font-normal"
                />
            </a>
        {/if}

        <div class="md:opacity-10 group-hover:opacity-100">
            <EventCardDropdown {event} />
        </div>
    </div>

    <div>
        <svelte:component
            this={eventCardActionsComponent}
            on:reply
            {event}
            {disableZaps}
            {disableBookmark}
        />
    </div>
</div>
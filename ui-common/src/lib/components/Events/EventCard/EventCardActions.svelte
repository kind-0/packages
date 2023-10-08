<script lang="ts">
    import { type NDKEvent } from "@nostr-dev-kit/ndk";
    import Zaps from "./Buttons/Zaps.svelte";
    import Comments from "./Buttons/Comments.svelte";
    import Bookmark from "./Buttons/Bookmark.svelte";
    import { createEventDispatcher } from "svelte";

    const dispatch = createEventDispatcher();

    export let event: NDKEvent;
    export let disableZaps = false;
    export let disableBookmark = false;

    let zappedAmount: number;

    function commentClicked(e: Event) {
        if (!dispatch("reply", event, { cancelable: true })) {
            e.preventDefault();
        }
    }
</script>

<div class="
    flex flex-row max-lg:gap-2 lg:gap-4 items-center
    text-base-100-content
    z-10
">
    <!-- {#if $user}


        <div class="md:opacity-0 group-hover:opacity-100 transition duration-300">
            <BoostButton {event} class="btn bg-base-100 hover:bg-base-200 btn-circle btn-xs w-6 h-6 p-1" />
        </div>

    <!-- {/if} -->

    <!-- <div class="md:opacity-0 group-hover:opacity-100 transition duration-300">
    <div class="tooltip" data-tip="Link to this note">
            <a href={`/e/${event.encode()}`} class="btn bg-base-100 hover:bg-base-200 btn-circle btn-xs w-6 h-6 p-1">
                <Link class="w-4 h-4" />
            </a>
        </div>
    </div>
-->
    {#if $$slots.default}
        <slot />
    {/if}

    <div>
        <Comments
            {event}
            on:click={commentClicked}
            class="btn bg-base-300 btn-sm p-1 !rounded-full px-3 font-light"
        />
    </div>

    {#if !disableZaps}
        <div>
            <Zaps bind:zappedAmount {event} class="btn bg-base-300 btn-sm p-2 !rounded-full font-light" />
        </div>
    {/if}

    {#if !disableBookmark}
        <div>
            <Bookmark {event} class="btn bg-base-300 btn-sm p-1 !rounded-full px-3 font-light" />
        </div>
    {/if}
</div>
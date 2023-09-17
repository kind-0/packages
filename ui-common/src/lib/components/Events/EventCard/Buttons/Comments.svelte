<script lang="ts">
    import { openModal } from 'svelte-modals'

    import { user } from "../../../../index.js";
    import { onDestroy } from 'svelte';
    import { type NDKEvent, NDKUser } from '@nostr-dev-kit/ndk';
    // import { user } from '$stores/session';
    import { ndk } from "../../../../stores/ndk.js";
    import type { NDKEventStore } from '@nostr-dev-kit/ndk-svelte';
    import ZapModal from '../../../../modals/ZapModal/ZapModal.svelte';
    import CommentIcon from '../../../../icons/CommentIcon.svelte';

    export let event: NDKEvent;
    let eventId: string;
    let comments: NDKEventStore<NDKEvent>;
    export let commentCount: number = 1000;

    onDestroy(() => {
        if (comments) comments.unsubscribe();
    });

    $: if (event?.id && event.id !== eventId) {
        eventId = event.id;
        comments?.unsubscribe();

        comments = $ndk.storeSubscribe(
            { kinds: [ 1 ], ...event.filter() },
            { closeOnEose: false, groupableDelay: 1500, subId: "comments-button" }
        );
    }

    $: if ($comments) {
        commentCount = $comments.length;
    }

    let tooltip: string;
    $: tooltip = $user ? 'Zap' : 'You are not logged in';

</script>

{#if event?.id}
    <div class="tooltip flex flex-row items-center" data-tip={tooltip}>
        <button
            class="flex flex-row items-center gap-2
            {$$props.class}"
            on:click={() => { openModal(ZapModal, { event }) }}
        >
            <CommentIcon class="
                w-4 h-4
                " />
            {#if commentCount > 0}
                <div class="text-sm">{commentCount}</div>
            {/if}
        </button>
    </div>
{/if}

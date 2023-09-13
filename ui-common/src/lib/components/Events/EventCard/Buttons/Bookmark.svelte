<script lang="ts">
    import { openModal } from 'svelte-modals'

    import { onDestroy } from 'svelte';
    import { user } from "../../../../index.js";
    import { type NDKEvent, NDKKind } from '@nostr-dev-kit/ndk';
    import { ndk } from "../../../../stores/ndk.js";
    import type { NDKEventStore } from '@nostr-dev-kit/ndk-svelte';
    import LabelModal from '../../../../modals/LabelModal/LabelModal.svelte';
    import BookmarkIcon from '../../../../icons/BookmarkIcon.svelte';

    export let event: NDKEvent;
    let labelEvents: NDKEventStore<NDKEvent>;
    let userLabelEvents: NDKEvent[] = [];

    onDestroy(() => {
        if (labelEvents) labelEvents.unsubscribe();
    });

    const filters = [{ kinds: [ NDKKind.Label ], ...event.filter() }];

    if ($user) filters.push({ kinds: [ NDKKind.Label ], ...event.filter(), authors: [$user?.hexpubkey] });

    labelEvents = $ndk.storeSubscribe(filters,
        { closeOnEose: false, groupableDelay: 1500, subId: "topics-button" }
    );

    let tooltip: string;
    $: tooltip = $user ? 'Topics' : 'You are not logged in';

    $: userLabelEvents = $labelEvents.filter(label => label.pubkey === $user?.hexpubkey);

    let labels = new Set<string>();

    $: for (const labelEvent of $labelEvents) {
        for (const tag of labelEvent.tags) {
            if (tag[0] === 'l' && tag[2] === '#t') {
                labels.add(tag[1]);
            }
        }

        labels = labels;
    }

    function open() {
        const opts = {
            event,
            eventLabels: labels,
            userLabelEvents
        };


        openModal(LabelModal, opts);
    }
</script>

<div class="tooltip flex flex-row items-center" data-tip={tooltip}>
    <button
        class="flex flex-row items-center gap-2 back
        {$$props.class}"
        class:active={userLabelEvents?.length > 0}
        on:click={open}
    >
        <BookmarkIcon class="
            w-4 h-4
            " />
        {#if labels?.size > 0}
            <div class="
                text-sm
                {userLabelEvents?.length > 0 ? 'text-accent' : ''}
            ">{labels?.size}</div>
        {/if}
    </button>
</div>

<style lang="postcss">
    .active {
        @apply text-accent border border-accent;
    }
</style>
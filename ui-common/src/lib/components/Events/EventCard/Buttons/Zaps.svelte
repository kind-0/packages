<script lang="ts">
    import { openModal } from 'svelte-modals'

    import { user } from "../../../../index.js";
    import { onDestroy } from 'svelte';
    import { type NDKEvent, zapInvoiceFromEvent, NDKUser } from '@nostr-dev-kit/ndk';
    import { nicelyFormattedMilliSatNumber } from "../../../../utils/bitcoin";
    // import { user } from '$stores/session';
    import { ndk } from "../../../../stores/ndk.js";
    import type { NDKEventStore } from '@nostr-dev-kit/ndk-svelte';
    import ZapIcon from '../../../../icons/ZapIcon.svelte';
    import ZapModal from '../../../../modals/ZapModal/ZapModal.svelte';

    export let event: NDKEvent;
    let eventId: string;
    let zaps: NDKEventStore<NDKEvent>;
    export let zappedAmount: number = 1000;
    export let onZapsModalOpen = async () => {return}
    export let onZapsModalClose = async () => {return}

    onDestroy(() => {
        if (zaps) zaps.unsubscribe();
    });

    $: if (event?.id && event.id !== eventId) {
        eventId = event.id;
        zaps?.unsubscribe();

        zaps = $ndk.storeSubscribe(
            { kinds: [ 9735 ], ...event.filter() },
            { closeOnEose: false, groupableDelay: 1500, subId: "zaps-button" }
        );
    }

    let zappedByCurrentUser: boolean = false;

    $: if ($zaps) {
        zappedAmount = $zaps.reduce((acc: number, zap: NDKEvent) => {
            const zapInvoice = zapInvoiceFromEvent(zap);
            if (!zapInvoice) return acc;

            if (zapInvoice.zappee === $user?.hexpubkey) {
                zappedByCurrentUser = true;
            }

            return acc + zapInvoice.amount;
        }, 0);
    }
</script>

{#if event?.id}
    <div class="flex flex-row items-center">
        <button
            class="flex flex-row items-center gap-1
            {$$props.class}"
            on:click|stopPropagation|preventDefault={async () => { await onZapsModalOpen(); openModal(ZapModal, { event, onZapModalClose: async () => { await onZapsModalClose() } }) }}
        >
            {#if $$slots.icon}
                <slot name="icon" {zappedByCurrentUser} />
            {:else}
                <ZapIcon class="
                    w-4 h-4
                    {$$props.iconClass??""}
                    {zappedByCurrentUser ? 'text-primary-500' : ''}
                    " />
            {/if}
            {#if zappedAmount > 0}
                <div class="
                {zappedByCurrentUser ? 'text-primary-500' : ''}
                ">{nicelyFormattedMilliSatNumber(zappedAmount)}</div>
            {/if}
        </button>
    </div>
{/if}

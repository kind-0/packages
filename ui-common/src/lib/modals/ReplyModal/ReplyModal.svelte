<script lang="ts">
    import { NDKEvent, NDKUser, type NDKSigner, type NostrEvent } from '@nostr-dev-kit/ndk';
    import { closeModal } from 'svelte-modals';
    import AttentionButton from "../../components/buttons/AttentionButton.svelte";
    import { ndk } from '../../stores/ndk';
    import { newToasterMessage, user } from '../..';
    import ModalWrapper from '../../components/modals/ModalWrapper.svelte';
    import { EventContent } from '@nostr-dev-kit/ndk-svelte-components';
    import Textarea from '../../components/Form/Textarea.svelte';

    export let event: NDKEvent;

    let comment: string;
    let publishing = false;

    async function save() {
        if (comment && comment.length > 0) {
            const commentEvent = new NDKEvent($ndk, {
                kind: 1,
                content: comment,
                pubkey: $user.hexpubkey,
            } as NostrEvent)
            commentEvent.tag(event, 'reply');

            await commentEvent.sign();
            publishing = true;

            try {
                await commentEvent.publish();
                closeModal();
            } catch (e) {
                newToasterMessage("Unable to post reply: " + e.message, "error")
            }
        }
    }
</script>

<ModalWrapper
    class="!max-w-lg" bodyClass="p-8 flex flex-col gap-8"
    title="Reply"
>
    <EventContent ndk={$ndk} {event} />

    <Textarea
        bind:value={comment}
        autofocus={true}
        class="min-h-96 bg-base-300 focus:border-0 focus:ring-accent2"
    ></Textarea>

    <AttentionButton on:click={save}>
        {#if !publishing}
            Publish
        {:else}
            <div class="loading loading-sm"></div>
        {/if}
    </AttentionButton>
</ModalWrapper>

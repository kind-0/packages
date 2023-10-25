<script lang="ts">
    import { closeModal } from 'svelte-modals';
    import { ModalWrapper } from '..';
    import ModalButton from '../components/buttons/ModalButton.svelte';
    import { Link } from 'phosphor-svelte';
    import CopyButton from '../components/buttons/CopyButton.svelte';

    export let paymentRequest: string;
</script>

<ModalWrapper title="Lightning Invoice" class="max-w-md">
    <textarea class="input font-mono">{paymentRequest}</textarea>

    <div class="flex flex-row items-center-gap-2">
        <CopyButton data={paymentRequest} class="btn btn-circle" />
        <a href="lightning:{paymentRequest}" class="btn btn-circle">
            <Link class="w-4 h-4" weight="fill" />
        </a>

    </div>



    <ModalButton on:click={closeModal}>
        Close
    </ModalButton>
</ModalWrapper>

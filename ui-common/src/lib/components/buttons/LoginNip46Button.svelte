<script lang="ts">
    import { openModal } from 'svelte-modals';
    import SubtleButton from './SubtleButton.svelte';
    import Nip46LoginModal from '../../modals/Nip46LoginModal.svelte';

    export let loginNip46: () => void;

    async function openNip46Modal() {
        // Close dropdown
        if (document.activeElement instanceof HTMLElement) {
            document.activeElement.blur();
        }

        openModal(Nip46LoginModal, {loginNip46});
    }
</script>

<SubtleButton on:click={openNip46Modal} class="w-full">
    <span>nsecBunker</span>
</SubtleButton>

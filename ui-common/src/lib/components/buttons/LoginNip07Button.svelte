<script lang="ts">
    import SubtleButton from './SubtleButton.svelte';
    import PuzzleIcon from '../../icons/PuzzleIcon.svelte';
    import { BROWSER } from 'esm-env'

    export let loginNip07: (e: MouseEvent) => void;

    let noNip07extenion: boolean;

    $: noNip07extenion = BROWSER ? !window.nostr : false;

</script>

<SubtleButton on:click={loginNip07} class={noNip07extenion ? "btn-disabled" : ""}>
    <div class="flex flex-row items-center gap-4">
        <PuzzleIcon/>
        {#if noNip07extenion}
            <span>No Active Extension</span>
        {:else}
            <span>Browser Extension</span>
        {/if}
    </div>
</SubtleButton>


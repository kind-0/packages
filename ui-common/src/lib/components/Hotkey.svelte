<script lang="ts">
    import { prettifyKey } from '../utils/key';

    export let hotkey: any | undefined = undefined;
    export let hidden = true;
</script>

<div class="kbd-container ml-4 !text-sm {$$props.class??""} duration-300 transition-all" class:opacity-0={hidden} class:always-visible={hidden === false}>
    {#if hotkey.modifier}
        {#each hotkey.modifier as mod}
            <kbd>{prettifyKey(mod)}</kbd>
        {/each}
    {/if}
    {#if hotkey.key}
        <kbd class="">{prettifyKey(hotkey.key)}</kbd>
    {/if}
</div>
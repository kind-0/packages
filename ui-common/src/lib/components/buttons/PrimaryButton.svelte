<script lang="ts">
    export let button: any | undefined = undefined;
    export let href: string | undefined = undefined;
    export let hotkey: any | undefined = undefined;
    export let tooltip: string | undefined = undefined;
    export let color: 'accent' | 'accent2' = 'accent2';
    import { shortcut } from '@svelte-put/shortcut';
    import { Hotkey, prettifyKey } from '../..';


    const trigger = hotkey ? {
        ...hotkey,
        callback: () => {
            console.log('triggered');
            button.click();
        },
        preventDefault: true
    } : {};

    if (hotkey) {
        tooltip = `${
            hotkey.modifier?.map(prettifyKey).join(' ')} ${prettifyKey(hotkey.key)
        }`;
    }
</script>

<svelte:window use:shortcut={{trigger}} />

<div class="tooltip w-full {$$props.tooltipClass??""}" data-tip={tooltip}>
    {#if href}
        <a {...$$props} {href} class="{$$props.class??""} {color} relative" on:click bind:this={button}>
            <slot />

            {#if hotkey}
                <span class="absolute right-0 z-50">
                    <Hotkey {hotkey} class="ml-0 bg-black/50 mr-2 rounded-lg" />
                </span>
            {/if}
        </a>
    {:else}
        <button {...$$props} class="{$$props.class??""} {color} relative" on:click bind:this={button}>
            <slot />

            {#if hotkey}
                <span class="absolute right-0 z-50">
                    <Hotkey {hotkey} class="ml-0 bg-black/50 mr-2 rounded-lg" />
                </span>
            {/if}
        </button>
    {/if}
</div>

<style lang="postcss">
    button, a {
        @apply btn rounded-full px-6 font-normal text-base-100-content capitalize text-base;
        @apply border;
        @apply duration-300 transition-all;
    }

    button[disabled], a[disabled] {
        @apply cursor-not-allowed !important;
    }

    button.accent, a.accent {
        @apply border border-accent/50 bg-accent/30;
    }

    button.accent:hover, a.accent:hover {
        @apply border-accent/70 bg-accent/40;
    }

    button.accent2[disabled], a.accent2[disabled] {
        @apply bg-accent2/20;
        @apply text-white/30;
        @apply cursor-not-allowed !important;
    }

    button.accent2, a.accent2 {
        @apply border border-accent2/50 bg-accent2/30;
    }

    button.accent2:hover, a.accent2:hover {
        @apply border-accent2/70 bg-accent2/40;
    }

    button.accent2[disabled], a.accent2[disabled] {
        @apply bg-accent2/20;
        @apply text-white/30;
        @apply cursor-not-allowed !important;
    }
</style>
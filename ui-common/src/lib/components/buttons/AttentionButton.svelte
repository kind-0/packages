<script lang="ts">
    export let href: string | undefined = undefined;
</script>

{#if href}
    <a {href} on:click class={$$props.class??""}>
        <slot />
    </a>
{:else}
    <button on:click class={$$props.class??""}>
        <slot />
    </button>
{/if}

<style lang="postcss">
    a, button {
        @apply btn h-11 bg-base-100 rounded-full border-2 border-accent2 text-base-100-content font-medium normal-case hover:bg-accent2 hover:bg-opacity-20 hover:border-accent2 overflow-hidden whitespace-nowrap flex-nowrap;
        box-shadow: 0px 0px 21px 2px rgba(142, 113, 255, 0.33);
    }
</style>
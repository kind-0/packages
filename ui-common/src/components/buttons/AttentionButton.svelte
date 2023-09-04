<script lang="ts">
    export let href: string | undefined = undefined;
</script>

{#if href}
    <a {href} on:click class="attention-btn {$$props.class??""}">
        <slot />
    </a>
{:else}
    <button on:click class="attention-btn btn h-11 bg-base-100 rounded-full border-2 border-accent text-base-100-content text-xs font-medium normal-case hover:bg-accent hover:bg-opacity-20 hover:border-accent2 {$$props.class??""}">
        <slot />
    </button>
{/if}

<style lang="postcss">
    .attention-btn {
        @apply btn h-11 bg-base-100 rounded-full btn-rounded-full border-2 border-accent text-base-100-content text-xs font-medium normal-case hover:bg-accent hover:bg-opacity-20 hover:border-accent2 overflow-hidden whitespace-nowrap flex-nowrap;
        box-shadow: 0px 0px 21px 2px rgba(142, 113, 255, 0.33);
    }
</style>
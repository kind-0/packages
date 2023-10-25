<script lang="ts">
    export let href: string | undefined = undefined;
    export let color: 'accent' | 'accent2' = 'accent2';
    export let loading = false;
</script>

{#if href}
    <a {href} on:click class="attention-button text-base-100-content {color} {$$props.class??""}">
        {#if loading}
            <span class="loading loading-spinner loading-sm opacity-50"></span>
        {:else}
            <slot />
        {/if}
    </a>
{:else}
    <button on:click class="attention-button text-base-100-content {color} {$$props.class??""} {loading ? `` : ``}">
        {#if loading}
            <span class="loading loading-spinner loading-sm opacity-50"></span>
        {:else}
            <slot />
        {/if}
    </button>
{/if}

<style lang="postcss">
    a, button {
        @apply btn h-11 bg-base-100 rounded-full border-2 font-medium normal-case overflow-hidden whitespace-nowrap flex-nowrap font-normal px-8;
        @apply transition-all duration-100;
    }

    a.accent, button.accent {
        @apply border-accent hover:bg-accent/20 hover:border-accent;
        box-shadow: 0px 0px 21px 2px #FB603855;
    }

    a.accent2, button.accent2 {
        @apply border-accent2 hover:bg-accent2/20 hover:border-accent2;
        box-shadow: 0px 0px 21px 2px rgba(142, 113, 255, 0.33);
    }
</style>
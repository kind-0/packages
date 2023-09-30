<script lang="ts">
    import type { SvelteComponent } from "svelte";
    import { slide } from "svelte/transition";
    import { createEventDispatcher } from "svelte";

    const dispatch = createEventDispatcher();

    export let title: string;
    export let icon: typeof SvelteComponent | undefined = undefined;
    export let open: boolean = true;

    function openToggle() {
        open = !open;

        dispatch("open", open);
    }
</script>

<div class="bg-base-200 rounded-xl shadow divide-y divide-neutral-800">
    <button
        class="flex p-l gap-5 text-base-100-content items-center w-full"
        on:click={openToggle}
    >
        {#if $$slots.icon}
            <slot name="icon" />
        {:else}
            <svelte:component this={icon} class="text-accent w-6 h-6" />
        {/if}

        {title}
    </button>

    {#if open}
        <ul class="menu flex-nowrap" transition:slide>
            <slot />
        </ul>
    {/if}
</div>
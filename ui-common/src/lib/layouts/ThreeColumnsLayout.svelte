<script lang="ts">
    import Toaster from "../components/Toaster/Toaster.svelte";
    import { rightSidebar } from "../stores/layout.js";

    //export let mainClass = ``
</script>

<div class="flex flex-col px-0 lg:px-4 gap-0 lg:gap-8 min-h-screen">
    {#if $$slots.navbar}
        <div class="flex flex-row sticky top-0 z-50">
            <slot name="navbar" />
        </div>
    {/if}

    <div class="flex flex-row px-0 gap-32 lg:mx-auto">
        <div class="hidden lg:block w-auto lg:w-sidebar sticky max-h-[90vh] overflow-y-auto top-[100px]">
            {#if $$slots.sidebar}
                <slot name="sidebar" />
            {/if}
        </div>
        <div class="flex flex-col lg:basis-3/5 justify-start lg:w-main w-full px-2 lg:px-0">
            <slot />
        </div>
        <div class="max-lg:hidden basis-1/5 sticky top-[100px] max-h-[90vh] overflow-y-auto lg:w-sidebar">
            {#if $$slots.rightSidebar}
                <slot name="rightSidebar" />
            {:else if $rightSidebar?.component}
                <svelte:component this={$rightSidebar.component} {...$rightSidebar.props} />
            {/if}
        </div>
    </div>
</div>

<Toaster />
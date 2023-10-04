<script lang="ts">
    import Toaster from "../components/Toaster/Toaster.svelte";
    import { rightSidebar } from "../stores/layout.js";

    /*


    */
</script>

<div class="w-screen flex flex-col gap-0 lg:gap-8 min-h-screen">
    {#if $$slots.navbar}
        <div class="flex flex-row sticky top-0 z-50">
            <slot name="navbar" />
        </div>
    {/if}

    <div class="flex flex-row w-full px-0 lg:px-2">
        <div class="max-lg:hidden min-w-sidebar sticky top-0 max-h-[90vh] overflow-y-auto">
            {#if $$slots.sidebar}
                <slot name="sidebar" />
            {/if}
        </div>
        <div class="flex flex-col basis-3/5 justify-start">
            <slot />
        </div>
        <div class="max-lg:hidden basis-1/5 sticky top-0 max-h-[90vh] overflow-y-auto">
            {#if $$slots.rightSidebar}
                <slot name="rightSidebar" />
            {:else if $rightSidebar?.component}
                <svelte:component this={$rightSidebar.component} {...$rightSidebar.props} />
            {/if}
        </div>
    </div>
</div>

<Toaster />
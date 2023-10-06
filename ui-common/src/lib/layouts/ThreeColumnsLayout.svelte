<script lang="ts">
    import Toaster from "../components/Toaster/Toaster.svelte";
    import { rightSidebar } from "../stores/layout.js";
</script>

<div class="w-screen flex flex-col px-0 gap-0 min-h-screen">
    {#if $$slots.navbar}
        <div class="flex flex-row sticky top-0 z-50">
            <slot name="navbar" />
        </div>
    {/if}

    <div class="flex flex-row gap-0 lg:gap-4 justify-between">
        <div class="flex flex-row w-full justify-start gap-4">
            <div class="max-lg:hidden flex flex-col w-sidebar max-h-[90vh] overflow-y-auto pl-2">
                {#if $$slots.sidebar}
                    <slot name="sidebar" />
                {/if}
            </div>
            <div class="flex flex-col w-full lg:w-auto lg:flex-1">
                <slot />
            </div>
        </div>
        <div class="max-lg:hidden flex flex-col w-sidebar sticky top-0 max-h-[90vh] overflow-y-auto">
            {#if $$slots.rightSidebar}
                <slot name="rightSidebar" />
            {:else if $rightSidebar?.component}
                <svelte:component this={$rightSidebar.component} {...$rightSidebar.props} />
            {/if}
        </div>
    </div>
</div>

<Toaster />
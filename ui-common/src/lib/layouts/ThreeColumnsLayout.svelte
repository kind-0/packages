<script lang="ts">
    import Toaster from "../components/Toaster/Toaster.svelte";
    import { rightSidebar } from "../stores/layout.js";

    //export let mainClass = ``
</script>

<<<<<<< Updated upstream
<div class="flex flex-col px-0 lg:px-4 gap-0 lg:gap-8 min-h-screen">
=======
<div class="w-screen flex flex-col px-0 gap-0 min-h-screen">
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
        <div class="flex flex-col basis-3/5 justify-start lg:w-main">
            <slot />
        </div>
        <div class="max-lg:hidden basis-1/5 sticky top-0 max-h-[90vh] overflow-y-auto lg:w-sidebar">
=======
        <div class="max-lg:hidden flex flex-col w-sidebar sticky top-0 max-h-[90vh] overflow-y-auto">
>>>>>>> Stashed changes
            {#if $$slots.rightSidebar}
                <slot name="rightSidebar" />
            {:else if $rightSidebar?.component}
                <svelte:component this={$rightSidebar.component} {...$rightSidebar.props} />
            {/if}
        </div>
    </div>
</div>

<Toaster />
<script lang="ts">
    import Toaster from "../components/Toaster/Toaster.svelte";
</script>

<div class="w-screen lg:w-fit mx-auto flex flex-col gap-8 min-h-screen">
    {#if $$slots.navbar}
        <div class="flex flex-row gap-32 sticky top-0 z-50">
            <slot name="navbar" />
        </div>
    {/if}

    <div class="flex flex-row px-4 gap-4">
        <div class="hidden lg:block w-auto lg:w-sidebar sticky max-h-[90vh] overflow-y-auto top-0">
            {#if $$slots.sidebar}
                <slot name="sidebar" />
            {/if}
        </div>
        <div class="w-screen lg:w-main flex flex-col justify-start lg:justify-stretch">
            <slot />
        </div>
        <div class="hidden lg:block w-auto lg:w-sidebar sticky top-0 max-h-[90vh] overflow-y-auto">
            {#if $$slots.rightSidebar}
                <slot name="rightSidebar" />
            {/if}
        </div>
    </div>
</div>

<Toaster />
<script lang="ts">
</script>

<div class="w-fit mx-auto flex flex-col gap-32 min-h-screen">
    {#if $$slots.navbar}
        <div class="flex flex-row gap-32 sticky top-0 z-50">
            <slot name="navbar" />
        </div>
    {/if}

    <div class="flex flex-row gap-32 flex-grow">
        <div class="w-sidebar sticky max-h-[90vh] overflow-y-auto top-0">
            {#if $$slots.sidebar}
                <slot name="sidebar" />
            {/if}
        </div>
        <div class="w-main flex flex-col justify-stretch">
            <slot />
        </div>
        <div class="w-sidebar sticky top-0 max-h-[90vh] overflow-y-auto">
            {#if $$slots.rightSidebar}
                <slot name="rightSidebar" />
            {/if}
        </div>
    </div>
</div>

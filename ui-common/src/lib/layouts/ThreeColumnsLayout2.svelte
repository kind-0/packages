<script lang="ts">
    import { rightSidebar } from "../stores/layout.js";
</script>

<div class="flex flex-row min-h-screen h-full w-screen justify-center items-start bg-orange-200 p-4 gap-4">
    <div class="flex flex-col basis-1/4 h-full justify-center items-center bg-red-200">
        {#if $$slots.sidebar}
            <slot name="sidebar" />
        {/if}
    </div>
    <div class="flex flex-col w-main h-full overflow-x-scroll justify-start items-start bg-blue-200">
        <slot />
    </div>
    <div class="flex flex-col basis-1/4 h-full justify-center items-center bg-yellow-300">
        {#if $$slots.rightSidebar}
            <slot name="rightSidebar" />
        {:else if $rightSidebar?.component}
            <svelte:component this={$rightSidebar.component} {...$rightSidebar.props} />
        {/if}
    </div>
</div>
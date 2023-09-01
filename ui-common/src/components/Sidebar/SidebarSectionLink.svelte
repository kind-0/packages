<script lang="ts">
    export let title: string | undefined = undefined;
    export let href: string;
</script>

<a
    {href}
    class="btn w-full justify-start !rounded-box px-6 h-fit"
>
    <div class="flex flex-row gap-5 items-center hover:!bg-transparent text-base">
        <slot name="icon" />

        {#if title}
            <div class="text-base-100-content font-normal">
                {title}
            </div>
        {:else}
            <slot />
        {/if}
    </div>
</a>
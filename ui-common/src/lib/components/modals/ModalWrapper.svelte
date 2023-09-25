<script lang="ts">
    import { X } from "phosphor-svelte";
    import { closeModal } from "svelte-modals";
    import { fade } from "svelte/transition";

    export let title: string | undefined;
    export let subtitle: string | undefined = undefined;
</script>

<div class="
    fixed
    h-screen top-0 bottom-0 px-2 lg:px-0
    flex justify-center items-center
    z-50
    w-screen
" transition:fade on:click={closeModal}>
    <div class="
        card
        rounded-3xl
        max-w-4xl
        shadow-xl
        flex flex-col
        relative
        overflow-y-auto
        {$$props.class}
    " style="pointer-events: auto; max-height: 80vh;" on:click|stopPropagation={()=>{}}>
        <div class="flex flex-col divide-y divide-neutral-800">
            <div class="relative flex w-full justify-center items-center">
                <div
                    class="absolute"
                    style="left: 22px; top: 22px;"
                >
                    <button on:click={closeModal} class="btn-close-inner w-7 h-7 p-1.5 rounded-full">
                        <X />
                    </button>
                </div>
                {#if title}
                    <div class="flex flex-col items-center py-6" style="padding-top: 1.5rem;
                    padding-bottom: 1.5rem;">
                        <div class="card-title text-base-100-content text-base font-medium">
                            {title}
                        </div>

                        {#if subtitle}
                            <div class="text-sm text-accent2">
                                {subtitle}
                            </div>
                        {/if}
                    </div>
                {/if}
            </div>
            <div class="card-body {$$props.bodyClass}">
                <slot />
            </div>
        </div>
    </div>
</div>

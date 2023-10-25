<script lang="ts">
    import { X } from "phosphor-svelte";
    import { closeModal } from "svelte-modals";
    import { fade } from "svelte/transition";
    import { createEventDispatcher } from "svelte";

    const dispatch = createEventDispatcher();

    export let title: string | undefined;
    export let subtitle: string | undefined = undefined;

    /**
     * @deprecated Really bad pattern; please don't use, use events.
     */
    export let onModalClose = async () => {return}
    export let modalErrorMessage: string = ``

    /**
     * @deprecated Really bad pattern; please don't use, use events.
     */
    export let onModalErrorMessageClose = async () => {return}

    async function onClose() {
        closeModal()
        dispatch("close");
        await onModalClose()
    }
</script>

<div class="
    fixed
    h-screen top-0 bottom-0 px-4 lg:px-0
    flex justify-center items-center
    z-50
    w-screen
" transition:fade on:click={onClose}>
    <div class="
        card
        rounded-3xl
        max-lg:w-full w-96
        shadow-xl
        flex flex-col
        relative
        overflow-y-hidden
        {$$props.class}
    " style="pointer-events: auto; max-height: 92vh;" on:click|stopPropagation={()=>{}}>
        <div class="flex flex-col divide-y divide-base-300">
            <div class="relative flex w-full justify-center items-center">
                <div
                    class="absolute"
                    style="left: 22px; top: 22px;"
                >
                    <button on:click={onClose} class="btn-close-inner w-7 h-7 p-1.5 rounded-full">
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
            <div class="card-body h-full {$$props.bodyClass || ``}">
                {#if !!modalErrorMessage}
                    <div class="flex flex-col h-full w-full justify-center items-between gap-4">
                        <div class="flex flex-row w-full justify-center items-center px-2 gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
                            </svg>
                            <div class="flex">
                            <p class="font-sans font-medium text-base">
                                {`Error:`}
                            </p>
                            </div>
                        </div>

                        <div class="flex flex-row w-full justify-center items-center">
                            <p class="font-sans font-medium text-base text-center">
                                {modalErrorMessage}
                            </p>
                        </div>

                        <div class="flex flex-row w-full justify-center items-center pt-2 px-2 gap-2">
                            <button type="button" class="btn btn-sm btn-wide btn-neutral" on:click|preventDefault={async () => await onModalErrorMessageClose()}>
                                {`Go back`}
                            </button>
                        </div>
                    </div>
                {:else}
                    <div class="flex flex-col h-full w-full scrollbar-hide">
                        <slot />
                    </div>
                {/if}
            </div>
        </div>
    </div>
</div>

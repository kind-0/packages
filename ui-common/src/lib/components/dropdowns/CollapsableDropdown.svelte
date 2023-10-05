<script lang="ts">
    import CloseIcon from '../../icons/CloseIcon.svelte';

    let isOpen: boolean = false;

    function clickOutside(node) {
        const handleClick = (event) => {
            if (!node.contains(event.target)) {
                node.dispatchEvent(new CustomEvent('outclick'));
            }
        };

        document.addEventListener('click', handleClick, true);

        return {
            destroy() {
                document.removeEventListener('click', handleClick, true);
            }
        };
    }

</script>

<div class="relative">
    <button
        on:click={() => (isOpen = true)}
        class="{!isOpen ? 'block' : 'hidden'} transition-all"
    >
        <slot name="dropdown-btn-open" />
    </button>

    <button
        on:click={() => (isOpen = false)}
        class="{isOpen ? 'block' : 'hidden'} transition-all"
    >
        <slot name="dropdown-btn-close">
            <button class="btn btn-circle border grid place-items-center border-accent hover:border-accent">
                <div class={"w-6 h-6 p-1 rounded-full"}>
                    <CloseIcon />
                </div>
            </button>
        </slot>
    </button>

    {#if isOpen}
        <div
            use:clickOutside
            on:outclick={() => (isOpen = false)}
        >
            <slot name="dropdown-content" />
        </div>
    {/if}
</div>

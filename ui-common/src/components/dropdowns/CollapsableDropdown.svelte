<script lang="ts">
    import CloseIcon from "../../icons/CloseIcon.svelte";

    export let closeInnerClass: string = "";
    export let closeOutterClass: string = "";
    let hasFocus: boolean = false;

    async function toggleDropdown() {
        if (hasFocus) {
            // Close dropdown
            if (document.activeElement instanceof HTMLElement) {
                document.activeElement.blur();
                hasFocus = false;
            }
            return
        }
        hasFocus = true;
    }

</script>

<div class="dropdown {hasFocus ? 'dropdown-open': ''} dropdown-end">
    <label tabindex="0" on:click={toggleDropdown} >
        <div class="{hasFocus ? 'hidden' : 'transition duration-500 ease-out flex items-center'} transition">
            <slot name="dropdown-button" />
        </div>
        <div class={`${!hasFocus ? 'hidden' : ''} btn-circle border grid place-items-center ${closeOutterClass}`}>
            <div class={`w-6 h-6 p-1 rounded-full ${closeInnerClass}`}>
                <CloseIcon />
            </div>
        </div>
    </label>
    <div tabindex="0" class="dropdown-content z-[1] mt-2">
        <slot />
    </div>
</div>

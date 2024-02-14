<script lang="ts">
    import { createTextareaAutosize } from '@grail-ui/svelte';
    import { onMount } from 'svelte';
    import { createEventDispatcher } from 'svelte';

    const dispatch = createEventDispatcher();

    export let value = '';
    export let element: HTMLTextAreaElement | null = null;
    export let fixedHeight = false;

    const { useTextareaAutosize } =  createTextareaAutosize();

    function keydown(event) {
        if (event.key === 'Enter' && event.metaKey) {
            event.preventDefault();
            dispatch('submit', { value });
        }

        dispatch('keydown', event);
    }

    function dropTextarea(node) {
        let textarea = node;

        // Add event listeners
        textarea.addEventListener('dragover', handleDragOver);
        textarea.addEventListener('drop', handleDrop);

        // Handle the dragover event
        function handleDragOver(event) {
            event.preventDefault();
            event.dataTransfer.dropEffect = 'copy';
        }

        // Handle the drop event
        function handleDrop(event) {
            event.preventDefault();
            const text = event.dataTransfer.getData('id');

            if (!text) return;

            const selectionStart = textarea.selectionStart;
            const selectionEnd = textarea.selectionEnd;
            const currentValue = textarea.value;

            // Insert the dropped text into the textarea at the current selection
            const newValue =
                currentValue.slice(0, selectionStart) +
                '@' + text + '\n\n'
                currentValue.slice(selectionEnd);

            // Update the textarea value
            value = newValue;

            // Dispatch an event indicating that the textarea value has changed
            dispatch('change', { value: newValue });
        }

        // Cleanup the event listeners when the component is destroyed
        onMount(() => {
            return () => {
                textarea.removeEventListener('dragover', handleDragOver);
                textarea.removeEventListener('drop', handleDrop);
            };
        });
    }
</script>

{#if fixedHeight}
    <textarea
        bind:value
        bind:this={element}
        on:keydown={keydown}
        on:keyup
        on:focus
        on:blur
        on:change
        on:input
        use:dropTextarea
        {...$$props}
        class="resize-none {$$props.class??""}"></textarea>
{:else}
    <textarea
        use:useTextareaAutosize
        bind:value
        bind:this={element}
        on:keydown={keydown}
        on:keyup
        on:focus
        on:blur
        on:change
        on:input
        use:dropTextarea
        {...$$props}
        class="resize-none {$$props.class??""}"></textarea>
{/if}
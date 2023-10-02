<script lang="ts">
    export let element: HTMLInputElement | null = null;
    export let value: string = '';
</script>

<input
    bind:value
    bind:this={element}
    on:keydown
    on:keyup
    on:change
    on:blur
    on:input
    class="
        input input-bordered focus:outline-0 focus:ring-0
    {$$props.class??""}
" {...$$props} />
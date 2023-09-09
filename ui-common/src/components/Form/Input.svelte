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
    class="
        input input-bordered
    {$$props.class??""}
" {...$$props} />
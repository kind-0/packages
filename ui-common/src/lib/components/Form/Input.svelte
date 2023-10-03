<script lang="ts">
    export let element: HTMLInputElement | null = null;
    export let value: string = '';
    export let _class = ``
</script>

<input
    bind:value
    bind:this={element}
    on:keydown
    on:keyup
    on:change
    on:blur
    class="
        input input-bordered focus:outline-0 focus:ring-0 rounded-xl border-2 border-base-300
    {$$props.class??""} {_class}
" {...$$props} />
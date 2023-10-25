<script lang="ts">
    import AttentionButton from "./AttentionButton.svelte";

    export let loading = false
</script>

<AttentionButton on:click {loading}
    class="tracking-wider {$$props.class??''}"
>
    <slot />
</AttentionButton>
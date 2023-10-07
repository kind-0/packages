<script lang="ts">
    import SectionTitle from "./SectionTitle.svelte";

    export let title: string;
</script>

<div class="flex flex-col gap-8">
    <SectionTitle {title}></SectionTitle>

    <slot />
</div>
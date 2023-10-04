<script lang="ts">
    export let href: string = '#';
    export let active: boolean = false;
    export let color: string = 'accent2';
</script>

<li class={$$props.class || ``}>
    <a
        {href}
        class="
            flex flex-row flex-grow
            {active ? `border-l-${color}` : ""}
        "
        class:active={active}
        on:click
    >
        <span class="truncate {$$props.innerClass}">
            <slot />
        </span>
    </a>
</li>

<style>
    li a.active {
        @apply bg-transparent;
        @apply border-l-4 rounded-l-none -ml-2 pl-5;
        @apply text-base-100-content;
    }
</style>
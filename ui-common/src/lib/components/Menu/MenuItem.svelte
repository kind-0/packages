<script lang="ts">
    export let href: string = '#';
    export let active: boolean = false;
    export let color: string = 'accent2';
    export let hotkey: any | undefined = undefined;
    export let tooltip: string | undefined = undefined;

    import { shortcut, type ShortcutEventDetail } from '@svelte-put/shortcut';
    import Hotkey from "../Hotkey.svelte";
    import { prettifyKey } from '../../utils/key';

    let button: HTMLElement;

    const trigger = hotkey ? {
        ...hotkey,
        callback: () => {
            button.click();
        },
        preventDefault: true,
    } : {};

    if (hotkey) {
        tooltip = `${hotkey.modifier?.map(prettifyKey).join(' ')} ${prettifyKey(hotkey.key)}`;
    }
</script>

<svelte:window use:shortcut={{trigger}} />

<li>
    <a
        bind:this={button}
        {href}
        class="
            flex flex-row flex-grow
            {active ? `border-l-${color}` : ""}
            {$$props.class??""}
        "
        class:active={active}
        on:click
    >
        <span class="truncate {$$props.innerClass} flex-grow">
            <slot />
        </span>

        {#if hotkey}
            <Hotkey {hotkey} />
        {/if}
    </a>
</li>

<script lang="ts">
    import { ndk } from "../../stores/ndk.js";

    import {Name} from '@nostr-dev-kit/ndk-svelte-components';
    import type { NDKUser, NDKUserProfile } from '@nostr-dev-kit/ndk';

    export let pubkey: string | undefined = undefined;
    export let user: NDKUser | undefined = undefined;
    export let userProfile: NDKUserProfile | undefined = undefined;

    /**
     * Flag when the fetching is being done in a higher component
     **/
    export let fetching: boolean | undefined = undefined;

    const randSkeletonWidth = Math.max(Math.floor(Math.random() * 100) + 120, 190);

    const defaultLoadingClass = "skeleton h-[15px]";
    const defaultLoadingStyle = `width: ${randSkeletonWidth}px; height: 15px;`;
</script>

{#if !userProfile && fetching}
    <div
        style={$$props.loadingStyle ? $$props.loadingStyle : defaultLoadingStyle}
        class={$$props.loadingClass ? $$props.loadingClass : defaultLoadingClass}
    />
{:else if userProfile || user || pubkey}
    <Name
        ndk={$ndk}
        {pubkey}
        {user}
        {userProfile}
        class={$$props.class || ``}
        on:click
    />
{/if}
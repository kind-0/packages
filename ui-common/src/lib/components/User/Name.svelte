<script lang="ts">
    import { ndk } from "../../stores/ndk.js";

    import {Name} from '@nostr-dev-kit/ndk-svelte-components';
    import type { NDKUser, NDKUserProfile } from '@nostr-dev-kit/ndk';

    export let pubkey: string | undefined = undefined;
    export let user: NDKUser | undefined = undefined;
    export let userProfile: NDKUserProfile | undefined = undefined;
</script>

<Name
    ndk={$ndk}
    {pubkey}
    {user}
    {userProfile}
    class={$$props.class}
    on:click
/>
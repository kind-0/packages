<script lang="ts">
    import { ndk } from "@kind0/lib-svelte-kit";

    import {Name} from '@nostr-dev-kit/ndk-svelte-components';
    import type { NDKUser } from '@nostr-dev-kit/ndk';

    export let pubkey: string | undefined = undefined;
    export let user: NDKUser | undefined = undefined;
</script>

<Name
    ndk={$ndk}
    {pubkey}
    {user}
    class={$$props.class}
    on:click
/>
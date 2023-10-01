<script lang="ts">
    import { ndk } from "../../stores/ndk.js";
    import type { NDKUser, NDKUserProfile } from '@nostr-dev-kit/ndk';
    import {Avatar} from '@nostr-dev-kit/ndk-svelte-components';

    export let pubkey: string | undefined = undefined;
    export let npub: string | undefined = undefined;
    export let user: NDKUser | undefined = undefined;
    export let userProfile: NDKUserProfile | undefined = undefined;
    export let klass: string = $$props.class??'';
    export let size: 'tiny' | 'small' | 'medium' | 'large' | undefined = undefined;
    export let type: 'square' | 'circle' = 'circle';

    let sizeClass = '';
    let shapeClass = '';

    switch (size) {
        case 'tiny':
            sizeClass = 'w-6 h-6';
            break;
        case 'small':
            sizeClass = 'w-8 h-8';
            break;
        case 'medium':
            sizeClass = 'w-12 h-12';
            break;
    }

    switch (type) {
        case 'circle':
            shapeClass = 'rounded-full';
            break;
        case 'square':
            shapeClass = 'rounded-md';
            break;
    }
</script>

<Avatar
    ndk={$ndk}
    {pubkey}
    {npub}
    {user}
    {userProfile}
    class="{shapeClass} {sizeClass} {$$props.class??klass}"
/>
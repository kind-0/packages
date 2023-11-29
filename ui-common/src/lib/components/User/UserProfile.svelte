<script lang="ts">
    import { ndk } from "../../stores/ndk.js";
    import type { Hexpubkey, NDKSubscriptionOptions, NDKUserProfile } from "@nostr-dev-kit/ndk";
    import type { NDKUser } from "@nostr-dev-kit/ndk";

    export let pubkey: Hexpubkey | undefined = undefined;
    export let npub: string | undefined = undefined;
    export let user: NDKUser | undefined = $ndk.getUser({npub, pubkey});
    export let subsOptions: NDKSubscriptionOptions | undefined = undefined;

    let fetching: boolean = true;

    let userProfile: NDKUserProfile | undefined | null = undefined;
    let error: string | undefined = undefined;

    user.fetchProfile(subsOptions).then((p) => {
        userProfile = p;
    }).catch((e) => {
        error = e?.message ?? e.toString() ?? "Unknown error";
        userProfile = null;
    }).finally(() => {
        fetching = false;
    });
</script>

<slot {userProfile} {fetching} />
<script lang="ts">
    import Avatar from './Avatar.svelte';
    import Name from './Name.svelte';
    import type { NDKUser, NDKUserProfile } from '@nostr-dev-kit/ndk';
    import { ndk } from "../../stores/ndk.js";

    export let pubkey: string | undefined = undefined;
    export let user: NDKUser | undefined = undefined;
    export let npub: string | undefined = undefined;
    export let subtitle: string | undefined = undefined;
    export let avatarClass: string = "w-10 h-10";
    export let userProfile: NDKUserProfile | undefined = undefined;

    const fetchProfile = new Promise<void>((resolve, reject) => {
        user ??= $ndk.getUser({npub, hexpubkey: pubkey});

        user.fetchProfile({
            groupable: true,
            groupableDelay: 2000,
        }).then(() => {
            userProfile = user.profile;
            resolve();
        }).catch(reject);
    })
</script>

{#await fetchProfile then}
    <div class="group block flex-shrink-0">
        <div class="flex items-center gap-2">
            <div class="flex-shrink-0">
                <Avatar {user} {pubkey} {userProfile} class={avatarClass} />
            </div>
            <div>
                <p class="text-sm font-medium"><span class={$$props.nameClass}><Name {user} {pubkey} {userProfile} /></span></p>
                <div class="text-xs truncate">
                    {#if subtitle}
                        {subtitle}
                    {:else if $$slots.bio}
                        <slot name="bio" />
                    {/if}
                </div>
            </div>
        </div>
    </div>
{/await}
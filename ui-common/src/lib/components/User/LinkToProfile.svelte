<script lang="ts">
    import { NDKUser } from "@nostr-dev-kit/ndk";
    import AvatarWithName from "./AvatarWithName.svelte";
    import { prettifyNip05 } from "@nostr-dev-kit/ndk-svelte-components";

    export let user: NDKUser;
    export let prefix = "/p/";

    let link: string | undefined;

    user.fetchProfile().then(profile => {
        link = `${prefix}${user.npub}`;

        const { nip05 } = profile;

        if (nip05) {
            user.validateNip05(nip05).then((valid) => {
                if (!valid) return;

                link = `${prefix}${prettifyNip05(nip05)}`;
            })
        }
    })

</script>

{#if link}
    <a href={link} class={$$props.class}>
        {#if !$$slots.default}
            <AvatarWithName {user} />
        {:else}
            <slot />
        {/if}
    </a>
{/if}
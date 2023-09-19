<script lang="ts">
    import { NDKUser } from "@nostr-dev-kit/ndk";
    import AvatarWithName from "./AvatarWithName.svelte";
  import { prettifyNip05 } from "@nostr-dev-kit/ndk-svelte-components";

    export let user: NDKUser;

    let link: string | undefined;

    user.fetchProfile().then(profile => {
        link = `/u/${user.npub}`;

        const { nip05 } = profile;

        if (nip05) {
            user.validateNip05(nip05).then((valid) => {
                if (!valid) return;

                link = `/u/${prettifyNip05(nip05)}`;
            })
        }
    })

</script>

{#if link}
    <a href={link} class={$$props.class}>
        <AvatarWithName {user} />
    </a>
{/if}
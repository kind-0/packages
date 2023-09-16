<script lang="ts">
    import { type Hexpubkey, NDKArticle } from "@nostr-dev-kit/ndk";
    import AvatarWithName from "../../../User/AvatarWithName.svelte";
    import RelativeTime from "../../../RelativeTime.svelte";
  import HighlightIcon from "../../../../icons/HighlightIcon.svelte";
  import Avatar from "../../../User/Avatar.svelte";

    export let article: NDKArticle;
    export let highlightCount: number;
    export let usersWithInteractions: Hexpubkey[];

</script>

<div class="flex flex-row justify-stretch gap-4">
    {#if article.image}
        <img src={article.image} />
    {/if}

    <div class="flex flex-col justify-between">
        <div class="flex flex-col gap-4">
            <h1 class="text-3xl text-base-100-content font-bold">{article.title}</h1>
            {#if article.summary}
                <p class="text-lg">{article.summary}</p>
            {/if}
        </div>

        <div class="flex flex-row items-center justify-between">
            <AvatarWithName
                pubkey={article.author.hexpubkey}
                avatarClass="w-8 h-8 rounded-lg"
                nameClass="text-lg"
            />

            <RelativeTime
                timestamp={article.published_at * 1000}
            />

            <button
                class="btn btn-neutral btn-sm p-1 !rounded-full px-3 font-light"
            >
                <HighlightIcon class="w-4 h-4" />
                {highlightCount}
            </button>

            <div class="avatar-group -space-x-6">
                {#each usersWithInteractions.slice(0, 3) as user}
                        <Avatar
                            pubkey={user}
                            class="w-8 h-8 rounded-full"
                        />
                {/each}
            </div>
        </div>
    </div>
</div>

<style lang="postcss">
    img {
        @apply max-h-48;
    }
</style>
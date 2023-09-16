<script lang="ts">
    import { type Hexpubkey, NDKArticle } from "@nostr-dev-kit/ndk";
    import AvatarWithName from "../../../User/AvatarWithName.svelte";
    import {ndk} from "../../../../stores/ndk.js";
    import RelativeTime from "../../../RelativeTime.svelte";
    import HighlightIcon from "../../../../icons/HighlightIcon.svelte";
    import Avatar from "../../../User/Avatar.svelte";
    import Zaps from "../../EventCard/Buttons/Zaps.svelte";
    import LazyLoadedImage from "../../../Image/LazyLoadedImage.svelte";
    import { EventContent } from "@nostr-dev-kit/ndk-svelte-components";

    export let article: NDKArticle;
    export let highlightCount: number;
    export let usersWithInteractions: Hexpubkey[];

    let image = article.image;

    function chooseRandomImage() {
        const images = [
            "https://cdn.satellite.earth/aaf65dd621667c75162ce3ee845a8202bdf2aee8d70ec0f1d25fe92ecd881675.png",
            "https://cdn.satellite.earth/c50267d41d5874cb4e949e7bd472c2d06e1b297ffffac19b2f53c291a3e052d2.png",
            "https://cdn.satellite.earth/011dc8958f86dc12c5c3a477de3551c3077fb8e71a730b7cec4a678f5c021550.png",
            "https://cdn.satellite.earth/797f48e7f20d24fca9ac385c36778e644b3a1b5b9b64c65266a5e2f7aa0e5d50.png",
        ];

        return images[Math.floor(Math.random() * images.length)];
    }

    if (!image) {
        image = chooseRandomImage();
    }
</script>

<div class="card lg:card-side lg:gap-4 {$$props.class}">
    <figure class="lg:!w-[100px] bg-base-300 flex-grow">
        <LazyLoadedImage
            image={article.image}
        />
    </figure>

    <div class="card-body flex flex-col justify-between gap-6 flex-grow">
        <div class="flex flex-col gap-9">
            <h1 class="text-3xl card-title">{article.title}</h1>
            {#if article.summary}
                <div class="summary">{article.summary}</div>
            {:else}
                <div class="summary">
                    <EventContent
                        ndk={$ndk}
                        event={article}
                        content={article.content.slice(0, 200)}
                    />
                </div>
            {/if}
        </div>

        <div class="flex lg:flex-row items-center justify-between">
            <div class="flex flex-col lg:flex-row lg:items-center gap-4 lg:gap-8">
                <AvatarWithName
                    pubkey={article.author.hexpubkey}
                    avatarClass="w-8 h-8 rounded-lg"
                    nameClass="text-lg"
                />

                <RelativeTime
                    timestamp={article.published_at * 1000}
                />
            </div>

            <div class="flex flex-col lg:flex-row lg:items-center gap-4 lg:gap-8 items-end">
                <div class="flex flex-row items-center gap-2">
                    <Zaps
                        event={article}
                        class="btn btn-neutral btn-sm p-1 !rounded-full px-3 font-light"
                    />
                    <button
                        class="btn btn-neutral btn-sm p-1 !rounded-full px-3 font-light"
                    >
                        <HighlightIcon class="w-4 h-4" />
                        {highlightCount}
                    </button>
                </div>

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
</div>

<style lang="postcss">
    .byline-container {

    }

    img {
        @apply max-h-64;
    }

    .card {
        @apply card-compact;
    }

    .card-body {
        @apply !py-4;
    }

    .summary {
        @apply text-lg opacity-60;
    }

    .sm:card-wide {
        @apply card-side;
    }
</style>
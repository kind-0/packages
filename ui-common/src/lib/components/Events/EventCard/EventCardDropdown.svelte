<script lang="ts">
    import type { NDKEvent } from "@nostr-dev-kit/ndk";

    import { Anchor, Copy, DotsThree } from "phosphor-svelte";
    import { onMount } from "svelte";

    export let event: NDKEvent

    let copiedEventId = false;
    let copiedEventJSON = false;
    let hasKeyForAuthor = false;

    async function prepareDropdown() {
        // hasKeyForAuthor = !!(await getSigner());
    }

    onMount(prepareDropdown);

    // async function getSigner() {
    //     const user = await $ndk?.signer?.user();
    //     if (event.pubkey === user?.hexpubkey) {
    //         return $ndk.signer;
    //     }

    //     const allSigners = Array.from($signers.entries()).map(([_, s]) => s);
    //     const signer = allSigners.find(s => s.user.hexpubkey === event.pubkey);

    //     return signer ? signer.signer : undefined;
    // }

    // async function deleteEvent() {
    //     let signer = await getSigner();

    //     if (!signer) return;
    //     const user = await signer.user();

    //     const deletionEvent = new NDKEvent($ndk);
    //     deletionEvent.kind = 5;
    //     deletionEvent.tag(event);
    //     deletionEvent.pubkey = user.hexpubkey;
    //     await deletionEvent.sign(signer);
    //     await deletionEvent.publish();

    //     db.events.delete(event.tagId());
    //     dispatch('deleted');
    // }

    function copyId(e: Event) {
        e.stopPropagation();
        navigator.clipboard.writeText(event.encode());
        copiedEventId = true;
        setTimeout(() => {
            copiedEventId = false;
        }, 1500);
    }

    function copyJSON(e: Event) {
        e.stopPropagation();
        navigator.clipboard.writeText(JSON.stringify(event.rawEvent()));
        copiedEventJSON = true;
        setTimeout(() => {
            copiedEventJSON = false;
        }, 1500);
    }
</script>

<div class="dropdown dropdown-top lg:dropdown-end">
    <label tabindex="0" on:click|stopPropagation={prepareDropdown} class="btn bg-base-300 btn-sm !rounded-full p-2">
        <DotsThree class="w-4 h-4" />
    </label>

    <ul tabindex="0" class="dropdown-content z-[1000] menu p-2 rounded-box w-48 border border-base-300">
        <li>
            <a href="/e/{event.encode()}" class="flex flex-row items-center gap-3">
                <Anchor class="w-4 h-4" />
                Open Link
            </a>
        </li>

        <li>
            <button class="flex flex-row items-center gap-3" on:click={copyId}>
                <Copy class="w-4 h-4" />
                <span class="whitespace-nowrap">{copiedEventId ? 'Copied!' : 'Copy ID'}</span>
            </button>
        </li>

        <li>
            <button class="flex flex-row items-center gap-3" on:click={copyJSON}>
                <Copy class="w-4 h-4" />
                <span class="whitespace-nowrap">{copiedEventJSON ? 'Copied!' : 'Copy raw event'}</span>
            </button>
        </li>

        <!-- {#if hasKeyForAuthor}
            <li>
                <button class="flex flex-row items-center gap-3" on:click={deleteEvent}>
                    <Garage class="w-4 h-4" />
                    <span class="whitespace-nowrap">Request Deletion</span>
                </button>
            </li>
        {/if} -->
    </ul>
</div>

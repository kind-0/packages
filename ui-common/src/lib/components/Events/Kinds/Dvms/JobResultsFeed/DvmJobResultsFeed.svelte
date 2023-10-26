<script lang="ts">
    import { type Hexpubkey, NDKDVMRequest, NDKEvent } from "@nostr-dev-kit/ndk";
    import { onDestroy } from "svelte";
    import { derived } from "svelte/store";
    import type { Readable } from "svelte/store";
    import DvmResultCard from "./DvmResultCard.svelte";
    import { ndk } from "../../../../../stores/ndk.js";
    import PrimaryButton from "../../../../buttons/PrimaryButton.svelte";

    /**
     * Job request's results to display
     */
    export let jobRequest: NDKDVMRequest;

    /**
     * All events tagging the job request grouped by DVM pubkey
    */
    let dvms: Record<Hexpubkey, Readable<NDKEvent[]>> = {};

    const results = $ndk.storeSubscribe(
        {
            ...jobRequest.filter(),
        },
        { closeOnEose: false, groupableDelay: 1000 },
    );

    onDestroy(() => {
        results.unsubscribe();
    })

    $: for (const result of $results) {
		const key = result.pubkey;
		if (!dvms[key]) {
			dvms[key] = derived(results, (results) => results.filter((e) => e.pubkey === key));
		}
	}
</script>

{#if Object.keys(dvms).length > 0}
	<div class="indented flex flex-col gap-4">
		{#each Object.entries(dvms) as [dvmPubkey, events]}
			<DvmResultCard
                {jobRequest}
                {dvmPubkey}
                {events}
            />
		{/each}
	</div>
{/if}
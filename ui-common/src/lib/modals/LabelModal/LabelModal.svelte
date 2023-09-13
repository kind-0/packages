<script lang="ts">
    import { ndk } from "../../stores/ndk.js";
    import { NDKEvent, NDKKind, type NostrEvent } from '@nostr-dev-kit/ndk';
    import { userLabels } from "../../index.js";
    import { closeModal } from 'svelte-modals';
    import ModalWrapper from "../../components/modals/ModalWrapper.svelte";
    import TopicSelectionForm from "../../components/Form/TopicSelectionForm.svelte";
    import AttentionButton from "../../components/buttons/AttentionButton.svelte";

    /**
     * Event to be labeled
     */
    export let event: NDKEvent;

    /**
     * Labels already applied by others to this event
     */
    export let eventLabels: Set<string> = new Set<string>();

    /**
     * Label events already created by this user
     */
    export let userLabelEvents: NDKEvent[];

    async function label() {
        const labelEvent = new NDKEvent($ndk, {
            kind: NDKKind.Label,
            tags: [
                [ "L", "#t" ],
            ]
        } as NostrEvent)

        labelEvent.tags.push(event.tagReference());

        for (const topic of selectedTopics) {
            labelEvent.tags.push(["l", topic, "#t"]);
        }

        closeModal();

        await labelEvent.sign();
        await labelEvent.publish();

        // If the user previously had label events, let's delete them
        if (userLabelEvents) {
            for (const labelEvent of userLabelEvents) {
                (await labelEvent.delete()).publish();
            }
        }
    }

    let selectedTopics: string[] = [];
    let availableTopics: string[] = $userLabels ? Array.from($userLabels) : [];
    let suggestedTopics: string[] = [];

    // Add to availableTopics eventLabels
    $: if (eventLabels) {
        for (const label of eventLabels) {
            if (!availableTopics.includes(label)) {
                availableTopics.push(label);
            }
        }
    }

    // Add to availableTopics and selectedTopics userLabelEvents
    if (userLabelEvents) {
        for (const labelEvent of userLabelEvents) {
            for (const tag of labelEvent.tags) {
                if (tag[0] === "l" && tag[2] === "#t") {
                    if (!selectedTopics.includes(tag[1])) selectedTopics.push(tag[1]);
                    if (!availableTopics.includes(tag[1])) availableTopics.push(tag[1]);
                }
            }
        }

        selectedTopics = selectedTopics;
    }

    // add to suggestedTopics what's already in the event
    $: {
        if (event?.tags) {
            event.getMatchingTags("t").forEach((tag) => {
                if (!selectedTopics.includes(tag[1])) {
                    suggestedTopics.push(tag[1]);
                }
            });

            suggestedTopics = Array.from(new Set([...suggestedTopics]));
        }
    }
</script>

<ModalWrapper title="Bookmark">
    <TopicSelectionForm
        bind:availableTopics
        bind:suggestedTopics
        bind:selectedTopics
    />

    <AttentionButton
        class="w-full flex flex-row gap-8 items-center !px-10"
        on:click={selectedTopics.length > 0 ? label : closeModal}
    >
        {#if selectedTopics.length > 0}
            <div class="text-lg">Save</div>
            <div class="text-sm font-thin opacity-80">
                Under
                {selectedTopics.length}
                topics
            </div>
        {:else}
            <div class="text-lg">Close</div>
        {/if}
    </AttentionButton>
</ModalWrapper>

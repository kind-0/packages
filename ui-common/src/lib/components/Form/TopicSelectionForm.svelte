<script lang="ts">
    import AttentionButton from "../buttons/AttentionButton.svelte";
    import AddTopicInput from "./AddTopicInput.svelte";
    import TopicSelectionList from "./TopicSelectionList.svelte";

    /**
     * Labels already applied by others to this event
     */
    export let selectedTopics: string[] = [];

    export let availableTopics: string[] = [];
    export let suggestedTopics: string[] = [];

    let newTopic: string = "";

    function addNewTopic() {
        if (newTopic) {
            selectedTopics.push(newTopic);
            availableTopics.push(newTopic);
            selectedTopics = Array.from(new Set([...selectedTopics, newTopic]));
            availableTopics = Array.from(new Set([...availableTopics, newTopic]));
            newTopic = "";
        }
    }
</script>

<div class="flex flex-col gap-4 w-fit">
    <div class="flex flex-row overflow-y-auto flex-grow max-h-64">
        <div class="{(suggestedTopics.length > 0) ? "w-1/2" : "w-full"}">
            <TopicSelectionList
                title="TOPICS"
                topics={availableTopics}
                bind:selectedTopics
            />
        </div>
        {#if suggestedTopics.length > 0}
            <div class="w-1/2">
                <TopicSelectionList
                    title="SUGGESTIONS"
                    topics={suggestedTopics}
                    bind:selectedTopics
                />
            </div>
        {/if}
    </div>

    <AddTopicInput bind:value={newTopic} on:add={addNewTopic} />
</div>
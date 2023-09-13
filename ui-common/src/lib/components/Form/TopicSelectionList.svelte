<script lang="ts">
    import { fade } from "svelte/transition";
    import HashtagIcon from "../../icons/HashtagIcon.svelte";

    export let title: string = "TOPICS";
    export let topics: string[] = [];
    export let selectedTopics: string[] = [];

    function toggleTopic(topic: string) {
        if (selectedTopics.includes(topic)) {
            selectedTopics = selectedTopics.filter(t => t !== topic);
        } else {
            selectedTopics = [...selectedTopics, topic];
        }
    }
</script>

<ul class="menu w-full rounded-box items-start">
    <li class="menu-title">{title}</li>

    {#each topics as topic}
        <li class="w-full" transition:fade={{ duration: 100 }}>
            <button on:click={() => toggleTopic(topic)}>
                <HashtagIcon
                    class="
                        w-6 h-6 mr-1
                        {selectedTopics.includes(topic) ? 'text-accent2' : ''}
                    "
                />
                <span
                    class="text-base-100-content font-light whitespace-nowrap w-full transition-all duration-100"
                    class:opacity-50={!selectedTopics.includes(topic)}
                >
                    {topic}
                </span>

            </button>
        </li>
    {/each}
</ul>
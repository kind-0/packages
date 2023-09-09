<script lang="ts">
    import { CaretDown, Hash } from 'phosphor-svelte';
    import TopicSelectionForm from './TopicSelectionForm.svelte';
    import AttentionButton from '../buttons/AttentionButton.svelte';

    export let selectedTopics: string[] = [];
    export let availableTopics: string[] = [];
    export let suggestedTopics: string[] = [];

    let summary: HTMLElement;

    function close() {
        summary.attributes.removeNamedItem('open');
    }
</script>

<details class="dropdown dropdown-end" bind:this={summary}>
    <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
    <!-- svelte-ignore a11y-label-has-associated-control -->
    <summary class="btn border-0 m-1 {$$props.class??''}">
        <div class="flex flex-row items-center gap-2 font-normal whitespace-nowrap">
            <Hash class="w-6 h-6" />
            {#if selectedTopics.length > 0}
                <span class="truncate">
                    {#if selectedTopics.length > 3}
                        {selectedTopics.length} topics
                    {:else}
                        {selectedTopics.slice(0, 3).join(', ')}
                    {/if}
                </span>
            {:else}
                Add topics
                <CaretDown class="w-4 h-4" />
            {/if}
        </div>
    </summary>
    <div class="overflow-x-hidden z-[1] p-2 shadow rounded-box bg-base-200 dropdown-content z-50 !shadow-base-100 border-2 border-base-300 p-4 flex flex-col gap-4 justify-stretch">
        <TopicSelectionForm
            bind:availableTopics
            bind:suggestedTopics
            bind:selectedTopics
        />

        <AttentionButton
            class="w-full flex flex-row gap-8 items-center !px-10"
            on:click={close}
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
    </div>
</details>

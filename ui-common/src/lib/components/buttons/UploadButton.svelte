<script lang="ts">
	import { NDKEvent, type NostrEvent } from "@nostr-dev-kit/ndk";
    import { createEventDispatcher } from "svelte";
    import { ndk } from "../../stores/ndk";

    const dispatch = createEventDispatcher();

    async function handleFileChange(event: Event) {
        const inputElement = event.target as HTMLInputElement;
        const files = inputElement?.files;
        if (!files || files.length === 0) {
            console.log('No file selected.');
            return;
        }

        const file: Blob = files[0];

        const uploadEvent = new NDKEvent($ndk, {
            created_at: Math.ceil(Date.now() / 1000),
            kind: 22242,
            content: 'Authorize Upload',
        } as NostrEvent);
        await uploadEvent.sign();

        const xhr = new XMLHttpRequest();
        xhr.open('PUT', `https://api.satellite.earth/v1/media/item?auth=${encodeURIComponent(JSON.stringify(uploadEvent.rawEvent()))}`, true);
        progress = 0;

        // Listen for upload progress
        xhr.upload.addEventListener('progress', (event) => {
            if (event.lengthComputable) {
                progress = (event.loaded / event.total) * 100;
            }
        });

        // Listen for completion
        xhr.addEventListener('load', async () => {
            if (xhr.status === 200) {
                const json = JSON.parse(xhr.responseText);
                console.log(json);
                dispatch('uploaded', json.url);
                progress = undefined;
            } else {
                console.error(`Failed to upload image: ${xhr.statusText}`);
            }
        });

        // Handle errors
        xhr.addEventListener('error', () => {
            console.error(`Failed to upload image: ${xhr.statusText}`);
        });

        // Send the request
        xhr.send(file);
    }

    let file: HTMLInputElement;
    let progress: number | undefined = undefined;
</script>

{#if progress === undefined}
    <button {...$$props} on:click={() => file.click()}>
        <slot />
    </button>
{:else}
    <div class="radial-progress text-accent" style="--size: 1.5rem; --value:{progress};"></div>
{/if}

<input bind:this={file} type="file" class="hidden" id="file" on:change={handleFileChange} />
<script lang="ts">
	import { NDKEvent, type NostrEvent } from "@nostr-dev-kit/ndk";
    import { createEventDispatcher } from "svelte";
    import { ndk } from "../../stores/ndk";
    import { newToasterMessage } from "../../stores/toaster";
    import { Link } from 'phosphor-svelte';
  import { uploadToSatelliteCDN } from "../../utils/upload";

    type UploadType = "file" | "image" | "video" | "audio" | "*";

    export let type: UploadType = "*";
    export let progress: number | undefined = undefined;

    const dispatch = createEventDispatcher();

    async function getVideoDuration(): Promise<number | void> {
        let fileInput = file;

        return new Promise<number | void>((resolve) => {
            if (fileInput.files && fileInput.files[0]) {
                let videoFile = fileInput.files[0];

                // check if the file is a video
                if (videoFile.type.indexOf('video') === -1) {
                    return resolve();
                }

                let videoElement = document.createElement('video');
                videoElement.preload = 'metadata';

                videoElement.onloadedmetadata = function() {
                    resolve(videoElement.duration);

                    // remove video element
                    videoElement.remove();
                    return;
                }

                videoElement.src = URL.createObjectURL(videoFile);
            }
        });
    }

    async function handleFileChange(event: Event) {
        const inputElement = event.target as HTMLInputElement;
        const files = inputElement?.files;
        if (!files || files.length === 0) {
            console.log('No file selected.');
            return;
        }

        const file: Blob = files[0];
        let duration: number | void = undefined;

        getVideoDuration().then((dur) => {
            duration = dur;
        });

        const uploadEvent = new NDKEvent($ndk, {
            created_at: Math.ceil(Date.now() / 1000),
            kind: 22242,
            content: 'Authorize Upload',
        } as NostrEvent);
        await uploadEvent.sign();

        dispatch('fileSelected', {
            file,
            duration,
        });

        progress = 0;
        const xhr = await uploadToSatelliteCDN($ndk, file.type);

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
                console.log('uploaded', json);

                if (duration && json?.nip94 instanceof Array) {
                    json.nip94.push(["duration", Math.floor(duration).toString()]);
                }

                dispatch('uploaded', json);
                progress = undefined;
            } else if (xhr.status === 402) {
                paymentRequired = true;
                progress = undefined;
                newToasterMessage("Payment required to upload to your Satellite CDN", "error");
                return;
            } else {
                console.error(`Failed to upload image: ${xhr.statusText}`);
                newToasterMessage("Failed to upload image: " +xhr.status, "error")
            }
        });

        // Handle errors
        xhr.addEventListener('error', (e) => {
            console.log(e);
            console.log(xhr)
            console.error(`Failed to upload image: ${xhr.statusText}`);
        });

        xhr.send(file);
    }

    let file: HTMLInputElement;
    let paymentRequired = false;
</script>

{#if paymentRequired}
    <div class="alert bg-opacity-50 flex-col flex overflow-hidden">
        <p class="text-center">You need to pay to upload to your Satellite CDN</p>
        <a href="https://satellite.earth/cdn" class="whitespace-nowrap text-accent flex flex-row" target="_blank">
            Open Satellite CDN
            <Link size="1.5rem" class="ml-2" />
        </a>
    </div>
{/if}

{#if progress === undefined}
    <button class={$$props.class??""} on:click={() => file.click()}>
        <slot />
    </button>
{:else}
    <div class="radial-progress ui-common-radial-progress text-accent min-h-12 {$$props.progressButton??""}}" style="--size: 1.5rem; --value:{progress};"></div>
{/if}

<input
    bind:this={file}
    type="file"
    accept="{type}/*"
    class="hidden"
    id="file"
    on:change={handleFileChange}
/>
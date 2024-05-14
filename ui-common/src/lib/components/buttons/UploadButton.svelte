<script lang="ts">
	import { NDKEvent, NDKTag, type NostrEvent } from "@nostr-dev-kit/ndk";
    import { createEventDispatcher } from "svelte";
    import { ndk } from "../../stores/ndk";
    import { newToasterMessage } from "../../stores/toaster";
    import { Link } from 'phosphor-svelte';
    import { nip96Upload, uploadToSatelliteCDN } from "../../utils/upload";

    type UploadType = "file" | "image" | "video" | "audio" | "*";

    export let type: UploadType = "*";
    export let progress: number | undefined = undefined;
    export let startUpload = true;
    export let blob: Blob | undefined = undefined;
    export let videoDuration: number | void | undefined = undefined;
    export let provider: string = "nostr.build";

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
        progress = undefined;
        const inputElement = event.target as HTMLInputElement;
        const files = inputElement?.files;
        if (!files || files.length === 0) {
            console.log('No file selected.');
            return;
        }

        blob = files[0];

        getVideoDuration().then((dur) => {
            videoDuration = dur;
        });

        dispatch('fileSelected', {
            file: blob,
            duration: videoDuration,
        });
    }

    $: if (blob && startUpload && progress === undefined) {
        uploadFile();
    }

    function onXhrProgress(event: ProgressEvent) {
        if (event.lengthComputable) {
            progress = (event.loaded / event.total) * 100;
        }
    }

    function onXhrLoad(event: ProgressEvent) {
        const xhr = event.target as XMLHttpRequest;

        console.log("upload", xhr.responseText)
        file = undefined;

        if (xhr.status === 200) {
            const json = JSON.parse(xhr.responseText);
            console.log('uploaded', json);

            if (videoDuration && json?.nip94 instanceof Array) {
                json.nip94.push(["duration", Math.floor(videoDuration).toString()]);
            }

            // const url = json.nip94_event.tags.find((t: NDKTag) => t[0] === "url")?.[1];
            // const tags = json.nip94;

            // dispatch('uploaded',  { url, tags });
            progress = undefined;
            blob = undefined;
        } else if (xhr.status === 402) {
            paymentRequired = true;
            progress = undefined;
            dispatch("paymentRequired");
            newToasterMessage("Payment required to upload to your Satellite CDN", "error");
            return;
        } else {
            console.error(`Failed to upload image: ${xhr.statusText}`);
            newToasterMessage("Failed to upload image: " +xhr.status, "error")
        }
    }

    function onXhrError(event: ProgressEvent) {
        console.error(`Failed to upload image: ${event}`);
        newToasterMessage("Failed to upload image: " +event, "error")
    }

    async function uploadFile() {
        progress = 0;
        if (provider === 'satellite') {
            await uploadFileSatelliteCDN();
        } else {
            await uploadFileNip96();
        }
    }

    async function uploadFileSatelliteCDN() {
        const mime = blob?.type;
        const xhr = await uploadToSatelliteCDN($ndk, mime);
        xhr.upload.addEventListener('progress', onXhrProgress);
        xhr.addEventListener('load', onXhrLoad);
        xhr.addEventListener('error', onXhrError);
        xhr.send(blob);
    }

    async function uploadFileNip96() {
        const xhr = new XMLHttpRequest();

        xhr.upload.addEventListener('progress', onXhrProgress);
        xhr.addEventListener('load', onXhrLoad);
        xhr.addEventListener('error', onXhrError);

        const res = await nip96Upload(xhr, $ndk, blob, provider);

        if (res.status !== "success") {
            newToasterMessage(res.message, res.status);
            return;
        }

        const url = res.nip94_event.tags.find((t: NDKTag) => t[0] === "url")![1];
        const tags = res.tags;
        if (videoDuration && tags instanceof Array) {
            tags.push(["duration", Math.floor(videoDuration).toString()]);
        }
        // file = undefined;
        progress = undefined;
        blob = undefined;

        dispatch("uploaded", { url, tags });
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
    <div class="radial-progress min-h-12 min-w-12 text-xs {$$props.progressButton??""}" style="--thickness: 2px; --size: 2.5rem; --value:{progress};">{Math.floor(progress)}%</div>
{/if}

<input
    bind:this={file}
    type="file"
    accept="{type}/*"
    class="hidden"
    id="file"
    on:change={handleFileChange}
/>
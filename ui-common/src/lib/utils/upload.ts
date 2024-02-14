import NDK, { NDKEvent, NostrEvent } from "@nostr-dev-kit/ndk";

export async function uploadToSatelliteCDN(
    ndk: NDK,
    mimeType: string,
    uploadEvent?: NDKEvent,
): Promise<XMLHttpRequest> {
    if (!uploadEvent) {
        uploadEvent = new NDKEvent(ndk, {
            created_at: Math.ceil(Date.now() / 1000),
            kind: 22242,
            content: 'Authorize Upload',
        } as NostrEvent);
        await uploadEvent.sign();
    }

    const xhr = new XMLHttpRequest();
    xhr.open('PUT', `https://api.satellite.earth/v1/media/item?auth=${encodeURIComponent(JSON.stringify(uploadEvent.rawEvent()))}`, true);
    xhr.setRequestHeader('Content-Type', mimeType);

    return xhr;
}

export async function nip96Upload(
    xhr: XMLHttpRequest,
    ndk: NDK,
    blob: Blob,
    domain: string = "nostrcheck.me"
) {
    const nip96upload = ndk.getNip96(domain);
    return nip96upload.xhrUpload(xhr, blob);
}
import NDK, { NDKEvent, NDKPrivateKeySigner, type NDKUserProfile, type NostrEvent } from "@nostr-dev-kit/ndk";
import { get as getStore } from 'svelte/store';
import { ndk } from "../../stores/ndk.js";
import { user } from "../../index.js";

export async function loginAsGuest(profile?: NDKUserProfile) {
    const signer = NDKPrivateKeySigner.generate();
    const u = await signer.user();
    const $ndk = getStore(ndk);

    $ndk.signer = signer;
    user.set(u);

    localStorage.setItem('nostr-key-method', 'pk');
    localStorage.setItem('nostr-key', signer.privateKey!);
    localStorage.setItem('nostr-target-npub', u.npub);

    setupPlaceholderProfile(profile);

    return u;
}

export async function setupPlaceholderProfile(profile?: NDKUserProfile) {
    const $user = getStore(user);
    const $ndk = getStore(ndk);

    if (!$user) throw new Error('No current user');
    $user.ndk = $ndk;

    const images = [
        "https://cdn.satellite.earth/aaf65dd621667c75162ce3ee845a8202bdf2aee8d70ec0f1d25fe92ecd881675.png",
        "https://cdn.satellite.earth/c50267d41d5874cb4e949e7bd472c2d06e1b297ffffac19b2f53c291a3e052d2.png",
        "https://cdn.satellite.earth/011dc8958f86dc12c5c3a477de3551c3077fb8e71a730b7cec4a678f5c021550.png",
    ]

    const randImage = images[Math.floor(Math.random() * images.length)];

    const p: NDKUserProfile = {
        image: randImage,
        picture: randImage,
        name: "A New User",
        about: `Hi! I'm a brand new nostr user trying things out. Be nice!`,
        ...profile
    };

    $user.profile = p;
    await $user.publish();

    const followList = new NDKEvent($ndk, {
        kind: 3,
        tags: [
            [ "p", "fa984bd7dbb282f07e16e7ae87b26a2a7b9b90b7246a44771f0cf5ae58018f52", "pablof7z" ],
            [ "p", "a9434ee165ed01b286becfc2771ef1705d3537d051b387288898cc00d5c885be", "niel" ],
            [ "p", "6e468422dfb74a5738702a8823b9b28168abab8655faacb6853cd0ee15deee93", "dergigi" ],
            [ "p", "b17c59874dc05d7f6ec975bce04770c8b7fa9d37f3ad0096fdb76c9385d68928" ],
            [ "p", "dace63b00c42e6e017d00dd190a9328386002ff597b841eb5ef91de4f1ce8491" ],
        ]
    } as NostrEvent);
    await followList.sign()
    await followList.publish();
}
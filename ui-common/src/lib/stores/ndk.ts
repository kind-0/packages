import { writable } from 'svelte/store';
import NDK from '@nostr-dev-kit/ndk';
import NDKSvelte from '@nostr-dev-kit/ndk-svelte';

// get relays from localstorage
let relays;

try {
    relays = localStorage.getItem('relays');
} catch (e) { /* empty */ }

let relayList: string[] = [];

if (relays) {
    relayList = JSON.parse(relays);
}

export const defaultRelays = [
    // 'wss://pablof7z.nostr1.com',
    // 'ws://localhost:8080',

//    'wss://nos.lol',
    // 'wss://relay.f7z.io',
  //  'wss://purplepag.es',
    //'wss://offchain.pub',
    // 'wss://relay.snort.social',
    // // // 'wss://offchain.pub/',
    // "wss://relay.noswhere.com",
    // "wss://relay.nostr.band/",
    // 'wss://nostr.mom',
    //'wss://relay.getfaaans.com',
    // 'wss://nostr-pub.wellorder.net'
];

// if (!relayList || !Array.isArray(relayList) || relayList.length === 0) {
    relayList = defaultRelays;
// }
    //

const _ndk: NDKSvelte = new NDKSvelte({
    explicitRelayUrls: relayList,
    outboxRelayUrls: [
        'wss://purplepag.es'
    ],
    // devWriteRelayUrls: [
    //     'wss://pablof7z.nostr1.com',
    // ],
    enableOutboxModel: false,
}) as NDKSvelte;

export const ndk = writable(_ndk);

const _bunkerNDK = new NDK({
    explicitRelayUrls: ['wss://relay.nsecbunker.com'],
});

export const bunkerNDK = writable(_bunkerNDK);

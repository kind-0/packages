import { ndk } from "./ndk.js";
import { NDKAppHandlerEvent } from "@nostr-dev-kit/ndk";
import { derived, get as getStore } from "svelte/store";

const $ndk = getStore(ndk);

export const appHandlers = $ndk.storeSubscribe<NDKAppHandlerEvent>({
    kinds: [31990 as number],
    "#k": [ 5300, 65002, 65008 ].map(j => j.toString())
}, { closeOnEose: true, subId: 'app-handlers', autoStart: false },
    NDKAppHandlerEvent
);

export function getAppHandlers(kinds: number[]) {
    const currentFilter = appHandlers.filters[0];

    console.log(`currentFilter`, currentFilter);
}

export const contentDiscoveryApps = derived(appHandlers, ($appHandlers) => {
    return $appHandlers.filter((event) => event.tagValue("k") === "65008");
});
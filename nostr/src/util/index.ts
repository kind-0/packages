import { type NDKFilter } from '@nostr-dev-kit/ndk';

export function filterForId(id: string): NDKFilter {
    if (!!id.match(/:/)) {
        const [kind, pubkey, identifier] = id.split(':');
        return { kinds: [parseInt(kind)], authors: [pubkey], '#d': [identifier] };
    } else {
        return { ids: [id] };
    }
}
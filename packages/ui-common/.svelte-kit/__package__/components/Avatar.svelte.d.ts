import { SvelteComponent } from "svelte";
import type { NDKUser } from '@nostr-dev-kit/ndk';
declare const __propDef: {
    props: {
        [x: string]: any;
        ndk: NDK;
        pubkey?: string | undefined;
        user?: NDKUser | undefined;
        klass?: string | undefined;
        size?: 'small' | 'large' | undefined;
        type?: "square" | "circle" | undefined;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export type AvatarProps = typeof __propDef.props;
export type AvatarEvents = typeof __propDef.events;
export type AvatarSlots = typeof __propDef.slots;
export default class Avatar extends SvelteComponent<AvatarProps, AvatarEvents, AvatarSlots> {
}
export {};
//# sourceMappingURL=Avatar.svelte.d.ts.map
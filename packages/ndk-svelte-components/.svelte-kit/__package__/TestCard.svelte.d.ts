import { SvelteComponent } from "svelte";
declare const __propDef: {
    props: {
        title: string;
        body: string;
        button: string;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export type TestCardProps = typeof __propDef.props;
export type TestCardEvents = typeof __propDef.events;
export type TestCardSlots = typeof __propDef.slots;
export default class TestCard extends SvelteComponent<TestCardProps, TestCardEvents, TestCardSlots> {
}
export {};
//# sourceMappingURL=TestCard.svelte.d.ts.map
import { writable, Writable } from 'svelte/store';

interface Component {
    component: ConstructorOfATypedSvelteComponent;
    props: { [key: string]: any };
}

const initialData: Component = { component: null, props: {} };

export const rightSidebar: Writable<Component> = writable(initialData);
export const logo: Writable<Component | undefined> = writable();

export const pageDrawerToggle: Writable<boolean> = writable(false);

export const leftSidebarAvailable: Writable<boolean> = writable(true);
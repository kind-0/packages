import { writable, Writable } from 'svelte/store';

interface SidebarComponent {
    component: ConstructorOfATypedSvelteComponent;
    props: { [key: string]: any };
}

const initialData: SidebarComponent = { component: null, props: {} };

export const rightSidebar: Writable<SidebarComponent> = writable(initialData);

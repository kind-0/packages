import { writable } from 'svelte/store';
import './styles.css';
import { NDKUser } from '@nostr-dev-kit/ndk';

export const user = writable<NDKUser | undefined>(undefined);
export const userLabels = writable<Set<string>>(new Set());

/**
 * Stores
 */
export * from './stores/nip89.js';
export * from './stores/ndk.js';
export * from './stores/toaster.js';

/**
 * Buttons
 */
export { default as AttentionButton } from "./components/buttons/AttentionButton.svelte";
export { default as SubtleButton } from './components/buttons/SubtleButton.svelte'

/**
 * Dropdowns
 */
export { default as CollapsableDropdown } from './components/dropdowns/CollapsableDropdown.svelte'
export { default as LoginDropdown } from './components/dropdowns/LoginDropdown.svelte'

/**
 * Events
 */
export { default as EventCard } from './components/Events/EventCard/EventCard.svelte';
export { default as EventCardActions } from './components/Events/EventCard/EventCardActions.svelte';

// DVMs
export { default as DvmJobResultsFeed } from "./components/Events/Kinds/Dvms/JobResultsFeed/DvmJobResultsFeed.svelte";

/**
 * Generic Components
 */
export { default as PageTitle } from './components/PageTitle.svelte'
export { default as MenuItem } from './components/Menu/MenuItem.svelte'
export { default as PopularShelves } from './components/lists/PopularShelves.svelte'
export { default as ElementConnector } from './components/ElementConnector.svelte'
export { default as RelativeTime } from './components/RelativeTime.svelte'
export { default as Favicon } from './components/Favicon.svelte';
export { default as Toaster } from './components/Toaster/Toaster.svelte';

/**
 * Form components
 */
export { default as Textarea } from './components/Form/Textarea.svelte';
export { default as Input } from './components/Form/Input.svelte';
export { default as TopicInput } from './components/Form/TopicInput.svelte';
export { default as AddTopicInput } from './components/Form/AddTopicInput.svelte';

/**
 * Layouts
 */
export { default as MainWithRightSidebar } from './layouts/MainWithRightSidebar.svelte'
export { default as ThreeColumnsLayout } from './layouts/ThreeColumnsLayout.svelte'

/**
 * Icons
 */
export { default as ZapIcon } from './icons/ZapIcon.svelte';
export { default as KeyIcon } from './icons/KeyIcon.svelte'
export { default as CommentIcon } from './icons/CommentIcon.svelte';
export { default as BookmarkIcon } from './icons/BookmarkIcon.svelte';
export { default as HashtagIcon } from './icons/HashtagIcon.svelte';
export { default as Shipyard } from './icons/Shipyard.svelte';
export { default as PuzzleIcon } from './icons/PuzzleIcon.svelte';
export { default as CalendarIcon } from './icons/CalendarIcon.svelte';
export { default as PauseIcon } from './icons/PauseIcon.svelte';
export { default as PencilSimpleIcon } from './icons/PencilSimpleIcon.svelte';
export { default as PostIcon } from './icons/PostIcon.svelte';
export { default as RepostIcon } from './icons/RepostIcon.svelte';
export { default as TrashIcon } from './icons/TrashIcon.svelte';
export { default as LongFormIcon } from './icons/LongFormIcon.svelte';
export { default as UrlIcon } from './icons/UrlIcon.svelte';
export { default as DvmIcon } from './icons/DvmIcon.svelte';
export { default as QueueIcon } from './icons/QueueIcon.svelte';

/**
 * Logos
 */
export { default as AtlasNotesLogo } from './logos/AtlasNotesLogo.svelte';

/**
 * Modals
 */
export { default as ModalWrapper } from './components/modals/ModalWrapper.svelte'
export { default as ZapModal } from './modals/ZapModal/ZapModal.svelte';
export { default as LabelModal } from './modals/LabelModal/LabelModal.svelte';

/**
 * Sidebar
 */
export { default as SidebarSectionLink } from './components/Sidebar/SidebarSectionLink.svelte'

/**
 * User
 */
export { default as AvatarWithName } from './components/User/AvatarWithName.svelte'
export { default as Avatar } from './components/User/Avatar.svelte'
export { default as Name } from './components/User/Name.svelte'

/**
 * Utils
 */
export * from './utils/bitcoin';
export * from './utils/user/login';
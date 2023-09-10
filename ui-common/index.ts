import { writable } from 'svelte/store';
import './styles.css';
import { NDKUser } from '@nostr-dev-kit/ndk';

export const user = writable<NDKUser | undefined>(undefined);
export const userLabels = writable<Set<string>>(new Set());

/**
 * Buttons
 */
export { default as AttentionButton } from "./src/components/buttons/AttentionButton.svelte";
export { default as SubtleButton } from './src/components/buttons/SubtleButton.svelte'

/**
 * Dropdowns
 */
export { default as CollapsableDropdown } from './src/components/dropdowns/CollapsableDropdown.svelte'
export { default as LoginDropdown } from './src/components/dropdowns/LoginDropdown.svelte'

/**
 * Events
 */
export { default as EventCard } from './src/components/events/EventCard/EventCard.svelte';
export { default as EventCardActions } from './src/components/events/EventCard/EventCardActions.svelte';

/**
 * Generic Components
 */
export { default as PageTitle } from './src/components/PageTitle.svelte'
export { default as MenuItem } from './src/components/Menu/MenuItem.svelte'
export { default as PopularShelves } from './src/components/lists/PopularShelves.svelte'
export { default as ElementConnector } from './src/components/ElementConnector.svelte'
export { default as RelativeTime } from './src/components/RelativeTime.svelte'
export { default as Favicon } from './src/components/Favicon.svelte';

/**
 * Form components
 */
export { default as Textarea } from './src/components/Form/Textarea.svelte';
export { default as Input } from './src/components/Form/Input.svelte';
export { default as TopicInput } from './src/components/Form/TopicInput.svelte';
export { default as AddTopicInput } from './src/components/Form/AddTopicInput.svelte';

/**
 * Layouts
 */
export { default as MainWithRightSidebar } from './src/layouts/MainWithRightSidebar.svelte'

/**
 * Icons
 */
export { default as ZapIcon } from './src/icons/ZapIcon.svelte';
export { default as KeyIcon } from './src/icons/KeyIcon.svelte'
export { default as CommentIcon } from './src/icons/CommentIcon.svelte';
export { default as BookmarkIcon } from './src/icons/BookmarkIcon.svelte';
export { default as HashtagIcon } from './src/icons/HashtagIcon.svelte';

/**
 * Logos
 */
export { default as AtlasNotesLogo } from './src/logos/AtlasNotesLogo.svelte';

/**
 * Modals
 */
export { default as ModalWrapper } from './src/components/modals/ModalWrapper.svelte'
export { default as ZapModal } from './src/modals/ZapModal/ZapModal.svelte';
export { default as LabelModal } from './src/modals/LabelModal/LabelModal.svelte';

/**
 * Sidebar
 */
export { default as SidebarSectionLink } from './src/components/Sidebar/SidebarSectionLink.svelte'

/**
 * User
 */
export { default as AvatarWithName } from './src/components/User/AvatarWithName.svelte'
export { default as Avatar } from './src/components/User/Avatar.svelte'
export { default as Name } from './src/components/User/Name.svelte'

/**
 * Utils
 */
export * from './src/utils/bitcoin';
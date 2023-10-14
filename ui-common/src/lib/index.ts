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
export * from './stores/layout.js';

/**
 * Buttons
 */
export { default as AttentionButton } from "./components/buttons/AttentionButton.svelte";
export { default as SubtleButton } from './components/buttons/SubtleButton.svelte'
export { default as CommentsButton } from './components/Events/EventCard/Buttons/Comments.svelte';
export { default as ZapsButton } from "./components/Events/EventCard/Buttons/Zaps.svelte";

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

// Highlights
export { default as HighlightCard } from "./components/Events/Kinds/Highlight/HighlightCard.svelte";
export { default as HighlightCardHeader } from "./components/Events/Kinds/Highlight/HighlightCardHeader.svelte";
export { default as HighlightContent } from "./components/Events/Kinds/Highlight/HighlightContent.svelte";

/**
 * Generic Components
 */
export { default as PageTitle } from './components/PageTitle.svelte'
export { default as SectionTitle } from './components/SectionTitle.svelte'
export { default as Panel } from './components/Panel.svelte'
export { default as MenuItem } from './components/Menu/MenuItem.svelte'
export { default as PopularShelves } from './components/lists/PopularShelves.svelte'
export { default as ElementConnector } from './components/ElementConnector.svelte'
export { default as RelativeTime } from './components/RelativeTime.svelte'
export { default as Favicon } from './components/Favicon.svelte';
export { default as Toaster } from './components/Toaster/Toaster.svelte';
export { default as LazyLoadedImage } from './components/Image/LazyLoadedImage.svelte';
export { default as ThreadView } from './components/Events/ThreadView/ThreadView.svelte';
export { default as Hotkey } from './components/Hotkey.svelte';

/**
 * Form components
 */
export { default as Textarea } from './components/Form/Textarea.svelte';
export { default as Input } from './components/Form/Input.svelte';
export { default as TopicInput } from './components/Form/TopicInput.svelte';
export { default as AddTopicInput } from './components/Form/AddTopicInput.svelte';
export { default as EntryInput } from './components/Form/EntryInput.svelte';

/**
 * Layouts
 */
export { default as MainWithRightSidebar } from './layouts/MainWithRightSidebar.svelte'
export { default as ThreeColumnsLayout } from './layouts/ThreeColumnsLayout.svelte'
export { default as ThreeColumnsLayout2 } from './layouts/ThreeColumnsLayout2.svelte'
export { default as ResponsiveColumnsLayout } from './layouts/ResponsiveColumnsLayout.svelte'

/**
 * Layouts
 */
export { default as LoadingSpinner } from './components/Loading/LoadingSpinner.svelte'

/**
 * Icons
 */
export { default as ZapIcon } from './icons/ZapIcon.svelte';
export { default as ZapSentIcon } from './icons/ZapSent.svelte';
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
export { default as HighlightIcon } from './icons/HighlightIcon.svelte';
export { default as PublishingIcon } from './icons/PublishingIcon.svelte';
export { default as ShelvesIcon } from './icons/ShelvesIcon.svelte';

/**
 * Logos
 */
export { default as AtlasNotesLogo } from './logos/AtlasNotesLogo.svelte';
export { default as VendataLogo } from './logos/VendataLogo.svelte';

/**
 * Modals
 */
export { default as ModalWrapper } from './components/modals/ModalWrapper.svelte'
export { default as ZapModal } from './modals/ZapModal/ZapModal.svelte';
export { default as LabelModal } from './modals/LabelModal/LabelModal.svelte';
export { default as ReplyModal } from './modals/ReplyModal/ReplyModal.svelte';

/**
 * Navigation
 */
export { default as ResponsiveLogoNavbar } from './components/Navigation/ResponsiveLogoNavbar.svelte';

/**
 * Sidebar
 */
export { default as SidebarSectionLink } from './components/Sidebar/SidebarSectionLink.svelte'
export { default as CollapsibleSidebarMenuContainer } from './components/Sidebar/CollapsibleSidebarMenuContainer.svelte'

/**
 * User
 */
export { default as AvatarWithName } from './components/User/AvatarWithName.svelte'
export { default as Avatar } from './components/User/Avatar.svelte'
export { default as Name } from './components/User/Name.svelte'
export { default as LinkToProfile } from './components/User/LinkToProfile.svelte'

/**
 * Utils
 */
export * from './utils/bitcoin';
export * from './utils/user/login';
export * from './utils/key'
export { default as linkToArticle } from './components/Events/Kinds/Highlight/link-to-article.js';
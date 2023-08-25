<script>import { Avatar } from '@nostr-dev-kit/ndk-svelte-components';
export let ndk;
export let pubkey = undefined;
export let user = undefined;
export let klass = $$props.class ?? '';
export let size = undefined;
export let type = 'circle';
let sizeClass = '';
let shapeClass = '';
switch (size) {
    case 'small':
        sizeClass = 'w-8 h-8';
        break;
}
switch (type) {
    case 'circle':
        shapeClass = 'rounded-full';
        break;
    case 'square':
        shapeClass = 'rounded-md';
        break;
}
</script>

<Avatar
    {ndk}
    {pubkey}
    {user}
    class="{shapeClass} {sizeClass} {$$props.class??klass}"
/>
<script lang="ts">
    import { NDKEvent } from "@nostr-dev-kit/ndk";
    import Time from "svelte-time";

    export let event: NDKEvent | undefined = undefined;

    /**
     * Timestamp to display
     */
    export let timestamp: number = event?.created_at * 1000;

    /**
     * Number of seconds to use relative time for.
     */
    export let timeAgoCutoff: number = 60*60*24;

    function useRelativeTime() {
        const now = Date.now();
        const diff = now - timestamp;

        return diff < 1000 * timeAgoCutoff;
    }
</script>

<Time
    relative={useRelativeTime()}
    live={true}
    {timestamp}
    class={$$props.class}
/>
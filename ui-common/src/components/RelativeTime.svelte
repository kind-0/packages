<script lang="ts">
    import Time from "svelte-time";

    /**
     * Timestamp to display
     */
    export let timestamp: number;

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
<button 
    class="btn h-11 bg-base-300 text-xs font-medium normal-case hover:bg-opacity-30 hover:border hover:border-zinc-400 {$$props.class??""}"  
    on:click
    formaction={$$props.formaction}
>
    <slot />
</button>

<style lang="postcss">
    .btn {
        border-radius: 9999px !important;
    }
</style>
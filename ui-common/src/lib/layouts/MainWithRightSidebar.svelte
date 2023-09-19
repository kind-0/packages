<div class="flex flex-row gap-32 flex-grow">
    <main class="w-main flex flex-col justify-stretch">
        <slot />
    </main>
    <asaide class="w-sidebar sticky top-0 max-h-[90vh] overflow-y-auto">
        <slot name="rightSidebar" />
    </asaide>
</div>

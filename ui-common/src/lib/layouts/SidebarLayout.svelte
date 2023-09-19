<div class="flex flex-row gap-32 flex-grow">
    <div class="w-sidebar sticky max-h-[90vh] overflow-y-auto top-0">
        <slot name="sidebar" />
    </div>
    <div class="flex flex-col justify-stretch">
        <slot />
    </div>
</div>
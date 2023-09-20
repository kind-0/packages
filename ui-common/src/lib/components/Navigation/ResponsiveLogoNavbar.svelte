<script lang="ts">
    export let isHiddenDrawerBtn = false;
    export let homeLink = '/'
</script>

<nav class="sticky top-0 z-20 flex flex-row flex-wrap min-h-16 px-4 justify-start items-center bg-base-100/80 backdrop-blur-sm">
    <div class="flex flex-row basis-1/4 justify-between">
        <div class="flex basis-1/2">
            <label
                for="left-drawer"
                class="btn btn-square btn-ghost {isHiddenDrawerBtn ? 'hidden' : ''}"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    class="inline-block w-6 h-6 stroke-current"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M4 6h16M4 12h16M4 18h16"
                    />
                </svg>
            </label>
        </div>
        <div class="flex basis-1/2">
            <a
                href={homeLink}
                class="flex h-full w-full items-center justify-center"
            >
                <slot name="logo" />
            </a>
        </div>
    </div>
    <div class="flex flex-row w-full">
        <slot name="main" />
    </div>
</nav>

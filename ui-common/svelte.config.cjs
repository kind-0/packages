import preprocess from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
    preprocess: preprocess(),
    kit: {
        alias: {
            $actions: "src/lib/actions",
            $components: "src/lib/components",
            $icons: "src/lib/icons",
            $utils: "src/lib/utils",
            $layouts: "src/lib/layouts",
            $root: "src/lib",
            $utils: "src/lib/utils",
        },
    }
};

export default config;

<script lang="ts">
    export let image: string;
    export let loaded: boolean = false;
    export let loadingClass: string = "grad-blue";

    let aspectRatio: number;

    const lazyLoad = (image, src) => {
        const imgLoaded = () => {
            aspectRatio = image.naturalWidth/image.naturalHeight;
            loaded = true;
        }
        const observer = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting) {
                image.src = src
                console.log(image)
                // check if instantly loaded
                if (image.complete) {
                    imgLoaded()
                } else {
                    // if the image isn't loaded yet, add an event listener
                    image.addEventListener('load', imgLoaded)
                }
            }
        }, {})
        // intersection observer
        observer.observe(image)
        return {
            destroy() {
                // clean up the event listener
                image.removeEventListener('load', imgLoaded)
            }
        }
    }
</script>

<div
    class="h-full w-full rounded-xl {!loaded ? loadingClass : ''}"
>
    <img
        use:lazyLoad={image}
        class="object-cover {aspectRatio <= 1 ? 'w-full': 'h-full'} {$$props.class??""}"
    />
</div>
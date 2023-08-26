<script lang="ts">
  export let stars: number;
</script>

<div class="flex flex-row w-auto justify-center items-center bg-base-100 rounded-xl py-2 px-4">
  <div class="rating rating-sm">
    <input type="radio" name="rating-2" class="mask mask-star-2" checked={stars >= 1} />
    <input type="radio" name="rating-2" class="mask mask-star-2" checked={stars >= 2} />
    <input type="radio" name="rating-2" class="mask mask-star-2" checked={stars >= 3} />
    <input type="radio" name="rating-2" class="mask mask-star-2" checked={stars >= 4} />
    <input type="radio" name="rating-2" class="mask mask-star-2" checked={stars >= 5} />
  </div>
</div>

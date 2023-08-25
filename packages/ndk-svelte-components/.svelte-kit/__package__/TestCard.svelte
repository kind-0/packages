<script>export let title;
export let body;
export let button;
</script>

<div class="card w-96 bg-primary text-primary-content">
  <div class="card-body">
    <h2 class="card-title">{title}</h2>
    <p>{body}</p>
    <div class="card-actions justify-end">
      <button class="btn">{button}</button>
    </div>
  </div>
</div>

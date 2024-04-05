<script lang="ts">
    let count: number = 0;
</script>

<p>
    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Unde inventore tenetur, fugit ducimus
    ab eius incidunt sapiente optio, quia voluptatum hic dolorum quisquam ea nobis aperiam
    laboriosam sint soluta assumenda!
</p>

<button aria-label="Counter" on:click={() => count++} class="btn">{count} clicks</button>
<button aria-label="Counter" on:click={() => count++} class="btn btn-primary">
    {count} clicks
</button>
<button aria-label="Counter" on:click={() => count++} class="btn btn-secondary">
    {count} clicks
</button>
<button aria-label="Counter" on:click={() => count++} class="btn btn-accent">{count} clicks</button>
<button aria-label="Counter" on:click={() => count++} class="btn btn-success">
    {count} clicks
</button>
<button aria-label="Counter" on:click={() => count++} class="btn btn-info">{count} clicks</button>
<button aria-label="Counter" on:click={() => count++} class="btn btn-warning">
    {count} clicks
</button>
<button aria-label="Counter" on:click={() => count++} class="btn btn-error">{count} clicks</button>
<button aria-label="Counter" on:click={() => count++} class="btn btn-neutral">
    {count} clicks
</button>
<button aria-label="Counter" on:click={() => count++} class="btn btn-outline">
    {count} clicks
</button>

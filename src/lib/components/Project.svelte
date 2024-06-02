<script lang="ts">
    import Icon from '@iconify/svelte';

    export let favorite: boolean = false;
</script>

<div
    class="card card-compact w-full h-40 sm:w-64 sm:h-40 bg-base-300 shadow-xl transition-all duration-150 ease-in-out sm:hover:w-72 sm:hover:h-48 border border-primary"
>
    <figure><img src="/gallery/placeholder01.png" alt="Shoes" class="object-center" /></figure>
    <div class="card-body">
        <div class="flex align-items justify-between">
            <h2 class="card-title">Title</h2>
            {#if favorite}
            <Icon icon="material-symbols:star" class="mt-2"/>
            {/if}
        </div>
        <p>Edited 3 days ago</p>
    </div>
</div>

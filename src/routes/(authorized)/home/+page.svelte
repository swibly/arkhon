<script>
    import { goto } from '$app/navigation';
    import { onMount } from 'svelte';

    onMount(function () {
        goto('/community');
    });
</script>

<div class="w-full min-h-96 flex justify-center items-center">
    <span class="loading loading-ring loading-lg" />
</div>

<script lang="ts">
    import '../app.css';
    import { lightMode } from '$lib/stores/theme';
    import { onMount } from 'svelte';
    import { page } from '$app/stores';
    import { contrastType, contrast } from '$lib/stores/contrast';

    onMount(() => ($lightMode = localStorage.getItem('theme') === 'true'));
</script>

{#if $page.url.pathname !== '/'}
    <div data-theme={$contrast ? $contrastType : $lightMode ? 'light' : 'dark'}>
        <slot />
    </div>
{:else}
    <slot />
{/if}

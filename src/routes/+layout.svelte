<script lang="ts">
    import '../app.css';
    import { lightMode, toggle } from '$lib/stores/theme';
    import { onMount } from 'svelte';
    import { page } from '$app/stores';

    onMount(() => ($lightMode = localStorage.getItem("theme") === "true"));
</script>

{#if $page.url.pathname !== '/'}
    <div data-theme={$lightMode ? 'light' : 'dark'}>
        <slot />
    </div>
{:else}
    <slot />
{/if}

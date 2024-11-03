<script lang="ts">
    import Icon from '@iconify/svelte';
    import { page } from '$app/stores';
    import type { LayoutServerData } from './$types';
    import ThemeToggler from '$lib/components/ThemeToggler.svelte';

    export let data: LayoutServerData;
</script>

{#if $page.url.pathname !== '/'}
    <header class="fixed top-0 flex justify-between w-full p-4">
        <a
            href="/{data.token ? 'home' : ''}"
            class="transition-opacity opacity-50 hover:opacity-100"
        >
            <Icon icon="ic:baseline-home" class="inline size-8" />
        </a>

        <ThemeToggler />
    </header>
{/if}

<slot />

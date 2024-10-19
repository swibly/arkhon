<script lang="ts">
    import Icon from '@iconify/svelte';
    import { page } from '$app/stores';
    import type { LayoutServerData } from './$types';

    export let data: LayoutServerData;
</script>

{#if $page.url.pathname !== '/'}
    <header class="fixed top-0 flex justify-between w-full p-4">
        <a href="/{data.token ? 'home' : ''}" class="transition-opacity opacity-50 hover:opacity-100">
            <Icon icon="ic:baseline-home" class="inline size-8" />
        </a>

        <label class="transition-opacity swap swap-rotate opacity-50 hover:opacity-100">
            <input type="checkbox" class="theme-controller" value="dark" />

            <Icon icon="ph:sun-fill" class="swap-off size-8" />
            <Icon icon="ph:moon-fill" class="swap-on size-8" />
        </label>
    </header>
{/if}

<slot />

<script lang="ts">
    import Icon from '@iconify/svelte';
    import { lightMode, toggle } from '$lib/stores/theme';
</script>

<label class="swap swap-rotate text-white float-right pr-4">
    <input type="checkbox" class="theme-controller" on:click={toggle}/>

    <Icon icon="ph:sun" class="swap-off size-8" />
    <Icon icon="ph:moon" class="swap-on size-8" />
</label>

<main class="bg-primary w-full min-h-screen max-w-[800px] mx-auto bleed" data-theme={$lightMode ? 'light' : 'dark'}>
    <slot />
</main>

{#if $lightMode}
    <style>
        .bleed {
            clip-path: inset(0, -100vmax);
            box-shadow: 0 0 0 100vmax #0175af;
        }
    </style>
{:else}
    <style>
        .bleed {
            clip-path: inset(0, -100vmax);
            box-shadow: 0 0 0 100vmax #252627;
        }
    </style>
{/if}
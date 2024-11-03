<script lang="ts">
    import Icon from '@iconify/svelte';
    import { isMode, setCookieTheme } from '$lib/stores/theme';

    let isLight: boolean = isMode('light');

    let checkboxActive: boolean = false;

    function swapTheme() {
        if (!isLight) {
            setCookieTheme(checkboxActive ? 'light' : 'dark');
        } else {
            setCookieTheme(checkboxActive ? 'dark' : 'light');
        }
    }
</script>

<label class="cursor-pointer m-4 text-primary swap swap-rotate">
    <input
        bind:checked={checkboxActive}
        type="checkbox"
        class="theme-controller"
        value={isLight ? 'dark' : 'light'}
        on:change={swapTheme}
    />

    {#if isLight}
        <Icon icon="ph:sun-fill" class="swap-on size-6" />
        <Icon icon="ph:moon-fill" class="swap-off size-6" />
    {:else}
        <Icon icon="ph:sun-fill" class="swap-off size-6" />
        <Icon icon="ph:moon-fill" class="swap-on size-6" />
    {/if}
</label>

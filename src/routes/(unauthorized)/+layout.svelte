<script lang="ts">
    import Icon from '@iconify/svelte';
</script>

<header class="fixed top-0 flex justify-between w-full p-4">
    <a href="/">
        <Icon icon="ic:baseline-home" class="inline size-8" />
    </a>

    <label class="swap swap-rotate">
        <input type="checkbox" class="theme-controller" value="dark" />

        <Icon icon="ph:sun-fill" class="swap-off size-8" />
        <Icon icon="ph:moon-fill" class="swap-on size-8" />
    </label>
</header>

<slot />

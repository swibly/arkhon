<script lang="ts">
    import Icon from '@iconify/svelte';

    export let type: 'danger' | 'alert' | 'tip' = 'alert';
</script>

<article
    class="p-4 rounded border"
    class:text-success={type === 'tip'}
    class:border-success={type === 'tip'}
    class:text-warning={type === 'alert'}
    class:border-warning={type === 'alert'}
    class:text-error={type === 'danger'}
    class:border-error={type === 'danger'}
>
    <div class="flex items-center gap-2 font-bold text-lg">
        {#if type === 'alert'}
            <Icon icon="mdi:alert" class="shrink-0" />
            Alerta
        {:else if type === 'danger'}
            <Icon icon="akar-icons:stop-fill" class="shrink-0" />
            Perigo
        {:else if type === 'tip'}
            <Icon icon="mingcute:question-fill" class="shrink-0" />
            Dica
        {/if}
    </div>

    <p class="text-justify">
        <slot />
    </p>
</article>

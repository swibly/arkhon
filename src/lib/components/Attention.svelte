<script lang="ts">
    import Icon from '@iconify/svelte';

    export let type: 'danger' | 'alert' | 'tip' = 'alert';
</script>

<div class="max-w-5xl w-fit">
    {#if type === 'alert'}
        <article
            class="border-l-2 border-l-warning-content p-2 flex items-center gap-2 text-warning-content bg-warning rounded-r-md"
        >
            <Icon icon="mdi:alert" class="shrink-0" />
            <p>
                <slot />
            </p>
        </article>
    {:else if type === 'danger'}
        <article
            class="border-l-2 border-l-error p-2 flex items-center gap-2 text-error bg-error-content rounded-r-md"
        >
            <Icon icon="akar-icons:stop-fill" class="shrink-0" />
            <p>
                <slot />
            </p>
        </article>
    {:else if type === 'tip'}
        <article
            class="border-l-2 border-l-success-content p-2 flex items-center gap-2 text-success-content bg-success/70 rounded-r-md"
        >
            <Icon icon="mingcute:question-fill" class="shrink-0" />
            <p>
                <slot />
            </p>
        </article>
    {/if}
</div>

<script lang="ts">
    let tip: string;
    export let displayText: string = '';
</script>

{#if displayText === ''}
    <span
        class="tooltip size-4 rounded-full text-xs text-primary-content bg-primary inline-flex justify-center items-center cursor-default z-50"
        data-tip={tip}
    >
        ?
    </span>
{:else}
    <span class="badge badge-primary badge-sm tooltip z-50" data-tip={tip}>
        {displayText}
    </span>
{/if}

<div contenteditable="true" bind:textContent={tip} hidden>
    <slot />
</div>

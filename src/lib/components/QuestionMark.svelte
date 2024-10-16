<script lang="ts">
    let tip: string;
    export let displayText: string = '';
</script>

<div contenteditable="true" bind:textContent={tip} hidden>
    <slot />
</div>

{#if displayText === ''}
    <span
        class="tooltip size-4 rounded-full text-xs text-primary-content bg-primary flex justify-center items-center"
        data-tip={tip}
    >
        ?
    </span>
{:else}
    <span class="badge badge-primary badge-sm tooltip" data-tip={tip}>
        {displayText}
    </span>
{/if}

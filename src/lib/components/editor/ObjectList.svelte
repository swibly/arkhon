<script lang="ts">
    import type { CanvasObject } from '$lib/editor/objects';
    import CanvasItem from './CanvasItem.svelte';

    export let element: HTMLDivElement;
    export let canvas;
    export let objects: CanvasObject[] = [];
</script>

<div bind:this={element} class="pr-4 border-r border-base-200 w-60 shrink-0">
    <ul class="menu menu-sm rounded-lg w-full max-w-xs max-h-full overflow-auto">
        {#each objects as object}
            <CanvasItem {canvas} {...object} />
        {/each}
    </ul>
</div>

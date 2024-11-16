<script lang="ts">
    import { Canvas, FabricObject } from 'fabric';
    import type { CanvasObject } from '$lib/editor/objects';
    import CanvasItem from './CanvasItem.svelte';

    export let element: HTMLDivElement;
    export let canvas: Canvas;
    export let currentActiveObjects: FabricObject[] | undefined = undefined;
    export let objects: CanvasObject[] = [];
</script>

<div bind:this={element} class="pr-4 border-r border-base-200 w-60 shrink-0">
    <ul
        class="menu flex-nowrap menu-sm rounded-lg w-full max-w-xs max-h-full h-[calc(100vh-89px-49px-2rem)] overflow-auto"
    >
        {#each objects as object}
            <CanvasItem {canvas} {currentActiveObjects} {...object} />
        {/each}
    </ul>
</div>

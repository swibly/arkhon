<script lang="ts">
    import { Canvas, FabricObject } from 'fabric';
    import type { CanvasObject } from '$lib/editor/objects';
    import CanvasItem from './CanvasItem.svelte';

    export let element: HTMLDivElement;
    export let canvas: Canvas;
    export let showControls: boolean;
    export let currentActiveObjects: FabricObject[] = [];
    export let objects: CanvasObject[] = [];
</script>

<div bind:this={element} class="pt-4 pr-4 border-r border-base-200 w-60 shrink-0">
    <ul
        class="menu p-0 [&_li>*]:rounded-none flex-nowrap menu-sm w-full max-h-full h-[calc(100vh-89px-49px-2rem)] overflow-auto"
    >
        {#if objects.length === 0}
            <p class="italic text-center opacity-50">Nenhum objeto no projeto</p>
        {/if}

        {#each objects as object}
            <CanvasItem {canvas} {showControls} {currentActiveObjects} {...object} />
        {/each}
    </ul>
</div>

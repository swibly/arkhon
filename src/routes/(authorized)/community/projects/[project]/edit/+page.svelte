<script lang="ts">
    import { Canvas } from 'fabric';
    import { onMount } from 'svelte';
    import type { PageServerData } from './$types';
    import type { Project } from '$lib/projects';
    import type { User } from '$lib/user';
    import { renderFromData } from '$lib/editor/utils';

    export let data: PageServerData & { user: User; project: Project };

    let body: HTMLDivElement;
    let canvas: Canvas;

    onMount(async function () {
        const canvasElement = document.createElement('canvas');
        body.appendChild(canvasElement);

        canvas = new Canvas(canvasElement, {
            width: body.clientWidth,
            height: body.clientHeight,
            preserveObjectStacking: true,
            imageSmoothingEnabled: false
        });

        await renderFromData(canvas, data);
    });
</script>

<svelte:window
    on:resize={function () {
        canvas.setDimensions({
            width: body.clientWidth,
            height: body.clientHeight
        });
    }}
/>

<div bind:this={body} class="w-full h-[calc(100vh-89px-2rem)]" />

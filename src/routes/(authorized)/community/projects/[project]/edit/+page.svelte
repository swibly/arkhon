<script lang="ts">
    import { Canvas } from 'fabric';
    import { onMount } from 'svelte';
    import type { PageServerData } from './$types';
    import type { Project } from '$lib/projects';
    import type { User } from '$lib/user';
    import { renderFromData, centerView } from '$lib/editor/utils';
    import { loadEventListeners } from '$lib/editor/eventListeners';
    import { tool, Tool } from '$lib/stores/tool';

    export let data: PageServerData & { user: User; project: Project };

    let header: HTMLDivElement;
    let body: HTMLDivElement;
    let canvas: Canvas;

    $: (function () {
        if (canvas === undefined) return;

        switch ($tool) {
            case Tool.Hand:
                canvas.selection = false;
                break;
            case Tool.Brush:
                canvas.selection = true;
                break;
        }
    })();

    onMount(async function () {
        const canvasElement = document.createElement('canvas');
        body.appendChild(canvasElement);

        canvas = new Canvas(canvasElement, {
            width: body.clientWidth,
            height: body.clientHeight - header.clientHeight,
            preserveObjectStacking: true,
            imageSmoothingEnabled: false
        });
        canvas.setZoom(0.5);

        await renderFromData(canvas, data);
        centerView(canvas, data);

        loadEventListeners(canvas);
    });
</script>

<svelte:window
    on:auxclick={function () {
        centerView(canvas, data);
    }}
    on:resize={function () {
        canvas.setDimensions({
            width: body.clientWidth,
            height: body.clientHeight - header.clientHeight
        });
    }}
    on:keydown={function (event) {
        switch (event.key) {
            case 'h':
                tool.set(Tool.Hand);
                break;
            case 'b':
                tool.set(Tool.Brush);
                break;
        }
    }}
/>

<svelte:head>
    <title>Editando {data.project.name} - Swibly Arkhon</title>
</svelte:head>

<div bind:this={body} class="w-full h-[calc(100vh-89px-2rem)]">
    <div bind:this={header} class="p-4">
        <h2>{data.project.name}</h2>
    </div>
</div>

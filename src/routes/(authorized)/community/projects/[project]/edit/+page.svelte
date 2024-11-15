<script lang="ts">
    import { Canvas } from 'fabric';
    import { onMount } from 'svelte';
    import type { PageServerData } from './$types';
    import type { Project } from '$lib/projects';
    import type { User } from '$lib/user';
    import { renderFromData, centerView, getCanvasObjects } from '$lib/editor/utils';
    import { loadEventListeners } from '$lib/editor/eventListeners';
    import { tool, Tool } from '$lib/stores/tool';
    import CanvasItem from '$lib/components/editor/CanvasItem.svelte';
    import { hasPermissions } from '$lib/utils';

    export let data: PageServerData & { user: User; project: Project };

    let body: HTMLDivElement;
    let aside: HTMLDivElement;
    let canvasContainer: HTMLDivElement;
    let canvas: Canvas;
    let previousTool: Tool | null = null;

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

    $: objects = getCanvasObjects(canvas);

    function handleKeyDown(event: KeyboardEvent) {
        if (event.key === ' ') {
            if (previousTool === null) {
                previousTool = $tool;
                tool.set(Tool.Hand);
            }
        }
    }

    function handleKeyUp(event: KeyboardEvent) {
        if (event.key === ' ' && previousTool !== null) {
            tool.set(previousTool);
            previousTool = null;
        }
    }

    function updateCanvasDimensions() {
        if (!canvas) return;

        canvas.setDimensions({
            width: body.clientWidth - aside.clientWidth,
            height: body.clientHeight
        });
    }

    onMount(async function () {
        const canvasElement = document.createElement('canvas');
        canvasContainer.appendChild(canvasElement);

        canvas = new Canvas(canvasElement, {
            preserveObjectStacking: true,
            imageSmoothingEnabled: false
        });

        if (!hasPermissions(data.user, data.project, ['allow_edit'])) {
            $tool = Tool.Hand;
        }

        updateCanvasDimensions();

        await renderFromData(canvas, data);
        centerView(canvas, data, 0);

        loadEventListeners(canvas);

        objects = getCanvasObjects(canvas);

        canvas.on('object:added', () => (objects = getCanvasObjects(canvas)));
        canvas.on('object:removed', () => (objects = getCanvasObjects(canvas)));
    });
</script>

<svelte:window
    on:auxclick={() => centerView(canvas, data)}
    on:resize={updateCanvasDimensions}
    on:keyup={handleKeyUp}
    on:keydown={function (event) {
        if (hasPermissions(data.user, data.project, ['allow_edit'])) {
            switch (event.key) {
                case 'h':
                    tool.set(Tool.Hand);
                    break;
                case 'b':
                    tool.set(Tool.Brush);
                    break;
            }
        }

        handleKeyDown(event);
    }}
/>

<svelte:head>
    <title>Editando {data.project.name} - Swibly Arkhon</title>
</svelte:head>

<div bind:this={body} class="flex w-full h-[calc(100vh-89px-2rem)]">
    <div bind:this={aside} class="pr-4 w-60">
        <h2 class="text-secondary">{data.project.name}</h2>

        <ul class="menu menu-xs rounded-lg w-full max-w-xs">
            {#each objects as object}
                <CanvasItem {canvas} {...object} />
            {/each}
        </ul>
    </div>

    <div bind:this={canvasContainer} />
</div>

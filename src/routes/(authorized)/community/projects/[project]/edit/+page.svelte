<script lang="ts">
    import { ActiveSelection, Canvas, FabricObject } from 'fabric';
    import { onMount } from 'svelte';
    import type { PageServerData } from './$types';
    import type { Project } from '$lib/projects';
    import type { User } from '$lib/user';
    import { loadCanvasFromData, updateCanvasDimensions } from '$lib/editor/utils';
    import {
        handleKeybinds,
        handleSpaceBarPress,
        handleSpaceBarRelease,
        loadCanvasEventListeners
    } from '$lib/editor/eventListeners';
    import { applyCanvasPermissionsBasedOnTool, setTool, tool, Tool } from '$lib/stores/tool';
    import { hasPermissions } from '$lib/utils';
    import Header from '$lib/components/editor/Header.svelte';
    import ObjectList from '$lib/components/editor/ObjectList.svelte';
    import { getCanvasObjects } from '$lib/editor/objects';
    import { centerView } from '$lib/editor/camera';

    export let data: PageServerData & { user: User; project: Project };

    let body: HTMLDivElement;
    let header: HTMLDivElement;
    let aside: HTMLDivElement;
    let canvasContainer: HTMLDivElement;
    let canvas: Canvas;

    $: applyCanvasPermissionsBasedOnTool(canvas, $tool);
    $: objects = getCanvasObjects(canvas);
    $: currentActiveObjects = undefined as FabricObject[] | undefined;

    onMount(async function () {
        const canvasElement = document.createElement('canvas');
        canvasContainer.appendChild(canvasElement);

        canvas = new Canvas(canvasElement, {
            imageSmoothingEnabled: false
        });

        if (!hasPermissions(data.user, data.project, ['allow_edit'])) {
            setTool(Tool.Hand);
        }

        updateCanvasDimensions(canvas, body, aside, header);

        await loadCanvasFromData(canvas, data);
        centerView(canvas, data.project, 0);

        loadCanvasEventListeners(canvas);

        objects = getCanvasObjects(canvas);

        canvas.on('object:added', () => (objects = getCanvasObjects(canvas)));
        canvas.on('object:removed', () => (objects = getCanvasObjects(canvas)));

        canvas.on('selection:created', () => {
            const objects = canvas.getActiveObjects();

            if (objects.some((object) => object.get('userlock') === true) && objects.length > 0) {
                canvas.setActiveObject(
                    new ActiveSelection(objects.filter((object) => object.get('userlock') !== true))
                );
                canvas.requestRenderAll();
            }

            currentActiveObjects = objects;
        });

        canvas.on('selection:updated', () => {
            const objects = canvas.getActiveObjects();

            if (objects.some((object) => object.get('userlock') === true) && objects.length > 0) {
                canvas.setActiveObject(
                    new ActiveSelection(objects.filter((object) => object.get('userlock') !== true))
                );
                canvas.requestRenderAll();
            }

            currentActiveObjects = objects;
        });

        canvas.on('selection:cleared', () => (currentActiveObjects = canvas.getActiveObjects()));
    });
</script>

<svelte:window
    on:resize={() => updateCanvasDimensions(canvas, body, aside, header)}
    on:keydown={handleSpaceBarPress}
    on:keyup={handleSpaceBarRelease}
/>

<svelte:document on:keydown={(event) => handleKeybinds(event, canvas, data.user, data.project)} />

<svelte:head>
    <title>Editando {data.project.name} - Swibly Arkhon</title>
</svelte:head>

<div bind:this={body} class="flex flex-col w-full h-[calc(100vh-89px-2rem)]">
    <Header bind:element={header} user={data.user} project={data.project} {canvas} />

    <div class="flex">
        <ObjectList
            bind:element={aside}
            {canvas}
            showControls={hasPermissions(data.user, data.project, ['allow_edit'])}
            {currentActiveObjects}
            {objects}
        />

        <div bind:this={canvasContainer} />
    </div>
</div>

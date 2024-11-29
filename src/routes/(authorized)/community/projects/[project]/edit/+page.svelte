<script lang="ts">
    import { fade } from 'svelte/transition';
    import {
        ActiveSelection,
        Canvas,
        FabricObject,
        InteractiveFabricObject,
        Polygon,
        Polyline
    } from 'fabric';
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
    import { type CanvasObject, getCanvasObjects } from '$lib/editor/objects';
    import { centerView, setZoomLevel } from '$lib/editor/camera';
    import { zoom } from '$lib/stores/zoom';
    import {
        canvasObjects,
        currentObjectRoundness,
        currentObjectBorderWidth
    } from '$lib/stores/objects';
    import Icon from '@iconify/svelte';
    import PropertiesTab from '$lib/components/editor/PropertiesTab.svelte';

    export let data: PageServerData & { user: User; project: Project };

    let body: HTMLDivElement;
    let header: HTMLDivElement;
    let aside: HTMLDivElement;
    let canvasContainer: HTMLDivElement;
    let canvas: Canvas;

    $: applyCanvasPermissionsBasedOnTool(canvas, $tool);
    $: currentActiveObjects = [] as FabricObject[];
    $: currentActiveObjectsItem = [] as CanvasObject[];

    onMount(async function () {
        const canvasElement = document.createElement('canvas');
        canvasContainer.appendChild(canvasElement);

        canvas = new Canvas(canvasElement, {
            imageSmoothingEnabled: false,
            uniformScaling: false,
            targetFindTolerance: 12
        });

        InteractiveFabricObject.ownDefaults = {
            ...InteractiveFabricObject.ownDefaults,
            padding: 10,
            borderColor: '#0175AF',
            cornerColor: '#FFA333',
            cornerSize: 8,
            transparentCorners: false,
            perPixelTargetFind: true,
            _controlsVisibility: {
                mt: false,
                ml: false,
                mr: false,
                mb: false
            }
        };

        if (!hasPermissions(data.user, data.project, ['allow_edit'])) {
            setTool(Tool.Hand);
        }

        updateCanvasDimensions(canvas, body, aside, header);

        await loadCanvasFromData(canvas, data);
        centerView(canvas, data.project, 0);

        loadCanvasEventListeners(canvas);

        canvasObjects.set(getCanvasObjects(canvas));

        canvas.on('selection:created', () => {
            const objects = canvas.getActiveObjects();

            if (objects.some((object) => object.get('userlock') === true) && objects.length > 0) {
                canvas.setActiveObject(
                    new ActiveSelection(objects.filter((object) => object.get('userlock') !== true))
                );
                canvas.requestRenderAll();
            }

            currentActiveObjects = objects;
            currentActiveObjectsItem = getCanvasObjects(canvas, true);

            $currentObjectBorderWidth = canvas.getActiveObject()!.strokeWidth;
            $currentObjectRoundness = Math.max(
                canvas.getActiveObject()!.get('ry') ?? 0,
                canvas.getActiveObject()!.get('rx') ?? 0
            );
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
            currentActiveObjectsItem = getCanvasObjects(canvas, true);

            $currentObjectBorderWidth = canvas.getActiveObject()!.strokeWidth;
            $currentObjectRoundness = Math.max(
                canvas.getActiveObject()!.get('ry') ?? 0,
                canvas.getActiveObject()!.get('rx') ?? 0
            );
        });

        canvas.on('selection:cleared', ({ deselected }) => {
            currentActiveObjects = canvas.getActiveObjects();
            currentActiveObjectsItem = getCanvasObjects(canvas, true);

            for (const object of deselected) {
                const bounds = object.getBoundingRect();

                if (bounds.width < 3 || bounds.height < 3) {
                    canvas.remove(object);
                    continue;
                }

                if (object instanceof Polygon || object instanceof Polyline) {
                    object.setBoundingBox(false);
                }
            }
        });
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
            objects={$canvasObjects}
        />

        <div bind:this={canvasContainer} class="relative">
            <PropertiesTab {canvas} objects={currentActiveObjectsItem} />
        </div>
    </div>
</div>

<div class="absolute right-4 bottom-4">
    <button class="btn btn-sm btn-square" on:click={() => setZoomLevel(canvas, $zoom - 0.2, 200)}>
        -
    </button>
    <button class="btn btn-sm" on:click={() => setZoomLevel(canvas, 1, 200)}>
        {($zoom * 100).toFixed(0)}%
    </button>
    <button class="btn btn-sm btn-square" on:click={() => setZoomLevel(canvas, $zoom + 0.2, 200)}>
        +
    </button>
</div>

{#if $tool === Tool.Polygon}
    <div
        class="absolute bottom-0 inset-x-0 glass text-center p-2"
        transition:fade={{ duration: 100 }}
    >
        Para finalizar o polígono, pressione
        <kbd class="kbd gap-1 ml-2">
            <Icon icon="fluent:arrow-enter-left-20-filled" />
            Enter
        </kbd>
    </div>
{/if}

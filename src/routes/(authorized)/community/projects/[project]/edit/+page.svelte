<script lang="ts">
    import { Canvas } from 'fabric';
    import { onMount } from 'svelte';
    import type { PageServerData } from './$types';
    import type { Project } from '$lib/projects';
    import type { User } from '$lib/user';
    import {
        renderFromData,
        centerView,
        getCanvasObjects,
        setPermissionsForObject
    } from '$lib/editor/utils';
    import { loadEventListeners } from '$lib/editor/eventListeners';
    import { tool, Tool, tools } from '$lib/stores/tool';
    import CanvasItem from '$lib/components/editor/CanvasItem.svelte';
    import { hasPermissions } from '$lib/utils';
    import Icon from '@iconify/svelte';

    export let data: PageServerData & { user: User; project: Project };

    let body: HTMLDivElement;
    let header: HTMLDivElement;
    let aside: HTMLDivElement;
    let canvasContainer: HTMLDivElement;
    let canvas: Canvas;
    let previousTool: Tool | null = null;

    $: (function () {
        if (canvas === undefined) return;

        switch ($tool) {
            case Tool.Polygon:
            case Tool.Selection:
                canvas.discardActiveObject();
                canvas.selection = true;
                for (const object of canvas.getObjects()) {
                    if (object.selectable === false && object.evented === false) continue;
                    setPermissionsForObject(object, true);
                }
                break;
            case Tool.Hand:
            case Tool.Text:
            case Tool.Line:
            case Tool.Brush:
            case Tool.Square:
            case Tool.Circle:
                canvas.discardActiveObject();
                canvas.selection = false;
                for (const object of canvas.getObjects()) {
                    if (object.selectable === false && object.evented === false) continue;
                    setPermissionsForObject(object, false);
                }
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
            height: body.clientHeight - header.clientHeight
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

<div bind:this={body} class="flex flex-col w-full h-[calc(100vh-89px-2rem)]">
    <div bind:this={header} class="flex items-center justify-between pb-4 border-b border-base-200">
        {#if hasPermissions(data.user, data.project, ['allow_edit'])}
            <section class="space-x-1">
                {#each tools as toolObject}
                    <div class="tooltip tooltip-bottom" data-tip={toolObject.name}>
                        <button
                            class="btn btn-sm btn-square"
                            class:btn-secondary={$tool === toolObject.tool}
                            class:btn-ghost={$tool !== toolObject.tool}
                            on:click={() => {
                                $tool = toolObject.tool;
                                console.log($tool);
                            }}
                        >
                            <Icon icon={toolObject.icon} class="text-lg" />
                        </button>
                    </div>
                {/each}
            </section>
        {/if}

        <h2 class="text-primary font-semibold">{data.project.name}</h2>

        <section>
            <button class="btn btn-ghost btn-sm" on:click={() => centerView(canvas, data)}>
                <Icon icon="material-symbols:camera" />
                Centralizar
            </button>

            {#if hasPermissions(data.user, data.project, ['allow_edit'])}
                <button class="btn btn-ghost btn-sm" on:click={() => centerView(canvas, data)}>
                    <Icon icon="ic:sharp-save-alt" />
                    Exportar
                </button>

                <button class="btn btn-secondary btn-sm" on:click={() => centerView(canvas, data)}>
                    <Icon icon="material-symbols:save-sharp" />
                    Salvar
                </button>
            {/if}
        </section>
    </div>

    <div class="flex">
        <div bind:this={aside} class="pr-4 border-r border-base-200 w-60 shrink-0">
            <ul
                class="menu menu-sm rounded-lg flex-nowrap w-full max-w-xs max-h-[calc(100vh-138px-2rem)] overflow-auto"
            >
                {#each objects as object}
                    <CanvasItem {canvas} {...object} />
                {/each}
            </ul>
        </div>

        <div bind:this={canvasContainer} />
    </div>
</div>

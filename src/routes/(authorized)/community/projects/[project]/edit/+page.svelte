<script lang="ts">
    import { Canvas, FabricObject } from 'fabric';
    import { onMount } from 'svelte';
    import type { PageServerData } from './$types';
    import type { Project } from '$lib/projects';
    import type { User } from '$lib/user';
    import {
        renderFromData,
        centerView,
        getCanvasObjects,
        type CanvasObject
    } from '$lib/editor/utils';
    import { loadEventListeners } from '$lib/editor/eventListeners';
    import { tool, Tool } from '$lib/stores/tool';
    import UserProfileCard from '$lib/components/UserProfileCard.svelte';
    import CanvasItem from '$lib/components/editor/CanvasItem.svelte';

    export let data: PageServerData & { user: User; project: Project };

    let body: HTMLDivElement;
    let aside: HTMLDivElement;
    let canvasContainer: HTMLDivElement;
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

    $: objects = getCanvasObjects(canvas);

    function formatCanvasObject(object: CanvasObject): string {
        const { name, type, children } = object;

        if (children && children.length > 0) {
            const items = children.map(formatCanvasObject).join('');
            return `<li>
                        <details open>
                            <summary>${name}</summary>
                            <ul>
                                ${items}
                            </ul>
                        </details>
                    </li>`;
        } else {
            return `<li><a>${name}</a></li>`;
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

        canvas.setZoom(0.5);

        updateCanvasDimensions();

        await renderFromData(canvas, data);
        centerView(canvas, data);

        loadEventListeners(canvas);

        objects = getCanvasObjects(canvas);

        canvas.on('object:added', () => (objects = getCanvasObjects(canvas)));
        canvas.on('object:removed', () => (objects = getCanvasObjects(canvas)));
    });
</script>

<svelte:window
    on:auxclick={() => centerView(canvas, data)}
    on:resize={updateCanvasDimensions}
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

<div bind:this={body} class="flex w-full h-[calc(100vh-89px-2rem)]">
    <div bind:this={aside} class="pr-4 w-60">
        <h2>{data.project.name}</h2>

        <p class="flex gap-2">
            Por:
            <UserProfileCard
                minified
                selfID={data.user.id}
                pfp={data.project.owner_pfp}
                lastname={data.project.owner_lastname}
                username={data.project.owner_username}
                verified={data.project.owner_verified}
                firstname={data.project.owner_firstname}
                id={data.project.owner_id}
            />
        </p>

        <ul class="menu menu-xs rounded-lg w-full max-w-xs">
            {#each objects as object}
                <CanvasItem {canvas} {...object} />
            {/each}
        </ul>
    </div>

    <div bind:this={canvasContainer} />
</div>

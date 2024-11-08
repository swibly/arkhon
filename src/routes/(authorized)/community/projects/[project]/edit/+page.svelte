<script lang="ts">
    import { Canvas, Line, Point } from 'fabric';
    import { onMount } from 'svelte';
    import type { PageServerData } from './$types';
    import type { Project } from '$lib/projects';
    import type { User } from '$lib/user';

    export let data: PageServerData & { user: User; project: Project };

    let body: HTMLDivElement;
    let canvas: Canvas;

    onMount(function () {
        const canvasElement = document.createElement('canvas');
        body.appendChild(canvasElement);

        canvas = new Canvas(canvasElement, {
            width: body.clientWidth,
            height: body.clientHeight,
            preserveObjectStacking: true,
            imageSmoothingEnabled: false
        });

        canvas.loadFromJSON(data.content ?? {}).then((loadedCanvas) => {
            if (
                data.user.id !== data.project.owner_id &&
                !data.project.allowed_users.some((x) => x.id === data.user.id && x.allow_edit)
            ) {
                loadedCanvas.forEachObject((object) => {
                    object.lockMovementX = true;
                    object.lockMovementY = true;
                    object.lockRotation = true;
                    object.lockScalingX = true;
                    object.lockScalingY = true;
                    object.lockSkewingX = true;
                    object.lockSkewingY = true;
                    object.hasControls = false;
                    object.hoverCursor = 'default';
                });
            }

            const gridSize = 100;
            const lines = [];

            for (let i = 0; i <= data.project.width; i++) {
                const x = i * gridSize;
                lines.push(
                    new Line([x, 0, x, data.project.height * gridSize], {
                        stroke: '#A3A3A3',
                        strokeWidth: 2,
                        selectable: false,
                        evented: false,
                        strokeUniform: true,
                        opacity: 1,
                        excludeFromExport: true
                    })
                );
            }

            for (let i = 0; i <= data.project.height; i++) {
                const y = i * gridSize;
                lines.push(
                    new Line([0, y, data.project.width * gridSize, y], {
                        stroke: '#A3A3A3',
                        strokeWidth: 2,
                        selectable: false,
                        evented: false,
                        strokeUniform: true,
                        opacity: 1,
                        excludeFromExport: true
                    })
                );
            }

            canvas.add(...lines);
            canvas.requestRenderAll();
        });
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

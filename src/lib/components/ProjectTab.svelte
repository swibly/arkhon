<script lang="ts" type="module">
    import Icon from '@iconify/svelte';
    import { onMount } from 'svelte';
    import { Canvas, Point, ActiveSelection, Rect, Circle, type FabricObject } from 'fabric';
    import {
        drawGrid,
        centerView,
        resize,
        renderAll,
        startDraw,
        stopDraw,
        saveCanvas,
        loadCanvas,
        toPNG
    } from '$lib/editor/canvas';
    import {
        stopLine,
        resetOpacity,        
    } from '$lib/editor/objects';

    export let canvas: Canvas;
    export let width: number;
    export let height: number;
    export let cursors: Array<FabricObject>;
    export let mode: string;
    export let name: string;

    let quadSize = {
        w: width,
        h: height
    };
    // let mode: string = changeMode('select');

    // export function changeMode(mode: string) {
    //     return mode;
    // }
</script>

<main
    class="absolute z-50 w-1/2 h-8 bg-secondary flex items-center justify-between mt-12 shadow-lg rounded-lg"
>
    <div class="flex ml-4">
        <div class="flex gap-4">
            <button
                class="hidden xl:block"
                on:click={() => stopDraw(canvas)}
                on:click={() => stopLine(canvas)}
                on:click={() => {
                    mode = 'select';

                    resetOpacity(canvas, cursors[0]);
                    resetOpacity(canvas, cursors[1]);
                }}
                ><Icon
                    icon="fluent:cursor-16-filled"
                    font-size="20px"
                    class={`${mode === 'select' ? 'text-primary' : 'text-white'}`}
                /></button
            >
            <button
                class="hidden xl:block  "
                on:click={() => startDraw(canvas)}
                on:click={() => stopLine(canvas)}
                on:click={() => {
                    mode = 'paint';

                    resetOpacity(canvas, cursors[0]);
                    resetOpacity(canvas, cursors[1]);
                }}
                ><Icon
                    icon="ri:brush-fill"
                    font-size="20px"
                    class={`${mode === 'paint' ? 'text-primary' : 'text-white'}`}
                /></button
            >
            <button
                class="hidden xl:block"
                on:click={() => stopDraw(canvas)}
                on:click={() => stopLine(canvas)}
                on:click={() => {
                    mode = 'text';

                    resetOpacity(canvas, cursors[0]);
                    resetOpacity(canvas, cursors[1]);
                }}
                ><Icon
                    icon="solar:text-bold"
                    font-size="20px"
                    class={`${mode === 'text' ? 'text-primary' : 'text-white'}`}
                /></button
            >
            <button
                class="hidden xl:block"
                on:click={() => stopDraw(canvas)}
                on:click={() => stopLine(canvas)}
                on:click={() => {
                    mode = 'rect';

                    resetOpacity(canvas, cursors[1]);
                }}
                ><Icon
                    icon="bi:square-fill"
                    font-size="20px"
                    class={`${mode === 'rect' ? 'text-primary' : 'text-white'}`}
                /></button
            >
            <button
                class="hidden xl:block"
                on:click={() => stopDraw(canvas)}
                on:click={() => stopLine(canvas)}
                on:click={() => {
                    mode = 'circle';

                    resetOpacity(canvas, cursors[0]);
                }}
                ><Icon
                    icon="material-symbols:circle"
                    font-size="20px"
                    class={`${mode === 'circle' ? 'text-primary' : 'text-white'}`}
                /></button
            >
            <button
                class="hidden xl:block"
                on:click={() => stopDraw(canvas)}
                on:click={() => stopLine(canvas)}
                on:click={() => {
                    mode = 'line';

                    resetOpacity(canvas, cursors[0]);
                    resetOpacity(canvas, cursors[1]);
                }}
                ><Icon
                    icon="vaadin:line-h"
                    font-size="20px"
                    class={`${mode === 'line' ? 'text-primary' : 'text-white'}`}
                /></button
            >
        </div>
    </div>
    <h1 class="text-lg text-center font-semibold overflow-hidden text-ellipsis whitespace-nowrap">{name}</h1>
    <div class="flex items-center gap-4 mr-4">
        <Icon icon="ph:play-fill" font-size="25px" />
        <button on:click={() => centerView(canvas, quadSize.w, quadSize.h)}
            ><Icon icon="mingcute:align-center-fill" font-size="25px" /></button
        >
        <button on:click={() => saveCanvas(canvas)}>
            <Icon icon="material-symbols:save" font-size="25px" />
        </button>
        <button
            on:click={() =>
                toPNG(
                    canvas,
                    quadSize.w,
                    quadSize.h,
                    canvas.viewportTransform.slice()[4],
                    canvas.viewportTransform.slice()[5]
                )}
        >
            <Icon icon="material-symbols:download" font-size="25px" />
        </button>
    </div>
</main>

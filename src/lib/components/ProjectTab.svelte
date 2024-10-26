<script lang="ts" type="module">
    import Icon from '@iconify/svelte';
    import { Canvas, type FabricObject } from 'fabric';
    import { centerView, startDraw, stopDraw, toPNG } from '$lib/editor/canvas';
    import { stopLine, resetOpacity } from '$lib/editor/objects';
    import { enhance } from '$app/forms';
    import type { Project } from '$lib/projects';
    import { spawn } from '$lib/toast';

    export let canvas: Canvas;
    export let width: number;
    export let height: number;
    export let cursors: Array<FabricObject>;
    export let mode: string;
    export let data: Project;
    let loading: boolean = false;

    let quadSize = {
        w: width,
        h: height
    };
</script>

<main
    class="absolute z-50 w-1/3 h-8 bg-secondary flex items-center justify-between mt-4 shadow-lg rounded-lg left-1/2 -translate-x-1/3"
>
    <div class="flex ml-4 gap-4">
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
            class="hidden xl:block"
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
    <h1
        class="text-lg text-center text-white font-semibold overflow-hidden text-ellipsis whitespace-nowrap"
    >
        {data.name}
    </h1>
    <div class="dropdown">
        <div tabindex="0" role="button" class="btn btn-secondary btn-sm">
            <Icon icon="icon-park-outline:more" font-size="18px" class="text-white" />
        </div>
        <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
        <ul
            tabindex="0"
            class="dropdown-content bg-secondary z-[1] w-20 p-2 shadow flex flex-col justify-center items-center"
        >
            <li>
                <button><Icon icon="ph:play-fill" font-size="20px" class="text-white" /></button>
            </li>
            <li>
                <button on:click={() => centerView(canvas, quadSize.w, quadSize.h)}
                    ><Icon
                        icon="mingcute:align-center-fill"
                        font-size="20px"
                        class="text-white"
                    /></button
                >
            </li>
            <li class="w-full">
                <form
                    action={`/community/projects/${data.id}/edit?/save`}
                    method="POST"
                    class="block p-0 w-full"
                    use:enhance={function ({ formData }) {
                        loading = true;

                        formData.set('json', JSON.stringify(canvas.toObject(['name', 'price', 'isComponent'])));

                        return () => {
                            loading = false;
                            spawn({ message: 'Salvo com sucesso' });
                        };
                    }}
                >
                    {#if loading}
                        <span class="loading loading-spinner loading-sm" />
                    {:else}
                        <button type="submit" class="w-full">
                            <Icon icon="material-symbols:save" class="size-5 mx-auto text-white" />
                        </button>
                    {/if}
                </form>
            </li>
            <li>
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
                    <Icon icon="material-symbols:download" font-size="20px" class="text-white" />
                </button>
            </li>
        </ul>
    </div>
</main>

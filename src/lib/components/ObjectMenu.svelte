<script lang="ts">
    import {
        changeBorder,
        changeFill,
        getActive,
        changeOpacity,
        changeStroke,
        takeOpacity, 
        takeStroke       
    } from '$lib/editor/objects';
    import { type Canvas } from 'fabric';
    import { onMount } from 'svelte';
    import Icon from '@iconify/svelte';
    import { draggable } from '@neodrag/svelte';

    let objectMenu: HTMLElement;

    export let canvas: Canvas;

    let opacitySlider: HTMLInputElement;
    let strokeSlider: HTMLInputElement;
    let value: number;
    let opacityValue: number;
    let strokeValue: number;
    let mixed: boolean = false;

    onMount(() => {
        addEventListener('load', () => {
            canvas.on('selection:created', () => {
                if (getActive(canvas).length > 1) {
                    mixed = true;
                    strokeValue = 10;
                    opacityValue = 10;
                } else {
                    strokeValue = takeStroke(canvas);
                    opacityValue = takeOpacity(canvas);
                }

                if (objectMenu) {
                    objectMenu.style.display = 'flex';
                }
            });

            canvas.on('selection:updated', () => {
                if (getActive(canvas).length > 1) {
                    mixed = true;
                    strokeValue = 10;
                    opacityValue = 10;
                } else {
                    strokeValue = takeStroke(canvas);
                    opacityValue = takeOpacity(canvas);
                }
            });

            canvas.on('selection:cleared', () => {
                if (objectMenu) {
                    objectMenu.style.display = 'none';
                }

                mixed = false;
            });
        });

        addEventListener('keydown', (e) => {
            if (e.ctrlKey && e.key === 'a' && getActive(canvas).length > 0) {
                if (objectMenu) {
                    objectMenu.style.display = 'flex';
                }

                strokeValue = 10;
                opacityValue = 10;
            }

            if (e.ctrlKey && e.key === 'x') {
                if (objectMenu) {
                    objectMenu.style.display = 'none';
                }
            }
        });
    });
</script>

<article
    class="hidden absolute w-56 h-40 bg-base-100 z-50 flex-col items-center rounded-xl border border-primary overflow-auto"
    bind:this={objectMenu}
    use:draggable={{ bounds: 'canvas', handle: '.handler', position: { x: 20, y: 20 } }}
>
    <div
        class="w-full h-8 bg-primary flex items-center justify-center cursor-drag handler rounded-t-lg"
    >
        <Icon icon="stash:drag-squares-horizontal-solid" class="text-white text-xl" />
    </div>
    <p class="text-md pt-2 font-bold -mt-1">Borda</p>
    <section class="flex items-center gap-2 pt-2">
        <button
            class="w-3 h-3 font-bold -mt-1"
            on:click={() => changeBorder(canvas, 'null', ...getActive(canvas))}
            ><Icon icon="material-symbols:close" /></button
        >
        <button
            class="w-3 h-3 bg-white rounded"
            on:click={() => changeBorder(canvas, 'white', ...getActive(canvas))}
        />
        <button
            class="w-3 h-3 bg-gray-500 rounded"
            on:click={() => changeBorder(canvas, 'gray', ...getActive(canvas))}
        />
        <button
            class="w-3 h-3 bg-red-400 rounded"
            on:click={() => changeBorder(canvas, 'red', ...getActive(canvas))}
        />
        <button
            class="w-3 h-3 bg-green-400 rounded"
            on:click={() => changeBorder(canvas, 'green', ...getActive(canvas))}
        />
        <button
            class="w-3 h-3 bg-blue-400 rounded"
            on:click={() => changeBorder(canvas, 'blue', ...getActive(canvas))}
        />
        <button
            class="w-3 h-3 bg-pink-400 rounded"
            on:click={() => changeBorder(canvas, 'pink', ...getActive(canvas))}
        />
        <button
            class="w-3 h-3 bg-yellow-400 rounded"
            on:click={() => changeBorder(canvas, 'yellow', ...getActive(canvas))}
        />
    </section>
    <p class="text-center text-md font-bold mt-2">Espessura da Borda</p>
    <p class={`${mixed ? 'block' : 'hidden'} text-center text-md font-bold text-secondary`}>
        Mixed
    </p>
    <section class="flex gap-2 pt-2">
        <input
            type="range"
            min="0"
            max="10"
            value={strokeValue}
            bind:this={strokeSlider}
            on:input={() => (strokeValue = changeStroke(canvas, strokeSlider))}
            class={`range range-xs ${mixed ? 'range-primary' : 'range-secondary'} w-36`}
        />
        <div class="divider" />
    </section>
    <div class="divider w-36 mx-auto -mt-4" />
    <p class="text-md font-bold -mt-4">Fundo</p>
    <section class="flex items-center gap-2 pt-2">
        <button
            class="w-3 h-3 -mt-1 font-bold"
            on:click={() => changeFill(canvas, 'null', ...getActive(canvas))}
            ><Icon icon="material-symbols:close" /></button
        >
        <button
            class="w-3 h-3 bg-white rounded"
            on:click={() => changeFill(canvas, 'white', ...getActive(canvas))}
        />
        <button
            class="w-3 h-3 bg-gray-500 rounded"
            on:click={() => changeFill(canvas, 'gray', ...getActive(canvas))}
        />
        <button
            class="w-3 h-3 bg-red-400 rounded"
            on:click={() => changeFill(canvas, 'red', ...getActive(canvas))}
        />
        <button
            class="w-3 h-3 bg-green-400 rounded"
            on:click={() => changeFill(canvas, 'green', ...getActive(canvas))}
        />
        <button
            class="w-3 h-3 bg-blue-400 rounded"
            on:click={() => changeFill(canvas, 'blue', ...getActive(canvas))}
        />
        <button
            class="w-3 h-3 bg-pink-400 rounded"
            on:click={() => changeFill(canvas, 'pink', ...getActive(canvas))}
        />
        <button
            class="w-3 h-3 bg-yellow-400 rounded"
            on:click={() => changeFill(canvas, 'yellow', ...getActive(canvas))}
        />
    </section>
    <div class="divider w-36 mx-auto" />
    <p class="text-center text-md font-bold -mt-4">Opacidade</p>
    <p class={`${mixed ? 'block' : 'hidden'} text-center text-md font-bold text-secondary`}>
        Mixed
    </p>
    <section class="flex gap-2 pt-2">
        <input
            type="range"
            min="0"
            max="10"
            value={opacityValue}
            bind:this={opacitySlider}
            on:input={() => (opacityValue = changeOpacity(canvas, opacitySlider))}
            class={`range range-xs ${mixed ? 'range-primary' : 'range-secondary'} w-36`}
        />
        <div class="divider" />
    </section>
</article>

<script lang="ts">
    import {
        changeBorder,
        changeFill,
        getActive,
        changeOpacity,
        takeOpacity
    } from '$lib/editor/objects';
    import { type Canvas } from 'fabric';
    import { onMount } from 'svelte';

    let objectMenu: HTMLElement;
    export let canvas: Canvas;
    let valueSlider: HTMLInputElement;
    let value: number;

    onMount(() => {
        addEventListener('mousedown', () => {
            if (getActive(canvas).length > 0) {
                if (objectMenu) {
                    objectMenu.style.display = 'flex';
                }

                value = takeOpacity(canvas);                
            } else {
                if (objectMenu) {
                    objectMenu.style.display = 'none';
                }
            }
        });

        addEventListener('keydown', (e) => {
            if (e.ctrlKey && e.key === 'a') {
                if (objectMenu) {
                    objectMenu.style.display = 'flex';
                }

                value = takeOpacity(canvas); 
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
    class="absolute hidden mt-12 ml-12 w-72 h-72 bg-base-300 z-50 flex-col items-center rounded-xl"
    bind:this={objectMenu}
>
    <p class="text-center text-xl pt-4 font-bold">Borda</p>
    <section class="flex gap-2 pt-2">
        <button
            class="w-4 h-4 font-bold -mt-1"
            on:click={() => changeBorder(canvas, 'null', ...getActive(canvas))}>X</button
        >
        <button
            class="w-4 h-4 bg-white rounded"
            on:click={() => changeBorder(canvas, 'white', ...getActive(canvas))}
        />
        <button
            class="w-4 h-4 bg-black rounded"
            on:click={() => changeBorder(canvas, 'black', ...getActive(canvas))}
        />
        <button
            class="w-4 h-4 bg-red-400 rounded"
            on:click={() => changeBorder(canvas, 'red', ...getActive(canvas))}
        />
        <button
            class="w-4 h-4 bg-green-400 rounded"
            on:click={() => changeBorder(canvas, 'green', ...getActive(canvas))}
        />
        <button
            class="w-4 h-4 bg-blue-400 rounded"
            on:click={() => changeBorder(canvas, 'blue', ...getActive(canvas))}
        />
        <button
            class="w-4 h-4 bg-pink-400 rounded"
            on:click={() => changeBorder(canvas, 'pink', ...getActive(canvas))}
        />
        <button
            class="w-4 h-4 bg-yellow-400 rounded"
            on:click={() => changeBorder(canvas, 'yellow', ...getActive(canvas))}
        />
    </section>
    <div class="divider" />
    <p class="text-center text-xl font-bold">Fundo</p>
    <section class="flex gap-2 pt-2">
        <button
            class="w-4 h-4 font-bold -mt-1"
            on:click={() => changeFill(canvas, 'null', ...getActive(canvas))}>X</button
        >
        <button
            class="w-4 h-4 bg-white rounded border border-2"
            on:click={() => changeFill(canvas, 'white', ...getActive(canvas))}
        />
        <button
            class="w-4 h-4 bg-black rounded"
            on:click={() => changeFill(canvas, 'black', ...getActive(canvas))}
        />
        <button
            class="w-4 h-4 bg-red-400 rounded"
            on:click={() => changeFill(canvas, 'red', ...getActive(canvas))}
        />
        <button
            class="w-4 h-4 bg-green-400 rounded"
            on:click={() => changeFill(canvas, 'green', ...getActive(canvas))}
        />
        <button
            class="w-4 h-4 bg-blue-400 rounded"
            on:click={() => changeFill(canvas, 'blue', ...getActive(canvas))}
        />
        <button
            class="w-4 h-4 bg-pink-400 rounded"
            on:click={() => changeFill(canvas, 'pink', ...getActive(canvas))}
        />
        <button
            class="w-4 h-4 bg-yellow-400 rounded"
            on:click={() => changeFill(canvas, 'yellow', ...getActive(canvas))}
        />
    </section>
    <div class="divider" />
    <p class="text-center text-xl font-bold">Opacidade</p>
    <section class="flex gap-2 pt-2">
        <input
            type="range"
            min="0"
            max="10"
            {value}
            bind:this={valueSlider}
            on:input={() => changeOpacity(canvas, valueSlider)}
            class="range range-secondary"
        />
        <div class="divider" />
    </section>
</article>

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
    import Icon from '@iconify/svelte';    

    let objectMenu: HTMLElement;
    let allowMovement: HTMLElement;
    export let canvas: Canvas;
    let valueSlider: HTMLInputElement;
    let value: number;
    let mixed: boolean = false;
    let newX: number = 0;
    let newY: number = 0;
    let startX: number = 0;
    let startY: number = 0;

    onMount(() => {     
        allowMovement.addEventListener('mousedown', mouseDown)
        
        function mouseDown(e: MouseEvent) {
            startX = canvas.getViewportPoint(e).x;
            startY = canvas.getViewportPoint(e).y;

            document.addEventListener('mousemove', mouseMove);
            document.addEventListener('mouseup', mouseUp);
        }

        function mouseMove(e: MouseEvent) {
            // newX = startX - canvas.getViewportPoint(e).x;
            // newY = startY - canvas.getViewportPoint(e).y;

            startX = canvas.getViewportPoint(e).x;
            startY = canvas.getViewportPoint(e).y;        

            objectMenu.style.top = startY + 'px';
            objectMenu.style.left = startX + 195 + 'px';
        }

        function mouseUp() {
            document.removeEventListener('mousemove', mouseMove);
        }

        addEventListener('mousedown', () => {
            canvas.on('selection:created', () => {
                if (getActive(canvas).length > 1) {
                    mixed = true;
                    value = 10;
                } else {
                    value = takeOpacity(canvas);
                }

                if (objectMenu) {
                    objectMenu.style.display = 'flex';
                }
            });

            canvas.on('selection:updated', () => {
                if (getActive(canvas).length > 1) {
                    mixed = true;
                    value = 10;
                } else {
                    value = takeOpacity(canvas);
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
            if (e.ctrlKey && e.key === 'a') {
                if (objectMenu) {
                    objectMenu.style.display = 'flex';
                }

                value = 10;
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
    class="absolute hidden mt-12 ml-12 w-72 h-80 bg-base-300 z-50 flex-col items-center rounded-xl"
    bind:this={objectMenu}
>
    <div class="w-full h-8 bg-primary flex items-center justify-center" bind:this={allowMovement}>
        <Icon icon="stash:drag-squares-horizontal-solid"  class="text-white text-xl" />
    </div>
    <p class="text-xl pt-4 font-bold">Borda</p>
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
    <div class="divider w-48 mx-auto" />
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
    <div class="divider w-48 mx-auto" />
    <p class="text-center text-xl font-bold">Opacidade</p>
    <p class={`${mixed ? 'block' : 'hidden'} text-center text-lg font-bold text-secondary`}>
        Mixed
    </p>
    <section class="flex gap-2 pt-2">
        <input
            type="range"
            min="0"
            max="10"
            {value}
            bind:this={valueSlider}
            on:input={() => (value = changeOpacity(canvas, valueSlider))}
            class={`range ${mixed ? 'range-primary' : 'range-secondary'}`}
        />
        <div class="divider" />
    </section>
</article>

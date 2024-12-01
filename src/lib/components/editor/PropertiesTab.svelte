<script lang="ts">
    import { fade } from 'svelte/transition';
    import Icon from '@iconify/svelte';
    import { draggable } from '@neodrag/svelte';
    import { controlsUtils, Polygon, Polyline, type Canvas, type FabricObject } from 'fabric';
    import { getCanvasObjects, type CanvasObject } from '$lib/editor/objects';
    import { enhance } from '$app/forms';
    import {
        canvasObjects,
        currentObjectBorderWidth,
        currentObjectOpacity,
        currentObjectRoundness
    } from '$lib/stores/objects';
    import Input from '../Input.svelte';
    import Measure from '../Measure.svelte';

    export let canvas: Canvas;
    export let objects: CanvasObject[];

    type Property = 'fill' | 'stroke';
    type Color = 'black' | 'red' | 'green' | 'blue' | 'purple' | 'yellow' | 'white' | null;

    function removeName(object: CanvasObject) {
        delete (object.object as FabricObject & { name?: string }).name;
        $canvasObjects = getCanvasObjects(canvas);
        (document.querySelector('form#update-name input[name="name"]') as HTMLInputElement).value =
            object.nameReset;
    }

    function changeColor(prop: Property, color: Color) {
        objects.forEach(({ object }) => {
            object.controls = controlsUtils.createObjectDefaultControls();
            object.set(prop, color);
        });
        canvas.requestRenderAll();
    }
</script>

{#if objects.length > 0}
    <div
        class="absolute top-0 left-0 bg-base-100 border border-base-200 bg-opacity-100 z-50 opacity-50 hover:opacity-100 transition-opacity"
        use:draggable={{ bounds: 'canvas', handle: '#handler' }}
        transition:fade={{ duration: 150 }}
    >
        <div
            id="handler"
            class="bg-primary p-2 w-full text-xs flex justify-center items-center gap-2 cursor-grab"
        >
            <Icon icon="ic:baseline-drag-indicator" />
            Segure aqui e arraste para mover
        </div>

        <section class="p-4 h-96 overflow-y-auto">
            {#if objects.length === 1}
                <h2 class="text-xs font-bold text-primary">Geral</h2>

                <form
                    method="POST"
                    id="update-name"
                    use:enhance={function ({ formData, cancel }) {
                        cancel();

                        const name = formData.get('name')?.toString();

                        if (!name || (name && name.trim() === '') || name === objects[0].nameReset)
                            return;

                        objects[0].object.set('name', name);
                        $canvasObjects = getCanvasObjects(canvas);
                    }}
                    class="mt-2 flex gap-1 items-center"
                >
                    <Input
                        name="name"
                        defaultValue={objects[0].name}
                        size="sm"
                        disableDefaultLabels
                    />

                    <button class="btn btn-square btn-primary btn-sm">
                        <Icon icon="mdi:feather" />
                    </button>

                    <button
                        type="button"
                        class="btn btn-square btn-error btn-sm"
                        on:click={() => removeName(objects[0])}
                    >
                        <Icon icon="material-symbols:close" />
                    </button>
                </form>

                <div class="divider" />

                <section class="space-y-4">
                    <h2 class="text-xs font-bold text-primary">Propriedades</h2>

                    <p>
                        Opacidade:
                        <span class="text-secondary">{$currentObjectOpacity}</span>
                    </p>

                    <Measure
                        bind:value={$currentObjectOpacity}
                        min={0}
                        step={0.1}
                        max={1}
                        onInput={function (event) {
                            const { object } = objects[0];

                            const newOpacity = parseFloat(event.currentTarget.value);

                            object.set({ opacity: newOpacity });

                            canvas.requestRenderAll();
                        }}
                    />

                    <div class="divider divider-start divider-end" />

                    {#if objects[0].type !== 'i-text' && objects[0].type !== 'group'}
                        <article>
                            <p>Cor do preenchimento:</p>
                            <div class="flex items-center gap-1">
                                <button
                                    class="size-6 bg-black"
                                    on:click={() => changeColor('fill', 'black')}
                                />
                                <button
                                    class="size-6 bg-red-500"
                                    on:click={() => changeColor('fill', 'red')}
                                />
                                <button
                                    class="size-6 bg-green-500"
                                    on:click={() => changeColor('fill', 'green')}
                                />
                                <button
                                    class="size-6 bg-blue-500"
                                    on:click={() => changeColor('fill', 'blue')}
                                />
                                <button
                                    class="size-6 bg-purple-500"
                                    on:click={() => changeColor('fill', 'purple')}
                                />
                                <button
                                    class="size-6 bg-yellow-500"
                                    on:click={() => changeColor('fill', 'yellow')}
                                />
                                <button
                                    class="size-6 bg-white"
                                    on:click={() => changeColor('fill', 'white')}
                                />
                                <button
                                    class="ml-1 size-6 text-error"
                                    on:click={() => changeColor('fill', null)}
                                >
                                    <Icon icon="emojione-monotone:cross-mark" />
                                </button>
                            </div>
                        </article>

                        <div class="divider divider-start divider-end" />

                        <article>
                            <p>Cor da borda:</p>
                            <div class="flex items-center gap-1">
                                <button
                                    class="size-6 bg-black"
                                    on:click={() => changeColor('stroke', 'black')}
                                />
                                <button
                                    class="size-6 bg-red-500"
                                    on:click={() => changeColor('stroke', 'red')}
                                />
                                <button
                                    class="size-6 bg-green-500"
                                    on:click={() => changeColor('stroke', 'green')}
                                />
                                <button
                                    class="size-6 bg-blue-500"
                                    on:click={() => changeColor('stroke', 'blue')}
                                />
                                <button
                                    class="size-6 bg-purple-500"
                                    on:click={() => changeColor('stroke', 'purple')}
                                />
                                <button
                                    class="size-6 bg-yellow-500"
                                    on:click={() => changeColor('stroke', 'yellow')}
                                />
                                <button
                                    class="size-6 bg-white"
                                    on:click={() => changeColor('stroke', 'white')}
                                />
                                <button
                                    class="ml-1 size-6 text-error"
                                    on:click={() => changeColor('stroke', null)}
                                >
                                    <Icon icon="emojione-monotone:cross-mark" />
                                </button>
                            </div>
                        </article>

                        <div class="divider divider-start divider-end" />

                        <p>
                            Espessura da borda:
                            <span class="text-secondary">{$currentObjectBorderWidth}</span>
                        </p>

                        <Measure
                            bind:value={$currentObjectBorderWidth}
                            min={0}
                            step={1}
                            max={10}
                            onInput={function (event) {
                                const { object } = objects[0];

                                const newStrokeWidth = parseInt(event.currentTarget.value, 10);
                                const strokeDifference = newStrokeWidth - object.strokeWidth;

                                object.set({
                                    strokeWidth: newStrokeWidth,
                                    left: object.left - strokeDifference / 2,
                                    top: object.top - strokeDifference / 2
                                });

                                object.setCoords();

                                canvas.requestRenderAll();
                            }}
                        />

                        <div class="divider divider-start divider-end" />

                        {#if objects[0].type !== 'polygon' && objects[0].type !== 'polyline' && objects[0].type !== 'circle'}
                            <p>
                                Raio da borda:
                                <span class="text-secondary">{$currentObjectRoundness * 2}</span>
                            </p>

                            <Measure
                                bind:value={$currentObjectRoundness}
                                min={0}
                                step={1}
                                max={50}
                                onInput={function (event) {
                                    const { object } = objects[0];

                                    object.set('strokeLineJoin', 'rounded');
                                    object.set('rx', parseInt(event.currentTarget.value));
                                    object.set('ry', parseInt(event.currentTarget.value));

                                    if (object instanceof Polygon || object instanceof Polyline) {
                                        object.setBoundingBox(true);
                                    }

                                    canvas.requestRenderAll();
                                }}
                            />
                        {/if}
                    {:else if objects[0].type === 'i-text'}
                        <article>
                            <p>Cor da fonte:</p>
                            <div>
                                <button
                                    class="size-6 bg-black"
                                    on:click={() => changeColor('fill', 'black')}
                                />
                                <button
                                    class="size-6 bg-red-500"
                                    on:click={() => changeColor('fill', 'red')}
                                />
                                <button
                                    class="size-6 bg-green-500"
                                    on:click={() => changeColor('fill', 'green')}
                                />
                                <button
                                    class="size-6 bg-blue-500"
                                    on:click={() => changeColor('fill', 'blue')}
                                />
                                <button
                                    class="size-6 bg-purple-500"
                                    on:click={() => changeColor('fill', 'purple')}
                                />
                                <button
                                    class="size-6 bg-yellow-500"
                                    on:click={() => changeColor('fill', 'yellow')}
                                />
                                <button
                                    class="size-6 bg-white"
                                    on:click={() => changeColor('fill', 'white')}
                                />
                                <button
                                    class="ml-1 size-6 text-error"
                                    on:click={() => changeColor('fill', null)}
                                >
                                    <Icon icon="emojione-monotone:cross-mark" />
                                </button>
                            </div>
                        </article>
                    {/if}
                </section>
            {/if}
        </section>
    </div>
{/if}

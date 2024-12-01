<script lang="ts">
    import { fade, slide } from 'svelte/transition';
    import Icon from '@iconify/svelte';
    import { draggable } from '@neodrag/svelte';
    import { Polygon, Polyline, type Canvas, type FabricObject } from 'fabric';
    import { getCanvasObjects, type CanvasObject } from '$lib/editor/objects';
    import { enhance } from '$app/forms';
    import {
        canvasObjects,
        currentFontSize,
        currentObjectBorderWidth,
        currentObjectOpacity,
        currentObjectRoundness
    } from '$lib/stores/objects';
    import Input from '../Input.svelte';
    import Measure from '../Measure.svelte';
    import { spawn } from '$lib/toast';
    import { bringForward, bringToFront, sendBackwards, sendToBack } from '$lib/editor/layer';

    export let canvas: Canvas;
    export let objects: CanvasObject[];

    let showThickness = true;
    let showMenu = true;

    let element: HTMLDivElement;
    let pos: { x: number; y: number } = { x: 0, y: 0 };

    type Property = 'fill' | 'stroke';
    type Color = 'black' | 'red' | 'green' | 'blue' | 'purple' | 'yellow' | 'white' | null;

    function removeName(object: CanvasObject) {
        delete (object.object as FabricObject & { name?: string }).name;
        $canvasObjects = getCanvasObjects(canvas);
        (document.querySelector('form#update-name input[name="name"]') as HTMLInputElement).value =
            object.nameReset;

        spawn({ message: 'Nome removido!' });
    }

    function changeColor(prop: Property, color: Color) {
        objects.forEach(({ object }) => {
            object.set(prop, color);
        });

        if (prop === 'stroke') {
            if (color === null) {
                showThickness = false;
            } else {
                showThickness = true;
            }
        }

        canvas.requestRenderAll();
    }

    function toggleMenuShow() {
        showMenu = !showMenu;
    }
</script>

{#if objects.length > 0}
    <div
        bind:this={element}
        class="absolute top-0 right-0 border border-base-200 z-10 group min-w-72"
        use:draggable={{
            bounds: 'canvas',
            handle: '#handler',
            position: pos,
            onDrag: ({ offsetX, offsetY }) => (pos = { x: offsetX, y: offsetY })
        }}
        transition:fade={{ duration: 150 }}
    >
        <!-- svelte-ignore a11y-no-static-element-interactions -->
        <div
            id="handler"
            class="bg-secondary text-black p-2 w-full text-xs flex justify-center items-center gap-2 cursor-grab"
            on:dblclick={toggleMenuShow}
        >
            <Icon icon="ic:baseline-drag-indicator" />
            Segure aqui e arraste para mover

            <div class="grow" />

            <button on:click={toggleMenuShow}>
                {#if showMenu}
                    <Icon icon="iconamoon:arrow-down-2" class="size-6" />
                {:else}
                    <Icon icon="iconamoon:arrow-up-2" class="size-6" />
                {/if}
            </button>
        </div>

        {#if showMenu}
            <section
                class="p-4 h-96 overflow-y-auto opacity-50 bg-base-100 bg-opacity-100 group-hover:opacity-100 transition-opacity"
                transition:slide={{ axis: 'y' }}
            >
                <h2 class="text-xs font-bold text-primary">Camada</h2>

                <div class="mt-2">
                    <button class="btn btn-xs btn-square" on:click={() => sendToBack(canvas)}>
                        <Icon icon="tabler:arrow-bar-to-down" />
                    </button>

                    <button class="btn btn-xs btn-square" on:click={() => sendBackwards(canvas)}>
                        <Icon icon="tabler:arrow-down" />
                    </button>

                    <button class="btn btn-xs btn-square" on:click={() => bringForward(canvas)}>
                        <Icon icon="tabler:arrow-up" />
                    </button>

                    <button class="btn btn-xs btn-square" on:click={() => bringToFront(canvas)}>
                        <Icon icon="tabler:arrow-bar-up" />
                    </button>
                </div>

                <div class="divider" />

                {#if objects.length === 1}
                    <h2 class="text-xs font-bold text-primary">Geral</h2>

                    <form
                        method="POST"
                        id="update-name"
                        use:enhance={function ({ formData, cancel }) {
                            cancel();

                            const name = formData.get('name')?.toString();
                            const price = parseInt(
                                formData.get('price')?.toString().replace(/[^\d]/gi, '') ?? '0',
                                10
                            );

                            if (name && name.trim() !== '' && name === objects[0].nameReset) {
                                objects[0].object.set('name', name);
                            }

                            if (price && !isNaN(price)) {
                                objects[0].object.set('price', price);
                            }

                            $canvasObjects = getCanvasObjects(canvas);
                            spawn({ message: 'Objeto salvo!' });
                        }}
                        class="mt-2 flex flex-col gap-1 items-center"
                    >
                        <div class="flex items-end gap-1">
                            <Input
                                name="name"
                                defaultValue={objects[0].name}
                                size="sm"
                                disableDefaultLabels
                                labels={{ topLeft: 'Nome' }}
                            >
                                <button
                                    type="button"
                                    class="btn btn-link text-error btn-square btn-xs"
                                    on:click={() => removeName(objects[0])}
                                >
                                    <Icon icon="material-symbols:close" />
                                </button>
                            </Input>
                        </div>

                        {#if objects[0].type !== 'group'}
                            <Input
                                name="price"
                                icon="mdi:dollar"
                                type="number"
                                size="sm"
                                defaultValue={(objects[0].price ?? 0).toString()}
                                disableDefaultLabels
                            />
                        {/if}

                        <button class="btn btn-primary btn-sm w-full">
                            <Icon icon="mdi:feather" />
                            Salvar
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
                            step={0.05}
                            max={1}
                            onInput={function (event) {
                                objects[0].object.set({
                                    opacity: parseFloat(event.currentTarget.value)
                                });
                                canvas.requestRenderAll();
                            }}
                        />

                        <div class="divider" />

                        {#if objects[0].type !== 'group'}
                            <h2 class="text-xs font-bold text-primary">Estrutural</h2>

                            <article>
                                <p>Preenchimento:</p>

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
                                <p>
                                    {objects[0].type === 'textbox' || objects[0].type === 'i-text'
                                        ? 'Borda'
                                        : 'Parede'}:
                                </p>

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

                            {#if objects[0].object.stroke !== null || showThickness}
                                <div class="divider divider-start divider-end" />

                                <p>
                                    Espessura da
                                    {objects[0].type === 'textbox' ||
                                    objects[0].type === 'i-text' ||
                                    objects[0].type === 'path'
                                        ? 'borda'
                                        : 'parede'}:
                                    <span class="text-secondary">{$currentObjectBorderWidth}</span>
                                </p>

                                <Measure
                                    bind:value={$currentObjectBorderWidth}
                                    min={5}
                                    step={1}
                                    max={50}
                                    onInput={function (event) {
                                        const { object } = objects[0];

                                        const newStrokeWidth = parseInt(
                                            event.currentTarget.value,
                                            10
                                        );
                                        const strokeDifference =
                                            newStrokeWidth - object.strokeWidth;

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

                                {#if objects[0].type === 'rect'}
                                    <p>
                                        Raio da parede:
                                        <span class="text-secondary">
                                            {Math.min($currentObjectRoundness * 2, 100)}%
                                        </span>
                                    </p>

                                    <Measure
                                        bind:value={$currentObjectRoundness}
                                        min={0}
                                        step={1}
                                        max={50}
                                        onInput={function (event) {
                                            const { object } = objects[0];

                                            const newValue = parseInt(event.currentTarget.value);

                                            object.set('strokeLineJoin', 'rounded');
                                            object.set('rx', (newValue / 100) * object.width);
                                            object.set('ry', (newValue / 100) * object.width);

                                            if (
                                                object instanceof Polygon ||
                                                object instanceof Polyline
                                            ) {
                                                object.setBoundingBox(true);
                                            }

                                            canvas.requestRenderAll();
                                        }}
                                    />
                                {/if}
                            {/if}

                            {#if objects[0].type === 'i-text' || objects[0].type === 'textbox'}
                                <div class="divider" />

                                <h2 class="text-xs font-bold text-primary">Estético</h2>

                                <p>Fonte:</p>

                                <select
                                    class="select select-bordered select-sm w-full"
                                    on:change={function (event) {
                                        objects[0].object.set(
                                            'fontFamily',
                                            event.currentTarget.value
                                        );
                                        canvas.requestRenderAll();
                                    }}
                                    value={objects[0].object.get('fontFamily')}
                                >
                                    <option value="arial">Arial</option>
                                    <option value="times new roman">Times New Roman</option>
                                </select>

                                <div class="divider divider-start divider-end" />

                                <p>Tamanho da fonte: {$currentFontSize}</p>

                                <Measure
                                    bind:value={$currentFontSize}
                                    min={12}
                                    step={3}
                                    max={96}
                                    onInput={function (event) {
                                        const { object } = objects[0];

                                        const newValue = parseInt(event.currentTarget.value);

                                        object.set('fontSize', newValue);

                                        canvas.requestRenderAll();
                                    }}
                                />
                            {/if}
                        {:else}
                            <p class="text-sm italic text-center mb-4">
                                {objects[0].children?.length} objetos selecionados
                            </p>

                            <button
                                class="w-full btn btn-error btn-sm"
                                on:click={function () {
                                    // TODO: Implement ungroup
                                }}
                            >
                                <Icon icon="icon-park-outline:ungroup" />
                                Desagrupar
                            </button>
                        {/if}
                    </section>
                {:else}
                    <h2 class="text-xs font-bold text-primary">Propriedades</h2>

                    <p>
                        Opacidade:
                        <span class="text-secondary">{$currentObjectOpacity}</span>
                    </p>

                    <Measure
                        bind:value={$currentObjectOpacity}
                        min={0}
                        step={0.05}
                        max={1}
                        onInput={function (event) {
                            for (const { object } of objects) {
                                object.set({ opacity: parseFloat(event.currentTarget.value) });
                            }

                            canvas.requestRenderAll();
                        }}
                    />

                    <div class="divider" />

                    <h2 class="text-xs font-bold text-primary">Estrutural</h2>

                    <article>
                        <p>Preenchimento:</p>

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
                        <p>Borda:</p>

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
                        min={5}
                        step={1}
                        max={50}
                        onInput={function (event) {
                            for (const obj of objects) {
                                const { object } = obj;

                                const newStrokeWidth = parseInt(event.currentTarget.value, 10);
                                const strokeDifference = newStrokeWidth - object.strokeWidth;

                                object.set({
                                    strokeWidth: newStrokeWidth,
                                    left: object.left - strokeDifference / 2,
                                    top: object.top - strokeDifference / 2
                                });

                                object.setCoords();
                            }

                            canvas.requestRenderAll();
                        }}
                    />

                    <div class="divider" />

                    <p class="text-sm italic text-center mb-4">
                        {objects.length} objetos selecionados
                    </p>

                    <button
                        class="w-full btn btn-primary btn-sm"
                        on:click={function () {
                            // TODO: Implement group
                        }}
                    >
                        <Icon icon="icon-park-outline:ungroup" />
                        Agrupar
                    </button>
                {/if}
            </section>
        {/if}
    </div>
{/if}

<script lang="ts" type="module">
    import Icon from '@iconify/svelte';
    import { toggle } from '$lib/stores/theme';
    import Component from '$lib/components/Component.svelte';
    import Pagination from '$lib/components/Pagination.svelte';
    import { writable } from 'svelte/store';
    import { onMount } from 'svelte';
    import { lightMode } from '$lib/stores/theme';
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
        remove,
        removeGroup,
        getActive,
        addRect,
        addText,
        addCircle,
        addPoints,
        addLine,
        stopLine,
        resetOpacity,
        verifyText
    } from '$lib/editor/objects';
    import RightMenu from '$lib/components/RightMenu.svelte';
    import ObjectMenu from '$lib/components/ObjectMenu.svelte';
    import ObjectInfo from '$lib/components/ObjectInfo.svelte';

    // Váriaveis e funções do aside

    let activeButton: String = 'project';
    let components = [...Array(120)].map((_, i) => {
        return { Name: `${i + 1}` };
    });
    let categories = [...Array(80)].map((_, i) => {
        return { Name: `${i + 1}` };
    });
    let currentPageStore = writable(1);

    function setActiveButton(value: String) {
        activeButton = value;
    }

    function start(currentPage: number): number {
        return (currentPage - 1) * 8;
    }

    function end(currentPage: number): number {
        return start(currentPage) + 8;
    }

    // Váriaveis e todo o funcionamento do canvas

    let canvas: HTMLCanvasElement;
    let fabric: Canvas;
    let _clipboard: FabricObject;
    let mode: string = 'select';
    let lastPosX: number;
    let lastPosY: number;
    let isDragging: boolean;
    let rect: FabricObject;
    let circle: FabricObject;
    let loadCount: number = 0;
    let asideObjects: Array<FabricObject> = [];
    const quadSize = {
        w: 3000,
        h: 3000
    };

    onMount(function () {
        fabric = new Canvas(canvas, {
            selection: true,
            preserveObjectStacking: true
        });

        loadCanvas(fabric);

        rect = new Rect({
            width: 100,
            height: 100,
            top: quadSize.h / 2 - 50,
            left: quadSize.w / 2 - 50,
            fill: 'white',
            opacity: 0,
            selectable: false
        });

        circle = new Circle({
            radius: 60,
            top: quadSize.h / 2 - 50,
            left: quadSize.w / 2 - 50,
            fill: 'white',
            opacity: 0,
            selectable: false
        });

        resize(fabric, innerWidth, innerHeight);
        centerView(fabric, quadSize.w, quadSize.h);

        fabric.on('after:render', () => {
            loadCount++;

            if (fabric.getObjects().length !== asideObjects.length) {
                asideObjects = [];

                let items = fabric.getObjects();

                for (const obj of items) {
                    asideObjects.push(obj);
                }
            }

            if (loadCount === 1) {
                drawGrid(fabric, 100, quadSize.w, quadSize.h);

                fabric.add(rect);
                fabric.add(circle);
                fabric.moveObjectTo(rect, 1);
                fabric.moveObjectTo(circle, 2);
                fabric.moveObjectTo(fabric.getObjects()[3], 4);

                rect.excludeFromExport = true;
                circle.excludeFromExport = true;
            }
        });

        fabric.on('mouse:down', function ({ e }) {
            if (fabric.getActiveObject()) {
                mode = 'select';

                resetOpacity(fabric, rect);
                resetOpacity(fabric, circle);
            }

            if (e.altKey) {
                fabric.isDrawingMode = false;
                mode = 'select';

                lastPosX = fabric.getViewportPoint(e).x;
                lastPosY = fabric.getViewportPoint(e).y;

                isDragging = true;
                fabric.selection = false;
                fabric.isDrawingMode = false;
            }

            if (mode === 'select') {
                fabric.isDrawingMode = false;
            }

            if (mode === 'text') {
                addText(
                    fabric,
                    [{ x: fabric.getScenePoint(e).x, y: fabric.getScenePoint(e).y }],
                    'Toque aqui para digitar'
                );

                fabric.set({ selection: false });
            }

            if (mode === 'rect') {
                addRect(fabric, [{ x: fabric.getScenePoint(e).x, y: fabric.getScenePoint(e).y }]);

                fabric.set({ selection: false });
            }

            if (mode === 'circle') {
                addCircle(fabric, [{ x: fabric.getScenePoint(e).x, y: fabric.getScenePoint(e).y }]);

                fabric.set({ selection: false });
            }

            if (mode === 'line') {
                fabric.set({ selection: false });

                const points = { x: fabric.getScenePoint(e).x, y: fabric.getScenePoint(e).y };

                addPoints(fabric, points);
            }
        });

        fabric.on('mouse:move', function ({ e }) {
            if (isDragging) {
                let vpt = fabric.viewportTransform;
                if (e.type === 'mousemove') {
                    vpt[4] += fabric.getViewportPoint(e).x - lastPosX;
                    vpt[5] += fabric.getViewportPoint(e).y - lastPosY;
                    fabric.requestRenderAll();
                    lastPosX = fabric.getViewportPoint(e).x;
                    lastPosY = fabric.getViewportPoint(e).y;
                }
            }

            if (mode === 'rect') {
                rect.set({
                    top: fabric.getScenePoint(e).y - 50,
                    left: fabric.getScenePoint(e).x - 50,
                    opacity: 0.1
                });

                fabric.requestRenderAll();
            }

            if (mode === 'circle') {
                circle.set({
                    top: fabric.getScenePoint(e).y - 50,
                    left: fabric.getScenePoint(e).x - 50,
                    opacity: 0.1
                });

                fabric.requestRenderAll();
            }
        });

        fabric.on('mouse:up', function () {
            fabric.setViewportTransform(fabric.viewportTransform);
            isDragging = false;
            fabric.selection = true;
        });

        fabric.on('mouse:wheel', function ({ e }) {
            const panX = e.deltaX * 0.5;
            const panY = e.deltaY * 0.5;

            if (e.ctrlKey) {
                const maximum = 0.25;
                const minimum = 5;

                var zoom = fabric.getZoom();

                zoom *= 0.999 ** panY;

                if (zoom > minimum) zoom = minimum;
                if (zoom < maximum) zoom = maximum;

                fabric.zoomToPoint(new Point(e.offsetX, e.offsetY), zoom);
            } else {
                fabric.relativePan(new Point(-panX, -panY));
            }

            e.preventDefault();
            e.stopPropagation();
        });

        fabric.on('object:rotating', function ({ e, target }) {
            target.snapAngle = ~~e.shiftKey * 15;
        });

        fabric.on('object:moving', function ({ e, target }) {
            if (e.ctrlKey) {
                target.left = Math.round(target.left / 50) * 50;
                target.top = Math.round(target.top / 50) * 50;
            }
        });

        fabric.on('object:modified', () => {
            if (fabric.getActiveObject()!.type === 'i-text') {
                asideObjects = [];

                let items = fabric.getObjects();

                for (const obj of items) {
                    asideObjects.push(obj);
                }
            }
        });

        addEventListener('resize', function () {
            resize(fabric, innerWidth, innerHeight);
        });

        addEventListener('keydown', async (e) => {
            if (e.altKey) {
                resetOpacity(fabric, rect);
                resetOpacity(fabric, circle);
                stopLine(fabric);
                startDraw(fabric);

                fabric.isDrawingMode = false;
                mode = 'select';
            }

            if (e.key == 'Delete') {
                removeGroup(fabric, ...getActive(fabric));
                remove(fabric, ...getActive(fabric));
                renderAll(fabric);
            }

            if (e.ctrlKey && e.key == 'x') {
                e.preventDefault();

                if (fabric.getActiveObject()) {
                    fabric
                        .getActiveObject()!
                        .clone()
                        .then((cloned) => {
                            _clipboard = cloned;
                        });
                }

                removeGroup(fabric, ...getActive(fabric));
                remove(fabric, ...getActive(fabric));
                renderAll(fabric);
            }

            if (e.ctrlKey && e.key == 'a') {
                e.preventDefault();

                fabric.discardActiveObject();
                var sel = new ActiveSelection(
                    fabric.getObjects().filter((e) => e.selectable),
                    {
                        canvas: fabric
                    }
                );
                fabric.setActiveObject(sel);
                fabric.renderAll();
            }

            if (e.ctrlKey && e.key == 'c') {
                if (fabric.getActiveObject()) {
                    fabric
                        .getActiveObject()!
                        .clone()
                        .then((cloned) => {
                            _clipboard = cloned;
                        });
                }
            }

            if (e.ctrlKey && e.key == 'v') {
                const clonedObj = await _clipboard.clone();
                fabric.discardActiveObject();
                clonedObj.set({
                    left: clonedObj.left + 10,
                    top: clonedObj.top + 10,
                    evented: true
                });
                if (clonedObj instanceof ActiveSelection) {
                    clonedObj.canvas = fabric;
                    clonedObj.forEachObject((obj) => {
                        fabric.add(obj);
                    });
                    clonedObj.setCoords();
                } else {
                    fabric.add(clonedObj);
                }
                _clipboard.top += 10;
                _clipboard.left += 10;
                fabric.setActiveObject(clonedObj);
                fabric.requestRenderAll();
            }

            if (e.ctrlKey && e.key == 'd') {
                e.preventDefault();

                let objs = fabric.getActiveObjects();

                for (const obj of objs) {
                    let clonedObj = await obj.clone();

                    fabric.discardActiveObject();
                    clonedObj.set({
                        left: obj.left + 10,
                        top: obj.top + 10
                    });

                    fabric.add(clonedObj);
                    fabric.setActiveObject(clonedObj);
                    fabric.requestRenderAll();
                }
            }

            if (
                (getActive(fabric).length === 1 && getActive(fabric)[0].type !== 'i-text') ||
                getActive(fabric).length !== 1
            ) {
                if (e.key === 'p') {
                    resetOpacity(fabric, rect);
                    resetOpacity(fabric, circle);
                    stopLine(fabric);
                    startDraw(fabric);
                    if (mode !== 'paint') {
                        mode = 'paint';
                    } else {
                        stopDraw(fabric);
                        mode = 'select';
                    }
                }

                if (e.key == 's') {
                    resetOpacity(fabric, rect);
                    resetOpacity(fabric, circle);
                    stopLine(fabric);
                    stopDraw(fabric);

                    mode = 'select';

                    fabric.renderAll();
                }

                if (e.key == 't') {
                    resetOpacity(fabric, rect);
                    resetOpacity(fabric, circle);
                    stopLine(fabric);
                    stopDraw(fabric);

                    if (mode !== 'text') {
                        mode = 'text';
                    } else {
                        mode = 'select';
                    }
                }

                if (e.key == 'q') {
                    resetOpacity(fabric, circle);
                    stopLine(fabric);
                    stopDraw(fabric);

                    if (mode !== 'rect') {
                        mode = 'rect';
                    } else {
                        mode = 'select';
                        resetOpacity(fabric, rect);
                    }
                }

                if (!e.ctrlKey && e.key == 'c') {
                    resetOpacity(fabric, rect);
                    stopLine(fabric);
                    stopDraw(fabric);

                    if (mode !== 'circle') {
                        mode = 'circle';
                    } else {
                        mode = 'select';
                        resetOpacity(fabric, circle);
                    }
                }

                if (e.key == 'l') {
                    resetOpacity(fabric, circle);
                    resetOpacity(fabric, rect);
                    stopDraw(fabric);

                    if (mode !== 'line') {
                        mode = 'line';
                    } else {
                        mode = 'select';
                        stopLine(fabric);
                    }
                }

                if (mode === 'line') {
                    if (e.key == 'd') {
                        addLine(fabric);
                        stopLine(fabric);

                        mode = 'select';
                    }

                    fabric.renderAll();
                }
            }
        });
    });
</script>

<main class="w-full min-h-screen overflow-hidden">
    <nav class="w-full bg-base-300 flex items-center justify-between shadow-lg">
        <div class="flex ml-4">
            <div class="dropdown">
                <div tabindex="0" role="button" class="btn bg-base-300 border-0 pt-1">
                    <Icon icon="fe:bar" font-size="42px" />
                </div>
                <ul class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                    <li on:click={() => saveCanvas(fabric)}>
                        <a href="/home/">Voltar para o início</a>
                    </li>
                </ul>
            </div>
            <div class="flex gap-4">
                <button
                    class="hidden xl:block"
                    on:click={() => stopDraw(fabric)}
                    on:click={() => stopLine(fabric)}
                    on:click={() => {
                        mode = 'select';

                        resetOpacity(fabric, rect);
                        resetOpacity(fabric, circle);
                    }}
                    ><Icon
                        icon="fluent:cursor-16-filled"
                        font-size="35px"
                        class={`${
                            mode === 'select'
                                ? 'text-secondary'
                                : $lightMode
                                ? 'text-black'
                                : 'text-white'
                        }`}
                    /></button
                >
                <button
                    class="hidden xl:block"
                    on:click={() => startDraw(fabric)}
                    on:click={() => stopLine(fabric)}
                    on:click={() => {
                        mode = 'paint';

                        resetOpacity(fabric, rect);
                        resetOpacity(fabric, circle);
                    }}
                    ><Icon
                        icon="ri:brush-fill"
                        font-size="35px"
                        class={`${
                            mode === 'paint'
                                ? 'text-secondary'
                                : $lightMode
                                ? 'text-black'
                                : 'text-white'
                        }`}
                    /></button
                >
                <button
                    class="hidden xl:block"
                    on:click={() => stopDraw(fabric)}
                    on:click={() => stopLine(fabric)}
                    on:click={() => {
                        mode = 'text';

                        resetOpacity(fabric, rect);
                        resetOpacity(fabric, circle);
                    }}
                    ><Icon
                        icon="solar:text-bold"
                        font-size="35px"
                        class={`${
                            mode === 'text'
                                ? 'text-secondary'
                                : $lightMode
                                ? 'text-black'
                                : 'text-white'
                        }`}
                    /></button
                >
                <button
                    class="hidden xl:block"
                    on:click={() => stopDraw(fabric)}
                    on:click={() => stopLine(fabric)}
                    on:click={() => {
                        mode = 'rect';

                        resetOpacity(fabric, circle);
                    }}
                    ><Icon
                        icon="bi:square-fill"
                        font-size="35px"
                        class={`${
                            mode === 'rect'
                                ? 'text-secondary'
                                : $lightMode
                                ? 'text-black'
                                : 'text-white'
                        }`}
                    /></button
                >
                <button
                    class="hidden xl:block"
                    on:click={() => stopDraw(fabric)}
                    on:click={() => stopLine(fabric)}
                    on:click={() => {
                        mode = 'circle';

                        resetOpacity(fabric, rect);
                    }}
                    ><Icon
                        icon="material-symbols:circle"
                        font-size="35px"
                        class={`${
                            mode === 'circle'
                                ? 'text-secondary'
                                : $lightMode
                                ? 'text-black'
                                : 'text-white'
                        }`}
                    /></button
                >
                <button
                    class="hidden xl:block"
                    on:click={() => stopDraw(fabric)}
                    on:click={() => stopLine(fabric)}
                    on:click={() => {
                        mode = 'line';

                        resetOpacity(fabric, rect);
                        resetOpacity(fabric, circle);
                    }}
                    ><Icon
                        icon="vaadin:line-h"
                        font-size="35px"
                        class={`${
                            mode === 'line'
                                ? 'text-secondary'
                                : $lightMode
                                ? 'text-black'
                                : 'text-white'
                        }`}
                    /></button
                >
            </div>
        </div>
        <h1 class="text-2xl font-bold">Título</h1>
        <div class="flex items-center gap-4 mr-4">
            <Icon icon="ph:play-fill" font-size="25px" />
            <button on:click={() => centerView(fabric, quadSize.w, quadSize.h)}
                ><Icon icon="mingcute:align-center-fill" font-size="25px" /></button
            >

            <label class="swap swap-rotate">
                <input type="checkbox" class="theme-controller" on:click={toggle} />

                <Icon icon="ph:moon" class="swap-on" font-size="25px" />
                <Icon icon="ph:sun" class="swap-off" font-size="25px" />
            </label>
            <button on:click={() => saveCanvas(fabric)}>
                <Icon icon="material-symbols:save" font-size="25px" />
            </button>
            <button
                on:click={() =>
                    toPNG(
                        fabric,
                        quadSize.w,
                        quadSize.h,
                        fabric.viewportTransform.slice()[4],
                        fabric.viewportTransform.slice()[5]
                    )}
            >
                <Icon icon="material-symbols:download" font-size="25px" />
            </button>
        </div>
    </nav>
    <main class="flex h-[calc(100vh-5.5vh)]">
        <aside class="w-0 xl:w-1/4 2xl:w-1/5 h-full bg-base-200 scrollbar-thin">
            <nav class="text-center mt-4 grid grid-cols-3 place-items-center">
                <button
                    class={`text-sm sm:text-base transition duration-150 ease-in-out ${
                        activeButton === 'project'
                            ? 'border-b-4 border-primary'
                            : 'border-transparent hover:border-b-4 hover:border-secondary'
                    } focus:border-b-4 focus:border-primary`}
                    on:click={() => setActiveButton('project')}
                >
                    Projeto
                </button>

                <button
                    class={`text-sm sm:text-base transition duration-150 ease-in-out ${
                        activeButton === 'component'
                            ? 'border-b-4 border-primary'
                            : 'border-transparent hover:border-b-4 hover:border-secondary'
                    } focus:border-b-4 focus:border-primary`}
                    on:click={() => setActiveButton('component')}
                >
                    Componentes
                </button>

                <button
                    class={`text-sm sm:text-base transition duration-150 ease-in-out ${
                        activeButton === 'store'
                            ? 'border-b-4 border-primary'
                            : 'border-transparent hover:border-b-4 hover:border-secondary'
                    } focus:border-b-4 focus:border-primary`}
                    on:click={() => setActiveButton('store')}
                >
                    Loja
                </button>
            </nav>
            <div class="divider" />
            <main>
                {#if activeButton == 'project'}
                    <details class="dropdown w-full">
                        <summary
                            class="text-white btn w-full bg-secondary hover:bg-base-300 hover:border hover:border-secondary rounded-none"
                            >Andar 1</summary
                        >
                        <div
                            class="p-2 shadow menu dropdown-content z-[1] bg-base-300 w-full border-2 border-secondary"
                        >
                            <button class="flex items-center gap-4 btn bg-base-300 border-0"
                                ><Icon icon="typcn:plus" font-size="20px" /> Adicionar mais um andar</button
                            >
                        </div>
                    </details>

                    <div class="divider" />

                    <main class="flex flex-col justify-center mx-8 mt-4">
                        <h1 class="text-xl font-bold text-center">Objetos</h1>
                        <section class="mt-4 mx-4 w-5/6">
                            {#if asideObjects.length > 4}
                                {#each asideObjects as object, index (object)}
                                    {#if index > 3}
                                        {#if object.type === 'rect'}
                                            <p class="flex items-center gap-4">
                                                <Icon
                                                    icon="bi:square-fill"
                                                    font-size="15px"
                                                    class={`${
                                                        $lightMode ? 'text-black' : 'text-white'
                                                    }`}
                                                /> Retângulo
                                            </p>
                                        {:else if object.type === 'circle'}
                                            <p class="flex items-center gap-4">
                                                <Icon
                                                    icon="material-symbols:circle"
                                                    font-size="15px"
                                                    class={`${
                                                        $lightMode ? 'text-black' : 'text-white'
                                                    }`}
                                                />Círculo
                                            </p>
                                        {:else if object.type === 'path'}
                                            <p class="flex items-center gap-4">
                                                <Icon
                                                    icon="ri:brush-fill"
                                                    font-size="15px"
                                                    class={`${
                                                        $lightMode ? 'text-black' : 'text-white'
                                                    }`}
                                                />Desenho
                                            </p>
                                        {:else if object.type === 'i-text'}
                                            <article class="flex items-center gap-4">
                                                <Icon
                                                    icon="solar:text-bold"
                                                    font-size="15px"
                                                    class={`${
                                                        $lightMode ? 'text-black' : 'text-white'
                                                    }`}
                                                />
                                                <p
                                                    class="overflow-hidden text-ellipsis whitespace-nowrap w-full"
                                                >                                                    
                                                    {verifyText(object).text}
                                                </p>
                                            </article>
                                        {:else if object.type === 'polygon'}
                                            <p class="flex items-center gap-4">
                                                <Icon
                                                    icon="vaadin:line-h"
                                                    font-size="15px"
                                                    class={`${
                                                        $lightMode ? 'text-black' : 'text-white'
                                                    }`}
                                                /> Polígono
                                            </p>
                                        {/if}
                                    {/if}
                                {/each}
                            {:else}
                                <p class="text-md text-center font-semibold">
                                    Nenhum objeto foi adicionado ao canvas
                                </p>
                            {/if}
                        </section>
                    </main>
                {/if}
                {#if activeButton == 'component'}
                    <Pagination bind:currentPageStore qtd={80}>
                        <div class="grid grid-cols-2 place-items-center mx-8">
                            {#each categories.slice(start($currentPageStore), end($currentPageStore)) as i}
                                <Component name={i.Name} editor />
                            {/each}
                        </div>
                    </Pagination>
                {/if}
                {#if activeButton == 'store'}
                    <Pagination bind:currentPageStore qtd={120}>
                        <div class="grid grid-cols-2 place-items-center mx-8">
                            {#each components.slice(start($currentPageStore), end($currentPageStore)) as i}
                                <Component name={i.Name} editor />
                            {/each}
                        </div></Pagination
                    >
                {/if}
            </main>
        </aside>

        <main class="w-full xl:w-3/4 2xl:w-4/5">
            <ObjectMenu canvas={fabric} />
            <ObjectInfo canvas={fabric} />
            <RightMenu canvas={fabric} />
            <canvas bind:this={canvas} />
        </main>
    </main>
</main>

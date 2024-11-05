<script lang="ts" type="module">
    import Icon from '@iconify/svelte';
    import { onMount, tick } from 'svelte';
    import { Canvas, Point, ActiveSelection, Rect, Circle, type FabricObject } from 'fabric';
    import {
        drawGrid,
        centerView,
        resize,
        renderAll,
        startDraw,
        stopDraw,
        loadCanvas
    } from '$lib/editor/canvas';
    import {
        remove,
        removeGroup,
        getActive,
        copy,
        paste,
        addRect,
        addText,
        addCircle,
        addPoints,
        addLine,
        stopLine,
        resetOpacity,
        verifyObject
    } from '$lib/editor/objects';
    import RightMenu from '$lib/components/RightMenu.svelte';
    import ProjectTab from '$lib/components/ProjectTab.svelte';
    import type { PageServerData } from './$types';
    import type { User } from '$lib/user';
    import type { Project } from '$lib/projects';
    import type { Component } from '$lib/component';
    import ComponentCard from '$lib/components/ComponentCard.svelte';
    import ComponentPagination from '$lib/components/ComponentPagination.svelte';
    import ObjectMenu from '$lib/components/ObjectMenu.svelte';
    import type { Pagination } from '$lib/utils';
    import ObjectInfo from '$lib/components/ObjectInfo.svelte';

    export let data: PageServerData & { user: User; project: Project };

    // Váriaveis e todo o funcionamento do canvas

    let activeButton: String = 'project';
    let canvas: HTMLCanvasElement;
    let fabric: Canvas;
    let _clipboard: FabricObject;
    let copiedObjects: FabricObject[];
    let mode: string = 'select';
    let lastPosX: number;
    let lastPosY: number;
    let isDragging: boolean;
    let rect: FabricObject;
    let circle: FabricObject;
    let loadCount: number = 0;
    let asideObjects: Array<FabricObject> = [];
    let allComponents: Pagination<Component>;
    let ownedComponents: Pagination<Component>;

    let redoStack: Array<object> = [];
    let undoStack: Array<object> = [];

    let isTexting: boolean = false;
    let isAllowed: boolean;
    let modalOpen: boolean;

    const quadSize = {
        w: data.project.width * 100,
        h: data.project.height * 100
    };

    function setActiveButton(value: String) {
        activeButton = value;
    }

    onMount(() => {
        if (data.project.owner_username === data.user.username) {
            isAllowed = true;
        } else {
            if (data.project.allowed_users.length === 0) {
                isAllowed = false;
            } else {
                data.project.allowed_users.forEach((user) => {
                    if (user.username === data.user.username && user.allow_edit) {
                        isAllowed = true;
                    } else {
                        isAllowed = false;
                    }
                });
            }
        }

        allComponents = data.component;
        ownedComponents = data.allOwnedComponents;

        // console.log('Owned', data.allOwnedComponents);
        // console.log("All", allComponents.data.filter((component) => component.owner_username !== data.user.username && !component.bought))

        fabric = new Canvas(canvas, {
            selection: true,
            preserveObjectStacking: true
        });

        if (data.content) {
            loadCanvas(fabric, data.content);
        }

        resize(fabric, innerWidth, innerHeight, isAllowed);
        centerView(fabric, quadSize.w, quadSize.h);

        fabric.on('after:render', () => {
            loadCount++;

            if (fabric.getObjects().length !== asideObjects.length) {
                asideObjects = [];

                let items = fabric.getObjects().slice(3);

                for (const obj of items) {
                    asideObjects.push(obj);
                }
            }

            if (loadCount === 1) {
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

                drawGrid(fabric, 100, quadSize.w, quadSize.h);

                fabric.add(rect);
                fabric.add(circle);
                fabric.moveObjectTo(rect, 1);
                fabric.moveObjectTo(circle, 2);
                fabric.moveObjectTo(fabric.getObjects()[3], 4);

                rect.excludeFromExport = true;
                circle.excludeFromExport = true;

                if (!isAllowed) {
                    fabric.selection = false;
                    fabric.skipTargetFind = true;
                    fabric.forEachObject((obj) => {
                        obj.selectable = false;
                        obj.evented = false;
                    });
                }
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

        addEventListener('touchstart', (e) => {
            fabric.isDrawingMode = false;
            mode = 'select';

            lastPosX = fabric.getViewportPoint(e).x;
            lastPosY = fabric.getViewportPoint(e).y;

            fabric.selection = false;
            fabric.isDrawingMode = false;
        });

        addEventListener('touchmove', (e) => {
            let vpt = fabric.viewportTransform;

            vpt[4] += fabric.getViewportPoint(e).x - lastPosX;
            vpt[5] += fabric.getViewportPoint(e).y - lastPosY;
            fabric.requestRenderAll();
            lastPosX = fabric.getViewportPoint(e).x;
            lastPosY = fabric.getViewportPoint(e).y;
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

        fabric.on('object:added', () => {
            if (loadCount > 1) {
                saveState(fabric);
            }
        });

        fabric.on('object:modified', () => {
            if (loadCount > 1) {
                saveState(fabric);
            }

            if (fabric.getActiveObject()!.type === 'i-text') {
                asideObjects = [];

                let items = fabric.getObjects();

                for (const obj of items) {
                    asideObjects.push(obj);
                }
            }
        });

        fabric.on('object:removed', () => {
            if (loadCount > 1) {
                saveState(fabric);
            }
        });

        fabric.on('text:editing:entered', () => {
            isTexting = true;
        });

        fabric.on('text:editing:exited', () => {
            isTexting = false;
        });

        addEventListener('resize', function () {
            resize(fabric, innerWidth, innerHeight, isAllowed);
            if (innerWidth < 1280) {
                isAllowed = true;
            }
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

            if (
                (getActive(fabric).length === 1 && getActive(fabric)[0].type !== 'i-text') ||
                (!isTexting && isAllowed)
            ) {
                if (!modalOpen) {
                    if (e.key == 'Delete') {
                        removeGroup(fabric, ...getActive(fabric));
                        remove(fabric, ...getActive(fabric));
                        renderAll(fabric);
                    }

                    if (e.ctrlKey && e.key == 'x') {
                        e.preventDefault();

                        if (fabric.getActiveObject()) {
                            _clipboard = await copy(fabric);
                            copiedObjects = getActive(fabric);

                            getActive(fabric).forEach((item) => {
                                // @ts-ignore
                                if (item.objects !== undefined) {
                                    removeGroup(fabric, item);
                                } else {
                                    remove(fabric, ...getActive(fabric));
                                }
                            });
                        }

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

                    if (e.ctrlKey && e.key == 'c' && !isTexting) {
                        if (fabric.getActiveObject()) {
                            _clipboard = await copy(fabric);
                            copiedObjects = getActive(fabric);
                        }
                    }

                    if (e.ctrlKey && e.key == 'v' && !isTexting) {
                        if (_clipboard !== undefined && copiedObjects !== undefined) {
                            paste(fabric, _clipboard, copiedObjects);
                        }
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

                    if (e.ctrlKey && e.key == 'z') {
                        e.preventDefault();

                        undo(fabric);
                    }

                    if (e.ctrlKey && e.key == 'y') {
                        e.preventDefault();

                        redo(fabric);
                    }

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
            }
        });
    });

    function saveState(canvas: Canvas) {
        redoStack = [];
        undoStack.push(
            canvas.toObject([
                'name',
                'price',
                'isComponent',
                'isPublic',
                'description',
                'id',
                'arkhoins',
                'material',
                'structureType',
                'owner'
            ])
        );
    }

    function undo(canvas: Canvas) {
        let lastState;
        let prevState;

        if (undoStack.length > 0) {
            if (undoStack.length > 1) {
                lastState = undoStack[undoStack.length - 2];
                prevState = undoStack.pop();

                if (prevState !== undefined) {
                    redoStack.push(prevState);
                }
            } else {
                lastState = data.content;
                prevState = undoStack.pop();

                if (prevState !== undefined) {
                    redoStack.push(prevState);
                }
            }

            loadCanvas(canvas, lastState);
            canvas.requestRenderAll();
            loadCount = 0;
        }
    }

    function redo(canvas: Canvas) {
        let lastState;

        if (redoStack.length > 0) {
            lastState = redoStack[redoStack.length - 1];
            redoStack.pop();

            undoStack.push(lastState);
            loadCanvas(canvas, lastState);
            canvas.requestRenderAll();
            loadCount = 0;
        }
    }
</script>

<main class="flex h-[90vh] -m-4 overflow-hidden">
    <aside class={`${isAllowed ? 'block' : 'hidden'} w-0 xl:w-64 2xl:w-72 bg-base-100`}>
        <nav class="text-center mt-4 hidden xl:grid grid-cols-3 place-items-center gap-2">
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
        <main class="w-full h-full overflow-y-auto">
            {#if activeButton == 'project'}
                <main class="flex flex-col justify-center mx-8 mt-4">
                    <h1 class="text-xl font-bold text-center">Objetos</h1>
                    <section class="mt-4 mx-4 w-5/6">
                        {#if asideObjects.length > 0}
                            {#each asideObjects as object}
                                {#if verifyObject(object).isComponent}
                                    <p class="flex items-center gap-4 text-primary">
                                        <Icon icon="iconamoon:component-fill" font-size="15px" />
                                        {verifyObject(object).name}
                                    </p>
                                {:else if object.type === 'rect'}
                                    <p class="flex items-center gap-4">
                                        <Icon icon="bi:square-fill" font-size="15px" /> Retângulo
                                    </p>
                                {:else if object.type === 'circle'}
                                    <p class="flex items-center gap-4">
                                        <Icon
                                            icon="material-symbols:circle"
                                            font-size="15px"
                                        />Círculo
                                    </p>
                                {:else if object.type === 'path'}
                                    <p class="flex items-center gap-4">
                                        <Icon icon="ri:brush-fill" font-size="15px" />Desenho
                                    </p>
                                {:else if object.type === 'i-text'}
                                    <article class="flex items-center gap-4">
                                        <Icon icon="solar:text-bold" font-size="15px" />
                                        <p
                                            class="overflow-hidden text-ellipsis whitespace-nowrap w-full"
                                        >
                                            {verifyObject(object).text}
                                        </p>
                                    </article>
                                {:else if object.type === 'polygon'}
                                    <p class="flex items-center gap-4">
                                        <Icon icon="vaadin:line-h" font-size="15px" /> Polígono
                                    </p>
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
                <main class="flex flex-col justify-center items-center">
                    <ComponentPagination
                        bind:allComponents
                        bind:ownedComponents
                        {data}
                        componentData={data.allOwnedComponents}
                        type={'owned'}
                    />

                    <section class="grid grid-cols-2 place-items-center gap-3">
                        {#each ownedComponents.data as component, index (component)}
                            <ComponentCard
                                componentInfo={component}
                                type="component"
                                canvas={fabric}
                                data={data.project}
                                user={data.user}
                            />
                        {/each}
                    </section>
                </main>
            {/if}
            {#if activeButton == 'store'}
                <main class="flex flex-col justify-center items-center">
                    <ComponentPagination
                        bind:allComponents
                        bind:ownedComponents
                        {data}
                        componentData={data.component}
                        type={'store'}
                    />

                    <section class="grid grid-cols-2 place-items-center gap-3">
                        {#each allComponents.data as component, index (component)}
                            <ComponentCard
                                componentInfo={component}
                                type="store"
                                canvas={fabric}
                                data={data.project}
                                user={data.user}
                            />
                        {/each}
                    </section>
                </main>
            {/if}
        </main>
    </aside>

    <main class={`${isAllowed ? 'w-full xl:w-3/4 2xl:w-4/5' : 'w-full'}`}>
        <ObjectMenu canvas={fabric} />
        <ObjectInfo canvas={fabric} />
        <RightMenu
            bind:modalOpen
            canvas={fabric}
            data={data.project}
            {isAllowed}
            user={data.user}
        />
        <ProjectTab
            bind:mode
            canvas={fabric}
            width={quadSize.w}
            height={quadSize.h}
            cursors={[rect, circle]}
            data={data.project}
            {isAllowed}
        />
        <canvas bind:this={canvas} />
    </main>
</main>

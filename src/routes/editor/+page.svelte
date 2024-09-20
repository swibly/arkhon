<script lang="ts" type="module">
    import Icon from '@iconify/svelte';
    import { toggle } from '$lib/stores/theme';
    import Component from '$lib/components/Component.svelte';
    import Pagination from '$lib/components/Pagination.svelte';
    import { writable } from 'svelte/store';
    import { onMount } from 'svelte';
    import { Canvas, Rect, Point, Line, Group, PencilBrush } from 'fabric';

    let activeButton: String = 'project';

    function setActiveButton(value: String) {
        activeButton = value;
    }

    let components = [...Array(120)].map((_, i) => {
        return { Name: `${i + 1}` };
    });

    let categories = [...Array(80)].map((_, i) => {
        return { Name: `${i + 1}` };
    });

    let currentPageStore = writable(1);

    function start(currentPage: number): number {
        return (currentPage - 1) * 8;
    }

    function end(currentPage: number): number {
        return start(currentPage) + 8;
    }

    let canvas: HTMLCanvasElement;
    let fabric: Canvas;
    let pointerX: number;
    let pointerY: number;
    let lastPointerX: number;
    let lastPointerY: number;
    let selectedObjects: any = [];
    let rightMenu: HTMLElement;
    let buttonInside: boolean;
    let keysPressed: Record<string, boolean> = {};

    const quadSize = {
        w: 10000,
        h: 10000
    };

    onMount(function () {
        fabric = new Canvas(canvas, { selection: true });

        fabric.freeDrawingBrush = new PencilBrush(fabric);

        fabric.freeDrawingBrush.color = 'red';
        fabric.freeDrawingBrush.width = 12;

        drawGrid();
        resize();
        centerView();

        fabric.add(
            new Rect({
                width: quadSize.w,
                height: quadSize.h,
                fill: null,
                stroke: '#A3A3A3',
                strokeWidth: 2,
                strokeUniform: true,
                hasControls: false,
                selectable: false,
                lockMovementX: true,
                lockMovementY: true,
                lockRotation: true,
                lockScalingX: true,
                lockScalingY: true,
                lockSkewingX: true,
                lockSkewingY: true
            })
        );

        fabric.on('mouse:down', function (this: any, { e }) {
            if (e.altKey) {
                lastPointerX = fabric.getViewportPoint(e).x;
                lastPointerY = fabric.getViewportPoint(e).y;

                this.isDragging = true;
                this.selection = false;
            }
        });

        fabric.on('mouse:move', function (this: any, { e }) {
            if (this.isDragging) {
                let vpt = this.viewportTransform;

                vpt[4] += fabric.getViewportPoint(e).x - lastPointerX;
                vpt[5] += fabric.getViewportPoint(e).y - lastPointerY;

                this.requestRenderAll();

                lastPointerX = fabric.getViewportPoint(e).x;
                lastPointerY = fabric.getViewportPoint(e).y;
            }
        });

        fabric.on('mouse:up', function (this: any) {
            this.setViewportTransform(this.viewportTransform);
            this.isDragging = false;
            this.selection = true;
        });

        fabric.on('mouse:wheel', function ({ e }) {
            const panX = e.deltaX * 0.5;
            const panY = e.deltaY * 0.5;

            if (e.ctrlKey) {
                const maximum = 0.45;
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

        fabric.on('object:scaling', function ({ e, target }) {
            e.preventDefault();

            if (e.ctrlKey) {
                target.scaleX = Math.round(target.scaleX / 0.5) * 0.5;
                target.scaleY = Math.round(target.scaleY / 0.5) * 0.5;
            }
        });

        fabric.on('dragover', function ({ e }) {
            pointerX = fabric.getScenePoint(e).x;
            pointerY = fabric.getScenePoint(e).y;
        });

        fabric.on('dragleave', function ({ e }) {
            fabric.add(
                new Rect({
                    width: 100,
                    height: 100,
                    top: pointerY - 50,
                    left: pointerX - 50,
                    fill: null,
                    stroke: 'yellow',
                    strokeWidth: 3,
                    strokeUniform: true,
                    lockSkewingX: true,
                    lockSkewingY: true
                })
            );
        });

        fabric.on('selection:created', function (options) {
            selectedObjects = options.selected;
        });

        fabric.on('selection:cleared', function () {
            selectedObjects = [];
        });

        addEventListener('contextmenu', (e) => {
            e.preventDefault();
            rightMenu.style.display = 'block';
            rightMenu.style.left = e.pageX + 'px';
            rightMenu.style.top = e.pageY + 'px';
        });

        addEventListener('mousedown', (e) => {
            let leftButton = e.which;

            if (leftButton == 1) {
                if (buttonInside) {
                    rightMenu.style.display = 'block';
                    buttonInside = false;
                } else {
                    rightMenu.style.display = 'none';
                    buttonInside = false;
                }
            }
        });

        addEventListener('keydown', (e) => {
            keysPressed[e.key] = true;

            if (keysPressed['Control'] && e.key == 'x') {
                deleteObject();
            }
        });

        rightMenu.addEventListener('mousedown', () => {
            buttonInside = true;
        });
    });

    function addRect() {
        fabric.add(
            new Rect({
                width: 100,
                height: 100,
                top: quadSize.h / 2 - 50,
                left: quadSize.w / 2 - 50,
                fill: null,
                stroke: 'yellow',
                strokeWidth: 3,
                strokeUniform: true,
                lockSkewingX: true,
                lockSkewingY: true
            })
        );
    }

    function deleteObject() {
        let activeObject = fabric.getActiveObject();
        let activeGroup = fabric.getActiveObjects();

        if (activeObject) {
            fabric.remove(activeObject);
        }

        if (activeGroup) {
            fabric.discardActiveObject();
            fabric.renderAll();
            activeGroup.forEach((obj: any) => {
                fabric.remove(obj);
            });
        }
    }

    function group() {
        let group = new Group(selectedObjects);
        fabric.add(group);
        fabric.discardActiveObject();
        selectedObjects = [];
    }

    function lock() {
        selectedObjects.forEach((obj: any) => {
            obj.lockMovementX = true;
            obj.lockMovementY = true;
            obj.lockScalingX = true;
            obj.lockScalingY = true;
            obj.lockRotation = true;
        });

        fabric.renderAll();
    }

    function unlock() {
        selectedObjects.forEach((obj: any) => {
            obj.lockMovementX = false;
            obj.lockMovementY = false;
            obj.lockScalingX = false;
            obj.lockScalingY = false;
            obj.lockRotation = false;
        });

        fabric.renderAll();
    }

    function startDraw() {
        fabric.isDrawingMode = true;

        fabric.renderAll();
    }

    function stopDraw() {
        fabric.isDrawingMode = false;

        fabric.renderAll();
    }

    function centerView() {
        fabric.setZoom(1);

        fabric.absolutePan(
            new Point(-fabric.width / 2 + quadSize.w / 2, -fabric.height / 2 + quadSize.h / 2)
        );
    }

    function drawGrid() {
        const grid = 100;
        const canvasWidth = quadSize.w;
        const canvasHeight = quadSize.h;

        for (var i = 0; i < canvasWidth / grid; i++) {
            fabric.add(
                new Line([i * grid, 0, i * grid, canvasHeight], {
                    type: 'line',
                    stroke: '#A3A3A3',
                    strokeWidth: 2,
                    selectable: false
                })
            );
        }

        for (var i = 0; i < canvasHeight / grid; i++) {
            fabric.add(
                new Line([0, i * grid, canvasWidth, i * grid], {
                    type: 'line',
                    stroke: '#A3A3A3',
                    strokeWidth: 2,
                    selectable: false
                })
            );
        }
    }

    function resize() {
        fabric.setDimensions({ width: innerWidth, height: innerHeight });
    }
</script>

<main class="w-full min-h-screen">
    <nav class="w-full bg-base-300 flex items-center justify-between shadow-lg">
        <div class="flex ml-4">
            <div class="dropdown">
                <div tabindex="0" role="button" class="btn bg-base-300 border-0 pt-1">
                    <Icon icon="fe:bar" font-size="42px" />
                </div>
                <ul class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                    <li><a href="/home/">Voltar para o início</a></li>
                </ul>
            </div>
            <div class="flex gap-4">
                <button on:click={stopDraw}
                    ><Icon icon="fluent:cursor-16-filled" font-size="35px" /></button
                >
                <button on:click={stopDraw}
                    ><Icon icon="fluent:square-hint-16-filled" font-size="35px" /></button
                >
                <button on:click={startDraw}><Icon icon="ri:brush-fill" font-size="35px" /></button>
                <button><Icon icon="solar:text-bold" font-size="35px" /></button>
            </div>
        </div>
        <h1 class="text-2xl font-bold">Título</h1>
        <div class="flex items-center gap-4 mr-4">
            <Icon icon="ph:play-fill" font-size="25px" />
            <button on:click={centerView}
                ><Icon icon="mingcute:align-center-fill" font-size="25px" /></button
            >
        </div>
    </nav>
    <main class="flex h-[calc(100vh-4rem)]">
        <aside class="w-1/5 h-full bg-base-200 overflow-y-hidden scrollbar-thin">
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
                    <details class="dropdown w-full mt-4">
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

        <main class="w-5/6">
            <label class="swap swap-rotate pl-4 pt-4 absolute z-10">
                <input type="checkbox" class="theme-controller" on:click={toggle} />

                <Icon icon="ph:moon" class="swap-on size-8" />
                <Icon icon="ph:sun" class="swap-off size-8" />
            </label>

            <div
                bind:this={rightMenu}
                class="absolute hidden bg-base-300 shadow-md rounded-lg w-48 mt-2 z-10"
            >
                <ul role="menu" aria-labelledby="menu-button" class="menu vertical div space-y-2">
                    <li on:click={addRect}>
                        <a href="#" class="hover:bg-secondary block px-4 py-2 text-sm"
                            >Adicionar Quadrado</a
                        >
                    </li>
                    <li on:click={deleteObject}>
                        <a href="#" class="hover:bg-secondary block px-4 py-2 text-sm">Deletar</a>
                    </li>
                    <li on:click={group}>
                        <a href="#" class="hover:bg-secondary block px-4 py-2 text-sm">Agrupar</a>
                    </li>
                    <li on:click={lock}>
                        <a href="#" class="hover:bg-secondary block px-4 py-2 text-sm">Travar</a>
                    </li>
                    <li on:click={unlock}>
                        <a href="#" class="hover:bg-secondary block px-4 py-2 text-sm">Destravar</a>
                    </li>
                    <li on:click={startDraw}>
                        <a href="#" class="hover:bg-secondary block px-4 py-2 text-sm">Desenhar</a>
                    </li>
                    <li on:click={stopDraw}>
                        <a href="#" class="hover:bg-secondary block px-4 py-2 text-sm"
                            >Parar de Desenhar</a
                        >
                    </li>
                </ul>
            </div>

            <canvas bind:this={canvas} />
        </main>
    </main>
</main>

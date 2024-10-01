<script lang="ts" type="module">
    import Icon from '@iconify/svelte';
    import { toggle } from '$lib/stores/theme';
    import Component from '$lib/components/Component.svelte';
    import Pagination from '$lib/components/Pagination.svelte';
    import { writable } from 'svelte/store';
    import { onMount } from 'svelte';
    import { lightMode } from '$lib/stores/theme';
    import { Canvas, Rect, Point, Group, PencilBrush, ActiveSelection, IText, Path } from 'fabric';

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
    let selectedObjects: any = [];
    let rightMenu: HTMLElement;
    let buttonInside: boolean;
    let _clipboard: any;
    let mode: string = 'select';
    let objectMenu: HTMLElement;
    let type: string;
    let borderColor: string = 'none';

    const quadSize = {
        w: 10000,
        h: 10000
    };

    onMount(function () {
        fabric = new Canvas(canvas, {
            selection: true,
            preserveObjectStacking: true
        });

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
            if (e.type === 'mousedown' && e.altKey === true) {
                this.lastPosX = fabric.getViewportPoint(e).x;
                this.lastPosY = fabric.getViewportPoint(e).y;

                this.isDragging = true;
                this.selection = false;
            }
            if (e.type === 'touchstart' && e.touches && e.touches.length === 1) {
                this.lastPosX = e.touches[0].clientX;
                this.lastPosY = e.touches[0].clientY;

                this.isDragging = true;
                this.selection = false;
            }
        });

        fabric.on('mouse:move', function (this: any, { e }) {
            if (this.isDragging) {
                let vpt = this.viewportTransform;
                if (e.type === 'mousemove') {
                    vpt[4] += fabric.getViewportPoint(e).x - this.lastPosX;
                    vpt[5] += fabric.getViewportPoint(e).y - this.lastPosY;
                    this.requestRenderAll();
                    this.lastPosX = fabric.getViewportPoint(e).x;
                    this.lastPosY = fabric.getViewportPoint(e).y;
                }
                if (e.type === 'touchmove' && e.touches && e.touches.length) {
                    vpt[4] += e.touches[0].clientX - this.lastPosX;
                    vpt[5] += e.touches[0].clientY - this.lastPosY;
                    this.requestRenderAll();
                    this.lastPosX = e.touches[0].clientX;
                    this.lastPosY = e.touches[0].clientY;
                }
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

        fabric.on('dragover', function ({ e }) {
            pointerX = fabric.getScenePoint(e).x;
            pointerY = fabric.getScenePoint(e).y;
        });

        fabric.on('dragleave', function ({ e }) {
            const colors = ['yellow', 'blue', 'green', 'black', 'pink'];

            fabric.add(
                new Rect({
                    width: 100,
                    height: 100,
                    top: pointerY - 50,
                    left: pointerX - 50,
                    fill: colors[Math.floor(Math.random() * colors.length)],
                    strokeWidth: 3,
                    strokeUniform: true,
                    lockSkewingX: true,
                    lockSkewingY: true
                })
            );
        });

        fabric.on('selection:created', function (options) {
            selectedObjects = options.selected;

            if (selectedObjects.length === 1) {
                objectMenu.style.display = 'flex';
                type = selectedObjects[0].get('type');
            }
        });

        fabric.on('selection:cleared', function () {
            selectedObjects = [];

            objectMenu.style.display = 'none';
        });

        addEventListener('contextmenu', (e) => {
            e.preventDefault();

            rightMenu.style.display = 'block';
            rightMenu.style.left = e.pageX - 200 * ~~(e.pageX > window.innerWidth - 200) + 'px';
            rightMenu.style.top = e.pageY - 470 * ~~(e.pageY > window.innerHeight - 470) + 'px';
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

        rightMenu.addEventListener('mousedown', () => {
            buttonInside = true;
        });

        addEventListener('keydown', async (e) => {
            if (e.ctrlKey && e.key == 'x') {
                deleteObject();
            }

            if (e.ctrlKey && e.key == 'a') {
                e.preventDefault();

                fabric.discardActiveObject();
                var sel = new ActiveSelection(fabric.getObjects().slice(2), {
                    canvas: fabric
                });
                fabric.setActiveObject(sel);
                fabric.renderAll();
            }

            if (e.ctrlKey && e.key == 'c') {
                fabric
                    .getActiveObject()!
                    .clone()
                    .then((cloned) => {
                        _clipboard = cloned;
                    });
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

            if (e.ctrlKey && e.key == 'p') {
                e.preventDefault();
                fabric.isDrawingMode = !fabric.isDrawingMode;
            }
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
                stroke: 'blue',
                strokeWidth: 3,
                strokeUniform: true,
                lockSkewingX: true,
                lockSkewingY: true
            })
        );
    }

    function deleteObject() {
        selectedObjects.forEach((obj: any) => {
            fabric.remove(obj);
            fabric.discardActiveObject();
        });
    }

    function group() {
        let group = new Group(selectedObjects);
        fabric.add(group);
        fabric.discardActiveObject();
        selectedObjects = [];
    }

    // function group() {
    //   var activegroup = fabric.canvas.getActiveObject();
    //   var objectsInGroup = activegroup.getObjects();

    //   activegroup.clone(function (newgroup: any) {
    //     fabric.discardActiveGroup();
    //     objectsInGroup.forEach(function (object: any) {
    //       fabric.remove(object);
    //     });
    //     fabric.add(newgroup);
    //   });
    // }

    function ungroup() {
        // selectedObjects.forEach(async (obj: any) => {
        //   let cloneObj = await obj.clone();
        //   obj._objects.forEach((soloObj: any) => {
        //     fabric.remove(soloObj);
        //     fabric.renderAll();
        //   });
        //   fabric.remove(obj);
        //   cloneObj._objects.forEach((newObj: any) => {
        //     fabric.add(newObj);
        //     fabric.renderAll();
        //   });
        // });
        // selectedObjects.forEach(async (obj: any) => {
        //   let cloneObj = await obj.clone();
        //   obj._objects.forEach((soloObj: any) => {
        //     fabric.remove(soloObj);
        //     fabric.renderAll();
        //   });
        //   fabric.remove(obj);
        //   fabric.renderAll();
        //   cloneObj._objects.forEach((soloObj: any) => {
        //     fabric.add(soloObj);
        //     fabric.setActiveObject(soloObj);
        //     fabric.renderAll();
        //   });
        //   // console.log(cloneObj);
        // });
        // selectedObjects = [];
        // // console.log(selectedObjects);
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
            new Point(-fabric.width / 2 + quadSize.w / 2 + 200, -fabric.height / 2 + quadSize.h / 2)
        );
    }

    function sendBackward() {
        selectedObjects.forEach((obj: any) => {
            if (fabric.getObjects().indexOf(obj) > 2) {
                fabric.sendObjectBackwards(obj);
            } else {
                fabric.moveObjectTo(obj, 2);
            }
        });

        fabric.renderAll();
    }

    function sendToBack() {
        selectedObjects.forEach((obj: any) => {
            fabric.moveObjectTo(obj, 2);
        });

        fabric.renderAll();
    }

    function sendForward() {
        selectedObjects.forEach((obj: any) => {
            fabric.bringObjectForward(obj);
            obj.set();
        });

        fabric.renderAll();
    }

    function sendToFront() {
        selectedObjects.forEach((obj: any) => {
            fabric.bringObjectToFront(obj);
        });

        fabric.renderAll();
    }

    function drawGrid() {
        const grid = 100;
        const canvasWidth = Math.round(quadSize.w);
        const canvasHeight = Math.round(quadSize.h);

        const gridPath = [];

        for (let i = 0; i <= canvasWidth / grid; i++) {
            const x = Math.round(i * grid);
            gridPath.push(`M ${x} 0 L ${x} ${canvasHeight}`);
        }

        for (let i = 0; i <= canvasHeight / grid; i++) {
            const y = Math.round(i * grid);
            gridPath.push(`M 0 ${y} L ${canvasWidth} ${y}`);
        }

        const path = new Path(gridPath.join(' '), {
            fill: '',
            stroke: '#A3A3A3',
            strokeWidth: 2,
            strokeUniform: true,
            selectable: false,
            evented: false,
            objectCaching: false
        });

        fabric.add(path);
        path.setCoords();
    }

    function resize() {
        fabric.setDimensions({
            width: innerWidth - innerWidth / 6,
            height: innerHeight - (innerHeight / 100) * 5.5
        });
    }

    function addText() {
        let text = new IText('Toque para digitar', {
            width: 300,
            top: quadSize.h / 2 - 25,
            left: quadSize.w / 2 - 165,
            fill: '',
            stroke: '#A3A3A3',
            strokeWidth: 2,
            strokeUniform: true,
            fontFamily: 'sans-serif'
        });
        fabric.add(text);
    }

    function changeBorder(color: string) {
        borderColor = color;
        fabric.getActiveObject()?.set('stroke', color);
        fabric.renderAll();
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
                <button
                    on:click={stopDraw}
                    on:click={() => {
                        mode = 'select';
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
                    on:click={startDraw}
                    on:click={() => {
                        mode = 'paint';
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
                    on:click={addText}
                    on:click={() => {
                        mode = 'text';
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
            </div>
        </div>
        <h1 class="text-2xl font-bold">Título</h1>
        <div class="flex items-center gap-4 mr-4">
            <Icon icon="ph:play-fill" font-size="25px" />
            <button on:click={centerView}
                ><Icon icon="mingcute:align-center-fill" font-size="25px" /></button
            >

            <label class="swap swap-rotate">
                <input type="checkbox" class="theme-controller" on:click={toggle} />

                <Icon icon="ph:moon" class="swap-on" font-size="25px" />
                <Icon icon="ph:sun" class="swap-off" font-size="25px" />
            </label>
        </div>
    </nav>
    <main class="flex h-[calc(100vh-5.5vh)]">
        <aside class="w-1/6 h-full bg-base-200 overflow-y-hidden scrollbar-thin">
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
            <article
                class="absolute hidden mt-12 ml-12 w-72 h-72 bg-base-300 z-50 flex-col items-center rounded-xl"
                bind:this={objectMenu}
            >
                {#if type === 'rect'}
                    <p class="text-center text-xl pt-4 font-bold">Borda</p>
                    <section class="w-full h-12 flex justify-center items-center gap-2 pt-2">
                        <button
                            class="w-4 h-4 font-bold -mt-1"
                            on:click={() => changeBorder('none')}>X</button
                        >
                        <button
                            class="w-4 h-4 bg-white rounded"
                            on:click={() => changeBorder('white')}
                        />
                        <button
                            class="w-4 h-4 bg-black rounded"
                            on:click={() => changeBorder('black')}
                        />
                        <button
                            class="w-4 h-4 bg-red-500 rounded"
                            on:click={() => changeBorder('red')}
                        />
                        <button
                            class="w-4 h-4 bg-green-500 rounded"
                            on:click={() => changeBorder('green')}
                        />
                        <button
                            class="w-4 h-4 bg-blue-500 rounded"
                            on:click={() => changeBorder('blue')}
                        />
                        <button
                            class="w-4 h-4 bg-pink-500 rounded"
                            on:click={() => changeBorder('pink')}
                        />
                        <div class="divider divider-horizontal h-4" />
                        {#if borderColor === 'none'}
                            <button
                                class="w-4 h-4 font-bold -mt-1"
                                on:click={() => changeBorder('none')}>X</button
                            >
                        {:else}
                            <button
                                class={`w-4 h-4 ${
                                    borderColor === 'white' || borderColor === 'black'
                                        ? `bg-${borderColor}`
                                        : `bg-${borderColor}-500`
                                } rounded`}
                            />
                        {/if}
                    </section>
                    <div class="divider" />
                    <p class="text-center text-xl font-bold">Fundo</p>
                    <section class="flex gap-4 pt-2">
                        <button class="w-4 h-4 bg-white rounded border border-2" />
                        <button class="w-4 h-4 bg-black rounded" />
                        <button class="w-4 h-4 bg-red-500 rounded" />
                        <button class="w-4 h-4 bg-green-500 rounded" />
                        <button class="w-4 h-4 bg-blue-500 rounded" />
                        <button class="w-4 h-4 bg-pink-500 rounded" />
                    </section>
                {/if}
            </article>

            <article
                bind:this={rightMenu}
                class="absolute hidden bg-base-300 shadow-md rounded-lg w-48 mt-2 z-50"
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
                    <li on:click={sendBackward}>
                        <a href="#" class="hover:bg-secondary block px-4 py-2 text-sm"
                            >Mandar para trás</a
                        >
                    </li>
                    <li on:click={sendToBack}>
                        <a href="#" class="hover:bg-secondary block px-4 py-2 text-sm"
                            >Mandar para o fundo</a
                        >
                    </li>
                    <li on:click={sendForward}>
                        <a href="#" class="hover:bg-secondary block px-4 py-2 text-sm"
                            >Mandar para frente</a
                        >
                    </li>
                    <li on:click={sendToFront}>
                        <a href="#" class="hover:bg-secondary block px-4 py-2 text-sm"
                            >Mandar para a frente de todos</a
                        >
                    </li>
                </ul>
            </article>

            <canvas bind:this={canvas} />
        </main>
    </main>
</main>

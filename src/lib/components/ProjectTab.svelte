<script lang="ts" type="module">
    import Icon from '@iconify/svelte';
    import { type Canvas, type FabricObject } from 'fabric';
    import { centerView, startDraw, stopDraw, toJPEG, toPNG, toSVG } from '$lib/editor/canvas';
    import {
        stopLine,
        resetOpacity,
        verifyObject,
        addRect,
        addCircle,
        addText
    } from '$lib/editor/objects';
    import { enhance } from '$app/forms';
    import type { Project } from '$lib/projects';
    import { spawn } from '$lib/toast';
    import { onMount, tick } from 'svelte';
    import { canvasCalculation } from '$lib/editor/calculation';

    export let canvas: Canvas;
    export let width: number;
    export let height: number;
    export let cursors: Array<FabricObject>;
    export let mode: string;
    export let data: Project;
    export let isAllowed: boolean;
    export let rect: FabricObject;
    export let circle: FabricObject;

    let loading: boolean = false;
    let isAutoSave: boolean;

    let modalRef: HTMLDialogElement;
    let saveModalRef: HTMLDialogElement;
    let buttonCalculation: HTMLElement;
    let saveButton: HTMLButtonElement;

    let isDragging: boolean;
    let rectButton: HTMLElement;
    let circleButton: HTMLElement;
    let textButton: HTMLElement;

    let pointerX: number;
    let pointerY: number;

    let results: object;
    let displayComponents: Array<FabricObject>;
    let limitBudget: number;
    let projectBudget: number;

    let quadSize = {
        w: width,
        h: height
    };

    onMount(async () => {
        await tick();
        if (canvas) {
            setInterval(autoSave, 10000);

            canvas.on('mouse:move', ({ e }) => {
                if (isDragging) {
                    pointerX = canvas.getScenePoint(e).x;
                    pointerY = canvas.getScenePoint(e).y;
                }
            });

            rectButton.addEventListener('mousedown', () => {
                resetOpacity(canvas, circle);

                isDragging = true;
                mode = 'rect';
            });

            circleButton.addEventListener('mousedown', () => {
                resetOpacity(canvas, rect);

                isDragging = true;
                mode = 'circle';
            });

            textButton.addEventListener('mousedown', () => {
                resetOpacity(canvas, rect);
                resetOpacity(canvas, circle);

                isDragging = true;
                mode = 'text';
            });

            addEventListener('mouseup', () => {
                if (mode === 'rect' && isDragging) {
                    addRect(canvas, [{ x: pointerX, y: pointerY }]);
                }

                if (mode === 'circle' && isDragging) {
                    addCircle(canvas, [{ x: pointerX, y: pointerY }]);
                }

                if (mode === 'text' && isDragging) {
                    addText(canvas, [{ x: pointerX, y: pointerY }], '');
                    mode = 'select';
                }

                isDragging = false;
            });

            addEventListener('keydown', (e) => {
                if (e.ctrlKey && e.key == 's') {
                    e.preventDefault();
                    saveButton.click();
                }
            });

            buttonCalculation.addEventListener('mousedown', () => {
                results = canvasCalculation(canvas);
                displayComponents = [];

                //@ts-ignore
                projectBudget = results.budget;
                limitBudget = data.budget;

                for (const item of verifyObject(results).components) {
                    if (verifyObject(results).duplicatedComponents[item.id] > 1) {
                        for (const trueItems of displayComponents) {
                            // @ts-ignore
                            if (trueItems.id === item.id) {
                                displayComponents.splice(
                                    displayComponents.indexOf(trueItems),
                                    displayComponents.indexOf(trueItems)
                                );
                            }

                            displayComponents.push(item);
                        }
                    } else {
                        displayComponents.push(item);
                    }
                }
            });
        }
    });

    function autoSave() {
        saveButton.click();

        isAutoSave = true;
    }

    function calculation() {
        modalRef.showModal();
    }

    function openSaveModal() {
        saveModalRef.showModal();
    }

    function saveProject(canvas: Canvas, type: string) {
        if (type === 'png') {
            toPNG(
                canvas,
                quadSize.w,
                quadSize.h,
                canvas.viewportTransform.slice()[4],
                canvas.viewportTransform.slice()[5]
            );

            spawn({ message: 'Canvas baixado.' });
        }

        if (type === 'jpeg') {
            toJPEG(
                canvas,
                quadSize.w,
                quadSize.h,
                canvas.viewportTransform.slice()[4],
                canvas.viewportTransform.slice()[5]
            );

            spawn({ message: 'Canvas baixado.' });
        }

        if (type === 'svg') {
            toSVG(canvas);

            spawn({ message: 'SVG copiado para área de transferência.' });
        }

        saveModalRef.close();
    }
</script>

<main
    class={`flex absolute z-30 w-60 sm:w-1/3 h-8 bg-secondary ${
        isAllowed ? 'flex items-center justify-between' : 'grid place-items-center'
    } mt-4 shadow-lg rounded-lg left-0 right-0 mx-auto gap-8`}
>
    <div class={`${isAllowed ? 'hidden xl:flex' : 'hidden'} ml-4 gap-4`}>
        <button
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
            on:click={() => stopDraw(canvas)}
            on:click={() => stopLine(canvas)}
            on:click={() => {
                mode = 'text';

                resetOpacity(canvas, cursors[0]);
                resetOpacity(canvas, cursors[1]);
            }}
            bind:this={textButton}
            ><Icon
                icon="solar:text-bold"
                font-size="20px"
                class={`${mode === 'text' ? 'text-primary' : 'text-white'}`}
            /></button
        >
        <button
            on:click={() => stopDraw(canvas)}
            on:click={() => stopLine(canvas)}
            on:click={() => {
                mode = 'rect';

                resetOpacity(canvas, cursors[1]);
            }}
            bind:this={rectButton}
            ><Icon
                icon="bi:square-fill"
                font-size="20px"
                class={`${mode === 'rect' ? 'text-primary' : 'text-white'}`}
            /></button
        >
        <button
            on:click={() => stopDraw(canvas)}
            on:click={() => stopLine(canvas)}
            on:click={() => {
                mode = 'circle';

                resetOpacity(canvas, cursors[0]);
            }}
            bind:this={circleButton}
            ><Icon
                icon="material-symbols:circle"
                font-size="20px"
                class={`${mode === 'circle' ? 'text-primary' : 'text-white'}`}
            /></button
        >
        <button
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
        class="w-40 sm:w-36 md:w-48 lg:w-full text-md sm:text-lg text-center mx-auto xl:mx-auto text-white font-semibold overflow-hidden text-ellipsis whitespace-nowrap"
    >
        {data.name}
    </h1>
    <div class={`${isAllowed ? 'hidden xl:flex' : 'hidden'} dropdown`}>
        <div tabindex="0" role="button" class="btn btn-secondary btn-sm">
            <Icon icon="icon-park-outline:more" font-size="18px" class="text-white" />
        </div>
        <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
        <ul
            tabindex="0"
            class="dropdown-content bg-secondary z-[1] w-20 p-2 shadow flex flex-col justify-center items-center"
        >
            <li>
                <button on:click={() => calculation()} bind:this={buttonCalculation}
                    ><Icon icon="ph:play-fill" font-size="20px" class="text-white" /></button
                >
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
                    class="p-0 w-full flex justify-center items-center"
                    use:enhance={function ({ formData }) {
                        loading = true;

                        formData.set(
                            'json',
                            JSON.stringify(
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
                            )
                        );

                        return () => {
                            loading = false;

                            if (!isAutoSave) {
                                spawn({ message: 'Salvo com sucesso' });
                            }

                            isAutoSave = false;
                        };
                    }}
                >
                    {#if loading}
                        <span class="loading loading-spinner loading-sm text-white text-center" />
                    {:else}
                        <button type="submit" class="w-full" bind:this={saveButton}>
                            <Icon icon="material-symbols:save" class="size-5 mx-auto text-white" />
                        </button>
                    {/if}
                </form>
            </li>
            <li>
                <button on:click={() => openSaveModal()}>
                    <Icon icon="material-symbols:download" font-size="20px" class="text-white" />
                </button>
            </li>
        </ul>
    </div>
</main>

<dialog id="my_modal_3" class="modal" bind:this={modalRef}>
    <div class="modal-box w-full max-w-2xl grid place-items-center overflow-auto">
        <form method="dialog">
            <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
        </form>

        <main class="w-full flex flex-col justify-center items-center">
            <h1 class="text-center text-xl font-semibold">Cálculo do Orçamento da Planta</h1>
            <div class="divider w-11/12 mx-auto" />
            <h2 class="text-center text-md font-semibold">Componentes</h2>
            <div class="w-full max-w-lg overflow-x-auto mt-4">
                <table class="table table-zebra w-full">
                    <thead>
                        <tr>
                            <th />
                            <th class="text-center">Nome</th>
                            <th class="text-center">Preço</th>
                            <th class="text-center">Quantidade</th>
                            <th class="text-center">Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {#if results && displayComponents.length > 0}
                            {#each displayComponents as component, index (component)}
                                <tr>
                                    <th class="text-center">{index + 1}</th>
                                    <td class="text-center">{verifyObject(component).name}</td>
                                    <td class="text-center">{verifyObject(component).price}</td>
                                    <td class="text-center"
                                        >{verifyObject(results).duplicatedComponents[
                                            verifyObject(component).id
                                        ]}</td
                                    >
                                    <td class="text-center"
                                        >{verifyObject(component).price *
                                            verifyObject(results).duplicatedComponents[
                                                verifyObject(component).id
                                            ]}</td
                                    >
                                </tr>
                            {/each}
                        {:else}
                            <tr>
                                <td colspan="5" class="text-center font-semibold"
                                    >Nenhum componente foi registrado na planta</td
                                >
                            </tr>
                        {/if}
                    </tbody>
                </table>
            </div>
            <div class="divider w-11/12 mx-auto" />
            <h2 class="text-center text-md font-semibold">Estruturas da planta</h2>
            <div class="w-full max-w-lg overflow-x-auto mt-4">
                <table class="table table-zebra w-full">
                    <thead>
                        <tr>
                            <th />
                            <th class="text-center">Tipo</th>
                            <th class="text-center">Material</th>
                            <th class="text-center">Preço</th>
                            <th class="text-center">Tamanho (largura x altura)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {#if results && verifyObject(results).objects.length > 0}
                            {#each verifyObject(results).objects as object, index (object)}
                                <tr>
                                    <th class="text-center">{index + 1}</th>
                                    <td class="text-center"
                                        >{object.structureType.charAt(0).toUpperCase() +
                                            object.structureType.slice(1)}</td
                                    >
                                    <td class="text-center"
                                        >{object.material.charAt(0).toUpperCase() +
                                            object.material.slice(1)}</td
                                    >
                                    <td class="text-center"
                                        >R${verifyObject(results).objectsValues[index].toFixed(
                                            2
                                        )}</td
                                    >
                                    <td class="text-center"
                                        >{((object.width * object.scaleX.toFixed(2)) / 100).toFixed(
                                            2
                                        )}m x {(
                                            (object.height * object.scaleY.toFixed(2)) /
                                            100
                                        ).toFixed(2)}m</td
                                    >
                                </tr>
                            {/each}
                        {:else}
                            <tr>
                                <td colspan="5" class="text-center font-semibold"
                                    >Nenhuma estrutura foi registrada na planta</td
                                >
                            </tr>
                        {/if}
                    </tbody>
                </table>
            </div>
            <div class="divider w-11/12 mx-auto" />
            <section
                class="w-11/12 bg-secondary h-8 rounded-lg flex flex-col justify-center item-center"
            >
                {#if results}
                    <h1 class="text-center text-white font-semibold">
                        O valor total estimado de sua planta é de aproximadamente: R${Math.ceil(
                            verifyObject(results).budget.toFixed(2)
                        )}
                    </h1>
                {/if}
            </section>

            {#if projectBudget > limitBudget}
                <section
                    class="w-11/12 bg-error h-8 rounded-lg flex flex-col justify-center item-center mt-4"
                >
                    <h1 class="text-center text-white font-semibold">
                        O valor da sua planta ultrapassou o orçamento proposto em R${(projectBudget -
                            limitBudget).toFixed(2)}
                    </h1>
                </section>
            {/if}
        </main>
    </div>
</dialog>

<dialog id="my_modal_3" class="modal" bind:this={saveModalRef}>
    <div class="modal-box w-full max-w-2xl grid place-items-center overflow-auto">
        <form method="dialog">
            <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
        </form>

        <section class="w-full flex flex-col justify-center items-center">
            <h1 class="text-center font-semibold text-xl">Salvar como...</h1>
            <div class="divider w-11/12 mx-auto" />
            <section class="grid grid-cols-3 place-items-center gap-8">
                <article class="flex flex-col justify-center items-center gap-y-4">
                    <div class="bg-secondary w-24 h-24 grid place-items-center rounded-full">
                        <Icon icon="teenyicons:jpg-solid" class="text-6xl text-white" />
                    </div>
                    <button
                        class="w-40 btn btn-secondary btn-sm text-center text-white font-semibold text-md rounded-lg"
                        on:click={() => saveProject(canvas, 'jpeg')}>Exportar para JPEG</button
                    >
                </article>
                <article class="flex flex-col justify-center items-center gap-y-4">
                    <div class="bg-secondary w-24 h-24 grid place-items-center rounded-full">
                        <Icon icon="teenyicons:png-solid" class="text-6xl text-white" />
                    </div>
                    <button
                        class="w-40 btn btn-secondary btn-sm text-center text-white font-semibold text-md rounded-lg"
                        on:click={() => saveProject(canvas, 'png')}>Exportar para PNG</button
                    >
                </article>
                <article class="flex flex-col justify-center items-center gap-y-4">
                    <div class="bg-secondary w-24 h-24 grid place-items-center rounded-full">
                        <Icon icon="teenyicons:svg-solid" class="text-6xl text-white" />
                    </div>
                    <button
                        class="w-40 btn btn-secondary btn-sm text-center text-white font-semibold text-md rounded-lg"
                        on:click={() => saveProject(canvas, 'svg')}>Exportar para SVG</button
                    >
                </article>
            </section>
        </section>
    </div>
</dialog>

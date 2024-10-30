<script lang="ts" type="module">
    import { Rect, Circle, Polygon, Group, type Canvas, type FabricObject } from 'fabric';
    import { onMount } from 'svelte';
    import Icon from '@iconify/svelte';
    import type { Project } from '$lib/projects';
    import type { Component } from '$lib/component';
    import { enhance } from '$app/forms';
    import { spawn } from '$lib/toast';
    import { getActive, setInfo } from '$lib/editor/objects';

    export let componentInfo: Component;
    export let type: string;
    export let canvas: Canvas;
    export let data: Project;

    let svg: string;
    let svgRef: HTMLElement;
    let svgPortrait: HTMLElement;
    let modalRef: HTMLDialogElement;
    let componentCard: HTMLElement;
    let component: FabricObject;
    let isSelected: boolean = false;

    onMount(() => {
        componentCard.addEventListener('mousedown', () => {
            isSelected = true;
            canvas.on('mouse:down', ({ e }) => {
                if (getActive(canvas).length > 0) {
                    isSelected = false;
                }

                if (isSelected) {
                    if (JSON.parse(componentInfo.content).type === 'Rect') {
                        component = new Rect(JSON.parse(componentInfo.content));
                        component.set({
                            left: canvas.getScenePoint(e).x,
                            top: canvas.getScenePoint(e).y
                        });

                        setInfo(component, componentInfo.name, componentInfo.budget, componentInfo.id, componentInfo.description, componentInfo.price, true);

                        canvas.add(component);
                        canvas.discardActiveObject();
                        canvas.requestRenderAll();

                        isSelected = false;
                    }

                    if (JSON.parse(componentInfo.content).type === 'Circle') {
                        let component = new Circle(JSON.parse(componentInfo.content));
                        component.set({
                            left: canvas.getScenePoint(e).x,
                            top: canvas.getScenePoint(e).y
                        });

                        setInfo(component, componentInfo.name, componentInfo.budget, componentInfo.id, componentInfo.description, componentInfo.price, true);

                        canvas.add(component);
                        canvas.discardActiveObject();
                        canvas.requestRenderAll();

                        isSelected = false;
                    }

                    if (JSON.parse(componentInfo.content).type === 'Polygon') {
                        let component = new Polygon(
                            JSON.parse(componentInfo.content).points,
                            JSON.parse(componentInfo.content)
                        );
                        component.set({
                            left: canvas.getScenePoint(e).x,
                            top: canvas.getScenePoint(e).y
                        });

                        setInfo(component, componentInfo.name, componentInfo.budget, componentInfo.id, componentInfo.description, componentInfo.price, true);

                        canvas.add(component);
                        canvas.discardActiveObject();
                        canvas.requestRenderAll();

                        isSelected = false;
                    }

                    if (JSON.parse(componentInfo.content).type === 'Group') {
                        let allObjs = [];

                        for (const obj of JSON.parse(componentInfo.content).objects) {
                            if (obj.type === 'Rect') {
                                allObjs.push(new Rect(obj));
                            }

                            if (obj.type === 'Circle') {
                                allObjs.push(new Circle(obj));
                            }

                            if (obj.type === 'Polygon') {
                                allObjs.push(new Polygon(obj.points, obj));
                            }
                        }

                        let component = new Group(allObjs);
                        component.set({
                            left: canvas.getScenePoint(e).x,
                            top: canvas.getScenePoint(e).y
                        });

                        setInfo(component, componentInfo.name, componentInfo.budget, componentInfo.id, componentInfo.description, componentInfo.price, true);

                        canvas.add(component);
                        canvas.discardActiveObject();
                        canvas.requestRenderAll();

                        isSelected = false;
                    }
                }
            });
        });

        if (JSON.parse(componentInfo.content).type === 'Rect') {
            let component = new Rect(JSON.parse(componentInfo.content));
            component.set({
                left: 0,
                top: 0
            });

            svg = component.toSVG();

            svgRef.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="1000" height="1000" viewBox="0 0 5000 5000">${svg}</svg>`;

            component.set({
                left: 100,
                top: 20
            });

            if (type === 'store') {
                svg = component.toSVG();

                svgPortrait.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="5000" height="5000" viewBox="0 0 5000 5000">${svg}</svg>`;
            }
        }

        if (JSON.parse(componentInfo.content).type === 'Circle') {
            let component = new Circle(JSON.parse(componentInfo.content));
            component.set({
                left: 0,
                top: 0
            });

            svg = component.toSVG();

            svgRef.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="1000" height="1000" viewBox="0 0 5000 5000">${svg}</svg>`;

            component.set({
                left: 100,
                top: 20
            });

            if (type === 'store') {
                svg = component.toSVG();

                svgPortrait.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="5000" height="5000" viewBox="0 0 5000 5000">${svg}</svg>`;
            }
        }

        if (JSON.parse(componentInfo.content).type === 'Polygon') {
            let component = new Polygon(
                JSON.parse(componentInfo.content).points,
                JSON.parse(componentInfo.content)
            );
            component.set({
                left: 50,
                top: 50
            });

            svg = component.toSVG();

            svgRef.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="1000" height="1000" viewBox="0 0 5000 5000">${svg}</svg>`;

            component.set({
                left: 100,
                top: 20
            });

            if (type === 'store') {
                svg = component.toSVG();

                svgPortrait.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="5000" height="5000" viewBox="0 0 5000 5000">${svg}</svg>`;
            }
        }

        if (JSON.parse(componentInfo.content).type === 'Group') {
            let allObjs = [];

            for (const obj of JSON.parse(componentInfo.content).objects) {
                if (obj.type === 'Rect') {
                    allObjs.push(new Rect(obj));
                }

                if (obj.type === 'Circle') {
                    allObjs.push(new Circle(obj));
                }

                if (obj.type === 'Polygon') {
                    allObjs.push(new Polygon(obj.points, obj));
                }
            }

            let component = new Group(allObjs);
            component.set({
                left: 0,
                top: 0
            });

            svg = component.toSVG();

            svgRef.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="1000" height="1000" viewBox="0 0 5000 5000">${svg}</svg>`;

            component.set({
                left: 100,
                top: 20
            });

            if (type === 'store') {
                svg = component.toSVG();

                svgPortrait.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="5000" height="5000" viewBox="0 0 5000 5000">${svg}</svg>`;
            }
        }
    });

    function showModal() {
        if (type === 'store') {
            modalRef.showModal();
        }
    }
</script>

<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<main
    class={`w-28 h-28 flex flex-col items-center justify-center border ${
        isSelected && type !== 'store' ? 'border-primary' : 'border-secondary'
    } border-2 rounded-md my-2`}
    on:click={() => showModal()}
    bind:this={componentCard}
>
    <article
        bind:this={svgRef}
        class={`w-16 h-16 grid place-items-center bg-base-200 overflow-hidden p-2 border  ${
            isSelected && type !== 'store' ? 'border-primary' : 'border-secondary'
        }`}
    />
    <h1
        class="text-center text-md font-bold overflow-hidden text-ellipsis whitespace-nowrap w-full px-3"
    >
        {componentInfo.name}
    </h1>
</main>

{#if type === 'store'}
    <!-- <dialog id="my_modal_3" class="modal" bind:this={modalRef}>
        <div class="modal-box">
            <form method="dialog">
                <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
            </form>
            <article
                bind:this={svgPortrait}
                class="w-10/12 h-24 bg-base-200 overflow-hidden p-2 border border-secondary mt-4"
            />
        </div>
    </dialog>
{:else} -->
    <dialog id="my_modal_3" class="modal" bind:this={modalRef}>
        <div class="modal-box">
            <form method="dialog">
                <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
            </form>
            <form
                method="POST"
                action={`/community/projects/${data.id}/edit?/buy`}
                use:enhance={({ formData }) => {
                    // @ts-ignore
                    formData.set('id', componentInfo.id);

                    return (result) => {
                        console.log(result);
                        modalRef.close();
                        spawn({ message: 'Componente adquirido.' });
                    };
                }}
            >
                <section class="w-full flex flex-col justify-center items-center">
                    <section class="w-11/12">
                        <h1 class="text-center font-semibold text-lg">{componentInfo.name}</h1>
                        <p class="pt-2 text-justify">{componentInfo.description}</p>
                    </section>
                    <article
                        bind:this={svgPortrait}
                        class="w-11/12 h-24 bg-base-200 overflow-hidden p-2 border border-secondary mt-4"
                    />
                    <section class="w-full grid grid-cols-2 place-items-center pt-4">
                        <article
                            class="w-10/12 h-8 border border-2 border-secondary rounded-lg grid place-items-center"
                        >
                            <p class="font-semibold">Orçamento: R$ {componentInfo.budget}</p>
                        </article>
                        <article
                            class="w-10/12 h-8 border border-2 border-secondary rounded-lg grid place-items-center"
                        >
                            <p class="font-semibold">Arkhoins: {componentInfo.budget}</p>
                        </article>
                    </section>
                    <button type="submit" class="btn btn-sm btn-primary w-11/12 mt-4">
                        <Icon icon="mdi:cart" /> Comprar
                    </button>
                </section>
            </form>
        </div>
    </dialog>
{/if}

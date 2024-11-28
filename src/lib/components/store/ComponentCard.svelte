<script lang="ts">
    import { enhance } from '$app/forms';
    import { goto } from '$app/navigation';
    import type { Component } from '$lib/component';
    import { spawn } from '$lib/toast';
    import type { User } from '$lib/user';
    import Icon from '@iconify/svelte';
    import { Rect, Circle, Polygon, Group } from 'fabric';
    import { onMount } from 'svelte';

    export let componentData: Component;
    export let userData: User;

    let cantBuy: boolean = false;
    let modalRef: HTMLDialogElement;
    let svg: string;
    let svgRef: HTMLElement;
    let card: HTMLElement;
    let svgWidth: number;
    let svgHeight: number;

    $: componentData, componentAnalysis(), createSVG();

    onMount(() => {
        const observer = new ResizeObserver(() => {
            if (svgRef) {
                svgWidth = svgRef.offsetWidth;
                svgHeight = svgRef.offsetHeight;
            }
        });

        observer.observe(svgRef);

        return () => {
            observer.disconnect();
        };
    });

    function showModal() {
        if (!cantBuy) {
            modalRef.showModal();
        }
    }

    function closeModal() {
        modalRef.close();
    }

    function componentAnalysis() {
        if (userData.username === componentData.owner_username || componentData.bought) {
            cantBuy = true;
        } else {
            cantBuy = false;
        }
    }

    function createSVG() {
        if (JSON.parse(componentData.content).type === 'Rect') {
            let component = new Rect(JSON.parse(componentData.content));
            component.set({
                left: 0,
                top: 0
            });

            svg = component.toSVG();
        }

        if (JSON.parse(componentData.content).type === 'Circle') {
            let component = new Circle(JSON.parse(componentData.content));
            component.set({
                left: 0,
                top: 0
            });

            svg = component.toSVG();
        }

        if (JSON.parse(componentData.content).type === 'Polygon') {
            let component = new Polygon(
                JSON.parse(componentData.content).points,
                JSON.parse(componentData.content)
            );
            component.set({
                left: 0,
                top: 0
            });

            svg = component.toSVG();
        }

        if (JSON.parse(componentData.content).type === 'Group') {
            let allObjs = [];

            for (const obj of JSON.parse(componentData.content).objects) {
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
        }
    }
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->

{#if componentData.deleted_at === null}
    <main
        class={`w-full h-80 rounded-md border overflow-hidden ${
            cantBuy ? 'opacity-30 cursor-not-allowed' : ''
        }`}
        bind:this={card}
    >
        <div class="w-full h-28 bg-primary rounded-t-md" bind:this={svgRef}>
            {@html `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${
                svgWidth - svgWidth / 4
            } ${svgHeight - svgHeight / 4.1}">${svg}</svg>`}
        </div>
        <section class="w-full h-52 flex flex-col justify-center items-center">
            <div class="w-full pl-6 flex justify-start items-center gap-1">
                <img
                    src={componentData.owner_pfp}
                    alt=""
                    class="rounded-full object-cover size-4"
                />
                <p class="text-xs">@{componentData.owner_username}</p>
            </div>
            <p class="w-full text-center pt-4 line-clamp-1">{componentData.name}</p>
            <p class="pl-6 w-full text-justify text-sm pt-2 line-clamp-2 px-4">
                {componentData.description}
            </p>
            <div class="w-full pl-6 flex justify-start items-center gap-4 pt-6">
                <p class="flex items-center badge">
                    <Icon icon="material-symbols:attach-money" /> R${componentData.budget}
                </p>
                <p class="flex items-center gap-1 badge">
                    <Icon icon="ri:coin-fill" /> <span>{componentData.price}</span>
                </p>
            </div>
            <button
                class={`mt-4 bg-primary text-white rounded-lg w-11/12 h-8 flex justify-center items-center text-sm gap-2 ${
                    cantBuy ? 'btn-disabled' : ''
                }`}
                on:click={showModal}
                ><Icon icon="material-symbols:paid" class="text-lg" />
                {cantBuy ? 'Componente já adquirido' : 'Comprar componente'}</button
            >
        </section>
    </main>
{:else}
    <main class="w-full h-80 rounded-md border overflow-hidden" bind:this={card}>
        <div class="w-full h-28 bg-primary rounded-t-md" bind:this={svgRef}>
            {@html `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${
                svgWidth - svgWidth / 4
            } ${svgHeight - svgHeight / 4.1}">${svg}</svg>`}
        </div>
        <section class="w-full h-52 flex flex-col justify-center items-center">
            <div class="w-full pl-6 flex justify-start items-center gap-1">
                <img
                    src={componentData.owner_pfp}
                    alt=""
                    class="rounded-full object-cover size-4"
                />
                <p class="text-xs">@{componentData.owner_username}</p>
            </div>
            <p class="w-full text-center pt-4 line-clamp-1">{componentData.name}</p>
            <p class="pl-6 w-full text-justify text-sm pt-2 line-clamp-2 px-4">
                {componentData.description}
            </p>
            <div class="w-full pl-6 flex justify-start items-center gap-4 pt-6">
                <p class="flex items-center badge">
                    <Icon icon="material-symbols:attach-money" /> R${componentData.budget}
                </p>
                <p class="flex items-center gap-1 badge">
                    <Icon icon="ri:coin-fill" /> <span>{componentData.price}</span>
                </p>
            </div>
            <div class="w-11/12 flex gap-4 mt-4">
                <form
                    action={`/profile/${userData.username}/trash?/restore`}
                    method="POST"
                    use:enhance={({ formData }) => {
                        formData.set('id', componentData.id.toString());

                        return ({ result, update }) => {
                            spawn({ message: 'Componente restaurado.' });
                            update({ reset: false });

                            console.log(result);
                        };
                    }}
                    class="grow"
                >
                    <button class="btn btn-primary btn-sm w-full">
                        <Icon icon="mdi:restore" />
                        Restaurar
                    </button>
                </form>
                <form
                    action={`/profile/${userData.username}/trash?/delete`}
                    method="POST"
                    use:enhance={({ formData }) => {
                        formData.set('id', componentData.id.toString());

                        return ({ update, result }) => {
                            spawn({ message: 'Componente deletado da lixeira.' });
                            update({ reset: false });

                            console.log(result);
                        };
                    }}
                    class="grow"
                >
                    <button class="btn btn-error btn-sm w-full text-white">
                        <Icon icon="mdi:trash" />
                        Deletar
                    </button>
                </form>
            </div>
        </section>
    </main>
{/if}

<dialog id="my_modal_3" class="modal" bind:this={modalRef}>
    <div class="modal-box">
        <form method="dialog">
            <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                ><Icon icon="material-symbols:close" /></button
            >
        </form>
        <main class="w-full flex flex-col items-center">
            <form
                method="POST"
                action="/community/components?/buy"
                class="w-full"
                use:enhance={({ formData }) => {
                    formData.set('id', String(componentData.id));

                    closeModal();
                    spawn({ message: 'Componente adquirido.' });
                }}
            >
                <h1 class="text-center text-xl font-semibold">{componentData.name}</h1>
                <p class="pt-2 w-full text-justify">{componentData.description}</p>
                <button
                    class={`w-full h-8 btn btn-sm btn-primary mt-4 rounded-lg text-white text-sm font-medium flex justify-center items-center gap-2 ${
                        componentData.price > userData.arkhoins ? 'btn-disabled' : ''
                    }`}
                    ><Icon icon="mdi:success" />{componentData.price > userData.arkhoins
                        ? 'Arkhoins insuficientes.'
                        : `Comprar (${componentData.price} arkhoins)`}</button
                >
            </form>
            <button
                on:click={closeModal}
                class="w-full h-8 btn btn-sm btn-error mt-2 rounded-lg text-white text-sm font-medium flex justify-center items-center gap-2"
                ><Icon icon="material-symbols:close" />Cancelar</button
            >
        </main>
    </div>
</dialog>

<script lang="ts" type="module">
    import { Rect, Circle, Polygon, Group } from 'fabric';
    import { onMount } from 'svelte';
    import Icon from '@iconify/svelte';

    export let name: String;
    export let content: string;
    export let type: string;

    let svg: any;
    let svgRef: HTMLElement;
    let modalRef: HTMLDialogElement;

    onMount(() => {
        if (JSON.parse(content).type === 'Rect') {
            let component = new Rect(JSON.parse(content));
            component.set({
                left: 0,
                top: 0
            });

            svg = component.toSVG();

            svgRef.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="1000" height="1000" viewBox="0 0 5000 5000">${svg}</svg>`;
        }

        if (JSON.parse(content).type === 'Circle') {
            let component = new Circle(JSON.parse(content));
            component.set({
                left: 0,
                top: 0
            });

            svg = component.toSVG();

            svgRef.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="1000" height="1000" viewBox="0 0 5000 5000">${svg}</svg>`;
        }

        if (JSON.parse(content).type === 'Polygon') {
            let component = new Polygon(JSON.parse(content).points, JSON.parse(content));
            component.set({
                left: 50,
                top: 50
            });

            svg = component.toSVG();

            svgRef.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="1000" height="1000" viewBox="0 0 5000 5000">${svg}</svg>`;
        }

        if (JSON.parse(content).type === 'Group') {
            let allObjs = [];

            for (const obj of JSON.parse(content).objects) {
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
        }
    });

    function openModal() {
        modalRef.showModal();
    }
</script>

<main
    class="w-28 h-28 flex flex-col items-center justify-center border border-secondary border-2 rounded-md my-2"
    on:click={() => openModal()}
>
    <article
        bind:this={svgRef}
        class="w-16 h-16 grid place-items-center bg-base-200 overflow-hidden p-2 border border-secondary"
    />
    <h1
        class="text-center text-md font-bold overflow-hidden text-ellipsis whitespace-nowrap w-full px-3"
    >
        {name}
    </h1>
</main>

{#if type === 'component'}
    <dialog id="my_modal_3" class="modal" bind:this={modalRef}>
        <div class="modal-box">
            <form method="dialog">
                <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
            </form>
        </div>
    </dialog>
{:else}
    <dialog id="my_modal_3" class="modal" bind:this={modalRef}>
        <div class="modal-box">
            <form method="dialog">
                <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
            </form>
        </div>
    </dialog>
{/if}

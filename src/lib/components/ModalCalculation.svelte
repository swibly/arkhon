<script lang="ts">
    import { verifyObject } from '$lib/editor/objects';
    import Icon from '@iconify/svelte';
    import { type Canvas, type FabricObject } from 'fabric';
    import { onMount } from 'svelte';

    export let canvas: Canvas;

    let modalRef: HTMLDialogElement;
    let calculation: HTMLElement;
    let finalBudget: number = 0;
    let components: Array<FabricObject> = [];
    let canvasObjects: any;
    let duplicatedComponents = {};

    onMount(() => {
        calculation.addEventListener('mousedown', () => {
            duplicatedComponents = {};
            finalBudget = 0;

            canvasObjects = canvas.toObject([
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
            ]);

            console.log(canvasObjects);

            for (const obj of canvasObjects.objects) {
                if (obj.isComponent) {
                    finalBudget += obj.price;
                    components.push(obj);

                    // @ts-ignore
                    duplicatedComponents[obj.id] = duplicatedComponents[obj.id]
                        ? // @ts-ignore
                          duplicatedComponents[obj.id] + 1
                        : 1;
                }

                if (!obj.isComponent && obj.type === 'Rect') {
                    let width = (obj.width * obj.scaleX.toFixed(2)) / 100;
                    let height = (obj.height * obj.scaleY.toFixed(2)) / 100;
                    let area = width * height;

                    switch (obj.material) {
                        case 'cimento':
                            area *= 154;
                            finalBudget += area;
                            break;

                        case 'madeira':
                            area *= 125;
                            finalBudget += area;
                            break;

                        case 'azulejo':
                            area *= 105;
                            finalBudget += area;
                            break;

                        case 'cerâmica':
                            area *= 79;
                            finalBudget += area;
                            break;

                        case 'porcelanato':
                            area *= 134;
                            finalBudget += area;
                            break;
                    }
                }

                if (!obj.isComponent && obj.type === 'Circle') {
                    let width = (obj.width * obj.scaleX.toFixed(2)) / 100;
                    let height = (obj.height * obj.scaleY.toFixed(2)) / 100;
                    let area =
                        width === height
                            ? 3.14 * Math.sqrt(width / 2)
                            : (((3.14 * width) / 2) * height) / 2;

                    switch (obj.material) {
                        case 'cimento':
                            area *= 154;
                            finalBudget += area;
                            break;

                        case 'madeira':
                            area *= 125;
                            finalBudget += area;
                            break;

                        case 'azulejo':
                            area *= 105;
                            finalBudget += area;
                            break;

                        case 'cerâmica':
                            area *= 79;
                            finalBudget += area;
                            break;

                        case 'porcelanato':
                            area *= 134;
                            finalBudget += area;
                            break;
                    }
                }

                if (!obj.isComponent && obj.type === 'Polygon') {
                    let points = obj.points;
                    let area = 0;

                    for (let i = 0; i < points.length - 1; i++) {
                        area += points[i].x * points[i + 1].y - points[i].y * points[i + 1].x;
                    }

                    area +=
                        points[points.length - 1].x * points[0].y -
                        points[points.length - 1].y * points[0].x;

                    area = area / 2 / 10000;

                    switch (obj.material) {
                        case 'cimento':
                            area *= 154;
                            finalBudget += area;
                            break;

                        case 'madeira':
                            area *= 125;
                            finalBudget += area;
                            break;

                        case 'azulejo':
                            area *= 105;
                            finalBudget += area;
                            break;

                        case 'cerâmica':
                            area *= 79;
                            finalBudget += area;
                            break;

                        case 'porcelanato':
                            area *= 134;
                            finalBudget += area;
                            break;
                    }
                }
            }

            console.log(finalBudget.toFixed(2));

            showModal();
        });
    });

    function showModal() {
        modalRef.showModal();
    }
</script>

<button bind:this={calculation}
    ><Icon icon="ph:play-fill" font-size="20px" class="text-white" /></button
>

<dialog id="my_modal_3" class="modal" bind:this={modalRef}>
    <div class="modal-box w-full grid place-items-center">
        <form method="dialog">
            <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
        </form>

        <main class="flex flex-col justify-center items-center">
            <h1 class="text-center text-lg font-semibold">Cáculo do Orçamento da Planta</h1>
            <div class="overflow-x-auto pt-4">
                <table class="table table-zebra">
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>Preço</th>
                        </tr>
                    </thead>
                    <tbody>
                        {#each components as component}
                            <tr>
                                <td>{verifyObject(component).name}</td>
                                <td>{verifyObject(component).price}</td>
                            </tr>
                        {/each}
                    </tbody>
                </table>
            </div>
        </main>
    </div>
</dialog>

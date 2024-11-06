<script lang="ts">
    import { getActive } from '$lib/editor/objects';
    import { type Canvas, type FabricObject } from 'fabric';
    import { onMount, tick } from 'svelte';

    export let canvas: Canvas;

    let objectMenu: HTMLElement;
    let width: number;
    let height: number;
    let isComponent: boolean;
    let isGroup: boolean;
    let isText: boolean;
    let isPath: boolean;
    let material: string;
    let structureType: string;
    let object: FabricObject;

    onMount(async () => {
        objectMenu.style.display = 'none';

        await tick();

        if (canvas) {
            canvas.on('selection:created', () => {
                if (getActive(canvas).length > 0) {
                    object = getActive(canvas)[0];

                    width =
                        Math.round(getActive(canvas)[0].width * getActive(canvas)[0].scaleX) / 100;
                    height =
                        Math.round(getActive(canvas)[0].height * getActive(canvas)[0].scaleY) / 100;

                    isComponent = false;
                    isGroup = false;
                    isText = false;
                    isPath = false;

                    console.log(object.type);

                    if (getActive(canvas).length > 1) {
                        isGroup = true;
                        //@ts-ignore
                    } else if (getActive(canvas)[0].isComponent) {
                        isComponent = true;
                    } else if (
                        getActive(canvas).length === 1 &&
                        // @ts-ignore
                        getActive(canvas)[0]._objects !== undefined &&
                        // @ts-ignore
                        getActive(canvas)[0]._objects.length > 0
                    ) {
                        isGroup = true;
                    } else if (getActive(canvas)[0].type === 'i-text') {
                        isText = true;
                    } else if (getActive(canvas)[0].type === 'path') {
                        isPath = true;
                    } else {
                        material =
                            //@ts-ignore
                            getActive(canvas)[0].material.charAt(0).toUpperCase() +
                            //@ts-ignore
                            getActive(canvas)[0].material.slice(1);

                        structureType =
                            //@ts-ignore
                            getActive(canvas)[0].structureType.charAt(0).toUpperCase() +
                            //@ts-ignore
                            getActive(canvas)[0].structureType.slice(1);
                    }

                    objectMenu.style.display = 'block';
                }
            });

            canvas.on('selection:updated', () => {
                if (getActive(canvas).length > 0) {
                    object = getActive(canvas)[0];

                    width =
                        Math.round(getActive(canvas)[0].width * getActive(canvas)[0].scaleX) / 100;
                    height =
                        Math.round(getActive(canvas)[0].height * getActive(canvas)[0].scaleY) / 100;

                    isComponent = false;
                    isGroup = false;
                    isText = false;
                    isPath = false;

                    if (getActive(canvas).length > 1) {
                        isGroup = true;
                    } //@ts-ignore
                    else if (getActive(canvas)[0].isComponent) {
                        isComponent = true;
                    } else if (getActive(canvas)[0].type === 'i-text') {
                        isText = true;
                    } else if (getActive(canvas)[0].type === 'path') {
                        isPath = true;
                    } else {
                        material =
                            //@ts-ignore
                            getActive(canvas)[0].material.charAt(0).toUpperCase() +
                            //@ts-ignore
                            getActive(canvas)[0].material.slice(1);

                        structureType =
                            //@ts-ignore
                            getActive(canvas)[0].structureType.charAt(0).toUpperCase() +
                            //@ts-ignore
                            getActive(canvas)[0].structureType.slice(1);
                    }

                    objectMenu.style.display = 'block';
                }
            });

            canvas.on('selection:cleared', () => {
                isComponent = false;
                isGroup = false;

                objectMenu.style.display = 'none';
            });
        }
    });
</script>

<section
    class="absolute z-50 w-40 bg-secondary text-center text-white text-sm font-semibold rounded-lg right-0 mr-4 py-2 mt-4"
    bind:this={objectMenu}
>
    {#if isText}
        <h1>Texto</h1>
    {:else if isPath}
        <h1>Desenho</h1>
    {:else}
        <h1>
            {!isGroup ? `${width}m, ${height}m` : ''}
        </h1>
        <h1>
            {isComponent ? 'Componente' : isGroup ? 'Grupo' : `Material: ${material}`}
        </h1>
        <h1>
            {!isComponent && !isGroup ? `Estrutura: ${structureType}` : ''}
        </h1>
    {/if}
</section>

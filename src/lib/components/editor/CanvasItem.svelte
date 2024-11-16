<script lang="ts">
    import { centerViewOnObject } from '$lib/editor/camera';
    import type { CanvasObject } from '$lib/editor/objects';
    import Icon from '@iconify/svelte';
    import { ActiveSelection, Canvas, FabricObject } from 'fabric';

    export let canvas: Canvas;
    export let currentActiveObjects: FabricObject[] | undefined = undefined;
    export let object: FabricObject;
    export let name: string;
    export let type: string;
    export let componentID: number | undefined = undefined;
    export let children: CanvasObject[] | undefined = [];

    let open = false;
    $: visible = object.visible;

    function select(event: MouseEvent) {
        if (event.shiftKey) {
            let objects = canvas.getActiveObjects();
            if (objects.some((o) => o === object)) {
                objects = objects.filter((o) => o !== object);
            } else {
                objects.push(object);
            }

            canvas.setActiveObject(new ActiveSelection(objects));
        } else {
            canvas.setActiveObject(object);
        }
        canvas.requestRenderAll();
    }

    function center() {
        centerViewOnObject(canvas, object);
    }
</script>

<li
    class="rounded-none"
    class:bg-secondary={object.hasControls && currentActiveObjects?.some((x) => x === object)}
    class:text-primary={componentID !== undefined}
    class:text-secondary-content={object.hasControls &&
        currentActiveObjects?.some((x) => x === object)}
>
    <button on:click={select} on:dblclick={center} class="block rounded-none focus:text-secondary-content">
        {#if children === undefined || (children ?? []).length === 0}
            <div class="flex items-center rounded-none outline-1 outline-primary">
                <button
                    class="flex text-start items-center gap-2 grow"
                    class:text-primary={componentID !== undefined}
                >
                    {#if componentID}
                        <Icon icon="iconamoon:component-fill" />
                    {:else if type === 'rect'}
                        <Icon icon="tdesign:rectangle" />
                    {:else if type === 'circle'}
                        <Icon icon="material-symbols:circle-outline" />
                    {:else if type === 'i-text'}
                        <Icon icon="ci:text" />
                    {:else if type === 'path'}
                        <Icon icon="streamline:pen-draw-solid" />
                    {:else}
                        <Icon icon="clarity:objects-solid" />
                    {/if}

                    <span class="line-clamp-1">
                        {name}
                    </span>
                </button>

                <button
                    class:opacity-50={visible}
                    on:click={function () {
                        object.visible = !object.visible;
                        canvas.requestRenderAll();
                    }}
                >
                    {#if visible}
                        <Icon icon="mdi:eye" />
                    {:else}
                        <Icon icon="mdi:eye-off" />
                    {/if}
                </button>
            </div>
        {:else}
            <div class="flex items-center rounded-none outline-1 outline-primary">
                <button class="flex text-start items-center gap-2 grow">
                    {#if componentID}
                        <Icon icon="iconamoon:component-fill" />
                    {/if}

                    <span class="line-clamp-1">
                        {name}
                    </span>
                </button>

                <button
                    class:opacity-50={visible}
                    on:click={function () {
                        object.visible = !object.visible;
                        canvas.requestRenderAll();
                    }}
                >
                    {#if visible}
                        <Icon icon="mdi:eye" />
                    {:else}
                        <Icon icon="mdi:eye-off" />
                    {/if}
                </button>

                <button on:click={() => (open = !open)}>
                    {#if open}
                        <Icon icon="eva:arrow-up-fill" />
                    {:else}
                        <Icon icon="eva:arrow-down-fill" />
                    {/if}
                </button>
            </div>
            <ul hidden={!open}>
                {#each children as child}
                    <svelte:self {canvas} {...child} />
                {/each}
            </ul>
        {/if}
    </button>
</li>

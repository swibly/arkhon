<script lang="ts">
    import { centerViewOnObject, type CanvasObject } from '$lib/editor/utils';
    import Icon from '@iconify/svelte';
    import { Canvas, FabricObject } from 'fabric';

    export let canvas: Canvas;

    export let object: FabricObject;
    export let name: string;
    export let type: string;
    export let componentID: number | undefined = undefined;
    export let children: CanvasObject[] | undefined = [];

    let open = false;

    function select() {
        canvas.setActiveObject(object);
        canvas.requestRenderAll();
    }

    function center() {
        centerViewOnObject(canvas, object);
    }
</script>

{#if children === undefined || (children ?? []).length === 0}
    <li>
        <button
            class:text-primary={componentID !== undefined}
            on:click={select}
            on:dblclick={center}
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
    </li>
{:else}
    <li>
        <div class="flex items-center" class:text-primary={componentID !== undefined}>
            <button class="flex text-start items-center gap-2 grow" on:click={select} on:dblclick={center}>
                {#if componentID}
                    <Icon icon="iconamoon:component-fill" />
                {/if}

                <span class="line-clamp-1">
                    {name}
                </span>
            </button>

            <button class="text-neutral" on:click={() => (open = !open)}>
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
    </li>
{/if}

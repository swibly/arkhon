<script lang="ts">
    import { fade } from 'svelte/transition';
    import Icon from '@iconify/svelte';
    import { draggable } from '@neodrag/svelte';
    import type { Canvas, FabricObject } from 'fabric';
    import { getCanvasObjects, type CanvasObject } from '$lib/editor/objects';
    import { enhance } from '$app/forms';
    import { canvasObjects } from '$lib/stores/objects';
    import Input from '../Input.svelte';

    export let canvas: Canvas;
    export let objects: CanvasObject[];

    function removeName(object: CanvasObject) {
        delete (object.object as FabricObject & { name?: string }).name;
        $canvasObjects = getCanvasObjects(canvas);
        (document.querySelector('form#update-name input[name="name"]') as HTMLInputElement).value =
            object.nameReset;
    }
</script>

{#if objects.length > 0}
    <div
        class="absolute top-0 left-0 bg-base-100 border border-base-200 bg-opacity-100 z-50 opacity-50 hover:opacity-100 transition-opacity"
        use:draggable={{ bounds: 'canvas', handle: '#handler' }}
        transition:fade={{ duration: 150 }}
    >
        <div
            id="handler"
            class="bg-primary p-2 w-full text-xs flex justify-center items-center gap-2 cursor-grab"
        >
            <Icon icon="ic:baseline-drag-indicator" />
            Segure aqui e arraste para mover
        </div>

        <section class="p-4 h-96 overflow-y-auto">
            {#if objects.length === 1}
                <form
                    method="POST"
                    id="update-name"
                    use:enhance={function ({ formData, cancel }) {
                        cancel();

                        const name = formData.get('name')?.toString();

                        if (!name || (name && name.trim() === '') || name === objects[0].nameReset) return;

                        objects[0].object.set('name', name);
                        $canvasObjects = getCanvasObjects(canvas);
                    }}
                    class="mt-2 flex gap-1 items-center"
                >
                    <Input
                        name="name"
                        defaultValue={objects[0].name}
                        size="sm"
                        disableDefaultLabels
                    />

                    <button class="btn btn-square btn-primary btn-sm">
                        <Icon icon="mdi:feather" />
                    </button>

                    <button
                        type="button"
                        class="btn btn-square btn-error btn-sm"
                        on:click={() => removeName(objects[0])}
                    >
                        <Icon icon="material-symbols:close" />
                    </button>
                </form>

                {#if objects[0].children}
                    <p>Grupo com {objects[0].children.length} objetos</p>
                {/if}
            {/if}
        </section>
    </div>
{/if}

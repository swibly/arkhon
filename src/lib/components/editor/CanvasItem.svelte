<script lang="ts">
    import { centerViewOnObject } from '$lib/editor/camera';
    import { lockObject, type CanvasObject } from '$lib/editor/objects';
    import Icon from '@iconify/svelte';
    import { ActiveSelection, Canvas, FabricObject } from 'fabric';

    export let canvas: Canvas;
    export let currentActiveObjects: FabricObject[] = [];
    export let showControls: boolean;
    export let object: FabricObject;
    export let name: string;
    export let nameReset: string;
    export let price: number | undefined = undefined;
    export let typeTranslated: string;
    export let type: string;
    export let componentID: number | undefined = undefined;
    export let children: CanvasObject[] | undefined = [];

    let open = false;
    $: visible = object.visible;
    $: userLocked = object.get('userlock') ?? false;

    function select(event: MouseEvent) {
        if (!canvas) return;

        const ctrlOrMeta = event.ctrlKey || event.metaKey;
        const shiftKey = event.shiftKey;

        if (shiftKey && currentActiveObjects.length > 0) {
            const allObjects = canvas.getObjects();
            const lastSelectedIndex = allObjects.indexOf(
                currentActiveObjects[currentActiveObjects.length - 1]
            );
            const currentIndex = allObjects.indexOf(object);

            if (lastSelectedIndex !== -1 && currentIndex !== -1) {
                const [start, end] = [lastSelectedIndex, currentIndex].sort((a, b) => a - b);
                const rangeObjects = allObjects.slice(start, end + 1);
                canvas.discardActiveObject();
                const activeSelection = new ActiveSelection(rangeObjects, { canvas });
                canvas.setActiveObject(activeSelection);
            }
        } else if (ctrlOrMeta) {
            const activeObjects = canvas.getActiveObjects();
            if (activeObjects.includes(object)) {
                canvas.discardActiveObject();
                const newSelection = activeObjects.filter((obj) => obj !== object);
                if (newSelection.length > 1) {
                    const activeSelection = new ActiveSelection(newSelection, { canvas });
                    canvas.setActiveObject(activeSelection);
                } else if (newSelection.length === 1) {
                    canvas.setActiveObject(newSelection[0]);
                }
            } else {
                activeObjects.push(object);
                const activeSelection = new ActiveSelection(activeObjects, { canvas });
                canvas.setActiveObject(activeSelection);
            }
        } else {
            canvas.setActiveObject(object);
        }

        canvas.requestRenderAll();
    }

    function toggleLock() {
        userLocked = !userLocked;
        lockObject(canvas, object, userLocked);
    }

    function center() {
        centerViewOnObject(canvas, object);
    }
</script>

<li
    class:bg-secondary={canvas &&
        canvas.selection &&
        currentActiveObjects?.some((x) => x === object && !(x.get('userlock') ?? false))}
    class:text-secondary-content={canvas &&
        canvas.selection &&
        currentActiveObjects?.some((x) => x === object && !(x.get('userlock') ?? false))}
>
    <!-- svelte-ignore a11y-click-events-have-key-events a11y-interactive-supports-focus -->
    <div
        role="button"
        on:click={select}
        on:dblclick={center}
        class="group"
        class:text-primary={componentID}
    >
        <div class="tooltip tooltip-primary tooltip-right" data-tip={typeTranslated}>
            {#if componentID}
                <Icon icon="iconamoon:component-fill" />
            {:else if type === 'rect'}
                <Icon icon="tdesign:rectangle" />
            {:else if type === 'circle'}
                <Icon icon="material-symbols:circle-outline" />
            {:else if type === 'i-text' || type === 'textbox'}
                <Icon icon="ci:text" />
            {:else if type === 'path'}
                <Icon icon="streamline:pen-draw-solid" />
            {:else if type === 'polygon'}
                <Icon icon="gis:polygon" />
            {:else if type === 'polyline'}
                <Icon icon="pepicons-pop:line-x" />
            {:else if type === 'group'}
                <Icon icon="uis:layer-group" />
            {:else}
                <Icon icon="clarity:objects-solid" />
            {/if}

            {#if price && price > 0}
                <div class="absolute top-2/4 left-2/4 text-green-500">
                    <Icon icon="mdi:dollar" />
                </div>
            {/if}
        </div>

        <span class="line-clamp-1">{name || nameReset}</span>

        {#if showControls}
            <section class="hidden items-center gap-1 group-hover:flex">
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

                <button class:opacity-50={!userLocked} on:click={toggleLock}>
                    {#if userLocked}
                        <Icon icon="material-symbols:lock" />
                    {:else}
                        <Icon icon="material-symbols:lock-open-right" />
                    {/if}
                </button>

                {#if children && children.length > 0}
                    <button on:click={() => (open = !open)}>
                        {#if open}
                            <Icon icon="eva:arrow-up-fill" />
                        {:else}
                            <Icon icon="eva:arrow-down-fill" />
                        {/if}
                    </button>
                {/if}
            </section>

            <section class="flex items-center gap-1 group-hover:hidden">
                {#if !visible}
                    <Icon icon="mdi:eye-off" />
                {/if}

                {#if userLocked}
                    <Icon icon="material-symbols:lock" />
                {/if}
            </section>
        {/if}
    </div>

    {#if children && children.length > 0}
        <ul hidden={!open}>
            {#each children as child}
                <svelte:self {canvas} {currentActiveObjects} {showControls} {...child} />
            {/each}
        </ul>
    {/if}
</li>

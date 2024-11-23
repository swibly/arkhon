<script lang="ts">
    import { centerViewOnObject } from '$lib/editor/camera';
    import { lockObject, type CanvasObject } from '$lib/editor/objects';
    import Icon from '@iconify/svelte';
    import { ActiveSelection, Canvas, FabricObject } from 'fabric';

    export let canvas: Canvas;
    export let currentActiveObjects: FabricObject[] | undefined = undefined;
    export let showControls: boolean;
    export let object: FabricObject;
    export let name: string;
    export let typeTranslated: string;
    export let type: string;
    export let componentID: number | undefined = undefined;
    export let children: CanvasObject[] | undefined = [];

    let open = false;
    $: visible = object.visible;
    $: userLocked = object.get('userlock') ?? false;

    function select(event: MouseEvent) {
        if (!object.selectable || userLocked || !object.evented || !showControls) return;

        let selection: FabricObject | ActiveSelection;

        if (event.shiftKey) {
            selection = new ActiveSelection(canvas.getActiveObjects());
            (selection as ActiveSelection).add(object);
        } else {
            selection = object;
        }

        canvas.setActiveObject(selection);
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
    class:bg-secondary={canvas.selection && currentActiveObjects?.some((x) => x === object)}
    class:text-secondary-content={canvas.selection &&
        currentActiveObjects?.some((x) => x === object)}
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
            {:else if type === 'polyline'}
                <Icon icon="pepicons-pop:line-x" />
            {:else}
                <Icon icon="clarity:objects-solid" />
            {/if}
        </div>

        <span class="line-clamp-1">{name}</span>

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

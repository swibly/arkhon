<script lang="ts">
    import { getActive } from '$lib/editor/objects';
    import { IText, type Canvas, type FabricObject } from 'fabric';
    import { onMount } from 'svelte';

    let objectInfo: HTMLElement;
    let top: string;
    let left: string;
    let width: number;
    let text: FabricObject;

    export let canvas: Canvas;

    onMount(() => {
        addEventListener('load', () => {
            text = new IText('asda', {
                width: 50,
                height: 50,
                fill: null,
                stroke: 'white',
                strokeWidth: 2,
                strokeUniform: true,
                lockSkewingX: true,
                lockSkewingY: true,
                lockMovementX: true,
                lockMovementY: true,
                lockRotation: true,
                lockScalingFlip: true,
                lockScalingX: true,
                lockScalingY: true,
                selectable: false,
                fontFamily: 'sans-serif',
                fontSize: 20,
                opacity: 0
            });

            canvas.add(text);
        });

        addEventListener('mousedown', () => {
            canvas.on('selection:created', () => {
                top = getActive(canvas)[0].top.toFixed(0);
                left = getActive(canvas)[0].left.toFixed(0);
                width = getActive(canvas)[0]._cacheCanvas!.width;

                text.set({
                    text: `${top}, ${left}`,
                    top: Number(top) - 40,
                    left: Number(left) + width / 2 / 2,
                    opacity: 1
                });

                if (objectInfo) {
                    objectInfo.style.display = 'flex';
                }
            });

            canvas.on('selection:updated', () => {
                top = getActive(canvas)[0].top.toFixed(0);
                left = getActive(canvas)[0].left.toFixed(0);

                text.set({
                    text: `${top}, ${left}`,
                    top: Number(top) - 40,
                    left: Number(left) + width / 2 / 2,
                    opacity: 1
                });
            });

            canvas.on('selection:cleared', () => {
                if (objectInfo) {
                    objectInfo.style.display = 'none';
                }

                text.set({
                    opacity: 0
                });
            });
        });

        addEventListener('mousemove', () => {
            if (getActive(canvas).length > 0) {
                top = getActive(canvas)[0].top.toFixed(0);
                left = getActive(canvas)[0].left.toFixed(0);

                text.set({
                    text: `${top}, ${left}`,
                    top: Number(top) - 40,
                    left: Number(left) + width / 2 / 2,
                    opacity: 1
                });
            }
        });

        addEventListener('keydown', (e) => {
            if (e.ctrlKey && e.key === 'a' && getActive(canvas).length > 0) {
            }

            if (e.ctrlKey && e.key === 'x') {
            }
        });
    });
</script>

<article
    class="hidden absolute top-[{top}] left-[{left}] w-32 h-8 bg-base-300 z-50 flex-col items-center rounded-xl"
    bind:this={objectInfo}
>
    <p>{top}, {left}</p>
</article>

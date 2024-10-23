<script lang="ts">
    import { getActive } from '$lib/editor/objects';
    import { IText, type Canvas, type FabricObject } from 'fabric';
    import { onMount } from 'svelte';

    let objectInfo: HTMLElement;
    let top: string;
    let left: string;
    let width: number;
    let height: number;
    let text: FabricObject;

    export let canvas: Canvas;

    onMount(() => {
        addEventListener('load', () => {
            text = new IText('', {
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
                fontSize: 14,
                opacity: 0,
                textAlign: 'center'
            });

            canvas.add(text);

            canvas.moveObjectTo(text, 3);

            text.excludeFromExport = true;

            canvas.on('selection:created', () => {
                top = getActive(canvas)[0].top.toFixed(0);
                left = getActive(canvas)[0].left.toFixed(0);
                width = getActive(canvas)[0].aCoords.br.x - getActive(canvas)[0].aCoords.bl.x - 3;
                height = getActive(canvas)[0].aCoords.br.y - getActive(canvas)[0].aCoords.tr.y - 3;

                text.set({
                    text: `${top}, ${left}`,
                    top: Number(top) + height + 20,
                    left:
                        Number(top) > 999 || Number(left) > 999
                            ? Number(left) + (width / 2 - 35)
                            : Number(top) > 99 || Number(left) > 99
                            ? Number(left) + (width / 2 - 25)
                            : Number(left) + (width / 2 - 15),
                    opacity: 1
                });

                if (objectInfo) {
                    objectInfo.style.display = 'flex';
                }
            });

            canvas.on('selection:updated', () => {
                top = getActive(canvas)[0].top.toFixed(0);
                left = getActive(canvas)[0].left.toFixed(0);
                width = getActive(canvas)[0].aCoords.br.x - getActive(canvas)[0].aCoords.bl.x - 3;
                height = getActive(canvas)[0].aCoords.br.y - getActive(canvas)[0].aCoords.tr.y - 3;

                text.set({
                    text: `${top}, ${left}`,
                    top: Number(top) + height + 20,
                    left:
                        Number(top) > 999 || Number(left) > 999
                            ? Number(left) + (width / 2 - 35)
                            : Number(top) > 99 || Number(left) > 99
                            ? Number(left) + (width / 2 - 25)
                            : Number(left) + (width / 2 - 15),
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
                width = getActive(canvas)[0].aCoords.br.x - getActive(canvas)[0].aCoords.bl.x - 3;
                height = getActive(canvas)[0].aCoords.br.y - getActive(canvas)[0].aCoords.tr.y - 3;

                text.set({
                    text: `${top}, ${left}`,
                    top: Number(top) + height + 20,
                    left:
                        Number(top) > 999 || Number(left) > 999
                            ? Number(left) + (width / 2 - 35)
                            : Number(top) > 99 || Number(left) > 99
                            ? Number(left) + (width / 2 - 25)
                            : Number(left) + (width / 2 - 15),
                    opacity: 1
                });
            }
        });
    });
</script>

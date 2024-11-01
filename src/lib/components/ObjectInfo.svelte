<script lang="ts">
    import { addInfoText, getActive } from '$lib/editor/objects';
    import { IText, type Canvas, type FabricObject } from 'fabric';
    import { onMount } from 'svelte';

    let objectInfo: HTMLElement;
    let top: string;
    let left: string;
    let width: number;
    let height: number;
    let text: FabricObject;

    export let fabric: Canvas;

    onMount(() => {      
        console.log(fabric);
        
        // if (canvas) {
        //     addInfoText(canvas);

        //     canvas.on('selection:created', () => {
        //         console.log('P');
        //     });

        //     addEventListener('mousedown', () => {
        //         canvas.on('mouse:down', () => {
        //             console.log('M');
        //         });
        //     });
        // }

        // addEventListener('load', () => {
        //     console.log('D');

        //     canvas.on('selection:created', () => {
        //         top = getActive(canvas)[0].top.toFixed(0);
        //         left = getActive(canvas)[0].left.toFixed(0);
        //         width = getActive(canvas)[0].aCoords.br.x - getActive(canvas)[0].aCoords.bl.x - 3;
        //         height = getActive(canvas)[0].aCoords.br.y - getActive(canvas)[0].aCoords.tr.y - 3;

        //         text.set({
        //             text: `${top}, ${left}`,
        //             top: Number(top) + height + 20,
        //             left:
        //                 Number(top) > 999 || Number(left) > 999
        //                     ? Number(left) + (width / 2 - 35)
        //                     : Number(top) > 99 || Number(left) > 99
        //                     ? Number(left) + (width / 2 - 25)
        //                     : Number(left) + (width / 2 - 15),
        //             opacity: 1
        //         });

        //         if (objectInfo) {
        //             objectInfo.style.display = 'flex';
        //         }
        //     });

        //     canvas.on('selection:updated', () => {
        //         top = getActive(canvas)[0].top.toFixed(0);
        //         left = getActive(canvas)[0].left.toFixed(0);
        //         width = getActive(canvas)[0].aCoords.br.x - getActive(canvas)[0].aCoords.bl.x - 3;
        //         height = getActive(canvas)[0].aCoords.br.y - getActive(canvas)[0].aCoords.tr.y - 3;

        //         text.set({
        //             text: `${top}, ${left}`,
        //             top: Number(top) + height + 20,
        //             left:
        //                 Number(top) > 999 || Number(left) > 999
        //                     ? Number(left) + (width / 2 - 35)
        //                     : Number(top) > 99 || Number(left) > 99
        //                     ? Number(left) + (width / 2 - 25)
        //                     : Number(left) + (width / 2 - 15),
        //             opacity: 1
        //         });
        //     });

        //     canvas.on('selection:cleared', () => {
        //         if (objectInfo) {
        //             objectInfo.style.display = 'none';
        //         }

        //         text.set({
        //             opacity: 0
        //         });
        //     });

        //     canvas.on('mouse:move', () => {
        //         if (getActive(canvas).length > 0) {
        //             top = getActive(canvas)[0].top.toFixed(0);
        //             left = getActive(canvas)[0].left.toFixed(0);
        //             width =
        //                 getActive(canvas)[0].aCoords.br.x - getActive(canvas)[0].aCoords.bl.x - 3;
        //             height =
        //                 getActive(canvas)[0].aCoords.br.y - getActive(canvas)[0].aCoords.tr.y - 3;

        //             if (text) {
        //                 text.set({
        //                     text: `${top}, ${left}`,
        //                     top: Number(top) + height + 20,
        //                     left:
        //                         Number(top) > 999 || Number(left) > 999
        //                             ? Number(left) + (width / 2 - 35)
        //                             : Number(top) > 99 || Number(left) > 99
        //                             ? Number(left) + (width / 2 - 25)
        //                             : Number(left) + (width / 2 - 15),
        //                     opacity: 1
        //                 });
        //             }
        //         }
        //     });
        // });

        // addEventListener('mousemove', () => {
        // //     if (getActive(canvas).length > 0) {
        // //         top = getActive(canvas)[0].top.toFixed(0);
        // //         left = getActive(canvas)[0].left.toFixed(0);
        // //         width = getActive(canvas)[0].aCoords.br.x - getActive(canvas)[0].aCoords.bl.x - 3;
        // //         height = getActive(canvas)[0].aCoords.br.y - getActive(canvas)[0].aCoords.tr.y - 3;

        // //         if (text) {
        // //             text.set({
        // //                 text: `${top}, ${left}`,
        // //                 top: Number(top) + height + 20,
        // //                 left:
        // //                     Number(top) > 999 || Number(left) > 999
        // //                         ? Number(left) + (width / 2 - 35)
        // //                         : Number(top) > 99 || Number(left) > 99
        // //                         ? Number(left) + (width / 2 - 25)
        // //                         : Number(left) + (width / 2 - 15),
        // //                 opacity: 1
        // //             });
        // //         }
        // //     }
        // // });
    });
</script>

import { Group, IText, Rect, Circle, type Canvas, type FabricObject } from 'fabric';
import { renderAll } from './canvas';

export function getActive(canvas: Canvas): Array<FabricObject> {
    return canvas.getActiveObjects();
}

export function add(canvas: Canvas, ...objects: FabricObject[]): void {
    canvas.add(...objects);
}

export function remove(canvas: Canvas, ...objects: FabricObject[]): FabricObject[] {
    return canvas.remove(...objects);
}

export function group(canvas: Canvas): FabricObject {
    const group = new Group(getActive(canvas));

    canvas.add(group);
    canvas.discardActiveObject();

    return group;
}

export async function ungroup(canvas: Canvas): Promise<void> {
    const groups = canvas.getActiveObjects().filter((x) => x.type === 'group') as Group[];

    for (const objs of groups) {
        remove(canvas, objs);

        for (const item of objs.removeAll()) {
            let obj = await remove(canvas, item)[0].clone();

            add(canvas, obj);

            obj.set({
                lockMovementX: item.lockMovementX,
                lockMovementY: item.lockMovementY,
                lockScalingX: item.lockScalingX,
                lockScalingY: item.lockScalingY,
                lockRotation: item.lockRotation
            });
        }
    }
}

export function lock(canvas: Canvas) {
    getActive(canvas).forEach((obj: FabricObject) => {
        obj.lockMovementX = true;
        obj.lockMovementY = true;
        obj.lockScalingX = true;
        obj.lockScalingY = true;
        obj.lockRotation = true;
    });

    renderAll(canvas);
}

export function unlock(canvas: Canvas) {
    getActive(canvas).forEach((obj: FabricObject) => {
        obj.lockMovementX = false;
        obj.lockMovementY = false;
        obj.lockScalingX = false;
        obj.lockScalingY = false;
        obj.lockRotation = false;
    });

    renderAll(canvas);
}

export function addText(canvas: Canvas, points: Array<{ x: number; y: number }>) {
    const text = new IText('Toque para digitar',{
        width: 100,
        height: 100,
        top: points[0].y - 25,
        left: points[0].x - 165,
        fill: null,
        stroke: 'white',
        strokeWidth: 2,
        strokeUniform: true,
        lockSkewingX: true,
        lockSkewingY: true,
        fontFamily: 'sans-serif'
    });

    add(canvas, text);

    renderAll(canvas);
}

export function addRect(canvas: Canvas, points: Array<{ x: number; y: number }>) {
    const rect = new Rect({
        width: 100,
        height: 100,
        top: points[0].y - 50,
        left: points[0].x - 50,
        fill: null,
        stroke: 'green',
        strokeWidth: 3,
        strokeUniform: true,
        lockSkewingX: true,
        lockSkewingY: true
    });

    add(canvas, rect);

    renderAll(canvas);
}

export function addCircle(canvas: Canvas, points: Array<{ x: number; y: number }>) {
    const circle = new Circle({
        radius: 60,
        top: points[0].y - 50,
        left: points[0].x - 60,
        fill: null,
        stroke: 'green',
        strokeWidth: 3,
        strokeUniform: true,
        lockSkewingX: true,
        lockSkewingY: true
    });

    add(canvas, circle);

    renderAll(canvas);
}
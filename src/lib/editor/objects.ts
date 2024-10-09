import { Group, type Canvas, type FabricObject } from 'fabric';
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

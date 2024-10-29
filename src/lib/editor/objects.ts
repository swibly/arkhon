import {
    Group,
    IText,
    Rect,
    Circle,
    Polygon,
    ActiveSelection,
    type Canvas,
    type FabricObject
} from 'fabric';
import { renderAll } from './canvas';

let capturedPoints: Array<{ x: number; y: number }> = [];
let visiblePoints: FabricObject[] = [];
let count: number = 0;

export function getActive(canvas: Canvas): Array<FabricObject> {
    return canvas.getActiveObjects();
}

export function add(canvas: Canvas, ...objects: FabricObject[]): void {
    canvas.add(...objects);
}

export function remove(canvas: Canvas, ...objects: FabricObject[]): FabricObject[] {
    canvas.discardActiveObject();

    return canvas.remove(...objects);
}

export function removeGroup(canvas: Canvas, ...objects: FabricObject[]) {
    const groups = getActive(canvas).filter((x) => x.type === 'group') as Group[];

    if (groups.length > 0) {
        for (const objs of groups) {
            remove(canvas, objs);

            for (const item of objs.removeAll()) {
                remove(canvas, item);
            }
        }
    }
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

            // @ts-ignore
            if (item.isComponent) {
                obj.set({
                    lockMovementX: item.lockMovementX,
                    lockMovementY: item.lockMovementY,
                    lockScalingX: item.lockScalingX,
                    lockScalingY: item.lockScalingY,
                    lockRotation: item.lockRotation,
                    // @ts-ignore
                    name: item.name,
                    // @ts-ignore
                    price: item.price,
                    // @ts-ignore
                    isComponent: item.isComponent
                });
            } else {
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

export function copy(canvas: Canvas) {
    return canvas.getActiveObject()!.clone();
}

export async function paste(
    canvas: Canvas,
    clipboard: FabricObject,
    copiedObjects: FabricObject[]
) {
    let count: number = 0;

    const clonedObj = await clipboard.clone();

    canvas.discardActiveObject();
    clonedObj.set({
        left: clonedObj.left + 10,
        top: clonedObj.top + 10,
        evented: true
    });
    if (clonedObj instanceof ActiveSelection) {
        clonedObj.canvas = canvas;
        clonedObj.forEachObject((obj) => {
            canvas.add(obj);

            // @ts-ignore
            if (copiedObjects[count].isComponent) {
                obj.set({
                    lockMovementX: copiedObjects[count].lockMovementX,
                    lockMovementY: copiedObjects[count].lockMovementY,
                    lockScalingX: copiedObjects[count].lockScalingX,
                    lockScalingY: copiedObjects[count].lockScalingY,
                    lockRotation: copiedObjects[count].lockRotation,
                    // @ts-ignore
                    name: copiedObjects[count].name,
                    // @ts-ignore
                    price: copiedObjects[count].price,
                    // @ts-ignore
                    isComponent: copiedObjects[count].isComponent
                });
            } else {
                obj.set({
                    lockMovementX: copiedObjects[count].lockMovementX,
                    lockMovementY: copiedObjects[count].lockMovementY,
                    lockScalingX: copiedObjects[count].lockScalingX,
                    lockScalingY: copiedObjects[count].lockScalingY,
                    lockRotation: copiedObjects[count].lockRotation,
                    // @ts-ignore
                    isComponent: copiedObjects[count].isComponent
                });
            }

            count++;
        });
        clonedObj.setCoords();
    } else {
        canvas.add(clonedObj);

        // @ts-ignore
        if (copiedObjects[0].isComponent) {
            clonedObj.set({
                lockMovementX: copiedObjects[0].lockMovementX,
                lockMovementY: copiedObjects[0].lockMovementY,
                lockScalingX: copiedObjects[0].lockScalingX,
                lockScalingY: copiedObjects[0].lockScalingY,
                lockRotation: copiedObjects[0].lockRotation,
                // @ts-ignore
                name: copiedObjects[0].name,
                // @ts-ignore
                price: copiedObjects[0].price,
                // @ts-ignore
                isComponent: copiedObjects[count].isComponent
            });
        } else {
            clonedObj.set({
                lockMovementX: copiedObjects[0].lockMovementX,
                lockMovementY: copiedObjects[0].lockMovementY,
                lockScalingX: copiedObjects[0].lockScalingX,
                lockScalingY: copiedObjects[0].lockScalingY,
                lockRotation: copiedObjects[0].lockRotation,
                // @ts-ignore
                isComponent: copiedObjects[count].isComponent
            });
        }
    }
    clipboard.top += 10;
    clipboard.left += 10;
    canvas.setActiveObject(clonedObj);
    canvas.requestRenderAll();
}

export function addText(canvas: Canvas, points: Array<{ x: number; y: number }>, text: string) {
    const itext = new IText(text, {
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

    add(canvas, itext);

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
        lockSkewingY: true,
        lockScalingFlip: true
    });

    add(canvas, rect);

    rect.set({
        isComponent: false
    });
    rect.setCoords();

    renderAll(canvas);
}

export function addCircle(canvas: Canvas, points: Array<{ x: number; y: number }>) {
    const circle = new Circle({
        radius: 60,
        top: points[0].y - 50,
        left: points[0].x - 50,
        fill: null,
        stroke: 'green',
        strokeWidth: 3,
        strokeUniform: true,
        lockSkewingX: true,
        lockSkewingY: true
    });

    add(canvas, circle);

    circle.set({
        isComponent: false
    });
    circle.setCoords();

    renderAll(canvas);
}

export function addPoints(canvas: Canvas, points: { x: number; y: number }) {
    capturedPoints.push(points);
    count += 1;

    const point = new IText(`${count}`, {
        fontSize: 25,
        top: points.y - 5,
        left: points.x - 5,
        fill: 'green',
        stroke: 'green',
        strokeWidth: 3,
        strokeUniform: true,
        fontFamily: 'sans-serif',
        selectable: false,
        lockMovementX: true,
        lockMovementY: true,
        lockRotation: true,
        lockScalingFlip: true,
        lockScalingX: true,
        lockScalingY: true,
        lockSkewingX: true,
        lockSkewingY: true
    });

    add(canvas, point);

    visiblePoints.push(point);
}

export function addLine(canvas: Canvas) {
    const line = new Polygon(capturedPoints, {
        fill: 'green',
        stroke: 'green',
        strokeWidth: 2,
        originX: 'center',
        originY: 'center'
    });

    add(canvas, line);

    line.set({
        isComponent: false
    });
    line.setCoords();

    renderAll(canvas);

    count = 0;
}

export function stopLine(canvas: Canvas) {
    remove(canvas, ...visiblePoints);
    capturedPoints = [];
    visiblePoints = [];
    count = 0;
    canvas.discardActiveObject();
}

export function changeBorder(canvas: Canvas, color: string, ...objects: FabricObject[]) {
    if (objects.length > 1) {
        for (const objs of objects) {
            if (color === 'null') {
                objs.set('stroke', null);
            } else {
                objs.set('stroke', color);
            }
        }
    } else {
        if (color === 'null') {
            objects[0].set('stroke', null);
        } else {
            objects[0].set('stroke', color);
        }
    }

    renderAll(canvas);
}

export function changeFill(canvas: Canvas, color: string, ...objects: FabricObject[]) {
    if (objects.length > 1) {
        for (const objs of objects) {
            if (color === 'null') {
                objs.set('fill', null);
            } else {
                objs.set('fill', color);
            }
        }
    } else {
        if (color === 'null') {
            objects[0].set('fill', null);
        } else {
            objects[0].set('fill', color);
        }
    }

    renderAll(canvas);
}

export function changeOpacity(canvas: Canvas, opacitySlider: HTMLInputElement) {
    if (getActive(canvas).length > 1) {
        canvas.getActiveObject()?.set('opacity', parseInt(opacitySlider.value) / 10);
        for (const objs of getActive(canvas)) {
            objs.set('opacity', parseInt(opacitySlider.value) / 10);
        }
    } else {
        getActive(canvas)[0]?.set('opacity', parseInt(opacitySlider.value) / 10);
    }

    renderAll(canvas);

    return takeOpacity(canvas);
}

export function changeStroke(canvas: Canvas, strokeSlider: HTMLInputElement) {
    if (getActive(canvas).length > 1) {
        canvas.getActiveObject()?.set('strokeWidth', parseInt(strokeSlider.value));
        for (const objs of getActive(canvas)) {
            objs.set('strokeWidth', parseInt(strokeSlider.value));
        }
    } else {
        getActive(canvas)[0]?.set('strokeWidth', parseInt(strokeSlider.value));
    }

    renderAll(canvas);

    return takeOpacity(canvas);
}

export function takeOpacity(canvas: Canvas) {
    return getActive(canvas)[0].opacity * 10;
}

export function takeStroke(canvas: Canvas) {
    return getActive(canvas)[0].strokeWidth;
}

export function resetOpacity(canvas: Canvas, obj: FabricObject) {
    obj.set({
        opacity: 0
    });

    canvas.requestRenderAll();
}

export function verifyObject(x: any): any {
    return x;
}

export function setInfo(object: FabricObject, name: string, price: number, id: number, description: string, arkhoins: number, isPublic: boolean) {
    object.set({
        id: id,
        name: name,
        price: price,
        isComponent: true,
        description: description,
        arkhoins: arkhoins,
        isPublic: isPublic
    });
    object.setCoords();
}

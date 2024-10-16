import { Group, IText, Rect, Circle, Polygon, type Canvas, type FabricObject } from 'fabric';
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
    const text = new IText('Toque para digitar', {
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
        left: points[0].x - 50,
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

export function changeOpacity(canvas: Canvas, valueSlider: HTMLInputElement) {
    if (getActive(canvas).length > 1) {        
        canvas.getActiveObject()?.set('opacity', parseInt(valueSlider.value) / 10);
        for (const objs of getActive(canvas)) {
            objs.set('opacity', parseInt(valueSlider.value) / 10);
        }
    } else {              
        getActive(canvas)[0]?.set('opacity', parseInt(valueSlider.value) / 10);
    }

    renderAll(canvas);   

    return takeOpacity(canvas);
}


export function takeOpacity(canvas: Canvas){
    return getActive(canvas)[0].opacity * 10;
}

export function resetOpacity(canvas: Canvas, obj: FabricObject){
    obj.set({
        opacity: 0
    })

    canvas.requestRenderAll();
}
import type { Canvas } from 'fabric';
import { canvasObjects } from '$lib/stores/objects';
import { getCanvasObjects } from './objects';

function __post(canvas: Canvas) {
    canvas.requestRenderAll();

    canvasObjects.set(getCanvasObjects(canvas));
}

export function sendBackwards(canvas: Canvas) {
    const object = canvas.getActiveObject();

    if (object) {
        canvas.sendObjectBackwards(object);
    }

    __post(canvas);
}

export function sendToBack(canvas: Canvas) {
    const object = canvas.getActiveObject();

    if (object) {
        canvas.sendObjectToBack(object);
    }

    __post(canvas);
}

export function bringForward(canvas: Canvas) {
    const object = canvas.getActiveObject();

    if (object) {
        canvas.bringObjectForward(object);
    }

    __post(canvas);
}

export function bringToFront(canvas: Canvas) {
    const object = canvas.getActiveObject();

    if (object) {
        canvas.bringObjectToFront(object);
    }

    __post(canvas);
}

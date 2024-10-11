import type { Canvas } from 'fabric';
import { getActive } from './objects';
import { renderAll } from './canvas';

export function bringFront(canvas: Canvas): void {
    for (const object of getActive(canvas)) {
        canvas.bringObjectToFront(object);
    }

    renderAll(canvas);
}

export function sendBack(canvas: Canvas): void {
    for (const object of getActive(canvas)) {
        canvas.moveObjectTo(object, 1);
    }

    renderAll(canvas);
}

export function sendBackward(canvas: Canvas) {
    for (const object of getActive(canvas)) {
        if (canvas.getObjects().indexOf(object) > 1) {
            canvas.sendObjectBackwards(object);
        } else {
            canvas.moveObjectTo(object, 1);
        }        
    }

    renderAll(canvas);
}

export function bringForward(canvas: Canvas) {
    for (const object of getActive(canvas)) {
        canvas.bringObjectForward(object);
    }

    renderAll(canvas);
}

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
        canvas.sendObjectToBack(object);
    }

    renderAll(canvas);
}

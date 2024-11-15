import { Canvas, Point } from 'fabric';
import { getTool, Tool } from '$lib/stores/tool';

export function loadEventListeners(canvas: Canvas) {
    let movingCamera = false;
    let mouseLastClick = { x: 0, y: 0 };

    canvas.on('mouse:down', function ({ e: event }) {
        if (getTool() === Tool.Hand) {
            const { x, y } = canvas.getViewportPoint(event);
            mouseLastClick = { x, y };
            canvas.selection = false;
            movingCamera = true;
        }
    });

    canvas.on('mouse:up', function () {
        movingCamera = false;
    });

    canvas.on('mouse:move', function ({ e: event }) {
        if (movingCamera) {
            requestAnimationFrame(() => {
                const { x, y } = canvas.getViewportPoint(event);
                const viewport = canvas.viewportTransform;

                viewport[4] += x - mouseLastClick.x;
                viewport[5] += y - mouseLastClick.y;

                canvas.setViewportTransform(viewport);

                mouseLastClick = { x, y };
            });
        }
    });

    canvas.on('mouse:wheel', function ({ e: event }) {
        const delta = event.deltaY;

        let zoom = canvas.getZoom();
        zoom *= 0.999 ** delta;

        if (zoom > 3) zoom = 3;
        if (zoom < 0.1) zoom = 0.1;

        canvas.zoomToPoint(new Point({ x: event.offsetX, y: event.offsetY }), zoom);

        event.preventDefault();
        event.stopPropagation();
    });
}

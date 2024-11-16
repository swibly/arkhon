import { ActiveSelection, Canvas, FabricObject, Point } from 'fabric';
import { getPreviousTool, getTool, setPreviousTool, setTool, Tool } from '$lib/stores/tool';
import { copyObjectsToClipboard, pasteObjectsFromClipboard } from './objects';
import type { Project } from '$lib/projects';
import type { User } from '$lib/user';
import { hasPermissions } from '$lib/utils';

let editingText = false;
let spaceBarPressed = false;

export function loadCanvasEventListeners(canvas: Canvas) {
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
        const { deltaX, deltaY } = event;

        if (event.ctrlKey) {
            let zoom = canvas.getZoom();
            zoom *= 0.999 ** deltaY;

            if (zoom > 3) zoom = 3;
            if (zoom < 0.1) zoom = 0.1;

            canvas.zoomToPoint(new Point({ x: event.offsetX, y: event.offsetY }), zoom);
        } else {
            canvas.relativePan(new Point({ x: -deltaX, y: -deltaY }));
        }

        event.preventDefault();
        event.stopPropagation();
    });

    canvas.on('text:editing:entered', function () {
        editingText = true;
    });

    canvas.on('text:editing:exited', function () {
        editingText = false;
    });
}

export async function handleKeybinds(
    event: KeyboardEvent,
    canvas: Canvas,
    user: User,
    project: Project
) {
    if (!hasPermissions(user, project, ['allow_edit'])) return;
    if (getTool() !== Tool.Text && editingText === true) return;

    switch (event.key) {
        case 'a':
            if (event.ctrlKey) {
                event.preventDefault();

                canvas.discardActiveObject();

                const objects = canvas
                    .getObjects()
                    .filter((object) => object.hasControls && object.evented);

                canvas.setActiveObject(new ActiveSelection(objects, { canvas }));
                canvas.requestRenderAll();
                break;
            }
            break;
        case 'h':
            setTool(Tool.Hand);
            break;
        case 's':
            setTool(Tool.Selection);
            break;
        case 'b':
            setTool(Tool.Brush);
            break;
        case 't':
            setTool(Tool.Text);
            break;
        case 'l':
            setTool(Tool.Line);
            break;
        case 'q':
            setTool(Tool.Square);
            break;
        case 'c':
            if (event.ctrlKey) {
                copyObjectsToClipboard(canvas);
                break;
            }

            setTool(Tool.Circle);
            break;
        case 'v':
            if (event.ctrlKey) {
                await pasteObjectsFromClipboard(canvas);
                break;
            }

            break;
        case 'p':
            setTool(Tool.Polygon);
            break;
        case 'Backspace':
        case 'Delete':
            canvas.remove(...canvas.getActiveObjects());
            canvas.discardActiveObject();
            canvas.requestRenderAll();
            break;
    }
}

export function handleSpaceBarPress(event: KeyboardEvent) {
    if (event.key === ' ' && !spaceBarPressed) {
        spaceBarPressed = true;

        if (!getPreviousTool()) {
            setPreviousTool(getTool());
        }
        setTool(Tool.Hand);
    }
}

export function handleSpaceBarRelease(event: KeyboardEvent) {
    if (event.key === ' ' && spaceBarPressed) {
        spaceBarPressed = false;

        if (getPreviousTool()) {
            setTool(getPreviousTool()!);
            setPreviousTool(undefined);
        }
    }
}

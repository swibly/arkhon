import type { Project } from '$lib/projects';
import { mouseCoords } from '$lib/stores/mouseCoords';
import { canvasObjects } from '$lib/stores/objects';
import { getPreviousTool, getTool, setPreviousTool, setTool, Tool } from '$lib/stores/tool';
import { zoom } from '$lib/stores/zoom';
import type { User } from '$lib/user';
import { hasPermissions } from '$lib/utils';
import {
    ActiveSelection,
    type BasicTransformEvent,
    Canvas,
    Circle,
    controlsUtils,
    FabricObject,
    Point,
    Polygon,
    Polyline,
    Rect,
    Textbox,
    type TPointerEvent,
    type XY
} from 'fabric';

import {
    copyObjectsToClipboard,
    cutObjects,
    getCanvasObjects,
    pasteObjectsFromClipboard
} from './objects';
import { applyObjectPermissions } from './permissions';

let editingText = false;
let spaceBarPressed = false;

export function loadCanvasEventListeners(canvas: Canvas) {
    let movingCamera = false;
    let mouseLastClick = { x: 0, y: 0 };

    let textbox: Textbox;
    let shape: FabricObject;
    let drawingShape: boolean = false;
    let origin: XY;

    canvas.on('after:render', () => zoom.set(canvas.getZoom()));

    canvas.on('object:added', () => canvasObjects.set(getCanvasObjects(canvas)));
    canvas.on('object:removed', () => canvasObjects.set(getCanvasObjects(canvas)));

    handleObjectOperations(canvas);

    canvas.on('mouse:down', function ({ e: event }) {
        switch (getTool()) {
            case Tool.Hand: {
                const { x, y } = canvas.getViewportPoint(event);
                mouseLastClick = { x, y };
                canvas.selection = false;
                movingCamera = true;
                break;
            }

            case Tool.Line:
            case Tool.Square:
            case Tool.Circle: {
                drawingShape = true;

                const { x, y } = canvas.getScenePoint(event);
                origin = { x, y };

                const options = {
                    left: origin.x,
                    top: origin.y,
                    width: x - origin.x,
                    height: y - origin.y,
                    fill: null,
                    stroke: 'white',
                    strokeWidth: 3,
                    radius: 0
                };

                if (getTool() === Tool.Square) shape = new Rect(options);
                else if (getTool() === Tool.Circle) shape = new Circle(options);
                else if (getTool() === Tool.Line) {
                    shape = new Polyline([origin, origin], options);
                    shape.dirty = true;
                    shape.controls = controlsUtils.createPolyControls(shape as Polyline);
                }

                applyObjectPermissions(canvas, shape, { selectable: false, cursor: 'crosshair' });

                canvas.add(shape);
                break;
            }

            case Tool.Text: {
                const { x, y } = canvas.getScenePoint(event);

                textbox = new Textbox('', { left: x, top: y });
                canvas.add(textbox);

                canvas.requestRenderAll();
                break;
            }

            default: {
                break;
            }
        }
    });

    canvas.on('mouse:up', function ({ e: event }) {
        if (getTool() === Tool.Text) {
            textbox.enterEditing(event);
            canvas.setActiveObject(textbox);
            canvas.requestRenderAll();
            return;
        }

        movingCamera = false;

        if (drawingShape) {
            setTool(Tool.Selection);
        }

        drawingShape = false;

        if (shape) {
            shape.set({ selectable: true });

            const { x, y } = canvas.getScenePoint(event);

            if (origin.x === x && origin.y === y) {
                if (shape instanceof Rect) {
                    shape.set({ width: 100, height: 100 });

                    shape.setX(shape.left - 50);
                    shape.setY(shape.top - 50);
                } else if (shape instanceof Circle) {
                    shape.set({ radius: 50 });

                    shape.setX(shape.left - 50);
                    shape.setY(shape.top - 50);
                } else if (shape instanceof Polyline) {
                    shape.set('points', [
                        { x: x - 50, y },
                        { x: x + 50, y }
                    ]);

                    var calcDim = shape._calcDimensions();

                    shape.width = calcDim.width;
                    shape.height = calcDim.height;

                    shape.set({
                        left: calcDim.left,
                        top: calcDim.top,
                        pathOffset: {
                            x: calcDim.left + shape.width / 2,
                            y: calcDim.top + shape.height / 2
                        }
                    });
                }

                shape.setCoords();
                canvas.requestRenderAll();
            }
        }
    });

    canvas.on('mouse:move', function ({ e: event, scenePoint }) {
        mouseCoords.set(scenePoint);

        switch (getTool()) {
            case Tool.Hand: {
                if (movingCamera) {
                    const { x, y } = canvas.getViewportPoint(event);

                    const viewport = canvas.viewportTransform;

                    viewport[4] += x - mouseLastClick.x;
                    viewport[5] += y - mouseLastClick.y;

                    canvas.setViewportTransform(viewport);

                    mouseLastClick = { x, y };
                }
                break;
            }

            case Tool.Line:
            case Tool.Circle:
            case Tool.Square: {
                if (drawingShape) {
                    let { x, y } = canvas.getScenePoint(event);

                    if (origin.x > x) {
                        shape.set({ left: Math.abs(x) });
                    }

                    if (origin.y > y) {
                        shape.set({ top: Math.abs(y) });
                    }

                    if (shape instanceof Rect) {
                        let width = Math.abs(origin.x - x);
                        let height = Math.abs(origin.y - y);

                        if (event.shiftKey) {
                            width = Math.round(width / 50) * 50;
                            height = Math.round(height / 50) * 50;
                        }

                        if (event.ctrlKey) {
                            height = width;
                        }

                        shape.set({ width, height });
                    } else if (shape instanceof Circle) {
                        let radius = Math.max(Math.abs(origin.x - x), Math.abs(origin.y - y));

                        if (event.ctrlKey) {
                            radius = Math.round(radius / 50) * 50;
                        }

                        shape.set({ radius, left: origin.x - radius, top: origin.y - radius });
                    } else if (shape instanceof Polyline) {
                        if (event.shiftKey) {
                            const dx = x - origin.x;
                            const dy = y - origin.y;
                            const angle = Math.atan2(dy, dx);

                            const snapAngle = Math.PI / 12;
                            const snappedAngle = Math.round(angle / snapAngle) * snapAngle;

                            const distance = Math.sqrt(dx * dx + dy * dy);

                            x = origin.x + distance * Math.cos(snappedAngle);
                            y = origin.y + distance * Math.sin(snappedAngle);
                        }

                        const points = [...shape.get('points')];
                        points[1] = { x, y };

                        shape.set({ points });

                        var calcDim = shape._calcDimensions();

                        shape.width = calcDim.width;
                        shape.height = calcDim.height;

                        shape.set({
                            left: calcDim.left,
                            top: calcDim.top,
                            pathOffset: {
                                x: calcDim.left + shape.width / 2,
                                y: calcDim.top + shape.height / 2
                            }
                        });
                    }

                    shape.setCoords();
                }

                canvas.renderAll();
                break;
            }

            default: {
                break;
            }
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

    canvas.on('text:editing:exited', function ({ target }) {
        editingText = false;

        if (target.text.trim() === '') {
            canvas.remove(target);
        }

        setTool(Tool.Selection);

        canvasObjects.set(getCanvasObjects(canvas));
    });
}

export async function handleKeybinds(
    event: KeyboardEvent,
    canvas: Canvas,
    user: User,
    project: Project
) {
    if (!hasPermissions(user, project, ['allow_edit']) || editingText) return;

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
        case 'x':
            if (event.ctrlKey) {
                cutObjects(canvas);
            }
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
    if (editingText) return;

    if (event.key === ' ' && !spaceBarPressed) {
        spaceBarPressed = true;

        if (!getPreviousTool()) {
            setPreviousTool(getTool());
        }
        setTool(Tool.Hand);
    }
}

export function handleSpaceBarRelease(event: KeyboardEvent) {
    if (editingText) return;

    if (event.key === ' ' && spaceBarPressed) {
        spaceBarPressed = false;

        if (getPreviousTool()) {
            setTool(getPreviousTool()!);
            setPreviousTool(undefined);
        }
    }
}

function handleObjectOperations(canvas: Canvas) {
    function handleTransform({
        e,
        target,
        transform
    }: BasicTransformEvent<TPointerEvent> & { target: FabricObject }) {
        if (!target.get('startLeft')) {
            target.set('startLeft', target.left);
            target.set('startTop', target.top);
        }

        switch (transform.action) {
            case 'drag': {
                if (e.shiftKey) {
                    if (e.shiftKey) {
                        const deltaX = target.left - (target.get('startLeft') || 0);
                        const deltaY = target.top - (target.get('startTop') || 0);

                        if (Math.abs(deltaX) > Math.abs(deltaY)) {
                            target.top = target.get('startTop') || 0;
                        } else {
                            target.left = target.get('startLeft') || 0;
                        }
                    }
                }

                if (e.ctrlKey) {
                    target.left = Math.round(target.left / 50) * 50;
                    target.top = Math.round(target.top / 50) * 50;
                }

                break;
            }

            case 'rotate': {
                target.snapAngle = ~~e.shiftKey * 15;

                break;
            }

            case 'scaleX':
            case 'scaleY':
            case 'scale': {
                target.set('strokeUniform', true);

                if (e.ctrlKey) {
                    const newWidth = Math.round((target.width * target.scaleX) / 50) * 50;
                    const newHeight = Math.round((target.height * target.scaleY) / 50) * 50;

                    target.scaleX = newWidth / target.width;
                    target.scaleY = newHeight / target.height;
                }
                break;
            }

            case 'modifyPoly': {
                const polygon = target as Polygon;
                const controlIndex = parseInt(transform.corner.replace('p', ''), 10);
                const point = polygon.points[controlIndex];

                if (!point) return;

                if (e.shiftKey) {
                    const prevPoint =
                        polygon.points[controlIndex - 1] ||
                        polygon.points[polygon.points.length - 1];
                    const deltaX = point.x - prevPoint.x;
                    const deltaY = point.y - prevPoint.y;
                    if (Math.abs(deltaX) > Math.abs(deltaY)) {
                        point.y = prevPoint.y;
                    } else {
                        point.x = prevPoint.x;
                    }
                }

                if (e.ctrlKey) {
                    point.x = Math.round(point.x / 50) * 50;
                    point.y = Math.round(point.y / 50) * 50;
                }

                polygon.dirty = true;

                var calcDim = polygon._calcDimensions();

                polygon.width = calcDim.width;
                polygon.height = calcDim.height;

                polygon.set({
                    left: calcDim.left,
                    top: calcDim.top,
                    pathOffset: {
                        x: calcDim.left + polygon.width / 2,
                        y: calcDim.top + polygon.height / 2
                    }
                });

                polygon.setCoords();
                canvas.requestRenderAll();

                break;
            }

            default: {
                break;
            }
        }
    }

    canvas.on('object:moving', function (event) {
        handleTransform(event);
    });

    canvas.on('object:scaling', function (event) {
        handleTransform(event);
    });

    canvas.on('object:rotating', function (event) {
        handleTransform(event);
    });

    canvas.on('object:modifyPoly', function (event) {
        handleTransform(event);
    });
}

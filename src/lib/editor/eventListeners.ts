import type { Project } from '$lib/projects';
import { mouseCoords } from '$lib/stores/mouseCoords';
import { canvasObjects, totalPrice } from '$lib/stores/objects';
import {
    addPolygonPoint,
    getPreviousTool,
    getTool,
    polygonPoints,
    setPreviousTool,
    setTool,
    Tool
} from '$lib/stores/tool';
import { zoom } from '$lib/stores/zoom';
import { spawn } from '$lib/toast';
import type { User } from '$lib/user';
import { hasPermissions } from '$lib/utils';
import {
    ActiveSelection,
    type BasicTransformEvent,
    Canvas,
    Circle,
    controlsUtils,
    FabricObject,
    IText,
    Point,
    Polygon,
    Polyline,
    Rect,
    Textbox,
    type TPointerEvent,
    util,
    type XY
} from 'fabric';
import Cookies from 'js-cookie';
import { get } from 'svelte/store';
import {
    calculateTotalArea,
    calculateTotalPrice,
    copyObjectsToClipboard,
    cutObjects,
    getCanvasObjects,
    pasteObjectsFromClipboard
} from './objects';
import { applyObjectPermissions } from './permissions';
import { HistoryManager } from './history';

const GRID_SIZE = 50;

let editingText = false;
let spaceBarPressed = false;

export const polygonPath = new Polygon([], {
    stroke: Cookies.get('colorscheme') === 'dark' ? 'white' : 'black',
    strokeWidth: 5,
    fill: null,
    selectable: false,
    evented: false,
    excludeFromExport: true
});

export const textDisplaySize = new IText('', {
    selectable: false,
    evented: false,
    excludeFromExport: true,
    fontFamily: 'arial',
    stroke: 'black',
    fill: 'lightgray',
    strokeWidth: 3,
    paintFirst: 'stroke',
    strokeDashOffset: 10,
    textAlign: 'center',
    fontWeight: 900,
    fontSize: 18,
    visible: false
});

export const textDisplayArea = new IText('', {
    selectable: false,
    evented: false,
    excludeFromExport: true,
    fontFamily: 'arial',
    stroke: 'black',
    fill: 'lightgray',
    strokeWidth: 3,
    paintFirst: 'stroke',
    strokeDashOffset: 10,
    textAlign: 'center',
    fontWeight: 900,
    fontSize: 18,
    visible: false
});

export let historyManager: HistoryManager;

export function updateTextDisplayArea(canvas: Canvas) {
    const activeObjects = canvas.getActiveObjects();

    if (activeObjects.length === 0) {
        textDisplayArea.visible = false;
        canvas.requestRenderAll();
        return;
    }

    textDisplayArea.visible = true;
    canvas.bringObjectToFront(textDisplayArea);

    let totalArea = 0;

    activeObjects.forEach((object) => (totalArea += calculateTotalArea(object)));

    textDisplayArea.set('text', `${(totalArea / 10000).toFixed(2)}m²`);

    const active = canvas.getActiveObject();

    if (active) {
        const firstBounding = active.getBoundingRect();
        textDisplayArea.setX(
            firstBounding.left + firstBounding.width / 2 - textDisplayArea.width / 2
        );
        textDisplayArea.setY(firstBounding.top + firstBounding.height + 20);
    }

    if (totalArea === 0) {
        textDisplayArea.visible = false;
    }

    textDisplayArea.setCoords();
    canvas.requestRenderAll();
}

export function loadCanvasEventListeners(canvas: Canvas) {
    canvas.add(polygonPath);
    canvas.add(textDisplaySize);
    canvas.add(textDisplayArea);

    historyManager = new HistoryManager(canvas);

    let movingCamera = false;
    let mouseLastClick = { x: 0, y: 0 };

    let textbox: Textbox;
    let shape: FabricObject;
    let drawingShape: boolean = false;
    let origin: XY;

    canvas.on('after:render', () => {
        zoom.set(canvas.getZoom());
        updateTextDisplayArea(canvas);
        totalPrice.set(calculateTotalPrice(get(canvasObjects)));
    });

    canvas.on('object:added', () => canvasObjects.set(getCanvasObjects(canvas)));
    canvas.on('object:removed', () => canvasObjects.set(getCanvasObjects(canvas)));

    canvas.on('mouse:dblclick', function ({ target }) {
        if (target) {
            target.set('editing', !(target.get('editing') ?? false));

            let editing = target.get('editing');

            if (editing) {
                target.hasBorders = false;
                target.cornerSize = 8;
                target.transparentCorners = false;

                if (target instanceof Polygon || target instanceof Polyline) {
                    target.controls = controlsUtils.createPolyControls(target);
                } else {
                    target.hasBorders = true;
                    target.controls = controlsUtils.createObjectDefaultControls();
                }
            } else {
                target.hasBorders = true;
                target.controls = controlsUtils.createObjectDefaultControls();

                if (target instanceof Polygon) {
                    target.setBoundingBox(false);
                }
            }
            target.setCoords();
            canvas.requestRenderAll();
        }
    });

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

            case Tool.Polygon: {
                addPolygonPoint(canvas.getScenePoint(event));
                polygonPath.set({
                    points: get(polygonPoints),
                    stroke: Cookies.get('colorscheme') === 'dark' ? 'white' : 'black'
                });

                polygonPath.setBoundingBox(true);
                polygonPath.setCoords();
                canvas.requestRenderAll();
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
                    stroke: Cookies.get('colorscheme') === 'dark' ? 'white' : 'black',
                    strokeWidth: 5,
                    radius: 0
                };

                if (getTool() === Tool.Square) shape = new Rect(options);
                else if (getTool() === Tool.Circle) shape = new Circle(options);
                else if (getTool() === Tool.Line) {
                    shape = new Polyline([origin, origin], options);
                    (shape as Polyline).setBoundingBox(true);
                    shape.controls = controlsUtils.createPolyControls(shape as Polyline);
                }

                shape.setCoords();

                applyObjectPermissions(canvas, shape, { selectable: false, cursor: 'crosshair' });

                if (shape instanceof Polyline) {
                    shape.hasBorders = false;
                    shape.cornerSize = 8;
                    shape.transparentCorners = false;
                }

                canvas.add(shape);
                break;
            }

            case Tool.Text: {
                const { x, y } = canvas.getScenePoint(event);

                textbox = new Textbox('', {
                    left: x,
                    top: y,
                    fill: Cookies.get('colorscheme') === 'dark' ? 'white' : 'black',
                    fontFamily: 'arial'
                });
                canvas.add(textbox);

                canvas.requestRenderAll();
                break;
            }
        }
    });

    canvas.on('mouse:up', function ({ e: event, target }) {
        textDisplaySize.visible = false;

        if (target) {
            target.set('startLeft', target.left);
            target.set('startTop', target.top);
        }

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

                    shape.setX(shape.left - GRID_SIZE);
                    shape.setY(shape.top - GRID_SIZE);
                } else if (shape instanceof Circle) {
                    shape.set({ radius: GRID_SIZE });

                    shape.setX(shape.left - GRID_SIZE);
                    shape.setY(shape.top - GRID_SIZE);
                } else if (shape instanceof Polyline) {
                    shape.set('points', [
                        { x: x - GRID_SIZE, y },
                        { x: x + GRID_SIZE, y }
                    ]);
                    shape.setBoundingBox(true);
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

            case Tool.Polygon: {
                const { x, y } = canvas.getScenePoint(event);
                polygonPath.set({
                    points: [
                        ...get(polygonPoints),
                        {
                            x,
                            y,
                            fill: null,
                            stroke: Cookies.get('colorscheme') === 'dark' ? 'white' : 'black',
                            strokeWidth: 5
                        }
                    ]
                });

                polygonPath.setBoundingBox(true);

                polygonPath.setCoords();
                canvas.requestRenderAll();
                break;
            }

            case Tool.Line:
            case Tool.Circle:
            case Tool.Square: {
                if (drawingShape) {
                    let { x, y } = canvas.getScenePoint(event);

                    if (origin.x > x) {
                        shape.set({ left: x });
                    }

                    if (origin.y > y) {
                        shape.set({ top: y });
                    }

                    if (shape instanceof Rect) {
                        let width = Math.abs(origin.x - x);
                        let height = Math.abs(origin.y - y);

                        if (event.shiftKey) {
                            width = Math.round(width / GRID_SIZE) * GRID_SIZE;
                            height = Math.round(height / GRID_SIZE) * GRID_SIZE;
                        }

                        if (event.ctrlKey) {
                            height = width;
                        }

                        shape.set({ width, height });
                    } else if (shape instanceof Circle) {
                        let radius = Math.max(Math.abs(origin.x - x), Math.abs(origin.y - y));

                        if (event.ctrlKey) {
                            radius = Math.round(radius / GRID_SIZE) * GRID_SIZE;
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
                        shape.setBoundingBox(true);
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
    if (
        !hasPermissions(user, project, ['allow_edit']) ||
        editingText ||
        event.target !== document.body
    )
        return;

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
        case 'Escape':
        case 's':
            if (event.ctrlKey) {
                event.preventDefault();

                const button = document.querySelector(
                    '#save-project-form>button'
                ) as HTMLButtonElement;
                button!.click();
                break;
            }
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
        case 'y':
            if (event.ctrlKey) {
                event.preventDefault();
                historyManager.redo();
                break;
            }
            break;
        case 'z':
            if (event.ctrlKey) {
                event.preventDefault();

                if (event.shiftKey) {
                    historyManager.redo();
                    break;
                }

                historyManager.undo();
                break;
            }
            break;
        case 'Backspace':
        case 'Delete':
            canvas.remove(...canvas.getActiveObjects());
            canvas.discardActiveObject();
            canvas.requestRenderAll();
            break;
        case 'Enter':
            if (getTool() === Tool.Polygon) {
                const points = get(polygonPoints);

                if (points.length < 3) {
                    spawn({
                        status: 'error',
                        message: `Ao menos 3 pontos são necessários.${
                            points.length === 2
                                ? ' Caso precise, utilize a ferramenta de linha ao invés da ferramenta de polígono.'
                                : ''
                        }`,
                        duration: 4000
                    });
                    return;
                }

                const polygon = new Polygon(points, {
                    fill: null,
                    stroke: Cookies.get('colorscheme') === 'dark' ? 'white' : 'black',
                    strokeWidth: 5
                });

                canvas.add(polygon);
                applyObjectPermissions(canvas, polygon, { selectable: false, cursor: 'crosshair' });

                setTool(Tool.Selection);

                canvas.setActiveObject(polygon);
                canvas.requestRenderAll();
            }
            break;
    }
}

export function handleSpaceBarPress(event: KeyboardEvent) {
    if (editingText || event.target !== document.body) return;

    if (event.key === ' ' && !spaceBarPressed) {
        spaceBarPressed = true;

        if (!getPreviousTool()) {
            setPreviousTool(getTool());
        }
        setTool(Tool.Hand);
    }
}

export function handleSpaceBarRelease(event: KeyboardEvent) {
    if (editingText || event.target !== document.body) return;

    if (event.key === ' ' && spaceBarPressed) {
        spaceBarPressed = false;

        if (getPreviousTool()) {
            setTool(getPreviousTool()!);
            setPreviousTool(undefined);
        }
    }
}

function handleObjectOperations(canvas: Canvas) {
    const SNAP_THRESHOLD = 100;

    function snapToGrid(value: number, gridSize: number = GRID_SIZE): number {
        return Math.round(value / gridSize) * gridSize;
    }

    function handleTransform(event: BasicTransformEvent<TPointerEvent> & { target: FabricObject }) {
        const { e, target, transform } = event;

        if (!target.get('startLeft') && !target.get('startTop')) {
            target.set('startLeft', target.left);
            target.set('startTop', target.top);
        }

        switch (transform.action) {
            case 'drag': {
                if (e.shiftKey) {
                    const deltaX = target.left - (target.get('startLeft') || 0);
                    const deltaY = target.top - (target.get('startTop') || 0);

                    if (Math.abs(deltaX) > Math.abs(deltaY)) {
                        target.top = target.get('startTop') || 0;
                    } else {
                        target.left = target.get('startLeft') || 0;
                    }
                }

                if (e.ctrlKey) {
                    let offset = target.strokeWidth - target.strokeWidth / 2;

                    if (target instanceof Polygon || target instanceof Polyline) {
                        offset = 0;
                    }

                    target.left = Math.round(target.left / GRID_SIZE) * GRID_SIZE - offset;
                    target.top = Math.round(target.top / GRID_SIZE) * GRID_SIZE - offset;
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

                const place = transform.corner;

                if (e.ctrlKey && target instanceof Rect) {
                    target.lockScalingFlip = true;

                    const { width, height, scaleX, scaleY, left, top } = target;
                    const originalWidth = (width ?? 0) * (scaleX ?? 1);
                    const originalHeight = (height ?? 0) * (scaleY ?? 1);
                    const currentLeft = left ?? 0;
                    const currentTop = top ?? 0;

                    const snapLeft = snapToGrid(currentLeft);
                    const snapTop = snapToGrid(currentTop);
                    const snapRight = snapToGrid(currentLeft + originalWidth);
                    const snapBottom = snapToGrid(currentTop + originalHeight);

                    const distLeft = Math.abs(snapLeft - currentLeft);
                    const distTop = Math.abs(snapTop - currentTop);
                    const distRight = Math.abs(snapRight - (currentLeft + originalWidth));
                    const distBottom = Math.abs(snapBottom - (currentTop + originalHeight));

                    let newScaleX = scaleX ?? 1;
                    let newScaleY = scaleY ?? 1;
                    let newLeft = currentLeft;
                    let newTop = currentTop;

                    switch (place) {
                        case 'tl':
                            if (distLeft < SNAP_THRESHOLD) {
                                newScaleX =
                                    (originalWidth - (snapLeft - currentLeft)) / (width ?? 1);
                                newLeft = snapLeft;
                            }
                            if (distTop < SNAP_THRESHOLD) {
                                newScaleY =
                                    (originalHeight - (snapTop - currentTop)) / (height ?? 1);
                                newTop = snapTop;
                            }
                            break;
                        case 'tr':
                            if (distRight < SNAP_THRESHOLD) {
                                newScaleX = (snapRight - currentLeft) / (width ?? 1);
                            }
                            if (distTop < SNAP_THRESHOLD) {
                                newScaleY =
                                    (originalHeight - (snapTop - currentTop)) / (height ?? 1);
                                newTop = snapTop;
                            }
                            break;
                        case 'bl':
                            if (distLeft < SNAP_THRESHOLD) {
                                newScaleX =
                                    (originalWidth - (snapLeft - currentLeft)) / (width ?? 1);
                                newLeft = snapLeft;
                            }
                            if (distBottom < SNAP_THRESHOLD) {
                                newScaleY = (snapBottom - currentTop) / (height ?? 1);
                            }
                            break;
                        case 'br':
                            if (distRight < SNAP_THRESHOLD) {
                                newScaleX = (snapRight - currentLeft) / (width ?? 1);
                            }
                            if (distBottom < SNAP_THRESHOLD) {
                                newScaleY = (snapBottom - currentTop) / (height ?? 1);
                            }
                            break;
                    }

                    target.set({
                        width:
                            target instanceof Rect
                                ? target.width * newScaleX
                                : (target as FabricObject).width,
                        height:
                            target instanceof Rect
                                ? target.height * newScaleY
                                : (target as FabricObject).height,
                        scaleX: target instanceof Rect ? 1 : (target as FabricObject).scaleX,
                        scaleY: target instanceof Rect ? 1 : (target as FabricObject).scaleY,
                        left: newLeft,
                        top: newTop
                    });
                }

                target.setCoords();

                target.set('rx', target.get('rx') * (1 * target.scaleX));
                target.set('ry', target.get('ry') * (1 * target.scaleY));

                target.set({
                    width: target instanceof Rect ? target.width * target.scaleX : target.width,
                    height: target instanceof Rect ? target.height * target.scaleY : target.height,
                    scaleX: target instanceof Rect ? 1 : target.scaleX,
                    scaleY: target instanceof Rect ? 1 : target.scaleY
                });

                textDisplaySize.set(
                    'text',
                    `${(parseInt((target.width * target.scaleX).toFixed(0)) / 100).toFixed(1)}mx${(
                        parseInt((target.height * target.scaleY).toFixed(0)) / 100
                    ).toFixed(1)}m`
                );

                const bounding = target.getBoundingRect();

                if (place === 'br') {
                    textDisplaySize.setX(bounding.left + bounding.width + 20);
                    textDisplaySize.setY(bounding.top + bounding.height + 20);
                } else if (place === 'bl') {
                    textDisplaySize.setX(bounding.left - 20 - textDisplaySize.width);
                    textDisplaySize.setY(bounding.top + bounding.height + 20);
                } else if (place === 'tr') {
                    textDisplaySize.setX(bounding.left + bounding.width + 20);
                    textDisplaySize.setY(bounding.top - 20 - textDisplaySize.height);
                } else if (place === 'tl') {
                    textDisplaySize.setX(bounding.left - 20 - textDisplaySize.width);
                    textDisplaySize.setY(bounding.top - 20 - textDisplaySize.height);
                }

                textDisplaySize.setCoords();
                target.setCoords();
                break;
            }

            case 'modifyPoly': {
                const polygon = target as Polygon;
                const currentPointIndex = parseInt(event.transform?.corner.replace('p', ''), 10);

                if (currentPointIndex !== undefined && polygon.points && event.e.ctrlKey) {
                    const point = polygon.points[currentPointIndex];

                    const matrix = polygon.calcTransformMatrix();
                    const invertedMatrix = util.invertTransform(matrix);

                    const globalPoint = new Point({
                        x: point.x - polygon.pathOffset.x,
                        y: point.y - polygon.pathOffset.y
                    }).transform(matrix);

                    const snappedGlobalPoint = {
                        x: Math.round(globalPoint.x / GRID_SIZE) * GRID_SIZE,
                        y: Math.round(globalPoint.y / GRID_SIZE) * GRID_SIZE
                    };

                    const localSnappedPoint = new Point(snappedGlobalPoint).transform(
                        invertedMatrix
                    );

                    point.x = localSnappedPoint.x + polygon.pathOffset.x;
                    point.y = localSnappedPoint.y + polygon.pathOffset.y;
                }

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
        textDisplaySize.visible = true;
        handleTransform(event);
    });

    canvas.on('object:rotating', function (event) {
        handleTransform(event);
    });

    canvas.on('object:modifyPoly', function (event) {
        handleTransform(event);
    });
}

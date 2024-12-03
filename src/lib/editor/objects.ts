import { getClipboard, setClipboard, wasCutOperation } from '$lib/stores/clipboard';
import {
    ActiveSelection,
    Canvas,
    Circle,
    controlsUtils,
    FabricObject,
    Group,
    Point,
    Polygon,
    Polyline,
    Rect,
    util,
    type XY
} from 'fabric';
import { applyObjectPermissions } from './permissions';
import { mouseCoords } from '$lib/stores/mouseCoords';
import { get } from 'svelte/store';

export interface CanvasObject {
    object: FabricObject;
    name: string;
    nameReset: string;
    price?: number;
    priceWall?: number;
    typeTranslated: string;
    type: string;
    componentID?: number;
    children?: CanvasObject[];
}

export function calculateTotalPrice(objects: CanvasObject[]): number {
    return objects.reduce((total, obj) => {
        const objectPrice = calculatePriceForArea(obj);

        const childrenPrice = obj.children ? calculateTotalPrice(obj.children) : 0;

        return total + objectPrice + childrenPrice;
    }, 0);
}

export function getCanvasObjects(canvas: Canvas, onlySelected: boolean = false): CanvasObject[] {
    function traverseObjects(objects: FabricObject[]): CanvasObject[] {
        return objects.map((object) => {
            let name = object.type;
            let typeTranslated = '';

            switch (name) {
                case 'rect':
                    name = 'Retângulo';
                    typeTranslated = 'Retângulo';
                    break;
                case 'circle':
                    name = 'Círculo';
                    typeTranslated = 'Círculo';
                    break;
                case 'path':
                    name = 'Desenho';
                    typeTranslated = 'Desenho';
                    break;
                case 'i-text':
                case 'textbox':
                    name = 'Texto sem conteúdo';
                    typeTranslated = 'Texto';
                    break;
                case 'group':
                    name = 'Grupo';
                    typeTranslated = 'Grupo';
                    break;
                case 'polygon':
                    name = `Polígono de ${object.get('points').length} pontos`;
                    typeTranslated = 'Polígono';
                    break;
                case 'polyline':
                    name = 'Linha';
                    typeTranslated = 'Linha';
                    break;
                default:
                    name = 'Objeto';
                    typeTranslated = 'Objeto';
                    break;
            }

            if ('text' in object) {
                name = object.text as string;
            }

            let nameReset = name;

            if ('name' in object) {
                name = object.name as string;
            }

            if ('id' in object) {
                typeTranslated = 'Componente';
            }

            return {
                object,
                name,
                nameReset,
                price: 'price' in object ? (object.price as number) : undefined,
                priceWall: 'priceWall' in object ? (object.priceWall as number) : undefined,
                typeTranslated,
                type: object.type,
                componentID: 'id' in object ? (object.id as number) : undefined,
                children: object instanceof Group ? traverseObjects(object.getObjects()) : undefined
            };
        });
    }

    let objects: FabricObject[];

    if (onlySelected) {
        objects = canvas?.getActiveObjects().filter((x) => x.selectable && x.evented) ?? [];
    } else {
        objects = canvas?.getObjects().filter((x) => x.selectable && x.evented) ?? [];
    }

    return traverseObjects(objects);
}

export function copyObjectsToClipboard(canvas: Canvas) {
    const object = canvas.getActiveObject();

    object?.clone().then((cloned) => {
        setClipboard(cloned);
    });
}

export function cutObjects(canvas: Canvas) {
    const object = canvas.getActiveObject();

    object?.clone().then((cloned) => {
        setClipboard(cloned, true);
        canvas.remove(...canvas.getActiveObjects());
        canvas.discardActiveObject();
        canvas.requestRenderAll();
    });
}

export async function pasteObjectsFromClipboard(canvas: Canvas, pasteAt?: XY) {
    const cloned = await getClipboard()?.clone();
    if (cloned === undefined) return;

    if (wasCutOperation()) {
        setClipboard(null, true);
    }

    canvas.discardActiveObject();

    const buffer = 10 * ~~!wasCutOperation();
    let left = cloned.left + buffer;
    let top = cloned.top + buffer;

    if (cloned instanceof Polyline || cloned instanceof Polygon) {
        cloned.controls = controlsUtils.createPolyControls(cloned);
    }

    if (pasteAt !== undefined || wasCutOperation()) {
        const bounds = cloned.getBoundingRect();

        left = (pasteAt ?? get(mouseCoords)).x - bounds.width / 2;
        top = (pasteAt ?? get(mouseCoords)).y - bounds.height / 2;
    }

    cloned.set({ left, top, evented: true });

    if (cloned instanceof ActiveSelection) {
        cloned.canvas = canvas;
        cloned.forEachObject((object) => canvas.add(object));

        cloned.setCoords();
    } else {
        canvas.add(cloned);
    }

    if (getClipboard() !== null) {
        getClipboard()!.top += buffer;
        getClipboard()!.left += buffer;
    }

    canvas.setActiveObject(cloned);
    canvas.requestRenderAll();
}

export function lockObject(canvas: Canvas, object: FabricObject, lock: boolean) {
    object.set('userlock', lock);

    applyObjectPermissions(canvas, object, {
        selectable: !lock,
        bordered: true
    });

    canvas.discardActiveObject();
    canvas.requestRenderAll();
}

export function calculateStrokeArea(obj: FabricObject): number {
    const strokeWidth = obj.strokeWidth ?? 0;

    if (strokeWidth === 0 || obj.stroke === null) {
        return 0;
    }

    if (obj instanceof Rect) {
        const scaledWidth = obj.width * obj.scaleX;
        const scaledHeight = obj.height * obj.scaleY;
        const perimeter = 2 * (scaledWidth + scaledHeight);
        return perimeter * strokeWidth;
    } else if (obj instanceof Circle) {
        const radius = (obj.width / 2) * obj.scaleX;
        const perimeter = 2 * Math.PI * radius;
        return perimeter * strokeWidth;
    } else if (obj instanceof Polygon || obj instanceof Polyline) {
        const points = obj.points ?? [];
        if (points.length < 2) return 0;

        let perimeter = 0;

        for (let i = 0; i < points.length; i++) {
            const current = points[i];
            const next = points[(i + 1) % points.length];
            const distance = Math.sqrt(
                Math.pow((next.x - current.x) * obj.scaleX, 2) +
                    Math.pow((next.y - current.y) * obj.scaleY, 2)
            );
            perimeter += distance;
        }

        return perimeter * strokeWidth;
    }

    return 0;
}

export function calculatePolygonArea(
    vertices: XY[],
    scaleX: number,
    scaleY: number,
    strokeWidth: number = 0
): number {
    let area = 0;
    const n = vertices.length;

    for (let i = 0; i < n; i++) {
        const current = vertices[i];
        const next = vertices[(i + 1) % n];

        const scaledCurrentX = current.x * scaleX;
        const scaledCurrentY = current.y * scaleY;
        const scaledNextX = next.x * scaleX;
        const scaledNextY = next.y * scaleY;

        area += scaledCurrentX * scaledNextY - scaledCurrentY * scaledNextX;
    }

    const areaInPixels = Math.abs(area) / 2;
    const areaInMeters = areaInPixels / 10000;

    const perimeter = calculatePolygonPerimeter(vertices, scaleX, scaleY);
    const strokeArea = perimeter * strokeWidth;

    return areaInMeters + strokeArea / 10000;
}

function calculatePolygonPerimeter(vertices: XY[], scaleX: number, scaleY: number): number {
    let perimeter = 0;
    const n = vertices.length;

    for (let i = 0; i < n; i++) {
        const current = vertices[i];
        const next = vertices[(i + 1) % n];

        const dx = (next.x - current.x) * scaleX;
        const dy = (next.y - current.y) * scaleY;

        perimeter += Math.sqrt(dx * dx + dy * dy);
    }

    return perimeter;
}

export function calculateRoundedRectangleArea(
    width: number,
    height: number,
    radius: number,
    strokeWidth: number = 0
): number {
    const adjustedWidth = width + strokeWidth;
    const adjustedHeight = height + strokeWidth;
    const adjustedRadius = radius + strokeWidth / 2;

    const rectangleArea = adjustedWidth * adjustedHeight;
    const cornerCutoutArea =
        4 * (Math.pow(adjustedRadius, 2) - (Math.PI * Math.pow(adjustedRadius, 2)) / 4);

    return rectangleArea - cornerCutoutArea;
}

export function calculateElipsisArea(
    width: number,
    height: number,
    scaleX: number,
    scaleY: number,
    strokeWidth: number = 0
): number {
    const adjustedWidth = width + strokeWidth;
    const adjustedHeight = height + strokeWidth;

    const radiusX = (adjustedWidth / 100 / 2) * scaleX;
    const radiusY = (adjustedHeight / 100 / 2) * scaleY;

    const baseArea = Math.PI * radiusX * radiusY * 10000;

    if (strokeWidth === 0) {
        return baseArea;
    }

    const outerRadiusX = radiusX + strokeWidth / 100 / 2;
    const outerRadiusY = radiusY + strokeWidth / 100 / 2;

    const outerArea = Math.PI * outerRadiusX * outerRadiusY * 10000;

    return outerArea;
}

export function calculateTotalArea(object: FabricObject): number {
    const scaledX = object.width * object.scaleX;
    const scaledY = object.height * object.scaleY;

    let totalArea = 0;

    if (object instanceof Rect) {
        totalArea = calculateRoundedRectangleArea(
            scaledX,
            scaledY,
            Math.max(object.rx, object.ry),
            object.stroke !== null ? object.strokeWidth : 0
        );
    } else if (object instanceof Circle) {
        totalArea = calculateElipsisArea(
            object.width,
            object.height,
            object.scaleX,
            object.scaleY,
            object.stroke !== null ? object.strokeWidth : 0
        );
    } else if (object instanceof Polygon) {
        totalArea = calculatePolygonArea(
            object.points,
            scaledX,
            scaledY,
            object.stroke !== null ? object.strokeWidth : 0
        );
    }

    return totalArea;
}

export function calculatePriceForArea(object: CanvasObject | FabricObject) {
    let obj = object;

    if (!(obj instanceof FabricObject)) {
        obj = obj.object;
    }

    return (
        (calculateTotalArea(obj) / 10000) * (obj.get('price') ?? 0) +
        (calculateStrokeArea(obj) / 10000) * (obj.get('price') ?? 0)
    );
}

export function group(canvas: Canvas) {
    const objs = canvas.getActiveObjects();

    if (objs.length < 2) {
        return;
    }

    const groupCenter = canvas.getActiveObject()?.getCenterPoint();

    const originalPositions = objs.map((object) => {
        const center = object.getCenterPoint();
        const bounding = object.getBoundingRect();
        return {
            object,
            originalLeft: center.x - bounding.width / 2,
            originalTop: center.y - bounding.height / 2
        };
    });

    const newGroup = new Group(objs, {
        canvas,
        left: groupCenter?.x || 0,
        top: groupCenter?.y || 0,
        originX: 'center',
        originY: 'center'
    });

    originalPositions.forEach(({ object, originalLeft, originalTop }) => {
        const groupLeft = newGroup.left || 0;
        const groupTop = newGroup.top || 0;

        object.left = originalLeft - groupLeft;
        object.top = originalTop - groupTop;
        object.setCoords();
    });

    newGroup.setCoords();

    canvas.discardActiveObject();
    canvas.remove(...objs);
    canvas.add(newGroup);
    canvas.setActiveObject(newGroup);
    canvas.requestRenderAll();
}

export async function ungroup(canvas: Canvas): Promise<void> {
    const activeObject = canvas.getActiveObject();

    if (activeObject && activeObject.type === 'group') {
        const group = activeObject as Group;
        const items = group.getObjects();

        canvas.remove(group);

        items.forEach(async (item) => {
            const matrix = group.calcTransformMatrix();
            const options = util.qrDecompose(matrix);

            const transformedPoint = new Point(item.left!, item.top!).transform(
                group.calcTransformMatrix()
            );

            const cloned = await item.clone(['id', 'name', 'userlock', 'price', 'priceWall']);

            cloned.left = transformedPoint.x;
            cloned.top = transformedPoint.y;
            cloned.angle += options.angle;
            cloned.scaleX *= options.scaleX;
            cloned.scaleY *= options.scaleY;

            cloned.setCoords();

            canvas.add(cloned);
        });

        canvas.discardActiveObject();
        canvas.requestRenderAll();
    }
}

import type { Project } from '$lib/projects';
import type { User } from '$lib/user';
import { hasPermissions } from '$lib/utils';
import { Canvas, FabricObject, Group, Path, Point, util } from 'fabric';

export async function renderFromData(
    canvas: Canvas,
    data: { content: any; user: User; project: Project }
) {
    const loadedCanvas = await canvas.loadFromJSON(data.content ?? {});

    if (!hasPermissions(data.user, data.project, ['allow_edit'])) {
        canvas.selection = false;
        loadedCanvas.forEachObject((object) => {
            setPermissionsForObject(canvas, object, false, true, 'grab');
        });
    }

    drawGrid(canvas, data);

    canvas.requestRenderAll();
}

export function setPermissionsForObject(
    canvas: Canvas,
    object: FabricObject,
    allowEdit: boolean,
    showBorders: boolean = false,
    cursor: string = 'default'
) {
    if (showBorders === false && allowEdit === true) {
        showBorders = true;
    }

    canvas.defaultCursor = cursor;
    canvas.setCursor(canvas.defaultCursor);

    object.lockMovementX = !allowEdit;
    object.lockMovementY = !allowEdit;
    object.lockRotation = !allowEdit;
    object.lockScalingX = !allowEdit;
    object.lockScalingY = !allowEdit;
    object.lockSkewingX = !allowEdit;
    object.lockSkewingY = !allowEdit;
    object.lockScalingFlip = !allowEdit;
    object.hasControls = allowEdit;
    object.hasBorders = showBorders;
    object.hoverCursor = !allowEdit ? cursor : null;
}

export function centerView(
    canvas: Canvas,
    data: { project: { width: number; height: number } },
    duration: number = 500
) {
    const currentZoom = canvas.getZoom();
    const targetZoom = 1;

    const viewWidth = canvas.width / targetZoom;
    const viewHeight = canvas.height / targetZoom;

    const targetX = (data.project.width * 100) / 2 - viewWidth / 2;
    const targetY = (data.project.height * 100) / 2 - viewHeight / 2;

    const currentTransform = canvas.viewportTransform || [1, 0, 0, 1, 0, 0];
    const currentX = -currentTransform[4];
    const currentY = -currentTransform[5];

    util.animate({
        startValue: 0,
        endValue: 1,
        duration,
        easing: util.ease.easeInOutCubic,
        onChange: (value: number) => {
            const interpolatedZoom = currentZoom + (targetZoom - currentZoom) * value;

            canvas.setZoom(interpolatedZoom);

            const interpolatedX = currentX + (targetX - currentX) * value;
            const interpolatedY = currentY + (targetY - currentY) * value;

            canvas.absolutePan(new Point(interpolatedX, interpolatedY));
        },
        onComplete: () => {
            canvas.setZoom(targetZoom);
            canvas.absolutePan(new Point(targetX, targetY));
        }
    });
}

export function centerViewOnObject(canvas: Canvas, object: FabricObject, duration: number = 500) {
    const currentZoom = canvas.getZoom();
    const targetZoom = 1;

    const boundingRect = object.getBoundingRect();

    const vpw = canvas.width / targetZoom;
    const vph = canvas.height / targetZoom;

    const objectCenterX = (boundingRect.left + boundingRect.width / 2) * targetZoom;
    const objectCenterY = (boundingRect.top + boundingRect.height / 2) * targetZoom;

    const targetX = objectCenterX - vpw / 2;
    const targetY = objectCenterY - vph / 2;

    const currentTransform = canvas.viewportTransform || [1, 0, 0, 1, 0, 0];
    const currentX = -currentTransform[4];
    const currentY = -currentTransform[5];

    util.animate({
        startValue: 0,
        endValue: 1,
        duration,
        easing: util.ease.easeInOutCubic,
        onChange: (value: number) => {
            const interpolatedZoom = currentZoom + (targetZoom - currentZoom) * value;

            canvas.setZoom(interpolatedZoom);

            const interpolatedX = currentX + (targetX - currentX) * value;
            const interpolatedY = currentY + (targetY - currentY) * value;

            canvas.absolutePan(new Point(interpolatedX, interpolatedY));
        },
        onComplete: () => {
            canvas.setZoom(targetZoom);
            canvas.absolutePan(new Point(targetX, targetY));
        }
    });
}

function drawGrid(canvas: Canvas, data: { project: Project }) {
    const gridSize = 100;
    const lines = [];

    for (let i = 0; i <= data.project.width; i++) {
        const x = i * gridSize;
        lines.push(`M ${x} 0 L ${x} ${data.project.height * gridSize}`);
    }

    for (let i = 0; i <= data.project.height; i++) {
        const y = i * gridSize;
        lines.push(`M 0 ${y} L ${data.project.width * gridSize} ${y}`);
    }

    const lineGroup = new Path(lines.join(' '), {
        fill: '',
        stroke: '#A3A3A3',
        strokeWidth: 2,
        strokeUniform: true,
        selectable: false,
        evented: false,
        objectCaching: false,
        opacity: 0.5,
        excludeFromExport: true
    });

    canvas.add(lineGroup);
    canvas.sendObjectToBack(lineGroup);
}

export interface CanvasObject {
    object: FabricObject;
    name: string;
    type: string;
    componentID?: number;
    children?: CanvasObject[];
}

export function getCanvasObjects(canvas: Canvas): CanvasObject[] {
    function traverseObjects(objects: FabricObject[]): CanvasObject[] {
        return objects.map((obj) => {
            if (obj.type === 'group' && obj instanceof Group) {
                return {
                    object: obj,
                    name: 'name' in obj ? (obj.name as string) : 'Grupo',
                    type: 'group',
                    componentID: 'id' in obj ? (obj.id as number) : undefined,
                    children: traverseObjects(obj.getObjects())
                };
            }

            let name = obj.type;

            if ('text' in obj) {
                name = obj.text as string;
            }

            if ('name' in obj) {
                name = (obj.name as string)[0].toUpperCase() + (obj.name as string).slice(1);
            }

            switch (name) {
                case 'rect':
                    name = 'Retângulo';
                    break;
                case 'circle':
                    name = 'Circulo';
                    break;
                case 'path':
                    name = 'Desenho';
                    break;
            }

            return {
                object: obj,
                name: name,
                type: obj.type
            };
        });
    }

    const objects = canvas?.getObjects().filter((x) => x.selectable && x.evented) ?? [];
    return traverseObjects(objects);
}

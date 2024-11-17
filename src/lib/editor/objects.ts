import { getClipboard, setClipboard, wasCutOperation } from '$lib/stores/clipboard';
import { ActiveSelection, Canvas, FabricObject, Group, type XY } from 'fabric';
import { applyObjectPermissions } from './permissions';
import { mouseCoords } from '$lib/stores/mouseCoords';
import { get } from 'svelte/store';

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

export function copyObjectsToClipboard(canvas: Canvas) {
    canvas
        .getActiveObject()
        ?.clone()
        .then((cloned) => {
            setClipboard(cloned);
        });
}

export function cutObjects(canvas: Canvas) {
    canvas
        .getActiveObject()
        ?.clone()
        .then((cloned) => {
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

    if (pasteAt !== undefined || wasCutOperation()) {
        left = (pasteAt ?? get(mouseCoords)).x - cloned.getBoundingRect().width / 2;
        top = (pasteAt ?? get(mouseCoords)).y - cloned.getBoundingRect().height / 2;
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
}

import { getClipboard, setClipboard } from '$lib/stores/clipboard';
import { ActiveSelection, Canvas, FabricObject, Group } from 'fabric';
import { applyObjectPermissions } from './permissions';

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

export async function pasteObjectsFromClipboard(canvas: Canvas) {
    const cloned = await getClipboard()?.clone();
    if (cloned === undefined) return;

    canvas.discardActiveObject();

    cloned.set({
        left: cloned.left + 10,
        top: cloned.top + 10,
        evented: true
    });

    if (cloned instanceof ActiveSelection) {
        cloned.canvas = canvas;
        cloned.forEachObject((object) => canvas.add(object));

        cloned.setCoords();
    } else {
        canvas.add(cloned);
    }

    getClipboard()!.top += 10;
    getClipboard()!.left += 10;

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

import type { Project } from '$lib/projects';
import type { User } from '$lib/user';
import { hasPermissions } from '$lib/utils';
import { Canvas, FabricObject, Group, Path, Point } from 'fabric';

export async function renderFromData(
    canvas: Canvas,
    data: { content: any; user: User; project: Project }
) {
    const loadedCanvas = await canvas.loadFromJSON(data.content ?? {});

    if (!hasPermissions(data.user, data.project, ['allow_edit'])) {
        loadedCanvas.forEachObject((object) => {
            object.selectable = false;
            object.hoverCursor = 'default';
        });
    }

    drawGrid(canvas, data);

    canvas.requestRenderAll();
}

export function centerView(canvas: Canvas, data: { project: Project }) {
    let zoom = canvas.getZoom();

    canvas.setZoom(1);

    const viewWidth = canvas.width / zoom;
    const viewHeight = canvas.height / zoom;
    const x = (data.project.width * 100) / 2 - viewWidth / 2;
    const y = (data.project.height * 100) / 2 - viewHeight / 2;

    canvas.absolutePan(new Point({ x: x, y: y }));
    canvas.setZoom(zoom);
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

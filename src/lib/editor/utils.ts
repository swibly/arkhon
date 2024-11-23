import type { Project } from '$lib/projects';
import type { User } from '$lib/user';
import { hasPermissions } from '$lib/utils';
import { Canvas, Path } from 'fabric';
import { applyObjectPermissions } from './permissions';

export async function loadCanvasFromData(
    canvas: Canvas,
    data: { content: any; user: User; project: Project }
) {
    const loadedCanvas = await canvas.loadFromJSON(data.content ?? {});

    if (!hasPermissions(data.user, data.project, ['allow_edit'])) {
        canvas.selection = false;
        loadedCanvas.forEachObject((object) => {
            applyObjectPermissions(canvas, object, {
                selectable: false,
                bordered: true,
                cursor: 'grab'
            });
        });
    }

    drawGrid(canvas, data);

    canvas.requestRenderAll();
}

export function updateCanvasDimensions(
    canvas: Canvas,
    body: HTMLElement,
    aside: HTMLElement,
    header: HTMLElement
) {
    if (!canvas) return;

    canvas.setDimensions({
        width: body.clientWidth - aside.clientWidth,
        height: body.clientHeight - header.clientHeight
    });
}

export function drawGrid(canvas: Canvas, data: { project: Project }) {
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
        strokeWidth: 1,
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

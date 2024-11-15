import type { Project } from '$lib/projects';
import type { User } from '$lib/user';
import { hasPermissions } from '$lib/utils';
import { Canvas, Group, Line, Path, Point } from 'fabric';

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

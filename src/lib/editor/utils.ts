import type { Project } from '$lib/projects';
import type { User } from '$lib/user';
import { hasPermissions } from '$lib/utils';
import { Canvas, Group, Line, Point } from 'fabric';

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

    const gridSize = 100;
    const lines = [];

    for (let i = 0; i <= data.project.width; i++) {
        const x = i * gridSize;
        lines.push(
            new Line([x, 0, x, data.project.height * gridSize], {
                stroke: '#A3A3A3',
                strokeWidth: 1,
                strokeUniform: true,
                opacity: 0.5,
                selectable: false,
                evented: false
            })
        );
    }

    for (let i = 0; i <= data.project.height; i++) {
        const y = i * gridSize;
        lines.push(
            new Line([0, y, data.project.width * gridSize, y], {
                stroke: '#A3A3A3',
                strokeWidth: 1,
                strokeUniform: true,
                opacity: 0.5,
                selectable: false,
                evented: false
            })
        );
    }

    const lineGroup = new Group(lines, {
        selectable: false,
        evented: false,
        excludeFromExport: true
    });

    canvas.add(lineGroup);
    canvas.sendObjectToBack(lineGroup);
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

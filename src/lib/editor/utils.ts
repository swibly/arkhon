import type { Project } from '$lib/projects';
import type { User } from '$lib/user';
import { Canvas, Line } from 'fabric';

export async function renderFromData(
    canvas: Canvas,
    data: { content: any; user: User; project: Project }
) {
    const loadedCanvas = await canvas.loadFromJSON(data.content ?? {});

    if (
        data.user.id !== data.project.owner_id &&
        !data.project.allowed_users.some((x) => x.id === data.user.id && x.allow_edit)
    ) {
        loadedCanvas.forEachObject((object) => {
            object.lockMovementX = true;
            object.lockMovementY = true;
            object.lockRotation = true;
            object.lockScalingX = true;
            object.lockScalingY = true;
            object.lockSkewingX = true;
            object.lockSkewingY = true;
            object.hasControls = false;
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
                strokeWidth: 2,
                selectable: false,
                evented: false,
                strokeUniform: true,
                opacity: 1,
                excludeFromExport: true
            })
        );
    }

    for (let i = 0; i <= data.project.height; i++) {
        const y = i * gridSize;
        lines.push(
            new Line([0, y, data.project.width * gridSize, y], {
                stroke: '#A3A3A3',
                strokeWidth: 2,
                selectable: false,
                evented: false,
                strokeUniform: true,
                opacity: 1,
                excludeFromExport: true
            })
        );
    }

    canvas.add(...lines);
    canvas.requestRenderAll();
}

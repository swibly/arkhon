import { polygonPath } from '$lib/editor/eventListeners';
import { applyCanvasPermission } from '$lib/editor/permissions';
import { Canvas, PencilBrush, type XY } from 'fabric';
import { get, writable } from 'svelte/store';

export enum Tool {
    Hand,
    Selection,
    Brush,
    Text,
    Line,
    Square,
    Circle,
    Polygon
}

export const tool = writable<Tool>(Tool.Selection);
export const previousTool = writable<Tool | undefined>(undefined);
export const polygonPoints = writable<XY[]>([]);

export const tools = [
    {
        name: 'Mover (H)',
        icon: 'bxs:hand',
        tool: Tool.Hand
    },
    {
        name: 'Seleção (S)',
        icon: 'material-symbols:select',
        tool: Tool.Selection
    },
    {
        name: 'Pintura livre (B)',
        icon: 'material-symbols:brush',
        tool: Tool.Brush
    },
    {
        name: 'Texto (T)',
        icon: 'ci:text',
        tool: Tool.Text
    },
    {
        name: 'Linha (L)',
        icon: 'pepicons-pop:line-x',
        tool: Tool.Line
    },
    {
        name: 'Retângulo (Q)',
        icon: 'ic:twotone-square',
        tool: Tool.Square
    },
    {
        name: 'Círculo (C)',
        icon: 'ic:twotone-circle',
        tool: Tool.Circle
    },
    {
        name: 'Polígono (P)',
        icon: 'oui:polygon',
        tool: Tool.Polygon
    }
];

export function getTool(): Tool {
    return get(tool);
}

export function getPreviousTool(): Tool | undefined {
    return get(previousTool);
}

export function setTool(selectedTool: Tool) {
    tool.set(selectedTool);
    polygonPoints.set([]);
    polygonPath.set({ points: get(polygonPoints) });
}

export function setPreviousTool(selectedTool: Tool | undefined) {
    previousTool.set(selectedTool);
}

export function addPolygonPoint(point: XY) {
    polygonPoints.set([...get(polygonPoints), point]);
}

export function getLastPoint(): XY | null {
    const points = get(polygonPoints);

    if (points.length === 0) {
        return null;
    }

    return points[points.length - 1];
}

export function applyCanvasPermissionsBasedOnTool(canvas: Canvas, currentTool: Tool) {
    if (canvas === undefined) return;

    switch (currentTool) {
        case Tool.Selection:
            applyCanvasPermission(canvas, { selectable: true });
            break;

        case Tool.Brush:
            applyCanvasPermission(canvas, { selectable: false, cursor: 'crosshair' });
            canvas.isDrawingMode = true;
            canvas.freeDrawingBrush = new PencilBrush(canvas);
            canvas.freeDrawingBrush.width = 10;
            break;

        case Tool.Hand:
            applyCanvasPermission(canvas, { selectable: false, cursor: 'grab' });
            break;

        case Tool.Text:
            applyCanvasPermission(canvas, { selectable: false, cursor: 'text' });
            break;

        case Tool.Polygon:
        case Tool.Line:
        case Tool.Square:
        case Tool.Circle:
            applyCanvasPermission(canvas, { selectable: false, cursor: 'crosshair' });
            break;
    }
}

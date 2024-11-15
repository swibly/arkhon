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
        name: 'Quadrado (Q)',
        icon: 'ic:twotone-square',
        tool: Tool.Square
    },
    {
        name: 'Circulo (C)',
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

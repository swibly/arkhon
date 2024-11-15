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
        name: 'Mover',
        icon: 'bxs:hand',
        tool: Tool.Hand
    },
    {
        name: 'Seleção',
        icon: 'material-symbols:select',
        tool: Tool.Selection
    },
    {
        name: 'Pintura livre',
        icon: 'material-symbols:brush',
        tool: Tool.Brush
    },
    {
        name: 'Texto',
        icon: 'ci:text',
        tool: Tool.Text
    },
    {
        name: 'Linha',
        icon: 'pepicons-pop:line-x',
        tool: Tool.Line
    },
    {
        name: 'Quadrado',
        icon: 'ic:twotone-square',
        tool: Tool.Square
    },
    {
        name: 'Circulo',
        icon: 'ic:twotone-circle',
        tool: Tool.Circle
    },
    {
        name: 'Polígono',
        icon: 'oui:polygon',
        tool: Tool.Polygon
    }
];

export function getTool(): Tool {
    return get(tool);
}

import { get, writable } from 'svelte/store';

export enum Tool {
    Hand,
    Brush
}

export const tool = writable<Tool>(Tool.Brush);

export function getTool(): Tool {
    return get(tool);
}

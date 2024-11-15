import { get, writable } from 'svelte/store';

export enum Tool {
    Hand,
    Selection,
    Brush
}

export const tool = writable<Tool>(Tool.Selection);

export const tools = [
  {
    name: 'Mover câmera',
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
  }
];

export function getTool(): Tool {
    return get(tool);
}

import type { XY } from 'fabric';
import { writable } from 'svelte/store';

export const mouseCoords = writable<XY>({ x: 0, y: 0 });

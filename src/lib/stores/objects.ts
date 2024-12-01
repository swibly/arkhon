import type { CanvasObject } from '$lib/editor/objects';
import { writable } from 'svelte/store';

export const canvasObjects = writable<CanvasObject[]>([]);

export const currentObjectBorderWidth = writable<number>(0);
export const currentObjectRoundness = writable<number>(0);
export const currentObjectOpacity = writable<number>(0);

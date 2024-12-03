import type { CanvasObject } from '$lib/editor/objects';
import { writable } from 'svelte/store';

export const canvasObjects = writable<CanvasObject[]>([]);
export const totalPrice = writable<number>(0);

export const currentObjectBorderWidth = writable<number>(0);
export const currentObjectRoundness = writable<number>(0);
export const currentObjectOpacity = writable<number>(0);
export const currentFontSize = writable<number>(0);

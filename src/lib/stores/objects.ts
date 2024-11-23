import type { CanvasObject } from '$lib/editor/objects';
import { writable } from 'svelte/store';

export const canvasObjects = writable<CanvasObject[]>([]);

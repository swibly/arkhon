import { FabricObject } from 'fabric';
import { get, writable } from 'svelte/store';

export const objectClipboard = writable<FabricObject | null>(null);

export function setClipboard(objects: FabricObject | null) {
    objectClipboard.set(objects);
}

export function getClipboard(): FabricObject | null {
    return get(objectClipboard);
}

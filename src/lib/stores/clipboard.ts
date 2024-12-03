import { FabricObject } from 'fabric';
import { get, writable } from 'svelte/store';

export const objectClipboard = writable<FabricObject | null>(null);
export const cutOperation = writable<boolean>(false);

export function setClipboard(objects: FabricObject | null, cut: boolean = false) {
    objectClipboard.set(objects);
    cutOperation.set(cut);
}

export function getClipboard(): FabricObject | null {
    return get(objectClipboard);
}

export function wasCutOperation(): boolean {
    return get(cutOperation);
}

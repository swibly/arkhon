import { writable, type Writable } from 'svelte/store';

let initialShortcut = 'true';

if (typeof window !== 'undefined') {
    initialShortcut = localStorage.getItem('shorcut') || 'true';
}

export const shortcut: Writable<boolean> = writable(initialShortcut === 'true' ? true : false);

export function enableShortcut() {
    shortcut.set(true);

    if (typeof window !== 'undefined') {
        localStorage.setItem('shortcut', 'true');
    }
}

export function disableShortcut() {
    shortcut.set(false);

    if (typeof window !== 'undefined') {
        localStorage.setItem('shortcut', 'false');
    }
}

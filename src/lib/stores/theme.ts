import { writable, type Writable } from 'svelte/store';

export const lightMode: Writable<boolean> = writable(true);

export function toggle() {
    lightMode.update((e) => {
        localStorage.setItem('theme', `${!e}`);
        return !e;
    });
}

export function convertLight() {
    lightMode.update(() => {
        localStorage.setItem('theme', `${true}`);
        return true;
    });
}

export function convertDark() {
    lightMode.update(() => {
        localStorage.setItem('theme', `${false}`);
        return false;
    });
}

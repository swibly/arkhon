import { writable, type Writable } from 'svelte/store';

export const lightMode: Writable<boolean> = writable(true);

export function toggle() {
    lightMode.update((e) => {
        localStorage.setItem("theme", `${!e}`)
        return !e;
    });
}

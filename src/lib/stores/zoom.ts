import { writable } from 'svelte/store';

export const zoom = writable<number>(1);

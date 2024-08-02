import { writable, type Writable } from 'svelte/store';

export const language: Writable<string> = writable("pt");

export function changeLanguage(value: string){
    language.set(value);
}
import { writable, type Writable } from 'svelte/store';

let initialLanguage = 'pt';

if (typeof window !== 'undefined') {    
    initialLanguage = localStorage.getItem('language') || 'pt';
}

export const language: Writable<string> = writable(initialLanguage);

export function changeLanguage(value: string) {        
    language.set(value);
    
    if (typeof window !== 'undefined') {
        localStorage.setItem("language", value);
    }
}

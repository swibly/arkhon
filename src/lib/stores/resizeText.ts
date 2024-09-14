import { writable, type Writable } from 'svelte/store';

let initialSize = '100%';

if (typeof window !== 'undefined') {    
    initialSize = localStorage.getItem('size') || '100%';
}

export const resizeText: Writable<string> = writable(initialSize);

export function changeSize(value: string) {        
    resizeText.set(value);
    
    if (typeof window !== 'undefined') {
        localStorage.setItem("size", value);
    }
}

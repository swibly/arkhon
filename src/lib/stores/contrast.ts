import { writable, type Writable } from 'svelte/store';

let initialContrast = 'true';

if (typeof window !== 'undefined') {    
    initialContrast = localStorage.getItem('contrast') || 'true';
}

export const contrast: Writable<boolean> = writable(initialContrast === 'true' ? true : false);

export function enableContrast() {
    contrast.set(true);

    if (typeof window !== 'undefined') {        
        localStorage.setItem("contrast", 'true');
    }
}

export function disableContrast() {
    contrast.set(false);

    if (typeof window !== 'undefined') {        
        localStorage.setItem("contrast", 'false');
    }    
}

let initialType = 'Tipo 1';

if (typeof window !== 'undefined') {    
    initialType = localStorage.getItem('contrastType') || 'Tipo 1';
}

export const contrastType: Writable<string> = writable(initialType);

export function changeContrast(value: string) {        
    contrastType.set(value);
    
    if (typeof window !== 'undefined') {
        localStorage.setItem("contrastType", value);
    }
}

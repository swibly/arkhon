import { writable, type Writable } from 'svelte/store';

let initialContrast = 'false';

if (typeof window !== 'undefined') {    
    initialContrast = localStorage.getItem('contrast') || 'false';
}

export const contrast: Writable<boolean> = writable(initialContrast === 'false' ? false : true);

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

let initialType = 'night';

if (typeof window !== 'undefined') {    
    initialType = localStorage.getItem('contrastType') || 'night';
}

export const contrastType: Writable<string> = writable(initialType);

export function changeContrast(value: string) {        
    contrastType.set(value);
    
    if (typeof window !== 'undefined') {
        localStorage.setItem("contrastType", value);
    }
}

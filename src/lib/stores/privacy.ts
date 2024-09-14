import { writable, type Writable } from 'svelte/store';

let initialPrivacy = 'true';

if (typeof window !== 'undefined') {    
    initialPrivacy = localStorage.getItem('privacy') || 'true';
}

export const privacy: Writable<boolean> = writable(initialPrivacy === 'true' ? true : false);

export function enablePrivacy() {
    privacy.set(true);

    if (typeof window !== 'undefined') {        
        localStorage.setItem("privacy", 'true');
    }
}

export function disablePrivacy() {
    privacy.set(false);

    if (typeof window !== 'undefined') {        
        localStorage.setItem("privacy", 'false');
    }    
}

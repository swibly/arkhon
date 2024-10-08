import { writable, type Writable } from 'svelte/store';

let initialNotification = 'true';

if (typeof window !== 'undefined') {    
    initialNotification = localStorage.getItem('notification') || 'true';
}

export const notification: Writable<boolean> = writable(initialNotification === 'true' ? true : false);

export function enableNotification() {
    notification.set(true);

    if (typeof window !== 'undefined') {        
        localStorage.setItem("notification", 'true');
    }
}

export function disableNotification() {
    notification.set(false);

    if (typeof window !== 'undefined') {        
        localStorage.setItem("notification", 'false');
    }    
}

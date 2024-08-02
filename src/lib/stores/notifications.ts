import { writable, type Writable } from 'svelte/store';

export const notification: Writable<boolean> = writable(true);

export function changeNotification(value: boolean){
    notification.update((e) => {
        localStorage.setItem("notification", `${!notification}`)
        return !notification;
    })
}
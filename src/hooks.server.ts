import type { Handle } from "@sveltejs/kit";

export const handle: Handle = async function ({ event, resolve }) {
    console.log(event.cookies.get("key"));
    return await resolve(event);
}

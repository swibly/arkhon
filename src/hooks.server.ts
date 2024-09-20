import { redirect, type Handle } from '@sveltejs/kit';
import { client } from '$lib/server/swibly-api';

export const handle: Handle = async function ({ event, resolve }) {
    const unauthorizedRoutes = [
        '/',
        '/login',
        '/register',
        '/forgot',
        '/forgot/otp',
        '/forgot/otp/change'
    ];
    const token = event.cookies.get('key');

    if (unauthorizedRoutes.includes(event.url.pathname)) {
        if (token && (await client.auth.isValid(token))) {
            throw redirect(302, '/home');
        }
    } else {
        if (!token || (token && !(await client.auth.isValid(token)))) {
            throw redirect(302, '/');
        }
    }

    return await resolve(event);
};
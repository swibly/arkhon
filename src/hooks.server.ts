import { redirect, type Handle } from '@sveltejs/kit';
import { JWT_TOKEN_COOKIE_NAME } from '$env/static/private';

export const handle: Handle = async function ({ event, resolve }) {
    const UNAUTHORIZED_ROUTES = ['/login', '/register', '/tos', '/forgot'];

    const token = event.cookies.get(JWT_TOKEN_COOKIE_NAME);

    if (event.url.pathname === '/' || UNAUTHORIZED_ROUTES.some((path: string) => event.url.pathname.startsWith(path))) {
        if (token) {
            throw redirect(302, '/home');
        }
    } else {
        if (!token) {
            throw redirect(302, '/login');
        }
    }

    return await resolve(event);
};

import { THEME_COOKIE_NAME, THEME_COOKIE_OPTS } from '$lib/stores/theme';
import { redirect, type Handle } from '@sveltejs/kit';
import { JWT_TOKEN_COOKIE_NAME } from '$env/static/private';

export const handle: Handle = async function ({ event, resolve }) {
    let theme: string | undefined = event.cookies.get(THEME_COOKIE_NAME);

    if (theme === undefined) {
        event.cookies.set(THEME_COOKIE_NAME, 'light', THEME_COOKIE_OPTS);
    }

    const UNAUTHORIZED_ROUTES = ['/login', '/register', '/forgot'];
    const AVAILABLE_ALL_TIMES_ROUTES = ['/tos', '/support'];

    const token = event.cookies.get(JWT_TOKEN_COOKIE_NAME);

    if (
        event.url.pathname === '/' ||
        AVAILABLE_ALL_TIMES_ROUTES.some((path: string) => event.url.pathname.startsWith(path))
    ) {
        return await resolve(event, {
            transformPageChunk: ({ html }) => html.replace('data-theme=""', `data-theme="${theme}"`)
        });
    }

    if (UNAUTHORIZED_ROUTES.some((path: string) => event.url.pathname.startsWith(path))) {
        if (token) {
            throw redirect(302, '/home');
        }
    } else {
        if (!token) {
            throw redirect(302, '/login');
        }
    }

    return await resolve(event, {
        transformPageChunk: ({ html }) => html.replace('data-theme=""', `data-theme="${theme}"`)
    });
};

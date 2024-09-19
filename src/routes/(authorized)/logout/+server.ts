import { JWT_TOKEN_COOKIE_NAME } from '$env/static/private';
import { redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = function ({ cookies }) {
    cookies.delete(JWT_TOKEN_COOKIE_NAME, { path: '/' });
    throw redirect(302, '/');
};

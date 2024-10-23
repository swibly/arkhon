import { JWT_TOKEN_COOKIE_NAME } from '$env/static/private';
import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async function ({ cookies }) {
    const token = cookies.get(JWT_TOKEN_COOKIE_NAME);

    if (token !== undefined) {
        throw redirect(304, '/home');
    }
};

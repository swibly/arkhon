import { JWT_TOKEN_COOKIE_NAME } from '$env/static/private';
import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';
import { getUserByToken } from '$lib/user';

export const load: LayoutServerLoad = async function ({ cookies }) {
    const token = cookies.get(JWT_TOKEN_COOKIE_NAME)!;

    let user = await getUserByToken(token);

    if (user === null) {
        throw redirect(302, '/logout');
    }

    return user!;
};

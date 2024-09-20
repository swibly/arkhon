import { JWT_TOKEN_COOKIE_NAME } from '$env/static/private';
import { getUserByUsername } from '$lib/utils';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async function ({ cookies, params }) {
    const user = await getUserByUsername(cookies.get(JWT_TOKEN_COOKIE_NAME)!, params.username);

    if (user === null) {
        return {
            error: 'Usuário não existe.'
        };
    }

    return {
        lookup: user!
    };
};

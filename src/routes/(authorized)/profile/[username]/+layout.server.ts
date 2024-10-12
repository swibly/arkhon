import { JWT_TOKEN_COOKIE_NAME } from '$env/static/private';
import { getUserByUsername, isFollowing } from '$lib/user';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async function ({ cookies, params }) {
    const jwt = cookies.get(JWT_TOKEN_COOKIE_NAME)!;

    const user = await getUserByUsername(jwt, params.username);

    if (user === null) {
        return { error: 'Usuário não existe.' };
    }

    return {
        lookup: user!,
        isFollowing: await isFollowing(jwt, params.username)!
    };
};

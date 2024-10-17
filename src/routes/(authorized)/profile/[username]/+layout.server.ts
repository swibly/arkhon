import { JWT_TOKEN_COOKIE_NAME } from '$env/static/private';
import { getUserByUsername, isFollowing } from '$lib/user';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async function ({ cookies, params }) {
    const jwt = cookies.get(JWT_TOKEN_COOKIE_NAME)!;

    const user = await getUserByUsername(jwt, params.username);

    if (user.status === 200) {
        return {
            lookup: user!,
            isFollowing: await isFollowing(jwt, params.username)!
        };
    } else if (user.status === 404) {
        return { error: 'Este usuário não existe.' };
    } else if (user.status === 403) {
        return { error: 'Este usuário desabilitou outros de verem seu perfil.' };
    } else {
        return {
            // @ts-ignore
            error: user.error
        };
    }
};

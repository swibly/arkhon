import { JWT_TOKEN_COOKIE_NAME } from '$env/static/private';
import { follow, getUserByUsername, isFollowing, unfollow } from '$lib/utils';

import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async function ({ cookies, params }) {
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

export const actions: Actions = {
    follow: async function ({ cookies, params }) {
        const jwt = cookies.get(JWT_TOKEN_COOKIE_NAME)!;

        await follow(jwt, params.username);
    },
    unfollow: async function ({ cookies, params }) {
        const jwt = cookies.get(JWT_TOKEN_COOKIE_NAME)!;

        await unfollow(jwt, params.username);
    }
};

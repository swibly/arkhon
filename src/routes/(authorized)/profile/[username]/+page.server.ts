import { JWT_TOKEN_COOKIE_NAME } from '$env/static/private';
import { getProjectsByUser } from '$lib/projects';
import { follow, getUserByUsername, isFollowing, unfollow } from '$lib/user';

import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async function ({ cookies, params }) {
    const jwt = cookies.get(JWT_TOKEN_COOKIE_NAME)!;

    const user = await getUserByUsername(jwt, params.username);

    if (user === null) {
        return { error: 'Usuário não existe.' };
    }

    const projects = await getProjectsByUser(jwt, params.username);
    const favorites = await getProjectsByUser(jwt, params.username, true);

    return {
        lookup: user!,
        isFollowing: await isFollowing(jwt, params.username)!,
        projects: projects!,
        favorites: favorites!
    };
};

export const actions: Actions = {
    follow: async function ({ cookies, params }) {
        const jwt = cookies.get(JWT_TOKEN_COOKIE_NAME)!;

        await follow(jwt, params.username!);
    },
    unfollow: async function ({ cookies, params }) {
        const jwt = cookies.get(JWT_TOKEN_COOKIE_NAME)!;

        await unfollow(jwt, params.username!);
    }
};

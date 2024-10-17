import { JWT_TOKEN_COOKIE_NAME } from '$env/static/private';
import { favorite, unfavorite } from '$lib/projects';
import type { Actions } from './$types';

export const actions: Actions = {
    favorite: async function ({ cookies, params }) {
        const jwt = cookies.get(JWT_TOKEN_COOKIE_NAME)!;

        await favorite(jwt, parseInt(params.project));
    },
    unfavorite: async function ({ cookies, params }) {
        const jwt = cookies.get(JWT_TOKEN_COOKIE_NAME)!;

        await unfavorite(jwt, parseInt(params.project));
    }
};

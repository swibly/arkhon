import { JWT_TOKEN_COOKIE_NAME } from '$env/static/private';
import {
    deleteProject,
    favorite,
    forkProject,
    restoreProject,
    unfavorite,
    unlinkProject,
    unsafeDeleteProject
} from '$lib/projects';
import type { Actions } from './$types';

export const actions: Actions = {
    clone: async function ({ cookies, params }) {
        const jwt = cookies.get(JWT_TOKEN_COOKIE_NAME)!;

        return {
            ...(await forkProject(jwt, parseInt(params.project)))
        };
    },
    unlink: async function ({ cookies, params }) {
        const jwt = cookies.get(JWT_TOKEN_COOKIE_NAME)!;

        await unlinkProject(jwt, parseInt(params.project));
    },
    delete: async function ({ cookies, params }) {
        const jwt = cookies.get(JWT_TOKEN_COOKIE_NAME)!;

        await deleteProject(jwt, parseInt(params.project));
    },
    unsafeDelete: async function ({ cookies, params }) {
        const jwt = cookies.get(JWT_TOKEN_COOKIE_NAME)!;

        await unsafeDeleteProject(jwt, parseInt(params.project));
    },
    restore: async function ({ cookies, params }) {
        const jwt = cookies.get(JWT_TOKEN_COOKIE_NAME)!;

        await restoreProject(jwt, parseInt(params.project));
    },
    favorite: async function ({ cookies, params }) {
        const jwt = cookies.get(JWT_TOKEN_COOKIE_NAME)!;

        await favorite(jwt, parseInt(params.project));
    },
    unfavorite: async function ({ cookies, params }) {
        const jwt = cookies.get(JWT_TOKEN_COOKIE_NAME)!;

        await unfavorite(jwt, parseInt(params.project));
    }
};

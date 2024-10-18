import { JWT_TOKEN_COOKIE_NAME } from '$env/static/private';
import { getProjectsByUser } from '$lib/projects';
import { getPaginationOptionsFromURL } from '$lib/utils';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async function ({ cookies, params, url }) {
    const projects = await getProjectsByUser(
        cookies.get(JWT_TOKEN_COOKIE_NAME)!,
        params.username,
        true,
        getPaginationOptionsFromURL(url)
    );

    return {
        projects: projects!
    };
};

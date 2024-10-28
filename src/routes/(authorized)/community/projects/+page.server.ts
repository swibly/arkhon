import { JWT_TOKEN_COOKIE_NAME } from '$env/static/private';
import { getPublicProjects } from '$lib/projects';
import { getPaginationOptionsFromURL } from '$lib/utils';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async function ({ cookies, url }) {
    const projects = await getPublicProjects(
        cookies.get(JWT_TOKEN_COOKIE_NAME)!,
        getPaginationOptionsFromURL(url)
    );

    return {
        projects: projects!
    };
};

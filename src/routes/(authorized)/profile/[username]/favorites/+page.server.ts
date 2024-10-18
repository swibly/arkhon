import { JWT_TOKEN_COOKIE_NAME } from '$env/static/private';
import { getProjectsByUser } from '$lib/projects';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async function ({ cookies, params, url }) {
    let page = 1;
    let limit = 15;

    url.searchParams.forEach((value, key) => {
        if (key === 'page') {
            page = parseInt(value);
        } else if (key === 'limit') {
            limit = parseInt(value);
        }
    });

    const projects = await getProjectsByUser(
        cookies.get(JWT_TOKEN_COOKIE_NAME)!,
        params.username,
        true,
        {
            page,
            limit
        }
    );

    return {
        projects: projects!
    };
};

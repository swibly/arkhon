import { JWT_TOKEN_COOKIE_NAME } from '$env/static/private';
import { getContentByProjectId } from '$lib/projects';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async function ({ cookies, params }) {
    return {
        content: await getContentByProjectId(
            cookies.get(JWT_TOKEN_COOKIE_NAME)!,
            parseInt(params.project)
        )
    };
};

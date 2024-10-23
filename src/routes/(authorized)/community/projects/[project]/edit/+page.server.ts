import type { PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';
import { getContentByProjectId } from '$lib/projects';
import { JWT_TOKEN_COOKIE_NAME } from '$env/static/private';

export const load: PageServerLoad = async ({ cookies, params }) => {
    let projectID: number = parseInt(params.project);

    if (isNaN(projectID)) {
        throw error(400, 'Código de projeto inválido');
    }

    return { content: await getContentByProjectId(cookies.get(JWT_TOKEN_COOKIE_NAME)!, projectID) };
};

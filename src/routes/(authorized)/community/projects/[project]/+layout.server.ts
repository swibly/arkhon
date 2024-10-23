import { error } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';
import { getProjectByID } from '$lib/projects';
import { JWT_TOKEN_COOKIE_NAME } from '$env/static/private';

export const load: LayoutServerLoad = async function ({ cookies, params }) {
    let projectID: number = parseInt(params.project);

    if (isNaN(projectID)) {
        throw error(400, 'Código de projeto inválido');
    }

    const projectInfo = await getProjectByID(cookies.get(JWT_TOKEN_COOKIE_NAME)!, projectID);

    if (projectInfo.error !== undefined) {
        throw error(projectInfo.status, projectInfo.error);
    }

    return {
        project: projectInfo.data
    };
};

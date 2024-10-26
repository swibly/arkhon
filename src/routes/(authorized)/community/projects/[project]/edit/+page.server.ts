import type { PageServerLoad } from './$types';
import type { Actions } from './$types';
import { error } from '@sveltejs/kit';
import { getContentByProjectId, saveProjectContent } from '$lib/projects';
import { JWT_TOKEN_COOKIE_NAME } from '$env/static/private';

export const load: PageServerLoad = async ({ cookies, params }) => {
    let projectID: number = parseInt(params.project);

    if (isNaN(projectID)) {
        throw error(400, 'Código de projeto inválido');
    }

    return { content: await getContentByProjectId(cookies.get(JWT_TOKEN_COOKIE_NAME)!, projectID) };
};


export const actions: Actions = {
    save: async function ({ cookies, params, request }) {
        const jwt = cookies.get(JWT_TOKEN_COOKIE_NAME)!;
        const data = await request.formData();

        const canvas = data.get('json');                
        
        await saveProjectContent(jwt, parseInt(params.project), JSON.parse(String(canvas)));
    },

    create: async function ({ cookies, params, request}){
        const data = await request.formData();
        const name = data.get('name');    
    }
};
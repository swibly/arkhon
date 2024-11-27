import { JWT_TOKEN_COOKIE_NAME } from '$env/static/private';
import { getContentByProjectId, saveProjectContent } from '$lib/projects';
import { fail } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async function ({ cookies, params }) {
    return {
        content: await getContentByProjectId(
            cookies.get(JWT_TOKEN_COOKIE_NAME)!,
            parseInt(params.project)
        )
    };
};

export const actions: Actions = {
    save: async function ({ cookies, request, params }) {
        const jwt = cookies.get(JWT_TOKEN_COOKIE_NAME)!;
        const data = await request.formData();

        const jsonStringfied = data.get('json')?.toString();

        if (!jsonStringfied) {
            return fail(400);
        }

        const json = JSON.parse(jsonStringfied);

        return await saveProjectContent(jwt, parseInt(params.project), json);
    }
};

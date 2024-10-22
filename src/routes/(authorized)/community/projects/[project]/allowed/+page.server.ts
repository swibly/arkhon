import { JWT_TOKEN_COOKIE_NAME } from '$env/static/private';
import { assignUserToProject, unassignUserFromProject } from '$lib/projects';
import { fail } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions: Actions = {
    initialAssign: async function ({ cookies, params, request }) {
        const username = (await request.formData()).get('username')!.toString();
        let id = parseInt(params.project);

        if (isNaN(id)) {
            return fail(400, {
                error: 'Código de projeto inválido'
            });
        }

        return await assignUserToProject(cookies.get(JWT_TOKEN_COOKIE_NAME)!, id, username, {
            view: true
        });
    },
    assign: async function ({ cookies, params, request }) {
        const jwt = cookies.get(JWT_TOKEN_COOKIE_NAME)!;

        const data = await request.formData();
        const username = data.get('username')!.toString();
        let id = parseInt(params.project);

        if (isNaN(id)) {
            return fail(400, {
                error: 'Código de projeto inválido'
            });
        }

        function getParam(param: string) {
            let value = data.get(param) ?? 'off';
            return value.toString() === 'on';
        }

        if (
            !getParam('view') &&
            !getParam('edit') &&
            !getParam('delete') &&
            !getParam('publish') &&
            !getParam('share') &&
            !getParam('manage_users') &&
            !getParam('manage_metadata')
        ) {
            unassignUserFromProject(jwt, id, username);
        }

        return await assignUserToProject(jwt, id, username, {
            view: getParam('view'),
            edit: getParam('edit'),
            delete: getParam('delete'),
            publish: getParam('publish'),
            share: getParam('share'),
            manage_users: getParam('manage_users'),
            manage_metadata: getParam('manage_metadata')
        });
    }
};

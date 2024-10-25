import { error, fail } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { JWT_TOKEN_COOKIE_NAME } from '$env/static/private';
import { publishProject, unpublishProject, updateProject } from '$lib/projects';

export const load: PageServerLoad = async function ({ parent }) {
    const { project, user } = await parent();

    if (
        project.owner_id !== user.id &&
        project.allowed_users.filter((x) => x.id === user.id && x.allow_manage_metadata === true)
            .length === 0
    ) {
        throw error(403, 'Permissões insuficientes para realizar essa ação.');
    }
};

export const actions: Actions = {
    publish: async function ({ cookies, params }) {
        const jwt = cookies.get(JWT_TOKEN_COOKIE_NAME)!;

        await publishProject(jwt, parseInt(params.project));
    },
    unpublish: async function ({ cookies, params }) {
        const jwt = cookies.get(JWT_TOKEN_COOKIE_NAME)!;

        await unpublishProject(jwt, parseInt(params.project));
    },
    update: async function ({ cookies, params, request }) {
        const data = await request.formData();

        const banner = data.get('banner') as File | undefined;

        if (banner && banner.name !== '') {
            if (!['.png', '.jpg', '.jpeg'].some((type) => banner.name.endsWith(type))) {
                return fail(400, {
                    error: 'Tipo de arquivo inválido.'
                });
            }
        } else {
            data.delete('banner');
        }

        try {
            const response = await updateProject(
                cookies.get(JWT_TOKEN_COOKIE_NAME)!,
                ~~params.project,
                data
            );

            if (response.error) {
                return fail(response.status, {
                    error: response.error
                });
            }
        } catch (error) {
            const err = error as { status: number; error: string };

            return fail(err.status, {
                error: err.error
            });
        }
    }
};

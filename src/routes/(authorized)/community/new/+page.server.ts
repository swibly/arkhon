import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';
import { createProject } from '$lib/projects';
import { JWT_TOKEN_COOKIE_NAME } from '$env/static/private';

export const actions: Actions = {
    default: async function ({ request, cookies }) {
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

        const width = data.get('width')!.toString().replaceAll(/[^\d]/gi, '');
        const height = data.get('height')!.toString().replaceAll(/[^\d]/gi, '');
        const budget = data.get('budget')!.toString().replaceAll(/[^\d]/gi, '');

        data.set('width', width);
        data.set('height', height);
        data.set('budget', budget);

        let projectID: string;

        try {
            const response = await createProject(cookies.get(JWT_TOKEN_COOKIE_NAME)!, data);

            if (response.error) {
                return fail(response.status, {
                    error: response.error
                });
            }

            projectID = response.project!;
        } catch (error) {
            const err = error as { status: number; error: string };

            return fail(err.status, {
                error: err.error
            });
        }

        throw redirect(304, `/community/projects/${projectID}`);
    }
};

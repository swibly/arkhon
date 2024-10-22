import { JWT_TOKEN_COOKIE_NAME } from '$env/static/private';
import { changeUserImage, searchUsersByName } from '$lib/user';
import { fail } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions: Actions = {
    searchUsers: async function ({ cookies, request }) {
        const data = await request.formData();

        const jwt = cookies.get(JWT_TOKEN_COOKIE_NAME)!;
        return await searchUsersByName(jwt, data.get('search')?.toString() ?? '', {
            page: parseInt(data.get('page')?.toString() ?? '1'),
            limit: parseInt(data.get('limit')?.toString() ?? '3')
        });
    },
    changeImage: async function ({ cookies, request }) {
        const data = await request.formData();
        const image = data.get('image') as File | undefined;

        if (!image) {
            return fail(400, {
                error: 'Não é possível alterar sem uma imagem.'
            });
        }

        if (image && image.name !== '') {
            if (!['.png', '.jpg', '.jpeg'].some((type) => image.name.endsWith(type))) {
                return fail(400, {
                    error: 'Tipo de arquivo inválido.'
                });
            }
        }

        const jwt = cookies.get(JWT_TOKEN_COOKIE_NAME)!;
        return await changeUserImage(jwt, data);
    }
};

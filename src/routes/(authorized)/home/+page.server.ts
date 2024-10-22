import { JWT_TOKEN_COOKIE_NAME } from '$env/static/private';
import { searchUsersByName } from '$lib/user';
import type { Actions } from './$types';

export const actions: Actions = {
    searchUsers: async function ({ cookies, request }) {
        const data = await request.formData();

        const jwt = cookies.get(JWT_TOKEN_COOKIE_NAME)!;
        return await searchUsersByName(jwt, data.get('search')?.toString() ?? '', {
            page: parseInt(data.get('page')?.toString() ?? '1'),
            limit: parseInt(data.get('limit')?.toString() ?? '3')
        });
    }
};

import { JWT_TOKEN_COOKIE_NAME } from '$env/static/private';
import { searchUsers } from '$lib/user';
import { getPaginationOptionsFromURL } from '$lib/utils';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async function ({ cookies, url }) {
    const users = await searchUsers(
        cookies.get(JWT_TOKEN_COOKIE_NAME)!,
        {},
        getPaginationOptionsFromURL(url)
    );

    return {
        users: users.search!
    };
};

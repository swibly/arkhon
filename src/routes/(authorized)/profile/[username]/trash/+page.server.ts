import { JWT_TOKEN_COOKIE_NAME } from '$env/static/private';
import { clearTrash, getTrashed } from '$lib/projects';
import { getPaginationOptionsFromURL } from '$lib/utils';
import type { Actions } from './$types';

import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async function ({ cookies, url }) {
    return {
        trashed: await getTrashed(
            cookies.get(JWT_TOKEN_COOKIE_NAME)!,
            getPaginationOptionsFromURL(url)
        )
    };
};

export const actions: Actions = {
    clear: async function ({ cookies }) {
        await clearTrash(cookies.get(JWT_TOKEN_COOKIE_NAME)!);
    }
};

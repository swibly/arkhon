import { JWT_TOKEN_COOKIE_NAME } from '$env/static/private';
import { getTrashed } from '$lib/projects';
import { getPaginationOptionsFromURL } from '$lib/utils';

import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async function ({ cookies, url }) {
    return {
        trashed: getTrashed(cookies.get(JWT_TOKEN_COOKIE_NAME)!, getPaginationOptionsFromURL(url))
    };
};

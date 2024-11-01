import { JWT_TOKEN_COOKIE_NAME } from '$env/static/private';
import { Component, getPublicComponents } from '$lib/component';
import { getPaginationOptionsFromURL, Pagination } from '$lib/utils';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async function ({ cookies, url }) {
    const components = await getPublicComponents(
        cookies.get(JWT_TOKEN_COOKIE_NAME)!,
        (getPaginationOptionsFromURL(url)?.page ?? 1).toString()
    );

    return {
        components: components as Pagination<Component>
    };
};

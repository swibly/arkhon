import { JWT_TOKEN_COOKIE_NAME } from '$env/static/private';
import { searchUsers, UserSearch } from '$lib/user';
import { getPaginationOptionsFromURL } from '$lib/utils';

import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async function ({ cookies, url }) {
    const users = await searchUsers(
        cookies.get(JWT_TOKEN_COOKIE_NAME)!,
        {},
        getPaginationOptionsFromURL(url)
    );

    return { users: users.search! };
};

export const actions: Actions = {
    search: async function ({ cookies, request, url }) {
        const data = await request.formData();
        let search: UserSearch = {};

        // ascending: 'on',
        // name: 'a',
        // order: 'alphabetic',
        // verified: 'on'

        const name = data.get('name')?.toString();
        const ascending = data.get('ascending')?.toString();
        const verified = data.get('verified')?.toString();
        const order = data.get('order')?.toString();

        if (name !== undefined && name.trim() !== '') {
            search.name = name;
        }

        if (ascending !== undefined && ascending === 'on') {
            search.ascending = true;
        }

        if (verified !== undefined && verified === 'on') {
            search.verified_only = true;
        }

        if (order !== undefined) {
            switch (order) {
                case 'alphabetic': {
                    search.order_alphabetic = true;
                    break;
                }
                case 'order_created': {
                    search.order_created = true;
                    break;
                }
                default: {
                    break;
                }
            }
        }

        const users = await searchUsers(
            cookies.get(JWT_TOKEN_COOKIE_NAME)!,
            search,
            getPaginationOptionsFromURL(url)
        );

        return {
            users: users.search!
        };
    }
};

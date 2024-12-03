import { JWT_TOKEN_COOKIE_NAME } from '$env/static/private';
import {
    clearComponentTrash,
    deleteComponent,
    getAllComponentsinTrash,
    restoreComponent
} from '$lib/component';
import { clearTrash, getTrashed } from '$lib/projects';
import { getPaginationOptionsFromURL } from '$lib/utils';
import type { Actions } from './$types';

import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async function ({ cookies, url }) {
    return {
        trashed: await getTrashed(
            cookies.get(JWT_TOKEN_COOKIE_NAME)!,
            getPaginationOptionsFromURL(url)
        ),
        componentTrash: await getAllComponentsinTrash(cookies.get(JWT_TOKEN_COOKIE_NAME)!)
    };
};

export const actions: Actions = {
    clear: async function ({ cookies, request }) {
        const data = await request.formData();
        let type = data.get('type');

        if (type?.toString() === 'project') {
            await clearTrash(cookies.get(JWT_TOKEN_COOKIE_NAME)!);
        } else {
            await clearComponentTrash(cookies.get(JWT_TOKEN_COOKIE_NAME)!);
        }
    },

    restore: async function ({ cookies, request }) {
        const jwt = cookies.get(JWT_TOKEN_COOKIE_NAME)!;
        const data = await request.formData();
        const id = data.get('id');

        await restoreComponent(jwt, id!.toString());
    },

    delete: async function ({ cookies, request }) {
        const jwt = cookies.get(JWT_TOKEN_COOKIE_NAME)!;
        const data = await request.formData();
        const id = data.get('id');

        await deleteComponent(jwt, id!.toString());
    }
};

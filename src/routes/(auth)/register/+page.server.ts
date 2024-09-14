import { redirect } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions: Actions = {
    default: async function () {
        throw redirect(302, '/login');
    }
};

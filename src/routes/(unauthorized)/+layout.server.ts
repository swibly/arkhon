import { JWT_TOKEN_COOKIE_NAME } from '$env/static/private';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async function ({ cookies }) {
    const token = cookies.get(JWT_TOKEN_COOKIE_NAME);

    return {
        token
    };
};

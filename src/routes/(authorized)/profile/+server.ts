import { redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { getUserByToken } from '$lib/user';
import { JWT_TOKEN_COOKIE_NAME } from '$env/static/private';

export const GET: RequestHandler = async function ({ cookies }) {
    const user = await getUserByToken(cookies.get(JWT_TOKEN_COOKIE_NAME)!)!;

    throw redirect(302, `/profile/${user?.username}`);
};

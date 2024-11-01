import { redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async function () {
    throw redirect(302, `/community/projects`);
};

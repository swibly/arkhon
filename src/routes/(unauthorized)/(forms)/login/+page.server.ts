import axios from '$lib/server/axios';
import { fail, redirect } from '@sveltejs/kit';

import type { Actions } from './$types';
import { JWT_TOKEN_COOKIE_NAME } from '$env/static/private';
import { canShowConfetti } from '$lib/stores/confetti';

export const actions: Actions = {
    default: async ({ request, cookies }) => {
        const data = await request.formData();

        const login = data.get('login')!.toString();
        const password = data.get('password')!.toString();

        let body: any = { password };
        body[login?.includes('@') ? 'email' : 'username'] = login;

        try {
            const res = await axios.post('/v1/auth/login', body);

            cookies.set(JWT_TOKEN_COOKIE_NAME, res.data.token, {
                path: '/',
                httpOnly: true,
                maxAge: 604800
            });
        } catch (e: any) {
            if (e.response.data.error) {
                return fail(
                    e.status,
                    e.response.data as { error: string | Record<string, string> }
                );
            }
        }

        throw redirect(302, '/community/projects');
    }
};

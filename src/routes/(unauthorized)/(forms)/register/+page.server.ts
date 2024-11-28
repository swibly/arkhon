import axios from '$lib/server/axios';
import { fail, redirect } from '@sveltejs/kit';

import type { Actions } from './$types';
import { JWT_TOKEN_COOKIE_NAME } from '$env/static/private';

export const actions: Actions = {
    default: async ({ request, cookies }) => {
        const data = await request.formData();

        const firstname = data.get('firstname')!.toString();
        const lastname = data.get('lastname')!.toString();
        const email = data.get('email')!.toString();
        const username = data.get('username')!.toString();
        const password = data.get('password')!.toString();
        const passwordConfirm = data.get('password-confirm')!.toString();

        if (password !== passwordConfirm) {
            return fail(400, { error: 'As senhas não são iguais.' });
        }

        try {
            const res = await axios.post('/v1/auth/register', {
                firstname,
                lastname,
                email,
                username,
                password
            });

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

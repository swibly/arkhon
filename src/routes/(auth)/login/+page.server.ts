import { client } from '$lib/server/swibly-api';
import { redirect, type Actions } from '@sveltejs/kit';
import type { LoginBody } from 'swibly-sdk';

export const actions: Actions = {
    default: async function (event) {
        const { login, password } = Object.fromEntries(await event.request.formData()) as Record<
            string,
            string
        >;
        const loginObject: LoginBody = { password };

        if (login.includes('@')) {
            loginObject.email = login;
        } else {
            loginObject.username = login;
        }

        const response = await client.auth.login(loginObject);

        if (response.error) {
            return { error: response.error };
        }

        event.cookies.set('key', response.token!, {path: "/"} );
        throw redirect(302, '/home');
    }
};

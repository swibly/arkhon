import { client } from '$lib/server/swibly-api';
import type { LoginBody } from 'swibly-sdk';
import type { Actions } from './$types';
import { fail, redirect } from '@sveltejs/kit';

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

        const { error } = response;

        if (error) {
            return fail(401, { error });
        }        

        event.cookies.set('key', response.token!, {path: "/"} );
        throw redirect(302, '/home');
    }
};

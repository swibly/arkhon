import { client } from '$lib/server/swibly-api';
import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions: Actions = {
    default: async function (event) {
        const {
            firstname,
            lastname,
            username,
            email,
            password,
            confirm_pass,
        } = Object.fromEntries(await event.request.formData()) as Record<string, string>;

        // Check if passwords match
        if (password !== confirm_pass) {
            return fail(401, { error: 'Passwords do not match' });
        }

        // Attempt to register the user
        const response = await client.auth.register({ firstname, lastname, username, email, password });

        const { error } = response;

        if (error) {
            return fail(401, { error }); // Return the error from the API
        }
                
        throw redirect(302, '/login');
    }
};
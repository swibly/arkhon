import axios from '$lib/server/axios';
import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';
import { JWT_TOKEN_COOKIE_NAME } from '$env/static/private';
import { deleteAccount } from '$lib/user';

export const actions: Actions = {
    deleteAccount: async ({ cookies }) => {
        await deleteAccount(cookies.get(JWT_TOKEN_COOKIE_NAME)!);

        cookies.delete(JWT_TOKEN_COOKIE_NAME, { path: '/' });
        throw redirect(302, '/');
    },
    updateProfile: async ({ request, cookies }) => {
        const data = await request.formData();

        try {
            await axios.patch('/v1/auth/update', Object.fromEntries(data), {
                headers: {
                    Authorization: cookies.get(JWT_TOKEN_COOKIE_NAME)!
                }
            });
        } catch (e: any) {
            if (e.response.data.error) {
                return fail(
                    e.status,
                    e.response.data as { error: string | Record<string, string> }
                );
            }
        }
        return {
            message: 'Perfil atualizado!'
        };
    },
    updateNotifications: async ({ request, cookies }) => {
        const data = Object.fromEntries(await request.formData());

        const checkField = (field: string) =>
            data[field] !== undefined ? (data[field] === 'on' ? true : false) : false;

        const notify = {
            inapp: checkField('inapp'),
            email: checkField('email')
        };

        try {
            await axios.patch(
                '/v1/auth/update',
                { notify },
                {
                    headers: {
                        Authorization: cookies.get(JWT_TOKEN_COOKIE_NAME)!
                    }
                }
            );
        } catch (e: any) {
            if (e.response.data.error) {
                return fail(
                    e.status,
                    e.response.data as { error: string | Record<string, string> }
                );
            }
        }
        return {
            message: 'Privacidade do perfil atualizada!'
        };
    },
    updatePrivacy: async ({ request, cookies }) => {
        const data = Object.fromEntries(await request.formData());

        const checkField = (field: string) =>
            data[field] !== undefined ? (data[field] === 'on' ? true : false) : false;

        const show = {
            profile: checkField('profile'),
            comments: checkField('comments'),
            image: checkField('image'),
            favorites: checkField('favorites'),
            projects: checkField('projects'),
            components: checkField('components'),
            followers: checkField('followers'),
            following: checkField('following'),
            inventory: checkField('inventory'),
            formations: checkField('formations')
        };

        try {
            await axios.patch(
                '/v1/auth/update',
                { show },
                {
                    headers: {
                        Authorization: cookies.get(JWT_TOKEN_COOKIE_NAME)!
                    }
                }
            );
        } catch (e: any) {
            if (e.response.data.error) {
                return fail(
                    e.status,
                    e.response.data as { error: string | Record<string, string> }
                );
            }
        }
        return {
            message: 'Privacidade do perfil atualizada!'
        };
    },
    resetPassword: async ({ request, cookies }) => {
        const passCookie = cookies.get('pass');

        if (passCookie !== undefined) {
            const passDate = new Date(passCookie);

            if (Date.now() - passDate.getTime() < 60 * 1000) {
                return {
                    error: 'Espere pelo menos 1 minuto para reenviar um novo email.'
                };
            }
        }

        const data = await request.formData();

        const email = data.get('email')!.toString();

        try {
            await axios.post('/v1/auth/password/reset', { email });
        } catch (e: any) {
            if (e.response.data.error) {
                return fail(
                    e.status,
                    e.response.data as { error: string | Record<string, string> }
                );
            }
        }

        cookies.set('pass', new Date(Date.now()).toString(), {
            path: '/',
            secure: true,
            httpOnly: true
        });

        return {
            message: 'Email enviado, verifique sua caixa de entrada e seu spam!'
        };
    }
};

import axios from '$lib/server/axios';
import { fail } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions: Actions = {
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

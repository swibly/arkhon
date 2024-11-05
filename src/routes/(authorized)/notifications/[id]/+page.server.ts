import { JWT_TOKEN_COOKIE_NAME } from '$env/static/private';
import axios from '$lib/server/axios';
import type { Actions } from './$types';

export const actions: Actions = {
    read: async function ({ cookies, params }) {
        try {
            await axios.post(
                `/v1/notification/${params.id}/read`,
                {},
                {
                    headers: { Authorization: cookies.get(JWT_TOKEN_COOKIE_NAME)! }
                }
            );
        } catch (e) {
            console.log(e);
        }
    },
    unread: async function ({ cookies, params }) {
        try {
            await axios.delete(`/v1/notification/${params.id}/unread`, {
                headers: { Authorization: cookies.get(JWT_TOKEN_COOKIE_NAME)! }
            });
        } catch (e) {
            console.log(e);
        }
    }
};

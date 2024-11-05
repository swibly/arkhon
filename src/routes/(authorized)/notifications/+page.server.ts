import { JWT_TOKEN_COOKIE_NAME } from '$env/static/private';
import axios from '$lib/server/axios';
import { getPaginationOptionsFromURL, Pagination } from '$lib/utils';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async function ({ cookies, url }) {
    const { page, limit } = getPaginationOptionsFromURL(url);

    const res = await axios.get(
        `/v1/notification?unread=${url.searchParams.get('unread')}&page=${page}&perpage=${limit}`,
        {
            headers: { Authorization: cookies.get(JWT_TOKEN_COOKIE_NAME)! }
        }
    );

    return res.data as Pagination<{
        id: number;
        created_at: Date;
        updated_at: Date;
        title: string;
        message: string;
        type: 'information' | 'warning' | 'danger';
        redirect: string;
        read_at?: Date;
        is_read: boolean;
    }>;
};

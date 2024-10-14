import { JWT_TOKEN_COOKIE_NAME } from '$env/static/private';
import { Actions } from '@sveltejs/kit';
import { follow, unfollow } from './user';
import { favorite, unfavorite } from './projects';

export type Pagination<T> = {
    data: T[];
    total_records: number;
    total_pages: number;
    current_page: number;
    next_page: number;
    previous_page: number;
};

export type PaginationOptions = Partial<{
    page: number;
    limit: number;
}>;

export const userPageActions: Actions = {
    follow: async function ({ cookies, params }) {
        const jwt = cookies.get(JWT_TOKEN_COOKIE_NAME)!;

        await follow(jwt, params.username!);
    },
    unfollow: async function ({ cookies, params }) {
        const jwt = cookies.get(JWT_TOKEN_COOKIE_NAME)!;

        await unfollow(jwt, params.username!);
    }
};

//export const projectPageActions: Actions = {
//    favorite: async function ({ cookies, request }) {
//        const data = await request.formData();
//        const projectID = data.get('project')!;
//
//        const jwt = cookies.get(JWT_TOKEN_COOKIE_NAME)!;
//
//        await favorite(jwt, parseInt(projectID.toString()));
//    },
//    unfavorite: async function ({ cookies, request }) {
//        const data = await request.formData();
//        const projectID = data.get('project')!;
//
//        const jwt = cookies.get(JWT_TOKEN_COOKIE_NAME)!;
//
//        await unfavorite(jwt, parseInt(projectID.toString()));
//    }
//};

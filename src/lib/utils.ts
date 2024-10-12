import { JWT_TOKEN_COOKIE_NAME } from "$env/static/private";
import { Actions } from "@sveltejs/kit";
import { follow, unfollow } from "./user";

export type Pagination<T> = {
    data: T[];
    total_records: number;
    total_pages: number;
    current_page: number;
    next_page: number;
    previous_page: number;
};


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

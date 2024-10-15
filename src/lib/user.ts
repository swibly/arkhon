import axios from './server/axios';
import { Pagination, PaginationOptions } from './utils';

export type User = {
    id: number;
    created_at: Date;
    updated_at: Date;
    firstname: string;
    lastname: string;
    username: string;
    email: string;
    bio: string;
    verified: boolean;
    xp: number;
    arkhoins: number;
    followers: number;
    following: number;
    notification: {
        inapp: boolean;
        email: boolean;
    };
    show: {
        profile: boolean;
        image: boolean;
        comments: boolean;
        favorites: boolean;
        projects: boolean;
        components: boolean;
        followers: boolean;
        following: boolean;
        inventory: boolean;
        formations: boolean;
    };
    country: string;
    language: 'en' | 'pt' | 'ru';
    permissions: string[];
    pfp: string;
};

export type UserprojectPermissions = {
    id: number;
    username: string;
    profile_picture: string;
    allow_view: boolean;
    allow_edit: boolean;
    allow_delete: boolean;
    allow_publish: boolean;
    allow_share: boolean;
    allow_manage_users: boolean;
    allow_manage_metadata: boolean;
};

export type Follower = {
    id: number;
    firstname: string;
    lastname: string;
    username: string;
    pfp: string;
    verified: boolean;
    following_since: Date;
};

export async function getUserByToken(token: string): Promise<User | null> {
    try {
        const res = await axios.get('/v1/auth/validate', { headers: { Authorization: token } });
        const user = res.data as User;

        return user;
    } catch (_) {
        return null;
    }
}

export async function getUserByUsername(token: string, username: string): Promise<User | null> {
    try {
        const res = await axios.get(`/v1/user/${username}/profile`, {
            headers: { Authorization: token }
        });
        const user = res.data as User;

        return user;
    } catch (_) {
        return null;
    }
}

export async function isFollowing(token: string, username: string): Promise<boolean> {
    try {
        const res = await axios.get(`/v1/user/${username}/amifollowing`, {
            headers: { Authorization: token }
        });

        return res.status === 200;
    } catch (_) {
        return false;
    }
}

export async function follow(token: string, username: string): Promise<void> {
    try {
        await axios.post(
            `/v1/user/${username}/follow`,
            {},
            {
                headers: { Authorization: token }
            }
        );
    } catch (error) {
        console.error(error);
        // TODO: Add error handling
    }
}

export async function unfollow(token: string, username: string): Promise<void> {
    try {
        await axios.post(
            `/v1/user/${username}/unfollow`,
            {},
            {
                headers: { Authorization: token }
            }
        );
    } catch (error) {
        console.error(error);
        // TODO: Add error handling
    }
}

export async function getFollowers(
    token: string,
    username: string,
    options: PaginationOptions
): Promise<Pagination<Follower> | undefined> {
    try {
        const page = options.page ?? 1;
        const limit = options.limit ?? 10;

        const res = await axios.get(
            `/v1/user/${username}/followers?page=${page}&perpage=${limit}`,
            {
                headers: { Authorization: token }
            }
        );

        return res.data as Pagination<Follower>;
    } catch (error) {
        return {
            data: [],
            next_page: -1,
            total_pages: 1,
            current_page: 1,
            previous_page: -1,
            total_records: 0
        };
    }
}

export async function getFollowing(
    token: string,
    username: string,
    options: PaginationOptions
): Promise<Pagination<Follower> | undefined> {
    try {
        const page = options.page ?? 1;
        const limit = options.limit ?? 10;

        const res = await axios.get(
            `/v1/user/${username}/following?page=${page}&perpage=${limit}`,
            {
                headers: { Authorization: token }
            }
        );

        return res.data as Pagination<Follower>;
    } catch (error) {
        return {
            data: [],
            next_page: -1,
            total_pages: 1,
            current_page: 1,
            previous_page: -1,
            total_records: 0
        };
    }
}

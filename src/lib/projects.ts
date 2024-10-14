import axios from './server/axios';
import { UserprojectPermissions } from './user';
import { Pagination, PaginationOptions } from './utils';

export type Project = {
    id: number;
    created_at: Date;
    updated_at: Date;
    deleted_at: Date | null;
    name: string;
    description: string;
    budget: number;
    is_public: boolean;
    fork: number | null;
    owner_id: number;
    owner_username: string;
    owner_profile_picture: string;
    allowed_users: UserprojectPermissions[];
    is_favorited: boolean;
    total_favorites: number;
};

export async function getProjectsByUser(
    token: string,
    username: string,
    favorite: boolean = false,
    options: PaginationOptions = {}
): Promise<Pagination<Project> | undefined> {
    try {
        const isFavorite = favorite ? '/favorite' : '';
        const page = options.page ?? 1;
        const limit = options.limit ?? 10;

        const res = await axios.get(
            `/v1/projects/user/${username}${isFavorite}?page=${page}perpage=${limit}`,
            {
                headers: { Authorization: token }
            }
        );

        return res.data as Pagination<Project>;
    } catch (error) {
        console.error(error);
        // TODO: Add error handling
    }
}

export async function favorite(token: string, projectID: number) {
    try {
        await axios.patch(
            `/v1/projects/${projectID}/favorite`,
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

export async function unfavorite(token: string, projectID: number) {
    try {
        await axios.delete(`/v1/projects/${projectID}/unfavorite`, {
            headers: { Authorization: token }
        });
    } catch (error) {
        console.error(error);
        // TODO: Add error handling
    }
}

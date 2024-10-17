import axios from './server/axios';
import { UserProjectPermissions } from './user';
import { Pagination, PaginationOptions } from './utils';

export type Project = {
    id: number;
    created_at: Date;
    updated_at: Date;
    deleted_at: Date | null;
    name: string;
    description: string;
    budget: number;
    width: number;
    height: number;
    banner_url: string;
    is_public: boolean;
    fork: number | null;
    owner_id: number;
    owner_username: string;
    owner_profile_picture: string;
    allowed_users: UserProjectPermissions[];
    is_favorited: boolean;
    total_favorites: number;
};

export async function createProject(
    token: string,
    data: FormData
): Promise<
    | {
          status: number;
          message: string;
          project: string;
          error?: undefined;
      }
    | {
          status: number;
          error: string | [string, string];
          message?: undefined;
          project?: undefined;
      }
> {
    try {
        const isPublic = data.get('public') === 'on' || false;

        const res = await axios.post(`/v1/projects${isPublic ? '?public=true' : ''}`, data, {
            headers: { Authorization: token }
        });

        return {
            status: res.status,
            message: res.data.message,
            project: res.data.project
        };
    } catch (e) {
        return {
            // @ts-ignore
            error: e.response.data.error,
            // @ts-ignore
            status: e.response.status
        };
    }
}

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
            `/v1/projects/user/${username}${isFavorite}?page=${page}&perpage=${limit}`,
            { headers: { Authorization: token } }
        );

        return res.data as Pagination<Project>;
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

export async function favorite(token: string, projectID: number) {
    try {
        await axios.patch(
            `/v1/projects/${projectID}/favorite`,
            {},
            { headers: { Authorization: token } }
        );
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

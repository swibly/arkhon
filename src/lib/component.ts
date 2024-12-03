import axios from './server/axios';
import { Pagination, PaginationOptions, Search } from './utils';

export type Component = {
    id: number;
    created_at: Date;
    updated_at: Date;
    deleted_at: Date | null;
    name: string;
    description: string;
    content: any;
    owner_id: number;
    owner_firstname: string;
    owner_lastname: string;
    owner_username: string;
    owner_pfp: string;
    owner_verified: boolean;
    budget: number;
    price: number;
    paid_price: number;
    sell_price: number;
    is_public: boolean;
    holders: number;
    bought: boolean;
    total_sells: number;
};

export type ComponentSearch = Search &
    Partial<{
        /** Most holders first */
        most_holders: boolean;
    }>;

export async function getPublicComponents(token: string, page: string, limit: string) {
    try {
        const res = await axios.get(`/v1/components?page=${page.toString()}&perpage=${limit}`, {
            headers: { Authorization: token }
        });

        return res.data;
    } catch (error) {
        return console.error(error);
    }
}

export async function getAllUserComponents(token: string, username: string, page: string) {
    try {
        const res = await axios.get(
            `/v1/components/user/${username}/owned?page=${page.toString()}`,
            {
                headers: { Authorization: token }
            }
        );

        return res.data;
    } catch (error) {
        return console.error(error);
    }
}

export async function createComponent(token: string, body: object, isPublic: boolean) {
    try {
        await axios.post(`/v1/components?public=${isPublic}`, body, {
            headers: { Authorization: token }
        });
    } catch (error) {
        return console.error(error);
    }
}

export async function editComponent(token: string, body: object, id: number) {
    try {
        await axios.patch(`/v1/components/${id}/update`, body, {
            headers: { Authorization: token }
        });
    } catch (error) {
        return console.error(error);
    }
}

export async function getComponentInfo(token: string, id: number) {
    try {
        let res = await axios.patch(`/v1/components/${id}`, {
            headers: { Authorization: token }
        });

        return res.data;
    } catch (error) {
        return console.error(error);
    }
}

export async function putComponentinTrash(token: string, id: number) {
    try {
        await axios.delete(`/v1/components/${id}/trash`, {
            headers: { Authorization: token }
        });
    } catch (error) {
        return console.error(error);
    }
}

export async function getAllComponentsinTrash(token: string) {
    try {
        let res = await axios.get(`/v1/components/trash`, {
            headers: { Authorization: token }
        });

        return res.data;
    } catch (error) {
        return console.error(error);
    }
}

export async function buyComponent(token: string, id: number) {
    try {
        await axios.post(`/v1/components/${id}/buy`, {}, { headers: { Authorization: token } });
    } catch (error) {
        return console.error(error);
    }
}

export async function publishComponent(token: string, id: number) {
    try {
        await axios.patch(`/v1/components/${id}/publish`, {
            headers: { Authorization: token }
        });
    } catch (error) {
        return console.error(error);
    }
}

export async function searchComponents(
    token: string,
    search: ComponentSearch,
    options: PaginationOptions
) {
    try {
        const page = options.page ?? 1;
        const limit = options.limit ?? 10;

        const res = await axios.post(`/v1/search/component?page=${page}&perpage=${limit}`, search, {
            headers: { Authorization: token }
        });

        return {
            search: res.data as Pagination<Component>,
            status: res.status
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

export async function restoreComponent(token: string, id: string) {
    try {
        await axios.patch(
            `/v1/components/${id}/trash/restore`,
            {},
            {
                headers: { Authorization: token }
            }
        );
    } catch (error) {
        return console.error(error);
    }
}

export async function deleteComponent(token: string, id: string) {
    try {
        await axios.delete(`/v1/components/${id}/trash/force`, {
            headers: { Authorization: token }
        });
    } catch (error) {
        return console.log(error);
    }
}

export async function clearComponentTrash(token: string) {
    try {
        await axios.delete(`/v1/components/trash`, {
            headers: { Authorization: token }
        });
    } catch (error) {
        return console.error(error);
    }
}

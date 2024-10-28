import axios from "./server/axios";

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

export async function getPublicComponents(token: string, page: string) {
    try {
        const res = await axios.get(`/v1/components?page=${page.toString()}`, {
            headers: { Authorization: token }
        });

        return res.data;
    } catch (error) {
        return console.error(error);
    }
}

export async function getAllUserComponents(token: string, username: string, page: string) {
    try {
        const res = await axios.get(`/v1/components/user/${username}/owned?page=${page.toString()}`, {
            headers: { Authorization: token }
        });

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
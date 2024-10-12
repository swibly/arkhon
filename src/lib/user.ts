import axios from './server/axios';

type NumericalBoolean = 1 | -1;

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
        inapp: NumericalBoolean;
        email: NumericalBoolean;
    };
    show: {
        profile: NumericalBoolean;
        image: NumericalBoolean;
        comments: NumericalBoolean;
        favorites: NumericalBoolean;
        projects: NumericalBoolean;
        components: NumericalBoolean;
        followers: NumericalBoolean;
        following: NumericalBoolean;
        inventory: NumericalBoolean;
        formations: NumericalBoolean;
    };
    country: string;
    language: 'en' | 'pt' | 'ru';
    permissions: string[];
    pfp: string;
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
        await axios.post(`/v1/user/${username}/follow`, {}, {
            headers: { Authorization: token }
        });
    } catch (error) {
        console.error(error);
        // TODO: Add error handling
    }
}

export async function unfollow(token: string, username: string): Promise<void> {
    try {
        await axios.post(`/v1/user/${username}/unfollow`, {}, {
            headers: { Authorization: token }
        });
    } catch (error) {
        console.error(error);
        // TODO: Add error handling
    }
}
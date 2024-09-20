import axios from './server/axios';

type NumericalBoolean = 1 | -1;

export type User = {
    id: number;
    created_at: Date;
    updated_at: Date;
    firstname: string;
    lastname: string;
    username: string;
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
    language: string;
    permissions: string[];
    image_url: string;
};

export async function getUserByToken(token: string): Promise<User | null> {
    try {
        const res = await axios.get('/v1/auth/validate', { headers: { Authorization: token } });
        const user = res.data as User;

        user.image_url = `https://api.dicebear.com/9.x/shapes/svg?seed=${encodeURI(
            user.username
        )}&backgroundColor=0a5b83,1c799f,69d2e7,f1f4dc,f88c49,d1d4f9,b6e3f4,c0aede,ffd5dc,ffdfbf&backgroundRotation=0,360,10,20,30,40,50,60,70,80,90,100,110,120,130,140,160,150,170,180,350,340,330,320,310,300,290,280,270,260,250,190,200,210,220,230,240&shape1=ellipseFilled,polygonFilled,rectangleFilled,rectangle,polygon,line,ellipse&shape2=ellipseFilled,line,polygonFilled,rectangleFilled,polygon,rectangle,ellipse`;

        return user;
    } catch (_) {
        return null;
    }
}

export async function getUserByUsername(token: string, username: string): Promise<User | null> {
    try {
        const res = await axios.get(`/v1/user/${encodeURI(username)}/profile`, { headers: { Authorization: token } });
        const user = res.data as User;

        user.image_url = `https://api.dicebear.com/9.x/shapes/svg?seed=${encodeURI(
            user.username
        )}&backgroundColor=0a5b83,1c799f,69d2e7,f1f4dc,f88c49,d1d4f9,b6e3f4,c0aede,ffd5dc,ffdfbf&backgroundRotation=0,360,10,20,30,40,50,60,70,80,90,100,110,120,130,140,160,150,170,180,350,340,330,320,310,300,290,280,270,260,250,190,200,210,220,230,240&shape1=ellipseFilled,polygonFilled,rectangleFilled,rectangle,polygon,line,ellipse&shape2=ellipseFilled,line,polygonFilled,rectangleFilled,polygon,rectangle,ellipse`;

        return user;
    } catch (_) {
        return null;
    }
}

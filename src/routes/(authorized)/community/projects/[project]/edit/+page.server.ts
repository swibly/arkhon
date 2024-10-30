import type { PageServerLoad } from './$types';
import type { Actions } from './$types';
import { error } from '@sveltejs/kit';
import { getContentByProjectId, saveProjectContent } from '$lib/projects';
import {
    getAllUserComponents,
    getPublicComponents,
    createComponent,
    editComponent,
    getComponentInfo,
    putComponentinTrash,
    getAllComponentsinTrash,
    buyComponent,
    publishComponent
} from '$lib/component';
import { JWT_TOKEN_COOKIE_NAME } from '$env/static/private';
import { getUserByToken } from '$lib/user';

export const load: PageServerLoad = async ({ cookies, params }) => {
    const jwt = cookies.get(JWT_TOKEN_COOKIE_NAME)!;
    let projectID: number = parseInt(params.project);
    let user = await getUserByToken(jwt);

    if (isNaN(projectID)) {
        throw error(400, 'Código de projeto inválido');
    }

    return {
        content: await getContentByProjectId(jwt, projectID),
        component: await getPublicComponents(jwt, '1'),
        allOwnedComponents: await getAllUserComponents(jwt, String(user?.username), '1')
    };
};

export const actions: Actions = {
    save: async function ({ cookies, params, request }) {
        const jwt = cookies.get(JWT_TOKEN_COOKIE_NAME)!;
        const data = await request.formData();

        const canvas = data.get('json');

        await saveProjectContent(jwt, parseInt(params.project), JSON.parse(String(canvas)));
    },

    create: async function ({ cookies, request }) {
        const jwt = cookies.get(JWT_TOKEN_COOKIE_NAME)!;
        let user = await getUserByToken(jwt);
        const data = await request.formData();
        const name = data.get('name');
        const description = data.get('description');
        const content = data.get('content');
        const budget = data.get('price');
        const arkhoins = data.get('arkhoins');
        const isPublic = String(data.get('isPublic')) === 'false' ? false : true;

        const json = {
            Name: String(name),
            Description: String(description),
            Content: JSON.parse(JSON.stringify(content)),
            Price: Number(arkhoins),
            Budget: Number(budget)
        };

        await createComponent(jwt, json, isPublic);
        let components = await getAllUserComponents(jwt, String(user?.username), '1');
        let allComponents = await getAllUserComponents(
            jwt,
            String(user?.username),
            components.total_pages
        );

        let lastComponent = allComponents.data[(allComponents.total_records % 10) - 1];

        if(isPublic){
            await publishComponent(jwt, lastComponent.id);
        }

        return {
            lastComponent: lastComponent
        };
    },

    edit: async function ({ cookies, request }) {
        const jwt = cookies.get(JWT_TOKEN_COOKIE_NAME)!;
        let user = await getUserByToken(jwt);
        let data = await request.formData();
        let id = Number(data.get('id'));
        let name = String(data.get('newName'));
        let description = String(data.get('newDescription'));
        let content = JSON.parse(JSON.stringify(data.get('content')));
        let budget = Number(data.get('newPrice'));
        let arkhoins = Number(data.get('newArkhoins'));        
        let isPublic = String(data.get('newPublic')) === 'false' ? false : true;      
        // let message: string;

        const json = {
            Name: name,
            Description: description,
            Content: content,
            Price: arkhoins,
            Budget: budget,
            Public: isPublic
        };

        // let component = await getComponentInfo(jwt, id);

        // if(component.owner_username === user?.username){
            await editComponent(jwt, json, id);            

        //     message = "Ok";
        // }else{
        //     message = "Você não tem permissão para editar esse componente.";
        // }

        // return {
        //     message: "A"
        // }

        if(isPublic){
            await publishComponent(jwt, id);
        }
    },

    get: async function ({ cookies, request }) {
        const jwt = cookies.get(JWT_TOKEN_COOKIE_NAME)!;
        let user = await getUserByToken(jwt);
        const data = await request.formData();
        const page = data.get('nextPage');

        return {
            component: await getPublicComponents(jwt, page!.toString()),
            allOwnedComponents: await getAllUserComponents(
                jwt,
                String(user?.username),
                page!.toString()
            )
        };
    },

    reset: async function ({ cookies }) {
        const jwt = cookies.get(JWT_TOKEN_COOKIE_NAME)!;
        let user = await getUserByToken(jwt);

        return {
            component: await getPublicComponents(jwt, '1'),
            allOwnedComponents: await getAllUserComponents(jwt, String(user?.username), '1')
        };
    },

    delete: async function ({cookies, request}){
        const jwt = cookies.get(JWT_TOKEN_COOKIE_NAME)!;
        const data = await request.formData();
        const id = data.get('id');

        await putComponentinTrash(jwt, Number(id));

        return {
            trash: await getAllComponentsinTrash(jwt)
        }
    },

    buy: async function ({cookies, request}){
        const jwt = cookies.get(JWT_TOKEN_COOKIE_NAME)!;
        let user = await getUserByToken(jwt);
        const data = await request.formData();
        const id = data.get('id');

        await buyComponent(jwt, Number(id));

        return {
            usersComponent: await getAllUserComponents(jwt, String(user?.username), '4')
        }
    }
};

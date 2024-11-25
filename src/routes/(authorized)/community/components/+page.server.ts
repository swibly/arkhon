import { JWT_TOKEN_COOKIE_NAME } from '$env/static/private';
import {
    buyComponent,
    Component,    
    getPublicComponents,    
} from '$lib/component';
import { getUserByToken } from '$lib/user';
import {
    getComponentPaginationOptionsFromURL,    
    type Pagination
} from '$lib/utils';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async function ({ cookies, url }) {
    const components = await getPublicComponents(
        cookies.get(JWT_TOKEN_COOKIE_NAME)!,
        (getComponentPaginationOptionsFromURL(url)?.page ?? 1).toString(),
        (getComponentPaginationOptionsFromURL(url)?.limit ?? 1).toString()
    );

    let searchComponents = await getPublicComponents(
        cookies.get(JWT_TOKEN_COOKIE_NAME)!,
        (getComponentPaginationOptionsFromURL(url)?.page ?? 1).toString(),
        components.total_records.toString()
    );    


    searchComponents = searchComponents.data.filter((component: Component) => component.deleted_at === null);

    //@ts-ignore
    searchComponents.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

    return {
        components: components as Pagination<Component>,
        searchComponents: searchComponents,        
        test: cookies.get(JWT_TOKEN_COOKIE_NAME)!
    };
};

export const actions: Actions = {
    buy: async function ({ cookies, request }) {
        const jwt = cookies.get(JWT_TOKEN_COOKIE_NAME)!;
        const data = await request.formData();
        const id = data.get('id');

        await buyComponent(jwt, Number(id));
    },

    search: async function ({ cookies, url, request }) {
        const jwt = cookies.get(JWT_TOKEN_COOKIE_NAME)!;
        const user = await getUserByToken(jwt);
        const data = await request.formData();

        const ascending = String(data.get('ascending'));
        const totalComponents = data.get('total')?.toString();
        const text = data.get('text')?.toString();
        const budget_min = Number(data.get('budget-min'));
        const budget_max = Number(data.get('budget-max'));
        const arkhoins_min = Number(data.get('arkhoins-min'));
        const arkhoins_max = Number(data.get('arkhoins-max'));
        const order = data.get('order');
        const owned = data.get('owned');

        let components = await getPublicComponents(
            jwt,
            (getComponentPaginationOptionsFromURL(url)?.page ?? 1).toString(),
            totalComponents!
        );

        let searchComponents: Array<Component> = [];
        let notOwnedComponents: Array<Component> = [];

        components = components.data.filter((component: Component) => component.deleted_at === null);

        components.forEach((component: Component) => {
            if (
                (component.name.toLowerCase().includes(text!.toLowerCase()) ||
                    component.description.toLowerCase().includes(text!.toLowerCase()) ||
                    component.owner_username.toLowerCase().includes(text!.toLowerCase())) &&
                budget_max === 0 &&
                arkhoins_max === 0
            ) {
                searchComponents.push(component);
            }

            if (
                (component.name.toLowerCase().includes(text!.toLowerCase()) ||
                    component.description.toLowerCase().includes(text!.toLowerCase()) ||
                    component.owner_username.toLowerCase().includes(text!.toLowerCase())) &&
                budget_max !== 0 &&
                arkhoins_max === 0
            ) {
                if (component.budget >= budget_min && component.budget <= budget_max) {
                    searchComponents.push(component);
                }
            }

            if (
                (component.name.toLowerCase().includes(text!.toLowerCase()) ||
                    component.description.toLowerCase().includes(text!.toLowerCase()) ||
                    component.owner_username.toLowerCase().includes(text!.toLowerCase())) &&
                budget_max === 0 &&
                arkhoins_max !== 0
            ) {
                if (component.price >= arkhoins_min && component.price <= arkhoins_max) {
                    searchComponents.push(component);
                }
            }

            if (
                (component.name.toLowerCase().includes(text!.toLowerCase()) ||
                    component.description.toLowerCase().includes(text!.toLowerCase()) ||
                    component.owner_username.toLowerCase().includes(text!.toLowerCase())) &&
                budget_max !== 0 &&
                arkhoins_max !== 0
            ) {
                if (
                    component.budget >= budget_min &&
                    component.budget <= budget_max &&
                    component.price >= arkhoins_min &&
                    component.price <= arkhoins_max
                ) {
                    searchComponents.push(component);
                }
            }
        });

        let test: any = [order];

        if (ascending === 'true') {            
            if (order === 'order_created') {
                // @ts-ignore
                searchComponents.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
            }

            if (order === 'alphabetic') {
                searchComponents.sort((a, b) => a.name.localeCompare(b.name, 'pt', { sensitivity: 'base' }));
            }
        } else {            
            if (order === 'order_created') {
                // @ts-ignore
                searchComponents.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
            }

            if (order === 'alphabetic') {
                searchComponents.sort((a, b) => b.name.localeCompare(a.name, 'pt', { sensitivity: 'base' }));
            }
        }

        if (owned === 'on') {
            notOwnedComponents = searchComponents;
        } else {
            searchComponents.forEach((component: Component) => {
                if (component.owner_username !== user?.username && !component.bought) {
                    notOwnedComponents.push(component);
                }
            });
        }

        return {
            components: components as Pagination<Component>,
            searchComponents: notOwnedComponents,
            test: test
        };
    }
};

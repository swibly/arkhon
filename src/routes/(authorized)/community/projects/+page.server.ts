import { JWT_TOKEN_COOKIE_NAME } from '$env/static/private';
import { getPublicProjects, ProjectSearch, searchProjects } from '$lib/projects';
import { getPaginationOptionsFromURL } from '$lib/utils';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async function ({ cookies, url }) {
    const projects = await getPublicProjects(
        cookies.get(JWT_TOKEN_COOKIE_NAME)!,
        getPaginationOptionsFromURL(url)
    );

    return {
        projects: projects!
    };
};

export const actions: Actions = {
    search: async function ({ cookies, request, url }) {
        const data = await request.formData();
        let search: ProjectSearch = {};

        const name = data.get('name')?.toString();
        const ascending = data.get('ascending')?.toString();
        const order = data.get('order')?.toString();

        const budgetMin = data.get('budget-min')?.toString();
        const budgetMax = data.get('budget-max')?.toString();

        const areaMin = data.get('area-min')?.toString();
        const areaMax = data.get('area-max')?.toString();

        if (name !== undefined && name.trim() !== '') {
            search.name = name;
        }

        if (ascending !== undefined && ascending === 'on') {
            search.ascending = true;
        }

        if (order !== undefined) {
            switch (order) {
                case 'alphabetic': {
                    search.order_alphabetic = true;
                    break;
                }
                case 'order_created': {
                    search.order_created = true;
                    break;
                }
                default: {
                    break;
                }
            }
        }

        if (budgetMin !== undefined) {
            search.min_budget = parseInt(budgetMin);
        }

        if (budgetMax !== undefined) {
            search.max_budget = parseInt(budgetMax);
        }

        if (areaMin !== undefined) {
            search.min_area = parseInt(areaMin);
        }

        if (areaMax !== undefined) {
            search.max_area = parseInt(areaMax);
        }

        const projects = await searchProjects(
            cookies.get(JWT_TOKEN_COOKIE_NAME)!,
            search,
            getPaginationOptionsFromURL(url)
        );

        return {
            projects: projects.search!
        };
    }
};

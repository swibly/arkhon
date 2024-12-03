import type { Project } from './projects';
import type { User, UserProjectPermissions } from './user';

export type Pagination<T> = {
    data: T[];
    total_records: number;
    total_pages: number;
    current_page: number;
    next_page: number;
    previous_page: number;
};

export type PaginationOptions = Partial<{
    page: number;
    limit: number;
}>;

export type Search = Partial<{
    /** Generic name, can be username, first name, last name etc */
    name: string;
    /** By default sorting is descending */
    ascending: boolean;
    /** Sorts the primary name in the model (e.g.: User -> username, Project -> name, etc) */
    order_alphabetic: boolean;
    /** Only query for whom the current user follows */
    followed: boolean;
    /** Order by created at */
    order_created: boolean;
    /** Order by modified at */
    order_modified: boolean;
}>;

export function getPaginationOptionsFromURL(url: URL): PaginationOptions {
    let page = 1;
    let limit = 15;

    url.searchParams.forEach((value, key) => {
        if (key === 'page') {
            page = parseInt(value);
        } else if (key === 'limit') {
            limit = parseInt(value);
        }
    });

    if (limit <= 0) {
        limit = 1;
    }

    return { page, limit };
}

export function getComponentPaginationOptionsFromURL(url: URL): PaginationOptions {
    let page = 1;
    let limit = 10;

    url.searchParams.forEach((value, key) => {
        if (key === 'page') {
            page = parseInt(value);
        } else if (key === 'limit') {
            limit = parseInt(value);
        }
    });

    if (limit <= 0) {
        limit = 1;
    }

    return { page, limit };
}

export function getComparison(width: number, height: number): string {
    const area = width * height;

    if (area <= 5) return 'um armário ou banheiro pequeno';
    if (area <= 10) return 'um pequeno escritório ou depósito';
    if (area <= 20) return 'um quarto padrão';
    if (area <= 30) return 'um quarto grande ou pequena sala de estar';
    if (area <= 40) return 'uma pequena sala de estar ou cozinha espaçosa';
    if (area <= 50) return 'um estúdio compacto';
    if (area <= 60) return 'uma kitchenette ou sala ampla';
    if (area <= 80) return 'um apartamento compacto';
    if (area <= 100) return 'um apartamento de dois quartos';
    if (area <= 120) return 'um apartamento grande ou casa pequena';
    if (area <= 150) return 'uma casa média';
    if (area <= 200) return 'uma casa espaçosa de três quartos';
    if (area <= 300) return 'uma casa de alto padrão';
    if (area <= 400) return 'uma mansão compacta';
    if (area <= 500) return 'uma mansão ampla';
    if (area <= 700) return 'uma propriedade luxuosa';
    if (area <= 1000) return 'uma grande propriedade rural';
    return 'um vasto terreno ou complexo comercial';
}

type Permissions = keyof Pick<
    UserProjectPermissions,
    | 'allow_view'
    | 'allow_edit'
    | 'allow_share'
    | 'allow_delete'
    | 'allow_publish'
    | 'allow_manage_users'
    | 'allow_manage_metadata'
>;

export function hasPermissions(user: User, project: Project, permissions: Permissions[]): boolean {
    if (user.id === project.owner_id) return true;

    return project.allowed_users.some(
        (allowedUser) =>
            allowedUser.id === user.id && permissions.every((permission) => allowedUser[permission])
    );
}

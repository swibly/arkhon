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

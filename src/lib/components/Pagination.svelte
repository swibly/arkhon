<script lang="ts">
    import { page } from '$app/stores';
    import type { Pagination } from '$lib/utils';

    export let pagination: Pagination<any>;

    function setupURL(i: number) {
        let limit = 15;
        let urlLimit = $page.url.searchParams.get('limit');

        if (urlLimit) {
            try {
                limit = parseInt(urlLimit);
            } catch (e) {
                limit = 15;
            }
        }

        return `?page=${i}&limit=${limit}`;
    }
</script>

{#if pagination.total_pages !== 1 && pagination.total_records !== 0}
    <div class="mb-4 join">
        {#if pagination.current_page > 2}
            <a href={setupURL(1)} class="join-item btn btn-sm">1</a>
            <button class="join-item btn btn-sm btn-disabled">...</button>
        {/if}

        {#if pagination.previous_page !== -1}
            <a href={setupURL(pagination.previous_page)} class="join-item btn btn-sm">
                {pagination.previous_page}
            </a>
        {/if}

        <button class="join-item btn btn-sm btn-primary">{pagination.current_page}</button>

        {#if pagination.next_page !== -1}
            <a href={setupURL(pagination.next_page)} class="join-item btn btn-sm">
                {pagination.next_page}
            </a>
        {/if}

        {#if pagination.current_page < pagination.total_pages - 1}
            <button class="join-item btn btn-sm btn-disabled">...</button>
            <a href={setupURL(pagination.total_pages)} class="join-item btn btn-sm">
                {pagination.total_pages}
            </a>
        {/if}
    </div>
{/if}

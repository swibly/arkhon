<script lang="ts">
    import type { Pagination } from '$lib/utils';

    export let pagination: Pagination<any>;
</script>

{#if pagination.total_pages !== 1}
    <div class="mb-4 join">
        {#if pagination.current_page > 2}
            <a href="?page=1" class="join-item btn btn-sm">1</a>
            <button class="join-item btn btn-sm btn-disabled">...</button>
        {/if}

        {#if pagination.previous_page !== -1}
            <a href="?page={pagination.previous_page}" class="join-item btn btn-sm">
                {pagination.previous_page}
            </a>
        {/if}

        <button class="join-item btn btn-sm btn-primary">{pagination.current_page}</button>

        {#if pagination.next_page !== -1}
            <a href="?page={pagination.next_page}" class="join-item btn btn-sm">
                {pagination.next_page}
            </a>
        {/if}

        {#if pagination.current_page < pagination.total_pages - 1}
            <button class="join-item btn btn-sm btn-disabled">...</button>
            <a href="?page={pagination.total_pages}" class="join-item btn btn-sm">
                {pagination.total_pages}
            </a>
        {/if}
    </div>
{/if}

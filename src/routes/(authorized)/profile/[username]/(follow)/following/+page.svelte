<script lang="ts">
    import type { User } from '$lib/user';
    import Icon from '@iconify/svelte';
    import type { PageServerData } from './$types';
    import UserProfileCard from '$lib/components/UserProfileCard.svelte';

    export let data: PageServerData & User & { lookup: User };

    $: pagination = data.following;
    $: following = pagination.data;
</script>

<h1 class="mb-4 text-3xl font-bold">Seguindo</h1>

{#if following.length === 0}
    <p class="mb-4 opacity-70">Este perfil ainda não está seguindo ninguém.</p>
{:else}
    {#if pagination.total_pages !== 1}
        <div class="mb-4 join">
            {#if pagination.current_page > 2}
                <a href="?page={pagination.previous_page}" class="join-item btn btn-sm">1</a>
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

    <ul class="grid grid-cols-3 gap-4 max-lg:grid-cols-1 max-2xl:grid-cols-2">
        {#each following as following}
            <li>
                <UserProfileCard {...following} selfID={data.id} />
            </li>
        {/each}
    </ul>
{/if}

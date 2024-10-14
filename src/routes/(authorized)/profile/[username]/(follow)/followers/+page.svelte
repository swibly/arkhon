<script lang="ts">
    import { enhance } from '$app/forms';
    import type { User } from '$lib/user';
    import Icon from '@iconify/svelte';
    import type { PageServerData } from './$types';
    import UserProfileCard from '$lib/components/UserProfileCard.svelte';
    import { spawn } from '$lib/toast';

    export let data: PageServerData & User & { lookup: User };

    $: pagination = data.followers;
    $: followers = pagination.data;
</script>

<h1 class="mb-4 text-3xl font-bold text-primary">Seguidores</h1>

{#if followers.length === 0}
    <p class="mb-4 opacity-70">Este perfil ainda não tem nenhum seguidor.</p>

    {#if data.username !== data.lookup.username}
        <form
            action="/profile/{data.lookup.username}?/follow"
            method="POST"
            use:enhance={function () {
                spawn({
                    message: 'Começou a seguir ' + data.lookup.username
                });
            }}
        >
            <button type="submit" class="btn btn-sm btn-primary">
                <Icon icon="mingcute:user-follow-2-fill" />
                Seja o primeiro a seguir!
            </button>
        </form>
    {/if}
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

    <ul class="grid grid-cols-3 gap-4 max-lg:grid-cols-1">
        {#each followers as follower}
            <li>
                <UserProfileCard {...follower} selfID={data.id} />
            </li>
        {/each}
    </ul>
{/if}

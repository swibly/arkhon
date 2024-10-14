<script lang="ts">
    import { enhance } from '$app/forms';
    import type { User } from '$lib/user';
    import Icon from '@iconify/svelte';
    import type { PageServerData } from './$types';

    export let data: PageServerData & User & { lookup: User };

    $: pagination = data.followers;
    $: followers = pagination.data;
</script>

<h1 class="mb-4 text-3xl font-bold">Seguidores</h1>

{#if followers.length === 0}
    <p class="mb-4 opacity-70">Este perfil ainda não tem nenhum seguidor.</p>

    {#if data.username !== data.lookup.username}
        <form action="?/follow" method="POST" use:enhance={function () {}}>
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
            <li class="flex flex-col gap-4 p-4 lg:min-w-96 rounded-2xl bg-base-200">
                <div class="flex items-center gap-2">
                    <img src={follower.pfp} alt="" class="rounded-full size-16" />

                    <div>
                        <h2 class="flex items-center justify-center gap-1 text-xl">
                            {follower.firstname}
                            {follower.lastname}

                            {#if follower.id === data.id}
                                <span class="text-sm text-primary">(você)</span>
                            {/if}

                            {#if follower.verified}
                                <div class="tooltip" data-tip="Verificado">
                                    <Icon icon="material-symbols:verified" class="text-primary" />
                                </div>
                            {/if}
                        </h2>
                        <p class="text-sm opacity-70">@{follower.username}</p>
                    </div>
                </div>

                <a href="/profile/{follower.username}" class="btn btn-sm btn-primary">
                    <Icon icon="mdi:user" />
                    Ver perfil
                </a>
            </li>
        {/each}
    </ul>
{/if}

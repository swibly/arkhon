<script lang="ts">
    import { enhance } from '$app/forms';
    import type { User } from '$lib/user';
    import Icon from '@iconify/svelte';
    import type { PageServerData } from './$types';
    import UserProfileCard from '$lib/components/UserProfileCard.svelte';
    import { spawn } from '$lib/toast';
    import Pagination from '$lib/components/Pagination.svelte';

    export let data: PageServerData & User & { lookup: User };

    $: pagination = data.followers;
    $: followers = pagination.data;
</script>

<h1 class="text-3xl font-bold text-primary">Seguidores</h1>
<p>Acompanhe quem já está conectado com {data.lookup.firstname}</p>

<div class="divider" />

{#if data.username !== data.lookup.username && !data.lookup.show.followers}
    <p class="text-error">Este usuário não permite que outros visualizem quem o segue.</p>
{:else if followers.length === 0}
    <p class="mb-4 opacity-70 italic">Este usuário ainda não tem nenhum seguidor.</p>

    {#if data.username !== data.lookup.username && data.lookup.show.followers}
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
    <div class="mx-auto w-fit">
        <Pagination {pagination} />
    </div>

    <ul class="grid grid-cols-3 gap-4 max-lg:grid-cols-1">
        {#each followers as follower}
            <li>
                <UserProfileCard {...follower} selfID={data.id} />
            </li>
        {/each}
    </ul>
{/if}

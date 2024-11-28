<script lang="ts">
    import type { User } from '$lib/user';
    import type { PageServerData } from './$types';
    import UserProfileCard from '$lib/components/UserProfileCard.svelte';
    import Pagination from '$lib/components/Pagination.svelte';
    import Icon from '@iconify/svelte';
    import { enhance } from '$app/forms';
    import { spawn } from '$lib/toast';

    export let data: PageServerData & { user: User; lookup: User };

    $: pagination = data.following;
    $: following = pagination.data;
</script>

<h1 class="text-3xl font-bold text-primary">Seguindo</h1>
<p>Veja quem {data.lookup.firstname} está acompanhando de perto</p>

<div class="divider" />

{#if data.user.username !== data.lookup.username && !data.lookup.show.following}
    <p class="text-error">Este usuário não permite que outros visualizem quem ele segue.</p>
{:else if following.length === 0}
    <p class="mb-4 opacity-70 italic">Este usuário ainda não está seguindo ninguém.</p>
{:else}
    <div class="mx-auto w-fit">
        <Pagination {pagination} />
    </div>

    <ul class="grid grid-cols-3 gap-4 max-lg:grid-cols-1 max-2xl:grid-cols-2">
        {#each following as following}
            <li>
                <UserProfileCard
                    id={following.id}
                    pfp={following.pfp}
                    lastname={following.lastname}
                    username={following.username}
                    verified={following.verified}
                    firstname={following.firstname}
                    selfID={data.user.id}
                >
                    <div class="space-y-4">
                        <p>
                            <Icon icon="mdi:calendar" class="inline" />
                            Seguindo desde:
                            <span class="font-bold">
                                {new Date(following.following_since).toLocaleDateString(
                                    data.user.language,
                                    {
                                        day: '2-digit',
                                        month: '2-digit'
                                    }
                                )}
                            </span>
                        </p>
                        {#if data.user.id === data.lookup.id}
                            <form
                                action="/profile/{following.username}?/unfollow"
                                method="POST"
                                use:enhance={() =>
                                    spawn({
                                        message: `Você parou de seguir ${following.username}`
                                    })}
                            >
                                <button type="submit" class="w-full btn btn-sm btn-error text-white">
                                    <Icon icon="ri:user-unfollow-fill" />
                                    Parar de seguir
                                </button>
                            </form>
                        {/if}
                    </div>
                </UserProfileCard>
            </li>
        {/each}
    </ul>
{/if}

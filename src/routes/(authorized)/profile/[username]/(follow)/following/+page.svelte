<script lang="ts">
    import type { User } from '$lib/user';
    import type { PageServerData } from './$types';
    import UserProfileCard from '$lib/components/UserProfileCard.svelte';
    import Pagination from '$lib/components/Pagination.svelte';

    export let data: PageServerData & User & { lookup: User };

    $: pagination = data.following;
    $: following = pagination.data;
</script>

<h1 class="text-3xl font-bold text-primary">Seguindo</h1>
<p>Veja quem {data.lookup.firstname} está acompanhando de perto</p>

<div class="divider" />

{#if data.username !== data.lookup.username && !data.lookup.show.following}
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
                <UserProfileCard {...following} selfID={data.id} />
            </li>
        {/each}
    </ul>
{/if}

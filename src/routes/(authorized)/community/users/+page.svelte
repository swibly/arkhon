<script lang="ts">
    import Icon from '@iconify/svelte';
    import Pagination from '$lib/components/Pagination.svelte';
    import UserProfileCard from '$lib/components/UserProfileCard.svelte';
    import type { User } from '$lib/user';
    import type { PageServerData } from './$types';

    export let data: PageServerData & { user: User };

    $: pagination = data.users;
    $: users = pagination.data;
</script>

<div class="mx-auto w-fit">
    <Pagination {pagination} />
</div>

<ul class="grid grid-cols-[repeat(auto-fit,minmax(384px,1fr))] gap-4">
    {#each users as user}
        <li>
            <UserProfileCard
                id={user.id}
                pfp={user.pfp}
                lastname={user.lastname}
                username={user.username}
                verified={user.verified}
                firstname={user.firstname}
                selfID={data.user.id}
            >
                <a
                    href="/profile/{user.username}"
                    class="btn btn-sm btn-outline btn-primary w-full"
                >
                    <Icon icon="fa6-solid:magnifying-glass" />
                    Ver perfil
                </a>
            </UserProfileCard>
        </li>
    {/each}
</ul>

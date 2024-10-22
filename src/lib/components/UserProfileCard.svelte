<script lang="ts">
    import type { Follower, User } from '$lib/user';
    import Icon from '@iconify/svelte';

    export let selfID: number;

    export let user: User | Follower;
</script>

<div class="flex flex-col gap-4 p-4 lg:min-w-96 rounded-2xl shadow">
    <div class="flex items-center gap-2">
        <img src={user.pfp} alt="" class="rounded-full object-cover size-16" />

        <div>
            <h2 class="flex items-center justify-center gap-1 text-xl">
                <a href="/profile/{user.username}" class="link link-primary">
                    {user.firstname}
                    {user.lastname}
                </a>

                {#if user.id === selfID}
                    <span class="text-sm text-primary">(você)</span>
                {/if}

                {#if user.verified}
                    <div class="tooltip" data-tip="Verificado">
                        <Icon icon="material-symbols:verified" class="text-primary" />
                    </div>
                {/if}
            </h2>
            <p class="text-sm opacity-70">@{user.username}</p>
        </div>
    </div>

    <div>
        <slot />
    </div>
</div>

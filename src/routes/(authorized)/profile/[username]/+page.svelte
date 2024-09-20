<script lang="ts">
    import { spawn } from '$lib/toast';
    import { onMount } from 'svelte';
    import Icon from '@iconify/svelte';
    import type { PageServerData } from './$types';
    import type { User } from '$lib/utils';

    // Data will also be the current user
    export let data: PageServerData & User;

    onMount(() => {
        if (data.error !== undefined) {
            spawn({
                status: 'warning',
                message: 'Não foi possível achar um usuário com este nome.'
            });
        }
    });

    $: user = data.lookup!;
</script>

{#if data.error}
    <div class="w-full min-h-52 flex justify-center items-center text-error">
        Usuário não encontrado com este nome. Tente procurar por algo diferente.
    </div>
{:else}
    <div class="w-full max-w-screen min-h-[calc(100vh-84px)] flex">
        <aside class="w-full max-w-64 p-4 flex flex-col gap-4 border-r-2">
            <section class="space-y-4">
                <img src={user.image_url} alt="" class="rounded-xl" />

                <div>
                    <h2 class="text-center text-xl">{user.firstname} {user.lastname}</h2>
                    <p class="text-center text-sm opacity-70">@{user.username}</p>
                </div>

                {#if user.bio && user.bio.trim() !== ''}
                    <p>{user.bio}</p>
                {/if}
            </section>

            <div class="divider" />

            <section>
                <p class="flex items-center gap-2">
                    <Icon icon="mdi:users" />

                    <span>Seguidores:</span>

                    <a href={`/profile/${user.username}/followers`} class="link link-primary">
                        {user.followers.toLocaleString('pt-br', {
                            notation: 'compact',
                            compactDisplay: 'long'
                        })}
                    </a>
                </p>

                <p class="flex items-center gap-2">
                    <Icon icon="mdi:users-add" />

                    <span>Seguindo:</span>

                    <a href={`/profile/${user.username}/following`} class="link link-primary">
                        {user.following.toLocaleString('pt-br', {
                            notation: 'compact',
                            compactDisplay: 'long'
                        })}
                    </a>
                </p>
            </section>

            <div class="grow" />

            {#if data.username === user.username}
                <button class="btn btn-sm btn-primary">
                    <Icon icon="mingcute:user-follow-2-fill" />
                    Seguir
                </button>
            {/if}
        </aside>

        <main class="w-full p-4">
            <p>Content</p>
        </main>
    </div>
{/if}

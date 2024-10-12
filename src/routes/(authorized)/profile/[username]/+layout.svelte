<script lang="ts">
    import { spawn } from '$lib/toast';
    import { onMount } from 'svelte';
    import Icon from '@iconify/svelte';
    import type { User } from '$lib/utils';
    import { enhance } from '$app/forms';
    import type { LayoutServerData } from './$types';

    export let data: LayoutServerData & User;

    onMount(() => {
        if (data.error !== undefined) {
            spawn({
                status: 'warning',
                message: 'Não foi possível achar um usuário com este nome.'
            });
        }
    });

    $: lookup = data.lookup! as User;
    $: logged = data as User;
</script>

{#if data.error}
    <div class="w-full min-h-52 flex justify-center items-center text-error">
        Usuário não encontrado com este nome. Tente procurar por algo diferente.
    </div>
{:else}
    <div class="w-full max-w-screen min-h-[calc(100vh-84px)] flex">
        <aside class="w-full max-w-64 p-4 flex flex-col gap-4 border-r-2">
            <section class="space-y-4">
                <img
                    src={lookup.pfp}
                    alt=""
                    class="transition-all ease-in-out duration-150 rounded-[100%] hover:rounded-[10%] motion-reduce:transition-none"
                />

                <div>
                    <h2 class="text-center text-xl flex items-center justify-center gap-1">
                        {lookup.firstname}
                        {lookup.lastname}

                        {#if lookup.verified}
                            <div class="tooltip" data-tip="Verificado">
                                <Icon icon="material-symbols:verified" class="text-primary" />
                            </div>
                        {/if}
                    </h2>
                    <p class="text-center text-sm opacity-70">@{lookup.username}</p>
                </div>

                {#if lookup.bio && lookup.bio.trim() !== ''}
                    <p>{lookup.bio}</p>
                {/if}

                <div>
                    {#if lookup.country.trim() !== ''}
                        <div class="flex items-center gap-1">
                            <Icon icon="material-symbols:globe" />
                            <p>Local: <span class="font-bold">{lookup.country}</span></p>
                        </div>
                    {/if}

                    <div class="flex items-center gap-1">
                        <Icon icon="ri:coin-fill" />
                        <p>
                            Arkhoins:
                            <span
                                class="font-bold tooltip cursor-default"
                                data-tip={lookup.arkhoins.toLocaleString(logged.language)}
                            >
                                {lookup.arkhoins.toLocaleString(logged.language, {
                                    style: 'decimal',
                                    notation: 'compact',
                                    compactDisplay: 'long'
                                })}
                            </span>
                        </p>
                    </div>

                    <div class="flex items-center gap-1">
                        <Icon icon="mingcute:up-line" />
                        <p>
                            EXP:
                            <span
                                class="font-bold tooltip cursor-default"
                                data-tip={lookup.xp.toLocaleString(logged.language)}
                            >
                                {lookup.xp.toLocaleString(logged.language, {
                                    style: 'decimal',
                                    notation: 'compact',
                                    compactDisplay: 'long'
                                })}
                            </span>
                        </p>
                    </div>
                </div>
            </section>

            <div class="divider" />

            <section>
                <p class="flex items-center gap-2">
                    <Icon icon="mdi:users" />

                    <span>Seguidores:</span>

                    <a href={`/profile/${lookup.username}/followers`} class="link link-primary">
                        {lookup.followers.toLocaleString(lookup.language, {
                            notation: 'compact',
                            compactDisplay: 'long'
                        })}
                    </a>
                </p>

                <p class="flex items-center gap-2">
                    <Icon icon="mdi:users-add" />

                    <span>Seguindo:</span>

                    <a href={`/profile/${lookup.username}/following`} class="link link-primary">
                        {lookup.following.toLocaleString('pt-br', {
                            notation: 'compact',
                            compactDisplay: 'long'
                        })}
                    </a>
                </p>
            </section>

            <div class="grow" />

            <section class="space-y-2">
                {#if logged.username !== lookup.username}
                    {#if data.isFollowing}
                        <form action="?/unfollow" method="POST" use:enhance={function () {}}>
                            <button type="submit" class="btn btn-sm btn-primary w-full">
                                <Icon icon="mingcute:user-follow-2-fill" />
                                Parar de seguir
                            </button>
                        </form>
                    {:else}
                        <form action="?/follow" method="POST" use:enhance={function () {}}>
                            <button type="submit" class="btn btn-sm btn-primary w-full">
                                <Icon icon="mingcute:user-follow-2-fill" />
                                Seguir
                            </button>
                        </form>
                    {/if}

                    <form action="?/report" method="POST" use:enhance={function () {}}>
                        <button type="submit" class="btn btn-sm btn-error w-full">
                            <Icon icon="material-symbols:block" />
                            Reportar e bloquear
                        </button>
                    </form>
                {:else}
                    <a href="/configuration" class="btn btn-sm w-full">
                        <Icon icon="mdi:cog" />
                        Configurações
                    </a>
                {/if}
            </section>
        </aside>

        <main class="w-full p-4">
            <slot />
        </main>
    </div>
{/if}

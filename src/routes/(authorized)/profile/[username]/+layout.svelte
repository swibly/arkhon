<script lang="ts">
    import { enhance } from '$app/forms';
    import { page } from '$app/stores';
    import { spawn } from '$lib/toast';
    import type { User } from '$lib/user';
    import Icon from '@iconify/svelte';
    import { onMount } from 'svelte';
    import type { LayoutServerData } from './$types';
    import Attention from '$lib/components/Attention.svelte';

    export let data: LayoutServerData & User;

    $: paths = $page.url.pathname.split('/').slice(1);
    $: ghostPath = '';

    const pathNaming: Record<string, string> = {
        profile: 'Perfil',
        following: 'Seguindo',
        followers: 'Seguidores',
        projects: 'Projetos'
    };

    const pathIcons: Record<string, string> = {
        profile: 'mdi:home',
        following: 'mdi:users-add',
        followers: 'mdi:users',
        projects: 'eos-icons:project'
    };

    onMount(() => {
        if (data.error !== undefined) {
            spawn({
                status: 'error',
                message: data.error
            });
        }
    });

    $: lookup = data.lookup! as User;
    $: logged = data as User;
</script>

{#if data.error}
    <div class="w-full max-w-screen min-h-[calc(100vh-84px)] flex relative">
        <aside
            class="flex flex-col w-full gap-4 p-4 border-r-2 border-r-base-200 max-w-64 max-md:hidden fixed min-h-[calc(100vh-84px)]"
        >
            <section class="space-y-4">
                <img
                    src="https://placehold.co/400"
                    alt="avatar"
                    class="transition-all ease-in-out duration-150 rounded-[100%] hover:rounded-[10%] motion-reduce:transition-none"
                />

                <div>
                    <h2 class="flex items-center justify-center gap-1 text-xl text-center">
                        Usuário
                    </h2>
                    <p class="text-sm text-center opacity-70">@usuario</p>
                </div>

                <div>
                    <div class="flex items-center gap-1">
                        <Icon icon="ri:coin-fill" />
                        <p>
                            Arkhoins:
                            <span class="font-bold cursor-default tooltip" data-tip="0">0</span>
                        </p>
                    </div>

                    <div class="flex items-center gap-1">
                        <Icon icon="mingcute:up-line" />
                        <p>
                            EXP:
                            <span class="font-bold cursor-default tooltip" data-tip="0">0</span>
                        </p>
                    </div>
                </div>
            </section>

            <div class="divider" />

            <section>
                <p class="flex items-center gap-2">
                    <Icon icon="mdi:users" />

                    <span>Seguidores:</span>

                    0
                </p>

                <p class="flex items-center gap-2">
                    <Icon icon="mdi:users-add" />

                    <span>Seguindo:</span>

                    0
                </p>
            </section>
        </aside>

        <main class="w-full p-4 md:ml-64">
            <section class="flex items-center gap-2 md:hidden">
                <img
                    src="https://placehold.co/400"
                    alt="avatar"
                    class="object-cover rounded-full size-12 max-[400px]:hidden"
                />

                <div class="space-y-4">
                    <p class="text-xl text-primary">
                        <span> usuario </span>
                        <span class="text-sm opacity-50 text-base-content">@usuario</span>
                    </p>

                    <div class="flex">
                        <div class="flex items-center gap-1">
                            <Icon icon="ri:coin-fill" />
                            <p>
                                Arkhoins:
                                <span class="font-bold cursor-default tooltip" data-tip="0">
                                    0
                                </span>
                            </p>
                        </div>

                        <div class="divider divider-horizontal" />

                        <div class="flex items-center gap-1">
                            <Icon icon="mingcute:up-line" />
                            <p>
                                EXP:
                                <span class="font-bold cursor-default tooltip" data-tip="0">
                                    0
                                </span>
                            </p>
                        </div>
                    </div>

                    <div class="flex">
                        <p class="flex items-center gap-2">
                            <Icon icon="mdi:users" />

                            <span>Seguidores:</span>

                            0
                        </p>

                        <div class="divider divider-horizontal" />

                        <p class="flex items-center gap-2">
                            <Icon icon="mdi:users-add" />

                            <span>Seguindo:</span>

                            0
                        </p>
                    </div>
                </div>
            </section>

            <div class="max-md:divider" />

            <div class="mb-4">
                <h1 class="text-4xl font-bold mb-4">Desculpa, mas...</h1>
                <p class="text-error">{data.error}</p>
            </div>

            <Attention>
                Pode ser que você tenha encontrado este usuário pela comunidade, isso não significa
                que seu perfil estará público ou que ele exista ainda.
            </Attention>
        </main>
    </div>
{:else}
    <div class="w-full max-w-screen min-h-[calc(100vh-84px)] flex relative">
        <aside
            class="flex flex-col w-full gap-4 p-4 border-r-2 border-r-base-200 max-w-64 max-md:hidden fixed min-h-[calc(100vh-84px)]"
        >
            <section class="space-y-4">
                <img
                    src={lookup.pfp}
                    alt="avatar"
                    class="transition-all ease-in-out duration-150 rounded-[100%] hover:rounded-[10%] motion-reduce:transition-none"
                />

                <div>
                    <h2 class="flex items-center justify-center gap-1 text-xl text-center">
                        {lookup.firstname}
                        {lookup.lastname}

                        {#if lookup.verified}
                            <div class="tooltip" data-tip="Verificado">
                                <Icon icon="material-symbols:verified" class="text-primary" />
                            </div>
                        {/if}
                    </h2>
                    <p class="text-sm text-center opacity-70">@{lookup.username}</p>
                </div>

                {#if lookup.bio && lookup.bio.trim() !== ''}
                    <p>{lookup.bio}</p>
                {/if}

                <div>
                    {#if lookup.country.trim() !== ''}
                        <div class="flex items-center gap-1 overflow-auto">
                            <Icon icon="material-symbols:globe" class="shrink-0" />
                            <p class="shrink-0">
                                Local: <span class="font-bold">{lookup.country}</span>
                            </p>
                        </div>
                    {/if}

                    <div class="flex items-center gap-1">
                        <Icon icon="ri:coin-fill" />
                        <p>
                            Arkhoins:
                            <span
                                class="font-bold cursor-default tooltip"
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
                                class="font-bold cursor-default tooltip"
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

                    <a
                        href={`/profile/${lookup.username}/followers`}
                        class="link link-primary"
                        on:mouseenter={() => (ghostPath = 'followers')}
                        on:mouseleave={() => (ghostPath = '')}
                    >
                        {lookup.followers.toLocaleString(lookup.language, {
                            notation: 'compact',
                            compactDisplay: 'long'
                        })}
                    </a>
                </p>

                <p class="flex items-center gap-2">
                    <Icon icon="mdi:users-add" />

                    <span>Seguindo:</span>

                    <a
                        href={`/profile/${lookup.username}/following`}
                        class="link link-primary"
                        on:mouseenter={() => (ghostPath = 'following')}
                        on:mouseleave={() => (ghostPath = '')}
                    >
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
                        <form
                            action="/profile/{lookup.username}?/unfollow"
                            method="POST"
                            use:enhance={function () {
                                spawn({
                                    message: 'Você parou de seguir ' + lookup.username
                                });
                            }}
                        >
                            <button type="submit" class="w-full btn btn-sm btn-error">
                                <Icon icon="ri:user-unfollow-fill" />
                                Parar de seguir
                            </button>
                        </form>
                    {:else}
                        <form
                            action="/profile/{lookup.username}?/follow"
                            method="POST"
                            use:enhance={function () {
                                spawn({
                                    message: 'Você começou a seguir ' + lookup.username
                                });
                            }}
                        >
                            <button type="submit" class="w-full btn btn-sm btn-primary">
                                <Icon icon="mingcute:user-follow-2-fill" />
                                Seguir
                            </button>
                        </form>
                    {/if}

                    <form
                        action="/profile/{lookup.username}?/report"
                        method="POST"
                        use:enhance={function () {}}
                    >
                        <button type="submit" class="w-full btn btn-sm btn-error">
                            <Icon icon="material-symbols:block" />
                            Reportar e bloquear
                        </button>
                    </form>
                {:else}
                    <a href="/settings" class="w-full btn btn-sm">
                        <Icon icon="mdi:cog" />
                        Configurações
                    </a>
                {/if}
            </section>
        </aside>

        <main class="w-full p-4 md:ml-64">
            <section class="flex items-center gap-2 md:hidden">
                <img
                    src={lookup.pfp}
                    alt="avatar"
                    class="object-cover rounded-full size-12 max-[400px]:hidden"
                />

                <div class="space-y-4">
                    <p class="text-xl text-primary">
                        <span>
                            {(lookup.firstname + ' ' + lookup.lastname).slice(
                                0,
                                (lookup.firstname + ' ' + lookup.lastname).length > 10
                                    ? 10
                                    : undefined
                            )}
                            {#if (lookup.firstname + ' ' + lookup.lastname).length > 10}
                                <span>...</span>
                            {/if}
                        </span>
                        <span class="text-sm opacity-50 text-base-content">@{lookup.username}</span>
                    </p>

                    <div class="flex">
                        <div class="flex items-center gap-1">
                            <Icon icon="ri:coin-fill" />
                            <p>
                                Arkhoins:
                                <span
                                    class="font-bold cursor-default tooltip"
                                    data-tip={lookup.arkhoins.toLocaleString(logged.language)}
                                >
                                    {lookup.arkhoins.toLocaleString(logged.language, {
                                        style: 'decimal',
                                        notation: 'compact',
                                        compactDisplay: 'short'
                                    })}
                                </span>
                            </p>
                        </div>

                        <div class="divider divider-horizontal" />

                        <div class="flex items-center gap-1">
                            <Icon icon="mingcute:up-line" />
                            <p>
                                EXP:
                                <span
                                    class="font-bold cursor-default tooltip"
                                    data-tip={lookup.xp.toLocaleString(logged.language)}
                                >
                                    {lookup.xp.toLocaleString(logged.language, {
                                        style: 'decimal',
                                        notation: 'compact',
                                        compactDisplay: 'short'
                                    })}
                                </span>
                            </p>
                        </div>
                    </div>

                    <div class="flex">
                        <p class="flex items-center gap-2">
                            <Icon icon="mdi:users" />

                            <span>Seguidores:</span>

                            <a
                                href={`/profile/${lookup.username}/followers`}
                                class="link link-primary"
                            >
                                {lookup.followers.toLocaleString(lookup.language, {
                                    notation: 'compact',
                                    compactDisplay: 'short'
                                })}
                            </a>
                        </p>

                        <div class="divider divider-horizontal" />

                        <p class="flex items-center gap-2">
                            <Icon icon="mdi:users-add" />

                            <span>Seguindo:</span>

                            <a
                                href={`/profile/${lookup.username}/following`}
                                class="link link-primary"
                            >
                                {lookup.following.toLocaleString('pt-br', {
                                    notation: 'compact',
                                    compactDisplay: 'short'
                                })}
                            </a>
                        </p>
                    </div>
                </div>
            </section>

            <div class="flex items-center justify-center gap-2 *:grow mt-4 md:hidden">
                {#if logged.username !== lookup.username}
                    {#if data.isFollowing}
                        <form
                            action="/profile/{lookup.username}?/unfollow"
                            method="POST"
                            use:enhance={function () {
                                spawn({
                                    message: 'Você parou de seguir ' + lookup.username
                                });
                            }}
                        >
                            <button type="submit" class="w-full btn btn-sm btn-error">
                                <Icon icon="ri:user-unfollow-fill" />
                                Parar de seguir
                            </button>
                        </form>
                    {:else}
                        <form
                            action="/profile/{lookup.username}?/follow"
                            method="POST"
                            use:enhance={function () {
                                spawn({
                                    message: 'Você começou a seguir ' + lookup.username
                                });
                            }}
                        >
                            <button type="submit" class="w-full btn btn-sm btn-primary">
                                <Icon icon="mingcute:user-follow-2-fill" />
                                Seguir
                            </button>
                        </form>
                    {/if}

                    <form
                        action="/profile/{lookup.username}?/report"
                        method="POST"
                        use:enhance={function () {}}
                    >
                        <button type="submit" class="w-full btn btn-sm btn-error">
                            <Icon icon="material-symbols:block" />
                            Reportar e bloquear
                        </button>
                    </form>
                {:else}
                    <a href="/settings" class="w-full btn btn-sm">
                        <Icon icon="mdi:cog" />
                        Configurações
                    </a>
                {/if}
            </div>

            <div class="max-md:divider" />

            <section class="mb-4 text-sm breadcrumbs">
                <ul>
                    {#each paths as path}
                        <li class="flex items-center justify-center gap-2">
                            <Icon icon={pathIcons[path] ?? 'mdi:user'} />

                            {#if path === 'profile' || path === paths[paths.length - 1]}
                                {#if paths.indexOf(path) === 1}
                                    {lookup.firstname} {lookup.lastname}
                                {:else}
                                    {pathNaming[path] ?? path}
                                {/if}
                            {:else}
                                <a
                                    href="/{paths.slice(0, paths.indexOf(path) + 1).join('/')}"
                                    class="link link-primary"
                                >
                                    {#if paths.indexOf(path) === 1}
                                        {lookup.firstname} {lookup.lastname}
                                    {:else}
                                        {pathNaming[path] ?? path}
                                    {/if}
                                </a>
                            {/if}
                        </li>
                    {/each}
                    {#if ghostPath !== '' && ghostPath !== paths[paths.length - 1]}
                        <li class="flex items-center justify-center gap-2 text-secondary">
                            <Icon icon={pathIcons[ghostPath]} />
                            {pathNaming[ghostPath]}
                        </li>
                    {/if}
                </ul>
            </section>

            <slot />
        </main>
    </div>
{/if}

<script lang="ts">
    import { enhance } from '$app/forms';
    import { spawn } from '$lib/toast';
    import type { User } from '$lib/user';
    import Icon from '@iconify/svelte';

    export let logged: User;
    export let lookup: User;

    export let isFollowing: boolean;

    export let paths: string[];
    export let ghostPath: string = '';

    const pathNaming: Record<string, string> = {
        profile: 'Perfil',
        following: 'Seguindo',
        followers: 'Seguidores',
        projects: 'Projetos',
        trash: 'Lixeira'
    };

    const pathIcons: Record<string, string> = {
        profile: 'mdi:home',
        following: 'mdi:users-add',
        followers: 'mdi:users',
        projects: 'eos-icons:project',
        trash: 'mdi:trash'
    };
</script>

<div class="w-full max-w-screen min-h-[calc(100vh-84px)] flex relative">
    <aside
        class="flex flex-col w-full gap-4 p-4 border-r border-r-base-200 max-w-64 max-md:hidden fixed min-h-[calc(100vh-84px)]"
    >
        <section class="space-y-4">
            <div class="relative w-fit mx-auto">
                <img
                    src={lookup.show.image || lookup.id === logged.id
                        ? lookup.pfp
                        : 'https://placehold.co/400'}
                    alt="avatar"
                    class="object-cover rounded-full size-32 mx-auto"
                />

                {#if lookup.verified}
                    <span>
                        <Icon
                            icon="material-symbols:verified"
                            class="text-primary absolute bottom-0 -right-2 size-10 bg-base-100 rounded-full border-2 border-base-100"
                        />
                    </span>
                {/if}
            </div>

            <div>
                <h2
                    class="flex items-center justify-center gap-1 text-xl text-center text-primary break-phrase"
                >
                    {lookup.firstname}
                    {lookup.lastname}
                </h2>
                <p class="text-sm text-center opacity-70 break-phrase">@{lookup.username}</p>
            </div>

            {#if lookup.bio && lookup.bio.trim() !== ''}
                <p class="break-phrase text-justify">{lookup.bio}</p>
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
                <a href={`/profile/${lookup.username}/followers`} class="link link-primary">
                    {lookup.followers.toLocaleString(logged.language, {
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
                {#if isFollowing}
                    <form
                        action="/profile/{lookup.username}?/unfollow"
                        method="POST"
                        use:enhance={() =>
                            spawn({ message: `Você parou de seguir ${lookup.username}` })}
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
                        use:enhance={() =>
                            spawn({ message: `Você começou a seguir ${lookup.username}` })}
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
                    use:enhance={() => {}}
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
        <section class="md:hidden">
            <div class="space-y-4">
                <div class="relative w-fit mx-auto">
                    <img
                        src={lookup.show.image || lookup.id === logged.id
                            ? lookup.pfp
                            : 'https://placehold.co/400'}
                        alt="avatar"
                        class="object-cover rounded-full size-24 mx-auto"
                    />

                    {#if lookup.verified}
                        <Icon
                            icon="material-symbols:verified"
                            class="text-primary absolute bottom-0 -right-2 size-8 bg-base-100 rounded-full border-2 border-base-100"
                        />
                    {/if}
                </div>

                <div class="text-xl text-primary text-center">
                    <span>{lookup.firstname} {lookup.lastname}</span>
                    <br />
                    <span class="text-sm opacity-50 text-base-content">@{lookup.username}</span>
                </div>

                {#if lookup.bio && lookup.bio.trim() !== ''}
                    <p class="break-phrase w-fit mx-auto max-w-80">{lookup.bio}</p>
                {/if}

                <div class="flex justify-center">
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

                <div class="flex justify-center">
                    <p class="flex items-center gap-2">
                        <Icon icon="mdi:users" />
                        <span>Seguidores:</span>
                        <a href={`/profile/${lookup.username}/followers`} class="link link-primary">
                            {lookup.followers.toLocaleString(logged.language, {
                                notation: 'compact',
                                compactDisplay: 'short'
                            })}
                        </a>
                    </p>

                    <div class="divider divider-horizontal" />

                    <p class="flex items-center gap-2">
                        <Icon icon="mdi:users-add" />
                        <span>Seguindo:</span>
                        <a href={`/profile/${lookup.username}/following`} class="link link-primary">
                            {lookup.following.toLocaleString('pt-br', {
                                notation: 'compact',
                                compactDisplay: 'short'
                            })}
                        </a>
                    </p>
                </div>
            </div>

            <section class="mt-4 flex gap-2">
                {#if logged.username !== lookup.username}
                    {#if isFollowing}
                        <form
                            action="/profile/{lookup.username}?/unfollow"
                            method="POST"
                            class="grow"
                            use:enhance={() =>
                                spawn({ message: `Você parou de seguir ${lookup.username}` })}
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
                            class="grow"
                            use:enhance={() =>
                                spawn({ message: `Você começou a seguir ${lookup.username}` })}
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
                        class="grow"
                        use:enhance={() => {}}
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
        </section>

        <div class="max-md:divider" />

        <section class="mb-4 text-sm breadcrumbs">
            <ul>
                {#each paths.filter((x) => x.trim() !== '') as path}
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

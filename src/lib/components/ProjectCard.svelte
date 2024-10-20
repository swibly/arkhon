<script lang="ts">
    import { enhance } from '$app/forms';
    import UserIcon from '$lib/components/UserIcon.svelte';
    import type { Project } from '$lib/projects';
    import { spawn } from '$lib/toast';
    import Icon from '@iconify/svelte';

    export let options: Project;
    export let currentUserID: number;
    export let lang: 'pt' | 'en' | 'ru';
    export let showDeleteOperations = false;

    let loadingFavorite = false;

    const limit = 3;
    const users = [
        ...options.allowed_users.map((user) => ({
            name: user.username,
            pfp: user.profile_picture
        })),
        { name: options.owner_username, pfp: options.owner_profile_picture }
    ];
</script>

<article class="p-4 rounded-lg shadow-md w-full max-w-96 shrink-0 overflow-hidden">
    <article class="min-h-6 flex gap-1">
        {#if options.is_public}
            <p class="badge badge-primary badge-outline gap-1">
                <Icon icon="mdi:globe" />
                Público
            </p>
        {:else}
            <p class="badge badge-error badge-outline gap-1">
                <Icon icon="mdi:lock" />
                Privado
            </p>
        {/if}
        {#if options.fork !== null}
            <a
                href="/community/projects/{options.fork}"
                class="badge badge-secondary badge-outline gap-1"
            >
                <Icon icon="prime:clone" />
                Clonado
            </a>
        {/if}
        <p class="badge badge-info badge-outline gap-1">
            <Icon icon="bxs:area" />
            {options.width * options.height}m²
        </p>

        <div class="grow" />

        <span>
            {options.total_favorites.toLocaleString(lang, {
                notation: 'compact',
                compactDisplay: 'long'
            })}
        </span>
        {#if loadingFavorite}
            <div class="flex items-center gap-1">
                <Icon
                    icon="material-symbols:favorite-outline"
                    class="transition text-neutral size-6"
                />
            </div>
        {:else if options.is_favorited}
            <form
                action="/community/projects/{options.id}?/unfavorite"
                method="POST"
                use:enhance={function () {
                    loadingFavorite = true;
                    return ({ update }) => {
                        loadingFavorite = false;
                        spawn({
                            message: 'Você desfavoritou este projeto.'
                        });

                        return update({ reset: true });
                    };
                }}
                class="flex items-center gap-1"
            >
                <button type="submit">
                    <Icon
                        icon="material-symbols:favorite"
                        class="transition text-error size-6 hover:scale-125"
                    />
                </button>
            </form>
        {:else}
            <form
                action="/community/projects/{options.id}?/favorite"
                method="POST"
                use:enhance={function () {
                    loadingFavorite = true;
                    return ({ update }) => {
                        loadingFavorite = false;
                        spawn({
                            message: 'Você favoritou este projeto.'
                        });

                        return update({ reset: true });
                    };
                }}
                class="flex items-center gap-1"
            >
                <button type="submit">
                    <Icon
                        icon="material-symbols:favorite-outline"
                        class="transition text-error size-6 hover:scale-125"
                    />
                </button>
            </form>
        {/if}
    </article>

    <div class="relative">
        <img
            src={options.banner_url === '' ? 'https://placehold.co/600x400' : options.banner_url}
            alt=""
            class="w-full h-48 object-cover mt-2 mb-4 rounded-md shadow-md"
        />

        <div class="absolute -bottom-6 right-0">
            <UserIcon {users} {limit} />
        </div>
    </div>

    <section class="flex flex-col gap-2 mb-4 pt-2">
        <h2 class="text-xl font-bold">
            {options.name}
        </h2>

        <p class="min-h-[72px] line-clamp-3 text-justify grow whitespace-pre-line">
            {#if options.description !== ''}
                {options.description}
            {:else}
                <span class="italic opacity-50">Projeto sem descrição.</span>
            {/if}
        </p>
    </section>

    <section class="flex">
        {#if showDeleteOperations}
            <p class="flex items-center gap-1">
                <Icon icon="mdi:calendar" />
                Deletado:
                <span class="font-bold">
                    {new Date(options.created_at).toLocaleDateString(lang, {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                    })}
                </span>
            </p>
        {:else}
            <p class="flex items-center gap-1">
                <Icon icon="mdi:calendar" />
                Criado:
                <span
                    class="font-bold tooltip tooltip-right"
                    data-tip={new Date(options.created_at).toLocaleDateString(lang, {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                        second: '2-digit'
                    })}
                >
                    {new Date(options.created_at).toLocaleDateString(lang, {
                        day: '2-digit',
                        month: '2-digit'
                    })}
                </span>
            </p>

            <div class="mx-auto divider divider-horizontal" />

            <p class="flex items-center gap-1">
                <Icon icon="mdi:calendar" />
                Editado:
                <span
                    class="font-bold tooltip tooltip-left"
                    data-tip={new Date(options.updated_at).toLocaleDateString(lang, {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                        second: '2-digit'
                    })}
                >
                    {new Date(options.updated_at).toLocaleDateString(lang, {
                        day: '2-digit',
                        month: '2-digit'
                    })}
                </span>
            </p>
        {/if}
    </section>

    <section class="flex gap-2 mt-4">
        {#if showDeleteOperations && currentUserID === options.owner_id}
            <form
                action="/community/projects/{options.id}?/restore"
                method="POST"
                use:enhance={() => {
                    return ({ update }) => {
                        spawn({ message: 'Projeto restaurado.' });
                        update({ reset: false });
                    };
                }}
                class="grow"
            >
                <button class="btn btn-primary btn-sm w-full">
                    <Icon icon="mdi:restore" />
                    Restaurar
                </button>
            </form>
            <form
                action="/community/projects/{options.id}?/unsafeDelete"
                method="POST"
                use:enhance={() => {
                    return ({ update }) => {
                        spawn({ message: 'Projeto deletado da lixeira.' });
                        update({ reset: false });
                    };
                }}
                class="grow"
            >
                <button class="btn btn-error btn-sm w-full">
                    <Icon icon="mdi:trash" />
                    Deletar
                </button>
            </form>
        {:else}
            <a href="/community/projects/{options.id}" class="btn btn-primary btn-sm grow">
                <Icon icon="fa6-solid:magnifying-glass" />
                Ver projeto
            </a>

            {#if currentUserID === options.owner_id || options.allowed_users.filter((x) => x.id === currentUserID && x.allow_delete === true).length > 0}
                <form
                    action="/community/projects/{options.id}?/delete"
                    method="POST"
                    use:enhance={() => {
                        return ({ update }) => {
                            spawn({ message: 'Projeto movido para a lixeira.' });
                            update({ reset: false });
                        };
                    }}
                >
                    <button class="btn btn-error btn-sm">
                        <Icon icon="mdi:trash" />
                    </button>
                </form>
            {/if}
        {/if}
    </section>
</article>

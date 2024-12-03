<script lang="ts">
    import { enhance } from '$app/forms';
    import UserIcon from '$lib/components/UserIcon.svelte';
    import type { Project } from '$lib/projects';
    import { spawn } from '$lib/toast';
    import type { User } from '$lib/user';
    import Icon from '@iconify/svelte';

    export let projectPage: boolean; 
    export let options: Project;
    export let currentUser: User;
    export let lang: 'pt' | 'en' | 'ru';
    export let showDeleteOperations = false;       

    let loadingFavorite = false;    

    const limit = 3;
    $: users = [
        ...options.allowed_users.map((user) => ({
            name: user.username,
            pfp: user.pfp
        })),
        { name: options.owner_username, pfp: options.owner_pfp }
    ];
</script>

<article class={`p-4 rounded-lg w-full ${projectPage ? 'max-w-full' : 'max-w-96 md:max-w-full'} shrink-0 overflow-hidden border border-base-200`}>
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
                <Icon icon="fa-solid:clone" />
                Clonado
            </a>
        {/if}
        <p class="badge badge-info badge-outline gap-1">
            <Icon icon="bxs:area" />
            {options.width * options.height}m²
        </p>

        <div class="grow" />

        {#if loadingFavorite}
            {#if options.is_favorited}
                <Icon icon="material-symbols:favorite" class="transition text-neutral size-6" />
            {:else}
                <Icon
                    icon="material-symbols:favorite-outline"
                    class="transition text-neutral size-6"
                />
            {/if}
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
            <UserIcon {users} {limit} tooltipDirection="left" />
        </div>
    </div>

    <section class="flex flex-col gap-2 mb-4 pt-2">
        <h2 class="text-xl font-bold line-clamp-1">
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

    <p class="badge gap-1">
        <Icon icon="mdi:dollar" />
        {options.budget.toLocaleString(lang, {
            style: 'currency',
            currency: 'BRL'
        })}
    </p>

    <p class="badge gap-1">
        <Icon icon="mdi:heart" />
        {options.total_favorites}
    </p>

    <p class="badge gap-1">
        <Icon icon="fa-solid:clone" />
        {options.total_clones}
    </p>

    <div class="divider" />

    <section class="flex">
        {#if showDeleteOperations && options.deleted_at !== null}
            <p class="flex items-center gap-1">
                <Icon icon="mdi:calendar" />
                Deletado:
                <span class="font-bold">
                    {new Date(options.deleted_at).toLocaleDateString(lang, {
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
        {#if showDeleteOperations && (currentUser.id === options.owner_id || options.allowed_users.filter((x) => x.id === currentUser.id && x.allow_delete === true).length > 0)}
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
                <button class="btn btn-error btn-sm w-full text-white">
                    <Icon icon="mdi:trash" />
                    Deletar
                </button>
            </form>
        {:else}
            <a href="/community/projects/{options.id}" class="btn btn-primary btn-sm grow">
                <Icon icon="fa6-solid:magnifying-glass" />
                Ver projeto
            </a>

            {#if currentUser.id === options.owner_id || options.allowed_users.filter((x) => x.id === currentUser.id && x.allow_delete === true).length > 0}
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
                    <button class="btn btn-error btn-sm text-white">
                        <Icon icon="mdi:trash" />
                    </button>
                </form>
            {/if}
        {/if}
    </section>
</article>

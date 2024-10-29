<script lang="ts">
    import Icon from '@iconify/svelte';
    import { enhance } from '$app/forms';
    import { spawn } from '$lib/toast';
    import UserIcon from '$lib/components/UserIcon.svelte';
    import type { User } from '$lib/user';
    import type { LayoutServerData } from './$types';
    import { goto } from '$app/navigation';

    export let data: LayoutServerData & { user: User };

    let leaveDialog: HTMLDialogElement;
    let loadingFavorite = false;

    $: project = data.project;

    const limit = 3;
    $: users = [
        ...project.allowed_users.map((user) => ({
            name: user.username,
            pfp: user.pfp
        })),
        { name: project.owner_username, pfp: project.owner_pfp }
    ];

    let loadingClone = false;
    let loadingUnlink = false;
    let loadingDelete = false;
</script>

<svelte:head>
    <title>Vendo projeto {project.name} - Swibly Arkhon</title>
</svelte:head>

<div class="w-full max-w-3xl p-4 mx-auto">
    <button role="link" class="btn btn-ghost btn-sm" on:click={() => history.back()}>
        <Icon icon="streamline:return-2-solid" />
        Página anterior
    </button>

    <article class="flex items-center gap-1 my-4">
        {#if project.is_public}
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

        {#if project.fork !== null}
            <a
                href="/community/projects/{project.fork}"
                class="badge badge-secondary badge-outline gap-1"
            >
                <Icon icon="fa-solid:clone" />
                Clonado
            </a>
        {/if}

        <p class="badge badge-info badge-outline gap-1">
            <Icon icon="bxs:area" />
            {project.width * project.height}m²
        </p>

        <p class="badge badge-success badge-outline gap-1">
            <Icon icon="mdi:dollar" />
            {project.budget.toLocaleString(data.user.language, {
                style: 'currency',
                currency: 'BRL'
            })}
        </p>

        <div class="grow" />

        <div>
            {#if loadingFavorite}
                <button type="button" class="btn btn-sm" disabled>
                    {#if project.is_favorited}
                        Desfavoritar
                        <Icon icon="material-symbols:favorite" />
                    {:else}
                        Favoritar
                        <Icon icon="material-symbols:favorite-outline" />
                    {/if}
                </button>
            {:else}
                <form
                    action="?/{project.is_favorited ? 'un' : ''}favorite"
                    method="POST"
                    use:enhance={function () {
                        loadingFavorite = true;
                        return ({ update }) => {
                            loadingFavorite = false;
                            spawn({
                                message: project.is_favorited
                                    ? 'Você desfavoritou este projeto.'
                                    : 'Você favoritou este projeto.'
                            });

                            return update({ reset: true });
                        };
                    }}
                >
                    <button type="submit" class="btn btn-sm">
                        {#if project.is_favorited}
                            Desfavoritar
                            <Icon icon="material-symbols:favorite" class="transition text-error" />
                        {:else}
                            Favoritar
                            <Icon
                                icon="material-symbols:favorite-outline"
                                class="transition text-error"
                            />
                        {/if}
                    </button>
                </form>
            {/if}
        </div>
    </article>

    <img
        src={project.banner_url === '' ? 'https://placehold.co/600x400' : project.banner_url}
        alt={`Banner do projeto ${project.name}`}
        class="min-h-64 max-h-96 w-full object-cover rounded-xl"
    />

    <article class="flex items-center justify-center gap-1 my-4">
        {#if project.fork !== null && (data.user.id === project.owner_id || project.allowed_users.filter((x) => x.id === data.user.id && x.allow_manage_metadata === true).length > 0)}
            <form
                method="POST"
                action="?/unlink"
                use:enhance={async function () {
                    loadingUnlink = true;

                    return ({ update }) => {
                        loadingUnlink = false;

                        spawn({ message: 'Projeto desvinculado do original.' });

                        return update({ reset: false });
                    };
                }}
            >
                {#if loadingUnlink}
                    <button type="button" class="btn btn-sm" disabled>
                        <span class="loading loading-spinner loading-md" />
                        Carregando...
                    </button>
                {:else}
                    <button class="btn btn-sm">
                        <Icon icon="mingcute:unlink-fill" />
                        Desvincular
                    </button>
                {/if}
            </form>
        {/if}

        <form
            method="POST"
            action="?/clone"
            use:enhance={async function () {
                loadingClone = true;

                return ({ update }) => {
                    loadingClone = false;

                    spawn({ message: 'Projeto clonado. Verifique seus projetos!' });

                    return update({ reset: false });
                };
            }}
        >
            {#if loadingClone}
                <button type="button" class="btn btn-sm" disabled>
                    <span class="loading loading-spinner loading-md" />
                    Carregando...
                </button>
            {:else}
                <button class="btn btn-sm btn-primary">
                    <Icon icon="fa-solid:clone" />
                    Clonar
                </button>
            {/if}
        </form>

        {#if (data.user.id === project.owner_id || project.allowed_users.filter((x) => x.id === data.user.id && x.allow_delete === true).length > 0) && project.deleted_at === null}
            <form
                action="?/delete"
                method="POST"
                use:enhance={() => {
                    return ({ update }) => {
                        spawn({ message: 'Projeto deletado da lixeira.' });
                        update({ reset: false });
                    };
                }}
            >
                <button class="btn btn-error btn-sm" disabled={loadingDelete}>
                    {#if loadingDelete}
                        <Icon icon="mdi:trash" />
                        Enviando para lixeira
                    {:else}
                        <Icon icon="mdi:trash" />
                        Enviar para lixeira
                    {/if}
                </button>
            </form>
        {/if}
    </article>

    <div class="flex items-center gap-2 my-4">
        <div class="shrink-0">
            <UserIcon {users} {limit} />
        </div>

        <a href="/community/projects/{project.id}/allowed" class="link link-primary">
            {users.length}
            {users.length > 1 ? 'pessoas estão' : 'pessoa está'} no projeto

            {#if project.owner_id === data.user.id || project.allowed_users.filter((x) => x.id === data.user.id).length > 0}
                (incluindo você)
            {/if}
        </a>

        {#if project.allowed_users.filter((x) => x.id === data.user.id).length > 0}
            <button class="btn btn-error btn-xs" on:click={() => leaveDialog.show()}>
                <Icon icon="pepicons-pop:leave" />
            </button>

            <dialog bind:this={leaveDialog} class="modal -top-10">
                <div class="modal-box bg-transparent shadow-none flex flex-col gap-2">
                    <form
                        method="POST"
                        action="/community/projects/{project.id}/allowed?/leave"
                        use:enhance={() => {
                            return ({ update, result }) => {
                                // @ts-ignore
                                if (result.data && result.data.error !== undefined) {
                                    spawn({
                                        // @ts-ignore
                                        message: result.data.error,
                                        status: 'error'
                                    });

                                    return update({ reset: false });
                                }

                                spawn({
                                    message: 'Você saiu deste projeto.'
                                });

                                goto(`/profile/${data.user.username}`);
                            };
                        }}
                    >
                        <button class="btn btn-error w-full">
                            <Icon icon="pepicons-pop:leave" />
                            Sair do projeto
                        </button>
                    </form>

                    <form method="dialog">
                        <button class="btn btn-primary w-full">
                            <Icon icon="material-symbols:close" />
                            Quero ficar. (cancelar)
                        </button>
                    </form>
                </div>
                <form
                    method="dialog"
                    class="modal-backdrop backdrop-grayscale backdrop:transition-all"
                >
                    <button class="cursor-default">close</button>
                </form>
            </dialog>
        {/if}
    </div>

    <h1 class="text-2xl font-bold text-primary">{project.name}</h1>

    <div class="mt-2 flex flex-wrap justify-center gap-x-8">
        <p class="flex items-center gap-1">
            <Icon icon="mdi:calendar" />
            Criado:
            <span
                class="font-bold tooltip tooltip-right"
                data-tip={new Date(project.created_at).toLocaleDateString(data.user.language, {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit'
                })}
            >
                {new Date(project.created_at).toLocaleDateString(data.user.language, {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric'
                })}
            </span>
        </p>

        <p class="flex items-center gap-1">
            <Icon icon="mdi:calendar" />
            Editado:
            <span
                class="font-bold tooltip tooltip-left"
                data-tip={new Date(project.updated_at).toLocaleDateString(data.user.language, {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit'
                })}
            >
                {new Date(project.updated_at).toLocaleDateString(data.user.language, {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric'
                })}
            </span>
        </p>

        <div class="flex items-center gap-2">
            {#if loadingFavorite}
                {#if project.is_favorited}
                    <Icon icon="material-symbols:favorite" class="transition text-neutral size-6" />
                {:else}
                    <Icon
                        icon="material-symbols:favorite-outline"
                        class="transition text-neutral size-6"
                    />
                {/if}
            {:else}
                <form
                    action="?/{project.is_favorited ? 'un' : ''}favorite"
                    method="POST"
                    use:enhance={function () {
                        loadingFavorite = true;
                        return ({ update }) => {
                            loadingFavorite = false;
                            spawn({
                                message: project.is_favorited
                                    ? 'Você desfavoritou este projeto.'
                                    : 'Você favoritou este projeto.'
                            });

                            return update({ reset: true });
                        };
                    }}
                    class="size-6"
                >
                    <button type="submit">
                        {#if project.is_favorited}
                            <Icon
                                icon="material-symbols:favorite"
                                class="transition text-error size-6 hover:scale-125"
                            />
                        {:else}
                            <Icon
                                icon="material-symbols:favorite-outline"
                                class="transition text-error size-6 hover:scale-125"
                            />
                        {/if}
                    </button>
                </form>
            {/if}

            <span>
                {project.total_favorites.toLocaleString(data.user.language, {
                    notation: 'compact',
                    compactDisplay: 'long'
                })}
                {#if project.total_favorites > 1 || project.total_favorites === 0}
                    pessoas curtiram
                {:else}
                    pessoa curtiu
                {/if}
            </span>
        </div>
    </div>

    <div class="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-2 mt-4">
        <a href="/community/projects/{project.id}/edit" class="btn btn-sm btn-primary">
            <Icon icon="mdi:eye" />
            Ir para o editor
        </a>

        {#if data.user.id === project.owner_id || project.allowed_users.filter((x) => x.id === data.user.id && x.allow_manage_metadata === true).length > 0}
            <a href="/community/projects/{project.id}/meta" class="btn btn-sm btn-secondary">
                <Icon icon="mdi:pencil" />
                Editar informações do projeto
            </a>
        {/if}
    </div>

    <div class="divider" />

    <h2 class="text-xl font-bold">Descrição do projeto</h2>

    <p class="whitespace-pre-line text-justify leading-7 mt-4">
        {#if project.description === ''}
            <span class="italic opacity-50">Projeto sem descrição.</span>
        {:else}
            {project.description}
        {/if}
    </p>
</div>

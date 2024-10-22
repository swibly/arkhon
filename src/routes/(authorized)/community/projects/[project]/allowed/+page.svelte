<script lang="ts">
    import type { User } from '$lib/user';
    import Icon from '@iconify/svelte';
    import type { LayoutServerData } from '../$types';
    import Input from '$lib/components/Input.svelte';
    import { enhance } from '$app/forms';
    import type { Pagination } from '$lib/utils';
    import { spawn } from '$lib/toast';
    import UserProfileCard from '$lib/components/UserProfileCard.svelte';
    import { onMount } from 'svelte';
    import Attention from '$lib/components/Attention.svelte';

    export let data: LayoutServerData & { user: User };

    $: project = data.project;

    $: userSearch = {
        data: [],
        next_page: -1,
        total_pages: 0,
        current_page: -1,
        previous_page: -1,
        total_records: 0
    } as Pagination<User>;

    $: unsavedChanges = {} as Record<string, boolean>;

    function changePage(page: number) {
        const form = document.querySelector('form') as HTMLFormElement;
        (form.querySelector('input[name="page"]') as HTMLInputElement).value = page.toString();

        form.requestSubmit();
    }

    function setUnsaved(username: string) {
        unsavedChanges[username] = true;
    }

    function clearUnsaved() {
        unsavedChanges = {};
    }

    onMount(function () {
        const forms = document.querySelectorAll<HTMLFormElement>('form.userperm');

        for (const form of forms) {
            const inputs = form.querySelectorAll<HTMLInputElement>('input[type="checkbox"]');
            const username = form.querySelector<HTMLInputElement>('input[name="username"]');

            for (const input of inputs) {
                input.onclick = () => setUnsaved(username!.value);
            }
        }
    });
</script>

<svelte:head>
    <title>Usuários do projeto {project.name} - Swibly Arkhon</title>
</svelte:head>

{#if project.deleted_at !== null}
    <p class="p-2 w-full bg-warning flex justify-center items-center gap-2">
        <Icon icon="mdi:alert" />
        Este projeto está na lixeira do dono. Você pode estar vendo uma versão antiga.
    </p>
{/if}

<div class="w-full max-w-3xl p-4 mx-auto">
    <button role="link" class="btn btn-ghost btn-sm mb-4" on:click={() => history.back()}>
        <Icon icon="streamline:return-2-solid" />
        Página anterior
    </button>

    {#if data.user.id === project.owner_id}
        <form
            action="/home?/searchUsers"
            method="POST"
            use:enhance={() => {
                clearUnsaved();

                return ({ update, result }) => {
                    // @ts-ignore
                    if (result.data.status !== 200) {
                        spawn({
                            // @ts-ignore
                            message: result.data.error,
                            status: 'error'
                        });
                        return update({ reset: false });
                    }

                    // @ts-ignore
                    userSearch = result.data.search;

                    // @ts-ignore
                    if (result.data.search.total_records === 0) {
                        spawn({
                            // @ts-ignore
                            message: 'Nenhum usuário encontrado com essa pesquisa',
                            status: 'error'
                        });
                    }

                    return update({ reset: false });
                };
            }}
        >
            <h1 class="text-2xl font-bold">Adicione mais pessoas no projeto</h1>

            <Input
                name="search"
                labels={{ topLeft: 'Nome do usuário' }}
                placeholder="Pesquisar por nome"
                required
            />

            <input type="hidden" name="page" value={userSearch.current_page} />

            <button type="submit" class="btn btn-primary btn-sm w-full">
                <Icon icon="gravity-ui:magnifier" />
                Procurar
            </button>

            <div class="w-fit mx-auto">
                {#if userSearch.total_pages > 1}
                    <div class="my-4 join">
                        {#if userSearch.current_page > 2}
                            <button
                                type="button"
                                on:click={() => changePage(1)}
                                class="join-item btn btn-sm"
                            >
                                1
                            </button>
                            <button type="button" class="join-item btn btn-sm btn-disabled">
                                ...
                            </button>
                        {/if}

                        {#if userSearch.previous_page !== -1}
                            <button
                                type="button"
                                on:click={() => changePage(userSearch.previous_page)}
                                class="join-item btn btn-sm"
                            >
                                {userSearch.previous_page}
                            </button>
                        {/if}

                        <button type="button" class="join-item btn btn-sm btn-primary">
                            {userSearch.current_page}
                        </button>

                        {#if userSearch.next_page !== -1}
                            <button
                                type="button"
                                on:click={() => changePage(userSearch.next_page)}
                                class="join-item btn btn-sm"
                            >
                                {userSearch.next_page}
                            </button>
                        {/if}

                        {#if userSearch.current_page < userSearch.total_pages - 1}
                            <button type="button" class="join-item btn btn-sm btn-disabled">
                                ...
                            </button>
                            <button
                                type="button"
                                on:click={() => changePage(userSearch.total_pages)}
                                class="join-item btn btn-sm"
                            >
                                {userSearch.total_pages}
                            </button>
                        {/if}
                    </div>
                {/if}
            </div>

            {#if userSearch.total_records !== 0}
                <div class="border border-base-200 p-4 mt-4 rounded-md space-y-4">
                    {#each userSearch.data as user}
                        <UserProfileCard {user} selfID={data.user.id}>
                            <form
                                method="POST"
                                action="?/initialAssign"
                                use:enhance={() => {
                                    clearUnsaved();

                                    return ({ update, result }) => {
                                        // @ts-ignore
                                        if (result.data.status !== 200) {
                                            spawn({
                                                // @ts-ignore
                                                message: result.data.error,
                                                status: 'error'
                                            });
                                        }

                                        return update({ reset: false });
                                    };
                                }}
                            >
                                <input type="text" name="username" value={user.username} hidden />
                                <button
                                    class="btn btn-sm w-full"
                                    disabled={user.id === data.user.id ||
                                        project.allowed_users.filter((x) => x.id === user.id)
                                            .length > 0}
                                >
                                    <Icon icon="mdi:plus" />
                                    Adicionar
                                </button>
                            </form>
                        </UserProfileCard>
                    {/each}
                </div>
            {/if}
        </form>

        <div class="divider" />
    {/if}

    <div class="mb-4">
        <h1 class="text-2xl font-bold">Usuários permitidos</h1>
        <p>Uma lista de todos os usuários com permissões neste projeto</p>
    </div>

    {#if data.user.id === project.owner_id || project.allowed_users.filter((x) => x.id === data.user.id && x.allow_manage_users === true).length > 0}
        <div class="my-4">
            <Attention type="tip">
                Para remover um usuário da lista, remove todas as suas permissões.
            </Attention>
        </div>
    {/if}

    <section class="space-y-4">
        <div class="flex flex-col gap-4 p-4 lg:min-w-96 rounded-2xl shadow">
            <div class="flex items-center gap-2">
                <img src={project.owner_pfp} alt="" class="rounded-full size-16" />

                <div>
                    <h2 class="flex items-center justify-center gap-1 text-xl">
                        <a href="/profile/{project.owner_username}" class="link link-primary">
                            {project.owner_firstname}
                            {project.owner_lastname}
                        </a>

                        {#if project.owner_id === data.user.id}
                            <span class="text-sm text-primary">(você)</span>
                        {/if}

                        {#if project.owner_verified}
                            <div class="tooltip" data-tip="Verificado">
                                <Icon icon="material-symbols:verified" class="text-primary" />
                            </div>
                        {/if}
                    </h2>
                    <p class="text-sm opacity-70">@{project.owner_username}</p>
                </div>
            </div>
        </div>

        {#each project.allowed_users as allowed_user}
            <div class="flex flex-col gap-4 p-4 lg:min-w-96 rounded-2xl shadow">
                <div class="flex items-center gap-2">
                    <img src={allowed_user.pfp} alt="" class="rounded-full size-16" />

                    <div>
                        <h2 class="flex items-center justify-center gap-1 text-xl">
                            <a href="/profile/{allowed_user.username}" class="link link-primary">
                                {allowed_user.firstname}
                                {allowed_user.lastname}
                            </a>

                            {#if allowed_user.id === data.user.id}
                                <span class="text-sm text-primary">(você)</span>
                            {/if}

                            {#if allowed_user.verified}
                                <div class="tooltip" data-tip="Verificado">
                                    <Icon icon="material-symbols:verified" class="text-primary" />
                                </div>
                            {/if}
                        </h2>
                        <p class="text-sm opacity-70">@{allowed_user.username}</p>
                    </div>
                </div>

                {#if data.user.id === project.owner_id || project.allowed_users.filter((x) => x.id === data.user.id && x.allow_manage_users === true).length > 0}
                    <form
                        class="userperm"
                        method="POST"
                        action="?/assign"
                        use:enhance={() => {
                            clearUnsaved();

                            return ({ update }) => {
                                spawn({
                                    message: 'Usuário atualizado.'
                                });

                                return update({ reset: false });
                            };
                        }}
                    >
                        <Input
                            name="view"
                            element="checkbox"
                            checked={allowed_user.allow_view}
                            size="xs"
                        >
                            Ver projeto
                        </Input>

                        <Input
                            name="edit"
                            element="checkbox"
                            checked={allowed_user.allow_edit}
                            size="xs"
                        >
                            Editar projeto
                        </Input>

                        <Input
                            name="delete"
                            element="checkbox"
                            checked={allowed_user.allow_delete}
                            size="xs"
                        >
                            Deletar projeto
                        </Input>

                        <Input
                            name="share"
                            element="checkbox"
                            checked={allowed_user.allow_share}
                            size="xs"
                        >
                            Compartilhar projeto
                        </Input>

                        <Input
                            name="publish"
                            element="checkbox"
                            checked={allowed_user.allow_publish}
                            size="xs"
                        >
                            Publicar projeto
                        </Input>

                        <Input
                            name="manage_users"
                            element="checkbox"
                            checked={allowed_user.allow_manage_users}
                            size="xs"
                        >
                            Editar usuários
                        </Input>

                        <Input
                            name="manage_metadata"
                            element="checkbox"
                            checked={allowed_user.allow_manage_metadata}
                            size="xs"
                        >
                            Editar informações do projeto
                        </Input>

                        <input type="text" name="username" value={allowed_user.username} hidden />

                        <div class="flex items-center gap-2 mt-4">
                            <button class="btn btn-sm btn-primary">
                                <Icon icon="mdi:feather" />
                                Salvar
                            </button>

                            {#if unsavedChanges[allowed_user.username]}
                                <p class="link opacity-50 italic">Alterações não salvas</p>
                            {/if}
                        </div>
                    </form>
                {/if}
            </div>
        {/each}
    </section>
</div>

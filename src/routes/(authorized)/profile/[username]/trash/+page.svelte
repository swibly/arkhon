<script lang="ts">
    import type { User } from '$lib/user';
    import type { PageServerData } from './$types';
    import ProjectCard from '$lib/components/ProjectCard.svelte';
    import Pagination from '$lib/components/Pagination.svelte';
    import Icon from '@iconify/svelte';
    import { enhance } from '$app/forms';
    import Attention from '$lib/components/Attention.svelte';
    import ComponentCard from '$lib/components/store/ComponentCard.svelte';

    export let data: PageServerData & { user: User; lookup: User };

    $: pagination = data.trashed;
    $: trashed = pagination.data;
    $: componentTrash = data.componentTrash;

    let loading = false;
    let type: string = 'project';

    let clearDialog: HTMLDialogElement;

    console.log(data.componentTrash);
</script>

<h1 class="text-3xl font-bold text-primary">Lixeira</h1>
<p>Seus {type === 'project' ? 'projetos' : 'componentes'} apagados</p>

{#if (data.user.username === data.lookup.username && pagination.total_records > 1 && type === 'project') || (data.user.username === data.lookup.username && componentTrash.total_records > 1 && type === 'component')}
    <button
        class="btn btn-sm btn-wide btn-error mt-4 text-white"
        on:click={() => clearDialog.show()}
    >
        <Icon icon="mdi:trash" />
        Limpar lixeira
    </button>
{/if}

<div class="w-full flex justify-center gap-2 mt-4">
    <button
        class={`btn btn-sm ${
            type === 'project' ? 'btn-primary text-white' : 'btn-neutral text-black'
        }`}
        on:click={() => (type = 'project')}>Projetos</button
    >
    <button
        class={`btn btn-sm ${
            type === 'component' ? 'btn-primary text-white' : 'btn-neutral text-black'
        }`}
        on:click={() => (type = 'component')}>Componentes</button
    >
</div>

{#if data.user.username === data.lookup.username && pagination.total_records > 1 && type === 'project'}
    <div class="mt-4">
        <Attention>
            Apenas os projetos que você é dono serão excluídos ao utilizar a opção "Limpar lixeira",
            garantindo a sua segurança e a integridade dos demais projetos.
        </Attention>
    </div>
{/if}

<div class="divider" />

{#if type === 'project'}
    {#if data.user.username !== data.lookup.username}
        <p class="text-error">Você não pode ver a lixeira de outras pessoas.</p>
    {:else if trashed.length === 0}
        <p class="mb-4 opacity-70 italic">Você ainda não colocou nenhum projeto na lixeira.</p>
    {:else}
        <div class="mx-auto w-fit">
            <Pagination {pagination} />
        </div>

        <div
            class="grid grid-cols-2 md:grid-cols-[repeat(auto-fill,minmax(384px,1fr))] gap-x-2 gap-y-4 max-sm:flex max-sm:flex-wrap max-md:place-items-center"
        >
            {#each trashed as trash}
                <ProjectCard
                    options={trash}
                    currentUser={data.user}
                    lang={data.user.language}
                    showDeleteOperations
                    projectPage={true}
                />
            {/each}
        </div>
    {/if}

    <dialog bind:this={clearDialog} class="modal">
        <div class="modal-box shadow-none flex flex-col gap-2">
            <span class="text-xl font-bold">Você tem certeza que deseja limpar a lixeira?</span>

            <p class="text-justify">
                Apenas os seus próprios projetos serão deletados. Para remover um projeto de outro
                usuário no qual você possui permissão, exclua-o manualmente.
            </p>

            <p class="font-bold">
                {pagination.total_records.toLocaleString(data.user.language)} projetos poderão ser deletados.
                (caso você seja dono de todos)
            </p>

            <form
                method="POST"
                action="?/clear"
                class="mt-4"
                use:enhance={({ formData }) => {
                    loading = true;

                    formData.set('type', type);

                    return ({ update }) => {
                        loading = false;
                        clearDialog.close();

                        return update({ reset: true });
                    };
                }}
            >
                <button class="btn btn-error w-full text-white">
                    <Icon icon="mdi:trash" />
                    Limpar lixeira
                </button>
            </form>

            <form method="dialog">
                <button class="btn btn-primary w-full">
                    <Icon icon="material-symbols:close" />
                    Não quero. (cancelar)
                </button>
            </form>
        </div>
        <form
            method="dialog"
            class="modal-backdrop backdrop-grayscale bg-black/60 backdrop:transition-all"
        >
            <button class="cursor-default">close</button>
        </form>
    </dialog>
{:else if type === 'component'}
    {#if componentTrash.data.length > 0}
        <div class="mt-4">
            <Pagination pagination={data.trashed} />
        </div>

        <section class="grid grid-cols-4 gap-4">
            {#each componentTrash.data as component}
                <ComponentCard componentData={component} userData={data.user} />
            {/each}
        </section>
    {:else}
        <p class="mb-4 opacity-70 italic">Você ainda não colocou nenhum componente na lixeira.</p>
    {/if}

    <dialog bind:this={clearDialog} class="modal">
        <div class="modal-box shadow-none flex flex-col gap-2">
            <span class="text-xl font-bold text-center"
                >Você tem certeza que deseja limpar a lixeira?</span
            >

            <p class="font-bold text-center">
                {componentTrash.total_records.toLocaleString(data.user.language)} componentes serão deletados.
            </p>

            <form
                method="POST"
                action="?/clear"
                class="mt-4"
                use:enhance={({ formData }) => {
                    loading = true;

                    formData.set('type', type);

                    return ({ update }) => {
                        loading = false;
                        clearDialog.close();

                        return update({ reset: true });
                    };
                }}
            >
                <button class="btn btn-error w-full text-white">
                    <Icon icon="mdi:trash" />
                    Limpar lixeira
                </button>
            </form>

            <form method="dialog">
                <button class="btn btn-primary w-full">
                    <Icon icon="material-symbols:close" />
                    Não quero. (Cancelar)
                </button>
            </form>
        </div>
        <form
            method="dialog"
            class="modal-backdrop backdrop-grayscale bg-black/60 backdrop:transition-all"
        >
            <button class="cursor-default">close</button>
        </form>
    </dialog>
{/if}

<script lang="ts">
    import type { ActionData, PageServerData } from './$types';
    import type { Project } from '$lib/projects';
    import type { User } from '$lib/user';
    import Input from '$lib/components/Input.svelte';
    import { enhance } from '$app/forms';
    import { spawn } from '$lib/toast';
    import Icon from '@iconify/svelte';
    import Attention from '$lib/components/Attention.svelte';
    import { getComparison } from '$lib/utils';
    import { onMount } from 'svelte';

    export let data: PageServerData & { user: User; project: Project };

    let loadingPublish = false;

    let publishDialog: HTMLDialogElement;
    let privateDialog: HTMLDialogElement;

    let width = 30;
    let height = 30;
    let comparison = getComparison(width, height);

    let unsavedChanges = false;

    $: errorField = '';
    let loading = false;
    let error: string | [string, string] | undefined;

    onMount(() => {
        for (const input of document.querySelectorAll<HTMLInputElement>('input')) {
            input.oninput = () => {
                unsavedChanges = true;
            };
        }

        (document.querySelector('input[name="width"]') as HTMLInputElement).oninput = (e) => {
            width = ~~(e.target as HTMLInputElement).value || 30;
            comparison = getComparison(width, height);

            unsavedChanges = true;
        };

        (document.querySelector('input[name="height"]') as HTMLInputElement).oninput = (e) => {
            height = ~~(e.target as HTMLInputElement).value || 30;
            comparison = getComparison(width, height);

            unsavedChanges = true;
        };
    });
</script>

<div class="w-full max-w-3xl p-4 mx-auto">
    <button role="link" class="btn btn-ghost btn-sm mb-4" on:click={() => history.back()}>
        <Icon icon="streamline:return-2-solid" />
        Página anterior
    </button>

    <form
        method="POST"
        action="?/update"
        use:enhance={async () => {
            loading = true;
            error = undefined;
            errorField = '';

            return ({ update, result }) => {
                if (result.type !== 'success') {
                    // @ts-ignore
                    error = result.data.error;

                    loading = false;

                    if (typeof error === 'object') {
                        errorField = Object.keys(error)[0];
                    }
                    spawn({
                        message: typeof error === 'object' ? Object.values(error)[0] : error,
                        status: 'error',
                        duration: 7000
                    });

                    return update({ reset: false });
                }

                unsavedChanges = false;

                spawn({
                    message: 'Projeto salvo!'
                });

                return update({ reset: false });
            };
        }}
    >
        <div class="mb-4 space-y-2">
            <h1 class="text-3xl font-bold">Informações do projeto</h1>
            <p>
                Precisamos dessas informações para ajudar a
                <span class="text-primary">dar vida ao seu projeto</span>. Compartilhe um pouco
                sobre ele.
            </p>
        </div>

        <Input
            name="name"
            icon="mdi:pen"
            placeholder="Exemplo: Escola Pieno"
            labels={{ topLeft: 'Nome do projeto' }}
            required
            maxSize={32}
            error={errorField === 'name'}
            defaultValue={data.project.name}
        />

        <Input
            name="description"
            placeholder="Exemplo: Uma escola"
            labels={{ topLeft: 'Descrição do projeto' }}
            element="textarea"
            error={errorField === 'description'}
            resizeable={true}
            maxSize={5000}
            defaultValue={data.project.description}
        />

        <div class="divider" />

        <div class="mb-4 space-y-2">
            <h1 class="text-3xl font-bold">Propriedades da planta baixa</h1>
            <p>
                Ajuste as dimensões e o orçamento da planta baixa para atender às suas necessidades
                específicas.
            </p>
        </div>

        <div class="flex flex-wrap gap-2">
            <div class="grow">
                <Input
                    name="width"
                    icon="akar-icons:width"
                    type="number"
                    placeholder="30"
                    labels={{ topLeft: 'Largura (em metros)' }}
                    min={1}
                    max={1000}
                    error={errorField === 'width'}
                    defaultValue={data.project.width.toString()}
                />
            </div>
            <div class="grow">
                <Input
                    name="height"
                    icon="akar-icons:height"
                    type="number"
                    placeholder="30"
                    labels={{ topLeft: 'Altura (em metros)' }}
                    min={1}
                    max={1000}
                    error={errorField === 'height'}
                    defaultValue={data.project.height.toString()}
                />
            </div>
        </div>

        <p class="text-center italic">
            Esta planta terá um tamanho de <span class="text-primary">{width}m</span> por
            <span class="text-primary">{height}m</span>, totalizando
            <span class="text-primary">{width * height}m²</span>. Isso é aproximadamente o tamanho
            de
            <span class="text-primary">{comparison}</span>.
        </p>

        <div class="divider divider-start divider-end" />

        <Input
            name="budget"
            icon="mdi:dollar"
            type="number"
            step="0.01"
            placeholder="0"
            labels={{ topLeft: 'Orçamento' }}
            min={0}
            defaultValue={data.project.budget.toString()}
        />

        <Attention type="tip">
            O <span class="font-bold">orçamento</span> é uma estimativa do valor que você pretende gastar no seu projeto.
        </Attention>

        <div class="divider divider-start divider-end" />

        <div class="flex items-center gap-2">
            <button type="submit" class="btn btn-sm btn-primary">
                <Icon icon="mdi:feather" />
                Salvar
            </button>

            {#if unsavedChanges}
                <p class="link opacity-50 italic">Alterações não salvas</p>
            {/if}
        </div>
    </form>

    <div class="divider" />

    <div class="mb-4">
        <h1 class="text-2xl font-bold">Privacidade do projeto</h1>
        <p>
            Atualmente o projeto está
            <span class="font-bold">
                {data.project.is_public ? 'público' : 'privado'}
            </span>. Clique no botão abaixo para alterar sua visibilidade.
        </p>
    </div>

    {#if data.user.id === data.project.owner_id || data.project.allowed_users.filter((x) => x.id === data.user.id && x.allow_publish).length === 0}
        {#if loadingPublish}
            <button class="btn btn-sm" disabled>
                <span class="loading loading-spinner loading-sm" />
                Carregando...
            </button>
        {:else if !data.project.is_public}
            <button class="btn btn-sm btn-success" on:click={() => publishDialog.show()}>
                <Icon icon="mdi:success" />
                Publicar projeto
            </button>

            <dialog bind:this={publishDialog} class="modal">
                <div class="modal-box max-w-xl shadow-none flex flex-col gap-2">
                    <span class="text-xl font-bold">
                        Você tem certeza que deseja publicar o projeto?
                    </span>

                    <p class="text-justify">
                        Ao publicar o projeto, ele ficará disponível para toda a comunidade,
                        permitindo que qualquer pessoa possa visualizar e clonar o conteúdo.
                    </p>

                    <form
                        method="POST"
                        action="?/publish"
                        use:enhance={function () {
                            loadingPublish = true;

                            return function ({ update }) {
                                loadingPublish = false;

                                spawn({ message: 'Projeto publicado com sucesso!' });

                                return update();
                            };
                        }}
                    >
                        <button type="submit" class="btn btn-sm btn-primary w-full">
                            <Icon icon="mdi:success" />
                            Publicar projeto
                        </button>
                    </form>

                    <form method="dialog">
                        <button class="btn btn-sm btn-error w-full">
                            <Icon icon="mdi:block" />
                            Deixar privado. (cancelar)
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
        {:else}
            <button
                type="submit"
                class="btn btn-sm btn-error"
                on:click={() => privateDialog.show()}
            >
                <Icon icon="mdi:block" />
                Privar projeto
            </button>

            <div class="mt-4">
                <Attention>
                    Se o projeto for privado, ele será removido dos favoritos de
                    {data.project.total_favorites.toLocaleString(data.user.language, {
                        notation: 'compact',
                        compactDisplay: 'long'
                    })}
                    pessoas, caso elas não estejam na lista de usuários autorizados.
                </Attention>
            </div>

            <dialog bind:this={privateDialog} class="modal">
                <div class="modal-box max-w-xl shadow-none flex flex-col gap-2">
                    <span class="text-xl font-bold">
                        Você tem certeza que deseja privar o projeto?
                    </span>

                    <p class="text-justify">
                        Se o projeto for publicado novamente, ele não retornará automaticamente aos
                        favoritos das pessoas.
                    </p>

                    <form
                        method="POST"
                        action="?/unpublish"
                        use:enhance={function () {
                            loadingPublish = true;

                            return function ({ update }) {
                                loadingPublish = false;

                                spawn({ message: 'Projeto privado com sucesso!' });

                                return update();
                            };
                        }}
                    >
                        <button type="submit" class="btn btn-sm btn-error w-full">
                            <Icon icon="mdi:block" />
                            Privar projeto
                        </button>
                    </form>

                    <form method="dialog">
                        <button class="btn btn-sm btn-primary w-full">
                            <Icon icon="material-symbols:close" />
                            Deixar público. (cancelar)
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
    {/if}
</div>

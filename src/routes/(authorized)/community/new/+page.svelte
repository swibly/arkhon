<script lang="ts">
    import Input from '$lib/components/Input.svelte';
    import Icon from '@iconify/svelte';
    import { spawn } from '$lib/toast';
    import Attention from '$lib/components/Attention.svelte';
    import { enhance } from '$app/forms';
    import type { LayoutServerData } from '../../$types';
    import type { ActionData } from './$types';

    let imgPreview: HTMLImageElement;
    let fileInput: HTMLInputElement;
    let file: File | null = null;
    let fileError: string | null = null;

    function handleFileChange(event: Event) {
        const input = event.target as HTMLInputElement;
        if (input.files && input.files.length > 0) {
            const selectedFile = input.files[0];
            const fileSizeLimit = 5 * 1024 * 1024;

            if (selectedFile.size > fileSizeLimit) {
                fileError = 'Tamanho do arquivo não pode ser maior que 5MB';
                file = null;

                imgPreview.src = 'https://placehold.co/600x400';

                spawn({ message: fileError, status: 'error' });
            } else {
                fileError = null;
                file = selectedFile;

                var reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = function (e) {
                    imgPreview.src = e.target!.result as string;
                };
            }
        }
    }

    function handleImageError() {
        fileError = 'Imagem inválida ou corrompida.';
        file = null;

        imgPreview.src = 'https://placehold.co/600x400';

        spawn({ message: fileError, status: 'error' });
    }

    function handleImageLoad() {
        if (file === null) return;

        spawn({ message: 'Imagem adicionada como banner.' });
    }

    function resetImage() {
        if (file === null) return;

        fileError = '';
        file = null;

        imgPreview.src = 'https://placehold.co/600x400';

        spawn({ message: 'Imagem removida do banner.' });
    }

    export let data: LayoutServerData;

    let loading: boolean = false;

    export let form: ActionData;

    $: error = form?.error;
    $: if (error) {
        loading = false;
        spawn({
            message: typeof error === 'object' ? Object.values(error)[0] : error,
            status: 'error',
            duration: 7000
        });
    }
</script>

<div class="w-full max-w-3xl mx-auto p-4">
    <a href="/profile/{data.username}" class="btn btn-ghost btn-sm mb-4">
        <Icon icon="streamline:return-2-solid" />
        Voltar para o perfil
    </a>

    <div class="mb-4">
        <h1 class="text-4xl font-bold text-primary flex items-center gap-2">
            <Icon icon="mdi:plus" />
            Novo Projeto
        </h1>

        <p>Criar um novo projeto público ou privado.</p>
    </div>

    <form
        method="POST"
        use:enhance={async () => {
            loading = true;
            error = undefined;
            return ({ update }) => update({ reset: false });
        }}
    >
        <div class="w-full mb-4">
            <div class="mb-2">
                <h1 class="text-3xl font-bold">Imagem de banner</h1>
                <p>Clique na imagem para editar.</p>

                <div class="mt-2 mb-4">
                    <Attention type="tip">
                        Caso não tenha imagem, o projeto será o banner.
                    </Attention>
                </div>
            </div>

            <div class="relative group overflow-hidden rounded-md">
                <img
                    bind:this={imgPreview}
                    src="https://placehold.co/600x400"
                    alt=""
                    class="w-full h-full max-h-96 object-cover"
                    on:error={handleImageError}
                    on:load={handleImageLoad}
                />

                <button
                    type="button"
                    class="absolute inset-0 bg-black/50 opacity-0 transition group-hover:opacity-100"
                    on:click={() => fileInput.click()}
                >
                    <Icon icon="mdi:pencil" class="size-16 mx-auto text-white" />
                </button>
            </div>
            <input
                type="file"
                name="banner"
                accept="image/png,image/jpg,image/jpeg"
                on:change={handleFileChange}
                bind:this={fileInput}
                class="hidden"
            />

            {#if fileError}
                <p class="text-red-600 text-sm mt-1">{fileError}</p>
            {/if}

            <button
                type="button"
                on:click={resetImage}
                class="btn btn-sm btn-error w-full mt-4"
                disabled={file === null}
            >
                <Icon icon="mdi:trash" />
                Remover imagem
            </button>
        </div>

        <div class="divider" />

        <h1 class="text-3xl font-bold mb-2">Informações do projeto</h1>

        <Input
            name="name"
            icon="mdi:pen"
            placeholder="Exemplo: Escola Pieno"
            labels={{ topLeft: 'Nome do projeto' }}
            required
        />

        <Input
            name="description"
            placeholder="Exemplo: Uma escola"
            labels={{ topLeft: 'Descrição do projeto' }}
            element="textarea"
        />

        <div class="flex gap-2 flex-wrap">
            <div class="grow">
                <Input
                    name="width"
                    icon="akar-icons:width"
                    type="number"
                    placeholder="30"
                    labels={{ topLeft: 'Largura (metros)' }}
                    min={1}
                    max={1000}
                />
            </div>
            <div class="grow">
                <Input
                    name="height"
                    icon="akar-icons:height"
                    type="number"
                    placeholder="30"
                    labels={{ topLeft: 'Altura (metros)' }}
                    min={1}
                    max={1000}
                />
            </div>
            <div class="grow">
                <Input
                    name="budget"
                    icon="mdi:dollar"
                    type="number"
                    step="0.01"
                    placeholder="0"
                    labels={{ topLeft: 'Orçamento' }}
                    min={0}
                />
            </div>
        </div>

        <div class="divider" />

        <Input name="public" element="checkbox" size="xs">
            Publicar na comunidade
            <span
                class="size-6 bg-primary text-primary-content rounded-full tooltip"
                data-tip="Ao criar o projeto, ele ficará disponível para qualquer pessoa ver e clonar."
            >
                ?
            </span>
        </Input>

        {#if loading}
            <button type="button" class="btn btn-sm btn-disabled mt-4">
                <span class="loading loading-spinner loading-md" />
                Carregando...
            </button>
        {:else}
            <button type="submit" class="btn btn-sm btn-primary mt-8">
                <Icon icon="mdi:plus" />
                Criar
            </button>
        {/if}
    </form>
</div>

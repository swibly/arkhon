<script lang="ts">
    import { enhance } from '$app/forms';
    import Attention from '$lib/components/Attention.svelte';
    import Input from '$lib/components/Input.svelte';
    import QuestionMark from '$lib/components/QuestionMark.svelte';
    import { spawn } from '$lib/toast';
    import Icon from '@iconify/svelte';
    import type { LayoutServerData } from '../../$types';
    import type { ActionData } from './$types';
    import { onMount } from 'svelte';

    let imgPreview: HTMLImageElement;
    let fileInput: HTMLInputElement;
    let file: File | null = null;
    let fileError: string | null = null;

    let width = 30;
    let height = 30;
    let comparison = getComparison();

    function getComparison() {
        const area = width * height;

        if (area <= 5) return 'um armário ou banheiro pequeno';
        if (area <= 10) return 'um pequeno escritório ou depósito';
        if (area <= 20) return 'um quarto padrão';
        if (area <= 30) return 'um quarto grande ou pequena sala de estar';
        if (area <= 40) return 'uma pequena sala de estar ou cozinha espaçosa';
        if (area <= 50) return 'um estúdio compacto';
        if (area <= 60) return 'uma kitchenette ou sala ampla';
        if (area <= 80) return 'um apartamento compacto';
        if (area <= 100) return 'um apartamento de dois quartos';
        if (area <= 120) return 'um apartamento grande ou casa pequena';
        if (area <= 150) return 'uma casa média';
        if (area <= 200) return 'uma casa espaçosa de três quartos';
        if (area <= 300) return 'uma casa de alto padrão';
        if (area <= 400) return 'uma mansão compacta';
        if (area <= 500) return 'uma mansão ampla';
        if (area <= 700) return 'uma propriedade luxuosa';
        if (area <= 1000) return 'uma grande propriedade rural';
        return 'um vasto terreno ou complexo comercial';
    }

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
        if (typeof error === 'object') {
            errorField = Object.keys(error)[0];
        }
        spawn({
            message: typeof error === 'object' ? Object.values(error)[0] : error,
            status: 'error',
            duration: 7000
        });
    }

    $: errorField = '';

    onMount(() => {
        (document.querySelector('input[name="width"]') as HTMLInputElement).oninput = (e) => {
            width = ~~(e.target as HTMLInputElement).value || 30;
            comparison = getComparison();
        };

        (document.querySelector('input[name="height"]') as HTMLInputElement).oninput = (e) => {
            height = ~~(e.target as HTMLInputElement).value || 30;
            comparison = getComparison();
        };
    });
</script>

<svelte:head>
    <title>Novo projeto - Swibly Arkhon</title>
</svelte:head>

<div class="w-full max-w-3xl p-4 mx-auto">
    <a href="/profile/{data.user.username}" class="mb-4 btn btn-ghost btn-sm">
        <Icon icon="streamline:return-2-solid" />
        Voltar para o perfil
    </a>

    <div class="mb-4">
        <h1 class="flex items-center gap-2 text-4xl font-bold text-primary">
            <Icon icon="mdi:plus" />
            Novo Projeto
        </h1>

        <p>Criar um novo projeto público ou privado.</p>
    </div>

    <div class="divider" />

    <form
        method="POST"
        use:enhance={async () => {
            loading = true;
            error = undefined;
            errorField = '';
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

            <div class="relative overflow-hidden rounded-md group">
                <img
                    bind:this={imgPreview}
                    src="https://placehold.co/600x400"
                    alt=""
                    class="object-cover w-full h-full max-h-96"
                    on:error={handleImageError}
                    on:load={handleImageLoad}
                />

                <button
                    type="button"
                    class="absolute inset-0 transition opacity-0 bg-black/50 group-hover:opacity-100"
                    on:click={() => fileInput.click()}
                >
                    <Icon icon="mdi:pencil" class="mx-auto text-white size-16" />
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
                <p class="mt-1 text-sm text-red-600">{fileError}</p>
            {/if}

            <button
                type="button"
                on:click={resetImage}
                class="w-full mt-4 btn btn-sm btn-error"
                disabled={file === null}
            >
                <Icon icon="mdi:trash" />
                Remover imagem
            </button>
        </div>

        <div class="divider" />

        <div class="mb-4 space-y-2">
            <h1 class="text-3xl font-bold">Informações do projeto</h1>
            <p>
                Precisamos dessas informações para ajudar a
                <span class="text-primary">dar vida ao seu projeto</span>. Compartilhe um pouco
                sobre ele e nos diga se já quer que ele
                <span class="text-primary">saia daqui publicado</span>.
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
        />

        <Input
            name="description"
            placeholder="Exemplo: Uma escola"
            labels={{ topLeft: 'Descrição do projeto' }}
            element="textarea"
            resizeable={true}
            maxSize={5000}
        />

        <Input name="public" element="checkbox" size="xs">
            Publicar na comunidade
            <QuestionMark>
                Ao criar o projeto, ele ficará disponível para qualquer pessoa ver e clonar.
            </QuestionMark>
        </Input>

        <div class="divider" />

        <div class="mb-4 space-y-2">
            <h1 class="text-3xl font-bold">Propriedades da planta baixa</h1>
            <details class="collapse collapse-arrow">
                <summary class="collapse-title text-md font-medium text-primary">
                    <div class="flex gap-2 items-center">
                        <Icon icon="ph:blueprint" class="text-xl" />
                        O que é uma planta baixa?
                    </div>
                </summary>
                <div class="collapse-content">
                    <p>
                        A planta baixa é uma representação bidimensional de um local em uma grade
                        quadriculada, onde cada quadrado corresponde a
                        <span class="text-primary">um metro quadrado (m²)</span>. Estas
                        configurações se referem a
                        <span class="text-primary">
                            <Icon icon="akar-icons:width" class="inline" />
                            largura
                            <QuestionMark>Quantidade de quadrados para os lados.</QuestionMark>
                        </span>
                        e a
                        <span class="text-primary">
                            <Icon icon="akar-icons:height" class="inline" />
                            altura
                            <QuestionMark>
                                Quantidade de quadrados para cima e para baixo.
                            </QuestionMark>
                        </span>
                        do ambiente.
                    </p>
                </div>
            </details>
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
                    on
                />
            </div>
        </div>

        <p class="text-center italic">
            Esta planta terá um tamanho de <span class="text-primary">{width}m</span> por
            <span class="text-primary">{height}m</span>, totalizando
            <span class="text-primary">{width * height}m²</span>. Isso é aproximadamente o tamanho
            de
            <span class="text-primary">{comparison}</span>. Você pode ajustar esses valores depois.
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
        />

        <Attention type="tip">
            O <span class="font-bold">orçamento</span> é o valor que você pretende gastar no seu projeto.
            É só uma estimativa e você pode ajustar isso mais tarde, se preferir.
        </Attention>

        <div class="divider" />

        {#if loading}
            <button type="button" class="btn btn-md btn-primary w-full btn-disabled">
                <span class="loading loading-spinner loading-md" />
                Carregando...
            </button>
        {:else}
            <button type="submit" class="btn btn-md btn-primary w-full">
                <Icon icon="mdi:plus" />
                Criar projeto
            </button>
        {/if}
    </form>
</div>

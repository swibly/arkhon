<script lang="ts">
    import { enhance } from '$app/forms';
    import { spawn } from '$lib/toast';
    import type { User } from '$lib/user';
    import Icon from '@iconify/svelte';
    import Input from '../Input.svelte';
    import Attention from '../Attention.svelte';

    type ActionResult =
        | {
              message?: undefined;
              error: string | Record<string, string>;
          }
        | {
              message: string;
              error?: undefined;
          };

    let loading = false;

    export let user: User;

    function handleSaveBaseInformation(data: ActionResult) {
        loading = false;
        errorField = '';

        if (data?.message) {
            spawn({
                message: data.message
            });
        }

        if (data?.error) {
            if (typeof data.error === 'object') {
                errorField = Object.keys(data.error)[0];
            }

            spawn({
                message: typeof data.error === 'object' ? Object.values(data.error)[0] : data.error,
                status: 'error',
                duration: 7000
            });
        }
    }

    $: errorField = '';

    let imagePreview: HTMLImageElement;
    let imageInput: HTMLInputElement;

    let image: File | null = null;
    let imageError: string | null = null;
    let loadingImage = false;
    let hasImageChanged = false;

    function handleImageChange(event: Event) {
        const input = event.target as HTMLInputElement;
        if (input.files && input.files.length > 0) {
            const selectedFile = input.files[0];
            const fileSizeLimit = 5 * 1024 * 1024;

            if (selectedFile.size > fileSizeLimit) {
                imageError = 'Tamanho do arquivo não pode ser maior que 5MB';
                image = null;

                imagePreview.src = user.pfp;

                spawn({ message: imageError, status: 'error' });
            } else {
                imageError = null;
                image = selectedFile;
                hasImageChanged = true;

                var reader = new FileReader();
                reader.readAsDataURL(image);
                reader.onload = function (e) {
                    imagePreview.src = e.target!.result as string;
                };
            }
        }
    }

    function handleImageError() {
        imageError = 'Imagem inválida ou corrompida.';
        image = null;

        imagePreview.src = user.pfp;

        spawn({ message: imageError, status: 'error' });
    }

    function handleImageLoad() {
        if (image === null) return;
    }

    function handleFormSubmission() {
        loadingImage = true;
        return function () {
            loadingImage = false;
            spawn({ message: 'Imagem alterada com sucesso!' });
            location.reload();
        };
    }
</script>

<div class="mb-4">
    <h1 class="text-2xl font-bold">Foto de Perfil</h1>
    <p>Aperte na sua imagem para trocar e depois em salvar</p>
</div>

<form
    method="POST"
    action="/home?/changeImage"
    enctype="multipart/form-data"
    class="w-fit mx-auto"
    use:enhance={handleFormSubmission}
>
    {#if loadingImage}
        <div class="relative">
            <img
                src={user.pfp}
                alt=""
                class="object-cover size-48 rounded-full mx-auto opacity-40"
            />

            <span
                class="loading loading-spinner loading-lg absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
            />
        </div>

        <button type="button" class="mt-4 btn btn-sm btn-primary w-full" disabled>
            <Icon icon="mdi:feather" />
            Salvar
        </button>
    {:else}
        <div class="relative size-48 mx-auto">
            <img
                bind:this={imagePreview}
                src={user.pfp}
                alt=""
                class="object-cover size-48 rounded-full"
                on:error={handleImageError}
                on:load={handleImageLoad}
            />

            <button
                type="button"
                class="absolute inset-0 transition opacity-0 bg-black/50 hover:opacity-100 rounded-full"
                on:click={() => imageInput.click()}
            >
                <Icon icon="mdi:pencil" class="mx-auto text-white size-16" />
            </button>

            <form method="POST" action="/home?/removeImage" use:enhance>
                <button
                    class="absolute bottom-0 right-0 bg-error text-error-content rounded-full border-4 border-base-100 p-2 tooltip"
                    data-tip="Redefine sua imagem para a padrão do Gravatar"
                >
                    <Icon icon="mdi:trash" class="size-6" />
                </button>
            </form>
        </div>

        <input
            bind:this={imageInput}
            type="file"
            name="image"
            accept="image/png,image/jpg,image/jpeg"
            class="hidden"
            on:change={handleImageChange}
        />

        {#if imageError}
            <p class="mt-1 text-sm text-red-600">{imageError}</p>
        {/if}

        <p />

        {#if image !== null}
            <button type="submit" class="mt-4 btn btn-sm btn-primary flex mx-auto">
                <Icon icon="mdi:feather" />
                Salvar
            </button>

            <div class="mt-4">
                <Attention>
                    A imagem pode demorar alguns minutos para atualizar em toda a plataforma.
                </Attention>
            </div>
        {:else}
            <button type="button" class="mt-4 btn btn-sm btn-primary flex mx-auto" disabled>
                <Icon icon="mdi:feather" />
                Salvar
            </button>
        {/if}
    {/if}
</form>

<div class="divider" />

<form
    method="POST"
    action="/settings?/updateProfile"
    class="flex flex-col gap-2"
    use:enhance={async function () {
        loading = true;

        return ({ result, update }) => {
            // @ts-ignore
            handleSaveBaseInformation(result.data);

            return update({ reset: false });
        };
    }}
>
    <div class="mb-4">
        <h1 class="text-2xl font-bold">Informações Básicas</h1>
        <p>Informações que outras pessoas podem ver</p>
    </div>

    <section class="flex gap-2 max-md:flex-col">
        <Input
            name="firstname"
            icon="ph:user-fill"
            placeholder="Nome"
            size="md"
            labels={{ topLeft: 'Nome' }}
            required
            defaultValue={user.firstname}
            maxSize={32}
            error={errorField === 'firstname'}
        />

        <Input
            name="lastname"
            icon="ph:user-fill"
            placeholder="Sobrenome"
            size="md"
            labels={{ topLeft: 'Sobrenome' }}
            required
            defaultValue={user.lastname}
            maxSize={32}
            error={errorField === 'lastname'}
        />
    </section>

    <Input
        name="country"
        icon="mdi:planet"
        placeholder="Local"
        size="md"
        labels={{ topLeft: 'Lugar/País' }}
        defaultValue={user.country}
        maxSize={40}
        error={errorField === 'country'}
    />

    <Input
        name="bio"
        element="textarea"
        placeholder="Bio: Inclua informações, piadas, ou só dê um 'bom dia'!"
        size="md"
        labels={{ topLeft: 'Bio' }}
        defaultValue={user.bio}
        maxSize={480}
        error={errorField === 'bio'}
    />

    {#if loading}
        <button type="button" class="mt-4 btn btn-sm btn-disabled w-fit">
            <span class="loading loading-spinner loading-md" />
            Carregando...
        </button>
    {:else}
        <button type="submit" class="mt-4 btn btn-sm btn-primary w-fit">
            <Icon icon="mdi:feather" />
            Salvar
        </button>
    {/if}
</form>

<script lang="ts">
    import { enhance } from '$app/forms';
    import { spawn } from '$lib/toast';
    import type { User } from '$lib/user';
    import Icon from '@iconify/svelte';

    let loadingSaveBaseInformation = false;

    export let user: User;

    type ActionResult =
        | {
              message?: undefined;
              error: string | Record<string, string>;
          }
        | {
              error: string;
              message?: undefined;
          }
        | {
              message: string;
              error?: undefined;
          }
        | null;

    function handleSaveBaseInformation(data: ActionResult) {
        loadingSaveBaseInformation = false;
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
</script>

<img src={user.pfp} alt="" class="mx-auto rounded-full size-48" />

<div class="text-center space-y-4">
    <p>
        Atualmente, nós usamos o serviço <span class="text-primary">Gravatar</span>. Para mudar sua
        foto de perfil faça um cadastro no Gravatar
        <span class="text-error font-bold tooltip" data-tip="O email é vinculado à foto de perfil!">
            utilizando o mesmo email
        </span> e atualize por lá.
    </p>
    <a href="https://gravatar.com/profile/avatars" target="_blank" class="btn btn-sm btn-primary">
        <Icon icon="simple-icons:gravatar" />
        Ir para o Gravatar
    </a>
</div>

<div class="divider" />

<form
    method="POST"
    action="/settings?/updateProfile"
    class="flex flex-col gap-2"
    use:enhance={async function () {
        loadingSaveBaseInformation = true;

        return ({ result, update }) => {
            // @ts-ignore
            handleSaveBaseInformation(result.data);

            return update({ reset: false });
        };
    }}
>
    <h1 class="text-2xl font-bold mb-4">Informações Básicas</h1>

    <section class="flex gap-2 max-md:flex-col">
        <label class="form-control grow">
            <div class="label">
                <span class="label-text">Nome</span>
                <span class="label-text text-error">Obrigatório</span>
            </div>
            <label
                class="flex items-center gap-2 input input-bordered grow"
                class:input-error={errorField === 'firstname'}
            >
                <Icon icon="ph:user-fill" />
                <input
                    type="text"
                    name="firstname"
                    placeholder="Nome"
                    value={user.firstname}
                    class="grow"
                    required
                />
            </label>
        </label>

        <label class="form-control grow">
            <div class="label">
                <span class="label-text">Sobrenome</span>
                <span class="label-text text-error">Obrigatório</span>
            </div>
            <label
                class="flex items-center gap-2 input input-bordered grow"
                class:input-error={errorField === 'lastname'}
            >
                <Icon icon="ph:user-fill" />
                <input
                    type="text"
                    name="lastname"
                    placeholder="Sobrenome"
                    value={user.lastname}
                    class="grow"
                    required
                />
            </label>
        </label>
    </section>

    <label class="form-control grow">
        <div class="label">
            <span class="label-text">Local/Lugar/País</span>
        </div>
        <label
            class="flex items-center gap-2 input input-bordered grow"
            class:input-error={errorField === 'country'}
        >
            <Icon icon="mdi:planet" />
            <input
                type="text"
                name="country"
                placeholder="Local"
                value={user.country}
                class="grow"
            />
        </label>
    </label>

    <label class="form-control grow">
        <div class="label">
            <span class="label-text">Bio</span>
        </div>
        <textarea
            name="bio"
            class="resize-none textarea textarea-bordered"
            placeholder="Bio: Inclua informações, piadas, ou só dê um 'bom dia'!"
            value={user.bio}
            class:input-error={errorField === 'bio'}
        />
    </label>

    {#if loadingSaveBaseInformation}
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

<script lang="ts">
    import { enhance } from '$app/forms';
    import { spawn } from '$lib/toast';
    import type { User } from '$lib/user';
    import Icon from '@iconify/svelte';
    import Input from '../Input.svelte';

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
        loading = true;

        return ({ result, update }) => {
            // @ts-ignore
            handleSaveBaseInformation(result.data);

            return update({ reset: false });
        };
    }}
>
    <h1 class="text-2xl font-bold mb-4">Informações Básicas</h1>

    <section class="flex gap-2 max-md:flex-col">
        <Input
            name="firstname"
            icon="ph:user-fill"
            placeholder="Nome"
            size="md"
            labels={{ topLeft: 'Nome' }}
            required
            bind:value={user.firstname}
            error={errorField === 'firstname'}
        />

        <Input
            name="lastname"
            icon="ph:user-fill"
            placeholder="Sobrenome"
            size="md"
            labels={{ topLeft: 'Nome' }}
            required
            bind:value={user.lastname}
            error={errorField === 'lastname'}
        />
    </section>

    <Input
        name="country"
        icon="mdi:planet"
        placeholder="Local"
        size="md"
        bind:value={user.country}
        error={errorField === 'country'}
    />

    <Input
        name="bio"
        element="textarea"
        placeholder="Bio: Inclua informações, piadas, ou só dê um 'bom dia'!"
        size="md"
        labels={{ topLeft: 'Bio' }}
        bind:value={user.bio}
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

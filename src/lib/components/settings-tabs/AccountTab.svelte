<script lang="ts">
    import { enhance } from '$app/forms';
    import { spawn } from '$lib/toast';
    import type { User } from '$lib/user';
    import Icon from '@iconify/svelte';
    import Attention from '../Attention.svelte';

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

<section>
    <h1 class="text-2xl font-bold mb-4">Acesso</h1>

    <Attention>Ao trocar o email, certifique-se de que o mesmo exista.</Attention>

    <form
        method="POST"
        action="/settings?/updateProfile"
        class="flex flex-col gap-2 mt-4"
        use:enhance={async function () {
            loadingSaveBaseInformation = true;

            return ({ result }) => {
                // @ts-ignore
                handleSaveBaseInformation(result.data);
            };
        }}
    >
        <section class="flex gap-2 max-md:flex-col">
            <label class="form-control grow">
                <div class="label">
                    <span class="label-text">Email</span>
                    <span class="label-text text-error">obrigatório*</span>
                </div>
                <label
                    class="flex items-center gap-2 input input-bordered grow"
                    class:input-error={errorField === 'email'}
                >
                    <Icon icon="material-symbols:mail" />
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={user.email}
                        class="grow"
                        required
                    />
                </label>
            </label>

            <label class="form-control grow">
                <div class="label">
                    <span class="label-text">Nome de usuário</span>
                    <span class="label-text text-error">obrigatório*</span>
                </div>
                <label
                    class="flex items-center gap-2 input input-bordered grow"
                    class:input-error={errorField === 'username'}
                >
                    <Icon icon="mdi:at" />
                    <input
                        type="text"
                        name="username"
                        placeholder="Nome de usuário"
                        value={user.username}
                        class="grow"
                        required
                    />
                </label>
            </label>
        </section>

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
</section>

<div class="divider" />

<section>
    <h1 class="text-2xl font-bold mb-4">Senha</h1>

    <p>
        Por motivos de segurança, a atualização de senha deve ser feita pelo portal Swibly. Você
        deve ir na aba de segurança e requisitar um reset de senha.
    </p>

    <a href="?tab=security" class="btn btn-sm btn-primary mt-4">
        <Icon icon="mdi:shield" />
        Ir para a aba de segurança
    </a>
</section>

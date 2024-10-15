<script lang="ts">
    import { enhance } from '$app/forms';
    import { spawn } from '$lib/toast';
    import type { User } from '$lib/user';
    import Icon from '@iconify/svelte';
    import Attention from '../Attention.svelte';

    let loadingSaveBaseInformation = false;
    let deleteDialog: HTMLDialogElement;

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

            return ({ result, update }) => {
                // @ts-ignore
                handleSaveBaseInformation(result.data);

                return update({ reset: false });
            };
        }}
    >
        <section class="flex gap-2 max-md:flex-col">
            <label class="form-control grow">
                <div class="label">
                    <span class="label-text">Email</span>
                    <span class="label-text text-error">Obrigatório</span>
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
                    <span class="label-text text-error">Obrigatório</span>
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

<div class="divider" />

<section>
    <h1 class="text-2xl font-bold mb-4 text-error flex items-center gap-2">
        <Icon icon="mdi:alert" />
        Zona de Risco
    </h1>

    <Attention danger>
        Ao deletar sua conta, TODOS os projetos dos quais você é o proprietário serão apagados, e
        TODOS os componentes que você criou se tornarão órfãos, ou seja, permanecerão no sistema,
        mas não estarão mais associados a nenhum usuário.
    </Attention>

    <button
        class="btn btn-sm btn-error my-4 hover:animate-pulse"
        on:click={() => deleteDialog.show()}
    >
        <Icon icon="mdi:block" />
        Deletar PERMANENTEMENTE sua conta
    </button>

    <Attention>
        Não existe possibilidade de recuperação de conta uma vez que ela é deletada.
        <br />
        Assim que sua conta for deletada, um último email será enviado para você, como uma carta de despedidas.
    </Attention>
</section>

<dialog bind:this={deleteDialog} class="modal -top-10">
    <div class="modal-box bg-transparent shadow-none flex flex-col gap-2">
        <form action="/settings?/deleteAccount" method="POST">
            <button class="btn btn-error hover:animate-shake">
                Deletar PERMANENTEMENTE minha conta e TODOS os meus projetos.
            </button>
        </form>

        <form method="dialog">
            <button class="btn btn-primary w-full">Quero ficar. (cancelar)</button>
        </form>
    </div>
    <form method="dialog" class="modal-backdrop backdrop-grayscale backdrop:transition-all">
        <button class="cursor-default">close</button>
    </form>
</dialog>

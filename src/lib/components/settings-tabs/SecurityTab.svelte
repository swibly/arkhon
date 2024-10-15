<script lang="ts">
    import { enhance } from '$app/forms';
    import Icon from '@iconify/svelte';
    import Attention from '../Attention.svelte';
    import type { User } from '$lib/user';
    import { spawn } from '$lib/toast';

    export let user: User;

    let loading: boolean = false;

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

    async function handleActionResult(data: ActionResult) {
        loading = false;
        if (data?.message) {
            spawn({
                message: data.message
            });
        }
        if (data?.error) {
            spawn({
                message: typeof data.error === 'object' ? Object.values(data.error)[0] : data.error,
                status: 'error',
                duration: 7000
            });
        }
    }
</script>

<section class="space-y-4">
    <h2 class="text-xl font-bold">Trocar senha</h2>

    <p>
        Ao clicar no botão abaixo, você receberá um e-mail da
        <span class="text-primary">Swibly Service</span> com o assunto
        <span class="text-primary">Solicitação de Redefinição de Senha</span>. Siga o link do e-mail
        para ser redirecionado ao site da <span class="text-primary">Swibly</span>, onde poderá
        concluir a redefinição da sua senha.
    </p>

    <form
        action="/settings?/resetPassword"
        method="POST"
        use:enhance={async function () {
            loading = true;

            return ({ result }) => {
                // @ts-ignore
                handleActionResult(result.data);
            };
        }}
    >
        <input type="text" name="email" value={user.email} hidden />

        {#if loading}
            <button type="button" class="mt-4 btn btn-sm btn-disabled">
                <span class="loading loading-spinner loading-md" />
                Carregando...
            </button>
        {:else}
            <button type="submit" class="mt-4 btn btn-sm btn-primary">
                <Icon icon="material-symbols:send" />
                Enviar email para trocar senha
            </button>
        {/if}
    </form>

    <Attention type="danger">
        Possivelmente, assim que trocar a senha, você será desconectado dos aparelhos conectados.
    </Attention>
</section>

<div class="divider" />

<section class="space-y-4">
    <h2 class="text-xl font-bold">
        Autenticação de 2 Fatores <span class="text-sm">(segurança atual: 0/3)</span>
    </h2>

    <p>
        A autenticação em duas etapas (2FA) é um método de segurança que exige duas formas de
        verificação para acessar sua conta: algo que você sabe, como sua senha, e algo que você tem,
        como um código enviado para seu dispositivo. Isso adiciona uma camada extra de proteção
        contra acessos não autorizados.
    </p>

    <Attention>
        Estamos trabalhando para que esta funcionalidade seja disponibilizada o mais rápido
        possível.
    </Attention>

    <button type="submit" class="btn btn-primary btn-sm my-4" disabled>Ativar para SMS</button>

    <button type="submit" class="btn btn-primary btn-sm my-4" disabled>Ativar para email</button>

    <button type="submit" class="btn btn-primary btn-sm my-4" disabled>
        Ativar para aplicativo autenticador
    </button>
</section>

<div class="divider" />

<section class="space-y-4">
    <h2 class="text-xl font-bold">Dispositívos Conectados</h2>

    <p>
        Nesta seção, você pode visualizar todos os dispositivos que estão atualmente conectados à
        sua conta. É possível verificar a localização e o tipo de dispositivo, além de desconectar
        aqueles que você não reconhece ou não utiliza mais, garantindo maior controle sobre o acesso
        à sua conta.
    </p>

    <Attention>
        Estamos trabalhando para que esta funcionalidade seja disponibilizada o mais rápido
        possível.
    </Attention>
</section>

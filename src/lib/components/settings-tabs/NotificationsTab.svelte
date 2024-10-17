<script lang="ts">
    import { enhance } from '$app/forms';
    import { spawn } from '$lib/toast';
    import type { User } from '$lib/user';
    import Icon from '@iconify/svelte';
    import Attention from '../Attention.svelte';
    import Input from '../Input.svelte';
    import QuestionMark from '../QuestionMark.svelte';

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

    let loading = false;

    export let user: User;

    function handleSaveNotifications(data: ActionResult) {
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

<section>
    <form
        action="/settings?/updateNotifications"
        method="POST"
        class="flex flex-col gap-2"
        use:enhance={async function () {
            loading = true;

            return ({ result, update }) => {
                // @ts-ignore
                handleSaveNotifications(result.data);

                return update({ reset: false });
            };
        }}
    >
        <Input name="inapp" element="checkbox" size="xs" bind:checked={user.notification.inapp}>
            Dentro da plataforma
            <QuestionMark>
                Receber notificações direto do portal na seção de notificações (abrindo o menu de
                usuário).
            </QuestionMark>
        </Input>

        <Input name="email" element="checkbox" size="xs" bind:checked={user.notification.email}>
            Por email
            <QuestionMark>
                Enviaremos APENAS coisas importantes, tipo tentativas de login, mudanças na sua
                conta etc.
            </QuestionMark>
        </Input>

        <div class="my-4">
            <Attention>Não se esqueça de salvar as alterações!</Attention>
        </div>

        {#if loading}
            <button type="button" class="btn btn-sm btn-disabled w-fit">
                <span class="loading loading-spinner loading-md" />
                Carregando...
            </button>
        {:else}
            <button type="submit" class="btn btn-sm btn-primary w-fit">
                <Icon icon="mdi:feather" />
                Salvar
            </button>
        {/if}
    </form>
</section>

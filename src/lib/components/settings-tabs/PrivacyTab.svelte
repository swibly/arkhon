<script lang="ts">
    import { enhance } from '$app/forms';
    import { spawn } from '$lib/toast';
    import type { User } from '$lib/user';
    import Icon from '@iconify/svelte';
    import Input from '../Input.svelte';
    import QuestionMark from '../QuestionMark.svelte';
    import NewBadge from '../NewBadge.svelte';

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

    function handleSavePrivacy(data: ActionResult) {
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

    function privateProfile() {
        document.querySelectorAll('input[type="checkbox"]').forEach((element) => {
            (element as HTMLInputElement).checked = false;
        });
    }
</script>

<form
    action="/settings?/updatePrivacy"
    method="POST"
    class="flex flex-col gap-2"
    use:enhance={async function () {
        loading = true;

        return ({ result, update }) => {
            // @ts-ignore
            handleSavePrivacy(result.data);

            return update({ reset: false });
        };
    }}
>
    <Input name="profile" element="checkbox" size="xs" checked={user.show.profile}>
        Exibir perfil publicamente
        <QuestionMark>
            Se desativado, independentemente de outras configurações, seu perfil não será exibido
            para outros usuários.
        </QuestionMark>
    </Input>

    <Input name="image" element="checkbox" size="xs" checked={user.show.image}>
        Exibir foto de perfil
        <QuestionMark>
            Se sua foto estiver bloqueada, uma imagem genérica será exibida em seu lugar.
        </QuestionMark>
    </Input>

    <Input name="projects" element="checkbox" size="xs" checked={user.show.projects}>
        Exibir projetos
        <QuestionMark>
            Exibe os projetos que você criou em seu perfil. No entanto, projetos públicos
            continuarão visíveis na comunidade.
        </QuestionMark>
    </Input>

    <Input name="favorites" element="checkbox" size="xs" checked={user.show.favorites}>
        Exibir projetos favoritados
        <QuestionMark>Exibe os projetos que você marcou como favoritos em seu perfil.</QuestionMark>
    </Input>

    <Input name="components" element="checkbox" size="xs" checked={user.show.components}>
        Exibir componentes
        <QuestionMark>Exibe os componentes que você criou no seu perfil.</QuestionMark>
    </Input>

    <Input name="followers" element="checkbox" size="xs" checked={user.show.followers}>
        Exibir seguidores
        <QuestionMark>Exibe a lista de usuários que seguem você.</QuestionMark>
    </Input>

    <Input name="following" element="checkbox" size="xs" checked={user.show.following}>
        Exibir seguindo
        <QuestionMark>Exibe os usuários que você está seguindo.</QuestionMark>
    </Input>

    <Input name="inventory" element="checkbox" size="xs" checked={user.show.inventory}>
        Exibir inventário
        <QuestionMark>Exibe os itens e acessórios que você possui no perfil.</QuestionMark>
        <NewBadge />
    </Input>

    <Input name="formations" element="checkbox" size="xs" checked={user.show.formations}>
        Exibir formações acadêmicas
        <QuestionMark>Exibe suas formações acadêmicas e certificados no perfil.</QuestionMark>
        <NewBadge />
    </Input>

    <div>
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

            <button type="submit" class="btn btn-sm btn-error" on:click={privateProfile}>
                <Icon icon="mdi:block" />
                Privar perfil
            </button>
        {/if}
    </div>
</form>

<script lang="ts">
    import { enhance } from '$app/forms';
    import { spawn } from '$lib/toast';
    import type { User } from '$lib/user';
    import Icon from '@iconify/svelte';

    let loading = false;

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
</script>

<section>
    <h1 class="text-2xl font-bold mb-4">Privacidade do Perfil</h1>

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
        <label for="profile" class="flex items-center gap-2">
            <input
                type="checkbox"
                id="profile"
                name="profile"
                checked={user.show.profile}
                class="checkbox checkbox-xs checkbox-primary"
            />
            Exibir perfil publicamente
            <span
                class="badge tooltip"
                data-tip={'Independente das outras permissões, se desativar esta, seu perfil irá aparecer como "não encontrado" para os outros'}
            >
                Modificador global
            </span>
        </label>

        <label for="projects" class="flex items-center gap-2">
            <input
                type="checkbox"
                id="projects"
                name="projects"
                checked={user.show.projects}
                class="checkbox checkbox-xs checkbox-primary"
            />
            Exibir projetos
            <span
                class="badge tooltip"
                data-tip="Seu projeto ainda pode ser visto na comunidade (se estiver público)"
            >
                Aplicavel apenas para o perfil
            </span>
        </label>

        <label for="favorites" class="flex items-center gap-2">
            <input
                type="checkbox"
                id="favorites"
                name="favorites"
                checked={user.show.favorites}
                class="checkbox checkbox-xs checkbox-primary"
            />
            Exibir favoritos
        </label>

        <label for="components" class="flex items-center gap-2">
            <input
                type="checkbox"
                id="components"
                name="components"
                checked={user.show.components}
                class="checkbox checkbox-xs checkbox-primary"
            />
            Exibir componentes
            <span
                class="badge tooltip"
                data-tip="Seu componente ainda pode ser visto na comunidade (se estiver público)"
            >
                Aplicavel apenas para o perfil
            </span>
        </label>

        <label for="followers" class="flex items-center gap-2">
            <input
                type="checkbox"
                id="followers"
                name="followers"
                checked={user.show.followers}
                class="checkbox checkbox-xs checkbox-primary"
            />
            Exibir seguidores
        </label>

        <label for="following" class="flex items-center gap-2">
            <input
                type="checkbox"
                id="following"
                name="following"
                checked={user.show.following}
                class="checkbox checkbox-xs checkbox-primary"
            />
            Exibir seguindo
        </label>

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
</section>

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

            return ({ result }) => {
                // @ts-ignore
                handleSaveNotifications(result.data);
            };
        }}
    >
        <label for="inapp" class="flex items-center gap-2">
            <input
                type="checkbox"
                id="inapp"
                name="inapp"
                checked={user.notification.inapp}
                class="checkbox checkbox-xs checkbox-primary"
            />
            Dentro da plataform
        </label>

        <label for="email" class="flex items-center gap-2">
            <input
                type="checkbox"
                id="email"
                name="email"
                checked={user.notification.email}
                class="checkbox checkbox-xs checkbox-primary"
            />
            Por email
            <span
                class="badge tooltip"
                data-tip="Enviaremos coisas importantes, tipo tentativas de login, mudanças na sua conta etc."
            >
                Relaxa, não vamos spammar!
            </span>
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

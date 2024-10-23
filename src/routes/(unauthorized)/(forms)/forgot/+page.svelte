<script lang="ts">
    import { enhance } from '$app/forms';
    import Icon from '@iconify/svelte';
    import type { ActionData } from './$types';
    import { spawn } from '$lib/toast';

    let loading: boolean = false;

    export let form: ActionData;

    $: message = form?.message;
    $: error = form?.error;

    $: if (message) {
        loading = false;
    }
    $: if (error) {
        loading = false;
        spawn({
            message: typeof error === 'object' ? Object.values(error)[0] : error,
            status: 'error',
            duration: 7000
        });
    }
</script>

<form
    method="POST"
    class="flex flex-col gap-2"
    use:enhance={async () => {
        loading = true;
        error = undefined;
        return ({ update }) => update({ reset: false });
    }}
>
    <label class="flex items-center gap-2 input input-bordered">
        <Icon icon="material-symbols:mail" />

        <input type="text" name="email" placeholder="Email do usuário" required />
    </label>

    {#if loading}
        <button type="button" class="mt-4 btn btn-sm btn-disabled">
            <span class="loading loading-spinner loading-md" />
            Carregando...
        </button>
    {:else}
        <button type="submit" class="mt-4 btn btn-sm btn-primary">
            <Icon icon="material-symbols:send" />
            Enviar email
        </button>
    {/if}
</form>

{#if message}
    <p class="text-center mt-4">{message}</p>
{/if}

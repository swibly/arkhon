<script lang="ts">
    import type { ActionData } from './$types';
    import { enhance } from '$app/forms';
    import Icon from '@iconify/svelte';
    import { spawn } from '$lib/toast';

    let showPassword: boolean = false;
    let loading: boolean = false;

    export let form: ActionData;

    $: error = form?.error;
    $: if (error) {
        loading = false;
        spawn({
            message: typeof error === 'object' ? Object.values(error)[0] : error,
            status: 'error',
            duration: 7000
        });
    }
</script>

<svelte:head>
    <title>Login - Swibly Arkhon</title>
</svelte:head>

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
        <Icon icon="ph:user-fill" />
        <input type="text" name="login" placeholder="Email ou nome de usuário" required />
    </label>

    <label class="flex items-center gap-2 input input-bordered">
        <Icon icon="ph:lock-fill" />

        <input
            type={showPassword ? 'text' : 'password'}
            name="password"
            placeholder="Senha"
            required
        />

        <button type="button" on:click={() => (showPassword = !showPassword)}>
            {#if showPassword}
                <Icon icon="mdi:eye-off" />
            {:else}
                <Icon icon="mdi:eye" />
            {/if}
        </button>
    </label>

    {#if loading}
        <button type="button" class="mt-4 btn btn-sm btn-disabled">
            <span class="loading loading-spinner loading-md" />
            Carregando...
        </button>
    {:else}
        <button type="submit" class="mt-4 btn btn-sm btn-primary">
            <Icon icon="ph:arrow-right" />
            Entrar
        </button>
    {/if}
</form>

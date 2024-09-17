<script lang="ts">
    import Icon from '@iconify/svelte';
    import type { ActionData } from './$types';
    import { enhance } from '$app/forms';

    let showPassword: boolean = false;
    let showConfirmPassword: boolean = false;
    let loading: boolean = false;

    export let form: ActionData;

    $: error = form?.error;
    $: if (error) loading = false;
</script>

<form
    method="POST"
    class="flex flex-col gap-2"
    use:enhance={async () => {
        loading = true;
        error = '';
        return ({ update }) => update({ reset: false });
    }}
>
    <section class="flex gap-2 max-md:flex-col">
        <label class="flex items-center gap-2 input input-bordered grow">
            <Icon icon="ph:user-fill" />
            <input type="text" name="firstname" placeholder="Nome" required />
        </label>

        <label class="flex items-center gap-2 input input-bordered grow">
            <Icon icon="ph:user-fill" />
            <input type="text" name="lastname" placeholder="Sobrenome" required />
        </label>
    </section>

    <div class="divider" />

    <label class="flex items-center gap-2 input input-bordered">
        <Icon icon="material-symbols:mail" />
        <input type="text" name="email" placeholder="Email" required />
    </label>

    <label class="flex items-center gap-2 input input-bordered">
        <Icon icon="lets-icons:e-mail" />
        <input type="text" name="username" placeholder="Nome de usuário" required />
    </label>

    <div class="divider" />

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

    <label class="flex items-center gap-2 input input-bordered">
        <Icon icon="ph:lock-fill" />

        <input
            type={showConfirmPassword ? 'text' : 'password'}
            name="password-confirm"
            placeholder="Confirme sua senha"
            required
        />

        <button type="button" on:click={() => (showConfirmPassword = !showConfirmPassword)}>
            {#if showConfirmPassword}
                <Icon icon="mdi:eye-off" />
            {:else}
                <Icon icon="mdi:eye" />
            {/if}
        </button>
    </label>

    {#if error}
        <p class="text-center text-error">{error}</p>
    {/if}

    {#if loading}
        <button type="button" class="mt-4 btn btn-sm btn-disabled">
            <span class="loading loading-spinner loading-md" />
            Carregando...
        </button>
    {:else}
        <button type="submit" class="mt-4 btn btn-sm btn-primary">
            <Icon icon="ph:arrow-right" />
            Registrar*
        </button>
    {/if}

    <p class="text-sm italic text-center">
        *Ao registrar, concorda com os
        <a href="/tos" class="link link-primary">Termos de Serviço</a>
    </p>
</form>

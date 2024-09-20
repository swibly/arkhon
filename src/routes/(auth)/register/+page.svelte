<script lang="ts">
    import Icon from '@iconify/svelte';
    import type { ActionData } from './$types';
    import { enhance } from '$app/forms';

    let showPassword: boolean = false;
    let showPasswordConfirm: boolean = false;

    export let form: ActionData;
    let loading: boolean = false;
    $: {
        if (form?.error) loading = false;
    }

    $: error = form?.error;
</script>

<h1 class="text-center text-4xl sm:text-5xl px-4 font-bold text-white m-12">
    Crie sua conta na Arkhon
</h1>

<h2 class="text-xl text-center sm:text-2xl mt-4 px-4 text-secondary">
    Registrar-se garante acesso as ferramentas da Arkhon
</h2>

<section class="mx-12 mt-8">
    <form
        method="POST"
        use:enhance={() => {
            loading = true;
            error = undefined;
            return ({ update }) => update({ reset: false });
        }}
    >
        <div class="lg:flex justify-center gap-2">
            <label class="input input-bordered flex items-center gap-2 mb-4 lg:flex-1 bg-neutral">
                <Icon icon="material-symbols:person" />
                <input
                    type="text"
                    class="firstname w-full"
                    id="firstname"
                    name="firstname"
                    placeholder="Nome"
                />
            </label>

            <label class="input input-bordered flex items-center gap-2 mb-4 lg:flex-1 bg-neutral">
                <Icon icon="material-symbols:person" />
                <input
                    type="text"
                    class="lastname w-full"
                    id="lastname"
                    name="lastname"
                    placeholder="Sobrenome"
                />
            </label>
        </div>

        <label class="input input-bordered flex items-center gap-2 my-8 bg-neutral flex">
            <Icon icon="material-symbols:person" />
            <input
                type="text"
                class="username w-full"
                id="username"
                name="username"
                placeholder="Nome de usuário"
            />
        </label>

        <article class="divider before:bg-white after:bg-white" />

        <label class="input input-bordered flex items-center gap-2 my-8 bg-neutral">
            <Icon icon="ic:baseline-email" />
            <input type="text" class="email w-full" id="email" name="email" placeholder="Email" />
        </label>

        <label class="input input-bordered flex items-center gap-2 mb-8 bg-neutral">
            <Icon icon="material-symbols:lock" />
            <input
                type={showPassword ? 'text' : 'password'}
                class="password w-full"
                id="password"
                name="password"
                placeholder="Senha"
            />
            <button type="button" on:click={() => (showPassword = !showPassword)} class="ml-auto">
                {#if showPassword}
                    <Icon icon="mdi:eye" />
                {:else}
                    <Icon icon="ph:eye-closed" />
                {/if}
            </button>
        </label>

        <label class="input input-bordered flex items-center gap-2 bg-neutral">
            <Icon icon="material-symbols:lock" />
            <input
                type={showPasswordConfirm ? 'text' : 'password'}
                class="confirm_pass w-full"
                id="confirm_pass"
                name="confirm_pass"
                placeholder="Confirmar Senha"
            />
            <button
                type="button"
                on:click={() => (showPasswordConfirm = !showPasswordConfirm)}
                class="ml-auto"
            >
                {#if showPasswordConfirm}
                    <Icon icon="mdi:eye" />
                {:else}
                    <Icon icon="ph:eye-closed" />
                {/if}
            </button>
        </label>

        <label class="text-white flex mt-8 gap-2 align-items">
            <input type="checkbox" checked class="checkbox bg-white" /> Concordo com os Termos de Uso
        </label>

        {#if error}
            <p class="text-error text-center pt-12 text-xl">
                {typeof error === 'string' ? error : Object.values(error)[0]}
            </p>
        {/if}

        {#if !loading}
            <button class="text-white mt-8 pb-4 mx-auto w-fit block">
                <Icon icon="emojione-monotone:right-arrow" font-size="60px" />
            </button>
        {:else}
            <div class="w-fit mx-auto">
                <span class="loading loading-ring loading-lg" />
            </div>
        {/if}
    </form>

    <h2 class="text-center text-white mb-4">
        Já possui uma conta? <a href="/login/" class="text-secondary">Clique aqui!</a>
    </h2>
</section>
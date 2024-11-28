<script lang="ts">
    import Icon from '@iconify/svelte';
    import type { ActionData } from './$types';
    import { enhance } from '$app/forms';
    import { spawn } from '$lib/toast';    

    let showPassword: boolean = false;
    let showConfirmPassword: boolean = false;
    let loading: boolean = false;
    let regex: RegExp = /^[a-z0-9]+$/;
    let emailRegex: RegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{1,}$/;

    let firstnameRef: HTMLInputElement;
    let lastnameRef: HTMLInputElement;
    let emailRef: HTMLInputElement;
    let usernameRef: HTMLInputElement;
    let passwordRef: HTMLInputElement;
    let confirmPasswordRef: HTMLInputElement;

    let isNameAllowed: boolean = false;
    let isEmailAllowed: boolean = false;
    let isUsernameLengthAllowed: boolean = false;
    let isUsernameCharactersAllowed: boolean = false;
    let isAllowed: boolean = false;
    let isSame: boolean = true;

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

    function getNameValue() {
        if (firstnameRef.value.length >= 3 && lastnameRef.value.length >= 3) {
            isNameAllowed = true;
        } else {
            isNameAllowed = false;
        }
    }

    function getEmailValue() {
        if (emailRegex.test(emailRef.value)) {
            isEmailAllowed = true;
        } else {
            isEmailAllowed = false;
        }
    }

    function getUsernameValue() {
        if (usernameRef.value.length >= 3) {
            isUsernameLengthAllowed = true;
        } else {
            isUsernameLengthAllowed = false;
        }

        if (regex.test(usernameRef.value)) {
            isUsernameCharactersAllowed = true;
        } else {
            isUsernameCharactersAllowed = false;
        }
    }

    function getInputValue() {
        if (passwordRef.value.length >= 6) {
            isAllowed = true;
        } else {
            isAllowed = false;
        }

        confirmPass();
    }

    function confirmPass() {
        if (passwordRef.value === confirmPasswordRef.value) {
            isSame = true;
        } else {
            isSame = false;
        }
    }
</script>

<svelte:head>
    <title>Register - Swibly Arkhon</title>
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
    <section class="flex gap-2 max-md:flex-col">
        <label
            class={`flex items-center gap-2 input input-bordered ${
                isNameAllowed ? 'input' : 'input-error'
            } grow`}
        >
            <Icon icon="ph:user-fill" />
            <input
                type="text"
                name="firstname"
                placeholder="Nome"
                required
                bind:this={firstnameRef}
                on:input={getNameValue}
            />
        </label>

        <label
            class={`flex items-center gap-2 input input-bordered ${
                isNameAllowed ? 'input' : 'input-error'
            } grow`}
        >
            <Icon icon="ph:user-fill" />
            <input
                type="text"
                name="lastname"
                placeholder="Sobrenome"
                required
                bind:this={lastnameRef}
                on:input={getNameValue}
            />
        </label>
    </section>

    <section>
        <p class={`${isNameAllowed ? 'hidden' : 'text-error'}`}>
            * O nome e o sobrenome devem possuir no mínimo 3 caracteres cada
        </p>
    </section>

    <div class="divider" />

    <label
        class={`flex items-center gap-2 input input-bordered ${
            isNameAllowed ? 'input' : 'input-error'
        }`}
    >
        <Icon icon="material-symbols:mail" />
        <input
            type="text"
            name="email"
            placeholder="Email"
            required
            bind:this={emailRef}
            on:input={getEmailValue}
        />
    </label>

    <section>
        <p class={`${isEmailAllowed ? 'hidden' : 'text-error'}`}>* Formato de email incorreto</p>
    </section>

    <label
        class={`flex items-center gap-2 input input-bordered ${
            isUsernameLengthAllowed && isUsernameCharactersAllowed ? 'input' : 'input-error'
        }`}
    >
        <Icon icon="lets-icons:e-mail" />
        <input
            type="text"
            name="username"
            placeholder="Nome de usuário"
            required
            bind:this={usernameRef}
            on:input={getUsernameValue}
        />
    </label>

    <section>
        <p class={`${isUsernameLengthAllowed ? 'hidden' : 'text-error'}`}>
            * O nome de usuário deve possuir no mínimo 3 caracteres
        </p>
        <p class={`${isUsernameCharactersAllowed ? 'hidden' : 'text-error'}`}>
            * O nome de usuário deve consistir apenas de caracteres alfanuméricos minúsculos
        </p>
    </section>

    <div class="divider" />

    <label
        class={`flex items-center gap-2 input input-bordered ${
            isAllowed ? 'input' : 'input-error'
        }`}
    >
        <Icon icon="ph:lock-fill" />

        <input
            type={showPassword ? 'text' : 'password'}
            name="password"
            placeholder="Senha"
            required
            bind:this={passwordRef}
            on:input={getInputValue}
        />

        <button type="button" on:click={() => (showPassword = !showPassword)}>
            {#if showPassword}
                <Icon icon="mdi:eye-off" />
            {:else}
                <Icon icon="mdi:eye" />
            {/if}
        </button>
    </label>

    <section>
        <p class={`${isAllowed ? 'hidden' : 'text-error'}`}>
            * A senha deve possuir no mínimo 6 caracteres
        </p>
    </section>

    <label
        class={`flex items-center gap-2 input input-bordered ${isSame ? 'input' : 'input-error'}`}
    >
        <Icon icon="ph:lock-fill" />

        <input
            type={showConfirmPassword ? 'text' : 'password'}
            name="password-confirm"
            placeholder="Confirme sua senha"
            required
            bind:this={confirmPasswordRef}
            on:input={confirmPass}
        />

        <button type="button" on:click={() => (showConfirmPassword = !showConfirmPassword)}>
            {#if showConfirmPassword}
                <Icon icon="mdi:eye-off" />
            {:else}
                <Icon icon="mdi:eye" />
            {/if}
        </button>
    </label>

    <section>
        <p class={`${isSame ? 'hidden' : 'text-error'}`}>*As senhas devem ser as mesmas</p>
    </section>

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
        *Ao registrar, você concorda com os
        <a href="/tos" class="link link-primary">Termos de Serviço</a>
    </p>
</form>

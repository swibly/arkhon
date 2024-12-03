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

    let passwordScore: number = 0;
    let normalizedPasswordScore: string = '';

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

    const validationState = {
        isFirstNameAllowed: true,
        isLastNameAllowed: true,
        isEmailAllowed: true,
        isUsernameLengthAllowed: true,
        isUsernameCharactersAllowed: true,
        isPasswordAllowed: true,
        isPasswordsMatch: true
    };

    function getPasswordScore(score: number): string {
        if (score === 1) return 'fraca';
        if (score === 2) return 'média';
        if (score === 3) return 'forte';
        if (score === 4) return 'muito forte';

        return 'vazia';
    }

    function validateLength(input: string, length: number) {
        return input.length >= length || input.length === 0;
    }

    function validateRegex(input: string, regex: RegExp) {
        return regex.test(input) || input.length === 0;
    }

    function validadePassword(password: string, confirmPassword: string) {
        return (
            password === confirmPassword || (password.length === 0 && confirmPassword.length === 0)
        );
    }

    function validateInputs() {
        validationState.isFirstNameAllowed = validateLength(firstnameRef.value, 3);
        validationState.isLastNameAllowed = validateLength(lastnameRef.value, 3);
        validationState.isEmailAllowed = validateRegex(emailRef.value, emailRegex);
        validationState.isUsernameLengthAllowed = validateLength(usernameRef.value, 3);
        validationState.isUsernameCharactersAllowed = validateRegex(usernameRef.value, regex);
        validationState.isPasswordAllowed = validateLength(passwordRef.value, 6);
        validationState.isPasswordsMatch = validadePassword(
            passwordRef.value,
            confirmPasswordRef.value
        );

        passwordScore =
            ~~/[\W\d]/.test(passwordRef.value) +
            ~~/[^\W]/.test(passwordRef.value) +
            ~~(passwordRef.value.length > 6) +
            ~~(passwordRef.value.length > 18);

        normalizedPasswordScore = getPasswordScore(passwordScore);
    }
</script>

<svelte:head>
    <title>Register - Swibly Arkhon</title>
</svelte:head>

<form
    method="POST"
    class="flex flex-col gap-2"
    on:input={validateInputs}
    use:enhance={async () => {
        loading = true;
        error = undefined;
        return ({ update }) => update({ reset: false });
    }}
>
    <section class="flex gap-2 max-md:flex-col">
        <label
            class="flex items-center gap-2 input input-bordered grow"
            class:input-error={!validationState.isFirstNameAllowed ||
                !validationState.isLastNameAllowed}
        >
            <Icon icon="ph:user-fill" />
            <input
                type="text"
                name="firstname"
                placeholder="Nome"
                required
                bind:this={firstnameRef}
            />
        </label>

        <label
            class="flex items-center gap-2 input input-bordered grow"
            class:input-error={!validationState.isFirstNameAllowed ||
                !validationState.isLastNameAllowed}
        >
            <Icon icon="ph:user-fill" />
            <input
                type="text"
                name="lastname"
                placeholder="Sobrenome"
                required
                bind:this={lastnameRef}
            />
        </label>
    </section>

    <section>
        <p
            class={`${
                validationState.isFirstNameAllowed && validationState.isLastNameAllowed
                    ? 'hidden'
                    : 'text-error'
            }`}
        >
            * O nome e o sobrenome devem possuir no mínimo 3 caracteres cada
        </p>
    </section>

    <div class="divider" />

    <label
        class="flex items-center gap-2 input input-bordered"
        class:input-error={!validationState.isEmailAllowed}
    >
        <Icon icon="material-symbols:mail" />
        <input type="text" name="email" placeholder="Email" required bind:this={emailRef} />
    </label>

    <section>
        <p class={`${validationState.isEmailAllowed ? 'hidden' : 'text-error'}`}>
            * Formato de email incorreto
        </p>
    </section>

    <label
        class="flex items-center gap-2 input input-bordered"
        class:input-error={!validationState.isUsernameCharactersAllowed ||
            !validationState.isUsernameLengthAllowed}
    >
        <Icon icon="lets-icons:e-mail" />
        <input
            type="text"
            name="username"
            placeholder="Nome de usuário"
            required
            bind:this={usernameRef}
        />
    </label>

    <section>
        <p class={`${validationState.isUsernameLengthAllowed ? 'hidden' : 'text-error'}`}>
            * O nome de usuário deve possuir no mínimo 3 caracteres
        </p>
        <p class={`${validationState.isUsernameCharactersAllowed ? 'hidden' : 'text-error'}`}>
            * O nome de usuário deve consistir apenas de caracteres alfanuméricos minúsculos
        </p>
    </section>

    <div class="divider" />

    <label
        class="flex items-center gap-2 input input-bordered"
        class:input-error={!validationState.isPasswordAllowed}
    >
        <Icon icon="ph:lock-fill" />

        <input
            type={showPassword ? 'text' : 'password'}
            name="password"
            placeholder="Senha"
            required
            bind:this={passwordRef}
        />

        <button type="button" on:click={() => (showPassword = !showPassword)}>
            {#if showPassword}
                <Icon icon="mdi:eye-off" />
            {:else}
                <Icon icon="mdi:eye" />
            {/if}
        </button>
    </label>

    <div
        class="join gap-1 rounded-full border border-base-200 tooltip tooltip-bottom inline-flex"
        data-tip="Senha {normalizedPasswordScore}"
    >
        <div class="join-item grow h-2" class:bg-error={passwordScore > 0} />
        <div class="join-item grow h-2" class:bg-warning={passwordScore > 1} />
        <div class="join-item grow h-2" class:bg-success={passwordScore > 2} />
        <div class="join-item grow h-2" class:bg-success={passwordScore > 3} />
    </div>

    <section>
        <p class={`${validationState.isPasswordAllowed ? 'hidden' : 'text-error'}`}>
            * A senha deve possuir no mínimo 6 caracteres
        </p>
    </section>

    <label
        class="flex items-center gap-2 input input-bordered"
        class:input-error={!validationState.isPasswordsMatch}
    >
        <Icon icon="ph:lock-fill" />

        <input
            type={showConfirmPassword ? 'text' : 'password'}
            name="password-confirm"
            placeholder="Confirme sua senha"
            required
            bind:this={confirmPasswordRef}
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
        <p class={`${validationState.isPasswordsMatch ? 'hidden' : 'text-error'}`}>
            *As senhas devem ser as mesmas
        </p>
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

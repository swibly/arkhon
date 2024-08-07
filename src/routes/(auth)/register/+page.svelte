<script context="module" lang="ts">
    import Icon from '@iconify/svelte';
    import { SwiblyClient } from 'swibly-sdk';

    const client = new SwiblyClient({ key: 'api-kere-here' });

    if (await client.canConnect()) {
        console.log('True');
    } else {
        console.log('False');
    }

    let showPassword: boolean = false;
    let showPasswordConfirm: boolean = false;

    let firstnameInput: HTMLInputElement;
    let lastnameInput: HTMLInputElement;
    let usernameInput: HTMLInputElement;
    let emailInput: HTMLInputElement;
    let passwordInput: HTMLInputElement;
    let confirm_passInput: HTMLInputElement;
    let errorInput: HTMLHeadingElement;
    let tos = true;

    async function handleSubmit(e: Event) {
        e.preventDefault();

        const firstname = firstnameInput.value;
        const lastname = lastnameInput.value;
        const email = emailInput.value;
        const username = usernameInput.value;
        const password = passwordInput.value;
        const confirm_pass = confirm_passInput.value;

        if (password === confirm_pass) {
            const register = await client.auth.register({
                firstname: firstname,
                lastname: lastname,
                email: email,
                username: username,
                password: password
            });
            if (register.error) {
                const error = register.error;
                if (typeof error === 'string') {
                    errorInput.innerHTML = error as string;
                } else {
                    errorInput.innerHTML = Object.values(error)[0] as string;
                }
            }
        } else {
            errorInput.innerHTML = 'As senhas são diferentes';
        }
    }
</script>

<h1 class="text-center text-4xl sm:text-5xl px-4 font-bold text-white m-12">
    Crie sua conta na Arkhon
</h1>

<h2 class="text-xl text-center sm:text-2xl mt-4 px-4 text-secondary">
    Registrar-se garante acesso as ferramentas da Arkhon
</h2>

<section class="mx-12 mt-8">
    <form on:submit={handleSubmit}>
        <div class="lg:flex justify-center gap-2">
            <label class="input input-bordered flex items-center gap-2 mb-4 lg:flex-1 bg-neutral">
                <Icon icon="material-symbols:person" />
                <input
                    type="text"
                    class="firstname w-full"
                    id="firstname"
                    bind:this={firstnameInput}
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
                    bind:this={lastnameInput}
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
                bind:this={usernameInput}
                name="username"
                placeholder="Nome de usuário"
            />
        </label>

        <article class="divider before:bg-white after:bg-white" />

        <label class="input input-bordered flex items-center gap-2 my-8 bg-neutral">
            <Icon icon="ic:baseline-email" />
            <input
                type="email"
                class="email w-full"
                id="email"
                bind:this={emailInput}
                name="email"
                placeholder="Email"
            />
        </label>

        <label class="input input-bordered flex items-center gap-2 mb-8 bg-neutral">
            <Icon icon="material-symbols:lock" />
            <input
                type={showPassword ? 'text' : 'password'}
                class="password w-full"
                id="password"
                bind:this={passwordInput}
                name="password"
                placeholder="Senha"
            />
            <button on:click={() => (showPassword = !showPassword)} class="ml-auto">
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
                bind:this={confirm_passInput}
                name="confirm_pass"
                placeholder="Confirmar Senha"
            />
            <button on:click={() => (showPasswordConfirm = !showPasswordConfirm)} class="ml-auto">
                {#if showPasswordConfirm}
                    <Icon icon="mdi:eye" />
                {:else}
                    <Icon icon="ph:eye-closed" />
                {/if}
            </button>
        </label>

        <h1
            bind:this={errorInput}
            class="text-center font-bold text-md sm:text-xl text-error pt-8"
        />

        <label class="text-white flex mt-8 gap-2 align-items">
            <input type="checkbox" checked class="checkbox bg-white" on:click={() => {tos = !tos}} /> Concordo
            com os Termos de Uso
        </label>

        {#if tos === true}
            <button class="text-white mt-8 pb-4 mx-auto w-fit block">
                <Icon icon="emojione-monotone:right-arrow" font-size="60px" />
            </button>
        {/if}
    </form>

    <h2 class="text-center text-white mb-4">
        Já possui uma conta? <a href="/login/" class="text-secondary">Clique aqui!</a>
    </h2>
</section>

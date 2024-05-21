<script lang="ts">
    import Icon from '@iconify/svelte';
    import { lightMode } from '$lib/stores/theme.js';

    let showPassword: boolean = false;
    let showPasswordConfirm: boolean = false;
    let theme: boolean = true;

    const fetchImage = (async () => {
        const response = await fetch('https://restcountries.com/v3.1/all');
        return await response.json();
    })();
</script>

<label class="swap swap-rotate text-white float-right pr-4">
    <input type="checkbox" class="theme-controller" on:click={() => ($lightMode = !$lightMode)}/>
    {#if $lightMode}
        <!--Light mode-->
        <!--Light mode-->
        <style>
            .bleed {
                clip-path: inset(0, -100vmax);
                box-shadow: 0 0 0 100vmax #0175af;
            }
        </style>
    {:else}
        <!--Dark mode-->
        <!--Dark mode-->
        <style>
            .bleed {
                clip-path: inset(0, -100vmax);
                box-shadow: 0 0 0 100vmax #252627;
            }
        </style>
    {/if}

    <svg
        class="swap-off fill-current w-8 h-8 text-white"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        ><path
            d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z"
        /></svg
    >

    <svg class="swap-on fill-current w-8 h-8" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
        ><path
            d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z"
        /></svg
    >
</label>

<main
    class="bg-primary w-full min-h-screen max-w-[800px] mx-auto bleed"
    data-theme={$lightMode ? 'light' : 'dark'}
>
    <h1 class="text-center text-4xl sm:text-5xl px-4 font-bold text-white m-12">
        Crie sua conta na Arkhon
    </h1>
    <h2 class="text-xl text-center sm:text-2xl mt-4 px-4 text-accent">
        Registrar-se garante acesso as ferramentas da Arkhon
    </h2>
    <section class="mx-12 mt-8">
        <form>
            <div class="lg:flex justify-center gap-2">
                <label
                    class="input input-bordered flex items-center gap-2 mb-8 lg:flex-1 bg-neutral"
                >
                    <Icon icon="material-symbols:person" />
                    <input
                        type="text"
                        class="firstname w-full"
                        id="firstname"
                        name="firstname"
                        placeholder="Nome"
                    />
                </label>

                <label
                    class="input input-bordered flex items-center gap-2 mb-8 lg:flex-1 bg-neutral"
                >
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

            <label class="input input-bordered flex items-center gap-2 mb-8 bg-neutral">
                <Icon icon="ic:baseline-place" />
                <select class="bg-transparent w-full">
                    {#await fetchImage}
                        <p>...waiting</p>
                    {:then data}
                        {#each data.toSorted( (a, b) => a.name.common.localeCompare(b.name.common) ) as country (country.name.common)}
                            <option
                                selected={country.name.common === 'Brazil'}
                                value={country.name.common}
                                class="bg-neutral">{country.flag} {country.name.common}</option
                            >
                        {/each}
                    {:catch error}
                        <p>An error occurred!</p>
                    {/await}
                </select>
            </label>

            <article class="divider before:bg-white after:bg-white" />

            <label class="input input-bordered flex items-center gap-2 mt-4 mb-8 bg-neutral">
                <Icon icon="ic:baseline-email" />
                <input
                    type="email"
                    class="email w-full"
                    id="email"
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
                    name="confirm_pass"
                    placeholder="Confirmar Senha"
                />
                <button
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

            <label class="text-white flex mt-8 gap-2 align-items"
                ><input type="checkbox" checked class="checkbox bg-white" /> Concordo com os Termos de
                Uso</label
            >
            <label class="text-white flex mt-4 gap-2 align-items"
                ><input type="checkbox" checked class="checkbox bg-white" /> Desejo receber notícias
                sobre arquitetura em meu email</label
            >
            <button class="text-white mt-8 pb-4 mx-auto w-fit block"
                ><Icon icon="emojione-monotone:right-arrow" font-size="60px" /></button
            >
        </form>
        <h2 class="text-center text-white mb-4">
            Já possui uma conta? <a href="/auth/login/" class="text-accent">Clique aqui!</a>
        </h2>
    </section>
</main>

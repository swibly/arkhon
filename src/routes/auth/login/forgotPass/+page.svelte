<script lang="ts">
    import Icon from '@iconify/svelte';
    import { lightMode } from '$lib/stores/theme.js';

    let theme: boolean = true;

    const fetchImage = (async () => {
        const response = await fetch('https://restcountries.com/v3.1/all');
        return await response.json();
    })();
</script>

<label class="swap swap-rotate text-white float-right pr-4">
    <input type="checkbox" class="theme-controller" on:click={() => ($lightMode = !$lightMode)}/>
    {#if $lightMode}
        <style>
            .bleed {
                clip-path: inset(0, -100vmax);
                box-shadow: 0 0 0 100vmax #0175af;
            }
        </style>
    {:else}
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

<main class="bg-primary w-full min-h-screen max-w-[800px] mx-auto bleed" data-theme={$lightMode ? 'light' : 'dark'}>
    <div class="flex justify-center m-12">
        <img src="/gallery/logo2.png" class="h-40 w-40" alt="Logo" />
    </div>
    <h1 class="text-center text-4xl sm:text-5xl px-4 font-bold text-white">
        Insira seu email abaixo
    </h1>
    <h2 class="text-xl text-center sm:text-2xl mt-4 px-4 text-accent">
        Enviaremos um email de recuperação de senha caso o endereço exista
    </h2>
    <section class="mx-12 mt-8">
        <form>
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
            <button class="text-white mt-4 pb-4 mx-auto w-fit block"
                ><a href = "index.svelte"><Icon icon="emojione-monotone:right-arrow" font-size="60px" /></a></button
            >
        </form>
        <h2 class="text-center text-white">
            <a href="/auth/login/" class="text-accent">Voltar para a página de login</a>
        </h2>
    </section>
</main>
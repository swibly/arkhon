<script lang="ts">
    import { lightMode, toggle } from '$lib/stores/theme';
    import Icon from '@iconify/svelte';

    let activeButton: string = 'settings';

    function changeButton(value: string) {
        activeButton = value;
    }
</script>

<body data-theme={$lightMode ? 'light' : 'dark'} class="w-full min-h-screen flex flex-col">
    <header class="flex w-full h-12 bg-base-300 justify-between items-center">
        <a href="profile" class="pl-4"><Icon icon="fe:arrow-left" font-size="40px" /></a>
        <h1 class="text-xl font-bold">Configurações</h1>
        <label class="swap swap-rotate float-right pr-8">
            <input type="checkbox" class="theme-controller" on:click={toggle} />
            <Icon icon="ph:moon" class="swap-on size-8" />
            <Icon icon="ph:sun" class="swap-off size-8" />
        </label>
    </header>
    <main class="lg:flex flex-1 w-[97%] bg-base-300 mx-auto my-7 rounded-xl">
        <div
            class="w-[97%] lg:w-1/4 h-[4rem] lg:h-[32rem] bg-base-200 mt-4 lg:mt-12 mx-auto lg:ml-12 lg:mx-0 rounded-xl"
        >
            <h1 class="hidden lg:block text-3xl font-bold pt-8 text-center">Seções</h1>

            <div class="collapse collapse-arrow bg-base-200 lg:hidden">
                <input type="checkbox" />
                <div class="collapse-title grid place-items-center">
                    <h1 class="text-2xl sm:text-3xl font-bold">Seções</h1>
                </div>
                <div class="collapse-content bg-base-200">
                    <div>
                        <button
                            class={`w-full py-2 font-semibold flex items-center gap-2 pl-4 ${
                                activeButton === 'settings'
                                    ? 'bg-secondary border-l-8 border-primary'
                                    : 'bg-base-200'
                            }`}
                            on:click={() => changeButton('settings')}
                            ><Icon icon="material-symbols:settings" font-size="25px" /> Configurações</button
                        >
                        <button
                            class={`w-full py-2 font-semibold flex items-center gap-2 pl-4 ${
                                activeButton === 'about'
                                    ? 'bg-secondary border-l-8 border-primary'
                                    : 'bg-base-200'
                            }`}
                            on:click={() => changeButton('about')}
                            ><Icon icon="material-symbols:help" font-size="25px" /> Sobre</button
                        >
                        <button
                            class={`w-full py-2 font-semibold flex items-center gap-2 pl-4 ${
                                activeButton === 'help'
                                    ? 'bg-secondary border-l-8 border-primary'
                                    : 'bg-base-200'
                            }`}
                            on:click={() => changeButton('help')}
                            ><Icon icon="mdi:about" font-size="25px" /> Ajuda</button
                        >
                    </div>
                </div>
            </div>

            <div class="hidden lg:block lg:pt-8">
                <button
                    class={`w-full py-2 font-semibold flex items-center gap-2 pl-4 ${
                        activeButton === 'settings'
                            ? 'bg-secondary border-l-8 border-primary'
                            : 'bg-base-200'
                    }`}
                    on:click={() => changeButton('settings')}
                    ><Icon icon="material-symbols:settings" font-size="25px" /> Configurações</button
                >
                <button
                    class={`w-full py-2 font-semibold flex items-center gap-2 pl-4 ${
                        activeButton === 'about'
                            ? 'bg-secondary border-l-8 border-primary'
                            : 'bg-base-200'
                    }`}
                    on:click={() => changeButton('about')}
                    ><Icon icon="material-symbols:help" font-size="25px" /> Sobre</button
                >
                <button
                    class={`w-full py-2 font-semibold flex items-center gap-2 pl-4 ${
                        activeButton === 'help'
                            ? 'bg-secondary border-l-8 border-primary'
                            : 'bg-base-200'
                    }`}
                    on:click={() => changeButton('help')}
                    ><Icon icon="mdi:about" font-size="25px" /> Ajuda</button
                >
            </div>
        </div>

        <section class="w-3/4 mx-auto lg:mx-20 mt-12">
            <div class="w-full bg-base-200 h-36 rounded-xl">
                {#if activeButton === 'settings'}
                    <h1
                        class="text-center lg:text-start text-2xl sm:text-4xl font-bold pt-8 lg:pl-4"
                    >
                        Configurações
                    </h1>
                    <p class="text-center lg:text-start text-md sm:text-lg pt-2 pl-4 pr-4">
                        Configurações gerais do perfil e do sistema
                    </p>
                {:else if activeButton === 'about'}
                    <h1
                        class="text-center lg:text-start text-2xl sm:text-4xl font-bold pt-8 lg:pl-4"
                    >
                        Sobre
                    </h1>
                    <p class="text-center lg:text-start text-md sm:text-lg pt-2 pl-4 pr-4">
                        Entenda mais sobre a Arkhon
                    </p>
                {:else}
                    <h1
                        class="text-center lg:text-start text-2xl sm:text-4xl font-bold pt-8 lg:pl-4"
                    >
                        Ajuda
                    </h1>
                    <p class="text-center lg:text-start text-md sm:text-lg pt-2 pl-4 pr-4">
                        Tire suas dúvidas com a gente
                    </p>
                {/if}
            </div>

            <main class="pt-12">
                <div class="pt-6">
                    {#if activeButton === 'settings'}
                        <button
                            class="w-full h-16 bg-base-200 rounded-xl text-left pl-4 text-lg font-semibold hover:bg-secondary"
                            >Configurações Gerais</button
                        >
                        <button
                            class="w-full h-16 bg-base-200 mt-8 rounded-xl text-left pl-4 text-lg font-semibold hover:bg-secondary"
                            >Configurações do Perfil</button
                        >
                        <button
                            class="w-full h-16 bg-base-200 mt-8 rounded-xl text-left pl-4 text-lg font-semibold hover:bg-secondary"
                            >Acessibilidade</button
                        >
                    {:else if activeButton === 'about'}
                        <button
                            class="w-full h-16 bg-base-200 rounded-xl text-left pl-4 text-lg font-semibold hover:bg-secondary"
                            >Conheça a Arkhon</button
                        >
                    {:else}
                        <a href="faq"
                            ><button
                                class="w-full h-16 bg-base-200 mt-8 rounded-xl text-left pl-4 text-lg font-semibold hover:bg-secondary"
                                >FAQ</button
                            ></a
                        >
                        <a href="contact"
                            ><button
                                class="w-full h-16 bg-base-200 mt-8 rounded-xl text-left pl-4 text-lg font-semibold hover:bg-secondary"
                                >Contatar a gente</button
                            ></a
                        >
                    {/if}
                </div>
            </main>
        </section>
    </main>
</body>

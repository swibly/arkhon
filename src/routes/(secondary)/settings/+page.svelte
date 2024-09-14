<script lang="ts">
    import { toggle } from '$lib/stores/theme';
    import Icon from '@iconify/svelte';
    import type { ActionData, PageServerData } from './$types';
    import { enhance } from '$app/forms';

    let activeButton: string = 'settings';
    let modalRef: any;

    export let form: ActionData;
    let loading: boolean = false;

    function changeButton(value: string) {
        activeButton = value;
    }

    function showModal() {
        if (modalRef) {
            modalRef.showModal();
        }
    }
</script>

<main class="w-full min-h-screen flex flex-col">
    <header class="flex w-full h-12 bg-base-300 justify-between items-center">
        <a href="profile" class="pl-4"><Icon icon="fe:arrow-left" font-size="40px" /></a>
        <h1 class="text-xl font-bold">Configurações</h1>
        <label class="swap swap-rotate float-right pr-8">
            <input type="checkbox" class="theme-controller" on:click={toggle} />
            <Icon icon="ph:moon" class="swap-on size-8" />
            <Icon icon="ph:sun" class="swap-off size-8" />
        </label>
    </header>
    <section class="lg:flex flex-1 w-[97%] bg-base-300 mx-auto my-7 rounded-xl">
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
                    <button
                        class={`w-full py-2 font-semibold flex items-center gap-2 pl-4 ${
                            activeButton === 'help'
                                ? 'bg-secondary border-l-8 border-primary'
                                : 'bg-base-200'
                        }`}
                        on:click={() => changeButton('exit')}
                        ><Icon icon="mingcute:exit-fill" font-size="25px" /> Sair da Arkhon</button
                    >
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
                    ><Icon icon="material-symbols:settings" font-size="25px" />Configurações</button
                >
                <button
                    class={`w-full py-2 font-semibold flex items-center gap-2 pl-4 ${
                        activeButton === 'about'
                            ? 'bg-secondary border-l-8 border-primary'
                            : 'bg-base-200'
                    }`}
                    on:click={() => changeButton('about')}
                    ><Icon icon="material-symbols:help" font-size="25px" />Sobre</button
                >
                <button
                    class={`w-full py-2 font-semibold flex items-center gap-2 pl-4 ${
                        activeButton === 'help'
                            ? 'bg-secondary border-l-8 border-primary'
                            : 'bg-base-200'
                    }`}
                    on:click={() => changeButton('help')}
                    ><Icon icon="mdi:about" font-size="25px" />Ajuda</button
                >
                <button
                    class={`w-full py-2 font-semibold flex items-center gap-2 pl-4 ${
                        activeButton === 'exit'
                            ? 'bg-secondary border-l-8 border-primary'
                            : 'bg-base-200'
                    }`}
                    on:click={() => changeButton('exit')}
                    ><Icon icon="mingcute:exit-fill" font-size="25px" /> Sair da Arkhon</button
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
                {:else if activeButton === 'help'}
                    <h1
                        class="text-center lg:text-start text-2xl sm:text-4xl font-bold pt-8 lg:pl-4"
                    >
                        Ajuda
                    </h1>
                    <p class="text-center lg:text-start text-md sm:text-lg pt-2 pl-4 pr-4">
                        Tire suas dúvidas com a gente
                    </p>
                {:else}
                    <h1
                        class="text-center lg:text-start text-2xl sm:text-4xl font-bold pt-8 lg:pl-4"
                    >
                        Desconectar
                    </h1>
                    <p class="text-center lg:text-start text-md sm:text-lg pt-2 pl-4 pr-4">
                        Saia da sua conta e vá diretamente para a página de cadastro
                    </p>
                {/if}
            </div>

            <main class="pt-12">
                <div class="pt-6">
                    {#if activeButton === 'settings'}
                        <a href="general"
                            ><button
                                class="w-full h-16 bg-base-200 rounded-xl text-left pl-4 text-lg font-semibold hover:bg-secondary"
                                >Configurações Gerais</button
                            ></a
                        >
                        <a href="user"
                            ><button
                                class="w-full h-16 bg-base-200 mt-8 rounded-xl text-left pl-4 text-lg font-semibold hover:bg-secondary"
                                >Configurações do Perfil</button
                            ></a
                        >
                        <a href="acessibility"
                            ><button
                                class="w-full h-16 bg-base-200 mt-8 rounded-xl text-left pl-4 text-lg font-semibold hover:bg-secondary"
                                >Acessibilidade</button
                            ></a
                        >
                    {:else if activeButton === 'about'}
                        <a href="arkhon"
                            ><button
                                class="w-full h-16 bg-base-200 mt-8 rounded-xl text-left pl-4 text-lg font-semibold hover:bg-secondary"
                                >Conheça a Arkhon e seus criadores</button
                            ></a
                        >
                    {:else if activeButton === 'help'}
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
                    {:else}
                        <button
                            class="w-full h-16 bg-base-200 mt-8 rounded-xl text-left pl-4 text-lg font-semibold hover:bg-secondary"
                            on:click={showModal}
                        >
                            Encerrar Sessão</button
                        >

                        <dialog id="my_modal_1" bind:this={modalRef} class="modal">
                            <div class="modal-box">
                                <form method="dialog">
                                    <button
                                        class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                                        >✕</button
                                    >
                                </form>
                                <h1 class="font-bold text-3xl sm:text-5xl text-center pt-4">
                                    Deseja realmente sair?
                                </h1>
                                <div class="flex justify-center gap-4 mt-8">
                                    {#if !loading}
                                        <form
                                            method="POST"
                                            use:enhance={() => {
                                                loading = true;
                                                return ({ update }) => update({ reset: false });
                                            }}
                                        >
                                            <button class="btn btn-error px-12 sm:px-20">Sim</button
                                            >
                                        </form>
                                        <form method="dialog">
                                            <button class="btn btn-secondary px-12 sm:px-20"
                                                >Não</button
                                            >
                                        </form>
                                    {:else}
                                        <div class="w-fit mx-auto">
                                            <span class="loading loading-ring loading-lg" />
                                        </div>
                                    {/if}
                                </div>
                            </div>
                        </dialog>
                    {/if}
                </div>
            </main>
        </section>
    </section>
</main>

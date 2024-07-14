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
        <h1 class="text-xl font-bold">Informações Gerais</h1>
        <label class="swap swap-rotate float-right pr-8">
            <input type="checkbox" class="theme-controller" on:click={toggle} />
            <Icon icon="ph:moon" class="swap-on size-8" />
            <Icon icon="ph:sun" class="swap-off size-8" />
        </label>
    </header>
    <main class="flex flex-1 w-[97%] bg-base-300 mx-auto my-7 rounded-xl">
        <div class="w-1/5 h-[32rem] bg-base-200 mt-12 ml-12 rounded-xl">
            <h1 class="text-3xl font-bold pt-8 pl-6">Coleções</h1>
            <label
                class="input input-bordered flex items-center gap-2 w-72 mx-auto mt-6 bg-neutral"
            >
                <input type="text" class="grow" placeholder="Search" />
                <Icon icon="material-symbols:search" />
            </label>
            <div class="pt-8">
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
        <section class="w-4/5 mx-20 mt-12">
            <div class="w-full bg-base-200 h-36 rounded-xl">
                {#if activeButton === 'settings'}
                    <h1 class="text-4xl font-bold pt-8 pl-4">Configurações</h1>
                    <p class="text-lg pt-2 pl-4">Configurações gerais do perfil e do sistema</p>
                {:else if activeButton === 'about'}
                    <h1 class="text-4xl font-bold pt-8 pl-4">Sobre</h1>
                    <p class="text-lg pt-2 pl-4">Entenda mais sobre a Arkhon</p>
                {:else}
                    <h1 class="text-4xl font-bold pt-8 pl-4">Ajuda</h1>
                    <p class="text-lg pt-2 pl-4">Tire suas potenciais dúvidas com a gente</p>
                {/if}
            </div>

            <main class="pt-12">
                <div class="flex items-center justify-end gap-2">
                    <Icon icon="vaadin:lines-list" font-size="18px" />
                    <Icon icon="heroicons:squares-2x2-solid" font-size="22px" />
                </div>

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
                        <button
                            class="w-full h-16 bg-base-200 rounded-xl text-left pl-4 text-lg font-semibold hover:bg-secondary"
                            >FAQ</button
                        >
                        <button
                            class="w-full h-16 bg-base-200 mt-8 rounded-xl text-left pl-4 text-lg font-semibold hover:bg-secondary"
                            >Contatar a gente</button
                        >
                    {/if}
                </div>
            </main>
        </section>
    </main>
</body>

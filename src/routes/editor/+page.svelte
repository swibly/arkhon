<script lang="ts">
    import Icon from '@iconify/svelte';
    import { lightMode, toggle } from '$lib/stores/theme';
    import Category from '$lib/components/Category.svelte';
    import Component from '$lib/components/Component.svelte';

    let activeButton: String = 'project';

    let seeComponents: boolean = false;
    let seeCategory: boolean = false;

    function setActiveButton(value: String) {
        activeButton = value;
    }
</script>

<body data-theme={$lightMode ? 'light' : 'dark'} class="w-full min-h-screen">
    <nav class="w-full bg-base-300 flex items-center justify-between shadow-lg">
        <div class="flex ml-4">
            <div class="dropdown">
                <div tabindex="0" role="button" class="btn bg-base-300 border-0 pt-1">
                    <Icon icon="fe:bar" font-size="42px" />
                </div>
                <ul class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                    <li><a href="/home/">Voltar para o início</a></li>
                </ul>
            </div>
            <div class="flex gap-4 pt-2">
                <Icon icon="fluent:cursor-16-filled" font-size="35px" />
                <Icon icon="fluent:square-hint-16-filled" font-size="35px" />
                <Icon icon="ri:brush-fill" font-size="35px" />
                <Icon icon="ph:hand-fill" font-size="35px" />
                <Icon icon="mdi:chat" font-size="35px" />
            </div>
        </div>
        <h1 class="text-2xl font-bold">Título</h1>
        <div class="flex items-center gap-4 mr-4">
            <Icon icon="ph:play-fill" font-size="25px" />
            <p class="-mr-3">100%</p>
            <Icon icon="bxs:down-arrow" />
        </div>
    </nav>
    <main class="flex h-[calc(100vh-4rem)]">
        <aside class="w-1/6 bg-base-200 overflow-y-scroll scrollbar-thin">
            <nav class="text-center mt-4 grid grid-cols-3 place-items-center">
                <button
                    class={`text-sm sm:text-base transition duration-150 ease-in-out ${
                        activeButton === 'project'
                            ? 'border-b-4 border-primary'
                            : 'border-transparent hover:border-b-4 hover:border-secondary'
                    } focus:border-b-4 focus:border-primary`}
                    on:click={() => setActiveButton('project')}
                >
                    Projeto
                </button>

                <button
                    class={`text-sm sm:text-base transition duration-150 ease-in-out ${
                        activeButton === 'component'
                            ? 'border-b-4 border-primary'
                            : 'border-transparent hover:border-b-4 hover:border-secondary'
                    } focus:border-b-4 focus:border-primary`}
                    on:click={() => setActiveButton('component')}
                >
                    Componentes
                </button>

                <button
                    class={`text-sm sm:text-base transition duration-150 ease-in-out ${
                        activeButton === 'store'
                            ? 'border-b-4 border-primary'
                            : 'border-transparent hover:border-b-4 hover:border-secondary'
                    } focus:border-b-4 focus:border-primary`}
                    on:click={() => setActiveButton('store')}
                >
                    Loja
                </button>
            </nav>
            <div class="divider" />
            <main>
                {#if activeButton == 'project'}
                    <details class="dropdown w-full mt-4">
                        <summary
                            class="text-white btn w-full bg-primary hover:bg-base-300 hover:border hover:border-primary rounded-none"
                            >Andar 1</summary
                        >
                        <div
                            class="p-2 shadow menu dropdown-content z-[1] bg-base-300 w-full border-2 border-primary"
                        >
                            <button class="flex items-center gap-4 btn bg-base-300 border-0"
                                ><Icon icon="typcn:plus" font-size="20px" /> Adicionar mais um andar</button
                            >
                        </div>
                    </details>
                {/if}
                {#if activeButton == 'component'}
                    {#if seeCategory === false}
                        <div class="grid grid-cols-2 place-items-center">
                            {#each Array(8) as i}
                                <div
                                    on:click={() => {
                                        seeCategory = true;
                                    }}
                                >
                                    <Category />
                                </div>
                            {/each}
                        </div>
                        <div class="grid place-items-center mt-4">
                            <button class="btn btn-primary w-64 rounded-xl">Ver mais</button>
                        </div>
                    {:else if seeCategory === true}
                        <div
                            class="pl-4"
                            on:click={() => {
                                seeCategory = false;
                            }}
                        >
                            <Icon icon="mingcute:close-fill" font-size="30px" />
                        </div>
                        {#if seeComponents === false}
                            <div class="grid grid-cols-2 place-items-center mx-8">
                                {#each Array(8) as i}
                                    <Component editor />
                                {/each}
                            </div>
                            <div class="grid place-items-center mt-4">
                                <button
                                    class="btn btn-primary w-64 rounded-xl"
                                    on:click={() => {
                                        seeComponents = true;
                                    }}>Ver mais</button
                                >
                            </div>
                        {:else}
                            <div class="grid grid-cols-2 place-items-center mx-8">
                                {#each Array(23) as i}
                                    <Component editor />
                                {/each}
                            </div>

                            <div class="grid place-items-center mt-4">
                                <button
                                    class="btn btn-primary w-64 rounded-xl"
                                    on:click={() => {
                                        seeComponents = false;
                                    }}>Ver menos</button
                                >
                            </div>
                        {/if}
                    {/if}
                {/if}
                {#if activeButton == 'store'}
                    {#if seeComponents === false}
                        <div class="grid grid-cols-2 place-items-center mx-8">
                            {#each Array(8) as i}
                                <Component editor />
                            {/each}
                        </div>
                        <div class="grid place-items-center mt-4">
                            <button
                                class="btn btn-primary w-64 rounded-xl"
                                on:click={() => {
                                    seeComponents = true;
                                }}>Ver mais</button
                            >
                        </div>
                    {:else}
                        <div class="grid grid-cols-2 place-items-center mx-8">
                            {#each Array(23) as i}
                                <Component editor />
                            {/each}
                        </div>

                        <div class="grid place-items-center mt-4">
                            <button
                                class="btn btn-primary w-64 rounded-xl"
                                on:click={() => {
                                    seeComponents = false;
                                }}>Ver menos</button
                            >
                        </div>
                    {/if}
                {/if}
            </main>
        </aside>

        <div class="w-5/6">
            <label class="swap swap-rotate float-right pr-4 pt-4">
                <input type="checkbox" class="theme-controller" on:click={toggle} />

                <Icon icon="ph:moon" class="swap-on size-8" />
                <Icon icon="ph:sun" class="swap-off size-8" />
            </label>
        </div>
    </main>
</body>

<script lang="ts" type="module">
    import Icon from '@iconify/svelte';
    import { lightMode, toggle } from '$lib/stores/theme';
    import { contrastType, contrast } from '$lib/stores/contrast';
    import Component from '$lib/components/Component.svelte';
    import Pagination from '$lib/components/Pagination.svelte';
    import { writable } from 'svelte/store';
    import InfiniteCanvas from 'ef-infinite-canvas';
    import { onMount } from 'svelte';

    let activeButton: String = 'project';

    function setActiveButton(value: String) {
        activeButton = value;
    }

    let components = [...Array(120)].map((_, i) => {
        return { Name: `${i + 1}` };
    });

    let categories = [...Array(80)].map((_, i) => {
        return { Name: `${i + 1}` };
    });

    let currentPageStore = writable(1);

    function start(currentPage: number): number {
        return (currentPage - 1) * 8;
    }

    function end(currentPage: number): number {
        return start(currentPage) + 8;
    }
</script>

<main class="w-full min-h-screen">
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
        <aside class="w-1/5 h-full bg-base-200 overflow-y-hidden scrollbar-thin">
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
                            class="text-white btn w-full bg-secondary hover:bg-base-300 hover:border hover:border-secondary rounded-none"
                            >Andar 1</summary
                        >
                        <div
                            class="p-2 shadow menu dropdown-content z-[1] bg-base-300 w-full border-2 border-secondary"
                        >
                            <button class="flex items-center gap-4 btn bg-base-300 border-0"
                                ><Icon icon="typcn:plus" font-size="20px" /> Adicionar mais um andar</button
                            >
                        </div>
                    </details>
                {/if}
                {#if activeButton == 'component'}
                    <Pagination bind:currentPageStore qtd={80}>
                        <div class="grid grid-cols-2 place-items-center mx-8">
                            {#each categories.slice(start($currentPageStore), end($currentPageStore)) as i}
                                <Component name={i.Name} editor />
                            {/each}
                        </div>
                    </Pagination>
                {/if}
                {#if activeButton == 'store'}
                    <Pagination bind:currentPageStore qtd={120}>
                        <div class="grid grid-cols-2 place-items-center mx-8">
                            {#each components.slice(start($currentPageStore), end($currentPageStore)) as i}
                                <Component name={i.Name} editor />
                            {/each}
                        </div></Pagination
                    >
                {/if}
            </main>
        </aside>

        <main class="w-5/6">
            <label class="swap swap-rotate pl-4 pt-4 absolute">
                <input type="checkbox" class="theme-controller" on:click={toggle} />

                <Icon icon="ph:moon" class="swap-on size-8" />
                <Icon icon="ph:sun" class="swap-off size-8" />
            </label>
        </main>
    </main>
</main>

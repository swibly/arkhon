<script lang="ts">
    import Icon from '@iconify/svelte';
    import { lightMode, toggle } from '$lib/stores/theme';
    import Category from '$lib/components/Category.svelte';

    var change: String = 'project';
    var component: String = 'category 1';
</script>

<body data-theme={$lightMode ? 'light' : 'dark'} class="w-full min-h-screen">
    <nav class="w-full h-12 bg-base-300 flex items-center justify-between shadow-lg">
        <div class="flex gap-4 ml-4">
            <Icon icon="fe:bar" font-size="35px" />
            <Icon icon="fluent:cursor-16-filled" font-size="35px" />
            <Icon icon="fluent:square-hint-16-filled" font-size="35px" />
            <Icon icon="ri:brush-fill" font-size="35px" />
            <Icon icon="ph:hand-fill" font-size="35px" />
            <Icon icon="mdi:chat" font-size="35px" />
        </div>
        <h1 class="text-2xl font-bold">Título</h1>
        <div class="flex items-center gap-4 mr-4">
            <Icon icon="ph:play-fill" font-size="25px" />
            <p class="-mr-3">100%</p>
            <Icon icon="bxs:down-arrow" />
        </div>
    </nav>
    <main class="flex">
        <aside class="w-1/6 h-screen bg-base-200">
            <nav class="text-center mt-4">
                <button
                    class="text-sm sm:text-base transition duration-150 ease-in-out border-b-4 border-primary mx-4 peer/project"
                    on:click={() => {
                        change = 'project';
                    }}>Projeto</button
                >

                <button
                    class="text-sm sm:text-base transition duration-150 ease-in-out border-transparent hover:border-b-4 hover:border-secondary mx-4 peer/component"
                    on:click={() => {
                        change = 'component';
                    }}>Componentes</button
                >

                <button
                    class="text-sm sm:text-base transition duration-150 ease-in-out border-transparent hover:border-b-4 hover:border-secondary mx-4 peer/store"
                    on:click={() => {
                        change = 'store';
                    }}>Loja</button
                >
            </nav>
            <main>
                {#if change == 'project'}
                    <details class="dropdown w-full mt-4">
                        <summary
                            class="text-white btn w-full bg-primary hover:bg-base-300 hover:border hover:border-primary rounded-none"
                            >Andar 1</summary
                        >
                        <div
                            class="p-2 shadow menu dropdown-content z-[1] bg-base-300 w-full border-2 border-primary"
                        >
                            <button class="flex items-center gap-4 btn">Andar 2</button>
                            <button class="flex items-center gap-4 btn"
                                ><Icon icon="typc   n:plus" font-size="20px" /> Adicionar mais um andar</button
                            >
                        </div>
                    </details>
                {/if}
                {#if change == 'component'}
                    <div class="grid grid-cols-2 place-items-center">
                        {#each Array(8) as i}
                            <Category />
                        {/each}
                    </div>
                    <div class="grid place-items-center mt-4">
                        <button class="btn btn-primary w-64 rounded-xl">Ver mais</button>
                    </div>
                {/if}
            </main>
        </aside>

        <div class="w-5/6">
            <label class="swap swap-rotate float-right pr-4">
                <input type="checkbox" class="theme-controller" on:click={toggle} />

                <Icon icon="ph:moon" class="swap-on size-8" />
                <Icon icon="ph:sun" class="swap-off size-8" />
            </label>
        </div>
    </main>
</body>

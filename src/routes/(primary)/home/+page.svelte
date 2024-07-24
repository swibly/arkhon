<script lang="ts">
    import Icon from '@iconify/svelte';
    import { lightMode, toggle } from '$lib/stores/theme';
    import Project from '$lib/components/Project.svelte';
    import Add from '$lib/components/Add.svelte';

    var change: boolean = true;
</script>

<body data-theme={$lightMode ? 'light' : 'dark'} class="w-full min-h-screen overflow-x-hidden">
    <main>
        <header class="w-screen bg-base-300 shadow-lg">
            <div class="flex justify-between align-items py-2">
                <a href="profile"><Icon icon="gg:profile" class="ml-4 mt-1" font-size="30px" /></a>
                <h1 class="text-3xl font-bold">Arkhon</h1>
                <label class="swap swap-rotate float-right pr-8">
                    <input type="checkbox" class="theme-controller" on:click={toggle} />

                    <Icon icon="ph:moon" class="swap-on size-8" />
                    <Icon icon="ph:sun" class="swap-off size-8" />
                </label>                
            </div>
        </header>
        <section class="flex justify-center gap-4 h-16">
            <a
                href="/home/"
                class="text-sm sm:text-base transition duration-150 ease-in-out hover:text-base sm:hover:text-lg hover:scale-110 border-b-4 border-primary mt-8"
            >
                Projeto
            </a>
            <a
                href="/community/"
                class="text-sm sm:text-base transition duration-150 ease-in-out hover:text-base sm:hover:text-lg hover:scale-110 hover:border-b-4 border-secondary mt-8"
            >
                Comunidade
            </a>
            <a
                href="/store/"
                class="text-sm sm:text-base transition duration-150 ease-in-out hover:text-base sm:hover:text-lg hover:scale-110 hover:border-b-4 border-secondary mt-8"
            >
                Loja
            </a>
        </section>

        <section>
            <h1 class="text-2xl sm:text-4xl text-secondary text-center font-bold mt-12">
                Homepage
            </h1>
            <h2 class="text-lg sm:text-2xl text-secondary text-center font-bold mb-6">
                Gerencie os seus projetos e favoritos
            </h2>
            <div class="px-8">
                <label
                    class="input input-bordered max-sm:input-sm bg-neutral flex items-center mx-auto max-w-[800px]"
                >
                    <input type="text" class="grow text-center" placeholder="Pesquisar projeto" />
                    <Icon icon="material-symbols:search" />
                </label>
            </div>

            <div class="pt-4 flex justify-center gap-2">
                {#if change}
                    <button
                        class="btn btn-sm btn-secondary"
                        on:click={() => {
                            change = true;
                        }}>Meus projetos</button
                    >
                    <button
                        class="btn btn-outline btn-sm btn-secondary"
                        on:click={() => {
                            change = false;
                        }}>Meus favoritos</button
                    >
                {:else}
                    <button
                        class="btn btn-outline btn-sm btn-secondary"
                        on:click={() => {
                            change = true;
                        }}>Meus projetos</button
                    >
                    <button
                        class="btn btn-sm btn-secondary"
                        on:click={() => {
                            change = false;
                        }}>Meus favoritos</button
                    >
                {/if}
            </div>

            {#if change}
                <div class="py-12 mx-12 sm:mx-16 lg:mx-20 2xl:mx-24 3xl:mx-64">
                    <div
                        class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 place-items-center gap-4"
                    >
                        <Add />
                        {#each Array(21) as i}
                            <Project />
                        {/each}
                    </div>
                </div>
            {:else}
                <div class="py-12 mx-12 sm:mx-16 lg:mx-20 2xl:mx-28 3xl:mx-64">
                    <div
                        class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 place-items-center gap-4"
                    >
                        {#each Array(3) as i}
                            <Project favorite />
                        {/each}
                    </div>
                </div>
            {/if}
        </section>
    </main>
</body>
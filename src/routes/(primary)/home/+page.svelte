<script lang="ts">
    import Icon from '@iconify/svelte';
    import { lightMode, toggle } from '$lib/stores/theme';
    import Project from '$lib/components/Project.svelte';
    import Add from '$lib/components/Add.svelte';

    var change: boolean = true;
</script>

<body data-theme={$lightMode ? 'light' : 'dark'} class="w-full min-h-screen">
    <main>
        <div class="flex justify-between pt-4">
            <Icon icon="gg:profile" class="ml-4" font-size="30px" />
            <label class="swap swap-rotate float-right pr-4">
                <input type="checkbox" class="theme-controller" on:click={toggle} />

                <Icon icon="ph:moon" class="swap-on size-8" />
                <Icon icon="ph:sun" class="swap-off size-8" />
            </label>
        </div>
        <header class="flex justify-center gap-4 h-16">
            <a
                href="/"
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
                href="/"
                class="text-sm sm:text-base transition duration-150 ease-in-out hover:text-base sm:hover:text-lg hover:scale-110 hover:border-b-4 border-secondary mt-8"
            >
                Loja
            </a>
        </header>

        <section>
            <h1 class="text-2xl sm:text-4xl text-secondary text-center font-bold my-12">
                Homepage
            </h1>
            <div class="px-8">
                <label
                    class="input max-sm:input-sm bg-neutral flex items-center mx-auto max-w-[800px]"
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
                <div class="my-12 mx-12 sm:mx-16 lg:mx-20 2xl:mx-28 3xl:mx-64">
                    <div
                        class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 place-items-center gap-4"
                    >
                        <Add />
                        {#each Array(8) as i}
                            <Project />
                        {/each}
                    </div>
                </div>
            {:else}
                <div class="my-12 mx-12 sm:mx-16 lg:mx-20 2xl:mx-28 3xl:mx-64">
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

{#if $lightMode}
    <style>
        .bleed {
            clip-path: inset(0, -100vmax);
            box-shadow: 0 0 0 100vmax #f8f8f8;
        }

        label {
            color: black;
        }
    </style>
{:else}
    <style>
        .bleed {
        }

        label {
            color: white;
        }
    </style>
{/if}

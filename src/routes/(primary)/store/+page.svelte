<script lang="ts">
    import Icon from '@iconify/svelte';
    import { lightMode, toggle } from '$lib/stores/theme';
    import Component from '$lib/components/Component.svelte';
</script>

<body data-theme={$lightMode ? 'light' : 'dark'} class="w-full min-h-screen">
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
                class="text-sm sm:text-base transition duration-150 ease-in-out hover:text-base sm:hover:text-lg hover:scale-110 hover:border-b-4 border-primary mt-8"
            >
                Projeto
            </a>
            <a
                href="/community/"
                class="text-sm sm:text-base transition duration-150 ease-in-out hover:text-base sm:hover:text-lg hover:scale-110 hover:border-b-4 border-primary mt-8"
            >
                Comunidade
            </a>
            <a
                href="/store/"
                class="text-sm sm:text-base transition duration-150 ease-in-out hover:text-base sm:hover:text-lg hover:scale-110 border-b-4 border-secondary mt-8"
            >
                Loja
            </a>
        </section>

        <section>
            <h1 class="text-2xl sm:text-4xl text-secondary text-center font-bold mt-12">
                Loja
            </h1>
            <h2 class="text-lg sm:text-2xl text-secondary text-center font-bold mb-6">
                Adquira componentes personalizados através de Arkhoins
            </h2>
            <div class="px-8">
                <label
                    class="input max-sm:input-sm bg-neutral flex items-center mx-auto max-w-[800px]"
                >
                    <input type="text" class="grow text-center" placeholder="Ex: Cadeira" />
                    <Icon icon="material-symbols:search" />
                </label>
            </div>

            <div class="py-12 mx-12 sm:mx-28 lg:mx-40 3xl:mx-96">
                <div
                    class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 place-items-center gap-4"
                >
                    {#each Array(9) as i}
                        <Component name="Nome do Usuário" store></Component>                        
                    {/each}
                </div>
            </div>
        </section>
    </main>
</body>
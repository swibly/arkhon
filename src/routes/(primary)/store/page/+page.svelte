<script lang="ts">
    import Icon from '@iconify/svelte';
    import { lightMode, toggle } from '$lib/stores/theme';
    import Component from '$lib/components/Component.svelte';
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
        </header>

        <section>
            <a href="/store/" class="ml-12">
                <Icon icon="fluent:ios-arrow-24-filled" font-size="40px"/>
            </a>
            <div class="grid grid-cols-2 place-items-center mx-72 mt-32">
                <Icon icon="material-symbols:chair" font-size="500px" />
                <div>
                    <h1 class="text-7xl font-bold mt-12">Nome do Componente</h1>
                    <h1 class="pt-4 text-lg">Criado por Usuário</h1>
                    <div class="flex">
                        {#each Array(4) as i}
                            <Icon icon="material-symbols:star" />
                        {/each}
                        <Icon icon="material-symbols:star-half" />
                    </div>
                    <div class="divider" />
                </div>
            </div>
        </section>
    </main>
</body>


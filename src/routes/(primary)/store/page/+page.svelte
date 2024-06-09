<script lang="ts">
    import Icon from '@iconify/svelte';
    import { lightMode, toggle } from '$lib/stores/theme';
</script>

<body data-theme={$lightMode ? 'light' : 'dark'} class="w-full min-h-screen">
    <main>
        <header class="w-screen bg-base-300 shadow-lg">
            <div class="flex justify-between align-items py-2">
                <Icon icon="gg:profile" class="ml-4 mt-1" font-size="30px" />
                <h1 class="text-3xl font-bold">Arkhon</h1>
                <label class="swap swap-rotate float-right pr-4">
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
            <a href="/store/" class="ml-12">
                <Icon icon="fluent:ios-arrow-24-filled" font-size="40px" />
            </a>
            <div class="flex flex-wrap justify-center items-center mt-32 gap-40">
                <Icon icon="material-symbols:chair" font-size="500px" />
                <div class="w-96">
                    <h1 class="text-5xl font-bold mt-12">Nome do Componente</h1>
                    <h1 class="pt-4 text-lg text-primary">Criado por Usuário</h1>
                    <div class="flex mt-2">
                        {#each Array(4) as i}
                            <Icon icon="material-symbols:star" />
                        {/each}
                        <Icon icon="material-symbols:star-half" />
                    </div>
                    <div class="flex items-center">
                        <h1 class="text-3xl">300</h1>
                        <figure>
                            <img src="/gallery/Arkhoin.png" alt="Arkhoin" class="w-12" />
                        </figure>
                    </div>
                    <div class="divider" />
                    <h1 class="text-3xl">Descrição</h1>
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam accusamus a
                        dolorem! Culpa quibusdam ad voluptate eveniet dolores, quos alias laboriosam
                        voluptas est officia obcaecati iste voluptatem! Debitis, dicta maiores?
                    </p>
                </div>
            </div>
        </section>
    </main>
</body>

<script>
    import { lightMode, toggle } from '$lib/stores/theme';
    import Icon from '@iconify/svelte';
    import Project from '$lib/components/Project.svelte';
    import Component from '$lib/components/Component.svelte';
</script>

<body data-theme={$lightMode ? 'light' : 'dark'} class="w-full min-h-screen overflow-x-hidden">
    <main class="xl:flex w-screen min-h-screen justify-end">
        <aside class="w-full xl:w-2/6 h-[40rem] sm:h-[50rem] md:h-[46rem] xl:min-h-screen bg-base-300 xl:fixed top-0 left-0">
            <div class="flex justify-between px-12 py-4 xl:py-8">
                <a href="home"><Icon icon="fe:arrow-left" font-size="40px" /></a>
                <a href="settings"><Icon icon="material-symbols:settings" font-size="40px" /></a>
            </div>

            <section class="grid place-items-center">
                <div class="icon">
                    <Icon icon="healthicons:ui-user-profile" />
                </div>
                <h1 class="text-3xl sm:text-5xl font-bold">Nome do Usuário</h1>
                <h2 class="text-lg sm:text-2xl">Apelido do usuário</h2>
                <div class="mx-0 sm:mx-20 xl:grid xl:place-items-center xl:block xl:mx-0 xl:pt-0">
                    <p class="px-12 py-4 sm:py-8 text-justify">
                        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Odit nulla quidem
                        placeat, vero eaque esse qui, aperiam minus ea, optio magnam explicabo eum.
                        Mollitia officia quisquam eligendi optio voluptatem vitae?
                    </p>
                    <button
                        class="hidden xl:block btn btn-secondary w-72 text-lg hover:btn-secondary"
                        >Editar Perfil</button
                    >
                    <section>
                        <div class="grid place-items-center md:flex md:justify-center md:gap-6 xl:block">
                            <p class="flex items-center gap-4 pt-4">
                                <Icon
                                    icon="ic:baseline-people"
                                    font-size="20px"
                                    class="text-secondary"
                                /> 777k seguidores • 3 seguindo
                            </p>

                            <p class="flex items-center gap-4 pt-4">
                                <Icon
                                    icon="icon-park-solid:local-two"
                                    font-size="20px"
                                    class="text-secondary"
                                /> Brasil - Bahia
                            </p>
                        </div>

                        <div class="grid place-items-center md:flex md:justify-center md:gap-6 xl:block">
                            <div class="flex items-center gap-4 pt-4">
                                <Icon
                                    icon="mingcute:coin-2-fill"
                                    font-size="20px"
                                    class="text-secondary"
                                />
                                <p
                                    class="flex items-center w-20 bg-secondary rounded-xl font-semibold"
                                >
                                    <img src="/gallery/Arkhoin.png" alt="Arkhoin" class="w-8 h-8" />
                                    300k
                                </p>
                            </div>
                            <div class="flex items-center gap-4 pt-4">
                                <p class="flex items-center gap-4">
                                    <Icon
                                        icon="game-icons:laurels"
                                        font-size="20px"
                                        class="text-secondary"
                                    />157/10k XP
                                </p>
                                <progress
                                    class="progress progress-secondary w-56"
                                    value="2"
                                    max="100"
                                />
                            </div>
                        </div>
                    </section>
                </div>
            </section>
        </aside>
        <main class="w-4/6 min-h-screen bg-base-100">
            <label class="swap swap-rotate float-right pr-8 pt-4">
                <input type="checkbox" class="theme-controller" on:click={toggle} />

                <Icon icon="ph:moon" class="swap-on size-8" />
                <Icon icon="ph:sun" class="swap-off size-8" />
            </label>
            <section class="pt-20 mx-20">
                <h1 class="text-3xl text-secondary font-bold">Projetos Recentes</h1>
                <div class="grid grid-cols-2 2xl:grid-cols-3 gap-4 py-4">
                    {#each Array(11) as i}
                        <Project />
                    {/each}
                </div>

                <div class="divider divider-primary" />

                <h1 class="text-3xl text-secondary font-bold pt-4">Favoritos</h1>
                <div class="grid grid-cols-3 gap-4 py-4">
                    {#each Array(7) as i}
                        <Project favorite />
                    {/each}
                </div>

                <div class="divider divider-primary" />

                <h1 class="text-3xl text-secondary font-bold pt-4">Postados na comunidade</h1>
                <div class="grid grid-cols-3 gap-4 py-4">
                    <h1 class="text-xl">Nenhum projeto encontrado</h1>
                </div>

                <div class="divider divider-primary" />

                <h1 class="text-3xl text-secondary font-bold pt-4">Componentes adquridos</h1>
                <div class="grid grid-cols-3 gap-4 py-4">
                    {#each Array(9) as i}
                        <Component name="Nome do Componente" store />
                    {/each}
                </div>
            </section>
        </main>
    </main>
</body>

<style>
    @media (max-width: 1280px) {
        .icon {
            font-size: 250px;
        }
    }

    @media (max-width: 640px) {
        .icon {
            font-size: 150px;
        }
    }

    @media (min-width: 1280px) {
        .icon {
            font-size: 300px;
        }
    }
</style>

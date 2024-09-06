<script lang="ts">
    import { lightMode, toggle } from '$lib/stores/theme';
    import { contrastType, contrast } from '$lib/stores/contrast';
    import Icon from '@iconify/svelte';
    import Project from '$lib/components/Project.svelte';
    import Component from '$lib/components/Component.svelte';
    import Community from '$lib/components/Community.svelte';

    let option: string = 'projects';

    function changeOption(value: string) {
        option = value;
    }
</script>

<body data-theme={$contrast ? $contrastType : ($lightMode ? "light" : "dark")} class="w-full min-h-screen overflow-x-hidden">
    <main class="xl:flex w-screen min-h-screen justify-end">
        <aside
            class="w-full xl:w-2/6 h-[40rem] sm:h-[50rem] md:h-[46rem] xl:min-h-screen bg-base-300 xl:fixed top-0 left-0"
        >
            <div class="flex justify-between px-12 py-4 xl:py-4">
                <a href="home"><Icon icon="fe:arrow-left" font-size="40px" /></a>
                <a href="settings"><Icon icon="material-symbols:settings" font-size="40px" /></a>
            </div>

            <section class="flex flex-col justify-center items-center h-full">
                <div class="icon -mt-28">
                    <Icon icon="healthicons:ui-user-profile" />
                </div>
                <h1 class="text-3xl sm:text-4xl font-bold">Nome do Usuário</h1>
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
                        <div
                            class="grid place-items-center md:flex md:justify-center md:gap-6 xl:block"
                        >
                            <p class="flex items-center gap-4 pt-2 sm:pt-4">
                                <Icon
                                    icon="ic:baseline-people"
                                    font-size="20px"
                                    class="text-secondary"
                                /> 777k seguidores • 3 seguindo
                            </p>

                            <p class="hidden md:flex md:items-center md:gap-4 md:pt-4">
                                <Icon
                                    icon="icon-park-solid:local-two"
                                    font-size="20px"
                                    class="text-secondary"
                                /> Brasil - Bahia
                            </p>
                        </div>

                        <div class="flex justify-center md:hidden gap-6">
                            <p class="flex items-center gap-4 pt-4">
                                <Icon
                                    icon="icon-park-solid:local-two"
                                    font-size="20px"
                                    class="text-secondary"
                                /> Brasil - Bahia
                            </p>

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
                        </div>

                        <div
                            class="grid place-items-center md:flex md:justify-center md:gap-6 xl:block"
                        >
                            <div class="hidden md:flex md:items-center md:gap-4 md:pt-4">
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
                                    class="progress progress-secondary w-40 xl:w-56"
                                    value="2"
                                    max="100"
                                />
                            </div>
                        </div>
                    </section>
                </div>
            </section>
        </aside>
        <main class="w-full xl:w-4/6 min-h-screen bg-base-100">
            <div class="flex xl:hidden w-full">
                <button
                    class={`btn rounded-none w-1/4 text-xs sm:text-base ${
                        option === 'projects' ? 'btn-primary' : 'btn-secondary'
                    }`}
                    on:click={() => changeOption('projects')}>Projetos</button
                >
                <button
                    class={`btn rounded-none w-1/4 text-xs sm:text-base ${
                        option === 'favorites' ? 'btn-primary' : 'btn-secondary'
                    }`}
                    on:click={() => changeOption('favorites')}>Favoritos</button
                >
                <button
                    class={`btn rounded-none w-1/4 text-xs sm:text-base ${
                        option === 'community' ? 'btn-primary' : 'btn-secondary'
                    }`}  
                    on:click={() => changeOption('community')}>Comunidade</button
                >
                <button
                    class={`btn rounded-none w-1/4 text-xs sm:text-base ${
                        option === 'components' ? 'btn-primary' : 'btn-secondary'
                    }`}
                    on:click={() => changeOption('components')}>Componentes</button
                >
            </div>

            <label class="swap swap-rotate float-right pr-8 pt-8">
                <input type="checkbox" class="theme-controller" on:click={toggle} />

                <Icon icon="ph:moon" class="swap-on size-8" />
                <Icon icon="ph:sun" class="swap-off size-8" />
            </label>

            <section class="pt-20 mx-20 hidden xl:block">
                <h1 class="text-3xl text-secondary font-bold text-center xl:text-left">
                    Projetos Recentes
                </h1>
                <div class="grid grid-cols-3 xl:grid-cols-2 2xl:grid-cols-3 gap-4 py-4">
                    {#each Array(11) as i}
                        <Project />
                    {/each}
                </div>

                <div class="divider divider-primary" />

                <h1 class="text-3xl text-secondary font-bold pt-4">Favoritos</h1>
                <div class="grid grid-cols-3 xl:grid-cols-2 2xl:grid-cols-3 gap-4 py-4">
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

            <section class="w-full grid place-items-center py-12 px-8 sm:px-20 xl:hidden">
                {#if option === 'projects'}
                    <h1
                        class="text-3xl text-secondary text-center font-bold text-center xl:text-left"
                    >
                        Projetos Recentes
                    </h1>
                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 py-4">
                        {#each Array(11) as i}
                            <Project />
                        {/each}
                    </div>
                {:else if option === 'favorites'}
                    <h1 class="text-3xl text-secondary text-center font-bold pt-4">Favoritos</h1>
                    <div class="grid grid-cols-1 md:grid-cols-2 lg;grid-cols-3 gap-4 py-4">
                        {#each Array(7) as i}
                            <Project favorite />
                        {/each}
                    </div>
                {:else if option === 'community'}
                    <h1 class="text-3xl text-secondary text-center font-bold pt-4">
                        Postados na comunidade
                    </h1>
                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 py-4">
                        {#each Array(7) as i}
                            <Community
                                data={Date.now()}
                                likes={1209}
                                tags={['Urbano', 'Ecológico', 'Acessibilidade']}
                                >Lorem ipsum dolor, sit amet consectetur adipisicing elit. Vitae
                                libero, explicabo fugiat corporis quasi nihil quam consequatur
                                voluptatum sequi asperiores, itaque id, animi incidunt quae ratione
                                aperiam mollitia reiciendis amet!</Community
                        >
                        {/each}
                    </div>
                {:else if option === 'components'}
                    <h1 class="text-3xl text-secondary text-center font-bold pt-4">
                        Componentes adquridos
                    </h1>
                    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 py-4 w-full">
                        {#each Array(9) as i}
                            <Component name="Nome do Componente" store />
                        {/each}
                    </div>
                {/if}
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
            font-size: 200px;
        }
    }
</style>

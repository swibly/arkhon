<script>
    import { lightMode, toggle } from '$lib/stores/theme';
    import Icon from '@iconify/svelte';
    import Project from '$lib/components/Project.svelte';
    import Component from '$lib/components/Component.svelte';
</script>

<body data-theme={$lightMode ? 'light' : 'dark'} class="w-full min-h-screen">
    <main class="flex">
        <aside class="w-2/6 h-screen bg-base-300">
            <div class="flex justify-between px-12 py-8">
                <a href="home"><Icon icon="fe:arrow-left" font-size="40px" /></a>
                <Icon icon="material-symbols:settings" font-size="40px" />
            </div>

            <section class="grid place-items-center">
                <Icon icon="healthicons:ui-user-profile" font-size="300px" />
                <h1 class="text-5xl font-bold">Nome do Usuário</h1>
                <h2 class="text-2xl">Apelido do usuário</h2>
                <p class="px-32 py-8 text-justify">
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Odit nulla quidem
                    placeat, vero eaque esse qui, aperiam minus ea, optio magnam explicabo eum.
                    Mollitia officia quisquam eligendi optio voluptatem vitae?
                </p>
                <button class="btn btn-secondary w-72 text-lg hover:btn-secondary"
                    >Editar Perfil</button
                >
                <section>
                    <p class="flex items-center gap-4 pt-4">
                        <Icon icon="ic:baseline-people" font-size="20px" /> 777k seguidores • 3 seguindo
                    </p>

                    <p class="flex items-center gap-4 pt-4">
                        <Icon icon="icon-park-solid:local-two" font-size="20px" /> Brasil - Bahia
                    </p>

                    <div class="flex items-center gap-4 pt-4">
                        <Icon icon="mingcute:coin-2-fill" font-size="20px" />
                        <p class="flex items-center w-20 bg-secondary rounded-xl font-semibold">
                            <img src="/gallery/Arkhoin.png" alt="Arkhoin" class="w-8 h-8" /> 300k
                        </p>
                    </div>
                    <div class="flex items-center gap-4 pt-4">
                        <p class="flex items-center gap-4">
                            <Icon icon="game-icons:laurels" font-size="20px" />157/10k XP
                        </p>
                        <progress class="progress progress-primary w-56" value="2" max="100" />
                    </div>
                </section>
            </section>
        </aside>
        <main class="w-4/6 h-screen bg-base-100">
            <label class="swap swap-rotate float-right pr-4 pt-4">
                <input type="checkbox" class="theme-controller" on:click={toggle} />

                <Icon icon="ph:moon" class="swap-on size-8" />
                <Icon icon="ph:sun" class="swap-off size-8" />
            </label>
            <section class="pt-20 mx-20">
                <h1 class="text-3xl text-secondary font-bold">Projetos Recentes</h1>
                <div class="grid grid-cols-4 gap-4 pt-4">
                    {#each Array(5) as i}
                        <Project />
                    {/each}
                </div>

                <h1 class="text-3xl text-secondary font-bold pt-4">Favoritos</h1>
                <div class="grid grid-cols-4 gap-4 pt-4">
                    {#each Array(3) as i}
                        <Project favorite/>
                    {/each}
                </div>

                <h1 class="text-3xl text-secondary font-bold pt-4">Componentes adquridos</h1>
                <div class="grid grid-cols-4 gap-4 pt-4">
                    {#each Array(3) as i}
                        <Component name="Nome do Componente"/>
                    {/each}
                </div>
            </section>
        </main>
    </main>
</body>

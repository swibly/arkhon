<script lang="ts">
    import { lightMode, toggle } from '$lib/stores/theme';
    import { contrastType, contrast } from '$lib/stores/contrast';
    import Icon from '@iconify/svelte';
</script>

<body data-theme={$contrast ? $contrastType : ($lightMode ? "light" : "dark")} class="w-full min-h-screen">
    <main class="w-full min-h-screen py-12">
        <div class="flex justify-between items-center w-full px-12">
            <a href="settings"><Icon icon="fe:arrow-left" font-size="40px" /></a>
            <label class="swap swap-rotate">
                <input type="checkbox" class="theme-controller" on:click={toggle} />

                <Icon icon="ph:moon" class="swap-on size-8" />
                <Icon icon="ph:sun" class="swap-off size-8" />
            </label>
        </div>
        <header
            class="bg-base-300 w-4/5 h-64 mx-auto flex flex-col justify-center items-center mt-8"
        >
            <h1 class="text-3xl sm:text-4xl xl:text-5xl text-center font-bold px-6">
                Como podemos ajudar ?
            </h1>
            <label
                class="input input-bordered flex items-center gap-2 bg-neutral w-3/4 lg:w-1/2 text-base mt-12 icon"
            >
                <input type="text" class={`grow text-center ${$contrast ? 'text-black' : 'text-white'}`} placeholder="Pesquisar dúvida"/>
                <Icon icon="material-symbols:search" class="hidden sm:block"/>
            </label>
        </header>
        <section
            class="w-4/5 h-48 md:h-40 bg-base-200 mx-auto flex flex-col justify-center items-center"
        >
            <h1 class="text-base sm:text-lg xl:text-xl font-bold text-center px-6">
                Por acaso não encontrou a sua dúvida? Sinta-se a vontade para mandá-la para a gente.
            </h1>
            <a href="contact"
                ><button class="btn btn-outline btn-secondary mt-4">Enviar pergunta</button></a
            >
        </section>
        <h1 class="text-2xl sm:text-3xl xl:text-4xl text-center font-bold mt-8">
            Perguntas Frequentes
        </h1>
        <section class="flex justify-center mt-8">
            <div
                class="grid grid-cols-1 lg:grid-cols-2 place-items-center gap-x-4 gap-y-4 max-w-7xl mx-6 sm:mx-20"
            >
                {#each Array(15) as i}
                    <div
                        tabindex="0"
                        class="collapse collapse-plus border-base-300 bg-base-200 border w-full place-self-start"
                    >
                        <div class="collapse-title text-lg sm:text-xl font-medium">lorem ipsum</div>
                        <div class="collapse-content">
                            <p class="text-sm sm:text-base">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis
                                magni ratione, explicabo quo aspernatur nisi doloribus provident
                                omnis tenetur ducimus voluptates atque hic ad et. Labore reiciendis
                                aspernatur assumenda ab. Lorem ipsum dolor sit amet consectetur
                                adipisicing elit. Ullam consequatur dolorum magnam quibusdam dolorem
                                ipsam quis voluptatum ab delectus error sed corrupti, enim quaerat
                                iusto necessitatibus fugit deserunt unde suscipit.
                            </p>
                        </div>
                    </div>
                {/each}
            </div>
        </section>
    </main>
</body>
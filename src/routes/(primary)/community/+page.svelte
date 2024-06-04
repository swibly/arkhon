<script lang="ts">
    import Icon from '@iconify/svelte';
    import { lightMode, toggle } from '$lib/stores/theme';
    import Card from '$lib/components/Card.svelte';
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
                class="text-sm sm:text-base transition duration-150 ease-in-out hover:text-base sm:hover:text-lg hover:scale-110 hover:border-b-4 border-secondary mt-8"
            >
                Projeto
            </a>
            <a
                href="/"
                class="text-sm sm:text-base transition duration-150 ease-in-out hover:text-base sm:hover:text-lg hover:scale-110 border-b-4 border-primary mt-8"
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
            <h1 class="text-2xl sm:text-4xl text-secondary text-center font-bold mt-12">
                Comunidade
            </h1>
            <h2 class="text-lg sm:text-2xl text-secondary text-center font-bold mb-6">
                Navegue por nossos criadores e suas obras
            </h2>
            <div class="px-8">
                <label
                    class="input max-sm:input-sm bg-neutral flex items-center mx-auto max-w-[800px]"
                >
                    <input type="text" class="grow text-center" placeholder="Ex: Casa na árvore" />
                    <Icon icon="material-symbols:search" />
                </label>
            </div>

            <div class="sm:mx-12 py-12">
                <div class="w-full flex justify-center flex-wrap">
                    {#each Array(8) as i}
                        <Card                            
                            data={Date.now()}
                            likes={1209}
                            banner="/gallery/placeholder01.png"
                            alt="Placeholder"
                            author="Usuário"
                            tags={['Acessibilidade', 'Edifício', 'Moderno']}
                        >
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos porro, odit reprehenderit nam eveniet consequatur, alias excepturi libero ipsam doloribus ipsum dolorum voluptatem nisi consectetur, velit tempore? Tempora, corrupti labore!
                        </Card>
                    {/each}
                </div>
            </div>
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

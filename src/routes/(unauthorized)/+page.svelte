<script lang="ts">
    import ExampleCard from '$lib/components/ExampleCard.svelte';
    import Logo from '$lib/components/Logo.svelte';
    import Icon from '@iconify/svelte';
    import type { LayoutServerData } from './$types';
    import { canShowConfetti } from '$lib/stores/confetti';

    export let data: LayoutServerData;
</script>

<svelte:head>
    <title>Home - Swibly Arkhon</title>
</svelte:head>

{#if data.token !== undefined}
    <a href="/home" class="w-full bg-warning text-black p-4 flex items-center gap-2 justify-center">
        <Icon icon="mdi:home" />
        Você já estava logado, clique aqui para entrar.
    </a>
{/if}

<main data-theme="light">
    <section class="flex flex-col items-center justify-center p-8">
        <Logo class="mx-auto mix-blend-difference fill-white" />

        <p class="mt-8 text-3xl text-center">Sua plataforma de arquitetura.</p>

        <div class="flex flex-wrap justify-center gap-2 mt-8">
            <a href="/login" class="btn btn-primary btn-wide">
                <Icon icon="material-symbols:login" />
                Iniciar Sessão
            </a>
            <a href="/register" class="btn btn-secondary btn-wide">
                <Icon icon="mdi:register" />
                Criar Conta
            </a>
        </div>
    </section>

    <section
        class="relative flex flex-col items-center justify-center w-full py-20"
        style="background-image: url(/home/banner.png); background-position: center; background-size: cover;"
    >
        <h2 class="pt-12 text-3xl text-center text-white max-md:text-xl">
            Papel e caneta se tornaram obsoletos na prototipação.
        </h2>

        <a href="/about" class="mt-8 btn btn-secondary btn-wide max-sm:btn-sm">
            <Icon icon="mdi:tag-text" />
            Saiba mais
        </a>
    </section>

    <section class="flex flex-wrap justify-center my-10">
        <ExampleCard
            title="Projeto 1"
            date={new Date(Date.now())}
            likes={1209}
            banner="/gallery/placeholder.png"
            alt="Placeholder"
            authors={['Gustavo', 'Eduardo']}
            tags={['Acessibilidade', 'Edifício', 'Moderno']}
        >
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis, perferendis non
            laborum ab nemo provident aut, vitae quod nihil reprehenderit minima ut pariatur dolor.
            Voluptatem ratione animi ullam inventore quis.
        </ExampleCard>

        <ExampleCard
            title="Projeto 2"
            date={new Date(Date.now())}
            likes={1209}
            banner="/gallery/placeholder.png"
            alt="Placeholder"
            authors={['Gustavo', 'Eduardo']}
            tags={['Acessibilidade', 'Edifício', 'Moderno']}
        >
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis, perferendis non
            laborum ab nemo provident aut, vitae quod nihil reprehenderit minima ut pariatur dolor.
            Voluptatem ratione animi ullam inventore quis.
        </ExampleCard>

        <ExampleCard
            title="Projeto 3"
            date={new Date(Date.now())}
            likes={1209}
            banner="/gallery/placeholder.png"
            alt="Placeholder"
            authors={['Gustavo', 'Eduardo']}
            tags={['Acessibilidade', 'Edifício', 'Moderno']}
        >
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis, perferendis non
            laborum ab nemo provident aut, vitae quod nihil reprehenderit minima ut pariatur dolor.
            Voluptatem ratione animi ullam inventore quis.
        </ExampleCard>
    </section>

    <section class="flex justify-between mt-4 sm:mt-20">
        <img src="/home/left-vector.png" alt="bg-2" class="w-full max-sm:hidden max-w-48" />

        <div class="flex flex-col items-center justify-center flex-1 px-10 py-20">
            <h2 class="text-5xl font-bold text-center max-md:text-3xl">Seja novo. Seja Arkhon.</h2>

            <a href="/register" class="mt-4 btn btn-primary btn-wide sm:mt-12 btn-lg max-sm:btn-md">
                <Icon icon="mdi:pen" />
                Comece a projetar
            </a>
        </div>

        <img src="/home/right-vector.png" alt="bg-2" class="w-full max-sm:hidden max-w-48" />
    </section>
</main>

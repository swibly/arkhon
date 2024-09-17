<script lang="ts">
    import Card from '$lib/components/Card.svelte';
    import Logo from '$lib/components/Logo.svelte';
    import Icon from '@iconify/svelte';

    let aboutArkhonModal: HTMLDialogElement;

    function showModal() {
        aboutArkhonModal.showModal();
    }
</script>

<section class="flex flex-col items-center p-8">
    <Logo class="mix-blend-difference fill-white" />

    <p class="text-3xl">Sua plataforma de arquitetura.</p>

    <div class="mt-8">
        <a href="/login" class="btn btn-primary w-36">Iniciar Sessão</a>
        <a href="/register" class="btn btn-secondary w-36">Criar Conta</a>
    </div>

    <img src="/home/planta.png" alt="Planta" />
</section>

<section
    class="relative flex flex-col items-center justify-center w-full py-20"
    style="background-image: url(/home/banner.png); background-position: center; background-size: cover;"
>
    <h2 class="pt-12 text-3xl text-white max-md:text-xl">
        Papel e caneta tornaram-se obsoletos na prototipação
    </h2>

    <button class="m-4 btn btn-neutral w-36 text-black-500 max-sm:btn-sm" on:click={showModal}>
        Saiba mais
    </button>

    <dialog id="my_modal_1" bind:this={aboutArkhonModal} class="modal">
        <div class="w-11/12 max-w-5xl p-12 rounded-md modal-box">
            <article class="space-y-8">
                <h2 class="text-3xl font-semibold sm:text-4xl text-primary">
                    <Icon
                        icon="ic:sharp-architecture"
                        class="inline -rotate-[30deg]"
                        font-size={48}
                    />

                    O que é a Arkhon?
                </h2>

                <p>
                    A Arkhon é uma plataforma online inovadora para criação de plantas
                    arquitetônicas, acessível tanto a profissionais quanto a iniciantes. Oferece
                    ferramentas intuitivas para o desenvolvimento de layouts precisos, além de uma
                    rica biblioteca de modelos e projetos compartilhados por outros usuários.
                </p>

                <p>
                    A plataforma promove a colaboração entre os usuários, que podem compartilhar
                    suas criações, receber feedback e trabalhar juntos. Com isso, a Arkhon facilita
                    o design arquitetônico, seja para otimizar o fluxo de trabalho de arquitetos ou
                    para permitir que entusiastas concretizem suas ideias.
                </p>
            </article>

            <form method="dialog">
                <button class="absolute btn btn-sm btn-circle btn-ghost right-2 top-2">✕</button>
            </form>
        </div>

        <form method="dialog" class="modal-backdrop">
            <button class="cursor-default">close</button>
        </form>
    </dialog>
</section>

<section class="flex flex-wrap justify-center my-10">
    <Card
        title="Projeto 1"
        date={new Date(Date.now())}
        likes={1209}
        banner="/gallery/placeholder.png"
        alt="Placeholder"
        authors={['Gustavo', 'Eduardo']}
        tags={['Acessibilidade', 'Edifício', 'Moderno']}
    >
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis, perferendis non laborum
        ab nemo provident aut, vitae quod nihil reprehenderit minima ut pariatur dolor. Voluptatem
        ratione animi ullam inventore quis.
    </Card>

    <Card
        title="Projeto 2"
        date={new Date(Date.now())}
        likes={1209}
        banner="/gallery/placeholder.png"
        alt="Placeholder"
        authors={['Gustavo', 'Eduardo']}
        tags={['Acessibilidade', 'Edifício', 'Moderno']}
    >
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis, perferendis non laborum
        ab nemo provident aut, vitae quod nihil reprehenderit minima ut pariatur dolor. Voluptatem
        ratione animi ullam inventore quis.
    </Card>

    <Card
        title="Projeto 3"
        date={new Date(Date.now())}
        likes={1209}
        banner="/gallery/placeholder.png"
        alt="Placeholder"
        authors={['Gustavo', 'Eduardo']}
        tags={['Acessibilidade', 'Edifício', 'Moderno']}
    >
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis, perferendis non laborum
        ab nemo provident aut, vitae quod nihil reprehenderit minima ut pariatur dolor. Voluptatem
        ratione animi ullam inventore quis.
    </Card>
</section>

<section class="flex justify-between mt-4 sm:mt-20">
    <img src="/home/left-vector.png" alt="bg-2" class="w-full max-sm:hidden max-w-48" />

    <div class="flex flex-col items-center justify-center flex-1 px-10 py-20">
        <h2 class="text-5xl font-bold text-center max-md:text-3xl">Seja novo. Seja Arkhon.</h2>

        <a href="/register" class="mt-4 btn btn-primary sm:mt-12 btn-lg max-sm:btn-md">
            Comece a projetar
        </a>
    </div>

    <img src="/home/right-vector.png" alt="bg-2" class="w-full max-sm:hidden max-w-48" />
</section>

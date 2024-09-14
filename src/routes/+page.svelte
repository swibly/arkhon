<script lang="ts">
    import Card from '$lib/components/Card.svelte';

    let modalRef: any;

    function showModal() {
        if (modalRef) {
            modalRef.showModal();
        }
    }
</script>

<section class="flex flex-col items-center p-8">
    <img src="/gallery/logo.png" class="size-48" alt="Logo" />
    <p class="text-3xl font-semibold">Sua plataforma de arquitetura</p>

    <div class="mt-8">
        <a href="/login" class="btn btn-primary w-36">Iniciar Sessão</a>
        <a href="/register" class="btn btn-secondary w-36">Criar Conta</a>
    </div>

    <img src="/gallery/plano.png" alt="Planta" />
</section>

<section
    class="relative flex flex-col items-center justify-center w-full py-20"
    style="background-image: url(/gallery/background01.png); background-position: center; background-size: cover;"
>
    <h2 class="pt-12 text-3xl text-white max-md:text-xl">
        Papel e caneta tornaram-se obsoletos na prototipação
    </h2>

    <button class="m-4 btn btn-neutral w-36 text-black-500 max-sm:btn-sm" on:click={showModal}>
        Saiba mais
    </button>

    <dialog id="my_modal_1" bind:this={modalRef} class="modal">
        <div class="w-11/12 max-w-5xl p-12 modal-box">
            <article class="space-y-8">
                <h1 class="text-3xl text-center sm:text-4xl">Um pouco da Arkhon</h1>

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
            <button>close</button>
        </form>
    </dialog>
</section>

<h1 class="mt-10 text-2xl font-bold text-center text-secondary">Descubra novos horizontes</h1>
<div class="flex flex-wrap justify-center mt-10">
    <Card
        hidden
        data={Date.now()}
        likes={1209}
        banner="/gallery/placeholder01.png"
        alt="Placeholder"
        author="Gustavinxx7Ousadozz"
        tags={['Acessibilidade', 'Edifício', 'Moderno']}
    >
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis, perferendis non laborum
        ab nemo provident aut, vitae quod nihil reprehenderit minima ut pariatur dolor. Voluptatem
        ratione animi ullam inventore quis.
    </Card>

    <Card
        special
        data={Date.now()}
        likes={1209}
        banner="/gallery/placeholder01.png"
        alt="Placeholder"
        author="Gustavinxx7Ousadozz"
        tags={['Acessibilidade', 'Edifício', 'Moderno']}
    >
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis, perferendis non laborum
        ab nemo provident aut, vitae quod nihil reprehenderit minima ut pariatur dolor. Voluptatem
        ratione animi ullam inventore quis.
    </Card>

    <Card
        data={Date.now()}
        likes={1209}
        banner="/gallery/placeholder01.png"
        alt="Placeholder"
        author="Gustavinxx7Ousadozz"
        tags={['Acessibilidade', 'Edifício', 'Moderno']}
    >
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis, perferendis non laborum
        ab nemo provident aut, vitae quod nihil reprehenderit minima ut pariatur dolor. Voluptatem
        ratione animi ullam inventore quis.
    </Card>

    <Card
        show
        data={Date.now()}
        likes={1209}
        banner="/gallery/placeholder01.png"
        alt="Placeholder"
        author="Gustavinxx7Ousadozz"
        tags={['Acessibilidade', 'Edifício', 'Moderno']}
    >
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis, perferendis non laborum
        ab nemo provident aut, vitae quod nihil reprehenderit minima ut pariatur dolor. Voluptatem
        ratione animi ullam inventore quis.
    </Card>
</div>

<div class="flex justify-between mt-4 sm:mt-20">
    <img src="/gallery/background02.png" alt="bg-2" class="w-full max-sm:hidden max-w-48" />
    <div class="flex flex-col items-center justify-center flex-1 px-10 py-20">
        <h1 class="text-5xl font-bold text-center max-md:text-3xl">Seja novo. Seja Arkhon!</h1>
        <a href="/register/"
            ><button class="mt-4 btn btn-primary sm:mt-12 btn-lg max-sm:btn-md"
                >Comece a projetar</button
            ></a
        >
    </div>
    <img src="/gallery/background03.png" alt="bg-2" class="w-full max-sm:hidden max-w-48" />
</div>

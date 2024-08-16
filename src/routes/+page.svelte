<script lang="ts">
    import Card from '$lib/components/Card.svelte';

    let modalRef: any;

    function showModal() {
        if (modalRef) {
            modalRef.showModal();
        }
    }
</script>

<body data-theme="mytheme">
    <div class="pt-12 mb-12">
        <div class="flex justify-center">
            <img src="/gallery/logo.png" class="h-48 w-48" alt="Logo" />
        </div>
        <p class="flex justify-center text-3xl font-semibold">Sua plataforma de arquitetura</p>
    </div>
    <div class="flex justify-center gap-4">
        <a href="/login" class="btn btn-primary w-36">Iniciar Sessão</a>
        <a href="/register" class="btn btn-secondary w-36">Criar Conta</a>
    </div>
    <div class="flex justify-center">
        <img src="/gallery/plano.png" alt="Planta" />
    </div>
    <div
        class="relative w-full overflow-hidden flex justify-center flex-col items-center py-20"
        style="background-image: url(/gallery/background01.png); background-position: center; background-size: cover;"
    >
        <h1 class="pt-12 text-white text-3xl max-md:text-xl text-center">
            Papel e caneta tornaram-se obsoletos na prototipação
        </h1>
        <div class="flex justify-center align-items">
            <button
                class="btn btn-neutral w-36 text-black-500 m-4 max-sm:btn-sm"
                on:click={showModal}>Saiba mais</button
            >
        </div>
        <dialog id="my_modal_1" bind:this={modalRef} class="modal">
            <div class="modal-box max-w-full">
                <form method="dialog">
                    <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button
                    >
                </form>
                <h1 class="text-4xl sm:text-5xl font-bold text-center mt-8">Um pouco da Arkhon</h1>
                <p class="text-xs sm:text-lg text-justify mt-4 sm:mt-12 py-2 mx-4 lg:mx-40">
                    A Arkhon é uma plataforma inovadora projetada para facilitar o planejamento e o
                    desenvolvimento de plantas arquitetônicas de forma online. Este projeto visa
                    democratizar o acesso a ferramentas de design arquitetônico, permitindo que
                    tanto profissionais experientes quanto usuários sem experiência prévia possam
                    criar, modificar e visualizar desenhos detalhados de suas construções.
                </p>
                <p class="text-xs sm:text-lg text-justify py-2 mx-4 lg:mx-40">
                    A interface da Arkhon é intuitiva e amigável, oferecendo uma variedade de
                    funcionalidades que tornam o processo de design acessível e eficiente. Usuários
                    podem começar a desenhar suas plantas do zero, utilizando uma ampla gama de
                    ferramentas que permitem a criação de layouts precisos e personalizados. Além
                    disso, a plataforma fornece uma biblioteca rica de modelos e exemplos de
                    projetos, disponibilizados por outros clientes, que podem servir como inspiração
                    ou base para novos designs.
                </p>

                <p class="text-xs sm:text-lg text-justify py-2 mx-4 lg:mx-40">
                    Com a Arkhon, os usuários também têm a oportunidade de compartilhar suas
                    criações com a comunidade, receber feedback e colaborar em projetos. Essa
                    abordagem colaborativa não só incentiva a criatividade, mas também ajuda a
                    construir uma rede de suporte e troca de ideias entre os usuários.
                </p>

                <p class="text-xs sm:text-lg text-justify mb-12 py-2 mx-4 lg:mx-40">
                    Seja para arquitetos profissionais que buscam uma ferramenta eficiente para
                    otimizar seu fluxo de trabalho, ou para entusiastas que desejam dar vida às suas
                    ideias de design, a Arkhon oferece um ambiente completo e versátil para todos os
                    níveis de habilidade.
                </p>
            </div>
        </dialog>
    </div>

    <h1 class="mt-10 text-center text-2xl text-secondary font-bold">Descubra novos horizontes</h1>
    <div class="flex flex-wrap mt-10 justify-center">
        <Card
            hidden
            data={Date.now()}
            likes={1209}
            banner="/gallery/placeholder01.png"
            alt="Placeholder"
            author="Gustavinxx7Ousadozz"
            tags={['Acessibilidade', 'Edifício', 'Moderno']}
        >
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis, perferendis non
            laborum ab nemo provident aut, vitae quod nihil reprehenderit minima ut pariatur dolor.
            Voluptatem ratione animi ullam inventore quis.
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
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis, perferendis non
            laborum ab nemo provident aut, vitae quod nihil reprehenderit minima ut pariatur dolor.
            Voluptatem ratione animi ullam inventore quis.
        </Card>

        <Card
            data={Date.now()}
            likes={1209}
            banner="/gallery/placeholder01.png"
            alt="Placeholder"
            author="Gustavinxx7Ousadozz"
            tags={['Acessibilidade', 'Edifício', 'Moderno']}
        >
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis, perferendis non
            laborum ab nemo provident aut, vitae quod nihil reprehenderit minima ut pariatur dolor.
            Voluptatem ratione animi ullam inventore quis.
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
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis, perferendis non
            laborum ab nemo provident aut, vitae quod nihil reprehenderit minima ut pariatur dolor.
            Voluptatem ratione animi ullam inventore quis.
        </Card>
    </div>

    <div class="flex justify-between mt-4 sm:mt-20">
        <img src="/gallery/background02.png" alt="bg-2" class="max-sm:hidden max-w-48 w-full" />
        <div class="flex flex-1 flex-col items-center justify-center py-20 px-10">
            <h1 class="text-5xl max-md:text-3xl text-center font-bold">Seja novo. Seja Arkhon!</h1>
            <a href="/register/"
                ><button class="btn btn-primary mt-4 sm:mt-12 btn-lg max-sm:btn-md"
                    >Comece a projetar</button
                ></a
            >
        </div>
        <img src="/gallery/background03.png" alt="bg-2" class="max-sm:hidden max-w-48 w-full" />
    </div>
</body>

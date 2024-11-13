<script lang="ts">
    import Logo from '$lib/components/Logo.svelte';
</script>

<main class="w-full h-full max-w-5xl mx-auto">
    <header class="flex flex-col items-center mt-24 sm:mt-32 md:mt-40 mx-4 sm:mx-20 md:mx-32">
        <Logo
            class="mx-auto mix-blend-difference fill-white w-28 h-28 md:w-36 md:h-36 lg:w-48 lg:h-48"
        />
        <h2 class="font-semibold text-center text-md">
            Seja bem vindo ao suporte da Arkhon
        </h2>
        <h1 class="font-bold text-center text-2xl sm:text-4xl">
            Perguntas frequentes em nossa plataforma
        </h1>
    </header>
    <section class="flex flex-col items-center mt-8 sm:mt-20">
        <div class="divider divider-neutral w-5/6 mx-auto -mt-2 sm:-mt-2" />
        <div tabindex="0" class="rounded-none collapse collapse-arrow w-5/6 -my-6 group">
            <div
                class="collapse-title sm:text-lg sm:text-xl font-semibold group-focus:bg-secondary group-focus:text-white"
            >
                O que é a Arkhon?
            </div>
            <div class="collapse-content group-focus:mt-4 text-sm sm:text-base text-justify">
                <p>
                    A Arkhon é uma plataforma que permite a criação de plantas baixas de
                    arquitetura. Ela oferece uma série de ferramentas para o usuário criar,
                    compartilhar e visualizar projetos, além de uma comunidade para interações e
                    compartilhamento.
                </p>
            </div>
        </div>
        <div class="divider divider-neutral w-5/6 mx-auto" />
        <div tabindex="0" class="rounded-none collapse collapse-arrow w-5/6 -my-6 group">
            <div
                class="collapse-title sm:text-lg sm:text-xl font-semibold group-focus:bg-secondary group-focus:text-white"
            >
                Como faço para criar uma conta na Arkhon?
            </div>
            <div class="collapse-content group-focus:mt-4 text-sm sm:text-base text-justify">
                <p>
                    Para criar uma conta, acesse a página inicial da Arkhon e clique em
                    "Registrar-se". Preencha as informações solicitadas, como nome, email e senha, e
                    siga as instruções para confirmar o cadastro.
                </p>
            </div>
        </div>
        <div class="divider divider-neutral w-5/6 mx-auto" />
        <div tabindex="0" class="rounded-none collapse collapse-arrow w-5/6 -my-6 group">
            <div
                class="collapse-title sm:text-lg sm:text-xl font-semibold group-focus:bg-secondary group-focus:text-white"
            >
                Posso definir meu perfil como privado?
            </div>
            <div class="collapse-content group-focus:mt-4 text-sm sm:text-base text-justify">
                <p>
                    A Arkhon permite que você torne seu perfil privado, controlando quem pode ver
                    suas publicações e seguir seu perfil. Basta acessar as configurações da conta e
                    ativar a opção de perfil privado.
                </p>
            </div>
        </div>
        <div class="divider divider-neutral w-5/6 mx-auto" />
        <div tabindex="0" class="rounded-none collapse collapse-arrow w-5/6 -my-6 group">
            <div
                class="collapse-title sm:text-lg sm:text-xl font-semibold group-focus:bg-secondary group-focus:text-white"
            >
                Onde posso postar meus projetos?
            </div>
            <div class="collapse-content group-focus:mt-4 text-sm sm:text-base text-justify">
                <p>
                    A Arkhon possui uma seção de comunidade onde você pode compartilhar seus
                    projetos com outros usuários. Basta ir até a área de "Editar informações do
                    projeto" e selecionar "Publicar Projeto".
                </p>
            </div>
        </div>
        <div class="divider divider-neutral w-5/6 mx-auto" />
        <div tabindex="0" class="rounded-none collapse collapse-arrow w-5/6 -my-6 group">
            <div
                class="collapse-title sm:text-lg sm:text-xl font-semibold group-focus:bg-secondary group-focus:text-white"
            >
                Como funciona o editor de plantas baixas?
            </div>
            <div class="collapse-content group-focus:mt-4 text-sm sm:text-base text-justify">
                <p>
                    O editor da Arkhon permite que você crie e edite plantas baixas diretamente na
                    plataforma. Com ferramentas intuitivas, você pode adicionar paredes, chãos,
                    mobíliia e outros elementos arquitetônicos, além de ajustar medidas e visualizar
                    o orçamento médio da planta.
                </p>
            </div>
        </div>
        <div class="divider divider-neutral w-5/6 mx-auto" />
        <div tabindex="0" class="rounded-none collapse collapse-arrow w-5/6 -my-6 group">
            <div
                class="collapse-title sm:text-lg sm:text-xl font-semibold group-focus:bg-secondary group-focus:text-white"
            >
                Como posso alterar as informações do meu perfil?
            </div>
            <div class="collapse-content group-focus:mt-4 text-sm sm:text-base text-justify">
                <p>
                    Para atualizar suas informações, vá até o seu perfil e clique em
                    “Configurações”. Lá, você pode modificar informações como nome, biografia,
                    imagem de perfil e preferências de conta.
                </p>
            </div>
        </div>
        <div class="divider divider-neutral w-5/6 mx-auto" />
        <div tabindex="0" class="rounded-none collapse collapse-arrow w-5/6 -my-6 group">
            <div
                class="collapse-title sm:text-lg sm:text-xl font-semibold group-focus:bg-secondary group-focus:text-white"
            >
                Os projetos que compartilho na comunidade são públicos?
            </div>
            <div class="collapse-content group-focus:mt-4 text-sm sm:text-base text-justify">
                <p>
                    Sim, ao publicar um projeto na comunidade, ele fica visível para todos os
                    usuários da plataforma. Caso deseje manter o projeto privado, você pode salvar
                    no seu perfil sem compartilhar publicamente.
                </p>
            </div>
        </div>
        <div class="divider divider-neutral w-5/6 mx-auto" />
        <div tabindex="0" class="rounded-none collapse collapse-arrow w-5/6 -my-6 group">
            <div
                class="collapse-title sm:text-lg sm:text-xl font-semibold group-focus:bg-secondary group-focus:text-white"
            >
                A Arkhon oferece suporte a dispositivos móveis?
            </div>
            <div class="collapse-content group-focus:mt-4 text-sm sm:text-base text-justify">
                <p>
                    Infelizmente, até o momento a Arkhon não possui uma versão adaptada para
                    dispositivos móveis, permitindo apenas visualizar plantas através de
                    dispositivos móveis, como tables e celulares.
                </p>
            </div>
        </div>
        <div class="divider divider-neutral w-5/6 mx-auto" />
        <div tabindex="0" class="rounded-none collapse collapse-arrow w-5/6 -my-6 group">
            <div
                class="collapse-title sm:text-lg sm:text-xl font-semibold group-focus:bg-secondary group-focus:text-white"
            >
                Posso deletar permanentemente minha conta e dados?
            </div>
            <div class="collapse-content group-focus:mt-4 text-sm sm:text-base text-justify">
                <p>
                    Sim, você pode excluir permanentemente sua conta e todos os seus dados. Para
                    isso, vá até as configurações de conta e selecione a opção "Deletar
                    PERMANENTEMENTE sua conta”. Este processo é irreversível, então certifique-se de
                    salvar seus dados antes de prosseguir.
                </p>
            </div>
        </div>
        <div class="divider divider-neutral w-5/6 mx-auto" />
    </section>
</main>

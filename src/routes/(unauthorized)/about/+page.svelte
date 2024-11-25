<script lang="ts">
    import AboutCard from '$lib/components/AboutCard.svelte';
    import Logo from '$lib/components/Logo.svelte';
    import Icon from '@iconify/svelte';
</script>

<svelte:head>
    <title>Sobre - Swibly Arkhon</title>
</svelte:head>

<main class="w-full h-full mx-auto mt-24 mb-12">
    <header class="flex flex-col items-center">
        <Logo class="mx-auto mix-blend-difference fill-white" />
        <h1 class="text-center font-bold text-3xl">Sobre a Arkhon</h1>
        <div class="divider divider-neutral w-40 mx-auto" />
    </header>
    <main
        class="flex flex-col items-center max-w-md sm:max-w-xl md:max-w-2xl lg:max-w-3xl xl:max-w-5xl mx-auto px-8"
    >
        <p class="text-center text-primary font-bold mt-4 mb-12">
            <span class="block">"É de extrema importância promover o acesso democrático ao</span>
            <span class="block">
                processo de criação e desenvolvimento plantas baixas, tornando-o mais acessível para</span
            ><span class="block"
                >profissionais e entusiastas da arquitetura, independentemente de seu nível de
                experiência ou recursos disponíveis."
            </span>
        </p>
        <h1 class="text-center font-semibold text-2xl">O que é a Arkhon?</h1>
        <p class="text-justify mt-4">
            A Arkhon é uma plataforma inovadora para criação de plantas baixas de arquitetura,
            oferecendo uma experiência completa para profissionais e entusiastas do design de
            interiores e arquitetura.
        </p>
        <p class="text-justify mt-4">
            Com ferramentas intuitivas e um editor versátil, os usuários podem criar, personalizar e
            visualizar projetos detalhados de plantas baixas diretamente na plataforma. Além disso,
            a Arkhon possui funcionalidades como perfil de usuário, onde é possível seguir outros
            membros, definir privacidade e atualizar informações pessoais e também uma comunidade na
            qual os usuários podem postar seus projetos à vontade.
        </p>
        <div class="divider divider-neutral w-2/3 mx-auto my-8" />
        <h1 class="text-center font-semibold text-2xl">Principais Objetivos</h1>
        <section class="block sm:flex justify-between w-full mt-8">
            <AboutCard
                style="w-full h-32 mx-auto sm:w-40 sm:h-40 md:w-48 md:h-48 xl:w-72 xl:h-72 py-2 mb-4 sm:mb-0"
                ><Icon icon="mdi:wheelchair" class="text-7xl xl:text-[140px]" />
                <p class="text-center font-bold text-md xl:text-lg px-2 xl:px-8">
                    Garantir um acesso igualitário a todos
                </p>
            </AboutCard>
            <AboutCard
                style="w-full h-36 mx-auto sm:w-40 sm:h-40 md:w-48 md:h-48 xl:w-72 xl:h-72 py-2 mb-4 sm:mb-0"
                ><Icon icon="mdi:people" class="text-7xl xl:text-[140px]" />
                <p class="text-center font-bold text-md xl:text-lg px-2 xl:px-8">
                    Democratizar o desenvolvimento de plantas baixas
                </p>
            </AboutCard>
            <AboutCard
                style="w-full h-32 mx-auto sm:w-40 sm:h-40 md:w-48 md:h-48 xl:w-72 xl:h-72 py-2"
            >
                <Icon
                    icon="ri:money-dollar-circle-fill"
                    class="text-5xl sm:text-7xl xl:text-[140px]"
                />
                <p class="text-center font-bold text-md xl:text-lg px-2 xl:px-8">
                    Auxiliar na estimativa orçamental
                </p>
            </AboutCard>
        </section>
        <div class="divider divider-neutral w-2/3 mx-auto my-8" />
        <h1 class="text-center font-semibold text-2xl">Por que essa plataforma foi criada?</h1>
        <main class="grid grid-cols-1 md:grid-cols-2 gap-10">
            <section class="block flex flex-col">
                <p class="text-justify mt-4">
                    O desenvolvimento de projetos arquitetônicos tem se mostrado um desafio
                    significativo para pessoas que não possuem conhecimento especializado, devido à
                    complexidade dos softwares disponíveis no mercado.
                </p>
                <p class="text-justify mt-4">
                    Além de serem financeiramente inacessíveis para muitos, esses programas demandam
                    um hardware de alto desempenho, tornando-os inviáveis para usuários iniciantes.
                    Diante dessas limitações, a criação de plantas arquitetônicas ainda é, para
                    muitos, um processo manual e restrito ao uso de papel e caneta, o que impede uma
                    maior elaboração e refinamento dos projetos.
                </p>
                <p class="text-justify mt-4">
                    No entanto, a complexidade não se limita apenas às ferramentas de criação. Há
                    também uma carência preocupante de atenção à acessibilidade no planejamento de
                    edificações. Em muitos casos, as soluções arquitetônicas negligenciam a inclusão
                    de tecnologias assistivas e a adaptação dos espaços para atender às necessidades
                    de pessoas com deficiência.
                </p>
            </section>
            <section>
                <p class="text-justify -mt-4 md:mt-4">
                    No entanto, a complexidade não se limita apenas às ferramentas de criação. Há
                    também uma carência preocupante de atenção à acessibilidade no planejamento de
                    edificações. Em muitos casos, as soluções arquitetônicas negligenciam a inclusão
                    de tecnologias assistivas e a adaptação dos espaços para atender às necessidades
                    de pessoas com deficiência.
                </p>
                <p class="text-justify mt-4">
                    A falta de acessibilidade nas construções, especialmente em áreas comuns, agrava
                    a segregação de pessoas com deficiência, limitando sua autonomia e segurança.
                    Esse problema não é apenas técnico, mas também uma questão de justiça social que
                    precisa ser urgentemente enfrentada.
                </p>
                <p class="text-justify mt-4">
                    Pensando nessas lacunas, a Swibly desenvolveu o projeto Arkhon, com o objetivo
                    de oferecer uma plataforma acessível e intuitiva para a criação de plantas
                    baixas, permitindo que qualquer pessoa, independentemente de seu nível de
                    conhecimento técnico, possa desenhar seus próprios projetos.
                </p>
            </section>
        </main>
        <p class="text-justify mt-4">
            Além de simplificar o processo de criação, a Arkhon promove a inclusão ao incentivar a
            incorporação de princípios de acessibilidade nas construções, de forma a atender às
            necessidades de pessoas com deficiência. A plataforma visa contribuir para a
            democratização do planejamento arquitetônico, tornando-o mais inclusivo e alinhado às
            demandas contemporâneas de acessibilidade e equidade.
        </p>
        <div class="divider divider-neutral w-2/3 mx-auto my-8" />
        <section class="block lg:flex justify-around w-full h-72 gap-10 mb-12">
            <section
                class="w-full lg:w-1/2 flex flex-col justify-center items-center px-0 lg:px-12"
            >
                <h1 class="text-center font-semibold text-2xl">Funcionalidades</h1>
                <p class="text-center mt-4">
                    A Arkhon oferece algumas funcionalidades interessantes relacionadas à criação de
                    plantas de arquitetura
                </p>
            </section>
            <section
                class="w-full lg:w-1/2 grid lg:grid-cols-2 place-items-center gap-y-4 mt-8 lg:mt-0"
            >
                <section
                    class="gap-4 w-full flex items-center lg:flex-col gap-y-1 xl:gap-y-4"
                >
                    <AboutCard style="w-1/2 h-40 lg:w-40 lg:h-40">
                        <Icon icon="mdi:pencil" font-size="40px" class="mb-4" />
                        <p class="text-center font-bold text-md xl:text-lg px-2 xl:px-8">Editor</p>
                    </AboutCard>
                    <AboutCard style="w-1/2 h-40 lg:w-40 lg:h-40">
                        <Icon
                            icon="fluent:people-community-20-filled"
                            font-size="40px"
                            class="mb-4"
                        />
                        <p class="text-center font-bold text-md xl:text-lg px-2 xl:px-8">Comunidade</p>
                    </AboutCard>
                </section>
                <section
                    class="mb-4 lg:mb-0 gap-4 w-full flex items-center lg:flex-col gap-y-1 xl:gap-y-4"
                >
                    <AboutCard style="w-1/2 h-40 lg:w-40 lg:h-40">
                        <Icon icon="rivet-icons:money" font-size="40px" class="mb-4" />
                        <p class="text-center font-bold text-md xl:text-lg px-2 xl:px-8">Cálculo de Orçamento</p>
                    </AboutCard>
                    <AboutCard style="w-1/2 h-40 lg:w-40 lg:h-40">
                        <Icon icon="fa-solid:crutch" font-size="40px" class="mb-4" />
                        <p class="text-center font-bold text-md xl:text-lg px-2 xl:px-8">Detecção de Acessibilidade</p>
                    </AboutCard>
                </section>
            </section>
        </section>
    </main>
</main>

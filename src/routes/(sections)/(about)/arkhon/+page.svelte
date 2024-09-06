<script lang="ts">
    import { lightMode, toggle } from '$lib/stores/theme';
    import { contrastType, contrast } from '$lib/stores/contrast';
    import Icon from '@iconify/svelte';
</script>

<body data-theme={$contrast ? $contrastType : ($lightMode ? "light" : "dark")} class="w-full min-h-screen">
    <section class="w-full min-h-screen px-12">
        <div class="flex justify-between items-center w-full px-12 pt-8">
            <a href="settings"><Icon icon="fe:arrow-left" font-size="40px" /></a>
            <label class="swap swap-rotate">
                <input type="checkbox" class="theme-controller" on:click={toggle} />

                <Icon icon="ph:moon" class="swap-on size-8" />
                <Icon icon="ph:sun" class="swap-off size-8" />
            </label>
        </div>
        <main class="max-w-7xl mx-auto">
            <div class="w-full h-screen pt-16 flex flex-col items-center">
                <h1 class="text-7xl text-secondary font-bold pl-8">Sobre nós</h1>
                <p class="text-4xl font-semibold pl-8">Muito mais do que uma simples plataforma</p>
                <div class="grid grid-cols-2 gap-8 pt-12 mx-12">
                    <div>
                        <h1 class="text-xl font-bold">Nosso propósito</h1>
                        <p class="text-xl font-medium pt-4 text-justify">
                            Bem-vindo ao Arkhon, sua plataforma digital dedicada à criação de
                            plantas de arquitetura com precisão e facilidade. Aqui, cada projeto
                            ganha vida através de ferramentas intuitivas e recursos avançados,
                            permitindo que arquitetos e designers transformem suas ideias em
                            realidade digital.
                        </p>
                    </div>
                    <div>
                        <h1 class="text-xl font-bold">Nosso propósito</h1>
                        <p class="text-xl pt-4 text-justify">
                            No Arkhon, acreditamos na democratização do design arquitetônico. Nossa
                            missão é fornecer uma plataforma acessível e poderosa que capacite
                            profissionais e entusiastas a visualizar e desenvolver projetos
                            arquitetônicos com eficiência e criatividade.
                        </p>
                    </div>
                    <div class="col-span-2">
                        <h1 class="text-xl font-bold pt-8">O que oferecemos?</h1>
                        <p class="text-xl pt-4 text-justify">
                            Com o Arkhon, você pode explorar uma vasta gama de funcionalidades
                            projetadas para simplificar o processo de criação de plantas
                            arquitetônicas. Desde a concepção inicial até a apresentação final,
                            nossas ferramentas avançadas garantem precisão e flexibilidade em cada
                            etapa do projeto.
                        </p>
                    </div>
                </div>
                <div>
                    <h1 class="text-4xl text-secondary font-semibold pt-12 text-center">
                        Por que escolher a Arkhon?
                    </h1>
                    <div class="w-full grid grid-cols-3 place-items-center pt-12 space-x-12">
                        <div
                            class="w-80 h-80 bg-base-300 border-2 border-secondary rounded-2xl flex flex-col justify-center items-center px-6"
                        >
                            <Icon icon="mdi:gear" font-size="80px" />
                            <h1 class="text-2xl text-center font-bold pt-2">Interface Intuitiva</h1>
                            <p class="text-lg text-center">
                                A plataforma Arkhon é fácil de usar, permitindo criar e ajustar
                                plantas arquitetônicas rapidamente.
                            </p>
                        </div>
                        <div
                            class="w-80 h-80 bg-base-300 border-2 border-secondary rounded-2xl flex flex-col justify-center items-center px-6"
                        >
                            <Icon icon="ic:twotone-window" font-size="80px" />
                            <h1 class="text-2xl text-center font-bold pt-2">
                                Biblioteca de Componentes
                            </h1>
                            <p class="text-lg text-center">
                                O Arkhon oferece uma ampla biblioteca de componentes, desde
                                estruturas a decorações, para personalização das plantas.
                            </p>
                        </div>
                        <div
                            class="w-80 h-80 bg-base-300 border-2 border-secondary rounded-2xl flex flex-col justify-center items-center px-6"
                        >
                            <Icon icon="bi:people-fill" font-size="80px" />
                            <h1 class="text-2xl text-center font-bold pt-2">
                                Colaboração e Compartilhamento
                            </h1>
                            <p class="text-lg text-center">
                                A plataforma facilita a colaboração entre usuários, ideal para
                                trabalho em equipe em ambientes profissionais.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div
                class="w-11/12 h-40 mx-auto mt-40 bg-center bg-cover"
                style="background-image: url(/gallery/bg-placeholder.jpg);"
            />
            <div class="py-8">
                <h1 class="text-4xl text-secondary font-semibold text-center">Quem somos?</h1>
                <div class="grid grid-cols-3 place-items-center pt-4">
                    <div class="grid place-items-center pt-8">
                        <img
                            src="/gallery/ana.jpg"
                            alt="
                            ana"
                            class="w-64 h-64 object-cover rounded-xl"
                        />
                        <p class="text-lg text-center pt-4">Ana Buzana</p>
                    </div>
                    <div class="grid place-items-center pt-8">
                        <img src="/gallery/luis.jpg" alt="photo" class="w-64 h-64 rounded-xl" />
                        <p class="text-lg text-center pt-4">André Albanese</p>
                    </div>
                    <div class="grid place-items-center pt-8">
                        <img
                            src="/gallery/victor.png"
                            alt="photo"
                            class="w-64 h-64 object-cover rounded-xl"
                        />
                        <p class="text-lg text-center pt-4">André Victor</p>
                    </div>
                    <div class="grid place-items-center pt-8">
                        <img src="/gallery/carlos.png" alt="photo" class="w-64 h-64 rounded-xl" />
                        <p class="text-lg text-center pt-4">Carlos Daniel</p>
                    </div>
                    <div class="grid place-items-center pt-8">
                        <img
                            src="/gallery/dudu.jpg"
                            alt="photo"
                            class="w-64 h-64 object-cover rounded-xl"
                        />
                        <p class="text-lg text-center pt-4">Eduardo Lima</p>
                    </div>
                    <div class="grid place-items-center pt-8">
                        <img
                            src="/gallery/gustavo.jpg"
                            alt="photo"
                            class="w-64 h-64 object-cover rounded-xl"
                        />
                        <p class="text-lg text-center pt-4">Gustavo Marques</p>
                    </div>
                </div>
            </div>
        </main>
    </section>
</body>

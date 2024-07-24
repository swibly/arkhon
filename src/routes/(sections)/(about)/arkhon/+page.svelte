<script lang="ts">
    import { lightMode, toggle } from '$lib/stores/theme';
    import Icon from '@iconify/svelte';
</script>

<body data-theme={$lightMode ? 'light' : 'dark'} class="w-full min-h-screen">
    <main class="w-full min-h-screen flex justify-end">
        <aside class="w-2/5 h-screen bg-red-500 fixed top-0 left-0">
            <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/LEGO_logo.svg/2048px-LEGO_logo.svg.png"
                alt="bg-image"
                class="w-full h-screen"
            />
        </aside>
        <section class="w-3/5 min-h-screen">
            <div class="flex justify-between items-center w-full px-12 pt-8">
                <a href="settings"><Icon icon="fe:arrow-left" font-size="40px" /></a>
                <label class="swap swap-rotate">
                    <input type="checkbox" class="theme-controller" on:click={toggle} />

                    <Icon icon="ph:moon" class="swap-on size-8" />
                    <Icon icon="ph:sun" class="swap-off size-8" />
                </label>
            </div>
            <div class="w-full h-screen pt-16">
                <h1 class="text-7xl text-secondary font-bold pl-8">Sobre nós</h1>
                <p class="text-4xl font-semibold pl-8">Muito mais do que uma simples plataforma</p>
                <div class="grid grid-cols-2 gap-8 mt-12">
                    <p class="text-xl font-medium pl-8">
                        Bem-vindo ao Arkhon, sua plataforma digital dedicada à criação de plantas de
                        arquitetura com precisão e facilidade. Aqui, cada projeto ganha vida através
                        de ferramentas intuitivas e recursos avançados, permitindo que arquitetos e
                        designers transformem suas ideias em realidade digital.
                    </p>
                    <div class="pr-8">
                        <h1 class="text-xl font-bold">Nosso propósito</h1>
                        <p class="pt-4">
                            No Arkhon, acreditamos na democratização do design arquitetônico. Nossa
                            missão é fornecer uma plataforma acessível e poderosa que capacite
                            profissionais e entusiastas a visualizar e desenvolver projetos
                            arquitetônicos com eficiência e criatividade.
                        </p>

                        <h1 class="text-xl font-bold pt-8">O que oferecemos?</h1>
                        <p class="pt-4">
                            Com o Arkhon, você pode explorar uma vasta gama de funcionalidades
                            projetadas para simplificar o processo de criação de plantas
                            arquitetônicas. Desde a concepção inicial até a apresentação final,
                            nossas ferramentas avançadas garantem precisão e flexibilidade em cada
                            etapa do projeto.
                        </p>
                    </div>
                </div>
                <div>
                    <h1 class="text-4xl text-secondary font-semibold pl-8 pt-8">Por que escolher a Arkhon?</h1>
                </div>
            </div>
            <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/LEGO_logo.svg/2048px-LEGO_logo.svg.png"
                alt="bg-placeholder"
                class="w-11/12 h-40 mx-auto"
            />
            <div class="py-8">
                <h1 class="text-4xl text-secondary font-bold text-center">Quem somos?</h1>
                <div class="grid grid-cols-3 place-items-center pt-4 mx-32">
                    {#each Array(6) as i}
                        <div class="grid place-items-center pt-8">
                            <img
                                src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/LEGO_logo.svg/2048px-LEGO_logo.svg.png"
                                alt="photo"
                                class="w-40 h-40"
                            />
                            <p class="text-lg text-center font-bold">Nome do Integrante</p>
                        </div>
                    {/each}
                </div>
            </div>
        </section>
    </main>
</body>

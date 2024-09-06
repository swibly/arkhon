<script lang="ts">
    import { lightMode, toggle } from '$lib/stores/theme';
    import { contrastType, contrast } from '$lib/stores/contrast';
    import Icon from '@iconify/svelte';
</script>

<body data-theme={$contrast ? $contrastType : ($lightMode ? "light" : "dark")} class="w-full min-h-screen">
    <main class="w-full min-h-screen flex justify-end pb-12">
        <aside class="bg-base-300 w-5/12 xl:w-1/2 h-screen hidden md:flex md:fixed top-0 left-0">
            <div
                class="w-full h-screen flex justify-center items-center icons"
            >
                <Icon icon="line-md:phone-twotone" />
                <Icon icon="line-md:email-opened-twotone-alt" />
                <Icon icon="line-md:chat-twotone" />
            </div>
        </aside>
        <div class="w-full md:w-7/12 xl:w-1/2 h-screen mb-12">
            <div class="flex justify-between items-center w-full px-12 pt-4">
                <a href="settings"><Icon icon="fe:arrow-left" font-size="40px" /></a>
                <label class="swap swap-rotate">
                    <input type="checkbox" class="theme-controller" on:click={toggle} />

                    <Icon icon="ph:moon" class="swap-on size-8" />
                    <Icon icon="ph:sun" class="swap-off size-8" />
                </label>
            </div>
            <div
                class="w-full h-screen flex flex-col items-center justify-center px-6 md:px-20 pb-12 pt-12"
            >
                <h1 class="text-4xl lg:text-5xl text-center font-bold">
                    Divida conosco os seus problemas
                </h1>
                <p class="pt-4 text-center font-semibold text-secondary">
                    Por acaso está tendo dificuldade com alguma coisa ou deseja mandar uma opinião
                    construtiva? Sinta-se livre para entrar em contato com a gente!
                </p>
                <div class="pt-8 w-full grid place-items-center">
                    <label
                        class="input input-bordered flex items-center gap-2 bg-neutral w-full text-base"
                    >
                        <input type="text" class={`grow ${$contrast ? 'text-black' : 'text-white'}`} placeholder="Email *" />
                    </label>
                    <textarea
                        class="textarea textarea-bordered bg-neutral w-full text-base mt-4 h-40 {`${$contrast ? 'text-black' : 'text-white'}`}"
                        placeholder="Com o que podemos ajudar ?"
                    />
                    <btn class="btn btn-secondary w-full mt-4">Enviar</btn>
                </div>
            </div>
        </div>
    </main>
</body>

<style>
    @media (min-width: 1280px) {
        .icons {
            font-size: 200px;
        }
    }

    @media (max-width: 1280px) {
        .icons {
            font-size: 100px;
        }
    }
</style>

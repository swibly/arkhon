<script lang="ts">
    import Icon from '@iconify/svelte';
    import { lightMode, toggle } from '$lib/stores/theme';
</script>

<main>
    <Icon icon="gg:profile" class="ml-auto mt-12 mr-4" font-size="30px" />
    <header class="flex justify-center gap-4 h-16">
        <a
            href="/"
            class="text-sm sm:text-base transition duration-150 ease-in-out hover:text-base sm:hover:text-lg hover:scale-110 hover:border-b-4 border-primary mt-8"
        >
            Projeto
        </a>
        <a
            href="/"
            class="text-sm sm:text-base transition duration-150 ease-in-out hover:text-base sm:hover:text-lg hover:scale-110 hover:border-b-4 border-primary mt-8"
        >
            Comunidade
        </a>
        <a
            href="/"
            class="text-sm sm:text-base transition duration-150 ease-in-out hover:text-base sm:hover:text-lg hover:scale-110 hover:border-b-4 border-primary mt-8"
        >
            Loja
        </a>
    </header>

    <h1 class="text-2xl sm:text-4xl text-secondary text-center font-bold my-12">Meus projetos</h1>
    <div class="px-8">
        <label class="input max-sm:input-sm bg-neutral flex items-center mx-auto max-w-[800px]">
            <input type="text" class="grow" placeholder="Pesquisar" />
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                class="w-4 h-4 opacity-70"
                ><path
                    fill-rule="evenodd"
                    d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                    clip-rule="evenodd"
                /></svg
            >
        </label>
    </div>
</main>

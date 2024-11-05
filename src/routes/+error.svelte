<script lang="ts">
    import Icon from '@iconify/svelte';
    import { page } from '$app/stores';

    const { status } = $page;
</script>

<svelte:head>
    <title>Erro - Swibly Arkhon</title>
</svelte:head>

<main class="w-full min-h-screen flex flex-col justify-center items-center max-w-xl mx-auto">
    <section class="flex items-center gap-4">
        <Icon icon="mingcute:sad-line" class="size-28 text-error max-md:size-28" />

        <div>
            <p class="text-sm" aria-hidden>Ah, não!</p>
            <h1 class="text-3xl font-black text-error max-md:text-2xl">Tivemos um problema</h1>
        </div>
    </section>

    <div class="divider" />

    <p class="text-center">
        <span>
            {#if status === 404}
                Não encontramos o que você estava procurando.
            {:else if status === 500}
                Parece que nossos servidores estão com defeito.
            {:else}
                Não sabemos o que aconteceu. Por isso, pedimos perdão pela inconveniência.
            {/if}

            Esse erro foi relatado para nossa equipe e estamos corrigindo ele agora mesmo!
        </span>

        <br />
        <!-- Kinda hacky, but we add this to separate text in mobile -->
        <br class="sm:hidden" />

        <button role="link" class="link link-primary font-semibold" on:click={() => history.back()}>
            Volte para página anterior
        </button>
    </p>

    <a href="/home" class="btn btn-primary mt-8 max-sm:btn-sm sm:btn-wide">
        <Icon icon="ic:baseline-home" />
        Página Principal
    </a>
</main>

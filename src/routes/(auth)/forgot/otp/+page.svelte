<script lang="ts">
    import Icon from '@iconify/svelte';
</script>

<div class="flex justify-center m-12">
    <img src="/gallery/logo2.png" class="h-40 w-40" alt="Logo" />
</div>

<h1 class="text-center text-4xl sm:text-5xl px-4 font-bold text-white">
    Insira o código enviado para seu email
</h1>

<h2 class="text-xl text-center sm:text-2xl mt-4 px-4 text-accent">
    Enviamos um código de 6 digitos para a sua caixa de entrada
</h2>

<section class="mx-12 mt-8">
    <form>
        <section class="flex justify-center gap-4 mx-4 *:sm:size-12">
            <input type="number" class="n1 w-8 h-8 text-center rounded-xl" />
            <input type="number" class="n2 w-8 h-8 text-center rounded-xl" />
            <input type="number" class="n3 w-8 h-8 text-center rounded-xl" />
            <input type="number" class="n4 w-8 h-8 text-center rounded-xl" />
            <input type="number" class="n5 w-8 h-8 text-center rounded-xl" />
            <input type="number" class="n6 w-8 h-8 text-center rounded-xl" />
        </section>

        <button class="text-white mt-4 pb-4 mx-auto w-fit block">
            <a href="/">
                <Icon icon="emojione-monotone:right-arrow" font-size="60px" />
            </a>
        </button>
    </form>

    <p class="text-center text-white">
        <a href="/login" class="text-accent">Voltar para a página de login</a>
    </p>
</section>

<style>
    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }
</style>

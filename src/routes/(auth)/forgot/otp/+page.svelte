<script lang="ts">
    import Icon from '@iconify/svelte';
    import { onMount } from 'svelte';

    const amountDigits = 6;
    const arrayInputs = new Array<HTMLInputElement | null>(amountDigits);

    onMount(function () {
        for (const input of arrayInputs) {
            input!.addEventListener('input', function (e: Event) {
                const event = e as KeyboardEvent;
                const target = event.target as HTMLInputElement;

                if (/^[0-9]*$/g.test(target.value) === false) {
                    target.value = '';
                }

                if (target.value === '')
                    (input!.previousElementSibling as HTMLInputElement).focus();
                if (target.value !== '') (input!.nextElementSibling as HTMLInputElement).focus();
            });
        }
    });
</script>

<div class="flex justify-center m-12">
    <img src="/gallery/logo2.png" class="h-40 w-40" alt="Logo" />
</div>

<h1 class="text-center text-4xl sm:text-5xl px-4 font-bold text-white">
    Insira o código enviado para seu email
</h1>

<h2 class="text-xl text-center sm:text-2xl mt-4 px-4 text-secondary">
    Enviamos um código de 6 digitos para a sua caixa de entrada
</h2>

<section class="mx-12 mt-8">
    <form>
        <section class="flex justify-center gap-4 mx-4 *:sm:size-12">
            {#each arrayInputs as input}
                <input
                    type="text"
                    class="w-8 h-8 text-center rounded-xl text-black font-bold"
                    bind:this={input}
                    maxlength="1"
                />
            {/each}
        </section>

        <button class="text-white mt-4 pb-4 mx-auto w-fit block">
            <a href="/forgot/otp/change">
                <Icon icon="emojione-monotone:right-arrow" font-size="60px" />
            </a>
        </button>
    </form>

    <p class="text-center text-white">
        <a href="/login" class="text-secondary">Voltar para a página de login</a>
    </p>
</section>

<style>
    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }
</style>

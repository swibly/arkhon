<script lang="ts">
    import Icon from '@iconify/svelte';
</script>

<div class="flex justify-center m-12">
    <img src="/gallery/logo2.png" class="h-40 w-40" alt="Logo" />
</div>

<h1 class="text-center text-4xl sm:text-5xl px-4 font-bold text-white">Insira seu email abaixo</h1>

<h2 class="text-xl text-center sm:text-2xl mt-4 px-4 text-secondary">
    Enviaremos um email de recuperação de senha caso o endereço exista
</h2>

<section class="mx-12 mt-8">
    <form>
        <label class="input input-bordered flex items-center gap-2 mt-4 mb-8 bg-neutral">
            <Icon icon="ic:baseline-email" />
            <input type="email" class="email w-full" id="email" name="email" placeholder="Email" />
        </label>

        <button class="text-white mt-4 pb-4 mx-auto w-fit block">
            <a href="/forgot/otp">
                <Icon icon="emojione-monotone:right-arrow" font-size="60px" />
            </a>
        </button>
    </form>

    <p class="text-center text-white">
        <a href="/login" class="text-secondary">Voltar para a página de login</a>
    </p>
</section>

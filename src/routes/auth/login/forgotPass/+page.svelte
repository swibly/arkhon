<script lang="ts">
    import Icon from '@iconify/svelte';

    let showPassword: boolean = false;
    let showPasswordConfirm: boolean = false;

    let showBubble: boolean = false;

    const fetchImage = (async () => {
        const response = await fetch('https://restcountries.com/v3.1/all');
        return await response.json();
    })();
</script>

<main class="bg-primary w-full min-h-screen max-w-[800px] mx-auto bleed">
    <div class="flex justify-center m-12">
        <img src="/gallery/logo2.png" class="h-40 w-40" alt="Logo" />
    </div>
    <h1 class="text-center text-4xl sm:text-5xl px-4 font-bold text-white">
        Insira seu email abaixo
    </h1>
    <h2 class="text-xl text-center sm:text-2xl mt-4 px-4 text-accent">
        Enviaremos um email de recuperação de senha caso o endereço exista
    </h2>
    <section class="mx-12 mt-8">
        <form>
            <label class="input input-bordered flex items-center gap-2 mt-4 mb-8">
                <Icon icon="ic:baseline-email" />
                <input
                    type="email"
                    class="email w-full"
                    id="email"
                    name="email"
                    placeholder="Email"
                />
            </label>
            <button class="text-white mt-4 pb-4 mx-auto w-fit block"
                ><Icon icon="emojione-monotone:right-arrow" font-size="60px" /></button
            >
        </form>
        <h2 class="text-center text-white">
            <a href="/auth/login/" class="text-accent">Voltar para a página de login</a>
       </h2>
    </section>
</main>

<style>
    .bleed {
        clip-path: inset(0, -100vmax);
        box-shadow: 0 0 0 100vmax #0175af;
    }
</style>

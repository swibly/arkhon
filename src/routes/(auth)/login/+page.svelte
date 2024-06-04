<script lang="ts">
    import Icon from '@iconify/svelte';

    let showPassword: boolean = false;
</script>

<div class="flex justify-center m-12">
    <img src="/gallery/logo2.png" class="h-40 w-40" alt="Logo" />
</div>

<h1 class="text-center text-4xl sm:text-5xl px-4 font-bold text-white">
    Para iniciar seus projetos e dominar a arquitetura
</h1>

<h2 class="text-xl text-center sm:text-2xl mt-4 px-4 text-secondary">
    Inicie sua sessão na Arkhon.
</h2>

<section class="mx-12 mt-8">
    <form>
        <label class="input input-bordered flex items-center gap-2 mt-4 mb-8 bg-neutral">
            <Icon icon="ic:baseline-email" />
            <input type="email" class="w-full" id="email" name="email" placeholder="Email" />
        </label>

        <label class="input input-bordered flex items-center gap-2 mb-8 bg-neutral">
            <Icon icon="material-symbols:lock" />
            <input
                type={showPassword ? 'text' : 'password'}
                class="w-full"
                id="password"
                name="password"
                placeholder="Senha"
            />
            <button on:click={() => (showPassword = !showPassword)} class="ml-auto">
                {#if showPassword}
                    <Icon icon="mdi:eye" />
                {:else}
                    <Icon icon="ph:eye-closed" />
                {/if}
            </button>
        </label>
        <button class="text-white mt-8 pb-4 mx-auto w-fit block">
            <a href="/home/"><Icon icon="emojione-monotone:right-arrow" font-size="60px" /></a>
        </button>
    </form>

    <p class="text-center text-white">
        <a href="/forgot" class="text-secondary">Esqueci a senha</a>
    </p>

    <p class="text-center text-white">
        Não possui uma conta? <a href="/register/" class="text-secondary">Clique aqui!</a>
    </p>
</section>

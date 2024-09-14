<script lang="ts">
    import Icon from '@iconify/svelte';

    let showPassword: boolean = false;
    let showPasswordConfirm: boolean = false;
</script>

<div class="flex justify-center m-12">
    <img src="/gallery/logo2.png" class="h-40 w-40" alt="Logo" />
</div>

<h1 class="text-center text-4xl sm:text-5xl px-4 font-bold text-white">Troque a sua senha</h1>

<h2 class="text-xl text-center sm:text-2xl mt-4 px-4 text-secondary">
    Escolha uma senha forte e inesquecível
</h2>

<section class="mx-12 mt-8">
    <form>
        <label class="input input-bordered flex items-center gap-2 mb-8 bg-neutral">
            <Icon icon="material-symbols:lock" />
            <input
                type={showPassword ? 'text' : 'password'}
                class="password w-full"
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

        <label class="input input-bordered flex items-center gap-2 bg-neutral">
            <Icon icon="material-symbols:lock" />
            <input
                type={showPasswordConfirm ? 'text' : 'password'}
                class="confirm_pass w-full"
                id="confirm_pass"
                name="confirm_pass"
                placeholder="Confirmar Senha"
            />
            <button on:click={() => (showPasswordConfirm = !showPasswordConfirm)} class="ml-auto">
                {#if showPasswordConfirm}
                    <Icon icon="mdi:eye" />
                {:else}
                    <Icon icon="ph:eye-closed" />
                {/if}
            </button>
        </label>

        <button class="text-white mt-4 pb-4 mx-auto w-fit block">
            <a href="/login"><Icon icon="emojione-monotone:right-arrow" font-size="60px" /></a>
        </button>
    </form>

    <p class="text-center text-white">
        <a href="/login" class="text-secondary">Voltar para a página de login</a>
    </p>
</section>

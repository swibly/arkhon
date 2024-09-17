<script>
    import { page } from '$app/stores';
    import Logo from '$lib/components/Logo.svelte';
    import Icon from '@iconify/svelte';
</script>

<main class="grid w-full min-h-screen p-4 place-items-center">
    <div class="w-full max-w-2xl">
        <Logo class="mx-auto mix-blend-difference fill-white" />

        <p class="w-full my-8 text-3xl font-light text-center text-primary">
            {#if $page.url.pathname.startsWith('/login')}
                Bem-vindo de volta!
            {:else if $page.url.pathname.startsWith('/register')}
                Comece sua jornada conosco!
            {/if}
        </p>

        <slot />

        <section class="mt-8 text-center">
            {#if $page.url.pathname.startsWith('/login')}
                <a href="/forgot" class="text-primary">
                    <Icon icon="mdi:lock-reset" class="inline" />
                    Esqueci a senha
                </a>

                <p>
                    Ainda não possui uma conta?
                    <a href="/register" class="text-primary">Registre-se</a>!
                </p>
            {:else if $page.url.pathname.startsWith('/register')}
                <p>
                    Já possui uma conta?
                    <a href="/login" class="text-primary">Faça login</a>!
                </p>
            {/if}
        </section>
    </div>
</main>

<style lang="postcss">
    :global(input:is([type='text'], [type='password'])) {
        @apply grow;
    }
</style>

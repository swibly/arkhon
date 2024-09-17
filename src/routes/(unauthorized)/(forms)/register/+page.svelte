<script lang="ts">
    import Icon from '@iconify/svelte';

    let showPassword: boolean = false;
    let showConfirmPassword: boolean = false;
</script>

<form class="flex flex-col gap-2">
    <section class="flex gap-2 max-md:flex-col">
        <label class="flex items-center gap-2 input input-bordered grow">
            <Icon icon="ph:user-fill" />
            <input type="text" name="firstname" class="grow" placeholder="Nome" />
        </label>

        <label class="flex items-center gap-2 input input-bordered grow">
            <Icon icon="ph:user-fill" />
            <input type="text" name="lastname" class="grow" placeholder="Sobrenome" />
        </label>
    </section>

    <div class="divider" />

    <label class="flex items-center gap-2 input input-bordered">
        <Icon icon="material-symbols:mail" />
        <input type="text" name="email" class="grow" placeholder="Email" />
    </label>

    <label class="flex items-center gap-2 input input-bordered">
        <Icon icon="lets-icons:e-mail" />
        <input type="text" name="username" class="grow" placeholder="Nome de usuário" />
    </label>

    <div class="divider" />

    <label class="flex items-center gap-2 input input-bordered">
        <Icon icon="ph:lock-fill" />

        <input
            type={showPassword ? 'text' : 'password'}
            name="password"
            class="grow"
            placeholder="Senha"
        />

        <button type="button" on:click={() => (showPassword = !showPassword)}>
            {#if showPassword}
                <Icon icon="mdi:eye-off" />
            {:else}
                <Icon icon="mdi:eye" />
            {/if}
        </button>
    </label>

    <label class="flex items-center gap-2 input input-bordered">
        <Icon icon="ph:lock-fill" />

        <input
            type={showConfirmPassword ? 'text' : 'password'}
            name="password-confirm"
            class="grow"
            placeholder="Confirme sua senha"
        />

        <button type="button" on:click={() => (showConfirmPassword = !showConfirmPassword)}>
            {#if showConfirmPassword}
                <Icon icon="mdi:eye-off" />
            {:else}
                <Icon icon="mdi:eye" />
            {/if}
        </button>
    </label>

    <button type="submit" class="mt-4 btn btn-sm btn-primary">
        <Icon icon="ph:arrow-right" />
        Registrar*
    </button>

    <p class="text-sm italic text-center">
        *Ao registrar, concorda com os
        <a href="/tos" class="link link-primary">Termos de Serviço</a>
    </p>
</form>

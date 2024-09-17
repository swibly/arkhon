<script lang="ts">
    import Icon from '@iconify/svelte';

    let showPassword: boolean = false;
</script>

<form class="flex flex-col gap-2">
    <label class="flex items-center gap-2 input input-bordered">
        <Icon icon="ph:user-fill" />
        <input type="text" class="grow" placeholder="Email ou nome de usuário" />
    </label>

    <label class="flex items-center gap-2 input input-bordered">
        <Icon icon="ph:lock-fill" />

        <input type={showPassword ? 'text' : 'password'} class="grow" placeholder="Senha" />

        <button type="button" on:click={() => (showPassword = !showPassword)}>
            {#if showPassword}
                <Icon icon="mdi:eye-off" />
            {:else}
                <Icon icon="mdi:eye" />
            {/if}
        </button>
    </label>

    <button type="submit" class="mt-4 btn btn-sm btn-primary">
        <Icon icon="ph:arrow-right" />
        Entrar
    </button>
</form>

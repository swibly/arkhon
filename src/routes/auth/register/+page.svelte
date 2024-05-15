<script lang="ts">
    import Icon from '@iconify/svelte';
</script>

<main class="bg-primary w-full h-screen">
    <h1 class="text-center text-5xl font-bold text-white pt-12">Crie sua conta na Arkhon</h1>
    <h2 class="text-2xl text-center mt-4 text-accent">
        Registrar-se garante acesso as ferramentas da Arkhon
    </h2>
    <form>
        <label class="input input-bordered flex items-center gap-2">
            <Icon icon="material-symbols:person" />
            <input
                type="text"
                class="firstname"
                id="firstname"
                name="firstname"
                placeholder="Nome"
            />
        </label>

        <label class="input input-bordered flex items-center gap-2">
            <Icon icon="material-symbols:person" />
            <input
                type="text"
                class="lastname"
                id="lastname"
                name="lastname"
                placeholder="Sobrenome"
            />
        </label>

        <label class="input input-bordered flex items-center gap-2">
            <Icon icon="ic:baseline-place" />
            <input type="text" class="country" id="country" name="country" placeholder="País" />
        </label>

        <label class="input input-bordered flex items-center gap-2">
            <Icon icon="ic:baseline-email" />
            <input type="email" class="email" id="email" name="email" placeholder="Email" />
        </label>

        <label class="input input-bordered flex items-center gap-2">
            <Icon icon="material-symbols:lock" />
            <input type="password" class="password" id="password" name="password" placeholder="Senha" />
        </label>

        <label class="input input-bordered flex items-center gap-2">
            <Icon icon="material-symbols:lock" />
            <input type="password" class="confirm_pass" id="confirm_pass" name="confirm_pass" placeholder="Confirmar Senha" />
        </label>
    </form>
</main>

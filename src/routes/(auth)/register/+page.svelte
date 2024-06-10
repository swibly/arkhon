<script lang="ts">
    import Icon from '@iconify/svelte';

    let showPassword: boolean = false;
    let showPasswordConfirm: boolean = false;

    const fetchImage = (async () => {
        const response = await fetch('https://restcountries.com/v3.1/all');
        return await response.json();
    })();
</script>

<h1 class="text-center text-4xl sm:text-5xl px-4 font-bold text-white m-12">
    Crie sua conta na Arkhon
</h1>

<h2 class="text-xl text-center sm:text-2xl mt-4 px-4 text-secondary">
    Registrar-se garante acesso as ferramentas da Arkhon
</h2>

<section class="mx-12 mt-8">
    <form>
        <div class="lg:flex justify-center gap-2">
            <label class="input input-bordered flex items-center gap-2 mb-8 lg:flex-1 bg-neutral">
                <Icon icon="material-symbols:person" />
                <input
                    type="text"
                    class="firstname w-full"
                    id="firstname"
                    name="firstname"
                    placeholder="Nome"
                />
            </label>

            <label class="input input-bordered flex items-center gap-2 mb-8 lg:flex-1 bg-neutral">
                <Icon icon="material-symbols:person" />
                <input
                    type="text"
                    class="lastname w-full"
                    id="lastname"
                    name="lastname"
                    placeholder="Sobrenome"
                />
            </label>
        </div>

        <label class="input input-bordered flex items-center gap-2 mb-8 bg-neutral">
            <Icon icon="ic:baseline-place" />
            <select class="bg-transparent w-full">
                {#await fetchImage}
                    <p>...waiting</p>
                {:then data}
                    {#each data.sort( (a, b) => a.name.common.localeCompare(b.name.common) ) as country (country.name.common)}
                        <option
                            selected={country.name.common === 'Brazil'}
                            value={country.name.common}
                            class="bg-neutral">{country.flag} {country.name.common}</option
                        >
                    {/each}
                {:catch error}
                    <p>An error occurred!</p>
                {/await}
            </select>
        </label>

        <article class="divider before:bg-white after:bg-white" />

        <label class="input input-bordered flex items-center gap-2 mt-4 mb-8 bg-neutral">
            <Icon icon="ic:baseline-email" />
            <input type="email" class="email w-full" id="email" name="email" placeholder="Email" />
        </label>

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

        <label class="text-white flex mt-8 gap-2 align-items">
            <input type="checkbox" checked class="checkbox bg-white" /> Concordo com os Termos de Uso
        </label>

        <label class="text-white flex mt-4 gap-2 align-items">
            <input type="checkbox" checked class="checkbox bg-white" /> Desejo receber notícias sobre
            arquitetura em meu email
        </label>

        <button class="text-white mt-8 pb-4 mx-auto w-fit block">
            <a href="/home/"><Icon icon="emojione-monotone:right-arrow" font-size="60px" /></a>
        </button>
    </form>

    <h2 class="text-center text-white mb-4">
        Já possui uma conta? <a href="/login/" class="text-secondary">Clique aqui!</a>
    </h2>
</section>

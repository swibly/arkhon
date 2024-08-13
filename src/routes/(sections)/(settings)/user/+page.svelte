<script lang="ts">
    import { lightMode, toggle } from '$lib/stores/theme';
    import { privacy, enablePrivacy, disablePrivacy } from '$lib/stores/privacy';
    import Icon from '@iconify/svelte';
</script>

<body data-theme={$lightMode ? 'light' : 'dark'} class="w-full min-h-screen">
    <header class="w-full h-24 flex justify-start sm:justify-between items-center pl-8 sm:px-20">
        <a href="settings"><Icon icon="fe:arrow-left" font-size="40px" /></a>
        <label class="swap swap-rotate float-right pr-8">
            <input type="checkbox" class="theme-controller" on:click={toggle} />
            <Icon icon="ph:moon" class="swap-on size-8" />
            <Icon icon="ph:sun" class="swap-off size-8" />
        </label>
    </header>
    <main class="w-full min-h-screen flex items-center flex-col pt-12 pb-8">
        <h1 class="text-3xl md:text-5xl text-center font-bold text-secondary">
            Configurações do Usuário
        </h1>
        <p class="text-lg md:text-2xl font-semibold pt-12">Informações Gerais</p>
        <section class="flex justify-around items-center w-full h-full pt-12 px-24">
            <div class="w-1/2 h-full flex flex-col justify-center items-center icon -mt-24">
                <Icon icon="healthicons:ui-user-profile" />
                <input
                    type="file"
                    class="file-input file-input-bordered file-input-secondary w-full max-w-xs"
                />
            </div>
            <div class="w-1/2 flex flex-col justify-center items-center">
                <form method="POST" class="w-full grid place-items-center">
                    <label class="form-control w-full grid place-items-center">
                        <div class="label w-4/5">
                            <span class="label-text w-full">Nome de usuário</span>
                        </div>
                        <input
                            class="input input-bordered input-secondary w-4/5"
                            type="text"
                            value="Nome de Usuário"
                        />
                    </label>
                    <label class="form-control w-full grid place-items-center pt-12">
                        <div class="label w-4/5">
                            <span class="label-text w-full">Primeiro nome</span>
                        </div>
                        <input
                            class="input input-bordered input-secondary w-4/5"
                            type="text"
                            value="Primeiro Nome"
                        />
                    </label>
                    <label class="form-control w-full grid place-items-center pt-12">
                        <div class="label w-4/5">
                            <span class="label-text w-full">Sobrenome</span>
                        </div>
                        <input
                            class="input input-bordered input-secondary w-4/5"
                            type="text"
                            value="Sobrenome"
                        />
                    </label>
                    <label class="form-control w-full grid place-items-center pt-12">
                        <div class="label w-4/5">
                            <span class="label-text w-full">Descrição</span>
                        </div>
                        <textarea
                            class="textarea textarea-secondary w-4/5 text-base font-medium"
                            value="Descrição"
                            rows="5"
                        />
                    </label>
                    <button class="btn btn-secondary w-4/5 mt-8">Atualizar Informações</button>
                </form>
            </div>
        </section>

        <div class="divider divider-neutral w-3/4 mx-auto" />

        <p class="text-lg md:text-2xl font-semibold pt-4">Privacidade</p>
        <div class="grid grid-cols-2 place-items-center w-full pt-12">
            <p class="text-md md:text-xl font-bold">Perfil Público</p>
            <select class="select select-bordered w-32 md:w-40 lg:w-full max-w-xs">
                <option disabled selected>{$privacy ? 'Habilitado' : 'Desabilitado'}</option>
                <option selected={$privacy === true} on:click={enablePrivacy}
                    >Habilitado</option
                >
                <option selected={$privacy === false} on:click={disablePrivacy}
                    >Desabilitado</option
                >
            </select>
        </div>

        <div class="divider divider-neutral w-3/4 mx-auto" />

        <p class="text-lg md:text-2xl font-semibold pt-4">Informações Pessoais</p>

        <div class="grid grid-cols-2 place-items-center w-full pt-12">
            <p class="text-md md:text-xl font-bold">Email</p>
            <a href="" class="w-full flex justify-center"><button class="btn btn-secondary w-1/2 lg:w-1/6">Mudar email</button></a>
        </div>

        <div class="grid grid-cols-2 place-items-center w-full pt-12">
            <p class="text-md md:text-xl font-bold">Senha</p>
            <a href="" class="w-full flex justify-center"><button class="btn btn-secondary w-1/2 lg:w-1/6">Mudar senha</button></a>
        </div>

        <div class="divider divider-neutral w-3/4 mx-auto" />

        <p class="text-lg md:text-2xl font-semibold pt-4 text-error">Deletar Conta</p>

        <div class="grid grid-cols-2 place-items-center w-full pt-12">
            <p class="text-md md:text-xl font-bold">Deletar Conta</p>
            <a href="" class="w-full flex justify-center"><button class="btn btn-error w-1/2 lg:w-1/6">Deletar</button></a>
        </div>
    </main>
</body>

<style>
    @media (max-width: 1280px) {
        .icon {
            font-size: 250px;
        }
    }

    @media (max-width: 640px) {
        .icon {
            font-size: 150px;
        }
    }

    @media (min-width: 1280px) {
        .icon {
            font-size: 500px;
        }
    }
</style>

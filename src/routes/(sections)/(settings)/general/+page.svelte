<script lang="ts">
    import { lightMode, convertDark, convertLight } from '$lib/stores/theme';
    import { language, changeLanguage } from '$lib/stores/language';
    import { notification, enableNotification, disableNotification } from '$lib/stores/notifications';
    import Icon from '@iconify/svelte';
</script>

<body data-theme={$lightMode ? 'light' : 'dark'} class="w-full min-h-screen">
    <header class="w-full h-24 flex justify-start sm:justify-between items-center pl-8 sm:px-20">
        <a href="settings"><Icon icon="fe:arrow-left" font-size="40px" /></a>
    </header>
    <section class="w-full min-h-screen flex items-center flex-col pt-12 pb-4">
        <h1 class="text-3xl md:text-5xl text-center font-bold text-secondary">Configurações Gerais</h1>
        <p class="text-lg md:text-2xl font-semibold pt-12">Preferências do Sistema</p>
        <div class="grid grid-cols-2 place-items-center w-full pt-12">
            <p class="text-md md:text-xl font-bold">Tema</p>
            <select class="select select-bordered w-32 md:w-40 lg:w-full max-w-xs">
                <option disabled selected>{$lightMode ? 'Claro' : 'Escuro'}</option>
                <option on:click={convertLight}>Claro</option>
                <option on:click={convertDark}>Escuro</option>
            </select>
        </div>

        <div class="grid grid-cols-2 place-items-center w-full pt-12">
            <p class="text-md md:text-xl font-bold">Idioma</p>
            <select class="select select-bordered w-32 md:w-40 lg:w-full max-w-xs">
                <option disabled selected
                    >{#if $language === 'pt'}Português{:else if $language === 'en'}English{:else}Pусский{/if}</option
                >
                <option selected={$language === 'pt'} on:click={() => changeLanguage('pt')}
                    >Português</option
                >
                <option selected={$language === 'en'} on:click={() => changeLanguage('en')}
                    >English</option
                >
                <option selected={$language === 'ru'} on:click={() => changeLanguage('ru')}
                    >Pусский</option
                >
            </select>
        </div>

        <div class="divider divider-neutral w-3/4 mx-auto" />

        <p class="text-lg md:text-2xl font-semibold pt-4">Notificações</p>
        <div class="grid grid-cols-2 place-items-center w-full pt-12">
            <p class="text-md md:text-xl font-bold">Permitir Notificações</p>
            <select class="select select-bordered w-32 md:w-40 lg:w-full max-w-xs">
                <option disabled selected>{$notification ? 'Habilitado' : 'Desabilitado'}</option>
                <option selected={$notification === true} on:click={enableNotification}
                    >Habilitado</option
                >
                <option selected={$notification === false} on:click={disableNotification}
                    >Desabilitado</option
                >
            </select>
        </div>

        <div class="divider divider-neutral w-3/4 mx-auto" />

        <p class="text-lg md:text-2xl font-semibold pt-4">Mais configurações</p>
        <div class="grid grid-cols-2 place-items-center w-full pt-12">
            <p class="text-md md:text-xl font-bold">Termos de Serviço</p>
            <button class="btn btn-secondary w-1/2 lg:w-1/6">Acessar</button>
        </div>
        <div class="grid grid-cols-2 place-items-center w-full pt-12">
            <p class="text-md md:text-xl font-bold">Obter Ajuda</p>
            <a href="faq" class="w-full flex justify-center"><button class="btn btn-secondary w-1/2 lg:w-1/6">Acessar</button></a>
        </div>
    </section>
</body>

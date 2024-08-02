<script lang="ts">
    import { lightMode, convertDark, convertLight } from '$lib/stores/theme';
    import { language, changeLanguage } from '$lib/stores/language';
    import { notification, changeNotification } from '$lib/stores/notifications';
    import Icon from '@iconify/svelte';
</script>

<body data-theme={$lightMode ? 'light' : 'dark'} class="w-full min-h-screen">
    <header class="w-full h-24 flex justify-between items-center px-20">
        <a href="settings"><Icon icon="fe:arrow-left" font-size="40px" /></a>
    </header>
    <section class="w-full min-h-screen flex items-center flex-col pt-12">
        <h1 class="text-5xl text-center font-bold text-secondary">Configurações Gerais</h1>
        <p class="text-2xl font-semibold pt-12">Preferências do Sistema</p>
        <div class="flex justify-around items-center w-full h-20">
            <p class="text-xl font-bold">Tema</p>
            <select class="select select-bordered w-full max-w-xs">                
                <option on:click={convertLight}>Claro</option>
                <option on:click={convertDark}>Escuro</option>
            </select>            
        </div>       

        <div class="divider divider-neutral w-3/4 mx-auto"></div>

        <div class="flex justify-around items-center w-full h-20">
            <p class="text-xl font-bold">Idioma</p>
            <select class="select select-bordered w-full max-w-xs">
                <option selected={$language === 'pt'} on:click={() => changeLanguage('pt')}>Português</option>
                <option selected={$language === 'en'} on:click={() => changeLanguage('en')}>English</option>
                <option selected={$language === 'ru'} on:click={() => changeLanguage('ru')}>Pусский</option>
            </select>
        </div>

        <div class="divider divider-neutral w-3/4 mx-auto"></div>

        <p class="text-2xl font-semibold pt-12">Notificações</p>
        <div class="flex justify-around items-center w-full h-20">
            <p class="text-xl font-bold">Permitir Notificações</p>
            <select class="select select-bordered w-full max-w-xs">
                <option on:click={() => changeNotification(true)}>{$notification }</option>
                <option on:click={() => changeNotification(false)}>{$notification ? "Habilitar" : "Desabilitar"}</option>                
            </select>
        </div>
    </section>
</body>
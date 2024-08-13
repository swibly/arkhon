<script lang="ts">
    import { lightMode, toggle } from '$lib/stores/theme';
    import { contrastType, changeContrast, contrast, enableContrast, disableContrast } from '$lib/stores/contrast';
    import { shortcut, enableShortcut, disableShortcut } from '$lib/stores/shortcuts';
    import { resizeText, changeSize } from '$lib/stores/resizeText';
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
    <section class="w-full min-h-screen flex items-center flex-col pt-12 pb-4">
        <h1 class="text-3xl md:text-5xl text-center font-bold text-secondary">
            Configurações de Acessibilidade
        </h1>

        <p class="text-lg md:text-2xl font-semibold pt-12">Contraste</p>
        <div class="grid grid-cols-2 place-items-center w-full pt-12">
            <p class="text-md md:text-xl font-bold">Ativar Contraste</p>
            <select class="select select-bordered w-32 md:w-40 lg:w-full max-w-xs">
                <option disabled selected>{$contrast ? 'Habilitado' : 'Desabilitado'}</option>
                <option selected={$contrast === true} on:click={enableContrast}>Habilitado</option>
                <option selected={$contrast === false} on:click={disableContrast}>Desabilitado</option>
            </select>
        </div>

        {#if $contrast}
            <div class="grid grid-cols-2 place-items-center w-full pt-12">
                <p class="text-md md:text-xl font-bold">Tipo de Contraste</p>
                <select class="select select-bordered w-32 md:w-40 lg:w-full max-w-xs">
                    <option disabled selected
                        >{#if $contrastType === 'Tipo 1'}Tipo 1{:else if $contrastType === 'Tipo 2'}Tipo 2{:else}Tipo 3{/if}</option
                    >
                    <option selected={$contrastType === 'Tipo 1'} on:click={() => changeContrast('Tipo 1')}
                        >Tipo 1</option
                    >
                    <option selected={$contrastType === 'Tipo 2'} on:click={() => changeContrast('Tipo 2')}
                        >Tipo 2</option
                    >
                    <option selected={$contrastType === 'Tipo 3'} on:click={() => changeContrast('Tipo 3')}
                        >Tipo 3</option
                    >
                </select>
            </div>
        {/if}

        <div class="divider divider-neutral w-3/4 mx-auto" />

        <p class="text-lg md:text-2xl font-semibold pt-4">Atalhos do Teclado</p>
        <div class="grid grid-cols-2 place-items-center w-full pt-12">
            <p class="text-md md:text-xl font-bold">Ativar atalhos de teclado</p>
            <select class="select select-bordered w-32 md:w-40 lg:w-full max-w-xs">
                <option disabled selected>{$contrast ? 'Habilitado' : 'Desabilitado'}</option>
                <option selected={$contrast === true} on:click={enableShortcut}>Habilitado</option>
                <option selected={$contrast === false} on:click={disableShortcut}>Desabilitado</option>
            </select>
        </div>

        <div class="divider divider-neutral w-3/4 mx-auto" />

        <p class="text-lg md:text-2xl font-semibold pt-4">Texto</p>
        <div class="grid grid-cols-2 place-items-center w-full pt-12">
            <p class="text-md md:text-xl font-bold">Redimensionar Texto</p>
            <select class="select select-bordered w-32 md:w-40 lg:w-full max-w-xs">
                <option disabled selected
                    >{#if $resizeText === '100%'}100%{:else if $resizeText === '150%'}150%{:else}200%{/if}</option
                >
                <option selected={$resizeText === '100%'} on:click={() => changeSize('100%')}
                    >100%</option
                >
                <option selected={$resizeText === '150%'} on:click={() => changeSize('150%')}
                    >150%</option
                >
                <option selected={$resizeText === '200%'} on:click={() => changeSize('200%')}
                    >200%</option
                >
            </select>
        </div>
    </section>
</body>

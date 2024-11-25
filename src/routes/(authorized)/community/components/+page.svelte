<script lang="ts">
    import type { PageServerData } from './$types';
    import type { User } from '$lib/user';
    import type { Component } from '$lib/component';    
    import { enhance } from '$app/forms';
    import Input from '$lib/components/Input.svelte';
    import Icon from '@iconify/svelte';
    import ComponentCard from '$lib/components/store/ComponentCard.svelte';    
    import SearchPagination from '$lib/components/store/SearchPagination.svelte';    

    export let data: PageServerData & { user: User };

    let isSearching: boolean = false;
    let currentPage: number;
    let searchResult: Array<Component> = [];
    let qtdPages: number;

    let notOwnedComponents: Array<Component> = [];

    $: ascending = false;

    $: allComponents = data.searchComponents;

    $: allComponents, Searching();

    $: searchResult, Searching(); 
    
    console.log(data.test);
    
    data.searchComponents.forEach((component: Component) => {
        if (component.owner_username !== data.user.username && !component.bought) {
            notOwnedComponents.push(component);
        }
    });

    qtdPages = Math.ceil(notOwnedComponents.length / 10);

    function Searching() {
        if (searchResult.length > 10 || searchResult.length !== 0) {
            qtdPages = Math.ceil(searchResult.length / 10);
            currentPage = 1;
        }                   

        if(isSearching && searchResult.length === 0){
            qtdPages = 1;
            currentPage = 1;
        }        
    }    
</script>

<svelte:head>
    <title>Comunidade - Swibly Arkhon</title>
</svelte:head>

<main class="w-full max-w-96 sm:max-w-full flex max-sm:flex-col max-sm:items-center gap-4 mx-auto">
    <aside class="sm:pr-4 sm:border-r border-r-base-200 w-full max-w-96">
        <form
            method="POST"
            action="?/search"
            class="space-y-2"
            use:enhance={({ formData }) => {
                formData.set('ascending', String(ascending));
                formData.set('total', data.components.total_records.toString());

                return (result) => {
                    // @ts-ignore
                    allComponents = result.result.data.components;
                    // @ts-ignore
                    searchResult = result.result.data.searchComponents;                    
                };
            }}
        >
            <h1 class="text-3xl font-bold">Filtrar</h1>

            <article class="grid grid-cols-2">
                <input type="checkbox" name="ascending" class="hidden" bind:checked={ascending} />

                <button
                    type="button"
                    class="border-b-2 border-base-200"
                    class:border-primary={ascending}
                    class:text-base-200={!ascending}
                    on:click={() => (ascending = true)}
                >
                    Crescente
                </button>

                <button
                    type="button"
                    class="border-b-2 border-base-200"
                    class:border-primary={!ascending}
                    class:text-base-200={ascending}
                    on:click={() => (ascending = false)}
                >
                    Decrescente
                </button>
            </article>

            <Input
                name="text"
                icon="fa6-solid:magnifying-glass"
                placeholder="Procurar componente"
                labels={{ topLeft: 'Procurar' }}
                disableDefaultLabels
            />

            <h2 class="text-2xl font-bold">Orçamento</h2>

            <div class="grid grid-cols-2 gap-2">
                <Input
                    name="budget-min"
                    placeholder="Preço mínimo"
                    labels={{ topLeft: 'Mínimo' }}
                    type="number"
                    min="0"
                    max="1000000000000"
                />
                <Input
                    name="budget-max"
                    placeholder="Preço máximo"
                    labels={{ topLeft: 'Máximo' }}
                    type="number"
                    min="0"
                    max="1000000000000"
                />
            </div>

            <h2 class="text-2xl font-bold">Arkhoins</h2>

            <div class="grid grid-cols-2 gap-2">
                <Input
                    name="arkhoins-min"
                    placeholder="Mínimo"
                    labels={{ topLeft: 'Mínimo' }}
                    type="number"
                    min="0"
                    max="1000000"
                />
                <Input
                    name="arkhoins-max"
                    placeholder="Máximo"
                    labels={{ topLeft: 'Máximo' }}
                    type="number"
                    min="0"
                    max="1000000"
                />
            </div>

            <label class="form-control w-full">
                <div class="label">
                    <span class="label-text">Ordenar por</span>
                </div>
                <select name="order" class="select select-sm select-bordered w-full">
                    <option value="alphabetic">Ordem Alfabética</option>
                    <option value="order_created" selected>Data de criação</option>
                </select>
                <div class="label" />
            </label>

            <Input name="owned" element="checkbox" size="xs">Mostrar componentes adquiridos</Input>

            <div class="divider divider-start divider-end" />

            <button class="btn btn-sm btn-primary w-full" on:click={() => isSearching = true}>
                <Icon icon="fa6-solid:magnifying-glass" />
                Pesquisar
            </button>
        </form>
    </aside>

    <div class="w-full flex flex-col items-center">
        <SearchPagination bind:currentPage bind:qtdPages />

        {#if notOwnedComponents.length !== 0 || searchResult.length !== 0}
            <section
                class="w-full grid lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 place-items-center gap-4 gap-y-8 mt-4"
            >
                {#if !isSearching}
                    {#each notOwnedComponents.slice((currentPage - 1) * 10, (currentPage - 1) * 10 + 10) as component}
                        <ComponentCard
                            componentData={component}
                            userData={data.user}                                                   
                        />
                    {/each}
                {:else}
                    {#each searchResult.slice((currentPage - 1) * 10, (currentPage - 1) * 10 + 10) as component}
                        <ComponentCard
                            componentData={component}
                            userData={data.user}                                                                    
                        />
                    {/each} 
                {/if}
            </section>

            {#if isSearching && searchResult.length === 0}
                <p class="text-center italic">Nenhum componente foi encontrado</p>
            {/if}
        {:else if isSearching && searchResult.length === 0}
            <p class="text-center italic">Nenhum componente foi encontrado</p>
        {:else if !isSearching && (notOwnedComponents.length === 0 || searchResult.length === 0)}
        <p class="text-center italic">Nenhum componente foi encontrado</p>
        {/if}
    </div>
</main>

<script lang="ts">
    import Icon from '@iconify/svelte';
    import type { User } from '$lib/user';
    import type { PageServerData } from './$types';
    import ProjectCard from '$lib/components/ProjectCard.svelte';
    import Pagination from '$lib/components/Pagination.svelte';
    import type { Pagination as PaginationType } from '$lib/utils';
    import { enhance } from '$app/forms';
    import type { Project } from '$lib/projects';
    import Input from '$lib/components/Input.svelte';

    export let data: PageServerData & { user: User };

    $: pagination = data.projects;
    $: projects = pagination.data;

    $: ascending = false;

    $: projectSearch = undefined as PaginationType<Project> | undefined;
</script>

<svelte:head>
    <title>Comunidade - Swibly Arkhon</title>
</svelte:head>

<div class="w-full flex max-sm:flex-col max-sm:items-center gap-4">
    <aside
        class="sm:pr-4 sm:border-r border-r-base-200 w-full max-w-96 sm:sticky sm:h-full sm:top-32"
    >
        <form
            method="POST"
            action="?/search"
            class="space-y-2 block sm:hidden"
            use:enhance={function () {
                return function ({ result, update }) {
                    // @ts-ignore
                    projectSearch = result.data.projects;

                    return update({ reset: false });
                };
            }}
        >
            <div class="collapse collapse-arrow">
                <input type="checkbox" />
                <div class="collapse-title text-xl font-medium">
                    <h1 class="text-3xl font-bold">Filtrar</h1>
                </div>
                <div class="collapse-content">
                    <article class="grid grid-cols-2">
                        <input
                            type="checkbox"
                            name="ascending"
                            class="hidden"
                            bind:checked={ascending}
                        />

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
                        name="name"
                        icon="fa6-solid:magnifying-glass"
                        placeholder="Procurar projeto"
                        labels={{ topLeft: 'Procurar' }}
                        disableDefaultLabels
                    />

                    <label class="form-control w-full">
                        <div class="label">
                            <span class="label-text">Ordenar por</span>
                        </div>
                        <select name="order" class="select select-sm select-bordered w-full">
                            <option value="alphabetic">Ordem Alfabética</option>
                            <option value="favorites">Mais favoritos</option>
                            <option value="clones">Mais clones</option>
                            <option value="order_created" selected>Data de criação</option>
                        </select>
                        <div class="label" />
                    </label>

                    <h2 class="text-2xl font-bold">Preço</h2>

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

                    <h2 class="text-2xl font-bold">Área</h2>

                    <div class="grid grid-cols-2 gap-2">
                        <Input
                            name="area-min"
                            placeholder="Mínimo"
                            labels={{ topLeft: 'Mínimo' }}
                            type="number"
                            min="0"
                            max="1000000"
                        />
                        <Input
                            name="area-max"
                            placeholder="Máximo"
                            labels={{ topLeft: 'Máximo' }}
                            type="number"
                            min="0"
                            max="1000000"
                        />
                    </div>

                    <div class="divider divider-start divider-end" />

                    <button class="btn btn-sm btn-primary w-full">
                        <Icon icon="fa6-solid:magnifying-glass" />
                        Pesquisar
                    </button>
                </div>
            </div>
        </form>

        <form
            method="POST"
            action="?/search"
            class="space-y-2 hidden sm:block"
            use:enhance={function () {
                return function ({ result, update }) {
                    // @ts-ignore
                    projectSearch = result.data.projects;

                    return update({ reset: false });
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
                name="name"
                icon="fa6-solid:magnifying-glass"
                placeholder="Procurar projeto"
                labels={{ topLeft: 'Procurar' }}
                disableDefaultLabels
            />

            <label class="form-control w-full">
                <div class="label">
                    <span class="label-text">Ordenar por</span>
                </div>
                <select name="order" class="select select-sm select-bordered w-full">
                    <option value="alphabetic">Ordem Alfabética</option>
                    <option value="favorites">Mais favoritos</option>
                    <option value="clones">Mais clones</option>
                    <option value="order_created" selected>Data de criação</option>
                </select>
                <div class="label" />
            </label>

            <h2 class="text-2xl font-bold">Preço</h2>

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

            <h2 class="text-2xl font-bold">Área</h2>

            <div class="grid grid-cols-2 gap-2">
                <Input
                    name="area-min"
                    placeholder="Mínimo"
                    labels={{ topLeft: 'Mínimo' }}
                    type="number"
                    min="0"
                    max="1000000"
                />
                <Input
                    name="area-max"
                    placeholder="Máximo"
                    labels={{ topLeft: 'Máximo' }}
                    type="number"
                    min="0"
                    max="1000000"
                />
            </div>

            <div class="divider divider-start divider-end" />

            <button class="btn btn-sm btn-primary w-full">
                <Icon icon="fa6-solid:magnifying-glass" />
                Pesquisar
            </button>
        </form>
    </aside>

    <section class="w-full">
        {#if projectSearch !== undefined}
            {#if projectSearch.total_records === 0}
                <p class="italic opacity-50 text-center">Nenhum projeto encontrado.</p>
            {/if}

            <div class="mx-auto w-fit mb-4">
                <Pagination pagination={projectSearch} />
            </div>

            <ul
                class="grid grid-cols-[repeat(auto-fit,minmax(384px,1fr))] gap-4 max-md:flex max-md:flex-col"
            >
                {#each projectSearch.data as project}
                    <li class="w=full grid place-items-center">
                        <ProjectCard
                            options={project}
                            lang={data.user.language}
                            currentUser={data.user}
                            projectPage={false}
                        />
                    </li>
                {/each}
            </ul>
        {:else}
            {#if pagination.total_records === 0}
                <p class="italic opacity-50 text-center">Nenhum projeto encontrado.</p>
            {/if}

            <div class="mx-auto w-fit mb-4">
                <Pagination {pagination} />
            </div>

            <ul
                class="grid grid-cols-[repeat(auto-fit,minmax(384px,1fr))] gap-4 max-md:flex max-md:flex-col"
            >
                {#each projects as project}
                    <li class="w=full grid place-items-center">
                        <ProjectCard
                            options={project}
                            lang={data.user.language}
                            currentUser={data.user}
                            projectPage={false}
                        />
                    </li>
                {/each}
            </ul>
        {/if}
    </section>
</div>

<script lang="ts">
    import { page } from '$app/stores';
    import Input from '$lib/components/Input.svelte';
    import Icon from '@iconify/svelte';

    $: path = $page.url.pathname;

    let ascending = true;
</script>

<div class="p-4">
    {#if path.match(/\/community\/(projects|components)(\/)?$/)}
        <div class="flex gap-4 *:shrink-0">
            <aside class="border-r-2 border-base-200 pr-4" hidden>
                <h1 class="text-2xl font-bold mb-4">Filtragem</h1>

                <h2 class="text-xl font-bold mb-4">Ordenar</h2>

                <div class="grid grid-cols-2 gap-2">
                    <button
                        class="border-b-2 border-base-200"
                        class:border-primary={ascending}
                        on:click={() => (ascending = true)}
                    >
                        Crescente
                    </button>
                    <button
                        class="border-b-2 border-base-200"
                        class:border-primary={!ascending}
                        on:click={() => (ascending = false)}
                    >
                        Decrescente
                    </button>
                </div>

                <div class="divider divider-start divider-end my-2" />

                <h2 class="text-xl font-bold mb-4">Apenas</h2>

                <div class="flex flex-col">
                    <Input name="favoritos" element="checkbox" size="xs">Favoritos</Input>
                    <Input name="clones" element="checkbox" size="xs">Clones</Input>
                    <Input name="verified" element="checkbox" size="xs">Usuários verificados</Input>
                    <Input name="followed" element="checkbox" size="xs">
                        Usuários mais seguidos
                    </Input>
                </div>

                <div class="divider divider-start divider-end my-2" />

                <h2 class="text-xl font-bold mb-4">Por data</h2>

                <select class="select select-sm select-bordered w-full">
                    <option hidden disabled selected>Ordenar por</option>
                    <option value="createdat">Data de criação</option>
                    <option value="modifiedat">Data de modificação</option>
                </select>

                <div class="divider divider-start divider-end my-2" />

                <h2 class="text-xl font-bold mb-4">Outros</h2>

                <Input name="alphabetic" element="checkbox" size="xs">Ordem alfabética</Input>

                <div class="divider divider-start divider-end my-2" />

                <button class="btn btn-sm w-full btn-primary">
                    <Icon icon="fa6-solid:magnifying-glass" />
                    Aplicar Filtros
                </button>
            </aside>

            <section class="grow">
                <nav class="grid grid-cols-2 gap-2 mx-auto w-fit">
                    <a
                        href="/community/projects"
                        class="btn btn-sm"
                        class:btn-primary={path.includes('projects')}
                    >
                        <Icon icon="eos-icons:project" />
                        Projetos
                    </a>

                    <a
                        href="/community/components"
                        class="btn btn-sm"
                        class:btn-primary={path.includes('components')}
                    >
                        <Icon icon="iconamoon:component-fill" />
                        Componentes
                    </a>
                </nav>

                <div class="divider divider-start divider-end my-2" />

                <div class="flex gap-2 justify-center">
                    <input
                        type="text"
                        class="input input-sm input-bordered grow max-w-xl"
                        placeholder="Pesquisar por nome"
                    />

                    <button class="btn btn-sm btn-primary">
                        <Icon icon="fa6-solid:magnifying-glass" />
                    </button>
                </div>

                <div class="divider divider-start divider-end my-2" />

                <slot />
            </section>
        </div>
    {:else}
        <slot />
    {/if}
</div>

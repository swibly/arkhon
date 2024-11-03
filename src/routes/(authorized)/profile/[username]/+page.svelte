<script lang="ts">
    import ProjectCard from '$lib/components/ProjectCard.svelte';
    import type { User } from '$lib/user';
    import Icon from '@iconify/svelte';
    import type { PageServerData } from './$types';

    export let data: PageServerData & { user: User; lookup: User };

    $: projects = data.projects!;
    $: favorites = data.favorites!;
</script>

<div class="space-y-4">
    {#if data.user.id === data.lookup.id}
        <section>
            <h1 class="text-3xl font-bold mb-4 text-primary">Acesso Rápido</h1>

            <div class="flex gap-2 max-md:py-2 overflow-auto">
                <a href="/community/new" class="btn btn-primary btn-sm">
                    <Icon icon="mdi:plus" />
                    Novo projeto
                </a>

                <a href="/profile/{data.user.username}/projects" class="btn btn-primary btn-sm">
                    <Icon icon="eos-icons:project" />
                    Meus projetos
                </a>

                <a href="/community" class="btn btn-sm btn-secondary">
                    <Icon icon="fluent:people-community-12-filled" />
                    Comunidade
                </a>

                <a href="/community/store" class="btn btn-secondary btn-sm">
                    <Icon icon="mdi:store" />
                    Loja
                </a>

                <a href="/profile/{data.user.username}/trash" class="btn btn-error btn-sm">
                    <Icon icon="mdi:trash" />
                    Lixeira
                </a>
            </div>
        </section>

        <div class="divider py-8" />
    {/if}

    {#if data.user.username !== data.lookup.username && !data.lookup.show.projects}
        <section>
            <h1 class="text-3xl font-bold mb-4 text-primary">Projetos Criados</h1>

            <p class="text-error">Este usuário não permite que outros visualizem seus projetos.</p>
        </section>

        <div class="divider py-8" />
    {:else}
        <section class="md:max-w-[calc(100vw-256px)]">
            <div class="mb-4">
                <h1 class="text-3xl font-bold text-primary">Projetos Criados</h1>
                {#if projects.total_records > 0}
                    <a
                        href="/profile/{data.lookup.username}/projects"
                        class="link link-secondary text-sm font-normal mb-4"
                    >
                        Ver todos os projetos
                    </a>
                {/if}
            </div>

            {#if projects.total_records === 0}
                <p class="mb-4 opacity-70">Este usuário ainda não criou nenhum projeto.</p>

                {#if data.user.id === data.lookup.id}
                    <a href="/community/new" class="btn btn-primary btn-sm">
                        <Icon icon="mdi:plus" />
                        Começe a projetar agora mesmo!
                    </a>
                {/if}
            {:else}
                <div class="flex gap-2 max-md:overflow-auto md:flex-wrap max-md:py-4">
                    {#each projects.data as project}
                        <ProjectCard
                            options={project}
                            currentUser={data.user}
                            lang={data.user.language}
                        />
                    {/each}
                    {#if projects.total_records > projects.data.length}
                        <a
                            href="/profile/{data.lookup.username}/projects"
                            class="btn btn-link border border-primary h-[550px] w-full max-w-96 shrink-0"
                        >
                            <Icon icon="ph:magnifying-glass-bold" />
                            Ver mais {projects.total_records - projects.data.length}
                            projeto{projects.total_records - projects.data.length > 1 ? 's' : ''}
                        </a>
                    {/if}
                </div>
            {/if}
        </section>

        <div class="divider py-8" />
    {/if}

    {#if data.user.username !== data.lookup.username && !data.lookup.show.favorites}
        <section>
            <h1 class="text-3xl font-bold mb-4 text-primary">Projetos Favoritados</h1>

            <p class="text-error">
                Este usuário não permite que outros visualizem seus projetos favoritados.
            </p>
        </section>
    {:else}
        <section class="md:max-w-[calc(100vw-256px)]">
            <div class="mb-4">
                <h1 class="text-3xl font-bold text-primary">Projetos Favoritados</h1>
                {#if favorites.total_records > 0}
                    <a
                        href="/profile/{data.lookup.username}/favorites"
                        class="link link-secondary text-sm font-normal"
                    >
                        Ver todos os favoritos
                    </a>
                {/if}
            </div>

            {#if favorites.total_records === 0}
                <p class="mb-4 opacity-70">Este usuário ainda não favoritou nenhum projeto.</p>
            {:else}
                <div class="flex gap-2 max-md:overflow-auto md:flex-wrap max-md:py-4">
                    {#each favorites.data as favorite}
                        <ProjectCard
                            options={favorite}
                            currentUser={data.user}
                            lang={data.user.language}
                        />
                    {/each}
                    {#if favorites.total_records > favorites.data.length}
                        <a
                            href="/profile/{data.lookup.username}/favorites"
                            class="btn btn-link border border-primary h-[550px] w-full max-w-96 shrink-0"
                        >
                            <Icon icon="ph:magnifying-glass-bold" />
                            Ver mais {favorites.total_records - favorites.data.length}
                            favorito{favorites.total_records - favorites.data.length > 1 ? 's' : ''}
                        </a>
                    {/if}
                </div>
            {/if}
        </section>
    {/if}
</div>

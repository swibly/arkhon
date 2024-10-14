<script lang="ts">
    import ProjectCard from '$lib/components/ProjectCard.svelte';
    import type { User } from '$lib/user';
    import Icon from '@iconify/svelte';
    import type { PageServerData } from './$types';

    export let data: PageServerData & { lookup: User } & User;

    $: projects = data.projects!;
    $: favorites = data.favorites!;
</script>

<div class="space-y-4">
    {#if data.id === data.lookup.id}
        <section>
            <h1 class="text-3xl font-bold mb-4 text-primary">Acesso Rápido</h1>

            <div class="flex gap-2 max-md:justify-center">
                <a href="/community/new" class="btn btn-primary btn-sm">
                    <Icon icon="mdi:plus" />
                    Novo projeto
                </a>

                <a href="/community/store" class="btn btn-secondary btn-sm">
                    <Icon icon="mdi:store" />
                    Loja
                </a>
            </div>
        </section>

        <div class="divider" />
    {/if}

    <section>
        <h1 class="text-3xl font-bold mb-4 text-primary">
            Projetos Públicos
            {#if projects.total_records > 0}
                <a
                    href="/profile/{data.lookup.username}/projects"
                    class="link link-secondary text-sm font-normal"
                >
                    {#if projects.data.length - projects.total_records > 0}
                        (ver mais {projects.data.length - projects.total_records})
                    {:else}
                        (ver todos)
                    {/if}
                </a>
            {/if}
        </h1>

        {#if projects.total_records === 0}
            <p class="mb-4 opacity-70">Este usuário ainda não criou nenhum projeto.</p>
        {:else}
            <ul class="flex flex-wrap gap-2">
                {#each projects.data as project}
                    <li>
                        <ProjectCard
                            options={project}
                            currentUserID={data.id}
                            lang={data.language}
                        />
                    </li>
                {/each}
            </ul>
        {/if}
    </section>

    <div class="divider" />

    <section>
        <h1 class="text-3xl font-bold mb-4 text-primary">
            Projetos Favoritos
            {#if favorites.total_records > 0}
                <a
                    href="/profile/{data.lookup.username}/favorites"
                    class="link link-secondary text-sm font-normal"
                >
                    {#if favorites.data.length - favorites.total_records > 0}
                        (ver mais {favorites.data.length - favorites.total_records})
                    {:else}
                        (ver todos)
                    {/if}
                </a>
            {/if}
        </h1>

        {#if favorites.total_records === 0}
            <p class="mb-4 opacity-70">Este usuário ainda não favoritou nenhum projeto.</p>
        {:else}
            <ul class="flex flex-wrap gap-2">
                {#each favorites.data as favorite}
                    <li>
                        <ProjectCard
                            options={favorite}
                            currentUserID={data.id}
                            lang={data.language}
                        />
                    </li>
                {/each}
            </ul>
        {/if}
    </section>
</div>

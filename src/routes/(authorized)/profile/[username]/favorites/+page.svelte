<script lang="ts">
    import type { User } from '$lib/user';
    import type { PageServerData } from './$types';
    import ProjectCard from '$lib/components/ProjectCard.svelte';
    import Pagination from '$lib/components/Pagination.svelte';

    export let data: PageServerData & User & { lookup: User };

    $: pagination = data.projects;
    $: projects = pagination.data;
</script>

<h1 class="text-3xl font-bold text-primary">Projetos Favoritados</h1>
<p class="mb-4">Projetos favoritos de {data.lookup.firstname}</p>

{#if data.username !== data.lookup.username && !data.lookup.show.favorites}
    <p class="text-error">
        Este usuário não permite que outros visualizem seus projetos favoritados.
    </p>
{:else if projects.length === 0}
    <p class="mb-4 opacity-70 italic">Este usuário ainda não favoritou nenhum projeto.</p>
{:else}
    <Pagination {pagination} />

    <div class="grid grid-cols-3 gap-4 max-lg:grid-cols-1 max-md:place-items-center">
        {#each projects as project}
            <ProjectCard options={project} currentUserID={data.id} lang={data.language} />
        {/each}
    </div>
{/if}

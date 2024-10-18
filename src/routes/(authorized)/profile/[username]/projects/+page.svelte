<script lang="ts">
    import type { User } from '$lib/user';
    import type { PageServerData } from './$types';
    import ProjectCard from '$lib/components/ProjectCard.svelte';
    import Pagination from '$lib/components/Pagination.svelte';

    export let data: PageServerData & User & { lookup: User };

    $: pagination = data.projects;
    $: projects = pagination.data;
</script>

<h1 class="text-3xl font-bold text-primary">Todos os Projetos</h1>
<p class="mb-4">Projetos de {data.lookup.firstname} gerenciados e acompanhados</p>

{#if data.username !== data.lookup.username && !data.lookup.show.projects}
    <p class="text-error">Este usuário não permite que outros visualizem seus projetos.</p>
{:else if projects.length === 0}
    <p class="mb-4 opacity-70 italic">Este usuário ainda não tem nenhum projeto.</p>
{:else}
    <Pagination {pagination} />

    <div class="grid grid-cols-3 gap-4 max-lg:grid-cols-1 max-md:place-items-center">
        {#each projects as project}
            <ProjectCard options={project} currentUserID={data.id} lang={data.language} />
        {/each}
    </div>
{/if}

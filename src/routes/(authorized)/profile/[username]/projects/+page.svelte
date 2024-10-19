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
<p>Projetos de {data.lookup.firstname} gerenciados e acompanhados</p>

<div class="divider" />

{#if data.username !== data.lookup.username && !data.lookup.show.projects}
    <p class="text-error">Este usuário não permite que outros visualizem seus projetos.</p>
{:else if projects.length === 0}
    <p class="mb-4 opacity-70 italic">Este usuário ainda não tem nenhum projeto.</p>
{:else}
    <div class="mx-auto w-fit">
        <Pagination {pagination} />
    </div>

    <div class="grid grid-cols-[repeat(auto-fit,minmax(384px,1fr))] gap-x-2 gap-y-4">
        {#each projects as project}
            <ProjectCard options={project} currentUserID={data.id} lang={data.language} />
        {/each}
    </div>
{/if}

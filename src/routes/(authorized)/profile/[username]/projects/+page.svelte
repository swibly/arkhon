<script lang="ts">
    import type { User } from '$lib/user';
    import type { PageServerData } from './$types';
    import ProjectCard from '$lib/components/ProjectCard.svelte';

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
    {#if pagination.total_pages !== 1}
        <div class="mb-4 join">
            {#if pagination.current_page > 2}
                <a href="?page=1" class="join-item btn btn-sm">1</a>
                <button class="join-item btn btn-sm btn-disabled">...</button>
            {/if}

            {#if pagination.previous_page !== -1}
                <a href="?page={pagination.previous_page}" class="join-item btn btn-sm">
                    {pagination.previous_page}
                </a>
            {/if}

            <button class="join-item btn btn-sm btn-primary">{pagination.current_page}</button>

            {#if pagination.next_page !== -1}
                <a href="?page={pagination.next_page}" class="join-item btn btn-sm">
                    {pagination.next_page}
                </a>
            {/if}

            {#if pagination.current_page < pagination.total_pages - 1}
                <button class="join-item btn btn-sm btn-disabled">...</button>
                <a href="?page={pagination.total_pages}" class="join-item btn btn-sm">
                    {pagination.total_pages}
                </a>
            {/if}
        </div>
    {/if}

    <div class="grid grid-cols-3 gap-4 max-lg:grid-cols-1 max-md:place-items-center">
        {#each projects as project}
            <ProjectCard options={project} currentUserID={data.id} lang={data.language} />
        {/each}
    </div>
{/if}

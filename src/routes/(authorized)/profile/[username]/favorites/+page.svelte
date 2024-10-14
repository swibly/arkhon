<script lang="ts">
    import type { User } from '$lib/user';
    import type { PageServerData } from './$types';
    import ProjectCard from '$lib/components/ProjectCard.svelte';

    export let data: PageServerData & User & { lookup: User };

    $: pagination = data.projects;
    $: projects = pagination.data;
</script>

<h1 class="mb-4 text-3xl font-bold text-primary">Projetos Favoritados</h1>

{#if projects.length === 0}
    <p class="mb-4 opacity-70">Este usuário ainda não favoritou nenhum projeto.</p>
{:else}
    {#if pagination.total_pages !== 1}
        <div class="mb-4 join">
            {#if pagination.current_page > 2}
                <a href="?page={pagination.previous_page}" class="join-item btn btn-sm">1</a>
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

    <ul class="grid grid-cols-3 gap-4 max-lg:grid-cols-1">
        {#each projects as project}
            <li>
                <ProjectCard options={project} currentUserID={data.id} lang={data.language} />
            </li>
        {/each}
    </ul>
{/if}

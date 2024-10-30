<script lang="ts">
    import type { User } from '$lib/user';
    import type { PageServerData } from './$types';
    import ProjectCard from '$lib/components/ProjectCard.svelte';
    import Pagination from '$lib/components/Pagination.svelte';

    export let data: PageServerData & { user: User };

    $: pagination = data.projects;
    $: projects = pagination.data;
</script>

{#if projects.length === 0}
    <p class="mb-4 opacity-70 italic text-center">Nenhum projeto encontrado.</p>
{:else}
    <div class="mx-auto w-fit">
        <Pagination {pagination} />
    </div>

    <div
        class="grid grid-cols-[repeat(auto-fill,minmax(384px,1fr))] place-items-center grid-flow-dense gap-x-2 gap-y-4"
    >
        {#each projects as project}
            <ProjectCard options={project} currentUser={data.user} lang={data.user.language} />
        {/each}
    </div>
{/if}

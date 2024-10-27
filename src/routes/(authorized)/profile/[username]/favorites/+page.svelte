<script lang="ts">
    import type { User } from '$lib/user';
    import type { PageServerData } from './$types';
    import ProjectCard from '$lib/components/ProjectCard.svelte';
    import Pagination from '$lib/components/Pagination.svelte';

    export let data: PageServerData & { user: User; lookup: User };

    $: pagination = data.projects;
    $: projects = pagination.data;
</script>

<h1 class="text-3xl font-bold text-primary">Projetos Favoritados</h1>
<p>Projetos favoritos de {data.lookup.firstname}</p>

<div class="divider" />

{#if data.user.username !== data.lookup.username && !data.lookup.show.favorites}
    <p class="text-error">
        Este usuário não permite que outros visualizem seus projetos favoritados.
    </p>
{:else if projects.length === 0}
    <p class="mb-4 opacity-70 italic">Este usuário ainda não favoritou nenhum projeto.</p>
{:else}
    <div class="mx-auto w-fit">
        <Pagination {pagination} />
    </div>

    <div
        class="grid grid-cols-[repeat(auto-fill,minmax(384px,1fr))] gap-x-2 gap-y-4 max-sm:flex max-sm:flex-wrap max-md:place-items-center"
    >
        {#each projects as project}
            <ProjectCard options={project} currentUser={data.user} lang={data.user.language} />
        {/each}
    </div>
{/if}

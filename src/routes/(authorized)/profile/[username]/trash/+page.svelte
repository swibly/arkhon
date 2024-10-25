<script lang="ts">
    import type { User } from '$lib/user';
    import type { PageServerData } from './$types';
    import ProjectCard from '$lib/components/ProjectCard.svelte';
    import Pagination from '$lib/components/Pagination.svelte';

    export let data: PageServerData & { user: User, lookup: User };

    $: pagination = data.trashed;
    $: trashed = pagination.data;
</script>

<h1 class="text-3xl font-bold text-primary">Lixeira</h1>
<p>Seus projetos apagados</p>

<div class="divider" />

{#if data.user.username !== data.lookup.username}
    <p class="text-error">Você não pode ver a lixeira de outras pessoas.</p>
{:else if trashed.length === 0}
    <p class="mb-4 opacity-70 italic">Você ainda não colocou nenhum projeto na lixeira.</p>
{:else}
    <div class="mx-auto w-fit">
        <Pagination {pagination} />
    </div>

    <div class="grid grid-cols-[repeat(auto-fill,minmax(384px,1fr))] gap-x-2 gap-y-4">
        {#each trashed as trash}
            <ProjectCard
                options={trash}
                currentUser={data.user}
                lang={data.user.language}
                showDeleteOperations
            />
        {/each}
    </div>
{/if}

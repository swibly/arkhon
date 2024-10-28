<script lang="ts">
    import type { User } from '$lib/user';
    import type { PageServerData } from './$types';
    import Pagination from '$lib/components/Pagination.svelte';
    import ComponentCard from '$lib/components/ComponentCard.svelte';

    export let data: PageServerData & { user: User };

    $: pagination = data.components;
    $: components = pagination.data;
</script>

{#if components.length === 0}
    <p class="mb-4 opacity-70 italic">Nenhum projeto encontrado.</p>
{:else}
    <div class="mx-auto w-fit">
        <Pagination {pagination} />
    </div>

    <div
        class="grid grid-cols-[repeat(auto-fill,minmax(112px,1fr))] place-items-center grid-flow-dense gap-x-2 gap-y-4"
    >
        {#each components as component}
            <ComponentCard name={component.name} content={component.content} />
        {/each}
    </div>
{/if}

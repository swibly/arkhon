<script lang="ts">
    import { enhance } from '$app/forms';
    import type { Component } from '$lib/component';
    import type { Project } from '$lib/projects';
    import type { Pagination } from '$lib/utils';
    import type { User } from '$lib/user';
    import { onMount } from 'svelte';
    import type { PageServerData } from '../../routes/(authorized)/community/projects/[project]/edit/$types';
    
    export let data: PageServerData & { user: User; project: Project };
    export let allComponents: Pagination<Component>;
    export let ownedComponents: Pagination<Component>;
    export let type: string;
    export let componentData: Pagination<Component>;

    function setPage(i: number) {
        localStorage.setItem('currentPage', String(i));
    }
</script>

{#if componentData.total_pages !== 1}
    {#if type === 'owned'}
        <form
            method="POST"
            action={`/community/projects/${data.project.id}/edit?/get`}
            use:enhance={({ formData }) => {
                formData.set('nextPage', String(localStorage.getItem('currentPage')));

                return ({ result }) => {
                    // @ts-ignore
                    ownedComponents = result.data.allOwnedComponents;
                };
            }}
        >
            <div class="mb-4 join">
                {#if ownedComponents.current_page > 2}
                    <button on:click={() => setPage(1)} class="join-item btn btn-sm">1</button>
                {/if}

                {#if ownedComponents.current_page > 3}
                    <button class="join-item btn btn-sm btn-disabled">...</button>
                {/if}

                {#if ownedComponents.previous_page !== -1}
                    <button
                        on:click={() => setPage(ownedComponents.previous_page)}
                        class="join-item btn btn-sm"
                    >
                        {ownedComponents.previous_page}
                    </button>
                {/if}

                <button
                    on:click={() => setPage(ownedComponents.current_page)}
                    class="join-item btn btn-sm btn-primary">{ownedComponents.current_page}</button
                >

                {#if ownedComponents.next_page !== -1}
                    <button
                        on:click={() => setPage(ownedComponents.next_page)}
                        class="join-item btn btn-sm"
                    >
                        {ownedComponents.next_page}
                    </button>
                {/if}

                {#if ownedComponents.current_page < ownedComponents.total_pages - 2}
                    <button class="join-item btn btn-sm btn-disabled">...</button>
                {/if}

                {#if ownedComponents.current_page < ownedComponents.total_pages - 1}
                    <button
                        on:click={() => setPage(ownedComponents.total_pages)}
                        class="join-item btn btn-sm"
                    >
                        {ownedComponents.total_pages}
                    </button>
                {/if}
            </div>
        </form>
    {/if}
    {#if type === 'store'}
        <form
            method="POST"
            action={`/community/projects/${data.project.id}/edit?/get`}
            use:enhance={({ formData }) => {
                formData.set('nextPage', String(localStorage.getItem('currentPage')));

                return ({ result }) => {
                    // @ts-ignore
                    allComponents = result.data.component;
                };
            }}
        >
            <div class="mb-4 join">
                {#if allComponents.current_page > 2}
                    <button on:click={() => setPage(1)} class="join-item btn btn-sm">1</button>
                {/if}

                {#if allComponents.current_page > 3}
                    <button class="join-item btn btn-sm btn-disabled">...</button>
                {/if}

                {#if allComponents.previous_page !== -1}
                    <button
                        on:click={() => setPage(allComponents.previous_page)}
                        class="join-item btn btn-sm"
                    >
                        {allComponents.previous_page}
                    </button>
                {/if}

                <button
                    on:click={() => setPage(allComponents.current_page)}
                    class="join-item btn btn-sm btn-primary">{allComponents.current_page}</button
                >

                {#if allComponents.next_page !== -1}
                    <button
                        on:click={() => setPage(allComponents.next_page)}
                        class="join-item btn btn-sm"
                    >
                        {allComponents.next_page}
                    </button>
                {/if}

                {#if allComponents.current_page < allComponents.total_pages - 2}
                    <button class="join-item btn btn-sm btn-disabled">...</button>
                {/if}

                {#if allComponents.current_page < allComponents.total_pages - 1}
                    <button
                        on:click={() => setPage(allComponents.total_pages)}
                        class="join-item btn btn-sm"
                    >
                        {allComponents.total_pages}
                    </button>
                {/if}
            </div>
        </form>
    {/if}
{/if}

<script lang="ts">
    import { enhance } from '$app/forms';
    import type { Component } from '$lib/component';
    import type { Project } from '$lib/projects';
    import type { Pagination } from '$lib/utils';

    export let pagination: Pagination<any>;
    export let data: Project;
    export let allComponents: Array<Component>;
    export let ownedComponents: Array<Component>;
    export let type: string;
    export let componentData: Array<Component>;

    function setPage(i: number) {
        localStorage.setItem('currentPage', String(i));
    }

    // console.log("Inicio", componentData.current_page)
    // console.log(allComponents);
    // console.log(ownedComponents);
</script>

{#if componentData.total_pages !== 1}
    <form
        method="POST"
        action={`/community/projects/${data.id}/edit?/get`}
        use:enhance={({ formData }) => {
            formData.set('nextPage', String(localStorage.getItem('currentPage')));

            return ({ result }) => {
                // @ts-ignore
                allComponents = result.data.component.data;
                // @ts-ignore
                ownedComponents = result.data.allOwnedComponents.data;

                if (type === 'owned') {
                    // @ts-ignore
                    componentData = result.data.allOwnedComponents;

                    // console.log(result.data.allOwnedComponents);
                }

                if (type === 'store') {
                    // @ts-ignore
                    componentData = result.data.component;

                    // console.log(componentData);
                }

                // console.log(componentData);
                // console.log(componentData.current_page);

                pagination = {
                    data: componentData,
                    // @ts-ignore
                    total_records: componentData.total_records,
                    // @ts-ignore
                    total_pages: componentData.total_pages,
                    // @ts-ignore
                    current_page: componentData.current_page,
                    // @ts-ignore
                    next_page: componentData.next_page,
                    // @ts-ignore
                    previous_page: componentData.previous_page
                };
            };
        }}
    >
        <div class="mb-4 join">
            {#if componentData.current_page > 2}
                <button on:click={() => setPage(1)} class="join-item btn btn-sm">1</button>
                <button class="join-item btn btn-sm btn-disabled">...</button>
            {/if}

            {#if componentData.previous_page !== -1}
                <button
                    on:click={() => setPage(componentData.previous_page)}
                    class="join-item btn btn-sm"
                >
                    {componentData.previous_page}
                </button>
            {/if}

            <button
                on:click={() => setPage(componentData.current_page)}
                class="join-item btn btn-sm btn-primary">{componentData.current_page}</button
            >

            {#if componentData.next_page !== -1}
                <button
                    on:click={() => setPage(componentData.next_page)}
                    class="join-item btn btn-sm"
                >
                    {componentData.next_page}
                </button>
            {/if}

            {#if componentData.current_page < componentData.total_pages - 1}
                <button class="join-item btn btn-sm btn-disabled">...</button>
                <button
                    on:click={() => setPage(componentData.total_pages)}
                    class="join-item btn btn-sm"
                >
                    {componentData.total_pages}
                </button>
            {/if}
        </div>
    </form>
{/if}

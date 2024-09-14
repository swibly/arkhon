<script lang="ts">
    import { writable } from 'svelte/store';

    export const currentPageStore = writable(1);

    export let qtd: number;

    $: page = Math.ceil(qtd / 8);

    function handlePageClick(page: number) {
        currentPageStore.set(page);
    }
</script>

<div class="grid grid-cols-1 place-items-center mb-8">
    <div class="join gap-1">
        {#if $currentPageStore !== 1}
            <button class="join-item btn btn-secondary" on:click={() => handlePageClick(1)}
                >1</button
            >
        {/if}

        {#if $currentPageStore > 3 && page > 4}
            <button class="join-item btn btn-secondary">...</button>
        {/if}

        {#if $currentPageStore > 3 && page < 5}
            <button
                class="join-item btn btn-secondary"
                on:click={() => handlePageClick($currentPageStore - 2)}
                >{$currentPageStore - 2}</button
            >
        {/if}

        {#if $currentPageStore > 2}
            <button
                class="join-item btn btn-secondary"
                on:click={() => handlePageClick($currentPageStore - 1)}
                >{$currentPageStore - 1}</button
            >
        {/if}

        <button
            class="join-item btn btn-primary"
            on:click={() => handlePageClick($currentPageStore)}>{$currentPageStore}</button
        >

        {#if $currentPageStore < page - 1}
            <button
                class="join-item btn btn-secondary"
                on:click={() => handlePageClick($currentPageStore + 1)}
                >{$currentPageStore + 1}</button
            >
        {/if}

        {#if $currentPageStore < page - 2 && page < 5}
            <button
                class="join-item btn btn-secondary"
                on:click={() => handlePageClick($currentPageStore + 2)}
                >{$currentPageStore + 2}</button
            >
        {/if}

        {#if $currentPageStore < page - 2 && page > 4}
            <button class="join-item btn btn-secondary">...</button>
        {/if}

        {#if $currentPageStore !== page}
            <button class="join-item btn btn-secondary" on:click={() => handlePageClick(page)}
                >{page}</button
            >
        {/if}
    </div>
</div>
<slot />

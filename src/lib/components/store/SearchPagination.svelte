<script lang="ts">
    import type { Component } from '$lib/component';

    export let currentPage: number = 1;
    export let qtdPages: number;

    function setCurrentPage(page: number) {
        currentPage = page;
    }
</script>

<div class="mb-4 join">
    {#if currentPage > 2}
        <button on:click={() => setCurrentPage(1)} class="join-item btn btn-sm">1</button>
    {/if}

    {#if currentPage > 3}
        <button class="join-item btn btn-sm">...</button>
    {/if}

    {#if currentPage > 1}
        <button on:click={() => setCurrentPage(currentPage - 1)} class="join-item btn btn-sm"
            >{currentPage - 1}</button
        >
    {/if}

    <button on:click={() => setCurrentPage(currentPage)} class="join-item btn btn-sm btn-primary"
        >{currentPage}</button
    >

    {#if currentPage < qtdPages - 1}
        <button on:click={() => setCurrentPage(currentPage + 1)} class="join-item btn btn-sm"
            >{currentPage + 1}</button
        >
    {/if}

    {#if currentPage < qtdPages - 3}
        <button class="join-item btn btn-sm">...</button>
    {/if}

    {#if currentPage < qtdPages}
        <button on:click={() => setCurrentPage(qtdPages)} class="join-item btn btn-sm"
            >{qtdPages}</button
        >
    {/if}
</div>

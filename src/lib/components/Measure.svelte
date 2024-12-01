<script lang="ts">
    import type { FormEventHandler } from 'svelte/elements';

    export let value: number;
    export let onInput: FormEventHandler<HTMLInputElement>;

    export let min: number;
    export let step: number;
    export let max: number;

    const steps = Math.round((max - min) / step) + 1;
</script>

<div class="relative -space-y-1">
    <div class="flex w-full justify-between px-2 text-xs">
        {#each Array(steps) as _, i}
            <div
                class="w-px h-2 bg-white"
                class:opacity-0={i % 2 !== 0}
                class:opacity-20={i % 2 === 0}
            />
        {/each}
    </div>

    <input
        type="range"
        class="range range-xs range-primary"
        bind:value
        {min}
        {step}
        {max}
        on:input={onInput}
    />

    <div class="flex w-full justify-between px-2 text-xs">
        {#each Array(steps) as _, i}
            <div
                class="w-px h-2 bg-white"
                class:opacity-0={i % 2 === 0}
                class:opacity-20={i % 2 !== 0}
            />
        {/each}
    </div>
</div>

<script lang="ts">
    import { tools, getTool, setTool, Tool } from '$lib/stores/tool';
    import Icon from '@iconify/svelte';

    export let currentTool: Tool = getTool();
</script>

<section class="space-x-1">
    {#each tools as toolObject}
        <div class="tooltip tooltip-bottom" data-tip={toolObject.name}>
            <button
                class="btn btn-sm btn-square"
                class:btn-secondary={currentTool === toolObject.tool}
                class:btn-ghost={currentTool !== toolObject.tool}
                on:click={() => setTool(toolObject.tool)}
            >
                <Icon icon={toolObject.icon} class="text-lg" />
            </button>
        </div>
    {/each}
</section>

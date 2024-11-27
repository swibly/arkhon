<script lang="ts">
    import { Canvas } from 'fabric';
    import Icon from '@iconify/svelte';
    import { tool } from '$lib/stores/tool';
    import type { User } from '$lib/user';
    import type { Project } from '$lib/projects';
    import { hasPermissions } from '$lib/utils';
    import ToolSelector from './ToolSelector.svelte';
    import { centerView } from '$lib/editor/camera';
    import { enhance } from '$app/forms';
    import { spawn } from '$lib/toast';

    export let element: HTMLDivElement;
    export let project: Project;
    export let canvas: Canvas;
    export let user: User;

    let loadingSave = false;

    function centralizeCanvas() {
        centerView(canvas, project);
    }
</script>

<div bind:this={element} class="flex items-center justify-between pb-4 border-b border-base-200">
    {#if hasPermissions(user, project, ['allow_edit'])}
        <ToolSelector currentTool={$tool} />
    {/if}

    <h2 class="text-primary font-semibold">{project.name}</h2>

    <section>
        <button class="btn btn-ghost btn-sm" on:click={centralizeCanvas}>
            <Icon icon="material-symbols:camera" />
            Centralizar
        </button>

        {#if hasPermissions(user, project, ['allow_edit'])}
            <button class="btn btn-ghost btn-sm">
                <Icon icon="ic:sharp-save-alt" />
                Exportar
            </button>

            <form
                method="POST"
                action="/community/projects/{project.id}/edit?/save"
                id="save-project-form"
                class="inline"
                use:enhance={function ({ formData }) {
                    loadingSave = true;
                    formData.set(
                        'json',
                        JSON.stringify(canvas.toObject(['id', 'name', 'userlock']))
                    );

                    return function ({ update, result }) {
                        loadingSave = false;

                        // @ts-ignore
                        if (result.data && result.data.error !== undefined) {
                            spawn({
                                // @ts-ignore
                                message: result.data.error,
                                status: 'error'
                            });

                            return update();
                        }

                        spawn({ message: 'Projeto salvo com sucesso.' });

                        return update();
                    };
                }}
            >
                {#if !loadingSave}
                    <button class="btn btn-secondary btn-sm">
                        <Icon icon="material-symbols:save-sharp" />
                        Salvar
                    </button>
                {:else}
                    <button type="button" class="btn btn-secondary btn-sm" disabled>
                        <span class="loading loading-spinner loading-xs" />
                        Salvando...
                    </button>
                {/if}
            </form>
        {/if}
    </section>
</div>

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

<div bind:this={element} class="flex items-center pb-4 border-b border-base-200">
    {#if hasPermissions(user, project, ['allow_edit'])}
        <ToolSelector currentTool={$tool} />
    {/if}

    <div class="divider divider-horizontal"></div>

    <h2 class="text-primary font-semibold">{project.name}</h2>

    <div class="grow" />

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
                        JSON.stringify(canvas.toObject(['id', 'name', 'userlock', 'price']))
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
                <button class="btn items-center btn-secondary btn-sm" disabled={loadingSave}>
                    {#if loadingSave}
                        <Icon icon="mingcute:loading-line" class="animate-spin" />
                        Salvando...
                    {:else}
                        <Icon icon="material-symbols:save-sharp" />
                        Salvar
                    {/if}
                </button>
            </form>
        {/if}
    </section>
</div>

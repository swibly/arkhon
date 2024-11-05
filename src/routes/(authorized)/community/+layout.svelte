<script lang="ts">
    import { page } from '$app/stores';
    import Icon from '@iconify/svelte';

    $: path = $page.url.pathname;
</script>

<div class="p-4">
    {#if path.match(/\/community\/(projects|components|users)(\/)?$/)}
        <div class="flex gap-4 *:shrink-0">
            <section class="w-full">
                <nav class="flex gap-2 flex-wrap justify-center">
                    <a
                        href="/community/projects"
                        class="btn btn-sm"
                        class:btn-primary={path.includes('projects')}
                    >
                        <Icon icon="eos-icons:project" />
                        Projetos
                    </a>

                    <a
                        href="/community/components"
                        class="btn btn-sm"
                        class:btn-primary={path.includes('components')}
                    >
                        <Icon icon="iconamoon:component-fill" />
                        Componentes
                    </a>

                    <a
                        href="/community/users"
                        class="btn btn-sm"
                        class:btn-primary={path.includes('users')}
                    >
                        <Icon icon="mdi:users" />
                        Usuários
                    </a>
                </nav>

                <div class="divider divider-start divider-end my-2" />

                <slot />
            </section>
        </div>
    {:else}
        <slot />
    {/if}
</div>

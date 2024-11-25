<script lang="ts">
    import { page } from '$app/stores';
    import Icon from '@iconify/svelte';

    $: path = $page.url.pathname;
</script>

<div class="p-4">
    {#if path.match(/\/community\/(projects|components|users)(\/)?$/)}
        <div class="mb-4 space-y-2 max-w-xl mx-auto">
            <h1 class="text-3xl font-bold text-primary">
                <Icon icon="fluent:people-community-12-filled" class="inline" />
                Comunidade
            </h1>

            <details class="collapse collapse-arrow">
                <summary class="collapse-title text-md font-medium text-primary">
                    <div class="flex gap-2 items-center">
                        <Icon icon="ph:blueprint" class="text-xl" />
                        O que é a comunidade?
                    </div>
                </summary>
                <div class="collapse-content">
                    <p>
                        Explore projetos compartilhados por outras pessoas e descubra novas pessoas
                        com interesses semelhantes. Use os filtros para encontrar tópicos ou tipos
                        de projetos específicos de seu interesse. Mergulhe, inspire-se e conecte-se
                        com nossa comunidade criativa!
                    </p>
                </div>
            </details>
        </div>

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

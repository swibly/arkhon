<script lang="ts">
    import Icon from '@iconify/svelte';
    import type { LayoutServerData } from './$types';
    import { enhance } from '$app/forms';
    import { spawn } from '$lib/toast';
    import type { User } from '$lib/user';

    export let data: LayoutServerData & { user: User };

    let loading = false;
</script>

{#if data.project.deleted_at !== null}
    <div
        class="p-2 w-full bg-warning text-black flex justify-center items-center gap-2 sticky top-[85px]"
    >
        <Icon icon="mdi:alert" />
        Este projeto está na lixeira do dono. Você pode estar vendo uma versão antiga.

        {#if data.user.id === data.project.owner_id || data.project.allowed_users.filter((x) => x.id === data.user.id && x.allow_delete === true).length > 0}
            <form
                action="/community/projects/{data.project.id}?/restore"
                method="POST"
                use:enhance={() => {
                    loading = true;

                    return ({ update }) => {
                        loading = false;

                        spawn({ message: 'Projeto restaurado.' });

                        return update({ reset: false });
                    };
                }}
            >
                <button class="btn btn-ghost btn-sm" disabled={loading}>
                    {#if loading}
                        <Icon icon="mdi:restore" />
                        Restaurando
                    {:else}
                        <Icon icon="mdi:restore" />
                        Restaurar
                    {/if}
                </button>
            </form>
        {/if}
    </div>
{/if}

<slot />

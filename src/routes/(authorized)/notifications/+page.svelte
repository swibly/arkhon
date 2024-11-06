<script lang="ts">
    import Icon from '@iconify/svelte';
    import type { PageServerData } from './$types';
    import { enhance } from '$app/forms';
    import type { User } from '$lib/user';
    import Pagination from '$lib/components/Pagination.svelte';
    import { page } from '$app/stores';

    export let data: PageServerData & { user: User };

    let loadingMarkAsRead = false;
</script>

<svelte:head>
    <title>Notificações - Swibly Arkhon</title>
</svelte:head>

<div class="w-full max-w-3xl p-4 mx-auto">
    <a href="/profile/{data.user.username}" class="mb-4 btn btn-ghost btn-sm">
        <Icon icon="streamline:return-2-solid" />
        Voltar para o perfil
    </a>

    <h1 class="text-4xl font-bold text-primary">Notificações</h1>

    {#if !$page.url.searchParams.has('unread', 'true')}
        <a href="?unread=true" class="link link-secondary">Mostrar apenas não lidos</a>
    {:else}
        <a href="?unread=false" class="link link-secondary">Mostrar todos</a>
    {/if}

    <div class="w-fit mx-auto">
        <Pagination pagination={data} />
    </div>

    <section class="space-y-4 mt-8">
        {#if data.total_records === 0}
            <p class="italic opacity-50">Nenhuma notificação pendente.</p>
        {/if}
        {#each data.data as notification}
            <article class="p-4 border border-base-200 rounded-lg space-y-4">
                <nav class="flex flex-wrap items-center gap-1">
                    <p class="badge badge-primary gap-1">
                        <Icon icon="material-symbols:category" />
                        {notification.title}
                    </p>

                    {#if notification.is_read && notification.read_at}
                        <p class="badge badge-warning badge-outline gap-1">
                            <Icon icon="mdi:calendar" />
                            <span>
                                Lida em
                                {new Date(notification.read_at).toLocaleDateString(
                                    data.user.language,
                                    {
                                        day: 'numeric',
                                        month: 'short',
                                        year: 'numeric',
                                        hour: 'numeric',
                                        minute: 'numeric'
                                    }
                                )}
                            </span>
                        </p>
                    {/if}

                    <div class="grow" />

                    <p class="opacity-50">
                        Recebida em
                        {new Date(notification.created_at).toLocaleDateString(data.user.language, {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric',
                            hour: 'numeric',
                            minute: 'numeric'
                        })}
                    </p>
                </nav>

                <p>{notification.message}</p>

                <div class="divider divider-start divider-end" />

                <div class="flex justify-center gap-2">
                    {#if notification.redirect}
                        <a
                            href={notification.redirect}
                            class="btn btn-sm btn-square btn-primary btn-outline"
                        >
                            <Icon icon="line-md:link" />
                        </a>
                    {/if}

                    {#if notification.is_read}
                        <form
                            method="POST"
                            action="/notifications/{notification.id}?/unread"
                            use:enhance={function () {
                                loadingMarkAsRead = true;
                                return function ({ update }) {
                                    loadingMarkAsRead = false;
                                    return update({ reset: false });
                                };
                            }}
                        >
                            {#if loadingMarkAsRead}
                                <button
                                    type="button"
                                    class="btn btn-sm btn-wide btn-secondary"
                                    disabled
                                >
                                    <span class="loading loading-spinner" />
                                    Carregando...
                                </button>
                            {:else}
                                <button class="btn btn-sm btn-wide btn-primary">
                                    <Icon icon="fluent:mail-32-filled" />
                                    Lida
                                </button>
                            {/if}
                        </form>
                    {:else}
                        <form
                            method="POST"
                            action="/notifications/{notification.id}?/read"
                            use:enhance={function () {
                                loadingMarkAsRead = true;
                                return function ({ update }) {
                                    loadingMarkAsRead = false;
                                    return update({ reset: false });
                                };
                            }}
                        >
                            {#if loadingMarkAsRead}
                                <button
                                    type="button"
                                    class="btn btn-sm btn-wide btn-secondary"
                                    disabled
                                >
                                    <span class="loading loading-spinner" />
                                    Carregando...
                                </button>
                            {:else}
                                <button class="btn btn-sm btn-wide btn-secondary">
                                    <Icon icon="fluent:mail-read-32-filled" />
                                    Marcar como lida
                                </button>
                            {/if}
                        </form>
                    {/if}
                </div>
            </article>
        {/each}
    </section>
</div>

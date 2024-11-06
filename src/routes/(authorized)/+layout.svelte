<script lang="ts">
    import Icon from '@iconify/svelte';
    import type { LayoutServerData } from './$types';
    import ThemeToggler from '$lib/components/ThemeToggler.svelte';

    export let data: LayoutServerData;
</script>

<div class="w-full min-h-screen">
    <header
        class="sticky top-0 z-50 flex items-center gap-2 p-4 bg-base-100 border-b border-base-200"
    >
        <div class="flex items-center gap-4">
            <a href="/home">
                <img src="/gallery/icon-no-bg.svg" alt="" class="size-14" />
            </a>

            <div>
                <a href="/home" class="text-2xl font-bold text-primary">Arkhon</a>
                <p class="text-sm opacity-50">Bem-vindo, {data.user.firstname}!</p>
            </div>
        </div>

        <div class="divider divider-horizontal mx-1 max-sm:hidden" />

        <nav class="max-sm:hidden space-x-2">
            <a href="/profile/{data.user.username}" class="link link-primary inline-flex items-center gap-1">
                <Icon icon="mdi:user" />
                Perfil
            </a>
            <a href="/community" class="link link-secondary inline-flex items-center gap-1">
                <Icon icon="fluent:people-community-12-filled" />
                Comunidade
            </a>
        </nav>

        <div class="grow" />

        <ThemeToggler />

        <div class="size-8 dropdown dropdown-end">
            <button tabindex="0">
                <img src={data.user.pfp} alt="" class="rounded-full object-cover size-8" />
            </button>

            <ul
                tabindex="-1"
                class="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
            >
                <li>
                    <a href="/profile/{data.user.username}" class="text-primary">
                        <Icon icon="iconamoon:profile-fill" />
                        Perfil
                    </a>
                </li>

                {#if data.user.notification.inapp}
                    <li>
                        <a href="/notifications">
                            <Icon icon="mdi:bell" />
                            Notificações

                            {#if data.user.unread_notifications > 0}
                                <p class="badge badge-error badge-outline">
                                    {#if data.user.unread_notifications > 99}
                                        +99
                                    {:else}
                                        {data.user.unread_notifications}
                                    {/if}
                                </p>
                            {/if}
                        </a>
                    </li>
                {/if}

                <li>
                    <a href="/settings">
                        <Icon icon="mdi:gear" />
                        Configurações
                    </a>
                </li>

                <div class="divider my-1" />

                <li>
                    <a href="/community/new" class="text-primary">
                        <Icon icon="mdi:plus" />
                        Novo projeto
                    </a>
                </li>

                <li>
                    <a href="/profile/{data.user.username}/trash" class="text-error">
                        <Icon icon="mdi:trash" />
                        Lixeira
                    </a>
                </li>

                <div class="divider my-1" />

                <li>
                    <a href="/logout" class="text-error">
                        <Icon icon="pepicons-pop:leave" />
                        Sair
                    </a>
                </li>
            </ul>
        </div>
    </header>

    <slot />
</div>

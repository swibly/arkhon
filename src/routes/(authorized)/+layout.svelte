<script lang="ts">
    import Icon from '@iconify/svelte';
    import type { LayoutServerData } from './$types';

    export let data: LayoutServerData;
</script>

<div class="w-full min-h-screen">
    <header class="sticky top-0 z-50 flex items-center gap-2 p-4 shadow bg-base-100">
        <div>
            <a href="/home" class="text-2xl font-bold text-primary">Arkhon</a>
            <p class="text-sm opacity-50">Bem-vindo, {data.user.firstname}!</p>
        </div>

        <div class="grow" />

        <label class="swap swap-rotate">
            <input type="checkbox" class="theme-controller" value="dark" />

            <Icon icon="ph:sun-fill" class="swap-off size-6" />
            <Icon icon="ph:moon-fill" class="swap-on size-6" />
        </label>

        <div class="size-8 dropdown dropdown-end">
            <button tabindex="0">
                <img src={data.user.pfp} alt="" class="rounded-full size-8" />
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
                    <a href="/community/new" class="text-secondary">
                        <Icon icon="mdi:plus" />
                        Novo projeto
                    </a>
                </li>

                <li>
                    <a href="/profile/{data.user.username}/projects">
                        <Icon icon="eos-icons:project" />
                        Meus projetos
                    </a>
                </li>

                <li>
                    <a href="/profile/{data.user.username}/favorites">
                        <Icon icon="mdi:heart" />
                        Meus favoritos
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
                    <a href="/community">
                        <Icon icon="fluent:people-community-12-filled" />
                        Comunidade
                    </a>
                </li>

                <li>
                    <a href="/community/store">
                        <Icon icon="mdi:store" />
                        Loja
                    </a>
                </li>

                <div class="divider my-1" />

                <li>
                    <a href="/faq">
                        <Icon icon="mingcute:question-fill" />
                        FAQ
                    </a>
                </li>

                <li>
                    <a href="/support">
                        <Icon icon="streamline:customer-support-1-solid" />
                        Suporte
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

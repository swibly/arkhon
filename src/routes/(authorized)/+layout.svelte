<script lang="ts">
    import Icon from '@iconify/svelte';
    import type { LayoutServerData } from './$types';

    export let data: LayoutServerData;
</script>

<div class="min-h-screen w-full">
    <header class="flex items-center gap-2 p-4 shadow sticky top-0">
        <div>
            <a href="/home" class="text-2xl font-bold text-primary">Arkhon</a>
            <p class="text-sm opacity-50">Bem-vindo, {data.firstname}!</p>
        </div>

        <div class="grow" />

        <label class="swap swap-rotate">
            <input type="checkbox" class="theme-controller" value="dark" />

            <Icon icon="ph:sun-fill" class="swap-off size-8" />
            <Icon icon="ph:moon-fill" class="swap-on size-8" />
        </label>

        <div class="size-8 dropdown dropdown-end">
            <button tabindex="0">
                <img src={data.image_url} alt="" class="rounded-full size-8" />
            </button>

            <ul
                tabindex="-1"
                class="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
            >
                <li>
                    <a href="/profile/{data.username}">
                        <Icon icon="iconamoon:profile-fill" />
                        Perfil
                    </a>
                </li>
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

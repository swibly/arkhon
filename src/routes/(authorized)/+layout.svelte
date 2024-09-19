<script lang="ts">
    import Icon from '@iconify/svelte';
</script>

<div class="min-h-screen w-full">
    <header class="flex items-center gap-2 p-4 shadow sticky top-0">
        <a href="/home" class="text-2xl font-bold text-primary">Arkhon</a>

        <div class="grow" />

        <label class="swap swap-rotate">
            <input type="checkbox" class="theme-controller" value="dark" />

            <Icon icon="ph:sun-fill" class="swap-off size-6" />
            <Icon icon="ph:moon-fill" class="swap-on size-6" />
        </label>

        <div class="size-8 dropdown dropdown-end">
            <button tabindex="0" class="avatar">
                <img
                    src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                    alt=""
                    class="rounded-full"
                />
            </button>

            <ul
                tabindex="-1"
                class="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
            >
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

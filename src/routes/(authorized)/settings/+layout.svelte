<script lang="ts">
    import Icon from '@iconify/svelte';
    import type { LayoutServerData } from './$types';
    import { page } from '$app/stores';

    $: tab = $page.url.searchParams.get('tab')!;

    export let data: LayoutServerData;
</script>

<div class="w-full max-w-7xl mx-auto p-4">
    <header class="flex gap-4 items-center">
        <img src={data.user.pfp} alt="" class="size-28 rounded-full max-md:hidden" />

        <div>
            <h2 class="font-bold text-4xl max-md:text-xl">
                {data.user.firstname}
                {data.user.lastname}
            </h2>

            <p class="opacity-50">@{data.user.username}</p>
        </div>

        <div class="grow" />

        <section class="max-md:hidden shrink-0">
            <a href="/profile/{data.user.username}" class="btn btn-sm btn-primary">
                <Icon icon="iconamoon:profile-fill" />
                Ver perfil
            </a>

            <a href="/logout" class="btn btn-sm btn-error">
                <Icon icon="pepicons-pop:leave" />
                Sair
            </a>
        </section>
    </header>

    <div class="flex mt-4 max-lg:flex-col">
        <aside class="shrink-0 relative max-lg:sticky max-lg:top-[84px]">
            <ul
                class="lg:border-r-2 border-r-base-200 p-4 flex flex-col gap-2 sticky top-[84px] *:justify-start max-lg:flex-row overflow-auto bg-base-100"
            >
                {#each data.validTabs as valid}
                    <a
                        href="?tab={valid}"
                        class="btn btn-sm"
                        class:btn-ghost={tab !== valid}
                        class:btn-primary={tab === valid}
                    >
                        <Icon icon={data.tabsProps[valid].icon} />
                        {data.tabsProps[valid].name}
                    </a>
                {/each}
            </ul>
        </aside>

        <main class="p-4 w-full">
            <div>
                <h1 class="text-2xl text-primary font-bold flex items-center gap-2">
                    <Icon icon={data.tabsProps[tab].icon} />
                    {data.tabsProps[tab].name}
                </h1>

                <p>{data.tabsProps[tab].description}</p>
            </div>

            <div class="divider" />

            <div class="space-y-8">
                <slot />
            </div>
        </main>
    </div>
</div>

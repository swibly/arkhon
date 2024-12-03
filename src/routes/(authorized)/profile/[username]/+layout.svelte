<script lang="ts">
    import { page } from '$app/stores';
    import type { User } from '$lib/user';
    import type { LayoutServerData } from './$types';
    import Icon from '@iconify/svelte';
    import Profile from '$lib/components/Profile.svelte';

    export let data: LayoutServerData & { user: User };

    $: paths = $page.url.pathname.split('/').slice(1);
    $: ghostPath = '';

    $: lookup = data.lookup! as User;
    $: logged = data.user;
    $: isFollowing = data.isFollowing!;
</script>

<svelte:head>
    <title>Perfil de @{$page.params.username} - Swibly Arkhon</title>
</svelte:head>

{#if data.error}
    <main class="w-full min-h-screen flex flex-col justify-center items-center max-w-xl mx-auto">
        <section class="flex items-center gap-4">
            <Icon icon="mingcute:sad-line" class="size-28 text-error max-md:size-28 shrink-0" />

            <div>
                <p class="text-sm" aria-hidden>Ah, não!</p>
                <h1 class="text-3xl font-black text-error max-md:text-2xl">
                    {data.error}
                </h1>
            </div>
        </section>

        <div class="divider" />

        <p class="text-center">
            <span>
                Pode ser que este usuário não exista ou que apenas desabilitou os outros de verem
                seu perfil.
            </span>

            <br />
            <!-- Kinda hacky, but we add this to separate text in mobile -->
            <br class="sm:hidden" />

            <button
                role="link"
                class="link link-primary font-semibold"
                on:click={() => history.back()}
            >
                Volte para página anterior
            </button>
        </p>

        <a href="/home" class="btn btn-primary mt-8 max-sm:btn-sm sm:btn-wide">
            <Icon icon="ic:baseline-home" />
            Página Principal
        </a>
    </main>
{:else}
    <Profile {logged} {lookup} {isFollowing} {paths} {ghostPath}>
        <slot />
    </Profile>
{/if}

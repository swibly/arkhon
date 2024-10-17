<script lang="ts">
    import { page } from '$app/stores';
    import { spawn } from '$lib/toast';
    import type { User } from '$lib/user';
    import { onMount } from 'svelte';
    import type { LayoutServerData } from './$types';
    import Icon from '@iconify/svelte';
    import Profile from '$lib/components/Profile.svelte';
    import Attention from '$lib/components/Attention.svelte';

    export let data: LayoutServerData & User;

    $: paths = $page.url.pathname.split('/').slice(1);
    $: ghostPath = '';

    onMount(() => {
        if (data.error !== undefined) {
            spawn({
                status: 'error',
                message: data.error
            });
        }
    });

    $: lookup = data.lookup! as User;
    $: logged = data as User;
    $: isFollowing = data.isFollowing!;
</script>

<svelte:head>
    <title>Perfil de @{$page.params.username} - Swibly Arkhon</title>
</svelte:head>

{#if data.error}
    <main
        class="w-full min-h-[90dvh] flex flex-col justify-center items-center max-w-xl mx-auto p-4"
    >
        <section class="flex items-center gap-4">
            <Icon icon="mingcute:sad-line" class="size-48 text-error max-md:size-28" />

            <div>
                <p class="text-sm" aria-hidden>Ah, não!</p>
                <h1 class="text-7xl font-black text-error max-md:text-4xl">Erro 404</h1>
                <p class="w-full text-end text-sm" aria-hidden>Not Found</p>
            </div>
        </section>

        <div class="divider" />

        <p class="text-center">
            <span>
                {data.error}
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

        <div>
            <a
                href="/profile/{logged.username}"
                class="btn btn-primary mt-8 max-sm:btn-sm sm:btn-wide"
            >
                <Icon icon="mdi:user" />
                Ir para meu perfil
            </a>

            <a href="/home" class="btn btn-secondary mt-8 max-sm:btn-sm sm:btn-wide">
                <Icon icon="ic:baseline-home" />
                Página Principal
            </a>
        </div>
    </main>
{:else}
    <Profile {logged} {lookup} {isFollowing} {paths} {ghostPath}>
        <slot />
    </Profile>
{/if}

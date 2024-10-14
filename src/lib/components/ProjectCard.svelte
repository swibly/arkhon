<script lang="ts">
    import { enhance } from '$app/forms';
    import UserIcon from '$lib/components/UserIcon.svelte';
    import type { Project } from '$lib/projects';
    import Icon from '@iconify/svelte';

    export let options: Project;
    export let currentUserID: number;
    export let lang: 'pt' | 'en' | 'ru';

    const limit = 5;
    const users = [
        ...options.allowed_users.slice(0, limit - 1).map((user) => ({
            name: user.username,
            pfp: user.profile_picture
        })),
        { name: options.owner_username, pfp: options.owner_profile_picture }
    ];
</script>

<article class="w-full p-4 rounded-lg shadow max-w-96">
    <header class="flex justify-center items-center">
        <div>
            <h2 class="text-xl font-bold">{options.name}</h2>
        </div>

        <div class="grow" />

        {#if options.is_favorited}
            <form
                action="/community/projects/{options.id}?/unfavorite"
                method="POST"
                use:enhance={function () {}}
                class="flex items-center gap-1"
            >
                {options.total_favorites.toLocaleString(lang, {
                    notation: 'compact',
                    compactDisplay: 'short'
                })}
                <button type="submit">
                    <Icon icon="material-symbols:favorite" class="text-error" />
                </button>
            </form>
        {:else}
            <form
                action="/community/projects/{options.id}?/favorite"
                method="POST"
                use:enhance={function () {}}
                class="flex items-center gap-1"
            >
                {options.total_favorites.toLocaleString(lang, {
                    notation: 'compact',
                    compactDisplay: 'short'
                })}
                <button type="submit">
                    <Icon icon="material-symbols:favorite-outline" class="text-error" />
                </button>
            </form>
        {/if}
    </header>

    <img
        src="https://placehold.co/600x400"
        alt=""
        class="w-full h-48 object-cover my-4 rounded-md"
    />

    <section class="flex gap-2 mb-4">
        <p class="line-clamp-3 text-justify">{options.description}</p>

        <div>
            <UserIcon {users} overflow={options.allowed_users.length + 1 - limit} />
        </div>
    </section>

    <section class="flex">
        <p class="flex items-center gap-1">
            <Icon icon="mdi:calendar" />
            Criado:
            <span class="font-bold">
                {new Date(options.created_at).toLocaleDateString(lang, {
                    day: '2-digit',
                    month: '2-digit'
                })}
            </span>
        </p>

        <div class="mx-auto divider divider-horizontal" />

        <p class="flex items-center gap-1">
            <Icon icon="mdi:calendar" />
            Editado:
            <span class="font-bold">
                {new Date(options.updated_at).toLocaleDateString(lang, {
                    day: '2-digit',
                    month: '2-digit'
                })}
            </span>
        </p>
    </section>

    <section class="flex gap-2 *:grow">
        <a href="/community/projects/{options.id}" class="btn btn-primary btn-sm mt-4">
            <Icon icon="fa6-solid:magnifying-glass" />
            Ver projeto
        </a>

        {#if currentUserID === options.owner_id || options.allowed_users.filter((x) => x.id === currentUserID && x.allow_edit === true).length > 0}
            <a href="/community/projects/{options.id}/edit" class="btn btn-secondary btn-sm mt-4">
                <Icon icon="mdi:pen" />
                Editar projeto
            </a>
        {/if}
    </section>
</article>

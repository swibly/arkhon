<script lang="ts">
    import Icon from '@iconify/svelte';

    export let id: number;
    export let selfID: number;
    export let firstname: string;
    export let lastname: string;
    export let username: string;
    export let pfp: string;
    export let verified: boolean;
</script>

<div class="flex flex-col gap-4 p-4 lg:min-w-96 rounded-2xl shadow">
    <div class="flex items-center gap-2">
        <img src={pfp} alt="" class="rounded-full size-16" />

        <div>
            <h2 class="flex items-center justify-center gap-1 text-xl">
                {firstname}
                {lastname}

                {#if id === selfID}
                    <span class="text-sm text-primary">(você)</span>
                {/if}

                {#if verified}
                    <div class="tooltip" data-tip="Verificado">
                        <Icon icon="material-symbols:verified" class="text-primary" />
                    </div>
                {/if}
            </h2>
            <p class="text-sm opacity-70">@{username}</p>
        </div>
    </div>

    <section class="flex gap-2">
        <a href="/profile/{username}" class="btn btn-sm btn-primary grow">
            <Icon icon="mdi:user" />
            Ver perfil
        </a>
    </section>
</div>

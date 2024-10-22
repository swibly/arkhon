<script lang="ts">
    import Icon from '@iconify/svelte';

    export let selfID: number;

    export let id: number;
    export let pfp: string;
    export let firstname: string;
    export let lastname: string;
    export let username: string;
    export let verified: boolean;
</script>

<div class="flex flex-col gap-4 p-4 lg:min-w-96 rounded-xl border border-base-200">
    <div class="flex items-center gap-2">
        <img src={pfp} alt="" class="rounded-full object-cover size-16" />

        <div>
            <h2 class="flex items-center justify-center gap-1 text-xl">
                <a href="/profile/{username}" class="link link-primary">
                    {firstname}
                    {lastname}
                </a>

                {#if verified}
                    <div class="tooltip" data-tip="Verificado">
                        <Icon icon="material-symbols:verified" class="text-primary" />
                    </div>
                {/if}

                {#if id === selfID}
                    <span class="text-sm text-primary">(você)</span>
                {/if}
            </h2>
            <p class="text-sm opacity-70">@{username}</p>
        </div>
    </div>

    <div>
        <slot />
    </div>
</div>

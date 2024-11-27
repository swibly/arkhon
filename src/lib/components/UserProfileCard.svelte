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

<div class="flex flex-col gap-4 p-4 w-full lg:min-w-96 rounded-xl border border-base-200">
    <div class="flex items-center gap-2">
        <div class="relative shrink-0">
            <img src={pfp} alt="" class="rounded-full object-cover size-16" />

            {#if verified}
                <div
                    class="tooltip absolute -right-1 -bottom-1 bg-base-100 rounded-full border-2 border-base-100"
                    data-tip="Verificado"
                >
                    <Icon icon="material-symbols:verified" class="text-primary size-5" />
                </div>
            {/if}
        </div>

        <div>
            <a href="/profile/{username}" class="link link-primary text-xl line-clamp-1">
                {firstname}
                {lastname}
            </a>

            <p class="text-sm opacity-70">
                @{username}

                {#if id === selfID}
                    <span class="text-sm text-primary">(você)</span>
                {/if}
            </p>
        </div>
    </div>

    <div>
        <slot />
    </div>
</div>

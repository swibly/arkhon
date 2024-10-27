<script lang="ts">
    import Icon from '@iconify/svelte';
    import type { LayoutServerData } from './$types';

    export let data: LayoutServerData;
</script>

{#if data.project.deleted_at !== null}
    <p
        class="p-2 w-full bg-warning text-black flex justify-center items-center gap-2 sticky top-[85px]"
    >
        <Icon icon="mdi:alert" />
        Este projeto está na lixeira do dono. Você pode estar vendo uma versão antiga.
    </p>
{/if}

<slot />

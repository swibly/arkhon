<script lang="ts">
    import Icon from '@iconify/svelte';

    export let data: number;
    export let likes: number;
    export let banner: string;
    export let alt: string;
    export let author: string;
    export let tags: string[];
    export let special: boolean = false;
    export let hidden: boolean = false;
    export let show: boolean = false;
</script>

<div
    class="card w-full h-60 md:w-80 md:h-92 bg-neutral shadow-xl mx-4 md:mx-12 mb-8"
    class:card-special={special}
    class:card-hidden={!hidden}
    class:card-hidden-default={hidden}
    class:card-show={!show}
    class:card-show-default={show}
>
    <div class="flex justify-between p-5">
        <h2>{Intl.DateTimeFormat('pt-br').format(data)}</h2>
        <div class="flex gap-4 items-center">
            <h2>
                {Intl.NumberFormat('en-us', {
                    notation: 'compact',
                    compactDisplay: 'short'
                }).format(likes)}
            </h2>
            <Icon icon="mdi:heart-outline" />
        </div>
    </div>
    <figure class="rounded-lg"><img src="/gallery/placeholder01.png" alt="Project" class="object-center px-5" /></figure>
    <div class="card-body">
        <div class="flex gap-2 align-items">
            <Icon icon="mingcute:user-4-line" />
            <h2 class="card-title text-sm">{author}</h2>
        </div>
        <p class="text-justify text-sm">
            <slot />
        </p>
        <div class="card-actions pt-4">
            {#each tags as tag}
                <div class="badge badge-outline">{tag}</div>
            {/each}
        </div>
    </div>
</div>
{#if special}
    <div class="flex justify-center gap-2 items-center mt-4 mb-12">
        <Icon icon="material-symbols:trophy" font-size="50" />
        <h1 class="text-2xl font-bold">Mais avaliado!</h1>
    </div>
{/if}

<style>
    .card-special {
        background-color: rgb(202 138 4);
    }

    @media only screen and (max-width: 1440px) {
        .card-hidden-default {
            display: none;
        }
    }

    @media only screen and (min-width: 1440px) {
        .card-show-default {
            display: none;
        }
    }

    @media only screen and (max-width: 960px) {
        .card-default {
            margin-bottom: 50px;
        }
    }
</style>

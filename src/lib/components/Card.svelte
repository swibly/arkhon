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

<div class="group">
    <div
        class="card w-72 bg-base-100 shadow-xl text-white mx-12 p-5"
        class:card-special={special}
        class:card-default={!special}        
        class:card-hidden={hidden}        
        class:card-show={show}
    >
        <div class="flex justify-between pb-4">
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
        <figure>
            <img src={banner} {alt} class="rounded-xl" />
        </figure>
        <div class="card-body">
            <div class="grid place-items-center">
                <Icon icon="mingcute:user-4-line" />
                <h2 class="card-title text-sm">{author}</h2>
            </div>
            <div class="text-justify text-sm text-ellipsis overflow-hidden whitespace-nowrap hidden md:inline">
                <slot />
            </div>
            <div class="card-actions pt-4 flex justify-center">
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
</div>

<style>
    .card-special {
        background-color: rgb(202 138 4);
    }

    .card-default {
        background-color: rgb(3 105 161);
    }

    @media only screen and (max-width: 1152px) {
        .card-hidden {
            display: none;
        }
    }

    @media only screen and (min-width: 1152px) {
        .card-show {
            display: none;
        }
    }

    @media only screen and (max-width: 960px) {
        .card-default {
            margin-bottom: 50px;
        }
    }
</style>
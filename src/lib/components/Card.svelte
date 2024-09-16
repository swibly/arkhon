<script lang="ts">
    import Icon from '@iconify/svelte';

    export let title: string;
    export let date: Date;
    export let likes: number;
    export let banner: string;
    export let alt: string;
    export let authors: string[];
    export let tags: string[];
</script>

<article class="flex flex-col gap-4 p-5 mx-12 rounded-md shadow-md max-w-96">
    <h2 class="text-2xl font-bold">{title}</h2>

    <figure>
        <img src={banner} {alt} class="rounded-md" />
    </figure>

    <section class="flex justify-between">
        <h2>
            <Icon icon="mdi:calendar" class="inline" />
            {date.toLocaleString('pt-br', { day: 'numeric', month: 'short', year: 'numeric' })}
        </h2>

        <h2>
            <Icon icon="mdi:heart" class="inline" />

            <span>
                {likes.toLocaleString('pt-br', { notation: 'compact' })}
            </span>
        </h2>
    </section>

    <section class="items-center -space-x-4 avatar-group rtl:space-x-reverse">
        {#each authors as author}
            <div class="avatar">
                <div class="size-8">
                    <img
                        src={`https://api.dicebear.com/9.x/thumbs/svg?seed=${encodeURI(author)}`}
                        alt={author}
                    />
                </div>
            </div>
        {/each}

        {authors.join(', ')}
    </section>

    <p class="line-clamp-3">
        <slot />
    </p>

    <section class="flex gap-1 flex-end">
        {#each tags as tag}
            <p class="badge badge-outline">{tag}</p>
        {/each}
    </section>
</article>

<script lang="ts">
    import Icon from '@iconify/svelte';

    export let data: number;
    export let likes: number;
    export let tags: string[];

    let modalRef: any;

    function showModal() {
        if (modalRef) {
            modalRef.showModal();
        }
    }
</script>

<div class="w-full h-80 group grid grid-cols-1 place-items-center">
    <div
        class="card card-compact w-full h-72 md:w-full md:h-72 lg:w-full lg:h-72 shadow-xl transition-all duration-150 ease-in-out group-hover:sm:w-96 group-hover:sm:h-64 group-hover:md:w-72 group-hover:md:h-40 group-hover:2xl:w-64 group-hover:2xl:h-40 border border-secondary border-2 my-4"
        on:click={showModal}
    >
        <figure class="hover:hidden">
            <img src="/gallery/placeholder02.jpg" alt="Project" class="object-center" />
        </figure>
        <div class="card-body">
            <div class="hidden hover:flex hover:justify-between hover:pb-4">
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
            <h2 class="card-title text-center">Título</h2>
            <div
                class="text-justify text-sm text-ellipsis overflow-hidden whitespace-nowrap hidden md:inline"
            >
                <slot />
            </div>
            <div class="card-actions pt-2 flex justify-center">
                {#each tags as tag}
                    <div class="badge badge-outline">{tag}</div>
                {/each}
            </div>
        </div>
    </div>
</div>

<dialog id="my_modal_1" bind:this={modalRef} class="modal">
    <div class="modal-box max-w-full">
        <form method="dialog">
            <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
        </form>
        <h1 class="font-bold text-5xl">Título</h1>
        <div class="flex mt-4 justify-between flex-wrap">
            <div class="sm:flex">
                <div class="flex">
                    <Icon icon="gg:profile" class="mt-2 mr-2" font-size="30px" />
                    <p class="text-md pt-2">De Placeholder</p>
                </div>
                <div class="invisible sm:visible sm:divider sm:divider-horizontal sm:h-6 sm:mt-2" />
                <p class="pt-4 sm:text-md sm:pt-2 sm:mr-4">Editado há 3 dias</p>
            </div>
            <button class="btn btn-secondary btn-sm mt-2">Visualizar</button>
        </div>

        <h1 class="text-md pt-4">Descrição:</h1>
        <p class="text-sm text-justify pt-2">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Rem, earum mollitia quidem
            placeat, fugiat natus aliquid consectetur nesciunt praesentium et sequi autem quos,
            explicabo odio vel! Asperiores consequuntur quaerat debitis!Lorem ipsum dolor, sit amet
            consectetur adipisicing elit. Rem, earum mollitia quidem placeat, fugiat natus aliquid
            consectetur nesciunt praesentium et sequi autem quos, explicabo odio vel! Asperiores
            consequuntur quaerat debitis!Lorem ipsum dolor, sit amet consectetur adipisicing elit.
            Rem, earum mollitia quidem placeat, fugiat natus aliquid consectetur nesciunt
            praesentium et sequi autem quos, explicabo odio vel! Asperiores consequuntur quaerat
            debitis!Lorem ipsum dolor, sit amet consectetur adipisicing elit. Rem, earum mollitia
            quidem placeat, fugiat natus aliquid consectetur nesciunt praesentium et sequi autem
            quos, explicabo odio vel! Asperiores consequuntur quaerat debitis!Lorem ipsum dolor, sit
            amet consectetur adipisicing elit. Rem, earum mollitia quidem placeat, fugiat natus
            aliquid consectetur nesciunt praesentium et sequi autem quos, explicabo odio vel!
            Asperiores consequuntur quaerat debitis!Lorem ipsum dolor, sit amet consectetur
            adipisicing elit. Rem, earum mollitia quidem placeat, fugiat natus aliquid consectetur
            nesciunt praesentium et sequi autem quos, explicabo odio vel! Asperiores consequuntur
            quaerat debitis!
        </p>
        <figure>
            <img
                src="/gallery/placeholder01.png"
                alt="Project"
                class="object-cover object-center w-full h-96 mt-8 rounded-xl border border-secondary border-4"
            />
        </figure>
    </div>
</dialog>

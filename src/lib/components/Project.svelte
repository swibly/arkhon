<script lang="ts">
    import Icon from '@iconify/svelte';

    export let favorite: boolean = false;

    let modalRef: any;

    function showModal() {
        if (modalRef) {
            modalRef.showModal();
        }
    }
</script>

<div
    class="card card-compact w-full h-40 sm:w-full sm:h-40 shadow-xl transition-all duration-150 ease-in-out hover:w-64 hover:h-40 sm:hover:w-72 sm:hover:h-48 2xl:hover:w-64 2xl:hover:h-44 border border-primary border-2 my-4"
    on:click={showModal}
>
    <figure><img src="/gallery/placeholder01.png" alt="Project" class="object-center" /></figure>
    <div class="card-body">
        <div class="flex align-items justify-between">
            <h2 class="card-title">Título</h2>
            {#if favorite}
                <Icon icon="material-symbols:star" class="mt-2" />
            {/if}
        </div>
        <p>Editado há 3 dias</p>
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
                {#if favorite}
                <div class="invisible sm:visible sm:divider sm:divider-horizontal sm:h-6 sm:mt-2" />
                    <p class="text-md sm:pt-2 sm:pr-12 text-primary">Favoritado</p>
                {/if}
            </div>
            {#if favorite}
                <button class="btn btn-primary btn-sm mt-2">Visualizar</button>
            {:else}
                <button class="btn btn-primary btn-sm mt-2">Editar</button>
            {/if}
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
                class="object-cover object-center w-full h-96 mt-8 rounded-xl border border-primary border-4"
            />
        </figure>
    </div>
</dialog>

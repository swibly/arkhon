<script lang="ts">
    import Icon from '@iconify/svelte';

    let modalRef: any;

    function showModal() {
        if (modalRef) {
            modalRef.showModal();
        }
    }
</script>

<div
    class="card card-compact w-full h-40 sm:w-full sm:h-40 shadow-xl transition-all duration-150 ease-in-out hover:w-64 hover:h-40 sm:hover:w-40 sm:hover:h-48 border border-primary border-2 my-4"
    on:click={showModal}
>
    <div class="card-body">
        <div class="grid place-items-center">
            <Icon icon="material-symbols:chair" font-size="70px" />
            <p class="text-lg font-semibold text-center">Nome do Componente</p>
        </div>
    </div>
</div>

<dialog id="my_modal_1" bind:this={modalRef} class="modal">
    <div class="modal-box max-w-[700px] lg:max-w-[1000px]">
        <form method="dialog">
            <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
        </form>
        <div
            class="grid place-items-center lg:flex lg:justify-center lg:items-center lg:gap-12 my-12"
        >
            <div class="component">
                <Icon icon="material-symbols:chair"/>
            </div>
            <div class="w-full">
                <h1 class="text-4xl sm:text-5xl font-bold">Nome do Componente</h1>
                <h1 class="pt-4 text-md sm:text-lg text-primary">Criado por Usuário</h1>
                <div class="flex mt-2">
                    {#each Array(4) as i}
                        <Icon icon="material-symbols:star" />
                    {/each}
                    <Icon icon="material-symbols:star-half" />
                </div>
                <div class="flex items-center">
                    <h1 class="text-3xl">300</h1>
                    <figure>
                        <img src="/gallery/Arkhoin.png" alt="Arkhoin" class="w-12 -ml-1" />
                    </figure>
                </div>
                <button class="btn btn-primary w-full mt-4">Comprar</button>
                <div class="divider" />
                <h1 class="text-lg sm:text-xl">Descrição:</h1>
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam accusamus a
                    dolorem! Culpa quibusdam ad voluptate eveniet dolores, quos alias laboriosam
                    voluptas est officia obcaecati iste voluptatem! Debitis, dicta maiores?
                </p>
            </div>
        </div>
    </div>
</dialog>

<style>
    @media(min-width: 1024px){
        .component{
            font-size: 400px;
        }
    }

    @media(max-width: 1024px){
        .component{
            font-size: 250px;
        }
    }
</style>

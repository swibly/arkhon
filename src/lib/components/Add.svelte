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
    class="card card-compact w-full h-40 sm:w-full sm:h-40 bg-base-300 shadow-xl transition-all duration-150 ease-in-out hover:w-64 hover:h-40 sm:hover:w-72 sm:hover:h-48 2xl:hover:w-64 2xl:hover:h-44 border border-secondary border-2"
    on:click={showModal}
>
    <div class="card-body">
        <div class="flex justify-center items-center h-full">
            <Icon icon="typcn:plus" font-size="60px" />
        </div>
    </div>
</div>

<dialog id="my_modal_2" bind:this={modalRef} class="modal">
    <div class="modal-box">
        <form method="dialog">
            <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
        </form>
        <h1 class="font-bold text-3xl sm:text-5xl text-center">Criar novo projeto</h1>
        <div class="flex justify-center">
            <form class="mt-4 sm:mt-12">
                <label class="input input-bordered flex items-center gap-2 w-full sm:w-96">
                    <input type="text" placeholder="Nome do Projeto" />
                </label>
                <textarea
                    placeholder="Descrição"
                    class="textarea textarea-bordered textarea-md w-full sm:w-96 block my-4"
                />
                <a href="/editor/"><button class="btn btn-primary w-full">Criar</button></a>
            </form>
        </div>
    </div>
</dialog>

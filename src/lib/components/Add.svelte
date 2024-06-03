<script lang="ts">
    import Icon from '@iconify/svelte';    
</script>

<div
    class="card card-compact w-full h-40 sm:w-64 sm:h-40 bg-base-300 shadow-xl transition-all duration-150 ease-in-out sm:hover:w-72 sm:hover:h-48 border border-primary"
    onclick="my_modal_2.showModal()"
>
    <div class="card-body">
        <div class="flex justify-center items-center h-full">
            <Icon icon="typcn:plus" font-size="60px" />
        </div>
    </div>
</div>

<dialog id="my_modal_2" class="modal">
    <div class="modal-box max-w-full ">
        <form method="dialog">
            <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
        </form>
        <h1 class="font-bold text-5xl text-center">Título</h1>        
    </div>
</dialog>

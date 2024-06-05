<script lang="ts">
    import Icon from '@iconify/svelte';
</script>

<a href="/store/page/">
    <div
        class="card card-compact w-full h-40 sm:w-full sm:h-40 shadow-xl transition-all duration-150 ease-in-out hover:w-64 hover:h-40 sm:hover:w-40 sm:hover:h-48 border border-primary border-2 my-4"
        onclick="my_modal_1.showModal()"
    >
        <div class="card-body">
            <div class="grid place-items-center">
                <Icon icon="material-symbols:chair" font-size="70px" />
                <p class="text-lg font-semibold text-center">Nome do Componente</p>
            </div>
        </div>
    </div>
</a>

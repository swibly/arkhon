<script lang="ts">
    import { getActive, remove, group, ungroup, lock, unlock } from '$lib/editor/objects';
    import { type Canvas } from 'fabric';
    import { bringFront, sendBack, sendBackward, sendForward } from '$lib/editor/layers'
    import { onMount } from 'svelte';

    let rightMenu: HTMLElement;
    let buttonInside: boolean;
    export let canvas: Canvas;

    onMount(() => {
        addEventListener('contextmenu', (e) => {
            e.preventDefault();            

            if (rightMenu) {
                rightMenu.style.display = 'block';
                rightMenu.style.left = e.pageX - 200 * ~~(e.pageX > window.innerWidth - 200) + 'px';
                rightMenu.style.top = e.pageY - 470 * ~~(e.pageY > window.innerHeight - 470) + 'px';
            }
        });

        addEventListener('mousedown', (e) => {
            let leftButton = e.which;

            if (leftButton === 1) {
                if (buttonInside) {
                    rightMenu.style.display = 'block';
                    buttonInside = false;
                } else {
                    if (rightMenu) {
                        rightMenu.style.display = 'none';
                        buttonInside = false;
                    }
                }
            }
        });

        rightMenu.addEventListener('mousedown', () => {
            buttonInside = true;
        });
    });
</script>

<article
    bind:this={rightMenu}
    class="absolute hidden bg-base-300 shadow-md rounded-lg w-48 mt-2 z-50"
>
    <ul role="menu" aria-labelledby="menu-button" class="menu vertical div space-y-2">
        <li on:click={() => remove(canvas, ...getActive(canvas))}>
            <a href="#" class="hover:bg-secondary block px-4 py-2 text-sm">Deletar</a>
        </li>
        <li on:click={() => group(canvas)}>
            <a href="#" class="hover:bg-secondary block px-4 py-2 text-sm">Agrupar</a>
        </li>
        <li on:click={() => ungroup(canvas)}>
            <a href="#" class="hover:bg-secondary block px-4 py-2 text-sm">Desagrupar</a>
        </li>
        <li on:click={() => lock(canvas)}>
            <a href="#" class="hover:bg-secondary block px-4 py-2 text-sm">Travar</a>
        </li>
        <li on:click={() => unlock(canvas)}>
            <a href="#" class="hover:bg-secondary block px-4 py-2 text-sm">Destravar</a>
        </li>
        <li on:click={() => sendBackward(canvas)}>
            <a href="#" class="hover:bg-secondary block px-4 py-2 text-sm">Mandar para trás</a>
        </li>
        <li on:click={() => sendBack(canvas)}>
            <a href="#" class="hover:bg-secondary block px-4 py-2 text-sm">Mandar para o fundo</a>
        </li>
        <li on:click={() => sendForward(canvas)}>
            <a href="#" class="hover:bg-secondary block px-4 py-2 text-sm">Trazer para frente</a>
        </li>
        <li on:click={() => bringFront(canvas)}>
            <a href="#" class="hover:bg-secondary block px-4 py-2 text-sm">Trazer para o topo</a>
        </li>
    </ul>
</article>

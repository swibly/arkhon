<script lang="ts">
    import {
        getActive,
        remove,
        removeGroup,
        group,
        ungroup,
        lock,
        unlock,
        setInfo,
        changeMaterial
    } from '$lib/editor/objects';
    import { type FabricObject, type Canvas } from 'fabric';
    import { bringFront, sendBack, sendBackward, bringForward } from '$lib/editor/layers';
    import { onMount } from 'svelte';
    import { spawn } from '$lib/toast';
    import Icon from '@iconify/svelte';
    import type { Project } from '$lib/projects';
    import { enhance } from '$app/forms';
    import QuestionMark from './QuestionMark.svelte';

    let rightMenu: HTMLElement;
    let buttonInside: boolean;
    let modalRef: HTMLDialogElement;
    let editModalRef: HTMLDialogElement;
    let deleteModalRef: HTMLDialogElement;
    let singleObject: FabricObject | undefined;
    let finalObject: FabricObject;

    export let canvas: Canvas;
    export let data: Project;

    onMount(() => {
        addEventListener('load', () => {
            canvas.on('selection:created', () => {
                if (getActive(canvas).length === 1) {
                    singleObject = getActive(canvas)[0];
                    finalObject = singleObject;
                } else {
                    singleObject = undefined;
                }

                if (modalRef.open || editModalRef.open) {
                    canvas.discardActiveObject();
                }
            });

            canvas.on('selection:updated', () => {
                if (getActive(canvas).length === 1) {
                    singleObject = getActive(canvas)[0];
                    finalObject = singleObject;
                } else {
                    singleObject = undefined;
                }
            });

            canvas.on('selection:cleared', () => {
                singleObject = undefined;
            });
        });

        addEventListener('contextmenu', (e) => {
            e.preventDefault();

            if (rightMenu) {
                rightMenu.style.display = 'block';
                rightMenu.style.left = e.pageX - 200 * ~~(e.pageX > canvas.width - 200) + 'px';
                rightMenu.style.top = e.pageY - 500 * ~~(e.pageY > canvas.height - 375) + 'px';
            }
        });

        addEventListener('mousedown', (e) => {
            let leftButton = e.which;

            console.log(getActive(canvas)[0]);

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

    function showModal() {
        if (
            modalRef &&
            typeof singleObject === 'object' &&
            singleObject.type !== 'i-text' &&
            singleObject.type !== 'path' &&
            // @ts-ignore
            !singleObject.isComponent
        ) {
            modalRef.showModal();
            canvas.discardActiveObject();
        } else {
            spawn({ message: 'Selecione um objeto válido' });
        }
    }

    function showEditModal() {
        if (
            editModalRef &&
            singleObject &&
            // @ts-ignore
            singleObject.isComponent
        ) {
            editModalRef.showModal();
            canvas.discardActiveObject();
        } else {
            spawn({ message: 'Selecione um componente' });
        }
    }

    function showDeleteModal() {
        if (
            editModalRef &&
            singleObject &&
            // @ts-ignore
            singleObject.isComponent
        ) {
            deleteModalRef.showModal();
            canvas.discardActiveObject();
        } else {
            spawn({ message: 'Selecione um componente' });
        }
    }
</script>

<article
    bind:this={rightMenu}
    class="absolute hidden bg-base-300 shadow-md rounded-lg w-48 mt-2 z-50"
>
    <ul role="menu" aria-labelledby="menu-button" class="menu vertical div space-y-2">
        <li>
            <details>
                <summary>Funções básicas</summary>
                <ul>
                    <li
                        on:click={() => removeGroup(canvas, ...getActive(canvas))}
                        on:click={() => remove(canvas, ...getActive(canvas))}
                    >
                        <a href="#" class="hover:bg-secondary block px-4 py-2 text-sm">Deletar</a>
                    </li>
                    <li on:click={() => group(canvas)}>
                        <a href="#" class="hover:bg-secondary block px-4 py-2 text-sm">Agrupar</a>
                    </li>
                    <li on:click={() => ungroup(canvas)}>
                        <a href="#" class="hover:bg-secondary block px-4 py-2 text-sm">Desagrupar</a
                        >
                    </li>
                    <li on:click={() => lock(canvas)}>
                        <a href="#" class="hover:bg-secondary block px-4 py-2 text-sm">Travar</a>
                    </li>
                    <li on:click={() => unlock(canvas)}>
                        <a href="#" class="hover:bg-secondary block px-4 py-2 text-sm">Destravar</a>
                    </li>
                </ul>
            </details>
        </li>
        <li>
            <details>
                <summary> Camadas </summary>
                <ul>
                    <li on:click={() => sendBackward(canvas)}>
                        <a href="#" class="hover:bg-secondary block px-4 py-2 text-sm"
                            >Mandar para trás</a
                        >
                    </li>
                    <li on:click={() => sendBack(canvas)}>
                        <a href="#" class="hover:bg-secondary block px-4 py-2 text-sm"
                            >Mandar para o fundo</a
                        >
                    </li>
                    <li on:click={() => bringForward(canvas)}>
                        <a href="#" class="hover:bg-secondary block px-4 py-2 text-sm"
                            >Trazer para frente</a
                        >
                    </li>
                    <li on:click={() => bringFront(canvas)}>
                        <a href="#" class="hover:bg-secondary block px-4 py-2 text-sm"
                            >Trazer para o topo</a
                        >
                    </li>
                </ul>
            </details>
        </li>
        <li>
            <details>
                <summary> Material </summary>
                <ul>
                    <li on:click={() => changeMaterial(getActive(canvas), 'cimento')}>
                        <a href="#" class="hover:bg-secondary block px-4 py-2 text-sm">Cimento</a>
                    </li>

                    <li on:click={() => changeMaterial(getActive(canvas), 'azulejo')}>
                        <a href="#" class="hover:bg-secondary block px-4 py-2 text-sm">Azulejo</a>
                    </li>

                    <li on:click={() => changeMaterial(getActive(canvas), 'porcelanato')}>
                        <a href="#" class="hover:bg-secondary block px-4 py-2 text-sm"
                            >Porcelanato</a
                        >
                    </li>

                    <li on:click={() => changeMaterial(getActive(canvas), 'madeira')}>
                        <a href="#" class="hover:bg-secondary block px-4 py-2 text-sm"
                            >Madeira</a
                        >
                    </li>

                    <li on:click={() => changeMaterial(getActive(canvas), 'cerâmica')}>
                        <a href="#" class="hover:bg-secondary block px-4 py-2 text-sm"
                            >Cerâmica</a
                        >
                    </li>
                </ul>
            </details>
        </li>
        <li>
            <details>
                <summary> Componentes </summary>
                <ul>
                    <li on:click={showModal}>
                        <a href="#" class="hover:bg-secondary block px-4 py-2 text-sm"
                            >Criar componente</a
                        >
                    </li>

                    <li on:click={showEditModal}>
                        <a href="#" class="hover:bg-secondary block px-4 py-2 text-sm"
                            >Editar componente</a
                        >
                    </li>

                    <li on:click={showDeleteModal}>
                        <a href="#" class="hover:bg-secondary block px-4 py-2 text-sm"
                            >Excluir componente</a
                        >
                    </li>
                </ul>
            </details>
        </li>
    </ul>
</article>

<dialog id="my_modal_3" class="modal" bind:this={modalRef}>
    <div class="modal-box">
        <form method="dialog">
            <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
        </form>
        <form
            method="POST"
            action={`/community/projects/${data.id}/edit?/create`}
            use:enhance={({ formData }) => {
                formData.set('content', JSON.stringify(finalObject));

                modalRef.close();

                return ({ result }) => {
                    setInfo(
                        finalObject,
                        String(formData.get('name')),
                        Number(formData.get('price')),
                        //@ts-ignore
                        result.data.lastComponent.id,
                        String(formData.get('description')),
                        Number(formData.get('arkhoins')),
                        Boolean(formData.get('isPublic'))
                    );
                };
            }}
        >
            <section class="flex flex-col justify-center items-center mx-8">
                <h3 class="text-xl text-center font-bold">
                    Transforme seu objeto em um componente
                </h3>
                <label class="flex items-center gap-2 input input-bordered w-full h-8 mt-4">
                    <Icon icon="iconamoon:component-fill" />
                    <input type="text" name="name" placeholder="Nome do componente" required />
                </label>
                <textarea
                    class="flex items-center gap-2 input input-bordered w-full h-32 mt-4 pt-2"
                    placeholder="Descrição"
                    name="description"
                    maxlength="5000"
                />
                <section class="w-full grid grid-cols-2 place-items-center gap-2">
                    <label class="flex items-center gap-2 input input-bordered w-full h-8 mt-4">
                        <span><Icon icon="entypo:price-tag" /></span>
                        <input
                            type="number"
                            name="price"
                            class="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                            required
                            placeholder="Preço (R$)"
                        />
                    </label>
                    <label class="flex items-center gap-2 input input-bordered w-full h-8 mt-4">
                        <span><Icon icon="mdi:coins" /></span>
                        <input
                            type="number"
                            name="arkhoins"
                            class="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                            placeholder="Preço (Arkhoins)"
                            required
                        />
                    </label>
                </section>

                <label class="flex items-center gap-2 mt-4 w-full">
                    <input
                        type="checkbox"
                        name="isPublic"
                        class="checkbox checkbox-sm checkbox-primary"
                    />
                    <p class="text-md font-semibold">Publicar na loja</p>
                    <QuestionMark>
                        Ao marcar essa opção o seu objeto será postado publicamente na loja valendo
                        a quantidade de Arkhoins na qual você definiu.
                    </QuestionMark>
                </label>
                <button type="submit" class="btn btn-sm btn-primary w-full mt-4">
                    <Icon icon="mdi:plus" />
                    Criar componente
                </button>
            </section>
        </form>
    </div>
</dialog>

<dialog id="my_modal_3" class="modal" bind:this={editModalRef}>
    <div class="modal-box">
        <form method="dialog">
            <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
        </form>
        <form
            method="POST"
            action={`/community/projects/${data.id}/edit?/edit`}
            use:enhance={({ formData }) => {
                if (!formData.get('name')) {
                    // @ts-ignore
                    formData.set('newName', String(finalObject.name));
                } else {
                    // @ts-ignore
                    formData.set('newName', formData.get('name'));
                }

                if (!formData.get('description')) {
                    formData.set(
                        'newDescription',
                        // @ts-ignore
                        String(finalObject.description)
                    );
                } else {
                    // @ts-ignore
                    formData.set('newDescription', formData.get('description'));
                }

                if (!formData.get('price')) {
                    // @ts-ignore
                    formData.set('newPrice', String(finalObject.price));
                } else {
                    // @ts-ignore
                    formData.set('newPrice', formData.get('price'));
                }

                if (!formData.get('arkhoins')) {
                    // @ts-ignore
                    formData.set('newArkhoins', String(finalObject.arkhoins));
                } else {
                    // @ts-ignore
                    formData.set('newArkhoins', formData.get('arkhoins'));
                }

                if (formData.get('isPublic') === null) {
                    formData.set('newPublic', 'false');
                } else {
                    formData.set('newPublic', 'true');
                }

                formData.set('content', JSON.stringify(finalObject));
                // @ts-ignore
                formData.set('id', String(finalObject.id));

                editModalRef.close();

                return ({ result }) => {
                    setInfo(
                        finalObject,
                        String(formData.get('newName')),
                        Number(formData.get('newPrice')),
                        // @ts-ignore
                        finalObject.id,
                        String(formData.get('newDescription')),
                        Number(formData.get('newArkhoins')),
                        String(formData.get('newPublic')) === 'false' ? false : true
                    );

                    // @ts-ignore

                    // console.log(result);
                    // if(result.data.message !== "Ok"){
                    //     // @ts-ignore
                    //     // spawn({ message: result.data.message });
                    //     console.log("A");
                    // }
                };
            }}
        >
            <section class="flex flex-col justify-center items-center mx-8">
                <h3 class="text-xl text-center font-bold">Editar informações do seu componente</h3>
                <label class="flex items-center gap-2 input input-bordered w-full h-8 mt-4">
                    <Icon icon="iconamoon:component-fill" />
                    <input type="text" name="name" placeholder="Nome do componente" />
                </label>
                <textarea
                    class="flex items-center gap-2 input input-bordered w-full h-32 mt-4 pt-2"
                    placeholder="Descrição"
                    name="description"
                    maxlength="5000"
                />
                <section class="w-full grid grid-cols-2 place-items-center gap-2">
                    <label class="flex items-center gap-2 input input-bordered w-full h-8 mt-4">
                        <span><Icon icon="entypo:price-tag" /></span>
                        <input
                            type="number"
                            name="price"
                            class="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                            placeholder="Preço (R$)"
                        />
                    </label>
                    <label class="flex items-center gap-2 input input-bordered w-full h-8 mt-4">
                        <span><Icon icon="mdi:coins" /></span>
                        <input
                            type="number"
                            name="arkhoins"
                            class="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                            placeholder="Preço (Arkhoins)"
                        />
                    </label>
                </section>
                <label class="flex items-center gap-2 mt-4 w-full">
                    <input
                        type="checkbox"
                        name="isPublic"
                        class="checkbox checkbox-sm checkbox-primary"
                    />
                    <p class="text-md font-semibold">Publicar na loja</p>
                    <QuestionMark>
                        Ao marcar essa opção o seu objeto será postado publicamente na loja valendo
                        a quantidade de Arkhoins na qual você definiu.
                    </QuestionMark>
                </label>

                <button type="submit" class="btn btn-sm btn-primary w-full mt-4">
                    <Icon icon="material-symbols:edit" />
                    Editar componente
                </button>
            </section>
        </form>
    </div>
</dialog>

<dialog id="my_modal_3" class="modal" bind:this={deleteModalRef}>
    <div class="modal-box h-52 grid place-items-center">
        <form method="dialog">
            <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
        </form>
        <form
            method="POST"
            action={`/community/projects/${data.id}/edit?/delete`}
            use:enhance={({ formData }) => {
                // @ts-ignore
                formData.set('id', finalObject.id);

                return (result) => {
                    deleteModalRef.close();
                    spawn({ message: 'Componente movido para a lixeira.' });
                };
            }}
        >
            <section class="flex flex-col justify-center items-center mx-8">
                <h3 class="text-xl text-center font-bold">
                    Deseja realmente deletar esse componente?
                    <QuestionMark>
                        O componente não será automaticamente deletado, mas sim redirecionado para a
                        lixeira. Caso queira deletar de vez, remova-o na lixeira.
                    </QuestionMark>
                </h3>

                <button type="submit" class="btn btn-sm btn-primary w-full mt-4">
                    <Icon icon="material-symbols:delete" />
                    Deletar Componente
                </button>
            </section>
        </form>
    </div>
</dialog>

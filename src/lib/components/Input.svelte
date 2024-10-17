<script lang="ts">
    import Icon from '@iconify/svelte';

    export let defaultValue: string = '';
    $: value = defaultValue;

    export let name: string;
    export let placeholder: string = '';
    export let required: boolean = false;
    export let maxSize: number = 0;

    export let labels: {
        topLeft?: string;
        topRight?: string;
        bottomLeft?: string;
        bottomRight?: string;
    } = {};

    export let size: 'xs' | 'sm' | 'md' | 'lg' = 'sm';

    export let icon: string = '';
    export let textShow: string = '';
    export let element: 'input' | 'textarea' | 'checkbox' = 'input';
    export let disableDefaultLabels: boolean = false;

    export let error: boolean = false;
</script>

{#if element !== 'checkbox'}
    <label class="form-control w-full">
        <div class="label">
            <span class="label-text">{@html labels.topLeft ?? ''}</span>
            <span class="label-text">
                {@html labels.topRight
                    ? labels.topRight
                    : required
                    ? !disableDefaultLabels
                        ? '<span class="text-error">Obrigatório</span>'
                        : ''
                    : !disableDefaultLabels
                    ? '<span class="text-base-300">Opcional</span>'
                    : ''}
            </span>
        </div>

        {#if element === 'textarea'}
            <textarea
                bind:value
                class="textarea textarea-bordered resize-none"
                class:textarea-error={error}
                class:textarea-xs={size === 'xs'}
                class:textarea-sm={size === 'sm'}
                class:textarea-md={size === 'md'}
                class:textarea-lg={size === 'lg'}
                {name}
                {placeholder}
                {required}
                {...$$restProps}
            />
        {:else if element === 'input'}
            <label
                class="flex items-center gap-2 input input-bordered"
                class:input-error={error}
                class:input-xs={size === 'xs'}
                class:input-sm={size === 'sm'}
                class:input-md={size === 'md'}
                class:input-lg={size === 'lg'}
            >
                {#if icon !== ''}
                    <Icon {icon} />
                {/if}
                {textShow}

                <input {name} {placeholder} {required} class="grow" bind:value {...$$restProps} />
            </label>
        {/if}

        <div class="label">
            <span class="label-text">{@html labels.bottomLeft ?? ''}</span>
            <span class="label-text" class:text-error={value.length > maxSize}>
                {@html labels.bottomRight
                    ? labels.bottomRight
                    : disableDefaultLabels
                    ? ''
                    : maxSize === 0
                    ? ''
                    : `${value.length}/${maxSize}`}
            </span>
        </div>
    </label>
{:else}
    <label class="flex items-center gap-2">
        <input
            type="checkbox"
            class="checkbox checkbox-primary"
            class:checkbox-xs={size === 'xs'}
            class:checkbox-sm={size === 'sm'}
            class:checkbox-md={size === 'md'}
            class:checkbox-lg={size === 'lg'}
            {name}
            {...$$restProps}
        />
        <slot />
    </label>
{/if}

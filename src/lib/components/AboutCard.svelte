<script lang="ts">
    export let style: string;
</script>

<div class={`${style} border-2 rounded-lg flex flex-col justify-center items-center`}>
    <slot />                
</div>
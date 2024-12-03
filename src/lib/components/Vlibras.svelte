<script>
// @ts-nocheck

  import { onMount } from 'svelte';

  onMount(() => {    
    const script = document.createElement('script');
    script.src = 'https://vlibras.gov.br/app/vlibras-plugin.js';
    script.async = true;
    script.onload = () => {      
      //@ts-ignore
      new window.VLibras.Widget('https://vlibras.gov.br/app');
    };
    document.body.appendChild(script);
  });
</script>

<div vw class="enabled">
  <div vw-access-button class="active"></div>
  <div vw-plugin-wrapper>
    <div class="vw-plugin-top-wrapper"></div>
  </div>
</div>
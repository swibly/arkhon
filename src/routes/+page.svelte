<script lang="ts">
    import Card from '$lib/components/Card.svelte';
</script>

<div class="my-12">
    <div class="flex justify-center">
        <img src="/gallery/logo.png" class="h-48 w-48" alt="Logo" />
    </div>
    <p class="flex justify-center text-xl">Sua plataforma de arquitetura</p>
</div>
<div class="flex justify-center gap-4">
    <button class="btn btn-primary w-36">Iniciar Sessão</button>
    <button class="btn btn-neutral w-36 text-primary">Criar Conta</button>
</div>
<div class="flex justify-center">
    <img src="/gallery/plano.png" alt="Planta" />
</div>
<div
    class="relative w-full overflow-hidden flex justify-center flex-col items-center py-20"
    style="background-image: url(/gallery/background01.png); background-position: center; background-size: cover;"
>
    <h1 class="pt-12 text-white text-3xl max-md:text-xl text-center">
        Papel e caneta tornaram-se obsoletos na prototipação
    </h1>
    <div class="flex justify-center align-items">
        <button class="btn btn-neutral w-36 text-black-500 m-4 max-sm:btn-sm">Saiba mais</button>
    </div>
</div>

<h1 class="mt-10 text-center text-2xl text-secondary font-bold">Descubra novos horizontes</h1>
<div class="flex flex-wrap mt-10 justify-center">    
    <Card
        hidden
        data={Date.now()}
        likes={1209}
        banner="/gallery/placeholder01.png"
        alt="Placeholder"
        author="Gustavinxx7Ousadozz"
        tags={['Acessibilidade', 'D', 'E']}               
    >
        edsadfaefeafeaffeaeaf
    </Card>

    <Card
        special        
        data={Date.now()}
        likes={1209}
        banner="/gallery/placeholder01.png"
        alt="Placeholder"
        author="Gustavinxx7Ousadozz"
        tags={['Acessibilidade', 'D', 'E']}
    >
        edsadfaefeafeaffeaeaf
    </Card>

    <Card
        data={Date.now()}
        likes={1209}
        banner="/gallery/placeholder01.png"
        alt="Placeholder"
        author="Gustavinxx7Ousadozz"
        tags={['Acessibilidade', 'D', 'E']}
    >
        edsadfaefeafeaffeaeaf
    </Card>

    <Card
    show
    data={Date.now()}
    likes={1209}
    banner="/gallery/placeholder01.png"
    alt="Placeholder"
    author="Gustavinxx7Ousadozz"
    tags={['Acessibilidade', 'D', 'E']}
>
    edsadfaefeafeaffeaeaf
</Card>
</div>

<div class="flex justify-between mt-20">
    <img src="/gallery/background02.png" alt="bg-2" class="max-sm:hidden max-w-48 w-full" />
    <div class="flex flex-1 flex-col items-center justify-center py-20 px-10">
        <h1 class="text-5xl max-md:text-3xl text-center font-bold">Seja novo. Seja Arkhon!</h1>
        <button class="btn btn-primary mt-20 btn-lg max-sm:btn-md">Comece a projetar</button>
    </div>
    <img src="/gallery/background03.png" alt="bg-2" class="max-sm:hidden max-w-48 w-full" />
</div>

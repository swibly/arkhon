<script lang="ts">
    import { lightMode, toggle } from '$lib/stores/theme';
    import Icon from '@iconify/svelte';
</script>

<body data-theme={$lightMode ? 'light' : 'dark'} class="w-full min-h-screen">
    <header class="w-full h-24 flex justify-between items-center pl-8 sm:px-20">
        <a href="general"><Icon icon="fe:arrow-left" font-size="40px" /></a>
        <label class="swap swap-rotate float-right pr-8">
            <input type="checkbox" class="theme-controller" on:click={toggle} />
            <Icon icon="ph:moon" class="swap-on size-8" />
            <Icon icon="ph:sun" class="swap-off size-8" />
        </label>
    </header>
    <main class="w-full max-w-2xl min-h-screen flex flex-col mx-auto *:text-justify">
        <h1 class="text-4xl font-bold">Termos de Serviço</h1>

        <h2 class="text-3xl pt-12 font-semibold">Preâmbulo</h2>
        <p class="pt-6 text-lg">
            Este documento estabelece os Termos de Serviço da empresa Swibly e seus projetos
            adjacentes, abrangendo Uso de Dados, Licenciamento e Código Aberto, e Aceitação de
            Termos. Sendo descrito as responsabilidades da empresa em relação aos clientes, bem como
            os direitos da Swibly e de seus usuários. Ao acessar ou utilizar os serviços oferecidos,
            você concorda em cumprir e esta sujeito a (incluindo alteração) destes termos.
        </p>

        <h2 class="text-3xl font-semibold pt-12">Definições</h2>
        <p class="pt-6 text-lg">Destinado a fins documentais:</p>
        <ul class="*:text-lg pt-4 list-disc list-inside *:text-left">
            <li>'Empresa': referente a Swibly;</li>
            <li>'Serviço': toda e qualquer funcionalidade oferecida pela Swibly;</li>
            <li>'Usuário': todo e qualquer indivíduo que acessa ou utiliza o Serviço;</li>
            <li>‘Termos’: Documento de Termos de Serviço ou Termos Gerais de Comprometimento; e</li>
            <li>
                'Conteúdo': inclui, mas não se limita a, textos, imagens, vídeos e outros materiais
                disponibilizados na Swibly e/ou projetos da mesma.
            </li>
        </ul>

        <h2 class="text-3xl font-semibold pt-12">Introdução</h2>
        <p class="pt-6 text-lg">
            Os serviços oferecidos reservam o direito de revisar e atualizar os Termos de Serviço a
            qualquer momento. Estes termos estabelecem as regras e diretrizes gerais para o uso dos
            serviços, e é responsabilidade do usuário ler e compreender, de maneira completa, as
            regras antes de acessar ou utilizar os serviços.
        </p>
        <p class="pt-6 text-lg">
            Ao continuar, ou usar os Serviços após as alterações nos termos, o usuário concorda em
            estar vinculado aos Termos revisados. O usuário que não concorda com os termos
            revisados, deve parar de acessar e utilizar os Serviços imediatamente.
        </p>

        <h2 class="text-3xl font-semibold pt-12">Aceitação dos Termos</h2>
        <p class="pt-6 text-lg">
            Ao acessar ou utilizar os serviços da Swibly, o usuário concorda com estes termos e
            todas as condições aqui contidas. Se o usuário não concordar com qualquer parte, o mesmo
            não deve acessar ou utilizar os Serviços.
        </p>

        <h2 class="text-3xl font-semibold pt-12">Alterações aos Termos</h2>
        <p class="pt-6 text-lg">
            Todos as seções dos termos podem, e serão, revisadas com frequência pela equipe juridica
            e especialistas das áreas em que a empresa se prontifica a solução do problema
            (projeto).
        </p>

        <h2 class="text-3xl font-semibold pt-12">Serviços Oferecidos</h2>
        <p class="pt-6 text-lg">
            Dentre os serviços oferecidos, encontram-se distribuidos igualmente os:
        </p>
        <ul class="*:text-lg pt-4 list-disc list-inside *:text-left">
            <li>Com intuito de desenvolvimento arquitetônico;</li>
            <li>'Serviço': toda e qualquer funcionalidade oferecida pela Swibly;</li>
            <li>'Com intuito de desenvolvimento contínuo (API e desenvolvimento); e</li>
            <li>Com intuito de utilidade genérica.</li>
        </ul>

        <h2 class="text-3xl font-semibold pt-12">Condições de Uso</h2>
        <p class="pt-6 text-lg">
            Os serviços oferecidos devem ser usados de maneira ética e respeitosa. O usuário
            concorda em não utilizar os serviços para fins ilegais ou proibidos. O usuário é
            inteiramente responsável pelo cumprimento de todas as leis locais, estaduais, nacionais
            e internacionais aplicáveis em caso de legitimição e empregatória de conteúdos de
            usuários.
        </p>

        <h2 class="text-3xl font-semibold pt-12">Conta de Usuário</h2>
        <p class="pt-6 text-lg">
            Para acessar e utilizar os serviços, o usuário deve criar uma conta de usuário. Ao criar
            uma conta, o usuário concorda em fornecer informações precisas e completas e em
            mantê-las atualizadas. O usuário é inteiramente responsável pela atividade que ocorre em
            sua conta e deve manter a senha de sua conta segura.
        </p>

        <h2 class="text-3xl font-semibold pt-12">Política de Privacidade</h2>
        <p class="pt-6 text-lg">
            A empresa utiliza cookies e outras tecnologias de rastreamento, como pixels, beacons e
            scripts incorporados, para coletar dados sobre os usuários e seu uso dos serviços. Estas
            tecnologias nos permitem reconhecer o seu dispositivo e coletar informações sobre o seu
            uso dos serviços, incluindo o seu navegador, o tipo de dispositivo, as páginas
            visitadas, o tempo gasto em cada página, os links clicados e outras ações que você
            realiza em nossos serviços.
        </p>
        <p class="pt-6 text-lg">
            Essas informações são coletadas para melhorar a experiência do usuário, analisar o
            tráfego do site e entender de onde nossos visitantes estão vindo. Por exemplo, podemos
            utilizar essas informações para personalizar o conteúdo e os anúncios que você vê,
            fornecer recursos de mídia social e analisar nosso tráfego.
        </p>
        <p class="pt-6 text-lg">
            Além disso, usamos essas informações para manter a segurança de nossos serviços, para
            detectar e prevenir atividades fraudulentas e para garantir que nossos serviços
            funcionem corretamente e de maneira eficiente.
        </p>
        <p class="pt-6 text-lg">
            Ao utilizar nossos serviços, você concorda com nossa utilização de cookies e tecnologias
            semelhantes. Se você não concordar com o uso dessas tecnologias, pode configurar seu
            navegador para rejeitar cookies, ou pode optar por não utilizar nossos serviços.
        </p>

        <h2 class="text-3xl font-semibold pt-12">Direitos Autorais</h2>
        <p class="pt-6 text-lg">
            A empresa detém todos os direitos autorais e outros direitos de propriedade intelectual
            em todo o conteúdo e serviços fornecidos. Qualquer uso não autorizado do conteúdo pode
            violar leis de direitos autorais, marcas registradas e outras leis.
        </p>

        <h2 class="text-3xl font-semibold pt-12">Limitação de Responsabilidade</h2>
        <p class="pt-6 text-lg">
            O conteúdo gerado pelos usuários de nossos serviços não é de total responsabilidade
            legal da empresa. No entanto, o conteúdo é supervisionado e revisado frequentemente
            pelos desenvolvedores e gerentes de comunidade em todos os projetos para assegurar que
            nada de cunho racista, antissemita, homofóbico, transfóbico, pornografica, ou de
            qualquer outra natureza discriminatória ou vulgar seja publicado e divulgado. Além
            disso, a utilização de conteúdo em ambiente não supervisionado real, não é de
            responsabilidade principal da empresa nem o objetivo principal dos serviços.
        </p>
        <p class="pt-6 text-lg">
            Assegura-se de que toda resolução possível será implicada pela empresa.
        </p>

        <h2 class="text-3xl font-semibold pt-12">Leis Aplicáveis</h2>
        <p class="pt-6 text-lg">
            Todos os termos aqui presentes são regidos pelas leis do Brasil. Qualquer disputa
            relacionada a estes termos será resolvida pelos tribunais brasileiros.
        </p>

        <h2 class="text-3xl font-semibold pt-12">Contato</h2>
        <p class="pt-6 text-lg">
            Usuários com alguma dificuldade, reclamação e/ou sugestão de melhoria, devem contatar as
            seguintes linhas de contato:
        </p>
        <ul class="*:text-lg pt-4 list-disc list-inside *:text-left">
            <li>Email: contato@swibly.org</li>
        </ul>

        <h2 class="text-3xl font-semibold pt-12">Licença de Uso e Código Aberto</h2>
        <p class="pt-6 text-lg">
            Devido a iniciativa de código aberto da empresa, a maioria dos projetos públicos detem
            de licenças liberais, sem (ou com) ajustes de teor regulamentário restritivo.
        </p>
        <p class="pt-6 text-lg">
            Projetos/Serviços sem licença definida ou expirada, devem seguir a ISC License:
        </p>
        <p class="py-6 text-lg">
            Copyright &lt;YEAR&gt; &lt;OWNER&gt; 

                Permission to use, copy, modify, and/or distribute this software for any purpose with or without fee is hereby granted, provided that the above copyright notice and this permission notice appear in all copies.
                
                THE SOFTWARE IS PROVIDED “AS IS” AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
        </p>
    </main>
</body>

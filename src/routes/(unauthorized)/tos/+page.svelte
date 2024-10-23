<script lang="ts">
    import Icon from '@iconify/svelte';
    import { spawn } from '$lib/toast';

    let licenseRef: HTMLElement;

    async function copyToClipboard(text: string) {
        spawn({ message: 'Copiado para a área de transferência' });

        await navigator.clipboard.writeText(text);
    }
</script>

<main class="max-w-3xl mx-auto p-4 space-y-8">
    <span class="text-sm text-primary">Termos de Serviço</span>

    <section>
        <h2>Preâmbulo</h2>

        <p>
            Este documento estabelece os Termos de Serviço da empresa Swibly e seus projetos
            adjacentes, abrangendo Uso de Dados, Licenciamento e Código Aberto, e Aceitação de
            Termos. Sendo descrito as responsabilidades da empresa em relação aos clientes, bem como
            os direitos da Swibly e de seus usuários. Ao acessar ou utilizar os serviços oferecidos,
            você concorda em cumprir e esta sujeito a (incluindo alteração) destes termos.
        </p>
    </section>

    <section>
        <h2>Definições</h2>

        <p>Destinado a fins documentais:</p>

        <ul>
            <li><code>Empresa</code>: referente a Swibly;</li>
            <li><code>Serviço</code>: toda e qualquer funcionalidade oferecida pela Swibly;</li>
            <li>
                <code>Usuário</code>: todo e qualquer indivíduo que acessa ou utiliza o Serviço;
            </li>
            <li>
                <code>Termos</code>: Documento de Termos de Serviço ou Termos Gerais de
                Comprometimento; e
            </li>
            <li>
                <code>Conteúdo</code>: inclui, mas não se limita a, textos, imagens, vídeos e outros
                materiais disponibilizados na Swibly e/ou projetos da mesma.
            </li>
        </ul>
    </section>

    <section>
        <h2>Introdução</h2>

        <p>
            Os serviços oferecidos reservam o direito de revisar e atualizar os Termos de Serviço a
            qualquer momento. Estes termos estabelecem as regras e diretrizes gerais para o uso dos
            serviços, e é responsabilidade do usuário ler e compreender, de maneira completa, as
            regras antes de acessar ou utilizar os serviços.
        </p>

        <p>
            Ao continuar, ou usar os Serviços após as alterações nos termos, o usuário concorda em
            estar vinculado aos Termos revisados. O usuário que não concorda com os termos
            revisados, deve parar de acessar e utilizar os Serviços imediatamente.
        </p>
    </section>

    <section>
        <h2>Aceitação dos Termos</h2>

        <p>
            Ao acessar ou utilizar os serviços da Swibly, o usuário concorda com estes termos e
            todas as condições aqui contidas. Se o usuário não concordar com qualquer parte, o mesmo
            não deve acessar ou utilizar os Serviços.
        </p>
    </section>

    <section>
        <h2>Alterações aos Termos</h2>

        <p>
            Todos as seções dos termos podem, e serão, revisadas com frequência pela equipe juridica
            e especialistas das áreas em que a empresa se prontifica a solução do problema
            (projeto).
        </p>
    </section>

    <section>
        <h2>Serviços Oferecidos</h2>

        <p>Dentre os serviços oferecidos, encontram-se distribuidos igualmente os:</p>

        <ul>
            <li>Com intuito de desenvolvimento arquitetônico;</li>
            <li>'Serviço': toda e qualquer funcionalidade oferecida pela Swibly;</li>
            <li>'Com intuito de desenvolvimento contínuo (API e desenvolvimento); e</li>
            <li>Com intuito de utilidade genérica.</li>
        </ul>
    </section>

    <section>
        <h2>Condições de Uso</h2>

        <p>
            Os serviços oferecidos devem ser usados de maneira ética e respeitosa. O usuário
            concorda em não utilizar os serviços para fins ilegais ou proibidos. O usuário é
            inteiramente responsável pelo cumprimento de todas as leis locais, estaduais, nacionais
            e internacionais aplicáveis em caso de legitimição e empregatória de conteúdos de
            usuários.
        </p>
    </section>

    <section>
        <h2>Conta de Usuário</h2>

        <p>
            Para acessar e utilizar os serviços, o usuário deve criar uma conta de usuário. Ao criar
            uma conta, o usuário concorda em fornecer informações precisas e completas e em
            mantê-las atualizadas. O usuário é inteiramente responsável pela atividade que ocorre em
            sua conta e deve manter a senha de sua conta segura.
        </p>
    </section>

    <section>
        <h2>Política de Privacidade</h2>

        <p>
            A empresa utiliza cookies e outras tecnologias de rastreamento, como pixels, beacons e
            scripts incorporados, para coletar dados sobre os usuários e seu uso dos serviços. Estas
            tecnologias nos permitem reconhecer o seu dispositivo e coletar informações sobre o seu
            uso dos serviços, incluindo o seu navegador, o tipo de dispositivo, as páginas
            visitadas, o tempo gasto em cada página, os links clicados e outras ações que você
            realiza em nossos serviços.
        </p>

        <p>
            Essas informações são coletadas para melhorar a experiência do usuário, analisar o
            tráfego do site e entender de onde nossos visitantes estão vindo. Por exemplo, podemos
            utilizar essas informações para personalizar o conteúdo e os anúncios que você vê,
            fornecer recursos de mídia social e analisar nosso tráfego.
        </p>

        <p>
            Além disso, usamos essas informações para manter a segurança de nossos serviços, para
            detectar e prevenir atividades fraudulentas e para garantir que nossos serviços
            funcionem corretamente e de maneira eficiente.
        </p>

        <p>
            Ao utilizar nossos serviços, você concorda com nossa utilização de cookies e tecnologias
            semelhantes. Se você não concordar com o uso dessas tecnologias, pode configurar seu
            navegador para rejeitar cookies, ou pode optar por não utilizar nossos serviços.
        </p>
    </section>

    <section>
        <h2>Direitos Autorais</h2>

        <p>
            A empresa detém todos os direitos autorais e outros direitos de propriedade intelectual
            em todo o conteúdo e serviços fornecidos. Qualquer uso não autorizado do conteúdo pode
            violar leis de direitos autorais, marcas registradas e outras leis.
        </p>
    </section>

    <section>
        <h2>Limitação de Responsabilidade</h2>

        <p>
            O conteúdo gerado pelos usuários de nossos serviços não é de total responsabilidade
            legal da empresa. No entanto, o conteúdo é supervisionado e revisado frequentemente
            pelos desenvolvedores e gerentes de comunidade em todos os projetos para assegurar que
            nada de cunho racista, antissemita, homofóbico, transfóbico, pornografica, ou de
            qualquer outra natureza discriminatória ou vulgar seja publicado e divulgado. Além
            disso, a utilização de conteúdo em ambiente não supervisionado real, não é de
            responsabilidade principal da empresa nem o objetivo principal dos serviços.
        </p>

        <p>Assegura-se de que toda resolução possível será implicada pela empresa.</p>
    </section>

    <section>
        <h2>Leis Aplicáveis</h2>

        <p>
            Todos os termos aqui presentes são regidos pelas leis do Brasil. Qualquer disputa
            relacionada a estes termos será resolvida pelos tribunais brasileiros.
        </p>
    </section>

    <section>
        <h2>Contato</h2>

        <p>
            Usuários com alguma dificuldade, reclamação e/ou sugestão de melhoria, devem contatar as
            seguintes linhas de contato:
        </p>

        <ul>
            <li>Email: contato@swibly.org</li>
        </ul>
    </section>

    <section>
        <h2>Licença de Uso e Código Aberto</h2>

        <p>
            Devido a iniciativa de código aberto da empresa, a maioria dos projetos públicos detem
            de licenças liberais, sem (ou com) ajustes de teor regulamentário restritivo.
        </p>

        <p>Projetos/Serviços sem licença definida ou expirada, devem seguir a ISC License:</p>

        <div class="relative w-fit">
            <button
                class="btn btn-sm w-fit absolute top-2 right-2"
                on:click={async () => {
                    const text = licenseRef.innerText;

                    if (text !== null) {
                        await copyToClipboard(text);
                    }
                }}
            >
                <Icon icon="iconamoon:copy" />
                copy
            </button>

            <code class="block" bind:this={licenseRef}>
                Copyright {new Date(Date.now()).getFullYear()} &lt;DONO&gt;

                <br />
                <br />

                Permission to use, copy, modify, and/or distribute this software for any purpose
                with or without fee is hereby granted, provided that the above copyright notice and
                this permission notice appear in all copies.

                <br />
                <br />

                THE SOFTWARE IS PROVIDED “AS IS” AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH REGARD
                TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS. IN
                NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT, INDIRECT, OR
                CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR
                PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION,
                ARISING OUT OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
            </code>
        </div>
    </section>
</main>

<style lang="postcss">
    h2 {
        @apply text-2xl font-bold text-primary;
    }

    section {
        @apply space-y-4;
    }

    section:not(:first-of-type) {
        @apply mt-12;
    }

    p {
        @apply text-justify;
    }

    ul {
        @apply list-inside list-disc my-4;
    }

    code {
        @apply bg-base-200 text-base-content p-2 text-justify rounded-lg;
    }
</style>

// Criando um Personagem — transcrito de SW-SD-Criando-um-Personagem.md.
//
// Capítulo novo no compêndio (ago/2026) e o único voltado ao JOGADOR, não ao
// Mestre. É a página que se abre na sessão zero: por isso as três primeiras
// páginas seguem a ordem dos passos, e a última é a checklist, que é o que
// alguém relê antes de dizer "pronto".
//
// Vale a única ressalva de escopo: as tabelas aqui são RESUMOS das fichas que
// já vivem nos packs de classes e espécies. Elas existem para dar a visão de
// conjunto que uma ficha, sozinha, não dá — e é por isso que trazem uma linha
// por classe, e não a ficha inteira, que continua sendo o compêndio.

function tabela(cabecalho, linhas) {
  return (
    "<table><thead><tr>" +
    cabecalho.map((c) => `<th>${c}</th>`).join("") +
    "</tr></thead><tbody>" +
    linhas.map((l) => "<tr>" + l.map((c) => `<td>${c}</td>`).join("") + "</tr>").join("") +
    "</tbody></table>"
  );
}

export const criacaoJournal = {
  title: "Criando um Personagem",
  pages: [
    {
      title: "Antes de rolar, e os atributos",
      content:
        "<h2>A única decisão que vale combinar antes</h2>" +
        "<p><strong>Em que nível a mesa começa?</strong> O padrão é o 1º. Muitas mesas deste cenário começam no <strong>3º</strong> — personagens já competentes, com a especialização rendendo. Se for o caso, veja a última página.</p>" +
        "<p>Fora isso, <strong>os passos abaixo não têm pegadinha de ordem</strong>: você pode escolher espécie, classe e trilha na ordem que quiser, sem risco de descobrir no fim que uma escolha proibia a outra.</p>" +
        "<p><strong>Alinhamento é escolha livre.</strong> Nenhuma especialização exige alinhamento neste cenário — existe Emissário caótico e Assassino ordeiro. Escolha pelo personagem que você quer jogar.</p>" +
        "<h2>Passo 1 — Atributos</h2>" +
        "<p><strong>Role 3d6 seis vezes</strong> e distribua os resultados como quiser entre <strong>Força, Destreza, Constituição, Inteligência, Sabedoria e Carisma</strong>. Anote o <strong>modificador</strong> de cada um:</p>" +
        tabela(
          ["Valor", "1", "2-3", "4-5", "6-8", "9-12", "13-14", "15-16", "17-18", "19-20"],
          [["<strong>Mod.</strong>", "−4", "−3", "−2", "−1", "<strong>0</strong>", "+1", "+2", "+3", "+4"]],
        ) +
        "<p><strong>O atributo que mais importa, por classe:</strong></p>" +
        tabela(
          ["Classe", "Atributo-chave", "Por quê"],
          [
            ["<strong>Veterano</strong>", "Força ou Destreza", "É de onde sai o dano — Força no corpo a corpo, Destreza no tiro"],
            ["<strong>Operativo</strong>", "<strong>Destreza</strong>", "Cada ponto de modificador é <strong>+1 ponto de talento</strong> no 1º nível"],
            ["<strong>Técnico</strong>", "<strong>Inteligência</strong>", "Reparo, sabotagem e o que o Mestre pedir da bancada"],
            ["<strong>Sensível à Força</strong>", "<strong>Sabedoria</strong>", "Foco Extra, Duelo da Força e aprender poderes — tudo passa por ela"],
          ],
        ) +
        "<p>E a <strong>Constituição</strong> importa para todo mundo: ela entra nos PV a cada nível.</p>" +
        "<p><em>Neste cenário a Força não é Inteligência. O Mentálico do Space Dragon é regido por Inteligência; o Sensível à Força é regido por <strong>Sabedoria</strong>. É divergência deliberada — \"sinta, não pense\". Quem <strong>resiste</strong> a um poder continua rolando <strong>JPS</strong>.</em></p>",
    },
    {
      title: "Espécie, classe e os números derivados",
      content:
        "<h2>Passo 2 — Espécie</h2>" +
        "<p>Escolha entre as nove do compêndio <strong>Star Dragon: Espécies</strong>. <strong>Espécie não altera atributo neste cenário</strong> — ela dá habilidades.</p>" +
        "<p>Há uma décima entrada, o <strong>Mutante</strong>: não é um povo, é o <em>molde coringa</em> para inventar um. Arraste a raça e escolha um Aprimoramento e uma Degeneração nos <strong>dois seletores que aparecem na aba Raça</strong> da ficha; trate o resto como Humano — é assim que se joga um Nautolano, um Ceriano ou qualquer povo que ainda não tem ficha. É também a <strong>única</strong> entrada do compêndio que mexe em atributo, e só se você escolher a mutação que faz isso.</p>" +
        tabela(
          ["Espécie", "O que ela te dá, em uma linha", "Trava"],
          [
            ["<strong>Humano</strong>", "+10% de XP e +1 numa JP à escolha", "—"],
            ["<strong>Wookiee</strong>", "Soco 1d6, +2 de dano com PV baixo, +1 de CA natural", "<strong>−1 de dano com armas Pequenas</strong>"],
            ["<strong>Twi'lek</strong>", "+1 em Carisma, lekku que fareja mentira, imune a calor", "—"],
            ["<strong>Rodiano</strong>", "Infravisão térmica 18 m, +1 em rastrear/procurar/ouvir", "—"],
            ["<strong>Droide</strong>", "JPC Fáceis, mente blindada, infravisão 18 m", "<strong>Não pode ser Sensível à Força</strong> · não cura sozinho · social Difícil · Íon dobra o dano"],
            ["<strong>Zabrak</strong>", "+2 de JPC contra veneno e asfixia, aguenta chegar a 0 PV", "—"],
            ["<strong>Mon Calamari</strong>", "Anfíbio pleno, +1 para operar máquinas e naves", "—"],
            ["<strong>Trandoshano</strong>", "Regenera 1 PV por rodada sem dano, garras 1d4, +1 de CA", "Fica Difícil no frio intenso"],
            ["<strong>Chiss</strong>", "Infravisão 18 m, +1 de Iniciativa, um idioma extra", "—"],
          ],
        ) +
        "<p><strong>Anote também as três perguntas</strong> da sua espécie — elas estão na ficha, uma por povo. Não é enfeite: é o que dá cara ao personagem antes da primeira sessão.</p>" +
        "<h2>Passo 3 — Classe e especialização</h2>" +
        tabela(
          ["Classe", "Chassi", "DV", "Créditos iniciais", "Papel"],
          [
            ["<strong>Veterano</strong>", "Cosmonauta", "<strong>d10</strong>", "2d10 × 50 CR", "Ação, combate e pilotagem"],
            ["<strong>Operativo</strong>", "Gatuno", "<strong>d6</strong>", "2d6 × 50 CR", "Furtividade e submundo"],
            ["<strong>Técnico</strong>", "Cientista", "<strong>d8</strong>", "1d8 × 50 CR", "Tecnologia e engenhocas"],
            ["<strong>Sensível à Força</strong>", "Mentálico", "<strong>d8</strong>", "1d6 × 50 CR", "Jedi/Sith"],
          ],
        ) +
        "<p><strong>As trilhas de cada classe</strong> — todas de alinhamento livre:</p>" +
        tabela(
          ["Classe", "Trilhas"],
          [
            ["<strong>Veterano</strong>", "Mercenário <em>(pistoleiro)</em> · Caçador de Recompensas · Emissário <em>(diplomata)</em>"],
            ["<strong>Operativo</strong>", "Espião · Contrabandista · Assassino · Sabotador"],
            ["<strong>Técnico</strong>", "Médico de Campo · Engenheiro · Slicer"],
            ["<strong>Sensível à Força</strong>", "Guardião <em>(sabre)</em> · Consular <em>(poderes)</em> · Sentinela <em>(caçador)</em> · Vidente <em>(nexos)</em>"],
          ],
        ) +
        "<p><strong>Especialização é classe irmã, não camada.</strong> Você não lê a classe-base e soma: cada trilha aparece no compêndio com <strong>ficha completa</strong>. Quem escolhe trilha evolui pela coluna <strong>XP Especial</strong>; quem não escolhe joga a classe-chassi pura e evolui pela coluna <strong>XP normal</strong>, que é mais barata.</p>" +
        "<p><strong>O Sensível escolhe mais uma coisa:</strong> o <strong>Caminho da Luz ou da Sombra</strong>, que define as listas de poderes e a trilha de Corrupção.</p>" +
        "<h2>Passo 4 — Os números derivados</h2>" +
        "<p><strong>Pontos de Vida.</strong> No 1º nível você recebe o <strong>valor máximo</strong> do Dado de Vida — <strong>não role</strong> — mais o modificador de Constituição.</p>" +
        tabela(
          ["Classe", "PV no 1º nível"],
          [
            ["Veterano", "<strong>10</strong> + mod CON"],
            ["Operativo", "<strong>6</strong> + mod CON"],
            ["Técnico", "<strong>8</strong> + mod CON"],
            ["Sensível à Força", "<strong>8</strong> + mod CON"],
          ],
        ) +
        "<p><strong>Classe de Armadura.</strong> Ascendente, parte de 10:</p>" +
        "<p><strong>CA = 10 + armadura + modificador de Destreza + escudo + aparato defensivo + espécie</strong></p>" +
        "<p>O Wookiee e o Trandoshano somam <strong>+1 natural</strong>. O Gerador de Escudo Pessoal soma +1, mas <strong>só Técnico e Veterano</strong> podem usá-lo.</p>" +
        "<p><strong>Base de Ataque.</strong> Da tabela da classe. No 1º nível: <strong>Veterano +1 · Operativo +1 · Técnico +1 · Sensível 0</strong>. Some <strong>Força</strong> no corpo a corpo ou <strong>Destreza</strong> à distância.</p>" +
        "<p><strong>Jogadas de Proteção.</strong> O valor-base vem da classe (<strong>5</strong> para as quatro no 1º nível); o modificador vem do atributo:</p>" +
        "<ul>" +
        "<li><strong>JPD</strong> = base + mod <strong>Destreza</strong> — explosões, desabamentos, armadilhas</li>" +
        "<li><strong>JPC</strong> = base + mod <strong>Constituição</strong> — veneno, doença, radiação, vácuo</li>" +
        "<li><strong>JPS</strong> = base + mod <strong>Sabedoria</strong> — poderes da Força e efeitos mentais</li>" +
        "</ul>" +
        "<p>Todas são <strong>roll-under</strong>: role 1d20 e tire <strong>igual ou menos</strong> que o valor. <strong>1 sempre passa, 20 sempre falha.</strong></p>" +
        "<p><strong>Movimento.</strong> <strong>9 metros</strong>, menos a redução da armadura (Média −1 m, Pesada −3 m).</p>" +
        "<p><strong>Iniciativa.</strong> Role 1d20 e tire <strong>igual ou menos que o maior valor entre Destreza e Sabedoria</strong>; passando, você age antes dos inimigos.</p>",
    },
    {
      title: "O que a sua classe entrega agora",
      content:
        "<p>Este passo muda completamente conforme a classe. Faça <strong>só o seu</strong>.</p>" +
        "<h2>Veterano — nada a preparar</h2>" +
        "<p>Você já tem <strong>Pilotar</strong> (1-2 em 1d6), <strong>Desarmar e Subjugar</strong> (1-2 em 1d6) e o <strong>Dano Crítico</strong> — seus acertos críticos saem em <strong>19–20</strong>, e não só no 20. Nenhuma escolha pendente. Vá comprar equipamento.</p>" +
        "<h2>Operativo — distribua os talentos</h2>" +
        "<p>Sua trilha define <strong>cinco talentos</strong> (dos base — Sabotagem, Escalar, Furtividade, Furtar, Armadilha — mais os próprios dela).</p>" +
        "<ol>" +
        "<li>Comece com <strong>2 pontos em cada um dos cinco</strong>.</li>" +
        "<li>Some <strong>2 pontos livres</strong>.</li>" +
        "<li>Some <strong>+1 ponto por ponto do seu modificador de Destreza</strong>.</li>" +
        "<li>Distribua como quiser — <strong>no 1º nível não vale a trava de espalhar</strong>. <strong>Máximo 5 por talento.</strong></li>" +
        "</ol>" +
        "<p>O valor é a chance em 1d6: 2 pontos = 1-2 em 1d6; 5 pontos = 1-5 em 1d6.</p>" +
        "<h2>Técnico — escolha três aparatos</h2>" +
        "<p>Seu <strong>Nível Tecnológico é igual ao seu nível de classe</strong> — no 1º nível, <strong>NT 1</strong>. Escolha <strong>três aparatos de NT 1</strong>: eles já estão prontos na ficha quando a campanha abre, e <strong>não custam Créditos</strong>. A cada nível novo você ganha <strong>mais um</strong>, de qualquer NT que já alcance.</p>" +
        "<p><strong>Os oito de NT 1:</strong> Bastão Luminoso · Visor Térmico · Comlink · Visor Noturno · Cortador de Fusão · Medidor de Radiação · Traje Antirradiação · <strong>Disruptor Positrônico</strong> <em>(é o que faz Desativar Droides funcionar — que um dos três seja ele)</em>.</p>" +
        "<p>Seus <strong>Créditos iniciais ficam livres</strong> para armas, roupa e o resto — e para comprar aparatos <strong>além</strong> desses três, se você quiser. Você também tem <strong>Desconto Tecnológico de 5%</strong> em qualquer compra de equipamento, já no 1º nível.</p>" +
        "<p><em>É a mesma regra dos outros conjuradores: o Sensível começa com dois poderes e ganha mais a cada Grandeza que abre; o Mago do OD2 começa com o grimório escrito e acrescenta magias ao subir. Ninguém entra em jogo com a lista em branco.</em></p>" +
        "<h2>Sensível à Força — escolha dois poderes</h2>" +
        "<p>Escolha <strong>dois poderes de 1ª Grandeza</strong> da lista Universal ou da do seu <strong>Caminho</strong>.</p>" +
        "<p>Seu <strong>Foco Diário de 1ª Grandeza é 1</strong> no 1º nível. Some o <strong>Foco Extra</strong> lido pela <strong>Sabedoria</strong>: Sabedoria 13-16 dá <strong>+1</strong>, 17-20 dá <strong>+2</strong>.</p>" +
        "<p><strong>O sabre de luz não se compra</strong> — é construído por um rito da Força ou achado. Combine com o Mestre se você já começa com um.</p>" +
        "<h2>Passo 6 — Idiomas</h2>" +
        "<ul>" +
        "<li>Você fala o <strong>idioma do seu povo</strong> e o <strong>Básico Galáctico</strong>.</li>" +
        "<li>Some <strong>um idioma adicional por ponto</strong> do modificador de Inteligência.</li>" +
        "<li><strong>Ler e escrever</strong> é separado: divida a <strong>Inteligência por 6</strong>, arredondando para baixo — esse é o número de idiomas em que você é alfabetizado. <strong>Inteligência 6 ou menos: analfabeto</strong>, nem no idioma natal.</li>" +
        "<li>O <strong>Chiss</strong> já começa com um idioma extra. O <strong>Droide</strong> é fluente em Binário por construção.</li>" +
        "</ul>" +
        "<p><em>Quem fala mas não escreve tem um sotaque que o denuncia como forasteiro — e isso vale como gancho, não como punição.</em></p>",
    },
    {
      title: "Créditos, compras e kits de partida",
      content:
        "<p>Role a renda da sua classe e <strong>gaste antes da primeira sessão</strong>.</p>" +
        tabela(
          ["Classe", "Rolagem", "Faixa", "Média"],
          [
            ["<strong>Veterano</strong>", "2d10 × 50", "100 – 1.000 CR", "~550"],
            ["<strong>Operativo</strong>", "2d6 × 50", "100 – 600 CR", "~350"],
            ["<strong>Técnico</strong>", "1d8 × 50", "50 – 400 CR", "~225"],
            ["<strong>Sensível à Força</strong>", "1d6 × 50", "50 – 300 CR", "~175"],
          ],
        ) +
        "<p><strong>Antes de abrir o catálogo, leia a tabela mestra</strong> no journal de Equipamento — ela diz, na sua linha, que armas (<strong>Leve / Marcial / Utilitária</strong>), que armadura (<strong>Leve / Média / Pesada</strong>), se pode escudo e que aparatos você opera. Comprar fora da faixa <strong>não é proibido</strong>, mas custa <strong>−2 no ataque</strong> e desliga as habilidades de classe que dependem de mobilidade.</p>" +
        "<p><strong>Não dá para comprar tudo, e é de propósito.</strong> Um Veterano de sorte compra <strong>um rifle <em>ou</em> uma armadura média e um blaster leve</strong> — não os dois. Combinem o que é <strong>do grupo</strong> (kit médico, comlinks, ferramentas, a nave) e paguem rachado; nenhuma renda inicial cobre uma tripulação sozinha.</p>" +
        "<h2>Kit de partida — se você não quer fazer compras</h2>" +
        "<p>Listas prontas que cabem numa rolagem mediana. Pegue, ajuste o troco, jogue.</p>" +
        "<p><strong>Veterano — 485 CR</strong><br>Armadura de Combate Leve (200) · Blaster Leve (150) · Gerador de Escudo Pessoal (80) · Vibro-Adaga (15) · Comlink (40)<br>&rarr; <strong>CA 13</strong> + Destreza. Se rolou mal, corte o Gerador e a adaga.</p>" +
        "<p><strong>Operativo — 300 CR</strong><br>Traje Reforçado (50) · Blaster Leve (150) · Vibro-Lâmina Curta (60) · Comlink (40)<br>&rarr; <strong>CA 11</strong> + Destreza. Sem Gerador — o Operativo só opera aparatos <strong>utilitários</strong>.</p>" +
        "<p><strong>Técnico — 190 CR</strong><br>Traje Reforçado (50) · Cortador de Fusão (40, e serve de arma 1d4) · Visor Noturno (40) · Bastão Luminoso (20) · Comlink (40) · <strong>Disruptor Positrônico</strong> <em>(construído)</em><br>&rarr; <strong>CA 11</strong> + Destreza. Sem blaster: aos 150 CR ele não cabe junto com as engenhocas, e engenhoca é o que a classe faz. Lembre do <strong>desconto de 5%</strong>.</p>" +
        "<p><strong>Sensível à Força — 150 CR</strong><br>Traje Reforçado (50) · Vibro-Lâmina Curta (60) · Comlink (40)<br>&rarr; <strong>CA 11</strong> + Destreza. O sabre vem da história, não da loja.</p>" +
        "<h2>Passo 8 — O nome, e as três perguntas</h2>" +
        "<p>Volte à ficha da sua espécie e responda as <strong>três perguntas</strong> dela. São curtas de propósito, e é delas que sai o personagem — o resto desta página é só aritmética.</p>" +
        "<p>Anote também <strong>por que ele está com este grupo</strong>. Numa galáxia deste tamanho, a coincidência de estarem no mesmo cargueiro é a única coisa que a ficha não calcula.</p>",
    },
    {
      title: "Checklist e começar acima do 1º nível",
      content:
        "<h2>Checklist da ficha</h2>" +
        "<ul>" +
        "<li>Seis atributos e seus modificadores</li>" +
        "<li>Espécie, com habilidades e restrições</li>" +
        "<li>Classe, especialização (ou \"sem trilha\") e alinhamento <em>(livre)</em></li>" +
        "<li>Caminho Luz/Sombra — <em>só Sensível</em></li>" +
        "<li>PV · CA · BA · JPD/JPC/JPS · Movimento</li>" +
        "<li>Talentos distribuídos — <em>só Operativo</em></li>" +
        "<li>Aparatos construídos — <em>só Técnico</em></li>" +
        "<li>Dois poderes de 1ª Grandeza e o Foco Diário — <em>só Sensível</em></li>" +
        "<li>Idiomas falados e escritos</li>" +
        "<li>Créditos rolados, gastos e o troco anotado</li>" +
        "<li>Nome, três perguntas respondidas, e o laço com o grupo</li>" +
        "</ul>" +
        "<h2>Começando acima do 1º nível</h2>" +
        "<p>Muitas mesas deste cenário abrem no <strong>3º nível</strong>. Três ajustes:</p>" +
        "<ol>" +
        "<li><strong>PV:</strong> o máximo do DV no 1º nível, e <strong>role</strong> o dado nos níveis seguintes, somando o modificador de Constituição em cada um. O Mestre pode permitir tratar rolagens de 1 e 2 como 3, para ninguém entrar na campanha com um personagem inviável.</li>" +
        "<li><strong>BA, JP e habilidades:</strong> leia a linha do seu nível na tabela da classe e pegue tudo o que tiver degrau 1 e 3. O Operativo ganha <strong>+2 pontos</strong> de talento no 3º — e aí <strong>vale a trava</strong>: não podem ir os dois no mesmo talento.</li>" +
        "<li><strong>Créditos:</strong> role a renda inicial normalmente e some o que o Mestre der de \"aventuras anteriores\". Como referência, o pagamento de um contrato de fronteira gira em torno de <strong>1.200 CR</strong> para o grupo inteiro.</li>" +
        "</ol>" +
        "<p>O <strong>Técnico</strong> sobe de NT junto com o nível: no 3º ele constrói até <strong>NT 3</strong>, o que abre jetpack, granada de fumaça e comunicadores — e muda bastante a cara da tripulação.</p>",
    },
  ],
};

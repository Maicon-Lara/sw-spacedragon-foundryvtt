// Seção do Mestre — transcrita de SW-SD-Secao-do-Mestre.md.
//
// Este capítulo nunca tinha chegado ao módulo: o pack de journal trazia
// poderes, bestiário e naves, e a mesa do Mestre ficava só no cofre. As
// tabelas de preparação são listas de rolagem, mas NÃO viram RollTable — o
// módulo não tem pack de RollTable, e abrir um para sete tabelas de sabor
// custaria mais manutenção do que resolve. Ficam legíveis na página, que é
// como o Mestre as usa: lendo e escolhendo.

function tabela(cabecalho, linhas) {
  return (
    "<table><thead><tr>" +
    cabecalho.map((c) => `<th>${c}</th>`).join("") +
    "</tr></thead><tbody>" +
    linhas.map((l) => "<tr>" + l.map((c) => `<td>${c}</td>`).join("") + "</tr>").join("") +
    "</tbody></table>"
  );
}

// Lista numerada 1..n, para as tabelas de d8/d10/d12.
function rolagem(dado, itens) {
  return (
    `<p><strong>d${dado}</strong></p><ol>` +
    itens.map((i) => `<li>${i}</li>`).join("") +
    "</ol>"
  );
}

export const mestreJournal = {
  title: "Seção do Mestre",
  pages: [
    {
      title: "O tom da mesa e as facções",
      content:
        "<p>Star Wars é <strong>space opera pulp</strong>: heroísmo grande, vilões teatrais, esperança contra a tirania, e uma galáxia viva e suja de contrabandistas, caçadores e impérios. Ritmo rápido, ação cinematográfica, dilemas morais simples na superfície e profundos no fundo. Deixe os dados servirem à história.</p>" +
        "<p><strong>A Força paira sobre tudo:</strong> mesmo numa mesa sem Jedi, ela aparece como sorte estranha, premonições e o peso de escolhas. Use a <strong>Corrupção</strong> como bússola dramática dos Sensíveis.</p>" +
        "<h2>Escolhendo a era</h2>" +
        tabela(
          ["Era", "Tom", "O que os PCs fazem"],
          [
            ["<strong>Alta República</strong>", "Auge Jedi, exploração de fronteira", "Cavaleiros e pioneiros enfrentando ameaças exóticas na orla"],
            ["<strong>Queda da República / Clônicas</strong>", "Guerra em escala, tragédia iminente", "Soldados, agentes e Jedi-generais; a sombra da Ordem 66"],
            ["<strong>Era Imperial / Guerra Civil</strong>", "Tirania × Rebelião (o \"padrão\" dos filmes)", "Rebeldes, contrabandistas e Jedi caçados no submundo"],
            ["<strong>Nova República / Pós-Império</strong>", "Faroeste galáctico, remanescentes", "Mandalorianos, mercenários e caçadores na fronteira sem lei"],
          ],
        ) +
        "<h2>As facções</h2>" +
        "<p>Cada facção é um <strong>motor de aventura</strong>: dê a ela um objetivo que cruze o dos PCs.</p>" +
        "<ul>" +
        "<li><strong>A Autoridade Tirânica</strong> (Império / Primeira Ordem / sindicato dominante) — ordem pela força. PNJs: stormtroopers, oficiais, agentes do ISB, Moffs, <strong>Inquisidores</strong>. Gera: opressão, checkpoints, caçadas, deserções.</li>" +
        "<li><strong>A Rebelião / Resistência</strong> — os desfavorecidos com uma causa. PNJs: células clandestinas, contatos, pilotos. Gera: sabotagem, resgate, extração, esperança sob fogo.</li>" +
        "<li><strong>O Submundo</strong> (Hutts, Aurora Negra, Alvorada Carmesim) — o crime que move a galáxia. Gera: dívidas, contratos sujos, contrabando, traições.</li>" +
        "<li><strong>A Guilda dos Caçadores de Recompensas</strong> — a lei cinzenta da fronteira. Gera: contratos, rivalidades, alvos que não são o que parecem.</li>" +
        "<li><strong>Os Clãs Mandalorianos</strong> — honra, Beskar e o <strong>Sabre Sombrio</strong>. Gera: duelos de honra, reunificação de clãs, disputas de liderança.</li>" +
        "<li><strong>Corporações e Cartéis</strong> — a ganância neutra. Gera: exploração de mundos, experimentos proibidos, guerras por recursos (kyber, especiaria, Beskar).</li>" +
        "<li><strong>A Ordem Jedi / os Sith</strong> — ver <em>Ordens &amp; Ranks</em>.</li>" +
        "</ul>",
    },
    {
      title: "Recompensas e de onde vem o XP",
      content:
        "<ul>" +
        "<li><strong>Créditos não são Peças de Ouro, e não viram XP.</strong> Ver a nota abaixo — é o ponto mais importante desta seção.</li>" +
        "<li><strong>Os \"itens mágicos\" desta galáxia</strong> são <strong>aparatos tecnológicos, cristais kyber, artefatos da Força, armaduras Beskar e sabres únicos</strong>. Distribua-os como recompensas raras e memoráveis, não como loja.</li>" +
        "<li>Escale as somas ao perigo, não ao nível fixo: um contrato de fronteira paga <strong>cerca de 1.200 CR ao grupo</strong>; um golpe contra uma corporação, algumas dezenas de milhares. A escala 1–15 pede curvas de recompensa mais longas que uma campanha 1–10.</li>" +
        "</ul>" +
        "<p>&#9888; <strong>De onde vem o XP nesta galáxia.</strong> <strong>Créditos não equivalem a Peças de Ouro e não valem XP.</strong> A escala de Créditos deste cenário foi reescalada para centenas e não fecha 1:1 com preço nenhum da lista.</p>" +
        "<p class='nota-casa'><em>Correção da casa: uma versão anterior desta seção dizia que \"Créditos = Peças de Ouro (1:1) e valem XP quando conquistados\" — as duas metades da frase estão erradas aqui, e a contradição com a tabela de preços era visível.</em></p>" +
        "<p><strong>E o problema maior é o outro.</strong> O Old Dragon 2 paga XP por <strong>tesouro conquistado em aventura e trazido de volta em segurança</strong> — e é explícito ao excluir venda de itens, impostos e qualquer outra forma de ganhar dinheiro que não seja tesouro. Ora: <strong>o pagamento de um contrato é exatamente isso.</strong> Uma tripulação de contrabandistas e caçadores de recompensas ganha a vida <strong>prestando serviço</strong>, não saqueando covil. Pela regra do livro, essa renda toda vale <strong>zero XP</strong> — e nenhum ajuste de multiplicador conserta isso, porque o problema não é a taxa de câmbio, é a categoria.</p>" +
        "<h2>O que usar, então</h2>" +
        "<p>Três fontes orgânicas continuam valendo integralmente:</p>" +
        "<ul>" +
        "<li><strong>XP de criatura derrotada</strong> — os blocos do bestiário e das aventuras já trazem o valor, e ele se <strong>divide pelo grupo</strong>.</li>" +
        "<li><strong>Ideias espertas</strong> — 100 XP × nível do personagem, quando alguém resolve um problema de um jeito que você não previu.</li>" +
        "<li><strong>XP por exploração</strong> — na <strong>primeira vez</strong> que o grupo encontra uma espécie nova, conceda o XP dela <strong>mesmo sem combate</strong>. Regra do Space Dragon, e a mais subestimada das três: numa galáxia feita de espécies e mundos, ela paga por <strong>descobrir</strong> em vez de por matar. Vale também para a primeira vez que se põe o pé num mundo não catalogado.</li>" +
        "</ul>" +
        "<p>Mesmo somadas, essas três não sobem ninguém numa campanha de intriga e contrabando — costumam ser uns <strong>5% do necessário</strong>.</p>" +
        "<p>Por isso, a recomendação: <strong>conceda XP ao fim de cada aventura</strong>, calibrando para o nível-alvo que aquele ponto da campanha pede. Todos recebem <strong>a mesma quantia, sem dividir</strong>, e cada jogador lê a <strong>própria</strong> tabela de classe — quem escolheu trilha usa a coluna <em>XP Especial</em> e sobe mais devagar, que é justamente o custo que o sistema cobra dela. Tesouro real, XP de criatura e ideias <strong>somam por cima</strong>.</p>" +
        "<p>Como referência, para levar um grupo <strong>do 1º ao 7º nível em seis aventuras</strong>: conceda <strong>3.000 · 3.000 · 4.000 · 3.000 · 13.000 · 10.000</strong>, uma quantia ao fim de cada uma, calibrado pela classe mais cara da mesa — o <strong>Sensível à Força com Senda</strong>, cuja coluna <em>XP Especial</em> acumula 3.000 · 6.000 · 10.000 · 13.000 · 26.000 · 36.000. Repare no salto entre o 5º e o 6º nível: <strong>a curva do OD2 dobra ali</strong>, e um arco que atravessa esse degrau precisa valer, sozinho, mais que tudo o que veio antes.</p>" +
        "<p class='nota-casa'><em>Se a sua mesa preferir marcos puros — \"todos sobem para o 4º\" —, funciona e é mais simples. O custo é que os conjuradores e as especializações ganham de graça o que o sistema cobra deles; em cinco aventuras é irrelevante, em vinte aparece.</em></p>",
    },
    {
      title: "Tabelas de preparação",
      content:
        "<p><strong>Sessão relâmpago:</strong> role <strong>1 Gancho + 1 Local + 1 Complicação</strong>, jogue um <strong>PNJ</strong> no meio e deixe os jogadores puxarem o fio.</p>" +
        "<h2>Ganchos de aventura</h2>" +
        rolagem(12, [
          "Um cargueiro à deriva emite um sinal de socorro automático — e ninguém responde.",
          "Uma recompensa foi colocada sobre a cabeça de um dos PCs (justa ou não).",
          "Um contato pede que transportem uma carga \"que não deve ser inspecionada\".",
          "Um Holocron perdido surge no mercado negro — e mais de uma facção o quer.",
          "Uma colônia de fronteira parou de responder às transmissões.",
          "Um oficial imperial deserta e oferece códigos em troca de extração.",
          "Um antigo mestre (Jedi ou Sith) reaparece com um pedido — ou uma cobrança.",
          "Uma dívida com um Hutt venceu, e o cobrador não aceita mais desculpas.",
          "Ruínas de uma civilização pré-República foram achadas num mundo proibido.",
          "Um cristal kyber bruto foi localizado — e um Inquisidor está a caminho.",
          "Uma nave-prisão sofre um motim durante o transporte dos PCs (ou de um aliado).",
          "Alguém está roubando a identidade de um PC pela galáxia.",
        ]) +
        "<h2>Contratos / mural de serviços</h2>" +
        rolagem(10, [
          "Escoltar um diplomata nervoso por território hostil.",
          "Recuperar uma carga roubada de um armazém vigiado.",
          "Capturar (vivo) um alvo escondido no submundo.",
          "Sabotar um posto de abastecimento inimigo.",
          "Contrabandear refugiados para fora de um mundo sitiado.",
          "Achar, reparar e trazer de volta uma nave abandonada.",
          "Roubar dados de um cofre corporativo.",
          "Proteger uma remessa de Beskar de piratas.",
          "Investigar o sumiço de uma equipe de mineração.",
          "Entregar uma mensagem que muita gente quer impedir.",
        ]) +
        "<h2>Complicações — jogue no meio da cena</h2>" +
        rolagem(12, [
          "O contratante mentiu sobre o objetivo real.",
          "Uma facção rival chega com a mesma missão.",
          "A nave sofre uma pane no pior momento.",
          "Um aliado é, na verdade, um informante.",
          "Uma patrulha aparece para uma \"inspeção de rotina\".",
          "O alvo é inocente — ou uma criança.",
          "Um caçador de recompensas segue os PCs.",
          "O pagamento é em algo mais perigoso que Créditos.",
          "Um PC reconhece alguém do próprio passado.",
          "A Força sussurra um aviso (dê uma premonição).",
          "A saída planejada está bloqueada.",
          "Alguém do grupo está sendo chantageado.",
        ]) +
        "<h2>PNJ relâmpago — role os três</h2>" +
        tabela(
          ["d8", "Espécie", "Papel", "d10", "Traço marcante"],
          [
            ["1", "Humano", "Mercenário", "1", "Cheio de cicatrizes"],
            ["2", "Twi'lek", "Informante", "2", "Ganancioso"],
            ["3", "Rodiano", "Comerciante", "3", "Leal até demais"],
            ["4", "Wookiee", "Oficial", "4", "Covarde, mas esperto"],
            ["5", "Trandoshano", "Criminoso", "5", "Fala pelos cotovelos"],
            ["6", "Mon Calamari", "Piloto", "6", "Devendo a alguém perigoso"],
            ["7", "Zabrak", "Técnico", "7", "Ex-militar amargurado"],
            ["8", "Droide", "Burocrata", "8", "Esconde um segredo grave"],
            ["—", "—", "—", "9", "Viciado em apostas"],
            ["—", "—", "—", "10", "Secretamente sensível à Força"],
          ],
        ) +
        "<h2>Locais / cenas</h2>" +
        rolagem(8, [
          "Cantina lotada de um spaceport.",
          "Interior de um cargueiro à deriva.",
          "Mercado negro subterrâneo.",
          "Base ou posto avançado imperial.",
          "Superfície de um mundo extremo (deserto, gelo, selva).",
          "Estação espacial orbital.",
          "Palácio de um chefe do crime.",
          "Ruínas antigas ligadas à Força.",
        ]) +
        "<h2>Achados / recompensas</h2>" +
        rolagem(10, [
          "Chips de crédito (role 1d6 × 100 CR por grau de perigo).",
          "Um aparato útil (kit médico, sensor, mira a laser).",
          "Uma arma de energia melhor que a atual.",
          "Peças de armadura — talvez um <strong>fragmento de Beskar</strong>.",
          "Um droide (astromecânico, protocolo ou de combate).",
          "Dados ou códigos valiosos (vendáveis ou úteis).",
          "Um <strong>cristal kyber</strong> bruto.",
          "Um mapa/coordenadas para outro tesouro.",
          "Um <strong>artefato da Força</strong> (holocron, relíquia).",
          "Uma nave — ou a escritura de uma.",
        ]),
    },
    {
      title: "Relíquias tecnológicas — o artefato desta galáxia",
      content:
        "<p>Uma relíquia é tecnologia <strong>antiga, achada e não compreendida</strong> — o que o Space Dragon usa no lugar do item mágico amaldiçoado. Em Star Wars é o holocron no fundo de um templo, o motor Rakata num destroço, a arma que ninguém sabe quem construiu.</p>" +
        "<p>Role, ou escolha:</p>" +
        tabela(
          ["<strong>Tipo</strong> (1d20)", "<strong>Nível Tecnológico</strong> (1d20)", "<strong>Instabilidade</strong> (1d10)"],
          [
            ["1-3 Arma · 4-6 Armadura · 7-9 Item comum", "1-3 → NT 1 · 4-6 → NT 2 · 7-8 → NT 3", "1 → 10% · 2 → 20% · 3 → 30%"],
            ["<strong>10-18 Aparato tecnológico</strong> <em>(1d6: 1-2 ofensivo · 3-4 defensivo · 5-6 utilitário)</em>", "9-10 → NT 4 · 11-12 → NT 5 · 13-14 → NT 6", "4 → 40% · 5 → 50% · 6 → 60%"],
            ["19 Veículo · 20 Nave", "15-16 → NT 7 · 17-18 → NT 8 · 19 → NT 9 · 20 → NT 10", "7 → 70% · 8 → 80% · 9 → 90%"],
            ["", "", "<strong>10 → falha na primeira tentativa e a relíquia se inutiliza</strong>"],
          ],
        ) +
        "<p><strong>A instabilidade é segredo do Mestre.</strong> Role percentual a cada uso; falhou, a relíquia dá defeito. Um Técnico pode <strong>estimar</strong> a instabilidade com um teste de Inteligência, nunca saber o número.</p>" +
        tabela(
          ["<strong>Particularidade</strong> (1d10)", "<strong>Quem a construiu</strong> (1d10)", "<strong>Consequência do uso</strong> (1d10)"],
          [
            ["1-5 Nenhuma", "1-5 Humanos", "1-5 Nenhuma"],
            ["6-7 <strong>Formato irreconhecível</strong> — não se parece com nada que se use hoje", "6-7 Espécie humanoide conhecida", "6-7 <strong>A instabilidade deteriora</strong> — sobe 10% a cada uso"],
            ["8-9 <strong>Duas relíquias em uma</strong> — role de novo", "8-9 <strong>Os Antigos</strong> <em>(os Rakata / Construtores do Infinito)</em>", "8-9 <strong>Contaminação radioativa</strong> em quem a usa"],
            ["10 <strong>Utilizável por qualquer classe</strong>, ignorando a restrição normal", "10 <strong>Desconhecidos</strong>", "10 <strong>A relíquia é consciente</strong>"],
          ],
        ) +
        "<h2>As três entradas que valem a rolagem inteira</h2>" +
        "<p><strong>\"Utilizável por qualquer classe\"</strong> é a única forma legítima de um Operativo empunhar um aparato ofensivo, ou de um não-Sensível carregar algo que só um Jedi deveria carregar. Como recompensa única, ela vale mais do que qualquer número.</p>" +
        "<p><strong>\"Os Antigos\"</strong> é a assinatura Rakata: um Império do Infinito que dominou a galáxia antes da República, movido a Força, e cuja tecnologia ainda funciona sem que ninguém saiba por quê. É o gancho de arco inteiro embutido numa linha de tabela.</p>" +
        "<p><strong>\"A relíquia é consciente\"</strong> é o <strong>holocron</strong>. Ela conversa, tem opinião sobre quem a carrega, mente por conveniência e quer alguma coisa. Não role isso por acaso — quando sair, pare a sessão e decida o que ela quer, porque acaba de entrar um PNJ na mesa.</p>",
    },
    {
      title: "Planetas e perigos do espaço",
      content:
        "<h2>Planetas — gerar, e nomear</h2>" +
        "<p>O gerador completo (superfície, atmosfera, fauna, flora, sociedade, gravidade e nível tecnológico) está no Estrela Dracônica. O que ele não tem é a camada de Star Wars.</p>" +
        "<p><strong>Três perguntas antes de rolar qualquer coisa:</strong></p>" +
        "<ol>" +
        "<li><strong>Onde fica?</strong> <em>Núcleo</em> (rico, vigiado, burocrático, NT alto) · <em>Orla Média</em> (mundos de verdade, com política própria) · <em>Orla Exterior</em> (fronteira, sem lei, NT baixo, é onde a campanha acontece) · <em>Regiões Desconhecidas</em> (Chiss, ruínas, nada de mapa).</li>" +
        "<li><strong>Um bioma só, e forte.</strong> A galáxia é planeta-do-episódio: deserto, gelo, floresta, pântano, oceano, cidade-planeta, vulcânico, campina. <strong>Um</strong> — resistir à tentação de fazer um mundo variado é o que torna o planeta memorável.</li>" +
        "<li><strong>Por que alguém iria lá?</strong> Uma indústria, uma rota, um santuário, um cárcere, uma ruína. Sem isso, é cenário; com isso, é aventura.</li>" +
        "</ol>" +
        "<p><strong>Nomear.</strong> A designação oficial de um mundo não catalogado é a <strong>sigla do traço dominante + os números que você rolou</strong>: um mundo desértico e hostil vira <strong>DH-53418</strong>, um mundo oceânico habitado vira <strong>OH-2207</strong>. Quem mora lá o chama de outra coisa, e é <strong>esse</strong> nome que os personagens aprendem — a diferença entre a designação e o nome local diz, sozinha, de que lado da galáxia você está.</p>" +
        "<h2>Perigos do espaço</h2>" +
        "<p>Vácuo, descompressão, gravidade zero, radiação e falha de suporte de vida usam as <strong>regras do Space Dragon</strong> (Contaminação Radioativa e Descompressão não existem no OD2 e vêm de lá). Trate uma nave sendo invadida como uma <strong>masmorra</strong> — corredores, câmaras e sistemas de segurança no lugar de armadilhas.</p>" +
        "<p><strong>Vácuo espacial.</strong> Sem proteção, o personagem <strong>perde a consciência imediatamente</strong> e está <strong>morto em Constituição × 5 segundos</strong>. Mesmo resgatado a tempo, faz uma <strong>JPC</strong> para não morrer de falha cardíaca, e sofre os efeitos de uma <strong>descompressão por 1d6 dias</strong>.</p>" +
        "<p class='nota-casa'>&#9888; <strong>Correção da casa.</strong> Uma versão anterior dizia que o vácuo era \"letal em poucas rodadas, com JPC a cada rodada\" — <strong>está errado</strong>. Não há rodada nenhuma: quem é jogado no espaço sem traje <strong>apaga na hora</strong>. Para um Humano de Constituição 12, a morte vem em <strong>60 segundos</strong>, e a única jogada é a do resgate. É uma cena de contagem regressiva, não de combate.</p>" +
        "<p><strong>Falta de oxigênio (dentro da nave).</strong> Prende a respiração por <strong>Constituição × 10 segundos</strong>; depois disso, <strong>JPC</strong> para se manter consciente. Uma falha o leva imediatamente a <strong>−1 PV</strong> e, a caminho da morte, ele <strong>falha automaticamente</strong> em todas as JPC seguintes.</p>" +
        "<p><strong>Gravidade alterada</strong> muda o movimento base proporcionalmente.</p>" +
        "<p><em>Equipamento que resolve: <strong>Selagem Espacial</strong> e <strong>Cilindro de Oxigênio</strong>.</em></p>",
    },
  ],
};

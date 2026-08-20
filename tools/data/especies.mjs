// Espécies de "Star Dragon" — transcritas de SW-SD-Especies.md.
//
// Tipo nativo do OD2: "race" + uma "race_ability" por habilidade. Campos
// mecânicos seguros são preenchidos (natural_armor, jp, infravision, movement);
// o restante fica na descrição, porque o sistema não modela essas regras.
//
// Lembrete do cenário: as sete espécies não-humanas NÃO usam o molde Mutante
// do Space Dragon e não pagam Degeneração — são criações do cenário.
//
// O molde Mutante chegou aqui ANTES do cofre: foi transcrito do PDF do Space
// Dragon (cap. 2.3, tabelas T2-1 a T2-5) porque o cofre só tinha o ponteiro
// ("escolha um Aprimoramento e uma Degeneração na T2-1") e a tabela nunca
// tinha sido transportada. Em 20/08/2026 o capítulo entrou no cofre, com a
// mesma conversão — o SW-SD-Especies.md voltou a ser a fonte de verdade
// também para ele. Mudou lá? Mude aqui.

const RODAPE_SENSIVEL =
  "<p><em>Todos os povos vivos podem gerar Sensíveis à Força; Droides não — cérebro positrônico não sonha.</em></p>";

// Idiomas da galáxia (SW-SD-Especies.md § Idiomas da galáxia). A regra geral
// acompanha todas as espécies; o idioma próprio de cada povo vai na descrição
// dela. A tabela completa é uma habilidade avulsa, no fim do arquivo.
const IDIOMAS_REGRA =
  "<p><strong>Idiomas.</strong> Todo personagem começa falando o <strong>idioma do seu povo</strong> e o <strong>Básico Galáctico</strong> — o idioma comum das rotas comerciais. Idiomas <strong>adicionais</strong> vêm do <strong>modificador de Inteligência</strong>. <strong>Ler e escrever</strong> é outra coisa: divida a <strong>Inteligência por 6</strong>, arredondando para baixo — o resultado é em quantos idiomas o personagem é alfabetizado (escolha quais). <strong>Inteligência 6 ou menos = analfabeto</strong>, nem no idioma natal. Quem fala mas não escreve tem um <strong>sotaque</strong> que o denuncia como forasteiro.</p>";

export const especies = [
  {
    nome: "Humano",
    flavor: "<p>Os mais comuns, versáteis e adaptáveis da galáxia.</p>",
    descricao:
      "<p>Seguem as regras de humano do Old Dragon 2 na íntegra (sem os modificadores de atributo do Space Dragon).</p>" +
      "<p><strong>Perguntas ao criar um Humano:</strong> O que o move pela galáxia? O que defende? O que deseja destruir?</p>" +
      "<p><strong>Idioma próprio:</strong> o Básico Galáctico é a língua franca humana — na prática, o Humano começa com o Básico e um idioma à escolha no lugar do idioma natal.</p>" +
      IDIOMAS_REGRA +
      RODAPE_SENSIVEL,
    movement: 9,
    infravision: 0,
    alignment_tendency: "none",
    alignment_notes: "Qualquer.",
    habilidades: [
      { nome: "Onipresente", xp: 10, desc: "<p>+10% em toda a experiência (XP) recebida.</p>" },
      {
        nome: "Versátil",
        // Escolha livre: marcar as três faz a ficha exibir o seletor de JP
        // da aba Raça (system.jp_race_bonus), que aplica o +1 na escolhida.
        jp: { jpc: true, jpd: true, jps: true },
        desc: "<p>+1 em uma única Jogada de Proteção <strong>à sua escolha</strong>.</p><p><em>Na ficha:</em> escolha qual JP recebe o bônus no seletor que aparece nesta habilidade, na aba <strong>Raça</strong>.</p>",
      },
    ],
  },
  {
    nome: "Wookiee",
    flavor: "<p>Guerreiros leais e ferozes das florestas de Kashyyyk.</p>",
    descricao:
      "<p>Gigantes peludos de força lendária e lealdade absoluta. A dívida de vida — o <em>wyrkrrorro</em> — pesa mais que qualquer contrato.</p>" +
      "<p><strong>Perguntas ao criar um Wookiee:</strong> Que dívida de vida o move? Como lida com a barreira do Shyriiwook? O que o tirou de Kashyyyk?</p>" +
      "<p><strong>Idioma próprio: Shyriiwook.</strong> Humanos <strong>entendem</strong>, mas não conseguem <strong>falar</strong> — o aparelho vocal não acompanha.</p>" + IDIOMAS_REGRA,
    movement: 9,
    infravision: 0,
    alignment_tendency: "neutro",
    alignment_notes: "Qualquer, tende a Neutro.",
    habilidades: [
      {
        nome: "Força Bruta",
        desc: "<p>Seu dano desarmado é <strong>1d6</strong>, em vez do nocaute padrão.</p>",
        natural_weapon: { damage: "1d6", damage_type: "bludgeoning", weapon_size: "medium" },
      },
      { nome: "Fúria Selvagem", desc: "<p>Com os pontos de vida abaixo da metade, causa <strong>+2 no dano corpo a corpo</strong>.</p>" },
      { nome: "Casca Peluda", natural_armor: 1, desc: "<p>O pelo denso e a pele grossa concedem <strong>+1 natural na Classe de Armadura</strong>.</p>" },
      { nome: "Inabalável", desc: "<p><strong>+2 em Jogadas de Proteção</strong> contra medo e intimidação.</p>" },
      { nome: "Restrição — Mãos Grandes Demais", desc: "<p>Armas pequenas causam <strong>−1 no dano</strong> nas suas mãos.</p>" },
    ],
  },
  {
    nome: "Twi'lek",
    flavor: "<p>Carismáticos habitantes de Ryloth, guiados por seus lekku sensoriais.</p>",
    descricao:
      "<p>Os lekku — os tentáculos cefálicos — são órgão sensorial, língua secreta e cartão de visitas. Um povo que aprendeu a sobreviver ao charme e à escravidão em doses iguais.</p>" +
      "<p><strong>Perguntas ao criar um Twi'lek:</strong> Saiu de Ryloth por escolha ou por pressão? Usa o charme como ferramenta ou como escudo? O que seus lekku \"sentem\" que ele preferia não saber?</p>" +
      "<p><strong>Idioma próprio: Ryl.</strong> Tem um dialeto silencioso de <strong>lekku</strong>, que só Twi'leks leem.</p>" + IDIOMAS_REGRA,
    movement: 9,
    infravision: 0,
    alignment_tendency: "neutro",
    alignment_notes: "Qualquer, tende a Neutro.",
    habilidades: [
      { nome: "Sedução Inata", desc: "<p>+1 em testes de Carisma e em testes de reação a seu favor.</p>" },
      { nome: "Lekku Sensorial", desc: "<p>Chance de <strong>1-2 em 1d6</strong> de perceber más intenções ou mentiras a até 6 metros. O Mestre faz o teste em segredo.</p>" },
      { nome: "Resistência Térmica", desc: "<p>Imune a penalidades por calor extremo.</p>" },
    ],
  },
  {
    nome: "Rodiano",
    flavor: "<p>Caçadores natos de Rodia, guiados por instinto e tradição.</p>",
    descricao:
      "<p>Para um Rodiano, a caça é cultura, esporte e religião. Os olhos multifacetados enxergam calor onde outros só veem escuro.</p>" +
      "<p><strong>Perguntas ao criar um Rodiano:</strong> O que (ou quem) seu Rodiano caça? A honra da caça ainda importa? Como reage ao ser o caçado?</p>" +
      "<p><strong>Idioma próprio: Rodês.</strong></p>" + IDIOMAS_REGRA,
    movement: 9,
    infravision: 18,
    infravision_notes: "Visão térmica: só detecta seres vivos e fontes de calor.",
    alignment_tendency: "caotico",
    alignment_notes: "Qualquer, tende a Caótico.",
    habilidades: [
      { nome: "Caçador Nato", desc: "<p>+1 em rastrear, procurar e ouvir ruídos.</p>" },
      { nome: "Visão Térmica", desc: "<p>Infravisão de <strong>18 metros</strong>, mas que só detecta seres vivos e fontes de calor.</p>" },
      { nome: "Sangue Frio", desc: "<p>Ataques contra um alvo que já o feriu antes são <strong>Fáceis</strong>.</p>" },
    ],
  },
  {
    nome: "Droide",
    flavor: "<p>Construtos programados — trabalhadores, guerreiros, médicos ou companheiros. <em>Molde: Andróide.</em></p>",
    descricao:
      "<p>Usam o molde <strong>Andróide</strong> do Space Dragon. <strong>Restrição importante:</strong> Droides não são sensíveis à Força e não podem ser da classe Sensível à Força.</p>" +
      "<p><strong>Perguntas ao criar um Droide:</strong> Qual seu propósito original? Sua memória já foi apagada? Ele se considera uma pessoa?</p>" +
      "<p><em>Nota de conversão:</em> o texto original do Andróide trazia <em>Corpo Robótico</em> (JPC Fáceis) <strong>e</strong> <em>Resistência Física</em> (+2 na JPC) — a mesma coisa vinda de duas fontes. Aqui foram fundidas numa habilidade só: a JPC Fácil já <em>é</em> o +2.</p>" +
      "<p><strong>Idioma próprio: Binário.</strong> Não se <em>fala</em>: entende-se. Droides são fluentes por construção.</p>" + IDIOMAS_REGRA,
    movement: 9,
    infravision: 18,
    infravision_notes: "Sensores integrados, permanentes.",
    alignment_tendency: "none",
    alignment_notes: "Qualquer.",
    habilidades: [
      {
        nome: "Corpo Robótico",
        desc: "<p>Metal e polímeros avançados não dormem, não comem e não respiram, e adoecer ou envenenar-se é quase impossível para eles — todas as suas <strong>Jogadas de Proteção de Constituição (JPC) são Fáceis</strong> (+2).</p>" +
          "<p><em>\"Não adoecem nem se envenenam\" é sabor; mecanicamente, o Droide <strong>rola</strong> a JPC, com a categoria Fácil. No Space Dragon original o andróide <strong>vencia automaticamente</strong> toda JPF — o rebaixamento para +2 é deliberado, porque sucesso automático apaga cenas inteiras de perigo ambiental.</em></p>" +
          "<p><strong>Não pode aprender poderes da Força.</strong> Nunca regenera pontos de vida sozinho: precisa de <strong>reparo especializado</strong> (ferramentas + teste de Inteligência, ou cura tecnológica). Ainda é suscetível a morte, alguns tipos de paralisia, cegueira, surdez e drenagem de energia.</p>",
      },
      { nome: "Cérebro Positrônico", desc: "<p>Efeitos que afetam a mente são <strong>Difíceis</strong> contra o Droide — mas seus Testes de Reação e interações sociais também são <strong>Difíceis</strong>: a máquina não charmeia.</p>" },
      { nome: "Vulnerabilidade a Íon", desc: "<p><em>(acréscimo de Star Wars)</em> Ataques de pulso iônico causam <strong>dano dobrado</strong>; em um acerto crítico, o Droide fica <strong>desativado</strong> até ser reinicializado — uma rodada inteira de outro personagem, ou um teste de <em>Operar e Consertar Máquinas</em>.</p>" +
        "<p><strong>A propriedade Íon, por inteiro</strong> (afeta apenas <strong>máquinas</strong>: droides, veículos, naves, aparatos e portas):</p><ul>" +
        "<li><strong>Droides e construtos:</strong> dano dobrado; em crítico, desativado até ser reinicializado.</li>" +
        "<li><strong>Veículos e naves:</strong> não causa dano no casco — <strong>desliga um sistema</strong> (escudo, propulsão, armas, sensores — role ou escolha) por <strong>1d4 rodadas</strong>.</li>" +
        "<li><strong>Criaturas vivas:</strong> <strong>nenhum efeito</strong>. Um canhão de íon é inútil contra um Wookiee, e é exatamente essa a graça dele.</li>" +
        "<li><strong>Aparatos tecnológicos</strong> atingidos sofrem <strong>curto-circuito</strong> e precisam de reparo.</li></ul>" },
      { nome: "Sensores Integrados", desc: "<p><em>(acréscimo de Star Wars)</em> Infravisão de <strong>18 metros</strong>, permanente.</p>" },
    ],
  },
  {
    nome: "Zabrak",
    flavor: "<p>Guerreiros de vontade férrea, marcados pelos chifres e pelas tatuagens de clã.</p>",
    descricao:
      "<p>Dois corações, uma vontade só. Os Zabrak encaram a dor como assunto pendente, não como obstáculo.</p>" +
      "<p><strong>Perguntas ao criar um Zabrak:</strong> Que mundo (Iridônia, Dathomir) marcou seus chifres? O que sua vontade se recusa a largar? Canaliza a resiliência em disciplina ou em fúria?</p>" +
      "<p><strong>Idioma próprio: Zabraki.</strong></p>" + IDIOMAS_REGRA,
    movement: 9,
    infravision: 0,
    alignment_tendency: "none",
    alignment_notes: "Qualquer.",
    habilidades: [
      { nome: "Dois Corações", desc: "<p><strong>+2 na JPC</strong> contra veneno, doença e asfixia. Recupera pontos de vida naturalmente como se sempre houvesse descansado adequadamente.</p>" },
      { nome: "Resistência à Dor", daily_uses: 1, desc: "<p>Ao chegar a 0 PV sem morrer, faz uma <strong>JPC</strong>; se passar, continua agindo (cambaleante) até o fim da próxima rodada. Uma vez por combate.</p>" },
      { nome: "Vontade Férrea", desc: "<p><strong>+1 em JPS</strong> contra medo, encantamento e controle mental.</p>" },
    ],
  },
  {
    nome: "Mon Calamari",
    flavor: "<p>Anfíbios de olhos salientes, líderes serenos e engenheiros natos de Mon Cala.</p>",
    descricao:
      "<p>Nasceram nos oceanos e acabaram desenhando as frotas que os tiraram deles. Calma que desarma, engenho que constrói.</p>" +
      "<p><strong>Perguntas ao criar um Mon Calamari:</strong> Deixou os oceanos por dever, exílio ou curiosidade? Constrói, lidera, ou ambos? O que a calma esconde quando provocada?</p>" +
      "<p><strong>Idioma próprio: Mon Calamariano</strong> (compartilhado com os Quarren) — difícil de pronunciar fora d'água.</p>" + IDIOMAS_REGRA,
    movement: 9,
    movement_swim: 9,
    movement_notes: "Nada com deslocamento pleno.",
    infravision: 18,
    infravision_notes: "Apenas debaixo d'água ou em luz fraca.",
    alignment_tendency: "ordeiro",
    alignment_notes: "Qualquer, tende a Ordeiro.",
    habilidades: [
      { nome: "Anfíbio", desc: "<p>Respira dentro e fora d'água, nada com deslocamento pleno e ignora penalidades de combate submerso.</p>" },
      { nome: "Visão Aquática", desc: "<p>Infravisão de <strong>18 metros</strong> debaixo d'água ou em luz fraca.</p>" },
      { nome: "Engenho Náutico", desc: "<p>+1 para construir, reparar e operar máquinas e naves (soma-se a Pilotar e ao uso de aparatos).</p>" },
      { nome: "Liderança Serena", daily_uses: 1, desc: "<p>Uma vez por dia, concede a um aliado que o escute um novo teste em uma Jogada de Proteção contra medo ou pânico.</p>" },
    ],
  },
  {
    nome: "Trandoshano",
    flavor: "<p>Caçadores reptilianos de Dosha, cuja carne se fecha sozinha.</p>",
    descricao:
      "<p>Cada presa vale pontos aos olhos da Guardiã dos Placares. Voltar de mãos vazias é pior que morrer.</p>" +
      "<p><strong>Perguntas ao criar um Trandoshano:</strong> Que presas somam pontos para a Guardiã dos Placares? A rivalidade com Wookiees é pessoal ou herdada? O que faria para não voltar de mãos vazias?</p>" +
      "<p><strong>Idioma próprio: Dosh.</strong></p>" + IDIOMAS_REGRA,
    movement: 9,
    infravision: 0,
    alignment_tendency: "caotico",
    alignment_notes: "Qualquer, tende a Caótico.",
    habilidades: [
      { nome: "Regeneração", desc: "<p>A cada rodada inteira sem sofrer dano, recupera <strong>1 PV</strong>. Fora de combate, a recuperação natural é dobrada, e membros perdidos voltam a crescer em semanas. Não funciona abaixo de 0 PV.</p>" },
      {
        nome: "Garras e Escamas",
        natural_armor: 1,
        desc: "<p>Dano desarmado <strong>1d4 perfurante</strong> e <strong>+1 natural na Classe de Armadura</strong>.</p>",
        natural_weapon: { damage: "1d4", damage_type: "piercing", weapon_size: "small" },
      },
      { nome: "Caçador de Presas", desc: "<p>+1 em rastrear e agarrar. Ataques para subjugar ou capturar (não matar) são <strong>Fáceis</strong>.</p>" },
      { nome: "Restrição — Sangue-frio", desc: "<p>Em frio intenso, testes de Destreza e o movimento ficam <strong>Difíceis</strong> até se aquecer.</p>" },
    ],
  },
  {
    nome: "Chiss",
    flavor: "<p>Estrategistas de pele azul e olhos rubros das Regiões Desconhecidas.</p>",
    descricao:
      "<p>A Ascendência raramente deixa os seus saírem. Quem sai carrega a disciplina de Csilla e uma frieza que os outros povos confundem com desprezo.</p>" +
      "<p><strong>Perguntas ao criar um Chiss:</strong> O que fez um Chiss deixar a reclusão da Ascendência? O que procura ao ler as pessoas? Sua frieza é armadura, disciplina ou vazio?</p>" +
      "<p><strong>Idioma próprio: Cheunh</strong> — raro fora das Regiões Desconhecidas. O Chiss já começa com um idioma extra (ver <em>Mente Tática</em>).</p>" + IDIOMAS_REGRA,
    movement: 9,
    infravision: 18,
    infravision_notes: "Enxerga calor e seres vivos no escuro.",
    alignment_tendency: "ordeiro",
    alignment_notes: "Qualquer, tende a Ordeiro.",
    habilidades: [
      { nome: "Visão Infravermelha", desc: "<p>Infravisão de <strong>18 metros</strong> — calor e seres vivos no escuro.</p>" },
      { nome: "Mente Tática", desc: "<p>+1 na Iniciativa e +1 para analisar inimigos e prever manobras. Começa o jogo com um idioma adicional.</p>" },
      { nome: "Sangue-frio", desc: "<p><strong>+1 em JPS</strong> contra medo, provocação e intimidação. Nunca age por pânico.</p>" },
      { nome: "Disciplina de Csilla", desc: "<p>Imune a penalidades por frio extremo.</p>" },
    ],
  },
  {
    // ══════════════════════════════════════════════════════════════════════
    // MUTANTE (Homo novus) — o molde do Space Dragon, cap. 2.3, virado raça.
    //
    // Até aqui o Mutante existia no módulo só como um PONTEIRO: uma habilidade
    // avulsa dizendo "escolha um Aprimoramento e uma Degeneração na tabela
    // T2-1 do SD". A tabela nunca foi transportada, então quem não tivesse o
    // livro do Space Dragon aberto na mesa não conseguia usar o molde. Agora
    // as vinte mutações estão no compêndio, cada uma como uma race_ability
    // arrastável.
    //
    // O QUE A CONVERSÃO PRECISOU RESOLVER (o livro fala outra língua):
    //   Intelecto → Inteligência · Ciência → Sabedoria · Comunicação → Carisma
    //   JPR → JPD · JPF → JPC · JPM → JPS
    //   coeficiente de proteção (CP) → CA, na compressão que o cenário já usa
    //     em outros lugares (−5 de CP virou −2 de CA na regra de surpresa);
    //     aqui, ±2 de CP vira ±1 de CA.
    //   "resistência mental de 5%" → o OD2 não tem RM. Some, e o que sobra da
    //     habilidade é o bônus de JPS, que é o que ela sempre quis dizer.
    //   "poder mental" → Poder da Força · "magia de 1º círculo" → aparato,
    //     pelo pilar do cenário: a Força ficou com a metade mental do livro de
    //     magias e todo o resto virou bancada do Técnico.
    //
    // O QUE NÃO ENTROU, E POR QUÊ: o livro dá ao Homo sapiens um +2 num
    // atributo e −2 em outro, e diz que o Mutante NÃO os recebe. Neste cenário
    // o Humano já não tem modificador de atributo nenhum, então a cláusula não
    // tem objeto — está anotada na descrição para ninguém "consertar" isso
    // depois somando os modificadores de volta.
    // ══════════════════════════════════════════════════════════════════════
    nome: "Mutante",
    flavor: "<p>Homo novus — a humanidade que a galáxia dobrou. <em>Molde coringa do Space Dragon.</em></p>",
    descricao:
      "<p>A mistura dos genes humanos por quase um milhão de anos, espalhada por milhares de mundos, gerou variações tão distantes da linha evolutiva padrão que se convencionou classificá-las como <strong>Homo novus</strong>. A chance de um bebê humano nascer assim é de cerca de <strong>0,1%</strong> — mas com a população humana passando dos trilhões, são <strong>milhões</strong> de mutantes na galáxia. Em comunidades isoladas, a probabilidade chega a 100%.</p>" +
      "<p>Eles enfrentam mais resistência à aceitação que os droides, e em geral consideram o termo <em>mutante</em> ofensivo. Longe de formarem um grupo unido, adaptam-se ao ambiente ao redor como podem — uma parábola social da evolução biológica que os criou.</p>" +
      "<p><strong>Como se joga:</strong> escolha <strong>um Aprimoramento</strong> e <strong>uma Degeneração</strong> nas pastas <em>Mutante — Aprimoramentos</em> e <em>Mutante — Degenerações</em>, e arraste as duas para a ficha. Todo o resto é igual ao <strong>Humano</strong>. Não há aprimoramento sem degeneração: é o balanço genético, e é a regra que impede o molde de virar um Humano melhor.</p>" +
      "<p><em>Variante do livro: em vez de escolher, role <strong>2d10</strong> na tabela de mutações — um dado para cada coluna, repetindo a rolagem se saírem iguais. O cenário adotou a escolha porque o molde existe para <strong>criar um povo</strong> (um Nautolano, um Ceriano), e povo não se sorteia.</em></p>" +
      "<p><strong>Atributos:</strong> o Mutante <strong>não recebe modificador de atributo nenhum</strong> por ser Mutante. <em>(No Space Dragon o Humano ganhava +2 num atributo e −2 em outro, e o livro tirava isso do Mutante. Aqui o Humano já não tem esses modificadores — a cláusula não tem o que remover. Os únicos ajustes de atributo do molde vêm das mutações</em> Atributo Ampliado <em>e</em> Atributo Diminuído<em>.)</em></p>" +
      "<p><strong>Perguntas ao criar um Mutante:</strong> Que fenótipo o denuncia à primeira vista? Ele veio de uma comunidade isolada ou nasceu sozinho no meio de uma família comum? Quem já usou a palavra <em>mutante</em> na frente dele?</p>" +
      "<p><strong>Idioma próprio:</strong> nenhum — fala o idioma de onde nasceu, como qualquer humano.</p>" +
      IDIOMAS_REGRA +
      "<p><em><strong>Droides não podem ser Mutantes.</strong> Homo novus é uma variação do humano; o droide é Homo machina, outro molde inteiro.</em></p>" +
      RODAPE_SENSIVEL,
    movement: 9,
    infravision: 0,
    alignment_tendency: "none",
    alignment_notes: "Qualquer.",
    habilidades: [
      {
        nome: "Balanço Genético",
        desc:
          "<p>Todo aprimoramento evolutivo vem acompanhado da degeneração de outra característica. Você escolhe <strong>uma mutação de cada coluna</strong> — nunca só a boa.</p>" +
          "<p>As vinte mutações estão no compêndio como habilidades soltas, em duas pastas. Arraste <strong>a sua Aprimoramento</strong> e <strong>a sua Degeneração</strong> para a ficha, junto com esta.</p>",
      },
      {
        nome: "Herança Humana",
        desc:
          "<p>Fora as duas mutações, você é um Humano: mesmo movimento, mesma expectativa de vida (salvo <em>Longevidade</em> ou <em>Baixa Expectativa de Vida</em>) e mesma liberdade de classe.</p>" +
          "<p><strong>Você não recebe o <em>Onipresente</em> nem o <em>Versátil</em> do Humano</strong> — as duas mutações ocupam o lugar deles. Um Mutante com <em>Cognição Acelerada</em> ganha <strong>+30% de XP</strong>, e não +10% somado a +30%.</p>",
      },
      {
        nome: "Fenótipo",
        desc:
          "<p>O <strong>fenótipo</strong> é como a mutação aparece no corpo ou no comportamento. As descrições trazem sugestões, mas <strong>invente o seu</strong>: força ampliada pode ser braços extras, olfato aguçado pode ser antenas, longevidade pode dar uma pele arroxeada.</p>" +
          "<p><em>Mudanças cosméticas não alteram regra nenhuma — e são o melhor gancho de interpretação que o molde oferece.</em></p>",
      },
    ],
  },
];

// Habilidades avulsas de espécie, coringa para criar povos na hora.
// ── As vinte mutações (T2-1 do Space Dragon) ─────────────────────────────────
// Uma race_ability por mutação, agrupadas em duas pastas que aninhaPastas()
// encaixa dentro de "Mutante". O jogador arrasta a sua de cada coluna.
//
// O número na frente do nome é a linha do 1d10 no livro — quem preferir rolar
// em vez de escolher acha a mutação sorteada pelo nome, sem tabela de apoio.
const APRIMORAMENTOS = [
  {
    nome: "1. Recuperação Acelerada",
    desc:
      "<p><em>Genótipo:</em> o organismo se recupera de ferimentos e traumas com mais eficiência. <em>Fenótipo:</em> feridas fecham-se mais rápido.</p>" +
      "<p>Recupera <strong>2 PV por nível</strong> a cada dia de descanso.</p>",
  },
  {
    nome: "2. Cognição Acelerada",
    xp: 30,
    desc:
      "<p><em>Genótipo:</em> o aprendizado ocorre mais rapidamente que o normal. <em>Fenótipo:</em> facilidade de entendimento e memorização.</p>" +
      "<p><strong>+30%</strong> em toda a experiência (XP) recebida.</p>" +
      "<p><em>Compare com o Humano, que ganha +10%: esta é a mutação que mais muda o ritmo de uma campanha, e é por isso que ela custa uma Degeneração como qualquer outra.</em></p>",
  },
  {
    nome: "3. Mente Avançada",
    desc:
      "<p><em>Genótipo:</em> o cérebro é mais desenvolvido que o normal. <em>Fenótipo:</em> massa encefálica proeminente.</p>" +
      "<p><strong>+2 em JPS.</strong></p>" +
      "<p><em>Conversão: o livro somava a isto uma \"resistência mental de 5%\". O Old Dragon 2 não tem Resistência Mental — o bestiário deste cenário já manda tratar RD e RM como habilidade descrita. O que sobra, e é o que a mutação sempre quis dizer, é o bônus de JPS.</em></p>",
  },
  {
    nome: "4. Sistema Imunológico Evoluído",
    desc:
      "<p><em>Genótipo:</em> os anticorpos combatem agentes nocivos com muita eficácia. <em>Fenótipo:</em> saúde inabalável.</p>" +
      "<p><strong>+2 em qualquer JPC</strong> para resistir a doenças, infecções e outros males que não envolvam ferimento ou trauma físico.</p>",
  },
  {
    nome: "5. Longevidade",
    desc:
      "<p><em>Genótipo:</em> o organismo envelhece mais devagar. <em>Fenótipo:</em> envelhecimento tardio.</p>" +
      "<p>Expectativa de vida de <strong>100 a 120 anos</strong>, com maturidade aos 30.</p>" +
      "<p>Ao atingir o <strong>10º nível</strong> e a cada <strong>dois níveis</strong> seguintes, escolha um atributo e aumente-o em <strong>1 ponto</strong>.</p>",
  },
  {
    nome: "6. Funções Vitais Superiores",
    desc:
      "<p><em>Genótipo:</em> as funções vitais correm em ritmo mais acelerado que o normal. <em>Fenótipo:</em> aspecto saudável.</p>" +
      "<p>O <strong>Dado de Vida da sua classe sobe uma categoria</strong>: d4 vira d6, d6 vira d8, d8 vira d10 e d10 vira d12.</p>" +
      "<p><em>Na prática, neste cenário: Operativo d6 → d8 · Técnico e Sensível d8 → d10 · Veterano d10 → d12.</em></p>",
  },
  {
    nome: "7. Sentido Ampliado",
    desc:
      "<p><em>Genótipo:</em> um dos sentidos se destaca dos demais. <em>Fenótipo:</em> vário — role <strong>1d6</strong> ou escolha.</p>" +
      "<table><thead><tr><th>1d6</th><th>Sentido</th><th>Fenótipo</th><th>O que faz</th></tr></thead><tbody>" +
      "<tr><td>1</td><td><strong>Visão</strong></td><td>Olhos proeminentes ou de coloração diferenciada</td><td>Enxerga no escuro e à distância, e recebe <strong>+1 para usar armas à distância</strong>. O Operativo ganha <strong>+1</strong> em jogadas de Percepção que envolvam visão</td></tr>" +
      "<tr><td>2</td><td><strong>Audição</strong></td><td>Orelhas proeminentes ou pontudas</td><td><strong>+1 em JPD</strong> e escuta com o dobro da capacidade de um humano. Operativo: <strong>+1</strong> em Percepção por audição</td></tr>" +
      "<tr><td>3</td><td><strong>Olfato</strong></td><td>Nariz aquilino ou ausência de narina</td><td>Olfato duas vezes maior que o humano; prende a respiração por <strong>Constituição × 20 turnos</strong>. Operativo: <strong>+1</strong> em Percepção por olfato</td></tr>" +
      "<tr><td>4</td><td><strong>Tato</strong></td><td>Pele com cor ou textura diferenciada</td><td>Reconhece qualquer material pelo toque e <strong>ignora 2 pontos de dano</strong> de qualquer tipo, podendo zerá-lo</td></tr>" +
      "<tr><td>5</td><td><strong>Paladar</strong></td><td>Língua longa ou bifurcada</td><td>Precisa de <strong>metade</strong> do alimento de um humano, e o corpo é <strong>imune a doenças e venenos</strong></td></tr>" +
      "<tr><td>6</td><td><strong>Sexto Sentido</strong></td><td>Percepção quase premonitiva do perigo</td><td><strong>+2 em JPD</strong> e <strong>+1 de CA</strong></td></tr>" +
      "</tbody></table>" +
      "<p><em>Conversão: o livro dá \"+2 no coeficiente de proteção\" no Sexto Sentido. CP não existe no OD2, e a escala de CA é mais apertada — o cenário já comprimiu −5 de CP para −2 de CA na regra de surpresa. Aqui, +2 de CP vira <strong>+1 de CA</strong>. Onde o livro dizia \"Gatuno\", leia <strong>Operativo</strong>.</em></p>",
  },
  {
    nome: "8. Atributo Ampliado",
    desc:
      "<p><em>Genótipo:</em> um dos atributos se destaca dos demais. <em>Fenótipo:</em> vário — role <strong>1d6</strong> ou escolha.</p>" +
      "<table><thead><tr><th>1d6</th><th>Atributo</th><th>Fenótipo</th></tr></thead><tbody>" +
      "<tr><td>1</td><td><strong>Força +3</strong></td><td>Corpo musculoso</td></tr>" +
      "<tr><td>2</td><td><strong>Destreza +3</strong></td><td>Corpo esguio e boa coordenação motora</td></tr>" +
      "<tr><td>3</td><td><strong>Constituição +3</strong></td><td>Aparência saudável</td></tr>" +
      "<tr><td>4</td><td><strong>Inteligência +3</strong></td><td>Massa encefálica proeminente</td></tr>" +
      "<tr><td>5</td><td><strong>Sabedoria +3</strong></td><td>Facilmente distraído e absorto em pensamentos</td></tr>" +
      "<tr><td>6</td><td><strong>Carisma +3</strong></td><td>Aptidão para socialização</td></tr>" +
      "</tbody></table>" +
      "<p><strong>+3 no valor do atributo</strong>, não no modificador — some ao número rolado e releia a tabela de modificadores.</p>" +
      "<p><em>Conversão dos nomes: o Space Dragon chama Inteligência de</em> Intelecto<em>, Sabedoria de</em> Ciência <em>e Carisma de</em> Comunicação<em>.</em></p>" +
      "<p><em>É a única mutação que mexe em atributo — as espécies deste cenário não alteram atributo nenhum, e esta é a exceção deliberada do molde.</em></p>",
  },
  {
    nome: "9. Poderes da Força Inatos",
    daily_uses: 1,
    desc:
      "<p><em>Genótipo:</em> o cérebro desenvolveu a capacidade inata de tocar a Força. <em>Fenótipo:</em> loucura aparente.</p>" +
      "<p>Escolha <strong>um Poder da Força de 1ª Grandeza da lista Universal</strong>. Você o manifesta <strong>uma vez por dia</strong>, sem penalidade — <strong>mesmo não sendo Sensível à Força</strong>. Se você <em>for</em> um Sensível, este uso é <strong>adicional</strong> ao seu Foco Diário.</p>" +
      "<p>Pode tentar de novo no mesmo dia com um teste de <strong>Sabedoria</strong>. <strong>Falhar custa 1d6 de dano</strong> e encerra as tentativas até o dia seguinte.</p>" +
      "<p><em>Conversão: no livro isto é</em> Poderes Mentais<em>, e dá um poder mental de 1ª grandeza. Neste cenário o poder mental É o Poder da Força, e a lista <strong>Universal</strong> é a certa porque ela não é Luz nem Sombra — é a corrente viva do cosmos, sem Caminho. O precedente já existe: o <strong>Slicer</strong> alcança a 1ª Grandeza Universal pelo intelecto, no 10º nível.</em></p>" +
      "<p><em>Isto <strong>não</strong> faz de você um Sensível à Força: não abre Grandezas, não dá Foco Diário, não dá Caminho e não conta para o Duelo da Força.</em></p>",
  },
  {
    nome: "10. Superpoderes",
    daily_uses: 1,
    desc:
      "<p><em>Genótipo:</em> o mutante é capaz de feitos incríveis e inexplicados pela ciência. <em>Fenótipo:</em> variável.</p>" +
      "<p>Escolha <strong>um aparato utilitário de NT 1 ou 2</strong> do compêndio de equipamentos. Seu corpo <strong>replica o efeito dele uma vez por dia</strong>, sem que você possua o objeto — a pele que acende como um bastão luminoso, os olhos que leem calor como um visor térmico, a garganta que emite em frequência de comlink.</p>" +
      "<p>O Mestre tem a palavra final sobre o que o corpo consegue imitar.</p>" +
      "<p><em>Conversão da casa. O livro manda escolher \"uma magia arcana ou divina de 1º círculo do Old Dragon\" — e o Old Dragon de fantasia não existe nesta galáxia. O cenário parte a magia em duas: a metade mental virou <strong>Força</strong> e todo o resto virou <strong>aparato</strong> na bancada do Técnico. Como a Força já é a mutação 9, o que sobra para a 10 é o outro lado da partilha. É a leitura mais fiel possível do original dentro deste cenário — se a sua mesa preferir, troque por um segundo Poder da Força de 1ª Grandeza.</em></p>",
  },
];

const DEGENERACOES = [
  {
    nome: "1. Recuperação Lenta",
    desc:
      "<p><em>Genótipo:</em> o organismo é mais lento em recuperar-se de ferimentos e traumas. <em>Fenótipo:</em> feridas fecham-se mais devagar.</p>" +
      "<p>Recupera <strong>1 PV por nível a cada dois dias</strong> de descanso.</p>",
  },
  {
    nome: "2. Cognição Retardada",
    xp: -30,
    desc:
      "<p><em>Genótipo:</em> o aprendizado se dá mais lentamente que o normal. <em>Fenótipo:</em> dificuldade de entendimento e memorização.</p>" +
      "<p><strong>−30%</strong> em toda a experiência (XP) recebida.</p>",
  },
  {
    nome: "3. Mente Simplificada",
    desc:
      "<p><em>Genótipo:</em> o cérebro é menos desenvolvido que o normal. <em>Fenótipo:</em> massa encefálica reduzida.</p>" +
      "<p><strong>−2 em JPS</strong>, e sua <strong>Inteligência não pode passar de 10</strong>.</p>" +
      "<p><em>Pesa mais no Técnico, que é a classe regida por Inteligência — e é exatamente por isso que ela é uma escolha, e não um sorteio.</em></p>",
  },
  {
    nome: "4. Sistema Imunológico Vulnerável",
    desc:
      "<p><em>Genótipo:</em> os anticorpos não combatem agentes nocivos com eficácia. <em>Fenótipo:</em> vulnerabilidade a doenças.</p>" +
      "<p><strong>−2 em qualquer JPC</strong> para resistir a doenças, infecções e outros males que não envolvam ferimento ou trauma físico.</p>",
  },
  {
    nome: "5. Baixa Expectativa de Vida",
    desc:
      "<p><em>Genótipo:</em> o organismo envelhece mais rapidamente. <em>Fenótipo:</em> envelhecimento precoce.</p>" +
      "<p>Expectativa de vida de <strong>40 a 50 anos</strong>, com maturidade aos 10.</p>" +
      "<p>Ao atingir o <strong>10º nível</strong> e a cada <strong>dois níveis</strong> seguintes, escolha um atributo e diminua-o em <strong>1 ponto</strong>.</p>",
  },
  {
    nome: "6. Funções Vitais Debilitadas",
    desc:
      "<p><em>Genótipo:</em> as funções vitais correm em ritmo mais lento que o normal. <em>Fenótipo:</em> aspecto doentio.</p>" +
      "<p>O <strong>Dado de Vida da sua classe cai uma categoria</strong>: d10 vira d8, d8 vira d6, d6 vira d4 e d4 vira d2.</p>" +
      "<p><em>Na prática, neste cenário: Veterano d10 → d8 · Técnico e Sensível d8 → d6 · Operativo d6 → d4.</em></p>",
  },
  {
    nome: "7. Sentido Diminuído",
    desc:
      "<p><em>Genótipo:</em> um dos sentidos é deficiente. <em>Fenótipo:</em> vário — role <strong>1d6</strong> ou escolha.</p>" +
      "<table><thead><tr><th>1d6</th><th>Sentido</th><th>Fenótipo</th><th>O que faz</th></tr></thead><tbody>" +
      "<tr><td>1</td><td><strong>Visão</strong></td><td>Olhos pequenos ou sem íris</td><td>Enxerga mal com muita luz e ao longe: <strong>−1 para usar armas à distância</strong>. O Operativo sofre <strong>−1</strong> em Percepção por visão</td></tr>" +
      "<tr><td>2</td><td><strong>Audição</strong></td><td>Orelhas pouco desenvolvidas ou parcialmente cobertas</td><td><strong>−1 em JPD</strong> e escuta com metade da capacidade de um humano. Operativo: <strong>−1</strong> em Percepção por audição</td></tr>" +
      "<tr><td>3</td><td><strong>Olfato</strong></td><td>Narinas parcialmente tampadas</td><td>Olfato duas vezes menor que o humano; prende a respiração por apenas <strong>Constituição × 5 segundos</strong>. Operativo: <strong>−1</strong> em Percepção por olfato</td></tr>" +
      "<tr><td>4</td><td><strong>Tato</strong></td><td>Pele com cor ou textura diferenciada</td><td>Baixa sensibilidade tátil: <strong>−2 de Força</strong> e <strong>+2 pontos de dano</strong> sofridos de qualquer tipo</td></tr>" +
      "<tr><td>5</td><td><strong>Paladar</strong></td><td>Língua de coloração diferente</td><td>Precisa do <strong>dobro</strong> do alimento de um humano; <strong>falha automaticamente</strong> em JP contra doença e veneno, e sofre o <strong>dobro</strong> do dano delas</td></tr>" +
      "<tr><td>6</td><td><strong>Sexto Sentido</strong></td><td>Falta de noção precisa de perigo</td><td><strong>−2 em JPD</strong> e <strong>−1 de CA</strong></td></tr>" +
      "</tbody></table>" +
      "<p><em>O <strong>Paladar</strong> é de longe a pior linha desta tabela — falha automática é raro no OD2. Se a mesa achar pesado demais, trate como Difícil (−2) em vez de falha automática.</em></p>",
  },
  {
    nome: "8. Atributo Diminuído",
    desc:
      "<p><em>Genótipo:</em> um dos atributos é deficiente. <em>Fenótipo:</em> vário — role <strong>1d6</strong> ou escolha.</p>" +
      "<table><thead><tr><th>1d6</th><th>Atributo</th><th>Fenótipo</th></tr></thead><tbody>" +
      "<tr><td>1</td><td><strong>Força −3</strong></td><td>Corpo franzino</td></tr>" +
      "<tr><td>2</td><td><strong>Destreza −3</strong></td><td>Corpo pesado e coordenação motora prejudicada</td></tr>" +
      "<tr><td>3</td><td><strong>Constituição −3</strong></td><td>Aparência doentia</td></tr>" +
      "<tr><td>4</td><td><strong>Inteligência −3</strong></td><td>Massa encefálica diminuída</td></tr>" +
      "<tr><td>5</td><td><strong>Sabedoria −3</strong></td><td>Comportamento animalesco</td></tr>" +
      "<tr><td>6</td><td><strong>Carisma −3</strong></td><td>Introspecção inata</td></tr>" +
      "</tbody></table>" +
      "<p><strong>−3 no valor do atributo</strong>, não no modificador.</p>",
  },
  {
    nome: "9. Dissonância Mental",
    desc:
      "<p><em>Genótipo:</em> instabilidade mental, na forma de uma dupla personalidade. <em>Fenótipo:</em> personalidades conflitantes.</p>" +
      "<p>Você tem <strong>duas personalidades</strong> na mesma cabeça, e <strong>nenhuma tem memória do que a outra fez</strong>. Só uma está ativa por vez.</p>" +
      "<ul>" +
      "<li>A <strong>segunda personalidade</strong> é um personagem à parte, de <strong>1º nível</strong>, de qualquer classe — inclusive uma que você não jogaria.</li>" +
      "<li>Ela <strong>não sobe de nível</strong> junto: fica no 1º enquanto a principal cresce.</li>" +
      "<li>A troca acontece sob <strong>estresse mental grave</strong>, a critério do Mestre, ou por um Poder da Força que a force.</li>" +
      "<li><strong>PV, ferimentos e equipamento são do corpo</strong>, e portanto compartilhados. O resto — classe, habilidades, JP, conduta — é da personalidade ativa.</li>" +
      "</ul>" +
      "<p><em>Conversão: o livro trata as duas como \"personagens separados de nível 1\", o que, numa escala de 15 níveis, deixaria metade da carreira do jogador parada no primeiro degrau. A leitura acima mantém o horror da coisa — você <strong>perde a cena</strong> quando ela vira — sem congelar o personagem principal. É a Degeneração mais interpretativa das dez: combine com o Mestre antes de escolhê-la.</em></p>",
  },
  {
    nome: "10. Involução",
    desc:
      "<p><em>Genótipo:</em> algumas capacidades mentais e motoras apresentam lentidão. <em>Fenótipo:</em> falta de cognição para certas tarefas.</p>" +
      "<p>Escolha <strong>um</strong> entre: <strong>testes de atributo</strong>, <strong>jogadas de proteção</strong> ou <strong>rolagens de ataque</strong>. Naquele tipo de rolagem você sempre joga <strong>2d20 e fica com o pior resultado</strong>.</p>" +
      "<p><em>Escolher \"rolagens de ataque\" praticamente encerra a carreira marcial do personagem; escolher \"jogadas de proteção\" é o que mais mata. A escolha honesta costuma ser <strong>testes de atributo</strong> — e o preço é que o personagem fica ruim em tudo o que não é combate.</em></p>",
  },
];

export const especieAbilitiesAvulsas = [
  {
    folder: "Idiomas da galáxia",
    nome: "Idiomas da galáxia",
    desc:
      IDIOMAS_REGRA +
      "<table><thead><tr><th>Idioma</th><th>Quem fala</th><th>Observação</th></tr></thead><tbody>" +
      "<tr><td><strong>Básico Galáctico</strong></td><td>Praticamente todo mundo</td><td>Todos os personagens começam com ele</td></tr>" +
      "<tr><td><strong>Shyriiwook</strong></td><td>Wookiees</td><td>Humanos <strong>entendem</strong>, mas não conseguem <strong>falar</strong> (aparelho vocal)</td></tr>" +
      "<tr><td><strong>Ryl</strong></td><td>Twi'leks</td><td>Tem um dialeto silencioso de <strong>lekku</strong>, que só Twi'leks leem</td></tr>" +
      "<tr><td><strong>Rodês</strong></td><td>Rodianos</td><td>—</td></tr>" +
      "<tr><td><strong>Zabraki</strong></td><td>Zabraks</td><td>—</td></tr>" +
      "<tr><td><strong>Mon Calamariano</strong></td><td>Mon Calamari e Quarren</td><td>Difícil de pronunciar fora d'água</td></tr>" +
      "<tr><td><strong>Dosh</strong></td><td>Trandoshanos</td><td>—</td></tr>" +
      "<tr><td><strong>Cheunh</strong></td><td>Chiss</td><td>Raro fora das Regiões Desconhecidas; o Chiss já começa com um idioma extra</td></tr>" +
      "<tr><td><strong>Huttês</strong></td><td>Cartéis, submundo, Tatooine</td><td>O \"idioma do crime\" — vale mais que o Básico em muita doca</td></tr>" +
      "<tr><td><strong>Binário</strong></td><td>Droides</td><td>Não se <em>fala</em>: entende-se. Droides são fluentes por construção</td></tr>" +
      "<tr><td><strong>Ur-Kittât / Sith antigo</strong></td><td>Sith, arqueólogos, holocrons</td><td>Idioma <strong>morto</strong>; ler exige alfabetização e costuma ser gancho de aventura</td></tr>" +
      "</tbody></table>" +
      "<p><em>Nota: o Space Dragon lia os idiomas adicionais pelo atributo Comunicação (hoje Carisma). A conversão do Estrela Dracônica moveu-os para a <strong>Inteligência</strong>, e a alfabetização foi junto — não faria sentido um personagem carismático e ignorante ler mais idiomas do que fala.</em></p>",
  },
  {
    folder: "Molde Mutante (opcional)",
    nome: "Como usar o molde Mutante",
    desc:
      "<p>Para \"quase-humanos\" exóticos não listados (Nautolanos, Cerianos, etc.), use a espécie <strong>Mutante</strong> deste mesmo compêndio: arraste a raça, escolha <strong>um Aprimoramento</strong> e <strong>uma Degeneração</strong> nas duas pastas dela, e trate o resto como Humano.</p>" +
      "<p>É o coringa para criar um povo na hora — e é assim que o cenário recomenda inventar uma espécie que ainda não tem ficha.</p>" +
      "<p><strong>As nove espécies escritas do compêndio não usam este molde</strong> — foram feitas do zero para Star Wars e não pagam Degeneração. Esta é uma divergência deliberada do Estrela Dracônica, onde todo povo fora do Humano e do Droide é Mutante.</p>",
  },
];

// As vinte entram na lista de avulsas já carimbadas com a pasta — o prefixo
// "Mutante — " é o que faz aninhaPastas() encaixá-las dentro da raça.
especieAbilitiesAvulsas.push(
  ...APRIMORAMENTOS.map((m) => ({ ...m, folder: "Mutante — Aprimoramentos" })),
  ...DEGENERACOES.map((m) => ({ ...m, folder: "Mutante — Degenerações" })),
);

// Espécies de "Star Wars — Space Dragon" — transcritas de SW-SD-Especies.md.
//
// Tipo nativo do OD2: "race" + uma "race_ability" por habilidade. Campos
// mecânicos seguros são preenchidos (natural_armor, jp, infravision, movement);
// o restante fica na descrição, porque o sistema não modela essas regras.
//
// Lembrete do cenário: as sete espécies não-humanas NÃO usam o molde Mutante
// do Space Dragon e não pagam Degeneração — são criações do cenário.

const RODAPE_SENSIVEL =
  "<p><em>Todos os povos vivos podem gerar Sensíveis à Força; Droides não — cérebro positrônico não sonha.</em></p>";

export const especies = [
  {
    nome: "Humano",
    flavor: "<p>Os mais comuns, versáteis e adaptáveis da galáxia.</p>",
    descricao:
      "<p>Seguem as regras de humano do Old Dragon 2 na íntegra (sem os modificadores de atributo do Space Dragon).</p>" +
      "<p><strong>Perguntas ao criar um Humano:</strong> O que o move pela galáxia? O que defende? O que deseja destruir?</p>" +
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
      "<p><strong>Perguntas ao criar um Wookiee:</strong> Que dívida de vida o move? Como lida com a barreira do Shyriiwook? O que o tirou de Kashyyyk?</p>",
    movement: 9,
    infravision: 0,
    alignment_tendency: "neutro",
    alignment_notes: "Tendem ao Neutro.",
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
      "<p><strong>Perguntas ao criar um Twi'lek:</strong> Saiu de Ryloth por escolha ou por pressão? Usa o charme como ferramenta ou como escudo? O que seus lekku \"sentem\" que ele preferia não saber?</p>",
    movement: 9,
    infravision: 0,
    alignment_tendency: "neutro",
    alignment_notes: "Tendem ao Neutro.",
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
      "<p><strong>Perguntas ao criar um Rodiano:</strong> O que (ou quem) seu Rodiano caça? A honra da caça ainda importa? Como reage ao ser o caçado?</p>",
    movement: 9,
    infravision: 18,
    infravision_notes: "Visão térmica: só detecta seres vivos e fontes de calor.",
    alignment_tendency: "caotico",
    alignment_notes: "Tendem ao Caótico.",
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
      "<p><em>Nota de conversão:</em> o texto original do Andróide trazia <em>Corpo Robótico</em> (JPC Fáceis) <strong>e</strong> <em>Resistência Física</em> (+2 na JPC) — a mesma coisa vinda de duas fontes. Aqui foram fundidas numa habilidade só: a JPC Fácil já <em>é</em> o +2.</p>",
    movement: 9,
    infravision: 18,
    infravision_notes: "Sensores integrados, permanentes.",
    alignment_tendency: "none",
    alignment_notes: "Qualquer.",
    habilidades: [
      {
        nome: "Corpo Robótico",
        desc: "<p>Metal e polímeros avançados não dormem, não comem, não respiram, não adoecem nem se envenenam — todas as suas <strong>Jogadas de Proteção de Constituição (JPC) são Fáceis</strong>. <strong>Não pode aprender poderes da Força.</strong> Nunca regenera pontos de vida sozinho: precisa de <strong>reparo especializado</strong> (ferramentas + teste de Inteligência, ou cura tecnológica). Ainda é suscetível a morte, alguns tipos de paralisia, cegueira, surdez e drenagem de energia.</p>",
      },
      { nome: "Cérebro Positrônico", desc: "<p>Efeitos que afetam a mente são <strong>Difíceis</strong> contra o Droide — mas seus Testes de Reação e interações sociais também são <strong>Difíceis</strong>: a máquina não charmeia.</p>" },
      { nome: "Vulnerabilidade a Íon", desc: "<p><em>(acréscimo de Star Wars)</em> Ataques de pulso iônico causam <strong>dano dobrado</strong>; em um acerto crítico, o Droide fica <strong>desativado</strong> (equivalente a nocauteado) até ser reinicializado.</p>" },
      { nome: "Sensores Integrados", desc: "<p><em>(acréscimo de Star Wars)</em> Infravisão de <strong>18 metros</strong>, permanente.</p>" },
    ],
  },
  {
    nome: "Zabrak",
    flavor: "<p>Guerreiros de vontade férrea, marcados pelos chifres e pelas tatuagens de clã.</p>",
    descricao:
      "<p>Dois corações, uma vontade só. Os Zabrak encaram a dor como assunto pendente, não como obstáculo.</p>" +
      "<p><strong>Perguntas ao criar um Zabrak:</strong> Que mundo (Iridônia, Dathomir) marcou seus chifres? O que sua vontade se recusa a largar? Canaliza a resiliência em disciplina ou em fúria?</p>",
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
      "<p><strong>Perguntas ao criar um Mon Calamari:</strong> Deixou os oceanos por dever, exílio ou curiosidade? Constrói, lidera, ou ambos? O que a calma esconde quando provocada?</p>",
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
      "<p><strong>Perguntas ao criar um Trandoshano:</strong> Que presas somam pontos para a Guardiã dos Placares? A rivalidade com Wookiees é pessoal ou herdada? O que faria para não voltar de mãos vazias?</p>",
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
      "<p><strong>Perguntas ao criar um Chiss:</strong> O que fez um Chiss deixar a reclusão da Ascendência? O que procura ao ler as pessoas? Sua frieza é armadura, disciplina ou vazio?</p>",
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
];

// Habilidade avulsa: o molde Mutante do SD, coringa para criar povos na hora.
export const especieAbilitiesAvulsas = [
  {
    folder: "Molde Mutante (opcional)",
    nome: "Molde Mutante",
    desc:
      "<p>Para \"quase-humanos\" exóticos não listados (Nautolanos, Cerianos, etc.), use o molde <strong>Mutante</strong> do Space Dragon: escolha <strong>um Aprimoramento</strong> e <strong>uma Degeneração</strong> na tabela T2-1 do SD e trate o resto como Humano. É o coringa para criar povos na hora.</p>" +
      "<p><strong>As nove espécies do compêndio não usam este molde</strong> — foram escritas do zero para Star Wars e não pagam Degeneração.</p>",
  },
];

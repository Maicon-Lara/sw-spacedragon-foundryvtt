// Classes de "Star Wars — Space Dragon" — transcritas de SW-SD-Classes.md e
// SW-SD-Forca-Sensitivo.md.
//
// Modelagem: as 4 classes-base e as 13 especializações são todas itens do tipo
// nativo "class" (é como o OD2 oficial trata Bárbaro/Paladino/Arqueiro). A
// classe-base usa a coluna de XP normal; a especialização, a coluna XP Especial.
// Habilidades que evoluem por nível usam os campos level3/level6/level10.

import { progressao } from "./progressoes.mjs";

// ── Blocos reutilizados ──────────────────────────────────────────────────────

const REPUTACAO_TEXTO =
  "<p>A partir do 11º nível o personagem já é um nome conhecido no seu meio. Sempre que <strong>invocar o próprio nome</strong> para obter algo do mundo — ser recebido por um governador, conseguir crédito num estaleiro, ser reconhecido por um contato, fazer um oficial imperial fechar os olhos —, role <strong>1d6</strong> contra a Reputação: sucesso significa que a fama dele chegou ali antes dele.</p>" +
  "<p>A chance começa em <strong>1 em 1d6 no 11º nível</strong> e sobe <strong>1 a cada nível</strong>, chegando a <strong>1-5 em 1d6 no 15º</strong>.</p>";

function reputacao(sabor) {
  return {
    nome: "Reputação",
    level: 11,
    desc: REPUTACAO_TEXTO + (sabor ? `<p><em>${sabor}</em></p>` : ""),
  };
}

const APARATOS_NOTA =
  "<p><strong>Aparatos tecnológicos</strong> são os \"itens mágicos\" desta galáxia. <em>Ofensivos</em> (armas especiais, bombas, redes de choque): só o Técnico — e, por exceção, o Caçador de Recompensas. <em>Defensivos</em> (escudos pessoais, cintos, braceletes): Técnico e Veterano. <em>Utilitários</em> (visores, medpacs, jetpacks, scanners): todos.</p>";

const NOTA_SPEC =
  "<p><em>Especialização escolhida no 1º nível (padrão OD2). Evolui pela coluna <strong>XP Especial</strong> da tabela. Variante: mesas que queiram preservar o espírito original do Space Dragon podem adiar a escolha para o 3º nível.</em></p>";

// Regra geral dos Seguidores (SW-SD-Classes.md § Seguidores). Várias habilidades
// falam em "seu número máximo de seguidores"; é aqui que esse número é definido.
const SEGUIDORES_NOTA =
  "<p><strong>Seguidores.</strong> Onde uma habilidade falar em \"seu número máximo de seguidores\", vale: <strong>Número Máximo de Seguidores = 1 + modificador de Carisma</strong> (mínimo <strong>1</strong>). Carisma 9-12 → 1 seguidor · 13-14 → 2 · 15-16 → 3 · 17-18 → 4 · 19-20 → 5. São companheiros leais <strong>por vínculo</strong>, não contratados — subalternos e mercenários pagos entram pelo limite de contratação de ajudantes do OD2 (LB1, p. 78) e contam à parte.</p>";

// Alinhamento e especialização (SW-SD-Classes.md § Alinhamento e especialização).
// Vale para as três classes mundanas; o Sensível à Força é a exceção.
const ALINHAMENTO_NOTA =
  "<p><strong>Alinhamento e especialização.</strong> Cada especialização das classes mundanas é presa a um alinhamento (o antigo <em>Leal/Neutro/Rebelde</em> do Space Dragon): <strong>Emissário, Espião e Médico de Campo são ordeiros</strong>; <strong>Mercenário, Sabotador e Assassino são neutros</strong>; <strong>Caçador de Recompensas, Contrabandista e Slicer são caóticos</strong>. O <strong>Sensível à Força</strong> é a exceção — as Sendas dele não têm trava de alinhamento.</p>";

// Nota que acompanha cada especialização MUNDANA (as do Sensível não têm trava).
const NOTA_SPEC_MUNDANA =
  NOTA_SPEC +
  "<p><strong>Mudança de alinhamento em jogo.</strong> Um personagem que muda de alinhamento <strong>não perde</strong> as habilidades de especialização que já conquistou, mas <strong>não ganha as próximas</strong> enquanto sua conduta e sua trilha estiverem em desacordo. Ele tem duas saídas: reconciliar-se com a trilha antiga, ou negociar com o Mestre a <strong>troca da especialização</strong> por outra do alinhamento novo, mantendo o nível e refazendo as habilidades correspondentes.</p>";

// Talentos do Operativo — o campo `rogue_talents` é o que faz a ficha do OD2
// exibir o alocador de pontos.
const T = {
  sabotagem: { key: "sabotagem", name: "Sabotagem", description: "Destranca portas e provoca defeitos em máquinas. Exige os instrumentos consigo e vale uma vez por máquina — se falhar, só tenta de novo naquela máquina ao subir de nível. O tempo cai com a perícia: 2 pts → até 1d6 turnos; 3 pts → 1d4; 4 pts → 1d3; 5 pts → 1 turno." },
  escalar: { key: "escalar", name: "Escalar", description: "Sobe qualquer superfície íngreme (uma jogada por escalada, deslocando seu movimento por rodada). Em falha, cai da metade da altura total e sofre 1d6 de dano a cada 3 metros de queda." },
  furtividade: { key: "furtividade", name: "Furtividade", description: "Esconde-se, move-se em silêncio e passa por vãos estreitos; com novo teste, anda furtivo em movimento normal — mas atacar (mesmo errando) o torna visível." },
  furtar: { key: "furtar", name: "Furtar", description: "Afana os pertences de alguém sem ser notado. Se a jogada passar do dobro da dificuldade, a vítima o desmascara; −1 por cada 3 níveis do alvo acima do 5º." },
  armadilha: { key: "armadilha", name: "Armadilha", description: "Encontra, identifica e desarma armadilhas — cofres com carga de fragmentação, corredores com torretas, campos de força, minas de proximidade. Uma jogada por armadilha: sucesso a encontra e a neutraliza. Falha por 1 ponto = achou mas não desarmou. Falha por mais que isso = a armadilha dispara. Também serve para instalar armadilhas, se tiver os componentes." },
  obterInfo: { key: "obter-informacao", name: "Obter Informação", description: "Extrai dados sem chamar atenção (informantes, vigilância, escutas, interrogatório discreto). Sucesso = uma informação útil ou pista, a critério do Mestre. Substitui Escalar." },
  disfarce: { key: "disfarce", name: "Disfarce", description: "Passa-se por outra pessoa (uniformes, credenciais falsas, interpretação). Falha = identidade descoberta; −1 por cada 3 níveis do observador acima do 5º. Substitui Furtar." },
  vigilancia: { key: "vigilancia", name: "Vigilância", description: "Observa discretamente alvos e rotinas, identificando padrões, rotas e pontos fracos." },
  contrabando: { key: "contrabando", name: "Contrabando", description: "Oculta mercadorias e passageiros em compartimentos secretos, falsifica manifestos e burla inspeções e sensores. Falha = a carga é achada ou desperta suspeita." },
  labia: { key: "labia", name: "Lábia", description: "Blefa, barganha e convence pela conversa — distrai guardas, engana autoridades, arranca vantagens sociais." },
  avaliacao: { key: "avaliacao", name: "Avaliação", description: "Fareja o valor real de uma carga, relíquia ou negócio, e onde vendê-la no mercado negro. (Sugestão — ajuste à vontade.)" },
  rastrear: { key: "rastrear", name: "Rastrear", description: "Localiza e segue alvos por rastros, pistas, registros ou testemunhas." },
  venenos: { key: "venenos", name: "Venenos", description: "Prepara, identifica e aplica toxinas e sedativos em lâminas, dardos ou bebidas." },
  demolicoes: { key: "demolicoes", name: "Demolições", description: "Conhece explosivos e cargas — calcula o necessário para derrubar estruturas, abrir passagens ou desarmar bombas." },
  eletronica: { key: "eletronica", name: "Eletrônica", description: "Opera e reconfigura sistemas de segurança (sensores, alarmes, câmeras, fechaduras, campos de força)." },
  sabotagemNaves: { key: "sabotagem-naves", name: "Sabotagem de Naves/Veículos", description: "Inutiliza sistemas de naves e veículos — trava o hyperdrive, corta a energia, prende uma nave no chão ou imobiliza um walker. (Sugestão — ajuste à vontade.)" },
};

const TALENTOS_REGRA =
  "<p>Começa com <strong>2 pontos em cada um</strong> dos cinco talentos + <strong>2 pontos livres</strong>. Nos níveis <strong>3, 6 e 10</strong> recebe <strong>+2 pontos</strong> para distribuir.</p>" +
  "<p><strong>Teste:</strong> um talento tem chance em 1d6 igual ao seu valor (2 pontos = 1-2 em 1d6; 5 pontos = 1-5 em 1d6). <strong>Máximo: 5.</strong></p>" +
  "<p><strong>Trava:</strong> ao subir de nível ele <strong>não pode pôr os 2 pontos no mesmo talento</strong> — tem que espalhar. A trava não vale para a distribuição inicial do 1º nível.</p>";

// As Sendas do Sensível à Força não têm trava de alinhamento (correção da casa).
const NOTA_SENDA_SEM_ALINHAMENTO =
  "<p><strong>As Sendas NÃO têm restrição de alinhamento</strong> (correção da casa). Nas classes mundanas cada especialização é presa a um alinhamento; aqui isso foi <strong>removido</strong>. O motivo é de design: a restrição existe para diferenciar as trilhas — e no Sensível essa diferenciação <em>já é feita pelo Caminho (Luz/Sombra) e pela Corrupção</em>. Manter os dois eixos produzia aberrações: um Sith de sabre seria obrigatoriamente \"Guardião neutro\" com Corrupção 10, e um Inquisidor caçador de Jedi seria \"Sentinela caótico\" a serviço do regime mais ordeiro da galáxia. O Sensível <strong>escolhe livremente</strong> a Senda e o alinhamento; quem manda na moral dele é o <strong>Caminho</strong>.</p>"
      + "<p><em>Variante opcional — se a sua mesa preferir a amarração antiga, a leitura mais coerente seria pelo <strong>Caminho</strong>, não pela Senda: Luz → Ordeiro ou Neutro · Sombra → Caótico ou Ordeiro (o Império é ordeiro) · sem Caminho → Neutro.</em></p>";

// Restrições de equipamento por chassi.
const EQ_VETERANO = {
  weapons: "Proficiente no uso de qualquer tipo de arma.",
  armors: "Pode usar qualquer tipo de vestes e escudos.",
  magic_items: "Aparatos defensivos e utilitários. Não opera aparatos ofensivos.",
};
const EQ_OPERATIVO = {
  weapons: "Apenas armas que possam ser empunhadas com uma das mãos.",
  armors: "Apenas vestes leves ou médias, sem escudos. Usar outras vestes ou escudo impede o uso dos talentos de classe.",
  magic_items: "Apenas aparatos utilitários.",
};
const EQ_TECNICO = {
  weapons: "Armas leves e utilitárias, de energia. Jamais projéteis ou armas marciais.",
  armors: "Apenas vestes leves.",
  magic_items: "Constrói e opera qualquer aparato — ofensivos, defensivos e utilitários.",
};
const EQ_SENSIVEL = {
  weapons: "Empunha o sabre de luz sem risco, além de armas simples.",
  armors: "Regra de Vestes. (O Guardião usa armaduras médias — ver a especialização.)",
  magic_items: "Apenas aparatos utilitários. Construir e operar qualquer aparato é o nicho do Técnico.",
};

export const classes = [
  // ══════════════════════════════════════════════════════════════════════════
  // VETERANO — chassi Cosmonauta (d10)
  // ══════════════════════════════════════════════════════════════════════════
  {
    nome: "Veterano",
    tabela: "veterano",
    coluna: "normal",
    dv: 10,
    high_level_hp_bonus: 1,
    flavor: "<p>O herói de ação e o piloto da galáxia. <em>Chassi: Cosmonauta.</em></p>",
    descricao:
      "<p>Soldados, pistoleiros, caçadores, capitães e diplomatas de gatilho rápido. É a classe marcial do cenário: não há \"Guerreiro\" separado. <strong>Cassian, Boba Fett, Leia e um piloto de caça</strong> são todos Veteranos de especializações diferentes.</p>" +
      "<p><strong>Créditos iniciais:</strong> 2d10 × 50 CR.</p>" + APARATOS_NOTA + SEGUIDORES_NOTA + ALINHAMENTO_NOTA,
    equipment_restrictions: EQ_VETERANO,
    habilidades: [
      { nome: "Pilotar", level: 1, desc: "<p>Pilota qualquer nave ou veículo, e é o <strong>capitão natural</strong> de uma nave. Chance de <strong>1-2 em 1d6</strong>.</p>", level3: "<p>A chance aumenta para <strong>1-3 em 1d6</strong>.</p>", level6: "<p>A chance aumenta para <strong>1-4 em 1d6</strong>.</p>", level10: "<p>A chance aumenta para <strong>1-5 em 1d6</strong>.</p>" },
      { nome: "Desarmar e Subjugar", level: 1, desc: "<p>Sacrificando um de seus ataques, desarma um oponente (<strong>1-2 em 1d6</strong>). Se o alvo já está desarmado, pode subjugá-lo — também sacrificando um ataque, com a mesma chance.</p>", level3: "<p>Chance de <strong>1-3 em 1d6</strong>.</p>", level6: "<p>Chance de <strong>1-4 em 1d6</strong>.</p>", level10: "<p>Chance de <strong>1-5 em 1d6</strong>.</p>" },
      { nome: "Ataques Múltiplos", level: 3, desc: "<p>Adquire um <strong>segundo ataque</strong> (corpo a corpo ou à distância), realizado logo em sequência ao primeiro — antes da ação do próximo jogador na iniciativa — <strong>com a mesma Base de Ataque</strong> do primeiro.</p><p><em>Nota de balanço (correção da casa): o Space Dragon só dava o segundo ataque no 7º nível, e com a Base de Ataque menor; o Estrela Dracônica antecipou para o 1º nível com a BA cheia, o que dobra o dano por rodada da classe marcial já na primeira sessão e esvazia a troca do Mercenário [6]. Aqui o ganho foi movido para o <strong>3º nível</strong>, alinhado ao degrau que todas as outras habilidades usam. <strong>Variante:</strong> mesas que preferirem a versão do Estrela Dracônica podem devolvê-lo ao 1º nível.</em></p>" },
      { nome: "Dano Crítico", level: 1, desc: "<p>A intimidade do Veterano com armas faz seus acertos certeiros doerem mais. Sempre que uma rolagem de ataque resultar em <strong>acerto crítico</strong>, o dano final é multiplicado por <strong>×2</strong>.</p><p><em>No Space Dragon o dano crítico era uma coluna da tabela do Cosmonauta, escalando de ×2 a ×5 — a marca registrada da classe. O Estrela Dracônica a transferiu inteira para o Mercenário, deixando a classe-base sem crítico nenhum. Aqui a progressão volta para o Veterano em versão modesta (×2/×3); o <strong>Mercenário</strong> continua sendo o especialista, escalando até ×5 e ganhando a chance de forçar críticos.</em></p>", level10: "<p>O multiplicador de dano crítico passa a <strong>×3</strong>.</p>" },
      reputacao(),
    ],
  },
  {
    nome: "Veterano — Mercenário",
    tabela: "veterano",
    coluna: "especial",
    dv: 10,
    high_level_hp_bonus: 1,
    restricao_alinhamentos: ["neutro"],
    flavor: "<p>O soldado e o pistoleiro. <em>Especialização de Veterano (neutro).</em></p>",
    descricao:
      "<p>Stormtroopers de elite, mercenários, pistoleiros do submundo, soldados clones. A arma preferida vira extensão do corpo.</p>" +
      "<p><strong>Perde</strong> acesso a <em>Pilotar</em> e <em>Desarmar e Subjugar</em> — mas <strong>mantém Ataques Múltiplos</strong> (no 3º nível, como todo Veterano) e o <strong>Dano Crítico</strong> da classe.</p>" + NOTA_SPEC_MUNDANA,
    equipment_restrictions: EQ_VETERANO,
    habilidades: [
      { nome: "Ataques Múltiplos", level: 3, desc: "<p>Mantida da classe-base: um <strong>segundo ataque</strong> logo em sequência ao primeiro, com a mesma Base de Ataque.</p>" },
      { nome: "Dano Crítico", level: 1, desc: "<p>Mantido da classe-base: em um <strong>acerto crítico</strong>, o dano final é multiplicado por <strong>×2</strong>.</p><p><em>Vale para qualquer arma que não seja a preferida — com a arma escolhida, quem manda é a progressão de <strong>Armado e Perigoso</strong>, abaixo.</em></p>", level10: "<p>O multiplicador passa a <strong>×3</strong> (ainda para as armas que não sejam a preferida).</p>" },
      { nome: "Armado e Perigoso", level: 1, desc: "<p>O dano crítico com uma arma de sua escolha é sempre <strong>multiplicado por 2</strong>.</p><p><em>Esta progressão substitui a do Veterano quando ele usa a arma escolhida — e a partir do 3º nível ela é sempre superior. Com qualquer outra arma, vale o <strong>Dano Crítico</strong> normal da classe.</em></p>", level3: "<p><strong>Golpe Impiedoso:</strong> os críticos com a arma escolhida passam a causar dano <strong>×3</strong>.</p>", level6: "<p><strong>Mestre de Arma:</strong> <strong>−5</strong> ao usar uma arma que não seja a preferida e <strong>+2</strong> em todas as jogadas com ela. Suas Jogadas de Proteção param de evoluir, mas ele pode <strong>sacrificar o segundo ataque</strong> para ter chance maior de crítico: <strong>1-3 em 1d6</strong>. Críticos com a arma escolhida passam a <strong>×4</strong>.</p>", level10: "<p><strong>Super Comando:</strong> pode causar dano crítico com <strong>ambos</strong> os ataques, <strong>1-4 em 1d6</strong>. Críticos passam a <strong>×5</strong>.</p>" },
      reputacao("A fama do soldado que nunca erra — vale em quartéis, cantinas e mesas de contratação."),
    ],
  },
  {
    nome: "Veterano — Caçador de Recompensas",
    tabela: "veterano",
    coluna: "especial",
    dv: 10,
    high_level_hp_bonus: 1,
    restricao_alinhamentos: ["caotico"],
    flavor: "<p>O caçador. <em>Especialização de Veterano (caótico).</em></p>",
    descricao:
      "<p>Boba Fett, Cad Bane, Bossk, Fennec. Casa perfeitamente com a <strong>Senda Mandaloriana</strong>.</p>" +
      "<p><strong>Perde</strong> <em>Desarmar e Subjugar</em> e <em>Ataques Múltiplos</em> nos níveis iniciais; <em>Pilotar</em> é substituída por <em>Operar Aparatos Ofensivos e Consertar Máquinas</em>. É a única especialização fora do Técnico que opera <strong>aparatos ofensivos</strong>.</p>" + NOTA_SPEC_MUNDANA,
    equipment_restrictions: {
      ...EQ_VETERANO,
      magic_items: "Exceção da trilha: opera aparatos ofensivos, defensivos e utilitários.",
    },
    habilidades: [
      { nome: "Operar Aparatos Ofensivos e Consertar Máquinas", level: 1, desc: "<p>Opera aparatos ofensivos (redes, detonadores, grilhões), <strong>pilota naves</strong> e conserta máquinas: <strong>1-2 em 1d6</strong>.</p>", level3: "<p>A chance sobe para <strong>1-3 em 1d6</strong>.</p>", level6: "<p>A chance sobe para <strong>1-4 em 1d6</strong>.</p>", level10: "<p>A chance sobe para <strong>1-5 em 1d6</strong>.</p>" },
      { nome: "Desarmar e Subjugar", level: 3, desc: "<p>Recupera a manobra da classe-base, com chance de <strong>1-2 em 1d6</strong>.</p>" },
      { nome: "Ataques Múltiplos", level: 6, desc: "<p>Ganha um <strong>segundo ataque</strong> com a mesma Base de Ataque.</p>" },
      { nome: "Combate Rápido", level: 10, desc: "<p>Tenta um <strong>terceiro ataque</strong> (<strong>1-4 em 1d6</strong>, com a Base de Ataque do segundo). Falhar nessa jogada encerra o turno.</p>" },
      reputacao("O nome que faz um alvo largar o copo e correr — abre celas, cantinas e portas do submundo, nunca recepções diplomáticas."),
    ],
  },
  {
    nome: "Veterano — Emissário",
    tabela: "veterano",
    coluna: "especial",
    dv: 10,
    high_level_hp_bonus: 1,
    restricao_alinhamentos: ["ordeiro"],
    flavor: "<p>O diplomata, o senador, o capitão-líder. <em>Especialização de Veterano (ordeiro).</em></p>",
    descricao:
      "<p>Leia Organa, Bail, Mon Mothma, um capitão contrabandista que virou general da Aliança.</p>" +
      "<p><strong>Perde</strong> <em>Desarmar e Subjugar</em> e <em>Ataques Múltiplos</em>, mas <strong>mantém e melhora Pilotar</strong>.</p>" + SEGUIDORES_NOTA + NOTA_SPEC_MUNDANA,
    equipment_restrictions: EQ_VETERANO,
    habilidades: [
      { nome: "Pilotar", level: 1, desc: "<p>Pilota qualquer nave: <strong>1-2 em 1d6</strong>.</p>", level3: "<p>Chance de <strong>1-3 em 1d6</strong>.</p>", level6: "<p>Chance de <strong>1-4 em 1d6</strong>.</p>", level10: "<p>Chance de <strong>1-5 em 1d6</strong>.</p>" },
      { nome: "Mecenas", level: 3, desc: "<p>Recebe salário mensal do indivíduo ou organização que representa, equivalente a <strong>300 CR × seu nível</strong>.</p><p><em>No Space Dragon era $20.000 × nível — o preço de uma pistola laser por nível, por mês. Aqui o valor foi convertido para a escala de Créditos do cenário, mantendo a proporção: cerca de um blaster pesado por nível.</em></p>" },
      { nome: "Enviado", level: 6, desc: "<p>Ganha uma <strong>nave patrocinada</strong> (combustível e reparos custeados) e pode ter tripulação conforme seu número de seguidores.</p>" },
      { nome: "Embaixador", level: 10, desc: "<p>A tripulação <strong>triplica</strong>, e os testes de Moral ou Carisma para obter reação amigável de uma criatura inteligente são <strong>Fáceis</strong>.</p>" },
      reputacao("A fama do diplomata respeitado — esta abre salões, audiências e linhas de crédito."),
    ],
  },

  // ══════════════════════════════════════════════════════════════════════════
  // OPERATIVO — chassi Gatuno (d6)
  // ══════════════════════════════════════════════════════════════════════════
  {
    nome: "Operativo",
    tabela: "operativo",
    coluna: "normal",
    dv: 6,
    high_level_hp_bonus: 1,
    flavor: "<p>O trapaceiro do submundo. <em>Chassi: Gatuno.</em></p>",
    descricao:
      "<p>Contrabandistas, ladrões, espiões, piratas e assassinos onde a lei não chega. <strong>Han Solo é um Operativo.</strong></p>" +
      "<p><strong>Créditos iniciais:</strong> 2d6 × 50 CR.</p>" + SEGUIDORES_NOTA + ALINHAMENTO_NOTA,
    equipment_restrictions: EQ_OPERATIVO,
    habilidades: [
      { nome: "Ataque Furtivo", level: 1, desc: "<p>Atacando após aproximação furtiva, faz um ataque <strong>muito fácil</strong> com dano <strong>×2</strong>.</p>", level6: "<p>O dano passa a <strong>×3</strong>.</p>", level10: "<p>O dano passa a <strong>×4</strong>.</p>" },
      { nome: "Percepção", level: 1, desc: "<p>Sentidos superiores: ouvir ruídos, identificar odores e sabores, perceber detalhes em superfícies pelo toque. Chance de <strong>1-2 em 1d6</strong>.</p>", level3: "<p>Chance de <strong>1-3 em 1d6</strong>.</p>", level6: "<p>Chance de <strong>1-4 em 1d6</strong>.</p>", level10: "<p>Chance de <strong>1-5 em 1d6</strong>.</p>" },
      {
        nome: "Talentos de Operativo",
        level: 1,
        desc: "<p>O núcleo do Gatuno, vestido de submundo galáctico. <strong>Bônus:</strong> no 1º nível, +1 ponto para cada ponto do modificador de <strong>Destreza</strong>.</p>" + TALENTOS_REGRA,
        rogue_talents: [T.sabotagem, T.escalar, T.furtividade, T.furtar, T.armadilha],
      },
      reputacao(),
    ],
  },
  {
    nome: "Operativo — Espião",
    tabela: "operativo",
    coluna: "especial",
    dv: 6,
    high_level_hp_bonus: 1,
    restricao_alinhamentos: ["ordeiro"],
    flavor: "<p>O agente de inteligência. <em>Especialização de Operativo (ordeiro).</em></p>",
    descricao:
      "<p>Cassian Andor, Fulcrum, agentes do ISB. Leal a uma organização ou governo.</p>" +
      "<p><strong>Perde Ataque Furtivo</strong>, mas <strong>mantém Percepção</strong>. <strong>Substituição de talentos:</strong> <em>Disfarce</em> substitui <em>Furtar</em> e <em>Obter Informação</em> substitui <em>Escalar</em> — ambos herdam os pontos do talento substituído e evoluem junto com os demais.</p>" + NOTA_SPEC_MUNDANA,
    equipment_restrictions: EQ_OPERATIVO,
    habilidades: [
      { nome: "Instintos Aguçados (Percepção)", level: 1, desc: "<p>Como a Percepção do Operativo: <strong>1-2 em 1d6</strong>.</p>", level3: "<p>Chance de <strong>1-3 em 1d6</strong>.</p>", level6: "<p>Chance de <strong>1-4 em 1d6</strong>.</p>", level10: "<p>Chance de <strong>1-5 em 1d6</strong>.</p>" },
      {
        nome: "Talentos de Espião",
        level: 1,
        desc: "<p><strong>Bônus:</strong> no 1º nível, +1 ponto por ponto do modificador de <strong>Destreza ou Carisma</strong>.</p>" + TALENTOS_REGRA,
        rogue_talents: [T.sabotagem, T.furtividade, T.obterInfo, T.disfarce, T.vigilancia],
      },
      { nome: "Infiltração Especializada", level: 3, desc: "<p><strong>Sabotador Furtivo:</strong> sua chance de <em>Sabotagem</em> <strong>aumenta em 1 ponto</strong> quando ele obtém sucesso numa jogada de <em>Furtividade</em> (máximo 1-5 em 1d6).</p>" },
      { nome: "Aparatos e Feitos Científicos", level: 6, desc: "<p>O Espião passa a <strong>criar máquinas e realizar experiências</strong> em seus laboratórios, com <strong>Nível Tecnológico igual ao seu nível</strong> (NT máximo 10; não há limite para os aparatos que pode <em>usar</em>). Vale para os aparatos de campo do ofício — escutas, bugs, credenciais forjadas, holoprojetores de disfarce. Seguem as regras de Criação de Aparatos do Space Dragon.</p>" },
      { nome: "Fantasma (Mestre Espião)", level: 10, desc: "<p><strong>Todos os seus talentos passam a ter a mesma chance de sucesso do maior deles.</strong></p>" },
      reputacao("A fama de um espião é uma faca de dois gumes: quem o reconhece também sabe para quem ele trabalha."),
    ],
  },
  {
    nome: "Operativo — Contrabandista",
    tabela: "operativo",
    coluna: "especial",
    dv: 6,
    high_level_hp_bonus: 1,
    restricao_alinhamentos: ["caotico"],
    flavor: "<p>O malandro espacial. <em>Especialização de Operativo (caótico) — base: Pirata Espacial.</em></p>",
    descricao:
      "<p>Hondo Ohnaka, os capitães do Cartel, o próprio Han em modo pirataria.</p>" +
      "<p><strong>Perde Percepção e Ataque Furtivo</strong>; ganha pilotagem e uma lista de talentos própria.</p>" + SEGUIDORES_NOTA + NOTA_SPEC_MUNDANA,
    equipment_restrictions: EQ_OPERATIVO,
    habilidades: [
      { nome: "Piloto Nato", level: 1, desc: "<p>Pilota qualquer nave: <strong>1-2 em 1d6</strong>.</p>", level3: "<p>Chance de <strong>1-3 em 1d6</strong>.</p>", level6: "<p>Chance de <strong>1-4 em 1d6</strong>.</p>", level10: "<p>Chance de <strong>1-5 em 1d6</strong>.</p>" },
      {
        nome: "Talentos de Contrabandista",
        level: 1,
        desc: "<p><strong>Bônus:</strong> no 1º nível, +1 ponto por ponto do modificador de <strong>Destreza ou Carisma</strong>.</p>" + TALENTOS_REGRA,
        rogue_talents: [T.sabotagem, T.furtividade, T.contrabando, T.labia, T.avaliacao],
      },
      { nome: "Mercado Cinzento", level: 3, desc: "<p><em>(Negociação e Extorsão)</em> Extorque um alvo ou arranca desconto na compra de armas e equipamentos: <strong>1-3 em 1d6</strong> — o desconto é a <strong>margem de sucesso × 10%</strong>.</p>" },
      { nome: "Ação Ousada", level: 6, desc: "<p><em>(Ataques Múltiplos)</em> Adquire um <strong>segundo ataque</strong>, com a mesma Base de Ataque, logo em sequência ao primeiro.</p>" },
      { nome: "Lenda do Submundo", level: 10, desc: "<p>Sempre terá uma tripulação fiel igual a <strong>3× seu número máximo de seguidores</strong> (mínimo 4).</p>" },
      reputacao("Vale ouro em Nar Shaddaa, Tatooine e em qualquer doca sem alfândega — e absolutamente nada num salão de Coruscant."),
    ],
  },
  {
    nome: "Operativo — Assassino",
    tabela: "operativo",
    coluna: "especial",
    dv: 6,
    high_level_hp_bonus: 1,
    restricao_alinhamentos: ["neutro"],
    flavor: "<p>A lâmina do submundo. <em>Especialização de Operativo (neutro).</em></p>",
    descricao:
      "<p>Matadores da Aurora Negra, agentes de eliminação do submundo.</p>" +
      "<p><strong>Perde Percepção e Ataque Furtivo</strong> (substituído pelo Golpe Fatal).</p>" + NOTA_SPEC_MUNDANA,
    equipment_restrictions: EQ_OPERATIVO,
    habilidades: [
      { nome: "Golpe Fatal", level: 1, desc: "<p><em>(Ataque Assassino)</em> Ao atacar após aproximação furtiva, faz um ataque <strong>muito fácil</strong> com dano <strong>×2</strong>.</p>", level10: "<p><strong>Ataque Mortal:</strong> o Golpe Fatal passa a causar dano <strong>×3</strong>.</p>" },
      {
        nome: "Talentos de Assassino",
        level: 1,
        desc: "<p><strong>Bônus:</strong> no 1º nível, +1 ponto por ponto do modificador de <strong>Destreza</strong>.</p>" + TALENTOS_REGRA,
        rogue_talents: [T.sabotagem, T.furtividade, T.rastrear, T.vigilancia, T.venenos],
      },
      { nome: "Marcar Alvo", level: 3, desc: "<p><em>(Espreitar)</em> Uma rodada completa apenas observando o alvo torna o primeiro ataque contra ele <strong>Fácil</strong>; após <strong>4 rodadas</strong> de observação, <strong>Muito Fácil</strong>.</p>" },
      { nome: "Execução", level: 6, desc: "<p><em>(Assassinato)</em> Abre mão do ataque normal para desferir um golpe que <strong>mata o alvo na hora</strong>: <strong>1-2 em 1d6</strong>. Cada Dado de Vida do alvo igual ou acima do seu reduz a chance em 1. Falha = o alvo não sofre dano e fica <strong>imune a nova Execução</strong> até você subir de nível.</p>", level10: "<p>A chance de Execução sobe para <strong>1-3 em 1d6</strong>.</p>" },
      reputacao("A fama de um Assassino não abre portas amigáveis. Ela não o faz bem-vindo em lugar nenhum — apenas faz as pessoas obedecerem depressa e evitarem seus olhos."),
    ],
  },
  {
    nome: "Operativo — Sabotador",
    tabela: "operativo",
    coluna: "especial",
    dv: 6,
    high_level_hp_bonus: 1,
    restricao_alinhamentos: ["neutro"],
    flavor: "<p>Demolições e armadilhas. <em>Especialização de Operativo (neutro).</em></p>",
    descricao:
      "<p>Demolicionistas rebeldes, saboteurs de bases imperiais.</p>" +
      "<p><strong>Para de progredir</strong> em <em>Furtar</em> e em <em>Ataque Furtivo</em>.</p>" + NOTA_SPEC_MUNDANA,
    equipment_restrictions: EQ_OPERATIVO,
    habilidades: [
      { nome: "Percepção", level: 1, desc: "<p>Como a do Operativo: <strong>1-2 em 1d6</strong>.</p>", level3: "<p>Chance de <strong>1-3 em 1d6</strong>.</p>", level6: "<p>Chance de <strong>1-4 em 1d6</strong>.</p>", level10: "<p>Chance de <strong>1-5 em 1d6</strong>.</p>" },
      {
        nome: "Talentos de Sabotador",
        level: 1,
        desc: "<p><strong>Bônus:</strong> no 1º nível, +1 ponto por ponto do modificador de <strong>Destreza</strong>.</p>" + TALENTOS_REGRA,
        rogue_talents: [T.sabotagem, T.furtividade, T.demolicoes, T.eletronica, T.sabotagemNaves],
      },
      { nome: "Quebrar Máquinas", level: 3, desc: "<p><strong>+1</strong> nas jogadas do talento <em>Sabotagem</em> (a chance não pode passar de 1-5 em 1d6).</p>" },
      { nome: "Criar Armadilhas", level: 6, desc: "<p>Monta armadilhas com os equipamentos que sabota. <strong>Desarmar</strong> uma armadilha criada por ele é uma jogada de Sabotagem com chance de <strong>1d6 menos os pontos que o Sabotador tem no talento Sabotagem</strong> (mínimo de 1 em 1d6): quanto melhor o Sabotador, mais difícil desfazer sua obra.</p>" },
      { nome: "Mestre da Sabotagem", level: 10, desc: "<p>Sabotar máquinas e Criar Armadilhas a <strong>1-5 em 1d6</strong>.</p>" },
      reputacao("O nome sussurrado quando uma base imperial vai pelos ares sem que ninguém veja quem entrou."),
    ],
  },

  // ══════════════════════════════════════════════════════════════════════════
  // TÉCNICO — chassi Cientista (d8)
  // ══════════════════════════════════════════════════════════════════════════
  {
    nome: "Técnico",
    tabela: "tecnico",
    coluna: "normal",
    dv: 8,
    high_level_hp_bonus: 1,
    flavor: "<p>O gênio prático da galáxia. <em>Chassi: Cientista.</em></p>",
    descricao:
      "<p>Mecânicos de droides, médicos de campo, engenheiros e slicers que dobram a tecnologia à própria vontade. Onde o Jedi tem a Força, o Técnico tem a engenhoca: seus <strong>aparatos e feitos científicos</strong> são os \"itens mágicos\" deste universo, e ele os constrói com as próprias mãos. Numa tripulação, é quem mantém a nave voando, o droide obediente e o grupo respirando.</p>" +
      "<p><strong>Créditos iniciais:</strong> 1d8 × 50 CR.</p>" + APARATOS_NOTA + SEGUIDORES_NOTA + ALINHAMENTO_NOTA,
    equipment_restrictions: EQ_TECNICO,
    habilidades: [
      { nome: "Operar e Consertar Máquinas", level: 1, desc: "<p>Opera e conserta máquinas — religar um gerador, forçar um sistema, remendar tecnologia quebrada. Chance de <strong>1-2 em 1d6</strong>.</p><p><strong>Quando NÃO se rola:</strong> aparelhos que ele mesmo criou dispensam o teste, e usar um aparato pronto qualquer também não pede jogada. Só se rola ao lidar com um aparato <strong>desconhecido, alheio, danificado ou acima do seu NT</strong> — e a falha traz um defeito, a critério do Mestre.</p><p><strong>Pilotar</strong> naves com esta habilidade é só <strong>1 em 1d6</strong>: Veteranos pilotam melhor.</p>", level3: "<p>Chance de <strong>1-3 em 1d6</strong>.</p>", level6: "<p>Chance de <strong>1-4 em 1d6</strong>.</p>", level10: "<p>Chance de <strong>1-5 em 1d6</strong>.</p>" },
      { nome: "Aparatos e Feitos Científicos", level: 1, desc: "<p>Cria <strong>aparatos</strong> (Nível Tecnológico = seu nível de classe, <strong>NT máximo 10</strong>; não há limite para os aparatos que pode <em>usar</em>) e realiza <strong>feitos científicos</strong>:</p><ul><li><strong>Feitos médicos:</strong> diagnosticar e curar doenças, operações cirúrgicas (simples a complexa), destilar antídotos, imunizar pacientes, cirurgia e membros ou órgãos biônicos.</li><li><strong>Feitos de laboratório:</strong> construir e consertar droides, reparos robóticos, decodificar DNA, clonagem e afins.</li></ul><p><strong>Consertar, recarregar ou adaptar</strong> um aparato custa <strong>25% do valor</strong> e <strong>metade do tempo</strong> de criação; construir do zero já sai com o seu Desconto Tecnológico. Feitos costumam levar mais tempo que aparatos, e a maioria é permanente.</p>" },
      { nome: "Desativar Droides", level: 1, desc: "<p>Com um <strong>disruptor positrônico</strong>, desativa droides a até <strong>18 metros</strong> que falhem num teste de Moral no fim da rodada.</p><p><strong>Destruição:</strong> se o droide falhar no teste <strong>e os dois dados saírem iguais</strong>, ele não é apenas desligado — é destruído.</p><p><strong>Tentativas extras:</strong> além dos usos seguros do dia dá para insistir, mas cada tentativa cumulativa torna o teste <strong>Difícil (−2)</strong> e depois <strong>Muito Difícil (−5)</strong>. Uma falha nessas condições causa um curto-circuito no disruptor, que precisa ser reparado.</p><p>No 1º nível, desativa droides sem bônus.</p>" +
        "<p><strong>Resistência por classe de droide:</strong> nem todo droide é igual diante de um disruptor. Aplique este ajuste <strong>ao Moral do alvo</strong> — quanto maior o Moral, mais difícil desligá-lo.</p>" +
        "<table><thead><tr><th>Classe do droide</th><th>Ajuste no Moral</th><th>Exemplos</th></tr></thead><tbody>" +
        "<tr><td>Serviçal, protocolo, astromecânico</td><td><strong>−2</strong></td><td>GNK, R2, C-3PO, droides de carga e mineração</td></tr>" +
        "<tr><td>Combate padrão</td><td><strong>—</strong></td><td>B1, droides de segurança, sondas</td></tr>" +
        "<tr><td>Combate avançado ou de comando</td><td><strong>+2</strong></td><td>B2 super battle droid, IG-88, comandos táticos</td></tr>" +
        "<tr><td>Blindado, único ou com escudo próprio</td><td><strong>+4</strong></td><td>Droideka, HK-47, magnaguardas, droides de guerra</td></tr>" +
        "</tbody></table>" +
        "<p><em>Por que assim: o Space Dragon tinha a tabela T3-2, com oito categorias de robô cruzadas com vinte níveis de disruptor — era ela que impedia um Cientista de 3º nível desligar o chefe da fase. A conversão para teste de Moral apagou essa granularidade; a tabela acima devolve o efeito sem a burocracia.</em></p>", level6: "<p><em>(a partir do 5º nível)</em> <strong>+1</strong> no teste de Moral e <strong>2 usos seguros por dia</strong>.</p>", level10: "<p><strong>+2</strong> no teste de Moral e <strong>3 usos seguros por dia</strong>.</p>" },
      { nome: "Desconto Tecnológico", level: 1, desc: "<p>Desconto em qualquer gasto com equipamentos: <strong>5%</strong>.</p>", level6: "<p><em>(a partir do 5º nível)</em> O desconto sobe para <strong>15%</strong>.</p>", level10: "<p>O desconto sobe para <strong>30%</strong>.</p>" },
      reputacao(),
    ],
  },
  {
    nome: "Técnico — Médico de Campo",
    tabela: "tecnico",
    coluna: "especial",
    dv: 8,
    high_level_hp_bonus: 1,
    restricao_alinhamentos: ["ordeiro"],
    flavor: "<p>O curandeiro. <em>Especialização de Técnico (ordeiro) — base: Pesquisador.</em></p>",
    descricao:
      "<p><em>\"Enquanto houver um batimento, há trabalho a fazer.\"</em></p>" +
      "<p>O Médico de Campo é o Pesquisador que voltou as lentes para dentro do corpo. Onde o Engenheiro constrói e o Slicer invade, ele <strong>remenda, cura e mantém vivo</strong>. Como todo Pesquisador, prende-se a uma disciplina rígida: <strong>só usa armas e dispositivos que ele mesmo construiu</strong>.</p>" +
      "<p><strong>Perde</strong> <em>Operar e Consertar Máquinas</em> e <em>Desativar Droides</em>; o Desconto Tecnológico dá lugar a um <strong>Desconto Tecnológico Aprimorado</strong>.</p>" +
      "<p><strong>Sua caixa de ferramentas (onde é perito):</strong></p><ul>" +
      "<li><em>Cura direta:</em> Injeção de Adrenalina · Pílula de Recuperação Rápida · Operação Cirúrgica Simples/Moderada/Complexa · Reanimar Cadáver.</li>" +
      "<li><em>Doença e veneno:</em> Diagnosticar Doença · Curar Doença · Identificar Veneno · Destilar Antídoto · Identificar Micro-organismo · Imunizar Paciente.</li>" +
      "<li><em>Suporte e aprimoramento:</em> Pílula de Aprimoramento · Aprimoramento Permanente · Fórmula de Controle Corporal · Respirador Subaquático.</li>" +
      "<li><em>Biônica:</em> Cirurgia Biônica · Membro Biônico · Órgão Biônico.</li>" +
      "<li><em>Preservação:</em> Hibernação Criogênica.</li></ul>" + NOTA_SPEC_MUNDANA,
    equipment_restrictions: {
      ...EQ_TECNICO,
      weapons: "Armas leves e utilitárias de energia — e, por disciplina do Pesquisador, apenas as que ele mesmo construiu.",
    },
    habilidades: [
      { nome: "Perito em Medicina", level: 1, desc: "<p>Cria aparatos e realiza feitos com <strong>Nível Tecnológico igual ao seu nível</strong> (NT máximo 10). Mas sobre os <strong>feitos e aparatos de cura e suporte</strong> da sua caixa de ferramentas, é um perito: realiza-os <strong>em metade do tempo</strong> e <strong>sem precisar de um laboratório completo</strong> — um kit de campo, uma maca improvisada e as próprias mãos bastam.</p><p>Ganha <strong>+1</strong> em todos os testes de Inteligência de diagnóstico, tratamento e cirurgia, e cada lote de consumíveis médicos que fabrica (injeções, pílulas, doses de antídoto) rende <strong>uma dose a mais</strong>. Quando é ele quem aplica uma <strong>Injeção de Adrenalina</strong>, o paciente <strong>dispensa a JPC de overdose</strong>.</p>", level6: "<p><strong>Aparatos e Feitos Científicos Avançados:</strong> passa a criar aparatos e realizar feitos com <strong>Nível Tecnológico igual ao seu nível + 2</strong> (NT máximo 10) — medpacs de bacta, próteses cibernéticas, estimulantes e câmaras de recuperação anos além do que um técnico comum de seu nível alcançaria.</p>" },
      { nome: "Desconto Tecnológico Aprimorado", level: 3, desc: "<p>O desconto em qualquer gasto com equipamentos sobe para <strong>20%</strong>. Suprimentos de bacta, insumos cirúrgicos, componentes de prótese — tudo sai mais barato para quem compra em nome da cura.</p>", level6: "<p>O desconto sobe para <strong>35%</strong>.</p>", level10: "<p><strong>Autoridade Científica:</strong> os descontos chegam a <strong>50%</strong>. Em troca, submete-se a um <strong>rígido código de ética</strong>: está proibido de causar qualquer dano a seres vivos em combate, e prega que ninguém o faça. Se quebrar esse juramento, <strong>perde o acesso a todas as habilidades da especialização</strong> até realizar uma reparação adequada, a critério do Mestre.</p>" },
      reputacao("A fama do cirurgião que não perde paciente — abre hospitais, comitês, laboratórios e a confiança de quem está sangrando."),
    ],
  },
  {
    nome: "Técnico — Engenheiro",
    tabela: "tecnico",
    coluna: "especial",
    dv: 8,
    high_level_hp_bonus: 1,
    restricao_alinhamentos: ["neutro"],
    flavor: "<p>O inventor. <em>Especialização de Técnico (neutro) — base: Inventor.</em></p>",
    descricao:
      "<p><em>\"Se existe, eu conserto. Se não existe, eu invento. Se quebrar, a culpa é da peça.\"</em></p>" +
      "<p>Construtores de droides (um Anakin criança), os engenheiros de estaleiro de Mon Cala, o gênio que monta uma nave com sucata.</p>" +
      "<p><strong>Perde</strong> <em>Operar e Consertar Máquinas</em> e <em>Desativar Droides</em>, e seu Desconto Tecnológico vira <strong>prejuízo</strong> — inventar do zero custa mais caro do que comprar pronto.</p>" + NOTA_SPEC_MUNDANA,
    equipment_restrictions: EQ_TECNICO,
    habilidades: [
      { nome: "Oficina do Inventor", level: 1, desc: "<p><em>(Aparatos e Feitos Científicos)</em> Cria máquinas e realiza experiências como um Técnico (NT = seu nível, máximo 10), mas com <strong>prejuízo tecnológico de 5%</strong> no custo.</p>" },
      { nome: "Tecnologia de Ponta", level: 3, desc: "<p>Salta direto para o <strong>5º Nível Tecnológico</strong> e evolui dali em diante, a cada nível (NT máximo 10). Prejuízo: <strong>15%</strong>.</p>" },
      { nome: "Engenho Improvisado", level: 6, desc: "<p>Combina até <strong>3 aparatos diferentes</strong> num só engenho: <strong>1-3 em 1d6</strong> (regras de combinação de aparatos do Space Dragon). Prejuízo: <strong>30%</strong>.</p>" },
      { nome: "Gênio da Invenção", level: 10, desc: "<p>Cria qualquer máquina e realiza qualquer experiência <strong>independente das condições</strong> — sem bancada, no meio de uma tempestade de areia, dentro de uma cela. Prejuízo: <strong>50%</strong>.</p>" },
      reputacao("O nome que faz um estaleiro abrir as portas e um cartel pagar adiantado."),
    ],
  },
  {
    nome: "Técnico — Slicer",
    tabela: "tecnico",
    coluna: "especial",
    dv: 8,
    high_level_hp_bonus: 1,
    restricao_alinhamentos: ["caotico"],
    flavor: "<p>O mestre dos sistemas. <em>Especialização de Técnico (caótico) — base: Niilógico.</em></p>",
    descricao:
      "<p><em>\"A máquina não tem dono. Ela só ainda não me conheceu.\"</em></p>" +
      "<p>O Slicer é o Niilógico que deixou a lógica escorrer pelas beiradas. Onde o Médico cura e o Engenheiro constrói, ele <strong>conversa com as máquinas como quem sussurra segredos</strong> — e elas obedecem. Renegou o establishment tecnológico, seus fornecedores e seus selos de garantia.</p>" +
      "<p><strong>Perde</strong> <em>Operar e Consertar Máquinas</em> e o <em>Desconto Tecnológico</em>; <em>Desativar Droides</em> é substituída por <strong>Sequestrar Droides</strong> — no lugar de <em>desligar</em> um droide, ele aprendeu a <strong>tomá-lo para si</strong>.</p>" + NOTA_SPEC_MUNDANA,
    equipment_restrictions: EQ_TECNICO,
    habilidades: [
      { nome: "Aparatos e Feitos Científicos", level: 1, desc: "<p>Cria aparatos e realiza feitos em seus improvisos de laboratório, com <strong>Nível Tecnológico igual ao seu nível</strong> (NT máximo 10). Sem desconto nem prejuízo — o Slicer não barganha com ninguém: monta o que precisa com sucata, mercado negro e engenharia reversa, pagando o valor cheio dos componentes.</p>" },
      { nome: "Invasão de Sistemas", level: 3, desc: "<p><em>(Sabotagem)</em> O Slicer passa a sabotar, arrombar e reprogramar sistemas como um <strong>Operativo com um terço do seu nível</strong> — destranca fechaduras eletrônicas, derruba alarmes, força painéis e cofres de dados. Chance de <strong>1-2 em 1d6</strong>.</p>", level6: "<p>Chance de <strong>1-3 em 1d6</strong>.</p>", level10: "<p>Chance de <strong>1-4 em 1d6</strong>.</p>" },
      { nome: "Sequestrar Droides", level: 6, desc: "<p><em>(Controlar Robôs)</em> Em vez de neutralizar um droide, o Slicer o <strong>reprograma para servi-lo</strong>. Contra um droide que <strong>falhe num teste de Moral</strong>, ele assume o controle: numa falha comum, o alvo obedece a seus comandos por <strong>24 horas</strong>; se o droide falhar no teste <strong>com dois dados iguais</strong>, passa a servir o Slicer <strong>indefinidamente</strong>, até que alguém consiga reverter a intrusão.</p><p>É a marca do slicer: não destrói o exército de droides do inimigo — vira-o contra o dono.</p>" },
      { nome: "Faísca do Oculto", level: 10, desc: "<p><em>(Poderes Mentais)</em> De tanto mergulhar nos fluxos de dados e nos sistemas vivos das máquinas, a mente do Slicer <strong>passa a operar além dos limites normais da lógica e se conecta ao \"Espírito Galáctico\"</strong>. Ele manifesta <strong>poderes da Força de 1ª Grandeza</strong> da lista <strong>Universal</strong>, com <strong>Foco Diário igual ao seu modificador de Inteligência</strong> (mínimo 1).</p><p>⚠️ <strong>Exceção deliberada do cenário — não \"corrija\" isto.</strong> Em todo o resto do cenário a Força é regida pela <strong>Sabedoria</strong>. O Slicer é a única exceção, e é de propósito: ele não <em>sente</em> a Força, ele a <strong>arromba</strong> — chega ao Espírito Galáctico pela lógica, pelo cálculo e pela engenharia reversa.</p>" },
      reputacao("Um apelido de rede que ninguém sabe pronunciar em voz alta, mas que todo administrador de sistemas reconhece."),
    ],
  },

  // ══════════════════════════════════════════════════════════════════════════
  // SENSÍVEL À FORÇA — chassi Mentálico (d8)
  // ══════════════════════════════════════════════════════════════════════════
  {
    nome: "Sensível à Força",
    tabela: "sensivel",
    coluna: "normal",
    dv: 8,
    high_level_hp_bonus: 1,
    flavor: "<p>Jedi, Sith, Nightsisters e místicos de fronteira. <em>Chassi: Mentálico.</em></p>",
    descricao:
      "<p>Quem nasce com a Força mais forte nas veias é um <strong>Sensível à Força</strong> — uma classe-base que reskina os Poderes Mentais do Space Dragon como <strong>Poderes da Força</strong>. Corpo um pouco mais resistente que o do místico puro (Vida d8), mas Base de Ataque e Jogadas de Proteção fracas: a Força não faz do corpo uma arma — quem quer isso escolhe a especialização <strong>Guardião</strong>.</p>" +
      "<p><strong>Atributo-chave: Sabedoria</strong> (Foco da Força, testes de poder e o Duelo). <em>Adaptação deliberada do cenário: no Space Dragon os poderes mentais correm pela Inteligência. A Força do Jedi é sensibilidade e disciplina, não erudição.</em></p>" +
      "<p><strong>Créditos iniciais:</strong> 1d6 × 50 CR. <strong>Restrição:</strong> Droides não podem ser Sensíveis à Força.</p>" +
      "<p><strong>Foco Extra por Grandeza:</strong> some ao Foco Diário o Foco Extra lido na Tabela 1-2 do Estrela Dracônica — só que, aqui, pelo valor de <strong>Sabedoria</strong>. A tabela dá Foco Extra para 1ª, 2ª e 3ª Grandezas.</p>"
      + "<p><strong>Sendas (especializações):</strong> Guardião (sabre) · Consular (poderes) · Sentinela (caçador) · Vidente (os nexos da Força). Escolhidas no 1º nível e independentes do Caminho — existe Guardião da Luz e Guardião da Sombra.</p>"
      + "<p><strong>As Sendas NÃO têm restrição de alinhamento</strong> (correção da casa). Nas classes mundanas cada especialização é presa a um alinhamento; aqui isso foi <strong>removido</strong>. O motivo é de design: a restrição existe para diferenciar as trilhas — e no Sensível essa diferenciação <em>já é feita pelo Caminho (Luz/Sombra) e pela Corrupção</em>. Manter os dois eixos produzia aberrações: um Sith de sabre seria obrigatoriamente \"Guardião neutro\" com Corrupção 10, e um Inquisidor caçador de Jedi seria \"Sentinela caótico\" a serviço do regime mais ordeiro da galáxia. O Sensível <strong>escolhe livremente</strong> a Senda e o alinhamento; quem manda na moral dele é o <strong>Caminho</strong>.</p>"
      + "<p><em>Variante opcional — se a sua mesa preferir a amarração antiga, a leitura mais coerente seria pelo <strong>Caminho</strong>, não pela Senda: Luz → Ordeiro ou Neutro · Sombra → Caótico ou Ordeiro (o Império é ordeiro) · sem Caminho → Neutro.</em></p>",
    equipment_restrictions: EQ_SENSIVEL,
    habilidades: [
      { nome: "Poderes da Força", level: 1, desc: "<p><em>(= Poderes Mentais)</em> Você canaliza a Força para mover, proteger, enganar ou destruir. Cada poder tem uma <strong>Grandeza</strong> (1ª a 10ª); o <strong>Foco Diário</strong> de cada uma vem da tabela da classe, somado ao <strong>Foco Extra</strong> da Sabedoria. Você <strong>começa com dois poderes de 1ª Grandeza</strong> de livre escolha (lista Universal + a do seu Caminho).</p>" },
      { nome: "Duelo da Força", level: 1, desc: "<p><em>(= Anulação e Contra-Ataque Mental)</em> Ao ser alvo de um poder da Força, você pode tentar <strong>anulá-lo</strong>: gaste Foco igual à Grandeza do poder e faça um <strong>teste resistido de Sabedoria</strong> contra quem o lançou. Antes de rolar, pode gastar Foco extra para <strong>+1 por ponto</strong> (o total gasto assim não pode exceder a Grandeza do poder resistido).</p><p>Num crítico (falha ou sucesso) há um <strong>choque da Força</strong>: um dos dois sofre <strong>1d4</strong> e faz <strong>JPS</strong> ou fica atordoado por 1d6 rodadas. Vencendo, você <strong>revida na hora</strong> com um poder seu (o agressor pode tentar anular).</p><p><em>Ataque de Sabedoria, defesa de JPS — não há duplicação: um alvo comum de um poder da Força rola JPS; só um Sensível pode gastar Foco para transformar aquilo num Duelo.</em></p>" },
      { nome: "Aprender Poderes da Força", level: 1, desc: "<p>Por treino e intuição: gaste um uso do Foco da Grandeza desejada e passe num <strong>teste de Sabedoria</strong> — em sucesso o poder se manifesta, e você pode tentar <strong>memorizá-lo</strong> (novo teste) para usá-lo à vontade. Falha consome o uso e trava nova tentativa por 24 horas (falha crítica, 1d4 dias). Um mestre que o ensine torna o teste <strong>Fácil</strong>.</p>" },
      { nome: "O Caminho: Luz e Sombra", level: 1, desc: "<p>No 1º nível o Sensível escolhe um <strong>Caminho</strong>, que fica <em>por cima</em> da especialização e decide quais listas de poderes ele acessa.</p><ul><li><strong>Caminho da Luz</strong> — serenidade, defesa, cura, previdência. Acessa Universal + Luz.</li><li><strong>Caminho da Sombra</strong> — paixão, domínio, medo, destruição. Acessa Universal + Sombra.</li><li><strong>Neutralidade</strong> — pode começar sem Caminho declarado (só a lista Universal) e escolher mais tarde.</li></ul><p><strong>Cruzar de lista (a Queda):</strong> um personagem da Luz pode usar um poder da Sombra em desespero, mas cada uso marca <strong>+1 de Corrupção</strong>. Alguns poderes marcam Corrupção mesmo para a Sombra (vêm com ★ na lista).</p>" },
      { nome: "Corrupção — Queda e Redenção", level: 1, desc: "<p>A Corrupção é uma trilha de 0 a 10 que mede o quanto a Sombra já enraizou.</p><p><strong>Ganhar (+1):</strong> usar um poder da lista Sombra, usar qualquer poder para crueldade deliberada, ou ceder ao ódio numa cena-chave. <strong>Perder (−1):</strong> atos definidores de compaixão e sacrifício, meditação prolongada sob orientação, recusar o caminho fácil quando ele custa caro.</p><ul><li><strong>0–2 Sereno:</strong> sem penalidade.</li><li><strong>3–5 Marcado:</strong> olhos começam a amarelar sob esforço; testes sociais com não-corrompidos ficam Difíceis quando a Força é usada à vista.</li><li><strong>6–8 Tomado:</strong> surtos de fúria; o Mestre pode assumir uma ação em cena de estresse extremo.</li><li><strong>9–10 Queda.</strong></li></ul><p><strong>A Queda:</strong> ao chegar a Corrupção 10, um Sensível da Luz (ou neutro) cai — surto sombrio, troca definitiva para o Caminho da Sombra e uma marca física. <strong>A Redenção:</strong> exige reduzir a Corrupção a menos de 3 <em>e</em> um sacrifício definidor.</p>" },
      reputacao("O nome de um Mestre Jedi abre portas; o de um Lorde Sith \"funciona\" fechando as mesmas portas. Sob o Império, uma Reputação Jedi alta é tão útil quanto perigosa — o Mestre pode exigir que o teste seja rolado <em>contra</em> você."),
    ],
  },
  {
    nome: "Sensível à Força — Guardião",
    tabela: "sensivel",
    coluna: "especial",
    // Adestramento de Combate [1]: a Base de Ataque evolui como a de um
    // Veterano. A tabela já sai montada assim, para a ficha calcular certo.
    baDe: "veterano",
    dv: 8,
    high_level_hp_bonus: 1,
    // Sem trava de alinhamento: as Sendas do Sensível não têm restrição
    // (quem manda na moral dele é o Caminho — Luz/Sombra — e a Corrupção).
    flavor: "<p>O Jedi/Sith de sabre. <em>Especialização de Sensível à Força.</em></p>",
    descricao:
      "<p>Obi-Wan, Anakin, Ahsoka, Darth Maul, Darth Vader. A Força serve à lâmina.</p>" +
      "<p>Troca a amplitude do poder pela maestria da lâmina. Com o d8 da base, encara a linha de frente.</p>" +
      "<p><strong>Troca:</strong> seu <strong>teto de Grandeza passa a ser a 6ª</strong> — os feitos lendários (7ª a 10ª) ficam para os conjuradores. A lâmina cobra o preço da profundidade.</p>" + NOTA_SPEC + NOTA_SENDA_SEM_ALINHAMENTO,
    equipment_restrictions: {
      ...EQ_SENSIVEL,
      armors: "Usa armaduras médias sem penalizar a Força — exceção deliberada do cenário à regra de Vestes (o Jedi de armadura de guerra das Guerras Clônicas).",
    },
    habilidades: [
      { nome: "Adestramento de Combate", level: 1, desc: "<p>Sua <strong>Base de Ataque passa a evoluir como a de um Veterano</strong> (não mais a lenta do místico) e você usa <strong>armaduras médias</strong> sem penalizar a Força.</p><p><em>Na ficha: use a coluna de BA do Veterano no lugar da coluna desta classe.</em></p>" },
      { nome: "Formas de Sabre", level: 3, desc: "<p>Domina <strong>uma das sete Formas</strong> — Shii-Cho, Makashi, Soresu, Ataru, Djem So, Niman ou Juyo/Vaapad. A Forma é a linha de habilidades do Guardião: um poder de combate que <strong>progride com o nível</strong> nos degraus 3, 6 e 10.</p>", level6: "<p>A Forma escolhida avança para o seu segundo degrau.</p>", level10: "<p>A Forma escolhida avança para o seu degrau final.</p>" },
      { nome: "Investida da Força", level: 10, desc: "<p>Gastando <strong>1 de Foco</strong>, você desfere <strong>um ataque de sabre extra</strong> na rodada.</p>" },
      reputacao(),
    ],
  },
  {
    nome: "Sensível à Força — Consular",
    tabela: "sensivel",
    coluna: "especial",
    dv: 8,
    high_level_hp_bonus: 1,
    // Sem trava de alinhamento (ver a classe-base).
    flavor: "<p>O Jedi/Sith conjurador. <em>Especialização de Sensível à Força.</em></p>",
    descricao:
      "<p>Yoda, Palpatine, Dooku, a Bruxa Mãe. A Força é a arma inteira — e o corpo, só o combustível.</p>" +
      "<p>Mergulha na Força até o fundo, deixando o corpo para trás. Alcança as <strong>Grandezas mais altas</strong> antes de todos — e, quando o Foco acaba, ainda tem a carne para queimar. O canhão de vidro que escolhe a hora de trincar.</p>" + NOTA_SPEC + NOTA_SENDA_SEM_ALINHAMENTO,
    equipment_restrictions: EQ_SENSIVEL,
    habilidades: [
      { nome: "Percepção Extrassensorial", level: 1, desc: "<p>Concentrando-se por 1 minuto, lê os pensamentos de criaturas inteligentes em <strong>18 metros</strong>, mesmo sem idioma comum. Não atravessa barreira grossa; com muitos alvos, gasta um turno extra para isolar a mente que quer.</p>" },
      { nome: "Mente Superior", level: 3, desc: "<p>Seu Foco da Força passa a contar como o de um Sensível <strong>+2 níveis</strong> — atinge as Grandezas altas mais cedo.</p>", level6: "<p><strong>Preço da Profundidade:</strong> o Foco passa a contar como <strong>+3 níveis</strong>. Além disso, você pode <strong>queimar 3 PV para comprar 1 ponto de Foco</strong> de qualquer Grandeza que já acesse, na hora da conjuração — sem limite de usos, mas o dano não é curável até um descanso longo.</p>" },
      { nome: "Ápice da Mente", level: 10, usos_dia: 1, desc: "<p>Uma vez por dia, você conjura um poder de <strong>uma Grandeza acima do seu teto atual</strong> ou <strong>dobra a área, a duração ou o número de alvos</strong> de um poder conhecido. Ao fazê-lo, faça <strong>JPC ou perca 1 de Constituição</strong> até o próximo descanso longo.</p><p>Se o feito for de <strong>10ª Grandeza</strong>, a perda de Constituição é <strong>permanente</strong> — e uma falha crítica significa <strong>morte por sobrecarga mental</strong>.</p>" },
      reputacao(),
    ],
  },
  {
    nome: "Sensível à Força — Sentinela",
    tabela: "sensivel",
    coluna: "especial",
    dv: 8,
    high_level_hp_bonus: 1,
    // Sem trava de alinhamento (ver a classe-base).
    flavor: "<p>O equilíbrio — caçador e investigador. <em>Especialização de Sensível à Força.</em></p>",
    descricao:
      "<p>Kanan, Ezra, os Inquisidores caçando Jedi, os Guardas de Templo. A Força é ferramenta de sobrevivência.</p>" +
      "<p>Nem tanque nem canhão: o Sensível que se move pelo mundo real, farejando a Sombra e sobrevivendo a ela — caçador de Jedi renegados ou de Sith ocultos.</p>" + NOTA_SPEC + NOTA_SENDA_SEM_ALINHAMENTO,
    equipment_restrictions: EQ_SENSIVEL,
    habilidades: [
      {
        nome: "Ofícios do Submundo",
        level: 1,
        desc: "<p>Ganha <strong>três talentos de Operativo</strong> à escolha, com a chance de um Operativo de <strong>metade</strong> do seu nível — nível mínimo 1 (nunca cai abaixo disso).</p>",
        rogue_talents: [T.furtividade, T.sabotagem, T.escalar, T.rastrear, T.disfarce, T.vigilancia],
      },
      { nome: "Vontade Inquebrável", level: 3, desc: "<p>Suas Jogadas de Proteção contra poderes da Força e efeitos mentais são <strong>Fáceis</strong> — resiste ao Duelo e ao terror da Sombra melhor que qualquer um.</p>" },
      { nome: "Caçador da Força", level: 6, desc: "<p>Sente a presença de outros Sensíveis por perto e ganha <strong>vantagem no primeiro Duelo da Força</strong> de cada confronto.</p>" },
      { nome: "Progressão de Força", level: 10, desc: "<p>Mantém a coluna normal da tabela do Sensível — sem o teto do Guardião nem o salto do Consular. É o mais versátil dos três.</p>" },
      reputacao(),
    ],
  },
  {
    nome: "Sensível à Força — Vidente",
    tabela: "sensivel",
    coluna: "especial",
    dv: 8,
    high_level_hp_bonus: 1,
    // Sem trava de alinhamento (ver a classe-base).
    flavor: "<p>O místico dos nexos. <em>Especialização de Sensível à Força — base: Radiestésico.</em></p>",
    descricao:
      "<p><em>\"A Força não está em mim. Eu é que estou nela.\"</em></p>" +
      "<p>As Nightsisters de Dathomir, Bendu, os místicos dos Whills, o guardião do Mundo-Entre-Mundos, a velha do vilarejo que sabia que você vinha.</p>" +
      "<p>Nem Jedi nem Sith: o Sensível que nunca passou por uma Ordem e aprendeu a Força ouvindo o <strong>lugar</strong>. Onde o Consular escava a própria mente e o Guardião treina o corpo, o Vidente <strong>puxa a Força do mundo ao redor</strong> — dos vivos, das raízes, das pedras, dos nexos onde a corrente corre grossa. É o místico de fronteira, a bruxa de Dathomir, o guardião de um templo esquecido, o eremita que sente uma nave se aproximar antes do sensor.</p>" +
      "<p><strong>Troca:</strong> o Vidente <strong>não é treinado</strong>. Nunca teve um mestre de sabre nem uma biblioteca de holocrons, e paga por isso: <strong>não pode usar sabre de luz sem a penalidade de quem não é Guardião</strong> (empunha, mas sem qualquer bônus de Forma) e seu <strong>teto de Grandeza é a 8ª</strong> — os feitos de 9ª e 10ª exigem uma disciplina formal que ele não tem.</p>" +
      "<p><em>Nota de conversão: esta Senda resgata o <strong>Radiestésico</strong> do Mentálico, que era a especialização Neutra da classe e tinha ficado de fora do cenário — o Sentinela ocupou a vaga sem herdar a mecânica. Canalizar a Força do ambiente é temático demais para Star Wars (Dathomir, a Ilha do Sagrado, os nexos) para ficar sem casa.</em></p>" +
      NOTA_SPEC + NOTA_SENDA_SEM_ALINHAMENTO,
    equipment_restrictions: {
      ...EQ_SENSIVEL,
      weapons: "Armas simples. Empunha o sabre de luz, mas sem treino formal: sofre a penalidade de quem não é Guardião e não recebe bônus de Forma alguma.",
    },
    habilidades: [
      { nome: "Sintonia com o Nexo", level: 1, desc: "<p>O Vidente <strong>sente a Força ao redor como quem sente vento</strong>. Percebe automaticamente lugares de convergência (nexos, templos, sítios de morte em massa), reconhece se um local tende à <strong>Luz ou à Sombra</strong> e sabe quando um Sensível esteve ali nas últimas <strong>24 horas</strong>.</p><p>Em compensação, sua sintonia é <strong>involuntária</strong>: energias soltas — raios, descargas, disparos de energia desviados, surtos de aparatos — são atraídas para ele com <strong>1-2 em 1d6</strong> sempre que ocorrerem por perto.</p>", level3: "<p>A atração involuntária de energia sobe para <strong>1-3 em 1d6</strong>.</p>", level6: "<p>A atração involuntária de energia sobe para <strong>1-4 em 1d6</strong>.</p>", level10: "<p>A atração involuntária de energia sobe para <strong>1-5 em 1d6</strong> — quanto mais sintonizado, mais o mundo o encontra.</p>" },
      { nome: "Comunhão", level: 3, usos_dia: 1, desc: "<p><strong>Uma vez por dia</strong>, o Vidente canaliza a Força que corre nos seres vivos inteligentes <strong>amigáveis ou neutros a até 20 metros</strong>. Ganha Foco extra igual à <strong>soma dos modificadores de Sabedoria</strong> de cada um deles, distribuído entre as Grandezas que ele já acessa — <strong>sem ultrapassar 1/4</strong> do seu Foco Diário total. O Foco assim obtido dura até ele <strong>dormir ou cair inconsciente</strong>.</p><p><em>Quem é canalizado não perde nada, mas sente: a cena pede descrição.</em></p>", level6: "<p><strong>Comunhão Profunda:</strong> a Comunhão passa a alcançar <strong>40 metros</strong> e o teto sobe para <strong>1/3</strong> do Foco Diário. Num <strong>nexo da Força</strong> (a critério do Mestre), o Vidente pode canalizar <strong>o próprio lugar</strong> em vez de pessoas, como se houvesse ali um número de criaturas com Sabedoria 18 igual ao seu nível de classe.</p>", level10: "<p><strong>Mente Coletiva:</strong> a Comunhão alcança <strong>100 metros</strong> e o teto sobe para <strong>metade</strong> do Foco Diário. Mas a fronteira entre ele e o mundo praticamente sumiu: ele <strong>interfere em ondas eletromagnéticas ao seu bel-prazer</strong> (comunicadores falham ou funcionam, sensores mentem, portas se abrem) — e a atração involuntária de energia agora é <strong>1-5 em 1d6</strong>. Estar perto do Vidente numa tempestade, num tiroteio de blasters ou numa sala de reatores é perigoso para ele <strong>e para quem está do lado</strong>.</p>" },
      reputacao(),
    ],
  },
];

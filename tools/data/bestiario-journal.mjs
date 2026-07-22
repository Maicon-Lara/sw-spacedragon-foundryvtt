// Journal de referência do bestiário — transcrito de SW-SD-Bestiario.md.
//
// As criaturas com ficha completa viram Actors (ver bestiario.mjs). O que vai
// aqui é o que NÃO cabe numa ficha: as regras de conversão do guia, o de-para
// dos ~90 arquétipos do Space Dragon para feras de Star Wars, e os modelos de
// PNJ. É a página que o Mestre abre na mesa para vestir uma criatura do SD.

// Linha da tabela de-para: [criaturas do Space Dragon, o que vira em Star Wars]
const DE_PARA = [
  [
    "<strong>Dragões planetários</strong> (Jupiteriano, Marciano, Mercuriano, Netuniano, Plutoniano, Saturniano, Terraniano, Uraniano, Venusiano — Jovem/Adulto/Ancião)",
    "<strong>Dragões da galáxia</strong>: o <strong>Terraniano</strong> (deserto) = <strong>Dragão Krayt</strong> (Ancião = Krayt Maior); os demais = dragões espaciais de mundos extremos (gelo, lava, gás), cada planeta um bioma",
  ],
  ["Aranha Gigante", "Aranha-de-rocha (<em>knobby white spider</em> de Kashyyyk)"],
  [
    "Autômato · Humanóide Robótico · Protótipo/Repetidor/Serviçal/Sucata Robótica",
    "<strong>Droides de combate</strong> e de serviço (de batalha, protocolo, sucata reanimada)",
  ],
  ["Metalópode", "Droide-aranha / centopeia de metal"],
  ["Bolha Verde · Geléia Espacial · Shoggoth", "Limo espacial / massa devoradora amorfa"],
  ["Cristaloide", "Criatura de cristal (tocada por kyber)"],
  ["Crocossauro · Tentaculoide", "<strong>Dianoga</strong> (besta tentacular de esgoto/lixo)"],
  ["Devorador de Mentes · Vampiro Energético", "<strong>Besta do Lado Sombrio</strong> que drena mente/Força"],
  ["Eletricobra · Medusa Elétrica · Monstro de Energia", "Serpente/água-viva/elemental de energia"],
  ["Encrustáceo", "Crustáceo blindado de fosso"],
  [
    "Escaravelho Radioativo · Zangão Gigante · Formigácida · Xheniano",
    "Insetos de colmeia (escaravelho irradiado, drone, formiga ácida, <strong>Geonosiano</strong> guerreiro)",
  ],
  ["Gigante de Pedra · Monstro de Lava", "Golem de rocha / criatura de Mustafar"],
  ["Gigantossauro · Megassauro · Tiranossauro", "<strong>Rancor</strong> (Megassauro = Rancor colossal / Zillo)"],
  ["Glacioprimata · Monstro de Gelo", "<strong>Wampa</strong> e bestas de gelo de Hoth"],
  [
    "Homem Lagarto · Ictiohomem · Simihomem · Pterohomem · Metahumano · Multiforma",
    "Humanoides selvagens/monstruosos: réptil (Trandoshano feral), anfíbio (Aqualish), símio, alado (Geonosiano voador), meta-humano, <strong>metamorfo</strong> (Clawdite)",
  ],
  ["Homenzinho Verde", "Alienígena cinza pequeno"],
  ["Lagarto do Deserto · Raptossauro · Taurópode", "Répteis de duna, raptores, <strong>dewback</strong> de carga"],
  ["Lobo Sônico · Tigre Dentes-de-Sabre", "<strong>Nexu</strong> / loth-wolf / felino predador"],
  ["Lula da Areia · Planta Carnívora", "<strong>Sarlacc</strong> jovem / planta estranguladora"],
  ["Mastodonte · Rinoceratops", "<strong>Bantha</strong> / <strong>Reek</strong> (com chifres, aríete)"],
  ["Monstro do Pântano", "Besta do pântano (Dagobah)"],
  ["Pteroave", "Ave-de-guerra gigante"],
  ["Verme Gigante", "<strong>Exogorth</strong> (<em>space slug</em>) / verme das areias colossal"],
  ["Zork · Simihomem menor", "Bicho pequeno esquisito de fauna local"],
  [
    "<strong>Criaturas-classe</strong> (Cosmonauta/Cientista/Gatuno/Mentálico Nível 1 e 5)",
    "<strong>PNJs</strong>: soldado, oficial, contrabandista e sensível inimigo — ver os modelos de PNJ",
  ],
];

// Linha de PNJ: [nome em Star Wars, base no Space Dragon, referência rápida]
const PNJS = [
  ["<strong>Stormtrooper / soldado</strong>", "Veterano Nível 1 <em>(Cosmonauta)</em>", "DV 1+1 · CA 14 · rifle blaster 1d8 · Moral 9 · XP ~20"],
  ["<strong>Oficial / comandante</strong>", "Veterano Nível 5 <em>(Cosmonauta)</em>", "DV 5+5 · CA 15 · blaster + comanda tropas · XP ~205"],
  ["<strong>Técnico / engenheiro imperial</strong>", "Técnico Nível 5 <em>(Cientista)</em>", "DV 5+5 · CA 14 · aparatos, droides · XP ~175"],
  ["<strong>Operativo / contrabandista</strong>", "Operativo Nível 5 <em>(Gatuno)</em>", "DV 5+5 · CA 14 · Ataque Furtivo, blaster · XP ~175"],
  ["<strong>Sensível inimigo</strong> (Inquisidor/Sith menor)", "Sensível à Força Nível 5 <em>(Mentálico)</em>", "DV 5+5 · CA 12 · sabre + Poderes da Sombra · XP ~205"],
  ["<strong>Lorde Sith / Mestre Jedi renegado</strong>", "Sensível à Força Nível 10 <em>(Mentálico)</em>", "DV 10+8 · CA 15 · sabre 1d10 + poderes de até 5ª Grandeza · Moral 12 · XP ~1.100"],
];

function tabela(cabecalhos, linhas) {
  const th = cabecalhos.map((c) => `<th>${c}</th>`).join("");
  const tr = linhas
    .map((l) => `<tr>${l.map((c) => `<td>${c}</td>`).join("")}</tr>`)
    .join("\n    ");
  return `<table>\n  <thead><tr>${th}</tr></thead>\n  <tbody>\n    ${tr}\n  </tbody>\n</table>`;
}

export const bestiarioJournal = {
  title: "Bestiário — De-para e Modelos de PNJ",
  pages: [
    {
      title: "Como usar o bestiário",
      content:
        "<p>As <strong>criaturas do Space Dragon</strong> (Tabela 11-1 do guia v1.0), vestidas de Star Wars. Assim como as Naves, este material é sobretudo um <strong>de-para</strong>: pegue a criatura do Space Dragon que quiser e vista-a de fera da galáxia — os números (DV, CA, JP, Moral, XP) saem da ficha original do SD.</p>" +
        "<p>As criaturas icônicas já têm ficha pronta no compêndio <strong>Star Wars: Bestiário</strong>, como Actors arrastáveis para a cena.</p>" +
        "<h2>Regras de conversão</h2>" +
        "<ul>" +
        "<li><strong>OD2 não tem os subatributos RD (Resistência a Dano) nem RM (Resistência Mental).</strong> Onde a ficha do SD usa RD/RM, trate como <strong>habilidade da criatura</strong> (ex.: \"reduz 3 de dano físico\", \"imune a efeitos mentais\").</li>" +
        "<li><strong>OD2 não dá atributos a monstros.</strong> Os atributos da ficha do SD viram só <strong>referência</strong> para o Mestre resolver dúvidas; não precisam ser usados.</li>" +
        "<li><strong>Droides só fazem teste de Moral contra Desativação</strong> (a habilidade <em>Desativar Droides</em> do Técnico) — não fogem por Moral como seres vivos.</li>" +
        "<li><strong>JP única:</strong> use o valor de JP da ficha para as três Jogadas (JPD/JPC/JPS), ajustando para Fácil ou Difícil conforme o tipo de ataque.</li>" +
        "</ul>" +
        "<h2>A dica que resolve a mesa</h2>" +
        "<p>O \"planeta\" do dragão é só o bioma. Precisa de um monstro de gelo? Pegue o <strong>Dragão de mundo gelado</strong> (Netuniano/Uraniano). De um verme das dunas? <strong>Verme Gigante</strong>. <em>A ficha já existe no Space Dragon; você só troca a pele.</em></p>" +
        "<p>A Tabela 11-1 do guia v1.0 tem <strong>cerca de 90 criaturas</strong> (contando as variações de dragão). O de-para da próxima página cobre todas por arquétipo — para qualquer uma delas, <strong>a ficha numérica está no livro do Space Dragon</strong>; este material só dá a ela um nome e um lugar na galáxia.</p>",
    },
    {
      title: "De-para: criaturas do SD → feras de Star Wars",
      content:
        "<p>Cada linha agrupa as criaturas do Space Dragon que compartilham o mesmo arquétipo, e o que elas viram na galáxia.</p>" +
        tabela(["Space Dragon", "Vira, em Star Wars…"], DE_PARA),
    },
    {
      title: "Modelos de PNJ — as classes como inimigos",
      content:
        "<p>Use as <strong>criaturas-classe</strong> da Tabela 11-1 como gabarito e vista de Star Wars. As classes deste cenário são reskins do Space Dragon: <strong>Veterano = Cosmonauta</strong>, <strong>Operativo = Gatuno</strong>, <strong>Técnico = Cientista</strong>, <strong>Sensível à Força = Mentálico</strong>.</p>" +
        tabela(["PNJ Star Wars", "Base no SD", "Referência rápida"], PNJS) +
        "<h2>Como montar o chefe Sith ou Inquisidor</h2>" +
        "<p>Use o bloco de <strong>Nível 10</strong> (Lorde Sith / Mestre Jedi renegado, no compêndio de bestiário) como base e <strong>ajuste os poderes conhecidos ao Caminho e à especialização dele</strong>: um <strong>Guardião</strong> prioriza dano de sabre e uma Forma; um <strong>Consular</strong>, as Grandezas altas de controle mental. Para algo ainda mais colossal, suba os DV e mantenha a lógica de <strong>Foco proporcional ao nível</strong>.</p>" +
        "<p>Ele é <em>o antagonista final de um arco, não um obstáculo de meio de sessão</em>.</p>" +
        "<p><strong>Chefe alternativo pronto:</strong> a <strong>Sétima Irmã</strong>, a Inquisidora da aventura <em>Sombra sobre Vandor</em> (DV 6, XP 800) — um antagonista de arco mais leve, para grupos de nível médio.</p>",
    },
  ],
};

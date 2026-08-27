// Tabelas roláveis.
//
// Estas tabelas já existiam — como texto estático nas páginas do Mestre, onde
// só dava para ler e rolar de cabeça. Aqui viram RollTable de verdade: o Mestre
// clica e o resultado sai no chat.
//
// As páginas do journal CONTINUAM existindo e não mudaram: quem quer ver a
// tabela inteira de uma vez lê lá, quem quer rolar usa aqui. Os números são os
// mesmos, transcritos de `mestre-journal.mjs`.
//
// POR QUE UMA TABELA POR COLUNA: no journal elas estão lado a lado numa tabela
// só, mas são rolagens INDEPENDENTES — espécie, papel e traço não se
// correlacionam. Uma RollTable tem uma fórmula só, então cada coluna vira uma
// tabela. Rolar as três é rolar as três.

const PNJ = "Gerador de PNJ";
const RELIQUIA = "Relíquia tecnológica";

// Atalho: lista simples 1..N vira faixas de um valor cada.
const simples = (itens) => itens.map((t, i) => ({ range: [i + 1, i + 1], text: t }));

export const tabelas = [
  // ── Gerador de PNJ ────────────────────────────────────────────────────────
  {
    nome: "PNJ — Espécie",
    pasta: PNJ,
    formula: "1d8",
    desc: "<p>Espécie do PNJ improvisado. Role junto com <em>Papel</em> e <em>Traço marcante</em>.</p>",
    resultados: simples([
      "Humano", "Twi'lek", "Rodiano", "Wookiee",
      "Trandoshano", "Mon Calamari", "Zabrak", "Droide",
    ]),
  },
  {
    nome: "PNJ — Papel",
    pasta: PNJ,
    formula: "1d8",
    desc: "<p>O que ele faz da vida.</p>",
    resultados: simples([
      "Mercenário", "Informante", "Comerciante", "Oficial",
      "Criminoso", "Piloto", "Técnico", "Burocrata",
    ]),
  },
  {
    nome: "PNJ — Traço marcante",
    pasta: PNJ,
    formula: "1d10",
    desc: "<p>A única coisa que a mesa vai lembrar dele.</p>",
    resultados: simples([
      "Cheio de cicatrizes",
      "Ganancioso",
      "Leal até demais",
      "Covarde, mas esperto",
      "Fala pelos cotovelos",
      "Devendo a alguém perigoso",
      "Ex-militar amargurado",
      "Esconde um segredo grave",
      "Viciado em apostas",
      "Secretamente sensível à Força",
    ]),
  },

  // ── Relíquia tecnológica ──────────────────────────────────────────────────
  {
    nome: "Relíquia — Tipo",
    pasta: RELIQUIA,
    formula: "1d20",
    desc: "<p>O que a relíquia é. Caindo em <strong>Aparato tecnológico</strong>, role também <em>Relíquia — Função do aparato</em>.</p>",
    resultados: [
      { range: [1, 3], text: "Arma" },
      { range: [4, 6], text: "Armadura" },
      { range: [7, 9], text: "Item comum" },
      { range: [10, 18], text: "Aparato tecnológico — role a função (1d6)" },
      { range: [19, 19], text: "Veículo" },
      { range: [20, 20], text: "Nave" },
    ],
  },
  {
    nome: "Relíquia — Função do aparato",
    pasta: RELIQUIA,
    formula: "1d6",
    desc: "<p>Só quando o <em>Tipo</em> cai em Aparato tecnológico.</p>",
    resultados: [
      { range: [1, 2], text: "Ofensivo" },
      { range: [3, 4], text: "Defensivo" },
      { range: [5, 6], text: "Utilitário" },
    ],
  },
  {
    nome: "Relíquia — Nível Tecnológico",
    pasta: RELIQUIA,
    formula: "1d20",
    desc: "<p>Quão adiantada é. NT alto é relíquia de quem já não existe.</p>",
    resultados: [
      { range: [1, 3], text: "NT 1" },
      { range: [4, 6], text: "NT 2" },
      { range: [7, 8], text: "NT 3" },
      { range: [9, 10], text: "NT 4" },
      { range: [11, 12], text: "NT 5" },
      { range: [13, 14], text: "NT 6" },
      { range: [15, 16], text: "NT 7" },
      { range: [17, 18], text: "NT 8" },
      { range: [19, 19], text: "NT 9" },
      { range: [20, 20], text: "NT 10" },
    ],
  },
  {
    nome: "Relíquia — Instabilidade",
    pasta: RELIQUIA,
    formula: "1d10",
    desc: "<p>Chance de falhar a cada uso.</p>",
    resultados: [
      ...[10, 20, 30, 40, 50, 60, 70, 80, 90].map((pct, i) => ({
        range: [i + 1, i + 1],
        text: `${pct}% de chance de falhar`,
      })),
      { range: [10, 10], text: "Falha na primeira tentativa e a relíquia se inutiliza" },
    ],
  },
  {
    nome: "Relíquia — Particularidade",
    pasta: RELIQUIA,
    formula: "1d10",
    desc: "<p>O que ela tem de estranho.</p>",
    resultados: [
      { range: [1, 5], text: "Nenhuma" },
      { range: [6, 7], text: "<strong>Formato irreconhecível</strong> — não se parece com nada que se use hoje" },
      { range: [8, 9], text: "<strong>Duas relíquias em uma</strong> — role de novo" },
      { range: [10, 10], text: "<strong>Utilizável por qualquer classe</strong>, ignorando a restrição normal" },
    ],
  },
  {
    nome: "Relíquia — Quem a construiu",
    pasta: RELIQUIA,
    formula: "1d10",
    desc: "<p>De quem era, antes.</p>",
    resultados: [
      { range: [1, 5], text: "Humanos" },
      { range: [6, 7], text: "Espécie humanoide conhecida" },
      { range: [8, 9], text: "<strong>Os Antigos</strong> (os Rakata / Construtores do Infinito)" },
      { range: [10, 10], text: "Desconhecidos" },
    ],
  },
  {
    nome: "Relíquia — Consequência do uso",
    pasta: RELIQUIA,
    formula: "1d10",
    desc: "<p>O preço de mexer no que não se entende.</p>",
    resultados: [
      { range: [1, 5], text: "Nenhuma" },
      { range: [6, 7], text: "<strong>A instabilidade deteriora</strong> — sobe 10% a cada uso" },
      { range: [8, 9], text: "<strong>Contaminação radioativa</strong> em quem a usa" },
      { range: [10, 10], text: "<strong>A relíquia é consciente</strong>" },
    ],
  },
];

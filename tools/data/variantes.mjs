// Variantes de classe prontas para arrastar na ficha.
//
// POR QUE ISTO EXISTE: o sistema OD2 NÃO deixa soltar uma `class_ability`
// direto no personagem — OD2CharacterSheet.js bloqueia com "Habilidades de
// classe não podem ser adicionadas diretamente ao personagem. Adicione-as à
// classe do personagem." O caminho nativo é abrir o item da CLASSE que já está
// na ficha e soltar a habilidade dentro dele (OD2ItemSheet._onDropItem), o que
// funciona mas é pouco descobrível.
//
// Então, para as escolhas que TODO personagem daquela trilha precisa fazer
// (a Forma do Guardião, a Senda Mandaloriana), este arquivo monta variantes de
// classe com a habilidade já embutida: o jogador arrasta a classe certa e
// acabou. As habilidades avulsas continuam no compêndio (avulsas.mjs) para
// quem quiser trocar de Forma depois ou pegar a técnica de uma segunda Forma.
//
// Nada aqui é conteúdo novo: é recombinação do que já está em classes.mjs e
// avulsas.mjs, para não haver duas fontes de verdade do mesmo texto.

import { classes } from "./classes.mjs";
import { classAbilitiesAvulsas } from "./avulsas.mjs";

const FORMAS = classAbilitiesAvulsas.filter((a) => a.folder === "Formas de Sabre (Guardião)");
const NUCLEO = classAbilitiesAvulsas.filter((a) => a.folder === "Senda Mandaloriana");

const acha = (nome) => {
  const c = classes.find((x) => x.nome === nome);
  if (!c) throw new Error(`Classe não encontrada em classes.mjs: ${nome}`);
  return c;
};

// "Shii-Cho (I) — a forma fundamental" -> "Shii-Cho"
// "Juyo / Vaapad (VII) — a forma feroz" -> "Juyo / Vaapad"
function nomeCurtoDaForma(nome) {
  return nome.split("(")[0].trim();
}

// ── Guardião: uma variante por Forma de Sabre ────────────────────────────────
// A classe-base "Sensível à Força — Guardião" CONTINUA existindo: nos níveis
// 1 e 2 o Guardião ainda não escolheu Forma (ela vem no 3º nível).
const guardiao = acha("Sensível à Força — Guardião");

const guardioes = FORMAS.map((forma) => {
  const curto = nomeCurtoDaForma(forma.nome);
  return {
    ...guardiao,
    nome: `Sensível à Força — Guardião (${curto})`,
    flavor: `<p>O Jedi/Sith de sabre, na Forma <strong>${curto}</strong>. <em>Especialização de Sensível à Força (neutro).</em></p>`,
    descricao:
      guardiao.descricao +
      `<p><strong>Esta variante já traz a Forma ${curto} embutida</strong> — arraste-a para a ficha e a Forma vem junto, com as evoluções de 3º, 6º e 10º nível. Se quiser trocar de Forma depois, use a versão genérica da classe e adicione a Forma pelo compêndio <em>Formas de Sabre</em>.</p>`,
    // As habilidades do Guardião + a Forma escolhida, no lugar do ponteiro
    // genérico "Formas de Sabre".
    habilidades: [
      ...guardiao.habilidades.filter((h) => h.nome !== "Formas de Sabre"),
      { ...forma, folder: undefined },
    ],
  };
});

// ── Senda Mandaloriana: uma variante por classe-base ─────────────────────────
// A Senda substitui a ESPECIALIZAÇÃO da classe (por isso usa a coluna XP
// Especial) e mantém as habilidades da classe-base, com as travas de
// progressão descritas na própria habilidade "A Senda Mandaloriana — como
// funciona", que vai junto.
const TROCAS = {
  Veterano: "<strong>Desarmar e Subjugar</strong> param de progredir; mantém <em>Ataques Múltiplos</em> e <em>Pilotar</em>.",
  Operativo: "o <strong>Ataque Furtivo para de progredir</strong>; em troca, o clã lhe ensina <strong>Rastrear</strong>.",
  Técnico: "<strong>perde o Desconto Tecnológico</strong>; mantém aparatos e feitos — o <strong>Armeiro</strong> de um clã é, em regra, um Técnico.",
  "Sensível à Força": "seu <strong>Foco da Força conta como o de um Sensível de −1 nível</strong>; em troca, o clã lhe ensina <strong>uma Forma de Sabre</strong> (até a técnica do 6º nível).",
};

const sendas = Object.entries(TROCAS).map(([base, troca]) => {
  const c = acha(base);
  return {
    ...c,
    nome: `${base} — Senda Mandaloriana`,
    coluna: "especial", // a Senda ocupa o lugar da especialização
    flavor: `<p>O ${base} adotado no Credo de um clã mandaloriano.</p>`,
    descricao:
      `<p><strong>A Senda Mandaloriana substitui a especialização</strong> desta classe: o personagem ganha o Núcleo Mandaloriano e passa a evoluir pela coluna <strong>XP Especial</strong>.</p>` +
      `<p><strong>O que este ${base} troca:</strong> ${troca}</p>` +
      `<p><em>Mandaloriano não é uma espécie, é uma cultura</em> — qualquer espécie pode trilhar a Senda. A Origem <strong>Filho de Mandalore</strong>, no compêndio de Espécies, é a porta de entrada (opcional).</p>` +
      c.descricao,
    habilidades: [...c.habilidades, ...NUCLEO.map((h) => ({ ...h, folder: undefined }))],
  };
});

export const variantes = [...guardioes, ...sendas];

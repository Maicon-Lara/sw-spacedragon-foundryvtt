/**
 * Painel de Grandezas na aba de Poderes — Star Dragon
 *
 * Mostra, na ficha do personagem, quantos poderes ele tem por Grandeza: o
 * **Foco Diário** (usos) e os **Poderes conhecidos** (o número da tabela + 1).
 *
 * SOBRE O GANCHO DE RENDER. O comentário de stardragon.js dizia, desde a 1.0,
 * que `renderActorSheet` "nunca dispara" neste sistema. Medido em 31/08 na mesa
 * de verdade: **dispara**, e `renderOD2CharacterSheet` também. A ficha do OD2
 * herda da camada de compatibilidade, e o Foundry emite o gancho do nome
 * concreto da classe E o da base. A crença antiga levou o tema a marcar o
 * <body> e a Trilha de Corrupção a virar diálogo — as duas decisões continuam
 * boas por outros motivos, mas o motivo registrado estava errado.
 *
 * Este painel é injetado; não substitui nem reescreve nada do sistema, e sai
 * junto se o módulo for desligado.
 */

import { GRANDEZAS, FOCO_EXTRA } from "./grandezas-dados.js";

const ID = "stardragon";
const MARCA = "stardragon-grandezas";

/**
 * Quantas linhas o personagem lê acima ou abaixo da própria, e onde o teto de
 * Grandeza corta. Sai das habilidades que estão na ficha — não de uma lista
 * de nomes de classe, que quebraria a cada trilha nova.
 */
function deslocamento(ator) {
  const habs = ator.items
    .filter((i) => i.type === "class_ability" || i.type === "class")
    .map((i) => `${i.name} ${i.system?.description ?? ""}`)
    .join(" ");

  let desloca = 0;
  let teto = 10;
  const motivos = [];

  // Quem escolheu Senda conhece a tabela + 1; quem não escolheu, + 2. A marca
  // de "escolheu" são os degraus exclusivos do puro: se Intuição Bruta e
  // Improviso NÃO estão na ficha, ele trilhou uma Senda.
  const puro = /Intuição Bruta|Improviso/i.test(habs);
  const somaConhecidos = puro ? 2 : 1;

  // Consular: Mente Superior lê a tabela dois níveis acima.
  if (/Mente Superior/i.test(habs)) {
    desloca += 2;
    motivos.push("Mente Superior: +2 níveis");
  }
  // Sensível na Senda Mandaloriana: um nível abaixo.
  if (/O aço cobra duas vezes/i.test(habs)) {
    desloca -= 1;
    teto = Math.min(teto, 6);
    motivos.push("Senda Mandaloriana: −1 nível, teto na 6ª");
  }
  // Tetos de Grandeza declarados pelas trilhas.
  if (/Teto de Grandeza é a 6|teto de Grandeza passa a ser a 6/i.test(habs)) {
    teto = Math.min(teto, 6);
    if (!motivos.some((m) => m.includes("teto"))) motivos.push("Guardião: teto na 6ª");
  }
  if (/teto.{0,20}8ª|8ª Grandeza.{0,20}teto/i.test(habs)) {
    teto = Math.min(teto, 8);
    motivos.push("Vidente: teto na 8ª");
  }
  return { desloca, teto, motivos, puro, somaConhecidos };
}

const ROMANOS = ["1ª", "2ª", "3ª", "4ª", "5ª", "6ª", "7ª", "8ª", "9ª", "10ª"];

function montaPainel(ator) {
  const nivel = Number(ator.system?.level ?? 0);
  if (!nivel) return null;

  const { desloca, teto, puro, somaConhecidos } = deslocamento(ator);
  const linhaLida = Math.max(1, Math.min(15, nivel + desloca));
  const linha = GRANDEZAS[linhaLida - 1] ?? [];

  // Quantos poderes de cada Grandeza a ficha já tem. O círculo mora em
  // arcane/divine/necromancer/illusionist — a escola carrega o Caminho.
  const tem = {};
  for (const it of ator.items) {
    if (it.type !== "spell") continue;
    for (const c of ["arcane", "divine", "necromancer", "illusionist"]) {
      const v = it.system?.[c];
      if (v && v !== "null") {
        tem[Number(v)] = (tem[Number(v)] ?? 0) + 1;
        break;
      }
    }
  }

  // O Foco Extra da SABEDORIA soma aos usos por dia, da 1ª à 3ª Grandeza
  // (Tabela 1-2 do ED-01). Ele NÃO muda os poderes conhecidos: estes continuam
  // sendo o número da tabela de Grandezas + 1. Um Sensível de Sabedoria alta
  // conjura mais vezes, não sabe mais coisas.
  const sab = Number(ator.system?.sabedoria ?? 0);
  const extra = FOCO_EXTRA[Math.max(0, Math.min(sab, FOCO_EXTRA.length - 1))] ?? [0, 0, 0];

  // SÓ as Grandezas que ele alcança. Mostrar as dez deixava oito traços na
  // tela de um Guardião de 3º nível.
  const celulas = linha
    .map((base, i) => {
      const g = i + 1;
      if (!base || g > teto) return "";
      const bonus = extra[i] ?? 0;
      const foco = base + bonus;
      // Conhecidos saem da TABELA, sem o Foco Extra: +2 sem Senda, +1 com.
      const sabe = base + somaConhecidos;
      const tenho = tem[g] ?? 0;
      const estado = tenho === sabe ? "" : tenho < sabe ? "falta" : "sobra";
      const dica =
        `${foco} de Foco por dia` +
        (bonus ? ` (${base} da tabela + ${bonus} de Sabedoria ${sab})` : "") +
        ` · conhece ${sabe} poderes (tabela ${base} + ${somaConhecidos}${puro ? ", sem Senda" : ""}) · na ficha: ${tenho}`;
      return (
        `<span class="g ${estado}" title="${dica}">` +
        `<span class="rot">${ROMANOS[i]}</span>` +
        `<span class="foco">${foco}${bonus ? `<sup class="bonus">+${bonus}</sup>` : ""}</span>` +
        `<span class="sabe">${tenho}/${sabe}</span></span>`
      );
    })
    .join("");
  if (!celulas) return null;

  const nota = ["Foco/dia · tem/devia"];
  if (extra.some((n) => n)) nota.push(`Sabedoria ${sab}`);
  nota.push(puro ? "sem Senda (+2)" : "com Senda (+1)");
  if (desloca) nota.push(`lê a linha do ${linhaLida}º`);
  if (teto < 10) nota.push(`teto na ${ROMANOS[teto - 1]}`);

  return (
    `<section class="${MARCA}" title="Conhece o número da tabela + 1 em cada Grandeza. Cada Grandeza é uma reserva fechada: o Foco de uma não paga poder de outra.">` +
    `<div class="linha"><span class="titulo">Grandezas</span>${celulas}` +
    `<span class="nota">${nota.join(" · ")}</span></div></section>`
  );
}

/**
 * Só entra em ficha que tem poderes — não poluir a de quem não é Sensível.
 * O critério é ter um poder na ficha OU uma habilidade que dá Foco.
 */
function ehConjurador(ator) {
  if (ator.items.some((i) => i.type === "spell")) return true;
  return ator.items.some(
    (i) => i.type === "class_ability" && /Poderes da Força|Foco Diário/i.test(i.name + (i.system?.description ?? ""))
  );
}

export function ligarPainelDeGrandezas() {
  const injeta = (app, elemento) => {
    try {
      const html = elemento instanceof HTMLElement ? elemento : elemento?.[0];
      const ator = app?.actor ?? app?.document;
      if (!html || ator?.type !== "character" || !ehConjurador(ator)) return;

      const painel = [...html.querySelectorAll("[data-tab='spells']")].find((n) => !n.closest("nav"));
      if (!painel) return;

      painel.querySelector(`.${MARCA}`)?.remove();
      const marcacao = montaPainel(ator);
      if (marcacao) painel.insertAdjacentHTML("afterbegin", marcacao);
    } catch (e) {
      // Nunca quebrar a ficha do sistema por causa de um painel do módulo.
      console.warn(`${ID} | painel de Grandezas não pôde ser desenhado`, e);
    }
  };

  // Os dois disparam neste sistema (medido). Ganchar nos dois seria desenhar
  // duas vezes, então usamos o específico e caímos no genérico se ele sumir
  // numa versão futura do sistema.
  Hooks.on("renderOD2CharacterSheet", injeta);
  Hooks.on("renderActorSheet", (app, el) => {
    if (app?.constructor?.name !== "OD2CharacterSheet") injeta(app, el);
  });
}

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

import { GRANDEZAS } from "./grandezas-dados.js";

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
  return { desloca, teto, motivos };
}

const ROMANOS = ["1ª", "2ª", "3ª", "4ª", "5ª", "6ª", "7ª", "8ª", "9ª", "10ª"];

function montaPainel(ator) {
  const nivel = Number(ator.system?.level ?? 0);
  if (!nivel) return null;

  const { desloca, teto, motivos } = deslocamento(ator);
  const linhaLida = Math.max(1, Math.min(15, nivel + desloca));
  const linha = GRANDEZAS[linhaLida - 1] ?? [];

  // Quantos poderes de cada Grandeza a ficha já tem, para comparar.
  const CAMPOS = { arcane: 1, divine: 1, necromancer: 1, illusionist: 1 };
  const tem = {};
  for (const it of ator.items) {
    if (it.type !== "spell") continue;
    for (const c of Object.keys(CAMPOS)) {
      const v = it.system?.[c];
      if (v && v !== "null") {
        tem[Number(v)] = (tem[Number(v)] ?? 0) + 1;
        break;
      }
    }
  }

  const celulas = ROMANOS.map((rot, i) => {
    const g = i + 1;
    const foco = g <= teto ? linha[i] : undefined;
    if (!foco) return `<div class="g vazia"><span class="rot">${rot}</span><span class="n">—</span></div>`;
    const sabe = foco + 1;
    const tenho = tem[g] ?? 0;
    const estado = tenho === sabe ? "ok" : tenho < sabe ? "falta" : "sobra";
    return (
      `<div class="g ${estado}" title="Foco ${foco} por dia · conhece ${sabe} poderes · na ficha: ${tenho}">` +
      `<span class="rot">${rot}</span>` +
      `<span class="n">${foco}</span>` +
      `<span class="sabe">${tenho}/${sabe}</span></div>`
    );
  }).join("");

  const nota = [];
  if (desloca) nota.push(`lê a linha do <strong>${linhaLida}º</strong> nível`);
  if (motivos.length) nota.push(motivos.join(" · "));

  return (
    `<section class="${MARCA}">` +
    `<h3>Grandezas <span class="legenda">Foco por dia · conhecidos na ficha / devidos</span></h3>` +
    `<div class="faixa">${celulas}</div>` +
    (nota.length ? `<p class="nota">${nota.join(" — ")}</p>` : "") +
    `<p class="regra">Conhece <strong>o número da tabela, + 1</strong> em cada Grandeza. ` +
    `Cada Grandeza é uma <strong>reserva fechada</strong>: Foco de uma não paga poder de outra.</p>` +
    `</section>`
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

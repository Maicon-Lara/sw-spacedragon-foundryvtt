// Tabelas de progressão de BA/JP/XP por nível — transcritas LITERALMENTE das
// tabelas de SW-SD-Classes.md e SW-SD-Forca-Sensitivo.md (escala 1–15 do
// Space Dragon, guia v1.0).
//
// Cada classe tem DUAS colunas de XP: a normal (classe-base) e a "XP Especial"
// (usada por quem se especializa). Por isso `progressao(tabela, "especial")`.
// O nível 1 não possui XP no schema do sistema (só ba/jp).

// [ba, jp, xp, xpEspecial]
const TABELAS = {
  // Veterano — chassi Cosmonauta, DV 10
  veterano: [
    [1, 5, 0, 0], [2, 5, 2000, 2500], [3, 6, 4000, 5000], [4, 6, 7000, 8500],
    [5, 8, 10000, 11500], [6, 8, 20000, 23000], [7, 10, 30000, 33000],
    [8, 10, 40000, 43000], [9, 11, 50000, 53000], [10, 11, 100000, 106000],
    [11, 13, 200000, 210000], [12, 13, 300000, 320000], [13, 14, 400000, 430000],
    [14, 14, 500000, 540000], [15, 16, 600000, 650000],
  ],
  // Operativo — chassi Gatuno, DV 6
  operativo: [
    [1, 5, 0, 0], [1, 5, 1000, 1500], [2, 5, 2000, 3000], [2, 5, 4000, 5500],
    [3, 8, 7000, 8500], [3, 8, 14000, 17000], [4, 8, 24000, 27000],
    [4, 8, 34000, 37000], [5, 11, 44000, 47000], [5, 11, 88000, 94000],
    [6, 11, 180000, 190000], [6, 11, 260000, 280000], [7, 14, 340000, 370000],
    [7, 14, 420000, 460000], [8, 14, 500000, 550000],
  ],
  // Técnico — chassi Cientista, DV 8
  tecnico: [
    [1, 5, 0, 0], [1, 5, 1500, 2000], [1, 5, 3000, 4000], [3, 7, 5500, 7000],
    [3, 7, 8500, 10000], [3, 7, 17000, 20000], [5, 9, 27000, 30000],
    [5, 9, 37000, 40000], [5, 9, 47000, 50000], [7, 11, 94000, 100000],
    [7, 11, 190000, 200000], [7, 11, 280000, 300000], [9, 13, 370000, 400000],
    [9, 13, 460000, 500000], [9, 13, 550000, 600000],
  ],
  // Sensível à Força — chassi Mentálico, DV 8
  sensivel: [
    [0, 5, 0, 0], [1, 5, 2500, 3000], [1, 5, 5000, 6000], [1, 5, 8500, 10000],
    [2, 7, 11500, 13000], [2, 7, 23000, 26000], [2, 7, 33000, 36000],
    [3, 7, 43000, 46000], [3, 7, 53000, 56000], [3, 10, 106000, 112000],
    [4, 10, 210000, 220000], [4, 10, 320000, 340000], [4, 10, 430000, 460000],
    [5, 13, 540000, 580000], [5, 13, 650000, 700000],
  ],
};

// Converte a tabela no formato esperado pelo schema do sistema:
// nível 1 = { ba, jp }; níveis 2..15 = { ba, jp, xp }.
// `coluna`: "normal" (classe-base) ou "especial" (especializações).
export function progressao(tabela, coluna = "normal") {
  const tab = TABELAS[tabela];
  if (!tab) throw new Error(`Tabela de progressão desconhecida: ${tabela}`);
  const idx = coluna === "especial" ? 3 : 2;
  const levels = {};
  tab.forEach((linha, i) => {
    const lvl = i + 1;
    const [ba, jp] = linha;
    levels[String(lvl)] = lvl === 1 ? { ba, jp } : { ba, jp, xp: linha[idx] };
  });
  return levels;
}

// Grandezas da Força por nível (Foco Diário base, 1ª a 10ª) — Tabela do
// Sensível à Força. Usada só para montar a tabela em HTML na descrição da
// classe: o sistema OD2 não modela Grandezas do Space Dragon.
export const GRANDEZAS = [
  [1], [2], [2, 1], [2, 2], [2, 2, 1], [3, 2, 2], [3, 2, 2, 1], [3, 3, 2, 2],
  [3, 3, 2, 2, 1], [3, 3, 3, 2, 2, 1], [4, 3, 3, 2, 2, 2, 1],
  [4, 3, 3, 3, 2, 2, 1, 1], [5, 4, 3, 3, 2, 2, 1, 1],
  [5, 4, 3, 3, 3, 2, 2, 1, 1], [5, 5, 4, 3, 3, 2, 2, 2, 1, 1],
];

// ── Técnico: Nível Tecnológico ──────────────────────────────────────────────
//
// É uma TABELA, não uma fórmula. A curva sobe um degrau por nível com uma pausa
// a cada três (2º, 5º, 8º, 11º e 14º) e chega ao NT 10 no 15º.
//
// POR QUE NÃO É `nível`, QUE SERIA MAIS SIMPLES: a T3-1 do Space Dragon dá ao
// Cientista um NT a cada DOIS níveis, chegando ao 10 no 19º de 20. "NT = nível"
// chegava ao 10 no 10º de 15 — quase o dobro da velocidade do livro, e punha um
// Técnico de 3º nível construindo uma Mochila de Propulsão de 2.500 CR com uma
// renda inicial de 350. A curva abaixo é a do livro, comprimida para 1–15.
//
// Houve também uma regra de "Vagas de bancada" (nível + 2, cada aparato
// ocupando vagas iguais ao NT). Saiu do cofre em 30/08: criava uma economia
// paralela à dos Créditos. O que a classe dá de graça são três aparatos de NT 1
// no 1º nível, uma vez — e daí em diante o nível dá NT, não inventário.
const NT_POR_NIVEL = [1, 1, 2, 3, 3, 4, 5, 5, 6, 7, 7, 8, 9, 9, 10];

export const NT = (nivel) => NT_POR_NIVEL[Math.max(1, Math.min(nivel, 15)) - 1];

/** Tabela de NT por nível para a descrição da classe. */
export function tabelaNT() {
  const linhas = NT_POR_NIVEL.map(
    (nt, i) => `<tr><td>${i + 1}º</td><td><strong>${nt}</strong></td></tr>`
  ).join("");
  return (
    `<table><thead><tr><th>Nível</th><th>NT</th></tr></thead>` +
    `<tbody>${linhas}</tbody></table>`
  );
}

// ── Sensível à Força: a tabela de Grandezas, nas duas leituras ──────────────
//
// GRANDEZAS estava exportada e NUNCA era consumida — código morto desde sempre.
// Ela é justamente a tabela que devia aparecer na descrição do Sensível, e a
// regra nova lhe dá uma segunda coluna: em cada Grandeza o personagem CONHECE
// o número da tabela + 1.
//
// O `+1` não é generosidade: é o que impede a situação absurda de ter Foco de
// 2ª Grandeza e nenhum poder de 2ª para gastar nele.
export function tabelaGrandezas(ate = 15) {
  const romanos = ["1ª", "2ª", "3ª", "4ª", "5ª", "6ª", "7ª", "8ª", "9ª", "10ª"];
  const usadas = Math.max(...GRANDEZAS.slice(0, ate).map((g) => g.length));
  const cab = romanos.slice(0, usadas);
  const linhas = GRANDEZAS.slice(0, ate)
    .map((g, i) => {
      const foco = cab.map((_, j) => g[j] ?? "—").join(" / ");
      const sabe = cab.map((_, j) => (g[j] ? g[j] + 1 : "—")).join(" / ");
      return `<tr><td>${i + 1}º</td><td>${foco}</td><td><strong>${sabe}</strong></td></tr>`;
    })
    .join("");
  return (
    `<table><thead><tr><th>Nível</th><th>Foco Diário (${cab.join(" / ")})</th>` +
    `<th>Poderes conhecidos</th></tr></thead><tbody>${linhas}</tbody></table>`
  );
}

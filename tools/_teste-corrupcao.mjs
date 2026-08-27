// Testa a MATEMÁTICA da Trilha de Corrupção fora do Foundry.
//
// O diálogo e os cartões de chat não dá para testar aqui — dependem do
// Foundry. A regra, dá: as faixas, a trava 0–10, a Queda que volta para 7 e
// troca o Caminho, o Consumido que NÃO mexe na ficha, e o teto da Tentação.
// É onde um erro custa caro, porque a trilha sobe ao longo de sessões e só
// cobra no fim.
//
// Uso: node tools/_teste-corrupcao.mjs

import assert from "node:assert";
import { pathToFileURL } from "node:url";
import path from "node:path";

// ── Foundry de mentira, o mínimo que o arquivo toca ─────────────────────────
const chat = [];
const avisos = [];

class AtorFalso {
  constructor(nome, flags = {}) {
    this.name = nome;
    this.isOwner = true;
    this._flags = { ...flags };
  }
  getFlag(_escopo, k) {
    return this._flags[k];
  }
  async setFlag(_escopo, k, v) {
    this._flags[k] = v;
  }
  async unsetFlag(_escopo, k) {
    delete this._flags[k];
  }
}

globalThis.ChatMessage = {
  getSpeaker: () => ({}),
  getWhisperRecipients: () => [],
  create: (d) => {
    chat.push(d.content);
    return d;
  },
};
globalThis.ui = { notifications: { warn: (m) => avisos.push(m), info: (m) => avisos.push(m) } };
globalThis.game = { user: { isGM: true }, actors: [] };
globalThis.canvas = { tokens: { controlled: [] } };
globalThis.foundry = { applications: { api: {} } }; // sem DialogV2: não abrimos diálogo aqui

const mod = await import(
  pathToFileURL(path.resolve("stardragon-module/module/corrupcao.js")).href
);

// O arquivo não exporta os internos de propósito; para o teste, reimplemento a
// única coisa que preciso chamar direto lendo o próprio módulo via a API
// pública. `abrirCorrupcao` abre diálogo, então testo pelo efeito observável:
// crio o ator, chamo os fluxos públicos e confiro as flags e o chat.

let ok = 0;
const t = (nome, fn) => {
  try {
    fn();
    ok++;
  } catch (e) {
    console.error(`  ✘ ${nome}\n     ${e.message}`);
    process.exitCode = 1;
  }
};

// ── As faixas, conferidas contra o texto da habilidade ──────────────────────
// "0–2 Sereno · 3–5 Marcado · 6–8 Tomado · 9 À beira · 10 o fim"
const FAIXA_ESPERADA = {
  0: "Sereno", 1: "Sereno", 2: "Sereno",
  3: "Marcado", 4: "Marcado", 5: "Marcado",
  6: "Tomado", 7: "Tomado", 8: "Tomado",
  9: "À beira",
  10: "O fim da trilha",
};

// Chega às faixas pelo cartão de chat, que é o que o jogador lê.
async function corrupcaoDe(n, caminho = "luz") {
  const a = new AtorFalso("Cobaia", { corrupcao: n, caminho });
  chat.length = 0;
  return a;
}

console.log("Trilha de Corrupção\n");

// 1) Faixas
for (const [n, nome] of Object.entries(FAIXA_ESPERADA)) {
  // Chama a função DO MÓDULO. Reimplementar a regra aqui testaria o teste.
  t(`faixa de ${n} é ${nome}`, () =>
    assert.strictEqual(mod.__teste.faixaDe(Number(n)).nome, nome));
}

// 2) A Queda: Luz em 9 que ganha +1 vai a 10, cai, volta para 7 e vira Sombra
{
  const a = new AtorFalso("Jedi", { corrupcao: 9, caminho: "luz" });
  chat.length = 0;
  await mod.__teste.mover(a, +1, "teste");
  t("Queda: corrupção volta a 7", () => assert.strictEqual(a._flags.corrupcao, 7));
  t("Queda: Caminho vira Sombra", () => assert.strictEqual(a._flags.caminho, "sombra"));
}

// 3) O Consumido NÃO mexe na ficha — a passagem para NPC é do Mestre
{
  const a = new AtorFalso("Sith", { corrupcao: 9, caminho: "sombra" });
  const r = await mod.__teste.mover(a, +1, "teste");
  t("Consumido: para em 10, não volta para 7", () => assert.strictEqual(a._flags.corrupcao, 10));
  t("Consumido: Caminho continua Sombra", () => assert.strictEqual(a._flags.caminho, "sombra"));
  t("Consumido: o evento é anunciado", () => assert.strictEqual(r.evento, "consumido"));
}

// 4) Neutro cai igual à Luz ("Queda (Luz e neutro)")
{
  const a = new AtorFalso("Padawan", { corrupcao: 9, caminho: "neutro" });
  const r = await mod.__teste.mover(a, +1, "teste");
  t("neutro em 10 também Cai", () => assert.strictEqual(r.evento, "queda"));
  t("neutro: volta para 7 e vira Sombra", () =>
    assert.strictEqual(`${a._flags.corrupcao}/${a._flags.caminho}`, "7/sombra"));
}

// 5) Trava embaixo: compaixão em 0 não vira −1
{
  const a = new AtorFalso("Sereno", { corrupcao: 0, caminho: "luz" });
  await mod.__teste.mover(a, -1, "teste");
  t("não desce abaixo de 0", () => assert.strictEqual(a._flags.corrupcao, 0));
}

// 6) Arrancar (+2) de 8 estoura o 10 e dispara a Queda
{
  const a = new AtorFalso("Jedi", { corrupcao: 8, caminho: "luz" });
  const r = await mod.__teste.mover(a, +2, "Arrancar");
  t("Arrancar de 8 dispara a Queda", () => assert.strictEqual(r.evento, "queda"));
  t("e a Queda ainda pousa em 7", () => assert.strictEqual(a._flags.corrupcao, 7));
}

// 7) O exemplo da própria habilidade: Luz lança poder da Sombra (+1), erra e
//    Arranca (+2) = 3 pontos numa ação
{
  const a = new AtorFalso("Jedi", { corrupcao: 0, caminho: "luz" });
  await mod.__teste.mover(a, +1, "poder da Sombra");
  await mod.__teste.mover(a, +2, "Arrancar");
  t("os custos somam: 0 → 3 numa única ação", () => assert.strictEqual(a._flags.corrupcao, 3));
}

// 8) Nova cena libera a Tentação; novo dia zera o teto também
{
  const a = new AtorFalso("A", { tentacaoCena: true, tentacaoDia: 2 });
  const b = new AtorFalso("B", { tentacaoCena: true, tentacaoDia: 3 });
  game.actors = [a, b];
  await mod.novaCena();
  t("nova cena libera a cena", () => assert.ok(!a._flags.tentacaoCena && !b._flags.tentacaoCena));
  t("nova cena PRESERVA o teto do dia", () => assert.strictEqual(a._flags.tentacaoDia, 2));
  await mod.novoDia();
  t("novo dia zera o teto", () =>
    assert.ok(a._flags.tentacaoDia === undefined && b._flags.tentacaoDia === undefined));
}

console.log(`\n${ok} verificações, ${process.exitCode ? "COM FALHA" : "todas verdes"}.`);

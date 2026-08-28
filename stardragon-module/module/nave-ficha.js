/**
 * Ficha da Nave — Star Dragon
 *
 * Implementa o procedimento de ataque e de esquiva do "Combate Tático de
 * Naves" exatamente como o capítulo o escreve. Os dois pontos onde a regra é
 * contraintuitiva e por isso vale automatizar:
 *
 *   ATAQUE   1d20 + BA contra CA de Casco 44 — sempre 44, para todo chassi.
 *            Os modificadores somam: alcance (+2/0/−2), Foco gasto (+2), porte
 *            do ALVO (0/+2/+4/+6), atacante G/C contra alvo P (−4), atacante
 *            estressado ou avariado (−2).
 *
 *   ESQUIVA  O d20 diz se acertou; a Agilidade diz o quanto doeu. O defensor
 *            rola d6 igual à Agilidade: 5-6 é êxito, 3-4 vira êxito se gastar
 *            Foco, e CADA ÊXITO CANCELA UM DADO DE DANO — não um ponto. É a
 *            parte que mais se erra de cabeça.
 */

import { CA_CASCO, CHASSIS, GERADORES, PORTES, ALCANCES, POSTOS } from "./nave-modelo.js";

const { ActorSheetV2 } = foundry.applications.sheets;
const { HandlebarsApplicationMixin } = foundry.applications.api;

const tr = (chave, padrao) => {
  const t = game.i18n?.localize?.(chave);
  return !t || t === chave ? padrao : t;
};

/** Cartão no formato nativo do OD2 (div.title + p.result). */
function card(ator, titulo, corpo, roll) {
  return ChatMessage.create({
    content: `<div class="title">${titulo}</div>${corpo}`,
    speaker: ChatMessage.getSpeaker({ actor: ator }),
    rolls: roll ? [roll] : [],
    sound: roll ? CONFIG.sounds.dice : null,
  });
}

async function pergunta({ titulo, conteudo, botoes }) {
  const V2 = foundry.applications?.api?.DialogV2;
  if (V2) {
    return V2.wait({
      window: { title: titulo },
      content: conteudo,
      buttons: botoes.map((b) => ({
        action: b.chave,
        label: b.rotulo,
        default: b.padrao,
        callback: (ev, botao) => {
          const form = botao.form ?? botao.closest?.("dialog")?.querySelector("form");
          const dados = form ? new FormData(form) : null;
          return { acao: b.chave, dados: dados ? Object.fromEntries(dados.entries()) : {} };
        },
      })),
      rejectClose: false,
    });
  }
  return new Promise((ok) => {
    const b = {};
    for (const x of botoes)
      b[x.chave] = {
        label: x.rotulo,
        callback: (html) => {
          const f = html[0]?.querySelector("form");
          ok({ acao: x.chave, dados: f ? Object.fromEntries(new FormData(f).entries()) : {} });
        },
      };
    new Dialog({ title: titulo, content: conteudo, buttons: b, close: () => ok(null) }).render(true);
  });
}

export class NaveFicha extends HandlebarsApplicationMixin(ActorSheetV2) {
  static DEFAULT_OPTIONS = {
    classes: ["stardragon", "nave-ficha"],
    position: { width: 560, height: 760 },
    window: { resizable: true, icon: "fa-solid fa-rocket" },
    form: { submitOnChange: true, closeOnSubmit: false },
    actions: {
      atacar: NaveFicha.#atacar,
      esquivar: NaveFicha.#esquivar,
      ficha: NaveFicha.#alternaFicha,
      fimDaRodada: NaveFicha.#fimDaRodada,
      aplicarChassi: NaveFicha.#aplicarChassi,
      rolarCasco: NaveFicha.#rolarCasco,
      aplicarEscudo: NaveFicha.#aplicarEscudo,
      addArma: NaveFicha.#addArma,
      delArma: NaveFicha.#delArma,
    },
  };

  static PARTS = { corpo: { template: "modules/stardragon/templates/nave.hbs", scrollable: [""] } };

  async _prepareContext() {
    const s = this.actor.system;
    return {
      ator: this.actor,
      s,
      editavel: this.isEditable,
      caCasco: CA_CASCO,
      chassis: Object.entries(CHASSIS).map(([k, v]) => ({ k, ...v, sel: k === s.chassi })),
      geradores: Object.entries(GERADORES).map(([k, v]) => ({ k, ...v, sel: k === s.escudo.gerador })),
      portes: Object.entries(PORTES).map(([k, v]) => ({ k, ...v, sel: k === s.porte })),
      postos: POSTOS.map((p) => ({ chave: p, rotulo: p[0].toUpperCase() + p.slice(1), valor: s.postos[p] })),
      pctCasco: s.casco.max ? Math.round((s.casco.value / s.casco.max) * 100) : 0,
      pctEscudo: s.escudo.max ? Math.round((s.escudo.value / s.escudo.max) * 100) : 0,
      descricao: await foundry.applications.ux.TextEditor.implementation.enrichHTML(s.descricao, { async: true }),
    };
  }

  // ── Ataque ────────────────────────────────────────────────────────────────
  static async #atacar(event, alvo) {
    const arma = this.actor.system.armas[Number(alvo.dataset.idx)];
    if (!arma) return;
    const s = this.actor.system;

    const opcoes = (obj, sel) =>
      Object.entries(obj).map(([k, v]) => `<option value="${k}" ${k === sel ? "selected" : ""}>${v.rotulo}</option>`).join("");

    const r = await pergunta({
      titulo: `${arma.nome} — ${this.actor.name}`,
      conteudo:
        `<form class="stardragon-nave-dialogo">` +
        `<p><strong>1d20 + ${s.ba}</strong> contra <strong>CA de Casco ${CA_CASCO}</strong></p>` +
        `<div class="linha"><label>Alcance</label><select name="alcance">${opcoes(ALCANCES, "2")}</select></div>` +
        `<div class="linha"><label>Porte do alvo</label><select name="alvoPorte">${opcoes(PORTES, "P")}</select></div>` +
        (s.fichas.foco ? `<div class="linha"><label>Gastar Foco (+2)</label><input type="checkbox" name="foco" checked></div>` : "") +
        (s.fichas.trava ? `<div class="linha"><label>Gastar Trava em <em>${s.fichas.trava}</em> (rerrola)</label><input type="checkbox" name="trava"></div>` : "") +
        `<div class="linha"><label>Estou na cauda do alvo</label><input type="checkbox" name="cauda"></div>` +
        `<div class="linha"><label>Outro modificador</label><input type="number" name="extra" value="0"></div>` +
        `</form>`,
      botoes: [{ chave: "rolar", rotulo: "Atacar", padrao: true }, { chave: "cancelar", rotulo: "Cancelar" }],
    });
    if (!r || r.acao !== "rolar") return;
    const d = r.dados;

    const alc = ALCANCES[d.alcance] ?? ALCANCES[2];
    const modAlvo = (PORTES[d.alvoPorte] ?? PORTES.P).mod;
    // Atacante G/C contra alvo P: −4. É a regra que impede o cruzador de
    // varrer caça com a bateria pesada.
    const penGrande = ["G", "C"].includes(s.porte) && d.alvoPorte === "P" ? -4 : 0;
    const penEstado = s.fichas.estresse || s.fichas.avariada ? -2 : 0;
    const usouFoco = !!d.foco;
    const modFoco = usouFoco ? 2 : 0;
    const extra = Number(d.extra) || 0;

    const partes = [
      ["BA", s.ba], ["alcance", alc.mod], ["porte do alvo", modAlvo],
      ["Foco", modFoco], ["G/C contra P", penGrande], ["estresse/avaria", penEstado], ["extra", extra],
    ].filter(([, v]) => v);

    const total = partes.reduce((a, [, v]) => a + v, 0);
    let roll = await new Roll(`1d20 + ${total}`).evaluate();
    let refeita = null;
    if (d.trava) {
      refeita = await new Roll(`1d20 + ${total}`).evaluate();
      roll = refeita; // a Trava rerrola o d20; fica com a nova
    }

    const natural = roll.dice[0].results[0].result;
    const acertou = roll.total >= CA_CASCO || natural === 20;
    const critico = natural === 20;
    const falhaCritica = natural === 1;

    let corpo =
      `<p><strong>${arma.nome}</strong> · ${arma.dano} · ${arma.arco === "torre" ? "360°" : "arco frontal"}</p>` +
      `<p class="result">${partes.map(([n, v]) => `${n} ${v > 0 ? "+" : ""}${v}`).join(" · ")}</p>` +
      `<p class="result"><strong>${roll.total}</strong> contra CA ${CA_CASCO}</p>` +
      `<p class="result"><strong class="${acertou ? "success" : "failure"}">` +
      `${acertou ? tr("olddragon2e.chat.success", "Acertou") : tr("olddragon2e.chat.failure", "Errou")}</strong></p>`;

    if (critico)
      corpo += `<p class="result"><strong class="success">Crítico — 20 natural</strong></p>` +
        `<p>O dano <strong>não pode ser esquivado</strong>. Role na tabela de <em>Críticos de Nave</em>.</p>`;
    else if (falhaCritica)
      corpo += `<p class="result"><strong class="failure">Falha crítica — 1 natural</strong></p>` +
        `<p>Role na tabela de falhas de <em>Críticos de Nave</em>.</p>`;
    else if (acertou)
      corpo += `<p>Dano: <strong>${arma.dano}</strong> — o alvo esquiva, e <strong>cada êxito cancela um dado</strong>.</p>` +
        (d.cauda ? `<p><em>Disparo pela cauda: o alvo rola <strong>−1 dado</strong> de Esquiva.</em></p>` : "") +
        (alc.dadoExtra ? `<p><em>Alcance longo: o alvo rola <strong>+1 dado</strong> de Esquiva.</em></p>` : "");

    if (refeita) corpo += `<p><em>Trava gasta: o d20 foi rerrolado.</em></p>`;

    // Gastar as fichas usadas.
    const upd = {};
    if (usouFoco) upd["system.fichas.foco"] = false;
    if (d.trava) upd["system.fichas.trava"] = "";
    if (Object.keys(upd).length) await this.actor.update(upd);

    await card(this.actor, "Ataque de nave", corpo, roll);
  }

  // ── Esquiva ───────────────────────────────────────────────────────────────
  static async #esquivar() {
    const s = this.actor.system;
    if (!s.esquivaPorRolagem && !s.fichas.esquiva)
      return ui.notifications.info(
        `${this.actor.name} tem Agilidade 0: não esquiva por rolagem — encaixa o tiro.`
      );

    const r = await pergunta({
      titulo: `Esquiva — ${this.actor.name}`,
      conteudo:
        `<form class="stardragon-nave-dialogo">` +
        `<p>Agilidade <strong>${s.agilidade}</strong> — rola ${s.agilidade}d6. ` +
        `<strong>5-6</strong> é êxito; <strong>3-4</strong> vira êxito se gastar Foco.</p>` +
        `<div class="linha"><label>Atacado a alcance longo (+1 dado)</label><input type="checkbox" name="longo"></div>` +
        `<div class="linha"><label>Atacado pela cauda (−1 dado)</label><input type="checkbox" name="cauda"></div>` +
        (s.fichas.foco ? `<div class="linha"><label>Gastar Foco (3-4 conta)</label><input type="checkbox" name="foco" checked></div>` : "") +
        (s.fichas.esquiva ? `<div class="linha"><label>Gastar ficha de Esquiva (+1 êxito)</label><input type="checkbox" name="ficha" checked></div>` : "") +
        `</form>`,
      botoes: [{ chave: "rolar", rotulo: "Esquivar", padrao: true }, { chave: "cancelar", rotulo: "Cancelar" }],
    });
    if (!r || r.acao !== "rolar") return;
    const d = r.dados;

    const dados = Math.max(0, s.agilidade + (d.longo ? 1 : 0) - (d.cauda ? 1 : 0));
    const usouFoco = !!d.foco;
    const usouFicha = !!d.ficha;

    let roll = null, faces = [];
    if (dados > 0) {
      roll = await new Roll(`${dados}d6`).evaluate();
      faces = roll.dice[0].results.map((x) => x.result);
    }
    const exitosNaturais = faces.filter((f) => f >= 5).length;
    const convertidos = usouFoco ? faces.filter((f) => f === 3 || f === 4).length : 0;
    const total = exitosNaturais + convertidos + (usouFicha ? 1 : 0);

    const legenda = faces
      .map((f) => (f >= 5 ? `<strong class="success">${f}</strong>` : (usouFoco && f >= 3) ? `<strong>${f}</strong>` : `${f}`))
      .join(" · ");

    let corpo =
      (dados ? `<p class="result">${legenda}</p>` : `<p class="result"><em>sem dados de Agilidade</em></p>`) +
      `<p class="result"><strong>${total}</strong> êxito(s) — cancela <strong>${total} dado(s) de dano</strong></p>`;
    if (convertidos) corpo += `<p><em>Foco gasto: ${convertidos} resultado(s) 3-4 viraram êxito.</em></p>`;
    if (usouFicha) corpo += `<p><em>Ficha de Esquiva gasta: +1 êxito.</em></p>`;
    corpo += `<p><em>Se todos os dados de dano forem cancelados, o tiro <strong>raspou o casco</strong> — 0 de dano.</em></p>`;

    const upd = {};
    if (usouFoco) upd["system.fichas.foco"] = false;
    if (usouFicha) upd["system.fichas.esquiva"] = false;
    if (Object.keys(upd).length) await this.actor.update(upd);

    await card(this.actor, "Esquiva", corpo, roll);
  }

  // ── Fichas e rodada ───────────────────────────────────────────────────────
  static async #alternaFicha(event, alvo) {
    const q = alvo.dataset.ficha;
    if (q === "trava") {
      const atual = this.actor.system.fichas.trava;
      const r = await pergunta({
        titulo: "Travar alvo",
        conteudo:
          `<form class="stardragon-nave-dialogo"><div class="linha"><label>Alvo travado</label>` +
          `<input type="text" name="alvo" value="${atual}" placeholder="nome da nave"></div>` +
          `<p><em>Alcance 1-3, em 360°. Gaste para rerrolar o d20 do ataque ou todos os dados de dano.</em></p></form>`,
        botoes: [{ chave: "ok", rotulo: "Travar", padrao: true }, { chave: "limpar", rotulo: "Limpar" }],
      });
      if (!r) return;
      return this.actor.update({ "system.fichas.trava": r.acao === "limpar" ? "" : (r.dados.alvo ?? "") });
    }
    return this.actor.update({ [`system.fichas.${q}`]: !this.actor.system.fichas[q] });
  }

  static async #fimDaRodada() {
    const s = this.actor.system;
    // A regra: saem Foco e Esquiva não gastas; Trava e Estresse permanecem.
    const upd = { "system.fichas.foco": false, "system.fichas.esquiva": false, "system.fichas.sofreuDano": false };

    // Escudo regenera +1 ao fim de cada rodada SEM sofrer dano.
    let regenerou = 0;
    if (!s.fichas.sofreuDano && s.escudo.value < s.escudo.max) {
      regenerou = 1;
      upd["system.escudo.value"] = Math.min(s.escudo.max, s.escudo.value + 1);
    }
    await this.actor.update(upd);

    await card(
      this.actor,
      "Fim da rodada",
      `<p>Foco e Esquiva removidas. <strong>Trava e Estresse permanecem.</strong></p>` +
        (regenerou
          ? `<p class="result"><strong class="success">Escudo +1</strong> — ${upd["system.escudo.value"]}/${s.escudo.max}</p>`
          : s.fichas.sofreuDano
            ? `<p><em>Sem regeneração: a nave sofreu dano nesta rodada.</em></p>`
            : "")
    );
  }

  // ── Preenchimento a partir do chassi ──────────────────────────────────────
  static async #aplicarChassi() {
    const p = CHASSIS[this.actor.system.chassi];
    if (!p) return;
    await this.actor.update({
      "system.porte": p.porte,
      "system.ba": p.ba,
      "system.agilidade": p.agilidade,
      "system.velocidade": p.velocidade,
      "system.casco.formula": p.casco,
    });
    ui.notifications.info(`Perfil de ${p.rotulo} aplicado: BA +${p.ba}, Agilidade ${p.agilidade}, Vel. ${p.velocidade}.`);
  }

  static async #rolarCasco() {
    const f = this.actor.system.casco.formula || "1d100";
    // "1d1000+" é rótulo de tabela, não fórmula: o Foundry não avalia o "+".
    const limpa = f.replace(/\+\s*$/, "");
    const roll = await new Roll(limpa).evaluate();
    await this.actor.update({ "system.casco.max": roll.total, "system.casco.value": roll.total });
    await card(this.actor, "Casco", `<p class="result"><strong>${roll.total}</strong> pontos de casco (${limpa})</p>`, roll);
  }

  static async #aplicarEscudo() {
    const max = this.actor.system.escudoMaxSugerido;
    await this.actor.update({ "system.escudo.max": max, "system.escudo.value": max });
    ui.notifications.info(`Escudo ${max}/${max}.`);
  }

  static async #addArma() {
    const armas = [...this.actor.system.armas, { nome: "Nova arma", dano: "2d10", arco: "frontal", alcanceMin: 1, alcanceMax: 3, nota: "" }];
    await this.actor.update({ "system.armas": armas });
  }

  static async #delArma(event, alvo) {
    const armas = [...this.actor.system.armas];
    armas.splice(Number(alvo.dataset.idx), 1);
    await this.actor.update({ "system.armas": armas });
  }
}

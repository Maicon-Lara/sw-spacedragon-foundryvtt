// Geração de Actors de monstro do OD2 para "Star Wars — Space Dragon".
//
// ─────────────────────────────────────────────────────────────────────────────
// ONDE ESTÁ O SCHEMA (o template.json do sistema NÃO descreve estes tipos —
// o OD2 usa DataModels em código):
//
//   olddragon2e-foundryvtt-main/src/module/actors/OD2MonsterDataModel.js:4-53
//     class OD2MonsterDataModel → static defineSchema()
//     Campos aceitos em `system` do Actor type "monster":
//       odo_id            StringField   — slug identificador
//       hp                SchemaField   — { value: Number, max: Number } (obrigatórios, initial 10)
//       flavor            StringField   — texto de abertura
//       concept           StringField   — initial "humanoide" (ver enum abaixo)
//       size              StringField   — initial "medio"
//       habitat           StringField   — initial "qualquer"
//       alignment         StringField   — initial "neutro"
//       variant           BooleanField  — se é variação de outra criatura
//       description       StringField   — HTML
//       described_attacks StringField   — ataques por extenso (HTML)
//       encounters        StringField   — nº de encontros
//       encounters_lair   StringField   — nº de encontros no covil
//       xp                StringField
//       treasure          StringField   — tabela de tesouro
//       treasure_lair     StringField
//       mv, mvn, mvv, mvo StringField   — movimento (base, nadando, voando, outro)
//                                        mvc/mve são getters derivados de mv
//       dv                StringField   — dados de vida (só o número)
//       dv_bonus          StringField   — bônus de DV (ex.: "+5")
//       ca                StringField
//       jp                StringField
//       mo                StringField   — Moral
//       url               StringField
//
//   olddragon2e-foundryvtt-main/src/module/items/OD2MonsterAttackDataModel.js:1-28
//     class OD2MonsterAttackDataModel → Item embutido type "monster_attack":
//       text, times (Number, initial 1), description, ba (Number, initial 0),
//       damage_description, damage, damage_bonus (Number), weapon (Boolean)
//
//   Enums válidos: olddragon2e-foundryvtt-main/src/module/config.js:34-63
//     alignment        → ordeiro | neutro | caotico
//     monster_concepts → Humanoide | Humanoide Monstruoso | Gigante | Animal |
//                        Inseto | Constructo | Morto-Vivo | Planta | Gosma |
//                        Dragão | Besta
//     monster_sizes    → miudo | pequeno | medio | grande | imenso | colossal
//
//   Documento-fonte de referência (formato do foundryvtt-cli, com "_key"):
//     olddragon2e-foundryvtt-main/src/packs/monsters/_source/An_o_l_der_*.json
//
// ─────────────────────────────────────────────────────────────────────────────
// NOTA DE FIDELIDADE: o único valor não presente no texto-fonte é `hp`, que o
// DataModel exige (é a barra do token). Ele é DERIVADO do DV pela média do d8
// do OD2 — floor(DV × 4,5) + bônus — nunca inventado. Todo campo que a fonte
// não fornece é simplesmente omitido.

import { makeId, slug, stats } from "./lib.mjs";

const OD2_CONCEPTS = `systems/olddragon2e/assets/monsters-concepts`;

// Nome do arquivo de arte por conceito (assets/monsters-concepts/<conceito>-<tamanho>.webp).
const CONCEPT_FILE = {
  Humanoide: "humanoide",
  "Humanoide Monstruoso": "humanoide_monstruoso",
  Gigante: "gigante",
  Animal: "animal",
  Inseto: "inseto",
  Constructo: "constructo",
  "Morto-Vivo": "morto_vivo",
  Planta: "planta",
  Gosma: "gosma",
  Dragão: "dragao",
  Besta: "besta",
};

const SIZES = {
  miudo: "miudo",
  pequeno: "pequeno",
  medio: "medio",
  grande: "grande",
  imenso: "imenso",
  colossal: "colossal",
};

const ALIGNMENTS = { ordeiro: "ordeiro", neutro: "neutro", caotico: "caotico" };

// "Imenso" → "imenso"; "Médio" → "medio".
function normalize(s) {
  return String(s || "")
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .trim();
}

// "14+5" → { dv: "14", bonus: "+5" }; "20" → { dv: "20", bonus: "" }.
function splitDv(dv) {
  const m = String(dv ?? "").match(/^\s*(\d+)\s*([+-]\s*\d+)?\s*$/);
  if (!m) return { dv: String(dv ?? ""), bonus: "" };
  return { dv: m[1], bonus: (m[2] || "").replace(/\s+/g, "") };
}

// PV derivados do DV (média do d8 do OD2). Ver NOTA DE FIDELIDADE acima.
function hpFromDv(dvRaw) {
  const { dv, bonus } = splitDv(dvRaw);
  const n = parseInt(dv, 10);
  if (isNaN(n)) return 10;
  return Math.max(1, Math.floor(n * 4.5) + (parseInt(bonus, 10) || 0));
}

// "6 m (escavando)" → { mv: "6", mvo: "escavando" }; "9 m (nadando)" → mvn.
function movement(mov) {
  if (!mov) return {};
  const m = String(mov).match(/(\d+)\s*m\s*(?:\(([^)]+)\))?/i);
  if (!m) return {};
  const out = { mv: m[1] };
  const nota = normalize(m[2]);
  if (nota.startsWith("nad")) out.mvn = m[1];
  else if (nota.startsWith("vo")) out.mvv = m[1];
  else if (nota) out.mvo = m[1];
  return out;
}

// "2d8 e derruba" → { damage: "2d8", damage_bonus: 0, damage_description: "2d8 e derruba" }
function parseDamage(dano) {
  const txt = String(dano ?? "");
  const m = txt.match(/(\d*d\d+)\s*(?:\+\s*(\d+))?/i);
  return {
    damage: m ? m[1] : "",
    damage_bonus: m && m[2] ? parseInt(m[2], 10) : 0,
    damage_description: txt,
  };
}

// Item embutido "monster_attack" (vive dentro do Actor, com _key !actors.items!).
function attackItem(atk, actorId, seedPrefix, nome, i) {
  const id = makeId(`monster_attack:${seedPrefix}:${nome}:${atk.nome}:${i}`);
  const qtd = atk.qtd ?? 1;
  const dmg = parseDamage(atk.dano);
  const bonus = atk.bonus != null ? ` +${atk.bonus}` : "";
  const dano = dmg.damage_description ? ` (${dmg.damage_description})` : "";
  return {
    _id: id,
    name: `${qtd} × ${atk.nome}${bonus}${dano}`,
    type: "monster_attack",
    img: "icons/svg/item-bag.svg",
    system: {
      times: qtd,
      ba: atk.bonus ?? 0,
      damage_bonus: dmg.damage_bonus,
      weapon: false,
      description: atk.nome,
      damage_description: dmg.damage_description,
      damage: dmg.damage,
    },
    effects: [],
    folder: null,
    sort: (i + 1) * 100000,
    ownership: { default: 0 },
    flags: {},
    _stats: stats(),
    _key: `!actors.items!${actorId}.${id}`,
  };
}

// Descrição HTML: tipo-fonte + habilidades por extenso + notas.
function buildDescription(m) {
  const partes = [];
  if (m.tipo) partes.push(`<p><strong>Tipo (fonte):</strong> ${m.tipo}</p>`);
  if (m.descricao) partes.push(m.descricao);
  if (m.habilidades?.length) {
    const itens = m.habilidades
      .map((h) => `<li><p><strong>${h.nome}</strong>${h.desc ? `: ${h.desc}` : ""}</p></li>`)
      .join("\n  ");
    partes.push(`<ul>\n  ${itens}\n</ul>`);
  }
  if (m.base) partes.push(`<p><em>Base no Space Dragon: ${m.base}.</em></p>`);
  if (m.nota) partes.push(`<p>${m.nota}</p>`);
  return partes.join("\n");
}

function prototypeToken(name, img) {
  return {
    name,
    displayName: 20,
    actorLink: false,
    appendNumber: false,
    prependAdjective: false,
    texture: { src: img, scaleX: 1, scaleY: 1, offsetX: 0, offsetY: 0, rotation: 0 },
    width: 1,
    height: 1,
    lockRotation: false,
    rotation: 0,
    alpha: 1,
    disposition: -1,
    displayBars: 40,
    bar1: { attribute: "hp" },
    bar2: { attribute: null },
    light: {
      color: null, alpha: 0.5, angle: 360, bright: 0, coloration: 1, dim: 0,
      attenuation: 0.5, luminosity: 0.5, saturation: 0, contrast: 0, shadows: 0,
      animation: { type: null, speed: 5, intensity: 5, reverse: false },
      darkness: { min: 0, max: 1 },
    },
    sight: {
      enabled: false, range: 0, angle: 360, visionMode: "basic",
      attenuation: 0.1, brightness: 0, saturation: 0, contrast: 0,
    },
    detectionModes: [],
    flags: {},
    randomImg: false,
  };
}

/**
 * Documento de Actor type "monster" no formato-fonte do foundryvtt-cli.
 *
 * @param {object} monstro   ficha em português (ver tools/data/bestiario.mjs)
 * @param {string} folderId  _id da pasta (folderDoc) que agrupa a criatura
 * @param {string} seedPrefix prefixo da seed determinística (ex.: nome do grupo)
 * @param {number} sort      ordenação dentro do pack
 */
export function monsterDoc(monstro, folderId, seedPrefix, sort) {
  const id = makeId(`monster:${seedPrefix}:${monstro.nome}`);

  const conceito = CONCEPT_FILE[monstro.conceito] ? monstro.conceito : "Besta";
  const size = SIZES[normalize(monstro.tamanho)] || "medio";
  const img =
    monstro.img || `${OD2_CONCEPTS}/${CONCEPT_FILE[conceito]}-${size}.webp`;

  const system = {
    odo_id: slug(monstro.nome),
    concept: conceito,
    size,
    description: buildDescription(monstro),
  };

  if (monstro.flavor) system.flavor = monstro.flavor;
  if (monstro.habitat) system.habitat = monstro.habitat;
  if (monstro.alinhamento) {
    const a = ALIGNMENTS[normalize(monstro.alinhamento)];
    if (a) system.alignment = a;
  }
  if (monstro.variante) system.variant = true;
  Object.assign(system, movement(monstro.movimento));
  if (monstro.dv != null) {
    const { dv, bonus } = splitDv(monstro.dv);
    system.dv = dv;
    if (bonus) system.dv_bonus = bonus;
    const pv = hpFromDv(monstro.dv);
    system.hp = { value: pv, max: pv };
  }
  if (monstro.ca != null) system.ca = String(monstro.ca);
  if (monstro.jp != null) system.jp = String(monstro.jp);
  if (monstro.moral != null) system.mo = String(monstro.moral);
  if (monstro.xp != null) system.xp = String(monstro.xp);
  if (monstro.tesouro) system.treasure = monstro.tesouro;

  const items = (monstro.ataques || []).map((a, i) =>
    attackItem(a, id, seedPrefix, monstro.nome, i)
  );

  return {
    name: monstro.nome,
    type: "monster",
    _id: id,
    img,
    system,
    prototypeToken: prototypeToken(monstro.nome, img),
    items,
    effects: [],
    folder: folderId,
    flags: {},
    _stats: stats(),
    sort,
    ownership: { default: 0 },
    _key: `!actors!${id}`,
  };
}

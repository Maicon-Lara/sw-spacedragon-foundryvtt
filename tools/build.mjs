// Build dos compêndios de "Star Wars — Space Dragon (OD2)".
// 1) Gera os arquivos-fonte JSON (versionados em packs-src/).
// 2) Compila cada pack para LevelDB em sw-spacedragon-module/packs/.
//
// Uso: npm run build   (a partir da raiz do repositório)

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { compilePack } from "@foundryvtt/foundryvtt-cli";

import {
  folderDoc, classDoc, classAbilityDoc, raceDoc, raceAbilityDoc,
  weaponDoc, armorDoc, miscDoc, spellDoc, journalDoc, itemUuid, writeSource,
} from "./lib.mjs";
import { monsterDoc } from "./lib-actors.mjs";

import { classes } from "./data/classes.mjs";
import { especies, especieAbilitiesAvulsas } from "./data/especies.mjs";
import { classAbilitiesAvulsas, origensAvulsas } from "./data/avulsas.mjs";
import { categorias } from "./data/equipamentos.mjs";
import { listasDePoder, poderesJournal } from "./data/poderes.mjs";
import { grupos as grupasBestiario } from "./data/bestiario.mjs";
import { navesJournal } from "./data/naves.mjs";
import { bestiarioJournal } from "./data/bestiario-journal.mjs";
import { progressao } from "./data/progressoes.mjs";

const ROOT = path.resolve(fileURLToPath(import.meta.url), "../..");
const SRC = path.join(ROOT, "packs-src");
const OUT = path.join(ROOT, "sw-spacedragon-module", "packs");

const CLASSES_PACK = "swsd-classes";
const ESPECIES_PACK = "swsd-especies";
const EQUIPAMENTOS_PACK = "swsd-equipamentos";
const PODERES_PACK = "swsd-poderes";
const BESTIARIO_PACK = "swsd-bestiario";
const JOURNAL_PACK = "swsd-journal";

// Agrupa documentos avulsos em pastas nomeadas pelo campo `folder`.
function agrupaAvulsas(docs, lista, seed, build) {
  const folders = {};
  lista.forEach((ab, i) => {
    if (!folders[ab.folder]) {
      folders[ab.folder] = folderDoc(ab.folder, "Item", seed);
      docs.push(folders[ab.folder]);
    }
    docs.push(build(ab, folders[ab.folder]._id, ab.folder, (i + 1) * 100000));
  });
}

// ── Pack de classes (classes + class_abilities, agrupadas em folders) ──
function buildClassesDocs() {
  const docs = [];
  for (const cls of classes) {
    const folder = folderDoc(cls.nome, "Item", "classes");
    docs.push(folder);
    const abilityUuids = [];
    cls.habilidades.forEach((ab, i) => {
      const doc = classAbilityDoc(ab, folder._id, cls.nome, (i + 1) * 100000);
      docs.push(doc);
      abilityUuids.push(itemUuid(CLASSES_PACK, doc._id));
    });
    // `baDe` troca só a coluna de Base de Ataque por a de outro chassi
    // (usado pelo Guardião, que ataca como Veterano).
    const levels = progressao(cls.tabela, cls.coluna);
    if (cls.baDe) {
      const outra = progressao(cls.baDe, cls.coluna);
      for (const lvl of Object.keys(levels)) levels[lvl].ba = outra[lvl].ba;
    }
    docs.push(classDoc({ ...cls, levels }, folder._id, abilityUuids));
  }
  // Formas de Sabre e Núcleo Mandaloriano: habilidades escolhidas à parte.
  agrupaAvulsas(docs, classAbilitiesAvulsas, "classes", classAbilityDoc);
  return docs;
}

// ── Pack de espécies (races + race_abilities, agrupadas em folders) ──
function buildEspeciesDocs() {
  const docs = [];
  for (const esp of especies) {
    const folder = folderDoc(esp.nome, "Item", "especies");
    docs.push(folder);
    const abilityUuids = [];
    esp.habilidades.forEach((ab, i) => {
      const doc = raceAbilityDoc(ab, folder._id, esp.nome, (i + 1) * 100000);
      docs.push(doc);
      abilityUuids.push(itemUuid(ESPECIES_PACK, doc._id));
    });
    docs.push(raceDoc(esp, folder._id, abilityUuids));
  }
  // Habilidades de espécie avulsas: moldes opcionais e Origens culturais.
  agrupaAvulsas(docs, [...especieAbilitiesAvulsas, ...origensAvulsas], "especies", raceAbilityDoc);
  return docs;
}

// ── Pack de equipamentos (armas, armaduras, aparatos) ──
function buildEquipamentosDocs() {
  const builders = { weapon: weaponDoc, armor: armorDoc, misc: miscDoc };
  const docs = [];
  for (const cat of categorias) {
    const folder = folderDoc(cat.folder, "Item", "equipamentos");
    docs.push(folder);
    const build = builders[cat.tipo];
    cat.itens.forEach((it, i) => {
      docs.push(build(it, folder._id, cat.folder, (i + 1) * 100000));
    });
  }
  return docs;
}

// ── Pack de poderes da Força (1ª a 5ª Grandeza viram spell) ──
function buildPoderesDocs() {
  const docs = [];
  for (const lista of listasDePoder) {
    const folder = folderDoc(lista.folder, "Item", "poderes");
    docs.push(folder);
    lista.poderes.forEach((p, i) => {
      docs.push(spellDoc({ ...p, school: lista.school }, folder._id, lista.school, (i + 1) * 100000));
    });
  }
  return docs;
}

// ── Pack de bestiário (Actors do tipo monster) ──
function buildBestiarioDocs() {
  const docs = [];
  for (const grupo of grupasBestiario) {
    const folder = folderDoc(grupo.folder, "Actor", "bestiario");
    docs.push(folder);
    grupo.monstros.forEach((m, i) => {
      docs.push(monsterDoc(m, folder._id, grupo.folder, (i + 1) * 100000));
    });
  }
  return docs;
}

// ── Pack de journal (referência do mestre) ──
function buildJournalDocs() {
  return [poderesJournal, bestiarioJournal, navesJournal].map((e, i) =>
    journalDoc(e, (i + 1) * 100000)
  );
}

async function compile(packName, docs) {
  const srcDir = path.join(SRC, packName);
  const outDir = path.join(OUT, packName);
  const n = writeSource(srcDir, docs);
  fs.rmSync(outDir, { recursive: true, force: true });
  fs.mkdirSync(outDir, { recursive: true });
  await compilePack(srcDir, outDir, { log: false });
  console.log(`  ✔ ${packName}: ${n} documentos → LevelDB`);
}

async function main() {
  console.log("Gerando compêndios de Star Wars — Space Dragon…");
  await compile(ESPECIES_PACK, buildEspeciesDocs());
  await compile(CLASSES_PACK, buildClassesDocs());
  await compile(EQUIPAMENTOS_PACK, buildEquipamentosDocs());
  await compile(PODERES_PACK, buildPoderesDocs());
  await compile(BESTIARIO_PACK, buildBestiarioDocs());
  await compile(JOURNAL_PACK, buildJournalDocs());
  console.log("Concluído.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});

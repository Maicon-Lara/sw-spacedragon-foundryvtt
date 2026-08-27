// Build dos compêndios de "Star Dragon (Star Wars no OD2)".
// 1) Gera os arquivos-fonte JSON (versionados em packs-src/).
// 2) Compila cada pack para LevelDB em stardragon-module/packs/.
//
// Uso: npm run build   (a partir da raiz do repositório)

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { compilePack } from "@foundryvtt/foundryvtt-cli";

import {
  folderDoc, aninhaPastas, classDoc, classAbilityDoc, raceDoc, raceAbilityDoc,
  weaponDoc, armorDoc, miscDoc, nivelTecnologico, spellDoc, journalDoc, macroDoc, itemUuid, writeSource,
} from "./lib.mjs";
import { monsterDoc } from "./lib-actors.mjs";

import { classes } from "./data/classes.mjs";
import { variantes } from "./data/variantes.mjs";
import { especies, especieAbilitiesAvulsas } from "./data/especies.mjs";
import { classAbilitiesAvulsas, origensAvulsas } from "./data/avulsas.mjs";
import { categorias } from "./data/equipamentos.mjs";
import { listasDePoder, poderesJournal } from "./data/poderes.mjs";
import { grupos as grupasBestiario } from "./data/bestiario.mjs";
import { ameacas } from "./data/ameacas.mjs";
import { navesJournal } from "./data/naves.mjs";
import { bestiarioJournal } from "./data/bestiario-journal.mjs";
import { equipamentosJournal } from "./data/equipamentos-journal.mjs";
import { feitosJournal } from "./data/feitos-journal.mjs";
import { mestreJournal } from "./data/mestre-journal.mjs";
import { criacaoJournal } from "./data/criacao-journal.mjs";
import { progressao } from "./data/progressoes.mjs";
import { macros } from "./data/macros.mjs";

const ROOT = path.resolve(fileURLToPath(import.meta.url), "../..");
const SRC = path.join(ROOT, "packs-src");
const OUT = path.join(ROOT, "stardragon-module", "packs");

const CLASSES_PACK = "stardragon-classes";
const ESPECIES_PACK = "stardragon-especies";
const EQUIPAMENTOS_PACK = "stardragon-equipamentos";
const PODERES_PACK = "stardragon-poderes";
const BESTIARIO_PACK = "stardragon-bestiario";
const JOURNAL_PACK = "stardragon-journal";
const MACROS_PACK = "stardragon-macros";

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
  for (const cls of [...classes, ...variantes]) {
    // O item da classe mostra só a especialização: "Espião", não
    // "Operativo — Espião". A pasta já dizia isso — aninhaPastas() monta
    // Operativo › Espião e o prefixo no item era repetição.
    //
    // PASTAS E _id CONTINUAM NO NOME COMPLETO. O aninhamento depende do
    // padrão "Pai — Filho" no nome da pasta, e os _id são semeados por ele:
    // encurtar o seed trocaria o UUID de todas as classes e habilidades e
    // quebraria as fichas já montadas.
    const nomeCompleto = cls.nome;
    const nomeCurto = nomeCompleto.split(" — ").pop();
    const folder = folderDoc(nomeCompleto, "Item", "classes");
    docs.push(folder);
    const abilityUuids = [];
    cls.habilidades.forEach((ab, i) => {
      const doc = classAbilityDoc(ab, folder._id, nomeCompleto, (i + 1) * 100000);
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
    docs.push(classDoc({ ...cls, nome: nomeCurto, seedNome: nomeCompleto, levels }, folder._id, abilityUuids));
  }
  // Formas de Sabre e pacote de clã: habilidades escolhidas à parte.
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
const PASTA_APARATOS = "Aparatos Tecnológicos";

function buildEquipamentosDocs() {
  const builders = { weapon: weaponDoc, armor: armorDoc, misc: miscDoc };
  const docs = [];

  // Aparatos saem das categorias e voltam agrupados por Nível Tecnológico.
  // `seed` viaja junto com o item: o _id deriva dela (makeId("misc:SEED:nome")),
  // entao trocar a semente pelo nome da pasta nova mudaria todos os IDs e
  // quebraria as referencias por UUID de quem ja importou o compendio.
  const porNT = new Map();
  const acessorios = [];

  for (const cat of categorias) {
    if (cat.folder.startsWith(PASTA_APARATOS)) {
      for (const it of cat.itens) {
        const nt = it.acessorio ? null : nivelTecnologico(it);
        if (nt === null) acessorios.push({ it, seed: cat.folder });
        else {
          if (!porNT.has(nt)) porNT.set(nt, []);
          porNT.get(nt).push({ it, seed: cat.folder });
        }
      }
      continue;
    }
    const folder = folderDoc(cat.folder, "Item", "equipamentos");
    docs.push(folder);
    const build = builders[cat.tipo];
    cat.itens.forEach((it, i) => {
      docs.push(build(it, folder._id, cat.folder, (i + 1) * 100000));
    });
  }

  const raiz = folderDoc(PASTA_APARATOS, "Item", "equipamentos");
  docs.push(raiz);

  for (const nt of [...porNT.keys()].sort((a, b) => a - b)) {
    const sub = folderDoc(`NT ${nt}`, "Item", "equipamentos:aparatos", {
      parentId: raiz._id,
      sort: nt * 100000,
    });
    docs.push(sub);
    porNT.get(nt).forEach(({ it, seed }, i) => {
      docs.push(miscDoc(it, sub._id, seed, (i + 1) * 100000));
    });
  }

  // Acessorios comerciais nao sao aparatos: sao a versao de prateleira, sem NT.
  // O cofre os agrupa assim ("São acessórios comerciais de +1; o aparato de
  // verdade é o Visor de Precisão").
  if (acessorios.length) {
    const sub = folderDoc("Acessórios comerciais", "Item", "equipamentos:aparatos", {
      parentId: raiz._id,
      sort: 9900000,
    });
    docs.push(sub);
    acessorios.forEach(({ it, seed }, i) => {
      docs.push(miscDoc(it, sub._id, seed, (i + 1) * 100000));
    });
  }

  return docs;
}

// ── Pack de poderes da Força (1ª a 5ª Grandeza viram spell) ──
function buildPoderesDocs() {
  const docs = [];
  for (const lista of listasDePoder) {
    const vertente = folderDoc(lista.folder, "Item", "poderes");
    docs.push(vertente);

    // Dentro da vertente, uma subpasta por Grandeza. `circle` é a Grandeza:
    // as de 1ª a 5ª viram spell (as de 6ª a 10ª vivem no journal).
    const porGrandeza = new Map();
    for (const p of lista.poderes) {
      const g = p.circle ?? 1;
      if (!porGrandeza.has(g)) porGrandeza.set(g, []);
      porGrandeza.get(g).push(p);
    }

    for (const g of [...porGrandeza.keys()].sort((a, b) => a - b)) {
      // A seed inclui a vertente: sem isso, a "1ª Grandeza" da Luz e a da
      // Sombra gerariam o mesmo _id e uma sobrescreveria a outra.
      const sub = folderDoc(`${g}ª Grandeza`, "Item", `poderes:${lista.folder}`, {
        parentId: vertente._id,
        sort: g * 100000,
      });
      docs.push(sub);
      porGrandeza.get(g).forEach((p, i) => {
        docs.push(spellDoc({ ...p, school: lista.school }, sub._id, lista.school, (i + 1) * 100000));
      });
    }
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

  // Ameaças das aventuras de "A Longa Sombra", transcritas dos blocos de PNJ
  // do cofre. A pasta-mãe existe para aninhaPastas() encaixar
  // "Ameaças — Ecos do Passado" dentro dela pelo travessão.
  const mae = folderDoc("Ameaças", "Actor", "ameacas");
  docs.push(mae);
  for (const grupo of ameacas) {
    const pasta = folderDoc(grupo.folder, "Actor", "ameacas");
    docs.push(pasta);
    grupo.monstros.forEach((m, i) => {
      docs.push(monsterDoc(m, pasta._id, grupo.folder, (i + 1) * 100000));
    });
  }

  return docs;
}

// ── Pack de journal (referência do mestre) ──
function buildJournalDocs() {
  return [
    criacaoJournal, equipamentosJournal, feitosJournal, poderesJournal,
    navesJournal, bestiarioJournal, mestreJournal,
  ].map((e, i) =>
    journalDoc(e, (i + 1) * 100000)
  );
}

// ── Pack de macros ──
// Botões arrastáveis; a lógica mora no script do módulo (game.stardragon.*).
function buildMacrosDocs() {
  return macros.map((m, i) => macroDoc(m, null, (i + 1) * 100000));
}

async function compile(packName, docs) {
  const srcDir = path.join(SRC, packName);
  const outDir = path.join(OUT, packName);
  // Converte a hierarquia dos NOMES ("Operativo — Assassino") em pastas
  // aninhadas de verdade. Vale para todos os packs, por isso mora aqui.
  const n = writeSource(srcDir, aninhaPastas(docs));
  fs.rmSync(outDir, { recursive: true, force: true });
  fs.mkdirSync(outDir, { recursive: true });
  await compilePack(srcDir, outDir, { log: false });
  console.log(`  ✔ ${packName}: ${n} documentos → LevelDB`);
}

async function main() {
  console.log("Gerando compêndios de Star Dragon…");
  await compile(ESPECIES_PACK, buildEspeciesDocs());
  await compile(CLASSES_PACK, buildClassesDocs());
  await compile(EQUIPAMENTOS_PACK, buildEquipamentosDocs());
  await compile(PODERES_PACK, buildPoderesDocs());
  await compile(BESTIARIO_PACK, buildBestiarioDocs());
  await compile(JOURNAL_PACK, buildJournalDocs());
  await compile(MACROS_PACK, buildMacrosDocs());
  console.log("Concluído.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});

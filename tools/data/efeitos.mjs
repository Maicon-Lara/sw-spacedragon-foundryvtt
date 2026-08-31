// Efeitos do Star Dragon no formato do módulo "Old Dragon 2: Qualidade de Vida".
//
// O QdV guarda os efeitos numa flag do ator —
// `flags.old-dragon-2-qualidade-de-vida.effects` — e o compêndio dele é fixo no
// id dele, então não adianta publicar um pack nosso: ele não o leria. O que
// funciona é a macro `Efeitos (QdV)` escrever direto na flag.
//
// ── POR QUE ESTA LISTA É CURTA ──────────────────────────────────────────────
//
// Uma varredura ingênua nas habilidades acha 45 "modificadores numéricos". Quase
// todos NÃO devem virar efeito, e um deles seria bug:
//
//   · CASCA PELUDA e GARRAS E ESCAMAS (+1 de CA natural) — o SISTEMA já aplica,
//     pelo campo `natural_armor` da race_ability. Somar um efeito daria +1 duas
//     vezes. Ficam de fora, e é o motivo mais importante desta lista existir
//     escrita à mão em vez de gerada.
//
//   · AS FORMAS DE SABRE e MUDAR DE GUARDA (−2 na CA) — não é modificador
//     permanente: é o preço de trocar de Forma no meio do combate, por uma
//     rodada. Efeito permanente ali seria mentira.
//
//   · SORESU (+2), MAKASHI, ATARU… — posturas e técnicas ativadas, não passivos.
//
//   · DOIS CORAÇÕES (+2 na JPC contra veneno), INABALÁVEL, SANGUE-FRIO, VONTADE
//     FÉRREA (contra medo, encantamento, controle mental) — o vocabulário
//     condicional do QdV não tem "contra veneno" nem "contra medo". Um efeito
//     sem a condição daria o bônus contra tudo. Ficam como prosa na ficha, que
//     é onde uma regra que a máquina não sabe conferir pertence.
//
//   · MARCAR A PRESA (+2 contra o contrato) — a condição é um alvo declarado,
//     que o QdV não modela.
//
// Sobra o que é honesto automatizar: modificador permanente e incondicional, ou
// com uma condição que o QdV realmente expressa.

/**
 * `chave` é a habilidade que dispara o efeito (nome exato do compêndio).
 * `efeito` é o objeto no formato do QdV (ver normalizeEffect no model.js dele).
 */
export const efeitos = [
  {
    chave: "Fúria Selvagem",
    nota:
      "O caso que só o QdV resolve: a condição do sistema OD2 é por TIPO DE ARMA " +
      "(melee/ranged/slashing…), e não sabe dizer 'com os PV abaixo da metade'. " +
      "O QdV sabe: hp.isHalf.",
    efeito: {
      id: "stardragon-furia-selvagem",
      name: "Fúria Selvagem",
      origin: "Star Dragon — Wookiee",
      icon: "icons/creatures/abilities/mouth-teeth-rows-white.webp",
      description:
        "Com os pontos de vida abaixo da metade, causa +2 no dano corpo a corpo.",
      association: { type: "race_ability", name: "Fúria Selvagem" },
      duration: { type: "permanent" },
      modifiers: [{ key: "damage", mode: "add", value: "2" }],
      conditional: {
        enabled: true,
        trigger: "hpChange",
        flow: "while",
        left: "hp.isHalf",
        operator: "eq",
        right: "true",
      },
    },
  },
  {
    chave: "3. Mente Avançada",
    // As mutações do Mutante NÃO são itens na ficha: são escolhas gravadas em
    // system.variable_construction_selections, pela chave da opção. Testado na
    // ficha da mesa — a macro só olhava nomes de item e passava direto por ela.
    chaveVC: "03-mente-avancada",
    nota: "Mutação do molde Mutante. Bônus fixo, sem condição — cabe inteiro.",
    efeito: {
      id: "stardragon-mente-avancada",
      name: "Mente Avançada",
      origin: "Star Dragon — Mutante",
      icon: "icons/magic/control/browbeat-eyes-blue.webp",
      description: "O cérebro é mais desenvolvido que o normal: +2 em JPS.",
      association: { type: "race_ability", name: "3. Mente Avançada" },
      duration: { type: "permanent" },
      modifiers: [{ key: "jps", mode: "add", value: "2" }],
    },
  },
  {
    chave: "3. Mente Simplificada",
    chaveVC: "03-mente-simplificada",
    nota: "A degeneração espelhada. Entra pelo mesmo motivo — e uma penalidade esquecida é pior que um bônus esquecido.",
    efeito: {
      id: "stardragon-mente-simplificada",
      name: "Mente Simplificada",
      origin: "Star Dragon — Mutante",
      icon: "icons/magic/control/fear-fright-monster-grin-red.webp",
      description: "O cérebro é menos desenvolvido que o normal: −2 em JPS.",
      association: { type: "race_ability", name: "3. Mente Simplificada" },
      duration: { type: "permanent" },
      modifiers: [{ key: "jps", mode: "reduce", value: "2" }],
    },
  },
  {
    chave: "O Resol'nare",
    nota:
      "Condicional narrativa: vale ENQUANTO o código é cumprido, e quebrá-lo " +
      "suspende as habilidades da Senda. Por isso entra desligável, com gatilho " +
      "manual — o Mestre desliga quando o voto cai.",
    efeito: {
      id: "stardragon-resolnare",
      name: "O Resol'nare",
      origin: "Star Dragon — Senda Mandaloriana",
      icon: "icons/skills/social/diplomacy-handshake.webp",
      description:
        "Enquanto cumpre o código mandaloriano, +1 em JPS. Quebrá-lo suspende " +
        "todas as habilidades da Senda até uma reparação — desligue este efeito.",
      association: { type: "class_ability", name: "O Resol'nare" },
      duration: { type: "permanent" },
      modifiers: [{ key: "jps", mode: "add", value: "1" }],
    },
  },
  {
    chave: "Restrição — Mãos Grandes Demais",
    nota:
      "Penalidade fixa com arma pequena. O QdV não tem condicional de TAMANHO " +
      "de arma, então entra desligado: o jogador liga quando empunha uma.",
    efeito: {
      id: "stardragon-maos-grandes",
      name: "Mãos Grandes Demais",
      origin: "Star Dragon — Wookiee",
      icon: "icons/skills/melee/unarmed-punch-fist.webp",
      enabled: false,
      description:
        "Armas pequenas causam −1 no dano nas suas mãos. Ligue ao empunhar uma " +
        "— o QdV não sabe conferir o tamanho da arma sozinho.",
      association: { type: "race_ability", name: "Restrição — Mãos Grandes Demais" },
      duration: { type: "permanent" },
      modifiers: [{ key: "damage", mode: "reduce", value: "1" }],
    },
  },
];

/** Habilidades que NÃO devem virar efeito, e o porquê — a macro avisa. */
export const naoAutomatizar = {
  "Casca Peluda": "o sistema já aplica pelo campo natural_armor da raça — um efeito daria +1 duas vezes",
  "Garras e Escamas": "o sistema já aplica pelo campo natural_armor da raça — um efeito daria +1 duas vezes",
  "Dois Corações": "o bônus é contra veneno, doença e asfixia; o QdV não expressa essa condição",
  "Inabalável": "o bônus é contra medo e intimidação; o QdV não expressa essa condição",
  "Sangue-frio": "o bônus é contra medo, provocação e intimidação; o QdV não expressa essa condição",
  "Vontade Férrea": "o bônus é contra medo, encantamento e controle mental; o QdV não expressa essa condição",
  "Marcar a Presa": "o bônus vale só contra o alvo declarado como contrato",
  "Mudar de Guarda": "o −2 na CA é o preço de trocar de Forma por uma rodada, não um passivo",
  "Treinamento de Clã": "o +1 vale só com armas de haste, arremesso e blasters — o QdV não distingue o arsenal de clã",
};

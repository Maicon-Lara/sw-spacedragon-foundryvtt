// Macros do compêndio.
//
// Cada uma é UMA LINHA que chama a API do módulo. A lógica mora em
// stardragon-module/module/corrupcao.js, e não aqui, por um motivo prático: a
// macro que o jogador arrasta para a barra vira uma cópia dele, e cópias não
// recebem atualização. Chamando `game.stardragon.*`, atualizar o módulo
// atualiza a regra sem ninguém precisar re-arrastar nada.
//
// O `if` não é decoração: se o módulo estiver desligado, a macro copiada
// continua na barra do jogador e precisa dizer por que não funcionou.

import { efeitos, naoAutomatizar } from "./efeitos.mjs";

const guarda = (chamada) =>
  `if (!game.stardragon) {\n` +
  `  ui.notifications.error("O módulo Star Dragon está desligado — ligue-o em Gerenciar Módulos.");\n` +
  `} else {\n` +
  `  ${chamada}\n` +
  `}`;

export const macros = [
  {
    nome: "Trilha de Corrupção",
    img: "icons/magic/unholy/silhouette-robe-evil-power.webp",
    comando: guarda("game.stardragon.corrupcao();"),
  },
  {
    nome: "Corrupção — Nova cena",
    img: "icons/magic/time/hourglass-brown-orange.webp",
    comando: guarda("game.stardragon.novaCena();"),
  },
  {
    nome: "Corrupção — Novo dia",
    img: "icons/magic/time/sundial-orange-elm.webp",
    comando: guarda("game.stardragon.novoDia();"),
  },
  {
    nome: "Efeitos (QdV)",
    img: "icons/magic/control/energy-stream-link-blue.webp",
    // A lista viaja EMBUTIDA na macro, em JSON, e não como import: macro do
    // Foundry não tem módulo, e a cópia que o jogador arrasta precisa bastar.
    // Por isso ela é gerada aqui, da mesma fonte que a documentação lê.
    comando:
      `const QDV = "old-dragon-2-qualidade-de-vida";
` +
      `if (!game.modules.get(QDV)?.active) {
` +
      `  ui.notifications.error("Este atalho depende do módulo Old Dragon 2: Qualidade de Vida, que não está ativo.");
` +
      `} else {
` +
      `const CATALOGO = ${JSON.stringify(efeitos.map((e) => ({ chave: e.chave, chaveVC: e.chaveVC ?? null, efeito: e.efeito })))};
` +
      `const NAO = ${JSON.stringify(naoAutomatizar)};
` +
      `const a = canvas.tokens.controlled[0]?.actor ?? game.user.character;
` +
      `if (!a) { ui.notifications.warn("Selecione o token do personagem."); }
` +
      `else if (!a.isOwner) { ui.notifications.warn("Você não tem permissão sobre " + a.name + "."); }
` +
      `else {
` +
      `  const nomes = new Set(a.items.map(i => i.name));
` +
      `  // As mutacoes do Mutante nao sao itens: sao escolhas em
` +
      `  // variable_construction_selections, pela chave da opcao.
` +
      `  const escolhas = new Set(Object.values(a.system?.variable_construction_selections ?? {}).flat().map(x => x?.key).filter(Boolean));
` +
      `  const atuais = a.getFlag(QDV, "effects") ?? [];
` +
      `  const jaTem = new Set(atuais.map(e => e.id));
` +
      `  const novos = CATALOGO.filter(c => (nomes.has(c.chave) || (c.chaveVC && escolhas.has(c.chaveVC))) && !jaTem.has(c.efeito.id)).map(c => c.efeito);
` +
      `  const avisos = Object.entries(NAO).filter(([n]) => nomes.has(n));
` +
      `  if (novos.length) await a.setFlag(QDV, "effects", [...atuais, ...novos]);
` +
      `  const linhas = novos.length
` +
      `    ? "<p>Aplicados:</p><ul>" + novos.map(e => "<li><strong>" + e.name + "</strong>" + (e.enabled === false ? " <em>(desligado — ligue quando valer)</em>" : "") + "</li>").join("") + "</ul>"
` +
      `    : "<p>Nada a aplicar: o que cabia já está lá.</p>";
` +
      `  const naoCabe = avisos.length
` +
      `    ? "<hr><p><strong>Fica na prosa, de propósito:</strong></p><ul>" + avisos.map(([n, m]) => "<li><strong>" + n + "</strong> — " + m + "</li>").join("") + "</ul>"
` +
      `    : "";
` +
      `  ChatMessage.create({ content: '<div class="title">Efeitos do Star Dragon</div>' + linhas + naoCabe, speaker: ChatMessage.getSpeaker({ actor: a }) });
` +
      `}
}`,
  },
];

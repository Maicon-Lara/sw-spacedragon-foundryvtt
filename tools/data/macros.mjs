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
];

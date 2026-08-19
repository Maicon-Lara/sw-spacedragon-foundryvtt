/**
 * Star Dragon (Star Wars no OD2)
 *
 * O módulo é de conteúdo; este script existe por um motivo só: ligar e
 * desligar o tema visual das fichas.
 *
 * A marca é uma classe no <body>, não uma classe por janela. A primeira
 * versão usava `Hooks.on("renderActorSheet")` para marcar cada ficha, e o
 * gancho nunca disparou: o Foundry monta o nome do gancho a partir do nome
 * interno da classe, e a ficha do OD2 herda da camada de compatibilidade
 * (`foundry.appv1.sheets.ActorSheet`), cujo nome interno não é garantido.
 * Uma classe no <body> não depende de gancho de render nenhum — vale para
 * ficha de personagem, de item, de monstro e para o que o sistema criar
 * depois.
 *
 * Por que não estilizar `.olddragon2e.sheet` direto: isso repintaria a ficha
 * de qualquer mundo que instale o módulo, sem pedir licença. Com a opção
 * abaixo, quem não quiser desliga e o sistema volta a ser o que era.
 */

const ID = "stardragon";
const CLASSE = "stardragon-tema";

function aplicarTema(ligado) {
  document.body.classList.toggle(CLASSE, !!ligado);
}

Hooks.once("init", () => {
  game.settings.register(ID, "tema", {
    name: "Tema Star Wars nas fichas",
    hint:
      "Repinta as fichas do Old Dragon 2 com a paleta do módulo: azul-aço no " +
      "lugar do carmesim. Desligue para manter a aparência original do sistema.",
    scope: "world",
    config: true,
    type: Boolean,
    default: true,
    onChange: aplicarTema, // sem recarregar: a classe sai e o sistema volta
  });
});

Hooks.once("ready", () => {
  aplicarTema(game.settings.get(ID, "tema"));

  // Diagnóstico de uma linha: se o tema não aparecer, é esta linha que diz
  // onde parou, sem precisar colar nada no console.
  const cssCarregado = [...document.styleSheets].some((s) =>
    (s.href ?? "").includes("stardragon")
  );
  console.log(
    `${ID} | tema=${game.settings.get(ID, "tema")} ` +
      `css=${cssCarregado} body=${document.body.classList.contains(CLASSE)}`
  );
});

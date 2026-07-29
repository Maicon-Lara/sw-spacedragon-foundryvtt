/**
 * Star Wars — Space Dragon (OD2)
 *
 * O módulo é de conteúdo; este script existe por um motivo só: marcar as
 * janelas de ficha com a classe `swsd-tema`, que é o gancho do CSS do tema.
 *
 * Por que não estilizar `.olddragon2e.sheet.character` direto: isso repintaria
 * a ficha de qualquer mundo que instale o módulo, sem pedir licença. Com a
 * classe e a opção abaixo, quem não quiser o tema desliga e o sistema volta a
 * ficar exatamente como era.
 */

const ID = "sw-spacedragon";
const CLASSE = "swsd-tema";

/** Elemento raiz da janela, seja AppV1 (jQuery) ou AppV2 (HTMLElement). */
function raiz(app) {
  const el = app?.element;
  if (!el) return null;
  return el instanceof HTMLElement ? el : el[0] ?? null;
}

function aplicar(app) {
  if (!game.settings.get(ID, "tema")) return;
  raiz(app)?.classList.add(CLASSE);
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
    onChange: (ligado) => {
      // Aplica na hora, sem exigir recarregar o mundo.
      for (const app of Object.values(ui.windows)) {
        const el = raiz(app);
        if (el?.classList.contains("olddragon2e")) el.classList.toggle(CLASSE, ligado);
      }
    },
  });
});

Hooks.on("renderActorSheet", aplicar);
Hooks.on("renderItemSheet", aplicar);

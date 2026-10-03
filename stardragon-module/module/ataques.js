/**
 * Painel da aba Ataques — Star Dragon
 *
 * Dois cartões, injetados no topo da aba **Ataques** da ficha de personagem:
 *
 *   · ORDEM DE AÇÃO — a declaração da T7-2 do Space Dragon, feita pelo próprio
 *     personagem, na ficha dele, em vez de uma janela separada que o Mestre
 *     preenche por todo mundo.
 *   · PONTOS DE FORÇA — a reserva da casa: gastar um ponto rola 1d6.
 *
 * ── ONDE ISTO ENTRA, E POR QUE AQUI ────────────────────────────────────────
 *
 * Na aba Ataques, e não na barra lateral nem no fim do formulário. A ficha do
 * OD2 tem uma raiz <form> e várias <div class="tab">; pendurar o painel na
 * raiz o joga para o fim da página, abaixo da navegação, e é assim que um
 * cartão acaba flutuando solto no rodapé da ficha. O alvo certo é
 *
 *     div.tab[data-tab="attacks"]
 *
 * filtrando quem está dentro de <nav>, que é o *link* da aba e não o painel.
 * Mesmo alvo e mesmo filtro que o painel de Grandezas usa para `spells`.
 *
 * ── SOBRE NÃO MEXER NO RASTREADOR DE COMBATE ───────────────────────────────
 *
 * A ordem de ação sai no chat; o Combat Tracker do Foundry fica como está.
 * Reescrever a iniciativa de um sistema alheio quebraria todo módulo de combate
 * instalado, e o número da T7-2 muda a cada rodada conforme a ação declarada —
 * não é um valor que se guarda no combatente.
 *
 * ── SOBRE O submitOnChange DA FICHA ────────────────────────────────────────
 *
 * A ficha do OD2 salva ao menor `change` dentro do <form>. Os controles deste
 * painel vivem dentro desse <form> e disparariam um salvamento (e um re-render
 * no meio da digitação) a cada escolha. Por isso todo `change`/`input` daqui
 * tem a propagação interrompida: o painel não tem campo `name`, não é dado do
 * ator, e não tem nada que a ficha devesse salvar.
 */

const ID = "stardragon";
const MARCA = "stardragon-ataques";

/** Padrão do máximo de Pontos de Força quando a ficha ainda não tem o seu. */
const MAX_PADRAO = 5;

/**
 * Escape próprio: nome de arma é digitado pela mesa e vai para dentro de HTML.
 * `foundry.utils.escapeHTML` existiria, mas depender de um global aninhado
 * significa estourar se ele mudar de lugar — e o encadeamento opcional em
 * `foundry.utils.escapeHTML?.()` não protege contra `foundry.utils` ser
 * undefined, que foi exatamente como isto quebrou no módulo irmão.
 */
const escapa = (s) =>
  String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

/**
 * A escolha da Ordem de Ação sobrevive ao re-render.
 *
 * Gastar um Ponto de Força grava uma flag, a flag re-renderiza a ficha, e o
 * re-render redesenha este painel do zero. Sem esta memória, a arma escolhida
 * voltaria para a primeira da lista toda vez que alguém encostasse no outro
 * cartão. Chaveado por id de ator, e some quando o Foundry recarrega.
 */
const escolhido = new Map();

/* ── Ordem de Ação (T7-2) ──────────────────────────────────────────────────
 *
 * Três formas de obter o número, e só três:
 *
 *   · quem ataca rola o DADO DE DANO DA ARMA — o dado puro, sem o modificador
 *     de Força: ali o que conta é o peso do golpe, não a força de quem bate;
 *   · quem usa aparato ou poder usa o NÍVEL TECNOLÓGICO ou a GRANDEZA, que é
 *     número fixo e não se rola;
 *   · quem só se desloca usa 10 menos o modificador de Destreza.
 *
 * Age primeiro o MENOR resultado — o contrário da iniciativa do Old Dragon 2.
 */
const MODOS = {
  dado: {
    async valor(entrada) {
      const formula = entrada || "1d6";
      const roll = await new Roll(formula).evaluate();
      return { n: roll.total, como: `${formula} deu ${roll.total}`, roll };
    },
  },
  fixo: {
    async valor(entrada) {
      const n = Number(entrada) || 0;
      return { n, como: `NT ou Grandeza ${n} — não se rola`, roll: null };
    },
  },
  destreza: {
    async valor(entrada) {
      const mod = Number(entrada) || 0;
      return { n: 10 - mod, como: `10 − ${mod} de Destreza`, roll: null };
    },
  },
};

/**
 * As opções do seletor, montadas a partir das armas que ESTÃO na ficha.
 *
 * Uma linha por arma, com o dado dela já preenchido: é menos digitação e menos
 * erro do que um campo em branco pedindo "1d8". Arma equipada vem primeiro.
 * Ficha sem arma nenhuma ainda recebe a opção genérica, com o campo editável.
 */
function opcoes(ator) {
  const armas = ator.items
    .filter((i) => i.type === "weapon" && String(i.system?.damage ?? "").trim())
    .sort((a, b) => Number(b.system?.is_equipped ?? 0) - Number(a.system?.is_equipped ?? 0));

  const linhas = armas.map((a) => ({
    chave: `arma:${a.id}`,
    modo: "dado",
    campo: String(a.system.damage).trim(),
    rotulo: `Atacar com ${a.name} — ${String(a.system.damage).trim()}`,
  }));

  linhas.push({
    chave: "ataque",
    modo: "dado",
    campo: armas[0] ? String(armas[0].system.damage).trim() : "1d6",
    rotulo: "Atacar — role o dado de dano da arma",
  });
  linhas.push({
    chave: "aparato",
    modo: "fixo",
    campo: "1",
    rotulo: "Aparato ou poder da Força — NT ou Grandeza",
  });
  linhas.push({
    chave: "movimento",
    modo: "destreza",
    campo: String(Number(ator.system?.mod_destreza ?? 0)),
    rotulo: "Movimentar ou outra ação — 10 − Destreza",
  });

  return linhas;
}

function cartaoOrdem(ator) {
  const lista = opcoes(ator);
  const atual = escolhido.get(ator.id);
  const sel = lista.find((l) => l.chave === atual) ?? lista[0];

  const html = lista
    .map(
      (l) =>
        `<option value="${escapa(l.chave)}" data-modo="${l.modo}" data-campo="${escapa(l.campo)}"` +
        `${l.chave === sel.chave ? " selected" : ""}>${escapa(l.rotulo)}</option>`
    )
    .join("");

  return (
    `<section class="sd-cartao sd-ordem">` +
    `<div class="sd-titulo">Ordem de Ação</div>` +
    `<div class="sd-sub">menor age primeiro</div>` +
    `<select class="sd-modo">${html}</select>` +
    `<div class="sd-linha">` +
    `<input class="sd-valor" type="text" value="${escapa(sel.campo)}" ` +
    `title="O dado de dano, o NT/Grandeza ou o modificador de Destreza. Dá para corrigir à mão.">` +
    `<button type="button" class="sd-declarar">declarar</button>` +
    `</div></section>`
  );
}

/* ── Pontos de Força ───────────────────────────────────────────────────────
 *
 * Regra da casa — não está no livro nem no conteúdo dos compêndios, que para a
 * Força usam Foco Diário por Grandeza. É reserva à parte, e por isso mora numa
 * flag do módulo e não em `system`: não inventa campo na ficha do OD2, sai
 * junto se o módulo for desligado e não disputa nada com o Foco.
 *
 * O máximo é por personagem (o padrão vem da configuração do mundo), porque
 * nada no cenário diz de onde ele sairia — quem decide é a mesa.
 */
function reserva(ator) {
  const f = ator.getFlag(ID, "forca") ?? {};
  const padrao = Number(game.settings?.get?.(ID, "forcaMax") ?? MAX_PADRAO) || MAX_PADRAO;
  const max = Math.max(0, Number.isFinite(Number(f.max)) ? Number(f.max) : padrao);
  const valor = Math.max(0, Math.min(max, Number.isFinite(Number(f.valor)) ? Number(f.valor) : max));
  return { valor, max };
}

function cartaoForca(ator, dono) {
  const { valor, max } = reserva(ator);

  // Bolinhas até um limite: acima disso a fila quebraria a largura da aba, e o
  // número ao lado do título já diz tudo.
  const bolinhas =
    max <= 12
      ? Array.from({ length: max }, (_, i) => `<span class="sd-pip${i < valor ? " cheio" : ""}"></span>`).join("")
      : "";

  const trava = dono ? "" : " disabled";

  return (
    `<section class="sd-cartao sd-forca">` +
    `<div class="sd-titulo">Pontos de Força <span class="sd-conta">${valor} / ` +
    `<button type="button" class="sd-max"${trava} title="Clique para mudar o máximo deste personagem.">${max}</button></span></div>` +
    `<div class="sd-sub">1d6</div>` +
    (bolinhas ? `<div class="sd-pips">${bolinhas}</div>` : "") +
    `<div class="sd-linha">` +
    `<button type="button" class="sd-gastar"${trava} title="Gasta 1 ponto e rola 1d6 no chat.">gastar</button>` +
    `<button type="button" class="sd-mais"${trava} title="Devolve 1 ponto.">+1</button>` +
    `<button type="button" class="sd-recarregar"${trava} title="Recarrega a reserva cheia.">⟳</button>` +
    `</div></section>`
  );
}

/* ── Ações ─────────────────────────────────────────────────────────────── */

async function declarar(ator, raiz) {
  const select = raiz.querySelector(".sd-modo");
  const campo = raiz.querySelector(".sd-valor");
  const op = select?.selectedOptions?.[0];
  if (!op) return;

  const modo = MODOS[op.dataset.modo] ?? MODOS.dado;
  const { n, como, roll } = await modo.valor(String(campo?.value ?? "").trim());

  await ChatMessage.create({
    content:
      `<div class="title">Ordem de Ação</div>` +
      `<div class="stardragon-chat">` +
      `<p class="sd-acao">${escapa(op.textContent)}</p>` +
      `<p class="sd-resultado"><strong>${n}</strong></p>` +
      `<p class="sd-conta">${escapa(como)}</p>` +
      `<p class="sd-nota"><em>Age primeiro o menor resultado, pela T7-2. ` +
      `A rodada dura o maior resultado da mesa × 2 segundos.</em></p>` +
      `</div>`,
    speaker: ChatMessage.getSpeaker({ actor: ator }),
    ...(roll ? { rolls: [roll], sound: CONFIG.sounds.dice } : {}),
  });
}

async function gastarForca(ator) {
  const { valor, max } = reserva(ator);
  if (valor <= 0) {
    ui.notifications.warn("Sem Pontos de Força para gastar.");
    return;
  }
  const roll = await new Roll("1d6").evaluate();
  await ator.setFlag(ID, "forca", { valor: valor - 1, max });
  await ChatMessage.create({
    content:
      `<div class="title">Ponto de Força</div>` +
      `<div class="stardragon-chat">` +
      `<p class="sd-resultado"><strong>${roll.total}</strong></p>` +
      `<p class="sd-conta">1d6 — restam ${valor - 1} de ${max}</p>` +
      `</div>`,
    speaker: ChatMessage.getSpeaker({ actor: ator }),
    rolls: [roll],
    sound: CONFIG.sounds.dice,
  });
}

async function mudarMaximo(ator) {
  const { valor, max } = reserva(ator);
  const V2 = foundry.applications?.api?.DialogV2;
  const conteudo =
    `<p>Quantos Pontos de Força este personagem tem com a reserva cheia?</p>` +
    `<input type="number" name="max" min="0" max="20" step="1" value="${max}" autofocus>`;

  const novo = V2
    ? await V2.wait({
        window: { title: "Pontos de Força — máximo" },
        content: conteudo,
        buttons: [
          {
            action: "ok",
            label: "Gravar",
            default: true,
            callback: (_e, b) => Number(new FormDataExtended(b.form).object.max),
          },
          { action: "nao", label: "Cancelar", callback: () => null },
        ],
        rejectClose: false,
      })
    : await new Promise((ok) => {
        new Dialog({
          title: "Pontos de Força — máximo",
          content: `<form>${conteudo}</form>`,
          buttons: {
            ok: {
              label: "Gravar",
              callback: (h) => ok(Number((h[0] ?? h).querySelector("[name=max]")?.value)),
            },
            nao: { label: "Cancelar", callback: () => ok(null) },
          },
          default: "ok",
          close: () => ok(null),
        }).render(true);
      });

  if (novo === null || !Number.isFinite(novo)) return;
  const limpo = Math.max(0, Math.min(20, Math.round(novo)));
  await ator.setFlag(ID, "forca", { valor: Math.min(valor, limpo), max: limpo });
}

/* ── Desenho e ganchos ─────────────────────────────────────────────────── */

function montaPainel(ator, dono) {
  return `<div class="${MARCA}">` + cartaoOrdem(ator) + cartaoForca(ator, dono) + `</div>`;
}

function liga(raiz, ator, dono) {
  // A ficha salva ao menor `change` dentro do <form>. Nada daqui é dado do
  // ator, então nada daqui precisa chegar lá.
  for (const ev of ["change", "input"]) {
    raiz.addEventListener(ev, (e) => e.stopPropagation());
  }

  raiz.querySelector(".sd-modo")?.addEventListener("change", (e) => {
    const op = e.currentTarget.selectedOptions?.[0];
    if (!op) return;
    escolhido.set(ator.id, op.value);
    const campo = raiz.querySelector(".sd-valor");
    if (campo) campo.value = op.dataset.campo ?? "";
  });

  raiz.querySelector(".sd-declarar")?.addEventListener("click", () => declarar(ator, raiz));

  if (!dono) return;
  raiz.querySelector(".sd-gastar")?.addEventListener("click", () => gastarForca(ator));
  raiz.querySelector(".sd-mais")?.addEventListener("click", async () => {
    const { valor, max } = reserva(ator);
    if (valor >= max) return;
    await ator.setFlag(ID, "forca", { valor: valor + 1, max });
  });
  raiz.querySelector(".sd-recarregar")?.addEventListener("click", async () => {
    const { max } = reserva(ator);
    await ator.setFlag(ID, "forca", { valor: max, max });
  });
  raiz.querySelector(".sd-max")?.addEventListener("click", () => mudarMaximo(ator));
}

export function ligarPainelDeAtaques() {
  const injeta = (app, elemento) => {
    try {
      const html = elemento instanceof HTMLElement ? elemento : elemento?.[0];
      const ator = app?.actor ?? app?.document;
      if (!html || ator?.type !== "character") return;

      // O PAINEL da aba, não o link dela: o <a data-tab="attacks"> mora dentro
      // de um <nav> e casa com o MESMO seletor. Sem este filtro, o cartão vai
      // parar dentro da barra de abas, fora do conteúdo da ficha.
      const aba = [...html.querySelectorAll('[data-tab="attacks"]')].find((n) => !n.closest("nav"));
      if (!aba) return;

      aba.querySelector(`.${MARCA}`)?.remove();
      aba.insertAdjacentHTML("afterbegin", montaPainel(ator, ator.isOwner));
      const raiz = aba.querySelector(`.${MARCA}`);
      if (raiz) liga(raiz, ator, ator.isOwner);
    } catch (e) {
      // Nunca quebrar a ficha do sistema por causa de um painel do módulo.
      console.warn(`${ID} | painel da aba Ataques não pôde ser desenhado`, e);
    }
  };

  // Os dois disparam neste sistema (medido em 31/08). Usamos o específico e
  // caímos no genérico se ele sumir numa versão futura — sem desenhar duas vezes.
  Hooks.on("renderOD2CharacterSheet", injeta);
  Hooks.on("renderActorSheet", (app, el) => {
    if (app?.constructor?.name !== "OD2CharacterSheet") injeta(app, el);
  });
}

/**
 * A Trilha de Corrupção — Star Dragon
 *
 * A Corrupção é a única engrenagem do cenário que o sistema não tem como
 * saber que existe: não é PV, não é Foco, não é uma JP. Hoje ela vive na
 * memória da mesa, e é justamente o tipo de coisa que a memória perde — a
 * trilha sobe de 1 em 1 ao longo de sessões inteiras e cobra no 10.
 *
 * POR QUE UM DIÁLOGO E NÃO UM CAMPO NA FICHA: `renderActorSheet` não dispara
 * neste sistema (a ficha do OD2 herda da camada de compatibilidade
 * `foundry.appv1.sheets.ActorSheet`, cujo nome interno não é garantido, e o
 * Foundry monta o nome do gancho a partir dele). O tema do módulo já apanhou
 * disso — ver o comentário em stardragon.js. Um diálogo próprio não depende de
 * gancho de render nenhum.
 *
 * ONDE FICA O DADO: flags do ator, em `flags.stardragon`. Não toca em
 * `system.*` — o módulo é de conteúdo e não deve inventar campo no sistema de
 * outra pessoa. Desinstalar o módulo deixa as flags para trás, inertes.
 */

const ID = "stardragon";

// ── A trilha, como está escrita na habilidade "Corrupção — Queda e Redenção" ──
const FAIXAS = [
  { ate: 2, nome: "Sereno", efeito: "Sem penalidade." },
  {
    ate: 5,
    nome: "Marcado",
    efeito:
      "Olhos começam a amarelar sob esforço. Testes sociais com não-corrompidos " +
      "ficam <strong>Difíceis</strong> quando a Força é usada à vista.",
  },
  {
    ate: 8,
    nome: "Tomado",
    efeito:
      "Surtos de fúria: o Mestre pode assumir uma ação sua em cena de estresse extremo.",
  },
  {
    ate: 9,
    nome: "À beira",
    efeito:
      "Todas as penalidades de Tomado — e a Sombra passa a <strong>oferecer sozinha</strong>. " +
      "Um passo do fim.",
  },
  { ate: 10, nome: "O fim da trilha", efeito: "Queda (Luz e neutro) ou Consumido (Sombra)." },
];

const faixaDe = (n) => FAIXAS.find((f) => n <= f.ate) ?? FAIXAS[0];

// Os três negócios da Tentação, com o preço que a habilidade cobra.
const TENTACAO = [
  {
    chave: "insistir",
    nome: "Insistir",
    custo: 1,
    desc: "Rerrola a jogada falha e fica com o <strong>segundo resultado, seja ele qual for</strong>.",
    sussurro: "A Força atende ao chamado, mas não obedece a você.",
  },
  {
    chave: "arrancar",
    nome: "Arrancar",
    custo: 2,
    desc: "Rerrola e fica com o <strong>melhor dos dois</strong>.",
    sussurro: "Não é mais pedir: é tomar. A certeza é o que a Sombra vende mais caro.",
  },
  {
    chave: "sentenciar",
    nome: "Sentenciar",
    custo: 1,
    desc:
      "Um ataque que <strong>já acertou</strong> vira <strong>crítico</strong>, ou um poder que " +
      "<strong>já passou</strong> tem dano, duração ou número de alvos <strong>dobrado</strong>.",
    sussurro: "Você recebe o que pediu. A conta vem depois.",
  },
];

const MAX_DIA = 3; // "uma vez por cena, no máximo três vezes por dia de jogo"

// ── Estado ──────────────────────────────────────────────────────────────────
const leia = (ator) => ({
  corrupcao: Number(ator.getFlag(ID, "corrupcao") ?? 0),
  caminho: ator.getFlag(ID, "caminho") ?? "neutro",
  usouNaCena: !!ator.getFlag(ID, "tentacaoCena"),
  usosNoDia: Number(ator.getFlag(ID, "tentacaoDia") ?? 0),
});

const trava = (n) => Math.max(0, Math.min(10, n));

// ── Cartões de chat, no formato nativo do OD2 ───────────────────────────────
// As classes existem em src/styles/chat.less do sistema: div.title em cima,
// p.result embaixo, strong.success/failure para o veredito.
function card(ator, titulo, corpo, { publico = true } = {}) {
  const dados = {
    content: `<div class="title">${titulo}</div>${corpo}`,
    speaker: ChatMessage.getSpeaker({ actor: ator }),
  };
  if (!publico) dados.whisper = ChatMessage.getWhisperRecipients("GM");
  return ChatMessage.create(dados);
}

// Barra 0–10 com a posição marcada. Sem imagem: é texto, funciona em qualquer tema.
function barra(n) {
  const casas = Array.from({ length: 11 }, (_, i) => {
    if (i === n) return `<strong>[${i}]</strong>`;
    return i < n ? "▮" : "▯";
  }).join(" ");
  return `<p class="result barra">${casas}</p>`;
}

function painelEstado(ator) {
  const e = leia(ator);
  const f = faixaDe(e.corrupcao);
  const caminho = { luz: "Luz", sombra: "Sombra", neutro: "sem Caminho declarado" }[e.caminho];
  // O wrapper existe porque o sistema estiliza .title/.result só dentro de
  // #chat: no diálogo elas saíam sem formatação. O CSS do módulo tem as
  // regras equivalentes escopadas em .stardragon-trilha.
  return (
    `<div class="stardragon-trilha">` +
    `<p><strong>${ator.name}</strong> — Caminho da ${caminho}</p>` +
    barra(e.corrupcao) +
    `<p class="result faixa"><strong>${e.corrupcao} · ${f.nome}</strong></p>` +
    `<p>${f.efeito}</p>` +
    `<p><em>Tentação: ${e.usouNaCena ? "já usada nesta cena" : "livre nesta cena"} · ` +
    `${e.usosNoDia}/${MAX_DIA} no dia.</em></p>` +
    `</div>`
  );
}

// ── Mover a trilha ──────────────────────────────────────────────────────────
// Devolve o que ACONTECEU, para quem chamou decidir o que anunciar.
async function mover(ator, delta, motivo) {
  const antes = leia(ator);
  const bruto = antes.corrupcao + delta;
  let depois = trava(bruto);
  let evento = null;

  // A Queda e o Consumido são as duas leituras do 10, e dependem do Caminho.
  if (depois >= 10) {
    if (antes.caminho === "sombra") {
      evento = "consumido";
      // NÃO mexe na ficha: o personagem sair das mãos do jogador é decisão de
      // mesa, não de script. O cartão avisa; quem executa é o Mestre.
    } else {
      evento = "queda";
      // Esta parte é determinística e está escrita na regra: troca definitiva
      // para o Caminho da Sombra, e a Corrupção volta para 7.
      depois = 7;
      await ator.setFlag(ID, "caminho", "sombra");
    }
  }

  await ator.setFlag(ID, "corrupcao", depois);
  return { antes: antes.corrupcao, depois, evento, motivo, delta };
}

async function anunciar(ator, r) {
  const sinal = r.delta > 0 ? `+${r.delta}` : `${r.delta}`;
  let corpo =
    `<p>${r.motivo}</p>` +
    `<p class="result"><strong class="${r.delta > 0 ? "failure" : "success"}">${sinal} Corrupção</strong></p>` +
    barra(r.depois);

  if (r.evento === "queda") {
    corpo +=
      `<p class="result"><strong class="failure">A Queda</strong></p>` +
      `<p>Surto sombrio, <strong>troca definitiva para o Caminho da Sombra</strong> e uma marca ` +
      `física. A Corrupção volta para <strong>7</strong>: a Sombra deixou de ser um estranho ` +
      `dentro dele e virou casa.</p>`;
  } else if (r.evento === "consumido") {
    corpo +=
      `<p class="result"><strong class="failure">Consumido</strong></p>` +
      `<p>Não sobra pessoa, só apetite. O personagem <strong>sai das mãos do jogador e vira ` +
      `NPC do Mestre</strong> — um Lorde Sith puro, um monstro que os antigos companheiros um ` +
      `dia terão de enfrentar.</p><p><em>O módulo não executa isto: a ficha está intacta e a ` +
      `passagem é sua.</em></p>`;
  } else {
    const f = faixaDe(r.depois);
    corpo += `<p class="result">${r.depois} · <strong>${f.nome}</strong></p><p>${f.efeito}</p>`;
  }
  return card(ator, "Trilha de Corrupção", corpo);
}

// ── Diálogo ─────────────────────────────────────────────────────────────────
// DialogV2 com queda para o Dialog antigo: o módulo declara compatibilidade
// 13–14 e não custa nada sobreviver a um mundo mais velho.
async function pergunta({ titulo, conteudo, botoes }) {
  const V2 = foundry.applications?.api?.DialogV2;
  if (V2) {
    return V2.wait({
      window: { title: titulo },
      content: conteudo,
      buttons: botoes.map((b) => ({ action: b.chave, label: b.rotulo, callback: () => b.chave })),
      rejectClose: false,
    });
  }
  return new Promise((ok) => {
    const b = {};
    for (const x of botoes) b[x.chave] = { label: x.rotulo, callback: () => ok(x.chave) };
    new Dialog({ title: titulo, content: conteudo, buttons: b, close: () => ok(null) }).render(true);
  });
}

const MOTIVOS_SOBE = [
  { chave: "poder", rotulo: "Poder da Sombra", texto: "Usou um poder da lista Sombra." },
  { chave: "crueldade", rotulo: "Crueldade", texto: "Usou um poder para crueldade deliberada." },
  { chave: "odio", rotulo: "Ódio", texto: "Cedeu ao ódio numa cena-chave." },
];
const MOTIVOS_DESCE = [
  { chave: "compaixao", rotulo: "Compaixão", texto: "Ato definidor de compaixão ou sacrifício." },
  { chave: "meditacao", rotulo: "Meditação", texto: "Meditação prolongada sob orientação." },
  { chave: "recusa", rotulo: "Recusou o fácil", texto: "Recusou o caminho fácil quando ele custa caro." },
];

async function menuMotivo(ator, lista, delta, titulo) {
  const escolha = await pergunta({
    titulo,
    conteudo: painelEstado(ator),
    botoes: lista.map((m) => ({ chave: m.chave, rotulo: m.rotulo })),
  });
  if (!escolha) return;
  const m = lista.find((x) => x.chave === escolha);
  await anunciar(ator, await mover(ator, delta, m.texto));
}

async function menuTentacao(ator) {
  const e = leia(ator);
  if (e.usouNaCena)
    return ui.notifications.warn("A Tentação já foi usada nesta cena. É uma vez por cena.");
  if (e.usosNoDia >= MAX_DIA)
    return ui.notifications.warn(`Já foram ${MAX_DIA} usos hoje — é o teto do dia.`);

  const naBeira = e.corrupcao >= 9;
  const aviso = naBeira
    ? `<p class="result"><strong class="failure">A última oferta</strong></p>` +
      `<p>Aceitar leva a <strong>10</strong> — e 10 é a ` +
      `<strong>${e.caminho === "sombra" ? "perda da pessoa" : "Queda"}</strong>. Você recebe o que ` +
      `pediu <strong>na hora</strong>; a conta se resolve ao fim da cena.</p>`
    : "";

  const escolha = await pergunta({
    titulo: "A Tentação — a Sombra oferece",
    conteudo:
      painelEstado(ator) +
      aviso +
      `<hr>` +
      TENTACAO.map(
        (t) => `<p><strong>${t.nome} (+${t.custo}):</strong> ${t.desc}</p>`
      ).join("") +
      `<p><em>Recusar nunca exige rolagem e nunca tem penalidade. Uma Corrupção que se pega sem ` +
      `escolher não é tentação, é imposto.</em></p>`,
    botoes: [
      ...TENTACAO.map((t) => ({ chave: t.chave, rotulo: `${t.nome} (+${t.custo})` })),
      { chave: "recusar", rotulo: "Recusar" },
    ],
  });

  if (!escolha || escolha === "recusar") {
    if (escolha === "recusar")
      await card(
        ator,
        "A Tentação",
        `<p class="result"><strong class="success">Recusou</strong></p>` +
          `<p>A oferta fica na mesa. Sem rolagem, sem penalidade.</p>`
      );
    return;
  }

  const t = TENTACAO.find((x) => x.chave === escolha);
  await ator.setFlag(ID, "tentacaoCena", true);
  await ator.setFlag(ID, "tentacaoDia", e.usosNoDia + 1);
  const r = await mover(ator, t.custo, `<strong>${t.nome}</strong> — ${t.desc}`);
  await anunciar(ator, r);
  await card(
    ator,
    "A Sombra sussurra",
    `<p><em>“${t.sussurro}”</em></p>` +
      `<p class="result"><em>${e.usosNoDia + 1}/${MAX_DIA} no dia</em></p>`
  );
}

async function menuCaminho(ator) {
  const escolha = await pergunta({
    titulo: "O Caminho",
    conteudo:
      painelEstado(ator) +
      `<hr><p><strong>Luz</strong> — serenidade, defesa, cura, previdência. Universal + Luz.</p>` +
      `<p><strong>Sombra</strong> — paixão, domínio, medo, destruição. Universal + Sombra.</p>` +
      `<p><strong>Neutro</strong> — só a lista Universal, e escolhe mais tarde.</p>` +
      `<p><em>Cruzar de lista marca +1 de Corrupção a cada uso.</em></p>`,
    botoes: [
      { chave: "luz", rotulo: "Luz" },
      { chave: "sombra", rotulo: "Sombra" },
      { chave: "neutro", rotulo: "Neutro" },
    ],
  });
  if (!escolha) return;
  await ator.setFlag(ID, "caminho", escolha);
  ui.notifications.info(`${ator.name}: Caminho da ${escolha}.`);
}

// ── Ponto de entrada ────────────────────────────────────────────────────────
function atorDe(alvo) {
  const a =
    alvo ??
    canvas?.tokens?.controlled?.[0]?.actor ??
    game.user?.character ??
    null;
  if (!a) {
    ui.notifications.warn(
      "Selecione o token do personagem (ou defina um personagem no seu usuário)."
    );
    return null;
  }
  if (!a.isOwner) {
    ui.notifications.warn(`Você não tem permissão sobre ${a.name}.`);
    return null;
  }
  return a;
}

export async function abrirCorrupcao(alvo) {
  const ator = atorDe(alvo);
  if (!ator) return;

  const botoes = [
    { chave: "tentacao", rotulo: "A Tentação" },
    { chave: "sobe", rotulo: "Ganhar (+1)" },
    { chave: "desce", rotulo: "Perder (−1)" },
    { chave: "caminho", rotulo: "Caminho" },
  ];
  if (game.user.isGM) botoes.push({ chave: "cena", rotulo: "Nova cena" });

  const escolha = await pergunta({
    titulo: `Trilha de Corrupção — ${ator.name}`,
    conteudo:
      painelEstado(ator) +
      `<hr><p><em>A Redenção exige reduzir a Corrupção a <strong>menos de 3</strong> e um ` +
      `sacrifício definidor.</em></p>`,
    botoes,
  });

  switch (escolha) {
    case "tentacao":
      return menuTentacao(ator);
    case "sobe":
      return menuMotivo(ator, MOTIVOS_SOBE, +1, "Ganhar Corrupção");
    case "desce":
      return menuMotivo(ator, MOTIVOS_DESCE, -1, "Perder Corrupção");
    case "caminho":
      return menuCaminho(ator);
    case "cena":
      return novaCena();
    default:
      return;
  }
}

/** Libera a Tentação de todo mundo: o limite de uma vez por CENA. */
export async function novaCena() {
  let n = 0;
  for (const a of game.actors) {
    if (a.getFlag(ID, "tentacaoCena")) {
      await a.unsetFlag(ID, "tentacaoCena");
      n++;
    }
  }
  ui.notifications.info(`Nova cena: a Tentação voltou a ficar livre para ${n} personagem(ns).`);
}

/** Zera cena e dia: o teto de três vezes por DIA de jogo. */
export async function novoDia() {
  let n = 0;
  for (const a of game.actors) {
    const tinha = a.getFlag(ID, "tentacaoCena") || a.getFlag(ID, "tentacaoDia");
    if (!tinha) continue;
    await a.unsetFlag(ID, "tentacaoCena");
    await a.unsetFlag(ID, "tentacaoDia");
    n++;
  }
  ui.notifications.info(`Novo dia: cena e teto diário zerados para ${n} personagem(ns).`);
}

/**
 * Só para o harness de tools/_teste-corrupcao.mjs.
 *
 * O diálogo e os cartões dependem do Foundry e não dá para testar fora dele.
 * A REGRA dá — e é onde um erro custa caro, porque a trilha sobe ao longo de
 * sessões inteiras e só cobra no 10. Estes são os internos que a regra usa.
 */
export const __teste = { mover, faixaDe, trava, FAIXAS, TENTACAO, MAX_DIA };

/** Uma linha para o console dizer onde parou, sem colar nada. */
export function diagnostico() {
  const sensiveis = game.actors.filter((a) => a.getFlag(ID, "corrupcao") != null);
  console.log(
    `${ID} | corrupção: ${sensiveis.length} ator(es) com trilha · ` +
      `DialogV2=${!!foundry.applications?.api?.DialogV2}`,
    sensiveis.map((a) => `${a.name}=${a.getFlag(ID, "corrupcao")}`)
  );
  return sensiveis.length;
}

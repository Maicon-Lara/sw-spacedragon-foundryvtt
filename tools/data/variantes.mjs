// Variantes de classe prontas para arrastar na ficha.
//
// POR QUE ISTO EXISTE: o sistema OD2 NÃO deixa soltar uma `class_ability`
// direto no personagem — OD2CharacterSheet.js bloqueia com "Habilidades de
// classe não podem ser adicionadas diretamente ao personagem. Adicione-as à
// classe do personagem." O caminho nativo é abrir o item da CLASSE que já está
// na ficha e soltar a habilidade dentro dele (OD2ItemSheet._onDropItem), o que
// funciona mas é pouco descobrível.
//
// Então, para as escolhas que TODO personagem daquela trilha precisa fazer
// (a Forma do Guardião, a Senda Mandaloriana), este arquivo monta variantes de
// classe com a habilidade já embutida: o jogador arrasta a classe certa e
// acabou. As habilidades avulsas continuam no compêndio (avulsas.mjs) para
// quem quiser trocar de Forma depois ou pegar a técnica de uma segunda Forma.
//
// Nada aqui é conteúdo novo: é recombinação do que já está em classes.mjs e
// avulsas.mjs, para não haver duas fontes de verdade do mesmo texto.

import { classes, T } from "./classes.mjs";
import { classAbilitiesBase } from "./avulsas.mjs";

const FORMAS = classAbilitiesBase.filter((a) => a.folder === "Formas de Sabre (Guardião)");
const NUCLEO = classAbilitiesBase.filter((a) => a.folder === "Senda Mandaloriana");

const acha = (nome) => {
  const c = classes.find((x) => x.nome === nome);
  if (!c) throw new Error(`Classe não encontrada em classes.mjs: ${nome}`);
  return c;
};

// "Shii-Cho (I) — a forma fundamental" -> "Shii-Cho"
// "Juyo / Vaapad (VII) — a forma feroz" -> "Juyo / Vaapad"
function nomeCurtoDaForma(nome) {
  return nome.split("(")[0].trim();
}

// ── Guardião: uma variante por Forma de Sabre ────────────────────────────────
// A classe-base "Sensível à Força — Guardião" CONTINUA existindo: nos níveis
// 1 e 2 o Guardião ainda não escolheu Forma (ela vem no 3º nível).
const guardiao = acha("Sensível à Força — Guardião");

const guardioes = FORMAS.map((forma) => {
  const curto = nomeCurtoDaForma(forma.nome);
  return {
    ...guardiao,
    nome: `Sensível à Força — Guardião (${curto})`,
    flavor: `<p>O Jedi/Sith de sabre, na Forma <strong>${curto}</strong>. <em>Especialização de Sensível à Força.</em></p>`,
    descricao:
      guardiao.descricao +
      `<p><strong>Esta variante já traz a Forma ${curto} embutida</strong> — arraste-a para a ficha e a Forma vem junto, com as evoluções de 3º, 6º e 10º nível. Se quiser trocar de Forma depois, use a versão genérica da classe e adicione a Forma pelo compêndio <em>Formas de Sabre</em>.</p>`,
    // As habilidades do Guardião + a Forma escolhida, no lugar do ponteiro
    // genérico "Formas de Sabre".
    habilidades: [
      ...guardiao.habilidades.filter((h) => h.nome !== "Formas de Sabre"),
      {
        ...forma,
        folder: undefined,
        // Nota curta e específica: nesta variante a Forma É a Mestra.
        desc:
          forma.desc +
          "<hr><p><strong>Esta é a sua Forma Mestra</strong> — progride inteira, nos degraus 3º, 6º e 10º.</p>" +
          "<p>A partir do <strong>10º nível</strong> você pode aprender uma <strong>segunda Forma</strong> (que vai só até o degrau do 6º) e, no <strong>15º</strong>, uma <strong>terceira</strong> (só até o 3º). Elas ficam no compêndio <em>Formas de Sabre</em> e são adicionadas ao item desta classe na ficha. Trocar de Forma em combate consome sua ação da rodada e deixa você com −2 na CA até o próximo turno; no 15º, a <em>Guarda Fluida</em> troca isso por 1 de Foco.</p>",
      },
    ],
  };
});

// ── Senda Mandaloriana: uma variante por classe-base ─────────────────────────
// A Senda substitui a ESPECIALIZAÇÃO da classe (por isso usa a coluna XP
// Especial) e mantém as habilidades da classe-base — mas não intactas.
//
// Cada ficha tem NOME PRÓPRIO (Guerreiro de Clã, Caçador Solitário, Armeiro,
// Herege de Armadura) porque é assim que o compêndio passou a nomeá-las: são
// quatro classes irmãs, não quatro notas de rodapé de uma trilha.
//
// As travas são MECÂNICAS, não avisos em prosa: uma habilidade "que para de
// progredir" tem os degraus level3/level6/level10 REMOVIDOS aqui, e uma que a
// Senda entrega ao clã some da lista. Enquanto isso era só texto na descrição,
// a ficha do Foundry continuava exibindo a escada inteira e contradizendo a
// própria classe.
const SENDAS = [
  {
    base: "Veterano",
    nome: "Guerreiro de Clã",
    subtitulo: "o Veterano na Senda",
    sabor:
      "<p>O encaixe mais direto dos quatro: o chassi marcial já usa toda armadura e toda arma, então o pacote de clã só soma.</p>",
    // Congelar Pilotar junto com Desarmar cobra duas meias-habilidades sem
    // tirar a nave dele (Din e Boba pilotam; só não são os melhores pilotos da
    // mesa) e empurra a tripulação a ter um piloto de verdade.
    congela: {
      "Pilotar": "<p><em>Não progride nesta Senda: fica em <strong>1-2 em 1d6</strong> para sempre. O clã ensinou a voar com a mochila, não a conduzir naves.</em></p>",
      "Desarmar e Subjugar": "<p><em>Não progride nesta Senda: fica em <strong>1-2 em 1d6</strong>. A doutrina de clã ensina outra coisa.</em></p>",
      "Dano Crítico": "<p><em>Não escala nesta Senda: fica na faixa <strong>19–20</strong> e nunca chega ao ×3.</em></p>",
    },
    troca:
      "<strong>Pilotar</strong>, <strong>Desarmar e Subjugar</strong> e o <strong>Dano Crítico</strong> param de progredir, e o Resol&rsquo;nare pede <strong>cinco</strong> votos em vez de três. Mantém os <em>Ataques Múltiplos</em> inteiros.",
    // Cinco votos em vez de três, e um deles com nome e prazo.
    substitui: {
      "O Resol'nare":
        "<p>Você adota o código mandaloriano, resumido em <strong>cinco votos</strong> criados com o Mestre — <strong>dois a mais</strong> que as outras Sendas. Enquanto o cumpre, <strong>+1 em JPS</strong>. Quebrá-lo <strong>suspende todas as habilidades da Senda</strong> até uma reparação.</p>" +
        "<p>Um dos cinco é sempre um <strong>dever de clã ativo</strong>, com nome e prazo: uma dívida de sangue a cobrar, um enjeitado para criar, um Sabre Sombrio para recuperar, um clã disperso para reunir. O Mestre é <strong>obrigado</strong> a cobrá-lo em cena ao menos uma vez por arco.</p>" +
        "<p><em>É o guerreiro que carrega o Credo na frente do corpo — e o Credo cobra na frente.</em></p>",
    },
    nota:
      "<p>&#9888; <strong>Correção da casa — esta Senda não custava nada.</strong> A tabela de trocas admitia em voz alta: <em>&ldquo;o pacote de clã inteiro, sem atrito nenhum&rdquo;</em>. As outras três pagam preço real — o Operativo congela o Ataque Furtivo, o Técnico perde o Desconto Tecnológico, o Sensível joga com o Foco de um nível abaixo. Só o Veterano levava cinco habilidades novas por meia habilidade antiga, o que tornava as três trilhas oficiais dele mecanicamente sem sentido.</p>" +
      "<p><strong>O Resol&rsquo;nare do guerreiro também pesa mais.</strong> Onde as outras Sendas pedem três votos, a dele pede <strong>cinco</strong> — e um deles é sempre um <strong>dever de clã ativo</strong>, com nome e prazo: uma dívida de sangue a cobrar, um enjeitado para criar, um Sabre Sombrio para recuperar, um clã disperso para reunir. O Mestre é <strong>obrigado</strong> a cobrá-lo em cena ao menos uma vez por arco.</p>",
  },
  {
    base: "Operativo",
    nome: "Caçador Solitário",
    subtitulo: "o Operativo na Senda",
    sabor:
      "<p>O renegado sem lar — a leitura mais &ldquo;Boba Fett&rdquo; das quatro, e a que casa com o Caçador de Recompensas sem ser ele.</p>",
    congela: {
      "Ataque Furtivo": "<p><em>Não progride nesta Senda: o dano fica em <strong>×2</strong>. O guerreiro de honra não apunhala pelas costas.</em></p>",
      "Percepção": "<p><em>Não progride nesta Senda: fica em <strong>1-2 em 1d6</strong>. A armadura faz barulho, e o visor tático vê no seu lugar.</em></p>",
    },
    // Rastrear entra no lugar de Escalar e herda os pontos dele: quem tem
    // mochila de propulsão não sobe parede na unha.
    trocaTalento: ["escalar", "rastrear"],
    troca:
      "o <strong>Ataque Furtivo</strong> e a <strong>Percepção</strong> param de progredir. Em troca, veste <strong>Beskar</strong> e usa <strong>jetpack</strong>, que a classe não tocaria, e troca <em>Escalar</em> por <em>Rastrear</em> na lista de talentos.",
  },
  {
    base: "Técnico",
    nome: "Armeiro",
    subtitulo: "o Técnico na Senda",
    sabor:
      "<p>O Armeiro de um clã é, em regra, um Técnico — quem forja a Beskar, mantém o jetpack e devolve o capacete consertado.</p>",
    // O Armeiro FORJA, não sabota: um disruptor positrônico na mão dele é peça
    // de bancada, não arma.
    remove: ["Desconto Tecnológico", "Desativar Droides"],
    troca:
      "perde o <strong>Desconto Tecnológico</strong> — o dever de clã rouba o tempo de barganha — e <strong>Desativar Droides</strong>: o Armeiro forja, não sabota.",
    nota:
      "<p>&#11088; <strong>Repare no que isso significa.</strong> As três trilhas normais do Técnico abrem mão de <strong>Operar e Consertar Máquinas</strong>. A Senda Mandaloriana <strong>não</strong> — ela é a <strong>única especialização do Técnico que mantém a habilidade-assinatura da classe</strong>, e portanto o único Técnico especializado que ainda pilota e remenda tecnologia alheia. <em>(Desligar droides, não — isso ele entregou ao clã.)</em> Se a sua mesa sentia falta de um Técnico &ldquo;completo&rdquo; com trilha, é este.</p>",
  },
  {
    base: "Sensível à Força",
    nome: "Herege de Armadura",
    subtitulo: "o Sensível na Senda",
    sabor:
      "<p>A mistura lendária: o <strong>Sangue de Beskar</strong> protege contra o próprio sabre, e o resultado é o Mandaloriano que encara um Jedi sem temer a lâmina.</p>",
    // O Eco da Senda depende de ter um Domínio, e a Senda Mandaloriana ocupa a
    // vaga da especialização: sem Senda, sem Domínio, sem Eco.
    remove: ["Eco da Senda"],
    extra: [
      {
        nome: "O aço cobra duas vezes",
        level: 1,
        desc:
          "<p>Vestir armadura e servir a um clã custa a meditação que a Força profunda exige. Duas travas, e as duas valem a carreira inteira:</p>" +
          "<ul>" +
          "<li>Seu <strong>Foco Diário é contado como o de um Sensível de −1 nível</strong>.</li>" +
          "<li>Seu <strong>Teto de Grandeza é a 6ª</strong> — o mesmo do Guardião, e pelo mesmo motivo: quem veste aço não chega ao fundo da Força.</li>" +
          "</ul>" +
          "<p>Em troca, o clã lhe ensina <strong>uma Forma de Sabre</strong>, que progride até o degrau do 6º nível. É só ela: <em>Mudar de Guarda</em> é patrimônio do Guardião, e você não tem para onde trocar.</p>" +
          "<p><em>E, sem Domínio, não há <strong>Eco da Senda</strong>: o Foco gasto nunca volta e nenhum poder de 1ª Grandeza fica gratuito no 15º. O clã lhe ensinou uma lâmina, não um atalho da Força. <strong>A Tentação, sim, ele tem</strong> — a Corrupção pertence ao Caminho, não à especialização.</em></p>",
      },
    ],
    troca:
      "o <strong>Foco cai um nível</strong> e o <strong>Teto de Grandeza para na 6ª</strong>. Em troca, o clã lhe ensina <strong>uma Forma de Sabre</strong>, que nenhum Sensível sem Senda tem, e a Beskar que o protege da lâmina inimiga.",
  },
];

// Remove os degraus de progressão de uma habilidade e explica a trava no lugar.
function congelada(hab, nota) {
  const { level3, level6, level10, ...resto } = hab;
  return { ...resto, desc: hab.desc + nota };
}

const sendas = SENDAS.map((cfg) => {
  const c = acha(cfg.base);
  let habilidades = c.habilidades
    .filter((h) => !(cfg.remove || []).includes(h.nome))
    .map((h) => (cfg.congela && cfg.congela[h.nome] ? congelada(h, cfg.congela[h.nome]) : h));

  if (cfg.trocaTalento) {
    const [sai, entra] = cfg.trocaTalento;
    habilidades = habilidades.map((h) =>
      h.rogue_talents
        ? {
            ...h,
            rogue_talents: h.rogue_talents.map((t) => (t.key === sai ? T[entra] : t)),
            desc:
              h.desc +
              `<p><em><strong>${T[entra].name}</strong> entra no lugar de <strong>${T[sai].name}</strong> e <strong>herda os pontos</strong> dele — quem tem mochila de propulsão não sobe parede na unha.</em></p>`,
          }
        : h
    );
  }

  return {
    ...c,
    // O prefixo é o que faz aninhaPastas() agrupar as quatro fichas dentro da
    // pasta "Senda Mandaloriana" (que já existe, pelas habilidades avulsas),
    // em vez de espalhá-las pela raiz do compêndio. Mesma convenção de
    // "Veterano — Mercenário" e "Sensível à Força — Guardião".
    nome: `Senda Mandaloriana — ${cfg.nome}`,
    coluna: "especial", // a Senda ocupa o lugar da especialização
    flavor: `<p>${cfg.subtitulo[0].toUpperCase()}${cfg.subtitulo.slice(1)}. <em>Senda Mandaloriana.</em></p>`,
    descricao:
      `<p><strong>A Senda Mandaloriana substitui a especialização</strong> desta classe: o personagem entra no Credo de um clã e passa a evoluir pela coluna <strong>XP Especial</strong>.</p>` +
      cfg.sabor +
      `<p><strong>O que este ${cfg.base} troca:</strong> ${cfg.troca}</p>` +
      (cfg.nota || "") +
      `<p><em>Mandaloriano não é uma espécie, é uma cultura</em> — qualquer espécie pode trilhar a Senda. A Origem <strong>Filho de Mandalore</strong>, no compêndio de Espécies, é a porta de entrada (opcional).</p>` +
      c.descricao,
    habilidades: [
      ...habilidades,
      ...(cfg.extra || []),
      ...NUCLEO.map((h) => {
        const troca = cfg.substitui && cfg.substitui[h.nome];
        return { ...h, folder: undefined, ...(troca ? { desc: troca } : {}) };
      }),
    ],
  };
});

export const variantes = [...guardioes, ...sendas];

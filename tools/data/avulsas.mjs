// Habilidades AVULSAS — blocos que não pertencem a uma única classe e que o
// jogador arrasta para a ficha conforme a escolha do personagem:
//
//  · as 7 Formas de Sabre — o Guardião escolhe UMA no 3º nível
//    (fonte: SW-SD-Sabre-e-Cristais.md);
//  · o Núcleo Mandaloriano — arquétipo cross-class que substitui a
//    especialização de qualquer classe (fonte: SW-SD-Senda-Mandaloriana.md);
//  · a Origem "Filho de Mandalore" — escolhida no 1º nível por cima da espécie
//    e da classe, é habilidade de ESPÉCIE (vai no pack de espécies).

// Nota anexada a toda habilidade avulsa: o sistema OD2 não deixa soltar
// class_ability direto no personagem, então o jogador precisa saber o caminho.
const COMO_ADICIONAR =
  "<hr><p><strong>Como adicionar na ficha:</strong> o sistema não aceita soltar uma habilidade de classe direto no personagem. Abra o item da <strong>classe que já está na ficha</strong> (aba Classe, clique no nome) e arraste esta habilidade <strong>para dentro dessa janela</strong> — ela é sincronizada para o personagem automaticamente.</p>" +
  "<p><em>Atalho:</em> o compêndio de Classes já traz variantes prontas (ex.: <em>Guardião (Soresu)</em>, <em>Veterano — Senda Mandaloriana</em>) com estas habilidades embutidas — basta arrastar a variante e pular este passo.</p>";

const FORMAS = "Formas de Sabre (Guardião)";
const SENDA = "Senda Mandaloriana";

// Nota anexada às 7 Formas por causa da regra "Mudar de Guarda" (criação da
// casa — ver SW-SD-Sabre-e-Cristais.md § Mudar de Guarda). Uma Forma agora pode
// entrar na ficha como Forma MESTRA (progride inteira) ou como Forma
// secundária (degrau limitado), e o Guardião pode alternar entre elas em
// combate. Fica aqui porque vale igual para as sete.
const NOTA_MUDAR_GUARDA =
  "<hr><p><strong>Forma Mestra ou Forma secundária?</strong> Esta Forma pode ocupar dois lugares na ficha de um Guardião:</p><ul>" +
  "<li><strong>Forma Mestra</strong> (escolhida no <strong>3º nível</strong>) — progride inteira: <strong>[3] → [6] → [10]</strong>.</li>" +
  "<li><strong>Segunda Forma</strong> (aprendida no <strong>10º nível</strong>) — vai <strong>só até o degrau [6]</strong>. Ignore o texto do 10º.</li>" +
  "<li><strong>Terceira Forma</strong> (aprendida no <strong>15º nível</strong>) — vai <strong>só até o degrau [3]</strong>. Ignore os textos do 6º e do 10º.</li>" +
  "</ul><p><strong>Só a Forma Mestra chega ao degrau [10].</strong> As outras são respostas guardadas na manga, não um segundo domínio.</p>" +
  "<p><strong>Mudar de Guarda:</strong> a partir do 10º nível, trocar para outra Forma que você conheça consome <strong>toda a sua ação da rodada</strong> (você ainda se move), é <strong>declarada em voz alta</strong> e deixa você <strong>−2 na CA</strong> até o seu próximo turno. <strong>Uma troca por rodada.</strong> A Forma em que você <em>entra</em> no combate é declarada de graça. No <strong>15º nível</strong> (<em>Guarda Fluida</em>) a troca passa a custar <strong>1 de Foco</strong> em vez do turno, sem o −2 na CA.</p>" +
  "<p><em>Um Sensível que não é Guardião — o Vidente, ou quem trilhou a Senda Mandaloriana e recebeu uma Forma do clã — conhece uma Forma só e não tem para onde trocar.</em></p>";

const AVULSAS = [
  // ── As 7 Formas de Sabre ──────────────────────────────────────────────────
  {
    folder: FORMAS, nome: "Shii-Cho (I) — a forma fundamental", level: 3,
    desc: "<p>Versátil, feita para enfrentar vários oponentes de uma vez.</p><p><strong>Sequência Aberta:</strong> ao derrubar ou errar um inimigo, transfere o ataque a <strong>outro adjacente</strong>; e ao acertar pode <strong>desarmar</strong> (a manobra do Veterano) sem gastar o ataque.</p>",
    level6: "<p><strong>Domínio do Enxame:</strong> cercado por 2 ou mais inimigos, ganha <strong>+2 na CA</strong> e um <strong>ataque extra</strong> por rodada contra um flanqueador.</p>",
    level10: "<p><strong>Mestre Shii-Cho:</strong> distribui seus ataques livremente entre inimigos adjacentes e <strong>nunca sofre penalidade por estar cercado</strong>.</p>",
  },
  {
    folder: FORMAS, nome: "Makashi (II) — o duelo elegante", level: 3,
    desc: "<p>Precisão e economia de movimento no combate um-a-um.</p><p><strong>Precisão do Duelista:</strong> marque um oponente como duelo — <strong>+1 no ataque e no dano</strong> contra ele; e uma vez por rodada pode <strong>aparar</strong> uma lâmina ou sabre (teste de ataque) para <strong>reduzir o dano à metade</strong>.</p>",
    level6: "<p><strong>Riposte:</strong> quando o alvo do duelo <strong>erra</strong> você, ganha um <strong>ataque de resposta</strong> imediato.</p>",
    level10: "<p><strong>Mestre Makashi:</strong> no duelo, seus críticos saem em <strong>1-2 no d20</strong> e o oponente tem desvantagem para anular seus golpes com a Força.</p>",
  },
  {
    folder: FORMAS, nome: "Soresu (III) — defesa pura", level: 3,
    desc: "<p>A muralha que sobrevive a qualquer tiroteio.</p><p><strong>Postura Defensiva:</strong> <strong>+2 na CA</strong> contra ataques à distância e você <strong>deflete disparos de blaster</strong> sem gastar ação; gastando a ação, deflete <strong>todos</strong> os disparos contra você e aliados adjacentes.</p>",
    level6: "<p><strong>Devolver ao Remetente:</strong> ao defletir um disparo, pode <strong>redirecioná-lo ao atirador</strong> com um ataque seu.</p>",
    level10: "<p><strong>Mestre Soresu:</strong> ataques à distância só o acertam num <strong>crítico</strong> — a paciência vira parede intransponível.</p>",
  },
  {
    folder: FORMAS, nome: "Ataru (IV) — acrobática", level: 3,
    desc: "<p>Saltos, giros e ataques em movimento.</p><p><strong>Ímpeto Acrobático:</strong> se você <strong>se moveu</strong> antes de atacar, <strong>+1 no ataque e no dano</strong>; combina com o <em>Salto da Força</em> — atacar de cima torna o primeiro golpe <strong>Fácil</strong>.</p>",
    level6: "<p><strong>Turbilhão:</strong> gastando 1 de Foco, um <strong>ataque extra</strong> enquanto se reposiciona (precisa terminar em outra casa).</p>",
    level10: "<p><strong>Mestre Ataru:</strong> em terreno aberto, <strong>dois ataques extras</strong> por rodada em movimento — mas fica vulnerável (<strong>−2 na CA</strong>) se for imobilizado.</p>",
  },
  {
    folder: FORMAS, nome: "Djem So (V) — força e contra-ataque", level: 3,
    desc: "<p>Devolve com juros a agressão do inimigo.</p><p><strong>Contra-Ataque:</strong> quando um inimigo adjacente <strong>erra</strong> você em corpo a corpo, ganha um <strong>ataque de resposta</strong> imediato; e pode trocar precisão (<strong>−2 no ataque</strong>) por <strong>+1d8 de dano</strong>.</p>",
    level6: "<p><strong>Fúria Controlada:</strong> com metade dos pontos de vida ou menos, ganha <strong>+2 no ataque e no dano</strong>.</p>",
    level10: "<p><strong>Mestre Djem So:</strong> todo ataque inimigo que você aparar ou que errar abre uma resposta — devolve a agressão em dobro.</p>",
  },
  {
    folder: FORMAS, nome: "Niman (VI) — o equilíbrio sabre e Força", level: 3,
    desc: "<p>O gish: mistura lâmina e poderes numa dança só.</p><p><strong>Fluxo Equilibrado:</strong> na rodada em que usa um poder da Força, ainda faz um <strong>ataque de sabre</strong> (ou vice-versa) sem penalidade; e empunha a lâmina com a Força para atacar a curta distância ou desarmar telecineticamente.</p>",
    level6: "<p><strong>Golpe Carregado:</strong> ao acertar, gasta <strong>1 de Foco</strong> para somar ao golpe o efeito de um poder de <strong>1ª Grandeza</strong>.</p>",
    level10: "<p><strong>Mestre Niman:</strong> uma vez por rodada, <strong>um poder da Força e um ataque de sabre</strong> contam como uma só ação.</p>",
  },
  {
    folder: FORMAS, nome: "Juyo / Vaapad (VII) — a forma feroz", level: 3,
    desc: "<p>Canaliza a agressão — e beira a Sombra.</p><p><strong>Fúria Canalizada:</strong> <strong>+1 no ataque e no dano</strong>, mas usá-la movido pela raiva arrisca <strong>+1 de Corrupção</strong> por combate (a critério do Mestre); e inimigos têm desvantagem para aparar ou anular seus golpes.</p>",
    level6: "<p><strong>Sede de Batalha:</strong> ao <strong>derrubar</strong> um inimigo, ganha um <strong>ataque extra</strong> imediato.</p>",
    level10: "<p><strong>Mestre Vaapad:</strong> <strong>+1 no dano para cada inimigo que o atacou</strong> na rodada — mas manter a Forma exige domínio, ou a Sombra cobra (Corrupção).</p>",
  },

  // ── Núcleo Mandaloriano (substitui a especialização da classe) ────────────
  {
    folder: SENDA, nome: "A Senda Mandaloriana — como funciona", level: 1,
    desc: "<p>A Senda <strong>substitui a especialização normal</strong> da classe (esse é o custo principal, igual para todos) e o personagem passa a evoluir pela coluna <strong>XP Especial</strong>. Por cima disso, cada classe faz um sacrifício equivalente:</p><ul>" +
      "<li><strong>Veterano:</strong> <em>Desarmar e Subjugar</em> param de progredir; mantém <em>Ataques Múltiplos</em> e <em>Pilotar</em>.</li>" +
      "<li><strong>Operativo:</strong> o <em>Ataque Furtivo</em> para de progredir (o guerreiro de honra não apunhala pelas costas); em troca, o clã lhe ensina <strong>Rastrear</strong>.</li>" +
      "<li><strong>Técnico:</strong> perde o <em>Desconto Tecnológico</em>; mantém aparatos e feitos — o <strong>Armeiro</strong> de um clã é, em regra, um Técnico.</li>" +
      "<li><strong>Sensível à Força:</strong> seu Foco da Força é calculado como o de um Sensível de <strong>−1 nível</strong>; em troca, o clã lhe ensina <strong>uma Forma de Sabre</strong> (até a técnica do 6º nível).</li>" +
      "</ul><p><strong>Papéis (sabor, opcional):</strong> Guerreiro de Clã (tropa leal), Caçador Solitário (renegado sem lar) ou Portador da Herança (guardião de relíquias, como o Sabre Sombrio).</p>",
  },
  {
    folder: SENDA, nome: "O Resol'nare", level: 1,
    desc: "<p>Adota o código mandaloriano, resumido em <strong>ao menos 3 votos</strong> criados com o Mestre. Enquanto o cumpre, <strong>+1 em JPS</strong>. Quebrá-lo <strong>suspende todas as habilidades da Senda</strong> até uma reparação.</p>",
  },
  {
    folder: SENDA, nome: "Treinamento de Clã", level: 1,
    desc: "<p>Domina o arsenal Mandaloriano: <strong>+1 no dano</strong> com armas de haste, de arremesso e blasters, e usa livremente jetpack e capacete tático.</p>",
  },
  {
    folder: SENDA, nome: "Sangue de Beskar", level: 3,
    desc: "<p>Ao vestir Armadura Beskar (ou pesada de clã), a Carga cai uma categoria e <strong>sabres de luz deixam de ignorar seu bônus de CA</strong> enquanto a usar.</p><p><em>É por isso que a mistura Sensível à Força + Beskar é lendária: o guerreiro que encara um Jedi sem temer a lâmina.</em></p>",
  },
  {
    folder: SENDA, nome: "Voo de Combate", level: 6,
    desc: "<p>Usa a Mochila de Propulsão em combate: o primeiro golpe da rodada vindo de cima é <strong>Fácil</strong>, ou você se reposiciona verticalmente sem gastar movimento extra.</p>",
  },
  {
    folder: SENDA, nome: "Lenda do Clã", level: 10, usos_dia: 1,
    desc: "<p>Você virou um nome que ecoa pela galáxia — um exército de um homem só. <strong>Uma vez por combate</strong>, desencadeia o <strong>arsenal completo do Beskar'gam</strong> (whistling birds, foguetes de pulso e lança-chamas ao mesmo tempo) num <strong>ataque em área</strong> contra todos os inimigos a curta distância: <strong>5d6 de dano</strong>, com <strong>JPD</strong> reduzindo à metade.</p><p>Além disso, o peso do seu nome faz tropas comuns <strong>testarem Moral</strong> ao entrar em combate contra você, e sua <strong>Reputação</strong> entre Mandalorianos e Caçadores é <strong>1-5 em 1d6</strong>.</p>",
  },
];

// Origem cultural — vai no pack de ESPÉCIES, porque é escolhida por cima da
// espécie e da classe, e está disponível a qualquer uma das duas.
export const origensAvulsas = [
  {
    folder: "Origens",
    nome: "Filho de Mandalore",
    desc: "<p><strong>Mandaloriano não é uma espécie, é uma cultura</strong> — há Mandalorianos humanos, Twi'lek, Rodianos e até um raro Sensível à Força. Esta Origem é escolhida na criação do personagem, por cima da espécie e da classe, e está disponível a <strong>qualquer</strong> espécie e classe.</p><ul>" +
      "<li><strong>Criado na Armadura:</strong> usa a Lança-Vibro Mandaloriana, a Mochila de Propulsão (jetpack) e a armadura de clã <strong>sem penalidade</strong>, mesmo que a classe normalmente não permitisse.</li>" +
      "<li><strong>Sangue de Clã:</strong> +1 em testes de reação com Mandalorianos e caçadores que reconheçam sua herança.</li>" +
      "<li><strong>Mando'a:</strong> fala o idioma Mandaloriano além dos idiomas iniciais.</li>" +
      "</ul><p>A Origem é leve e <strong>não substitui habilidades de classe</strong>. É a porta de entrada para a <em>Senda Mandaloriana</em> — mas não é obrigatória, e um Filho de Mandalore pode nunca se converter formalmente.</p>",
  },
];

// Versão CRUA, sem as notas de uso. É o que as variantes de classe embutem:
// quem arrasta "Guardião (Soresu)" já usou o atalho, então a instrução de
// "como adicionar manualmente" e a nota de Forma secundária só fariam ruído
// na ficha dele.
export const classAbilitiesBase = AVULSAS;

export const classAbilitiesAvulsas = AVULSAS.map((a) => ({
  ...a,
  desc:
    (a.desc || "") +
    (a.folder === FORMAS ? NOTA_MUDAR_GUARDA : "") +
    COMO_ADICIONAR,
}));

// Classes de "Star Dragon" — transcritas de SW-SD-Classes.md e
// SW-SD-Forca-Sensitivo.md.
//
// Modelagem: as 4 classes-base e as 13 especializações são todas itens do tipo
// nativo "class" (é como o OD2 oficial trata Bárbaro/Paladino/Arqueiro). A
// classe-base usa a coluna de XP normal; a especialização, a coluna XP Especial.
// Habilidades que evoluem por nível usam os campos level3/level6/level10.

import { progressao, NT, tabelaNT, tabelaGrandezas } from "./progressoes.mjs";

// ── Blocos reutilizados ──────────────────────────────────────────────────────

const REPUTACAO_TEXTO =
  "<p>A partir do 11º nível o personagem já é um nome conhecido no seu meio. Sempre que <strong>invocar o próprio nome</strong> para obter algo do mundo — ser recebido por um governador, conseguir crédito num estaleiro, ser reconhecido por um contato, fazer um oficial imperial fechar os olhos —, role <strong>1d6</strong> contra a Reputação: sucesso significa que a fama dele chegou ali antes dele.</p>" +
  "<p>A chance começa em <strong>1 em 1d6 no 11º nível</strong> e sobe <strong>1 a cada nível</strong>, chegando a <strong>1-5 em 1d6 no 15º</strong>.</p>";

function reputacao(sabor) {
  return {
    nome: "Reputação",
    level: 11,
    desc: REPUTACAO_TEXTO + (sabor ? `<p><em>${sabor}</em></p>` : ""),
  };
}

const APARATOS_NOTA =
  "<p><strong>Aparatos tecnológicos</strong> são os \"itens mágicos\" desta galáxia. <em>Ofensivos</em> (armas especiais, bombas, redes de choque): só o Técnico — e, por exceção, o Caçador de Recompensas. <em>Defensivos</em> (escudos pessoais, cintos, braceletes): Técnico e Veterano. <em>Utilitários</em> (visores, medpacs, jetpacks, scanners): todos.</p>";

// ── Técnico: o NT e o kit de partida ────────────────────────────────────────
//
// O que o nível dá ao Técnico é ALCANCE (o NT), não inventário. Os três
// aparatos são um kit de partida, dado uma vez no 1º nível.
//
// Isto substituiu a regra de "Vagas de bancada" (nível + 2, aparato ocupando
// vagas iguais ao NT), que esteve no cofre por algumas horas em 30/08 e saiu:
// criava uma economia paralela à dos Créditos. Ver a nota em progressoes.mjs
// sobre por que a curva de NT também deixou de ser "NT = nível".
const NT_NOTA =
  "<p><strong>O Nível Tecnológico</strong> é o equivalente ao <em>círculo</em> de magia mais alto " +
  "de um conjurador: o teto do que você consegue <strong>construir</strong>. Não há teto para o " +
  "que você consegue <strong>usar</strong> — um Técnico de 2º nível opera um Teletransportador " +
  "achado num destroço sem problema nenhum, só não fabrica um.</p>" +
  "<p>A curva sobe <strong>um degrau por nível, com uma pausa a cada três</strong> (2º, 5º, 8º, " +
  "11º e 14º), e chega ao <strong>NT 10 no 15º</strong>.</p>" +
  tabelaNT() +
  "<p class='nota-casa'><em>É a coluna do livro, restaurada. A T3-1 do Space Dragon dá ao " +
  "Cientista um NT a cada dois níveis, alcançando o NT 10 no 19º de 20. Uma versão anterior deste " +
  "cenário usava &ldquo;NT = seu nível de classe&rdquo;, que chegava ao 10 no 10º de 15 — quase o " +
  "dobro da velocidade do original, e punha um Técnico de 3º nível construindo uma Mochila de " +
  "Propulsão de 2.500 CR com uma renda inicial de 350.</em></p>" +
  "<p>&#11088; <strong>Você começa o jogo com três aparatos de NT 1 prontos, e eles não custam " +
  "Créditos.</strong> Só isso, e só no 1º nível: a bancada, o tempo e as peças ficaram no passado " +
  "do personagem. Um Técnico de 1º nível não é alguém que <em>poderá</em> construir coisas — é " +
  "alguém que <strong>já construiu</strong>. Daí em diante ele constrói e compra como todo mundo, " +
  "com os Créditos e o Desconto Tecnológico.</p>" +
  "<p><em>Não há aparato de graça por nível: o que o nível dá é <strong>NT</strong>, e o resto é " +
  "orçamento.</em></p>";

// ── Sensível: quantos poderes ele conhece ───────────────────────────────────
// Regra do cofre (SW-SD-Forca-Sensitivo.md): em cada Grandeza o personagem
// conhece o número da tabela MAIS UM. A regra antiga — "começa com dois poderes
// de 1ª" — é esta mesma regra lida na primeira linha, e por isso saiu do texto:
// era um caso particular apresentado como regra própria.
const PODERES_CONHECIDOS_NOTA =
  "<p>&#128214; <strong>Quantos poderes você conhece: o número da tabela, + 1 — em cada " +
  "Grandeza.</strong> Olhe a linha do seu nível: em cada Grandeza que tiver um número, você " +
  "conhece <strong>aquele número de poderes, mais um</strong>. Não há nada para anotar entre um " +
  "nível e outro — a mesma tabela que dá o Foco dá a lista.</p>" +
  tabelaGrandezas() +
  "<p>É por isso que você começa com <strong>dois poderes de 1ª Grandeza</strong>: a regra de " +
  "criação sempre foi esta regra, lida na primeira linha. E <strong>ao abrir uma Grandeza " +
  "nova</strong> você já entra nela sabendo <strong>dois</strong> — é o <code>+1</code> fazendo o " +
  "serviço, e é o que impede a situação absurda de ter Foco de 2ª Grandeza e nenhum poder de 2ª " +
  "para gastar nele.</p>" +
  "<p>&#9881; <strong>Quem lê a tabela em outra linha lê a linha inteira.</strong> As Sendas que " +
  "deslocam o seu nível para efeito de Foco deslocam junto os <strong>poderes conhecidos</strong>. " +
  "O <strong>Consular</strong> (<em>Mente Superior</em>, +2 níveis) não ganha só mais Foco: ganha " +
  "<strong>mais lista</strong>. O <strong>Mandaloriano</strong> Sensível (−1 nível) conhece " +
  "<strong>menos</strong> poderes, e não só conjura menos vezes. Um <strong>teto de Grandeza</strong> " +
  "(Guardião 6ª, Vidente 8ª) corta as Grandezas acima dele <strong>nas duas colunas</strong>: sem " +
  "Foco e sem lista.</p>";

// ── As três regras de Foco que a tabela não diz ─────────────────────────────
// Vêm do guia SD-OD2 p. 27 e nunca tinham sido transcritas para o módulo.
// A terceira é a que mais pega quem vem do d20, onde slots convertem.
export const FOCO_NOTA =
  "<p><strong>Usando o Foco — as três regras que a tabela não diz</strong></p><ul>" +
  "<li><strong>Declarou, gastou.</strong> O Foco sai no instante em que você declara o poder, " +
  "<strong>funcionando ou não</strong>. Um <em>Empurrão</em> que o alvo resiste custou o mesmo que " +
  "um que derrubou.</li>" +
  "<li><strong>Volta com 8 horas de descanso.</strong> O Foco Diário <strong>zera e " +
  "reabastece</strong> — não por dia de calendário, e não aos poucos. Sem as 8 h, você entra na " +
  "próxima cena com o que sobrou.</li>" +
  "<li><strong>Cada Grandeza é uma reserva fechada.</strong> O Foco de 2ª <strong>não paga</strong> " +
  "um poder de 1ª, e o de 1ª não &ldquo;sobe&rdquo; para lançar um de 2ª. Não existe conversão em " +
  "nenhuma das duas direções — quem vem do d20 costuma supor que existe. Um Sensível de 3º nível " +
  "com 1ª=2 e 2ª=1 tem <strong>três usos</strong>, e o de 2ª só serve para poder de 2ª.</li>" +
  "</ul>";

const NOTA_SPEC =
  "<p><em>Especialização escolhida no 1º nível (padrão OD2). Evolui pela coluna <strong>XP Especial</strong> da tabela.</em></p><p class='nota-casa'><em>Variante: mesas que queiram preservar o espírito original do Space Dragon podem adiar a escolha para o 3º nível.</em></p>";

// Regra geral dos Seguidores (SW-SD-Classes.md § Seguidores). Várias habilidades
// falam em "seu número máximo de seguidores"; é aqui que esse número é definido.
const SEGUIDORES_NOTA =
  "<p><strong>Seguidores.</strong> Onde uma habilidade falar em \"seu número máximo de seguidores\", vale: <strong>Número Máximo de Seguidores = 1 + modificador de Carisma</strong> (mínimo <strong>1</strong>). Carisma 9-12 → 1 seguidor · 13-14 → 2 · 15-16 → 3 · 17-18 → 4 · 19-20 → 5. São companheiros leais <strong>por vínculo</strong>, não contratados — subalternos e mercenários pagos entram pelo limite de contratação de ajudantes do OD2 (LB1, p. 78) e contam à parte.</p>";

// Alinhamento (SW-SD-Classes.md § Alinhamento — livre em todas as classes).
// A amarração por especialização — o antigo Leal/Neutro/Rebelde do Space
// Dragon — foi REMOVIDA em ago/2026, e com ela o campo `restricao_alinhamentos`
// de todas as especializações mundanas. O Sensível à Força já era livre; agora
// todo mundo é.
const ALINHAMENTO_NOTA =
  "<p><strong>Alinhamento — livre em todas as classes.</strong> <strong>Nenhuma especialização deste cenário exige alinhamento.</strong> Escolha Ordeiro, Neutro ou Caótico pelo personagem que você quer jogar, não pela trilha: existe Emissário caótico, Assassino ordeiro e Contrabandista que cumpre a palavra dada.</p>" +
  "<p>O alinhamento continua na ficha e continua importando — guia a conduta, orienta reações de PNJ e é o que o Mestre cobra quando você age contra a própria natureza. O que ele <strong>não</strong> faz é fechar portas na criação.</p>" +
  "<p class='nota-casa'><em>Correção da casa. O Space Dragon prendia cada especialização a uma Afiliação, e este cenário carregava isso. Três motivos para cortar: <strong>(1)</strong> produzia personagens que a ficção contradiz — o Caçador de Recompensas era obrigatoriamente caótico, mas Boba Fett cumpre contrato à risca e Din Djarin segue um código religioso; <strong>(2)</strong> fechava espécies inteiras — cruzando a trava de alinhamento da espécie com a da trilha, um Rodiano só podia seguir três das dez trilhas mundanas; <strong>(3)</strong> a diferenciação das trilhas nunca veio do alinhamento, vem do kit de habilidades. Se a sua mesa quiser a amarração de volta, basta declarar que vale.</em></p>";

// Consequência de usar equipamento fora da faixa da classe. Antes isto só
// estava escrito para o Operativo; agora vale para as quatro classes, na
// mesma frase (SW-SD-Equipamentos.md § Quem pode usar o quê).
const FORA_DA_FAIXA_NOTA =
  "<p><strong>Usar fora da faixa.</strong> Vestir armadura mais pesada que a permitida, ou empunhar arma fora da lista, não é proibido pelo universo — é proibido pelo treino. O personagem sofre <strong>−2 em todas as rolagens de ataque</strong> com a arma e <strong>perde o acesso às habilidades de classe que dependem de mobilidade ou precisão</strong> enquanto estiver assim (os talentos do Operativo, a Forma de Sabre do Guardião, o Ataque Furtivo). As habilidades passivas continuam valendo.</p>";

// Nota que acompanha cada especialização mundana. Já foi maior: trazia também a
// regra de mudança de alinhamento em jogo, que perdeu o objeto quando a trava
// de alinhamento saiu.
const NOTA_SPEC_MUNDANA = NOTA_SPEC;

// Talentos do Operativo — o campo `rogue_talents` é o que faz a ficha do OD2
// exibir o alocador de pontos.
export const T = {
  sabotagem: { key: "sabotagem", name: "Sabotagem", description: "Destranca portas e provoca defeitos em máquinas. Exige os instrumentos consigo e vale uma vez por máquina — se falhar, só tenta de novo naquela máquina ao subir de nível. O tempo cai com a perícia: 2 pts → até 1d6 turnos; 3 pts → 1d4; 4 pts → 1d3; 5 pts → 1 turno." },
  escalar: { key: "escalar", name: "Escalar", description: "Sobe qualquer superfície íngreme (uma jogada por escalada, deslocando seu movimento por rodada). Em falha, cai da metade da altura total e sofre 1d6 de dano a cada 3 metros de queda." },
  furtividade: { key: "furtividade", name: "Furtividade", description: "Esconde-se, move-se em silêncio e passa por vãos estreitos; com novo teste, anda furtivo em movimento normal — mas atacar (mesmo errando) o torna visível." },
  furtar: { key: "furtar", name: "Furtar", description: "Afana os pertences de alguém sem ser notado. Se a jogada passar do dobro da dificuldade, a vítima o desmascara; −1 por cada 3 níveis do alvo acima do 5º." },
  armadilha: { key: "armadilha", name: "Armadilha", description: "Encontra, identifica e desarma armadilhas — cofres com carga de fragmentação, corredores com torretas, campos de força, minas de proximidade. Uma jogada por armadilha: sucesso a encontra e a neutraliza. Falha por 1 ponto = achou mas não desarmou. Falha por mais que isso = a armadilha dispara. Também serve para instalar armadilhas, se tiver os componentes." },
  obterInfo: { key: "obter-informacao", name: "Obter Informação", description: "Extrai dados sem chamar atenção (informantes, vigilância, escutas, interrogatório discreto). Sucesso = uma informação útil ou pista, a critério do Mestre. Substitui Escalar." },
  disfarce: { key: "disfarce", name: "Disfarce", description: "Passa-se por outra pessoa (uniformes, credenciais falsas, interpretação). Falha = identidade descoberta; −1 por cada 3 níveis do observador acima do 5º. Substitui Furtar." },
  vigilancia: { key: "vigilancia", name: "Vigilância", description: "Observa discretamente alvos e rotinas, identificando padrões, rotas e pontos fracos." },
  contrabando: { key: "contrabando", name: "Contrabando", description: "Oculta mercadorias e passageiros em compartimentos secretos, falsifica manifestos e burla inspeções e sensores. Falha = a carga é achada ou desperta suspeita." },
  labia: { key: "labia", name: "Lábia", description: "Blefa, barganha e convence pela conversa — distrai guardas, engana autoridades, arranca vantagens sociais." },
  avaliacao: { key: "avaliacao", name: "Avaliação", description: "Fareja o valor real de uma carga, relíquia ou negócio, e onde vendê-la no mercado negro. (Sugestão — ajuste à vontade.)" },
  rastrear: { key: "rastrear", name: "Rastrear", description: "Localiza e segue alvos por rastros, pistas, registros ou testemunhas." },
  venenos: { key: "venenos", name: "Venenos", description: "Prepara, identifica e aplica toxinas e sedativos em lâminas, dardos ou bebidas." },
  demolicoes: { key: "demolicoes", name: "Demolições", description: "Conhece explosivos e cargas — calcula o necessário para derrubar estruturas, abrir passagens ou desarmar bombas." },
  eletronica: { key: "eletronica", name: "Eletrônica", description: "Opera e reconfigura sistemas de segurança (sensores, alarmes, câmeras, fechaduras, campos de força)." },
  sabotagemNaves: { key: "sabotagem-naves", name: "Sabotagem de Naves/Veículos", description: "Inutiliza sistemas de naves e veículos — trava o hyperdrive, corta a energia, prende uma nave no chão ou imobiliza um walker. (Sugestão — ajuste à vontade.)" },
};

const TALENTOS_REGRA =
  "<p>Começa com <strong>2 pontos em cada um</strong> dos cinco talentos + <strong>2 pontos livres</strong>. Nos níveis <strong>3, 6 e 10</strong> recebe <strong>+2 pontos</strong> para distribuir.</p>" +
  "<p><strong>Teste:</strong> um talento tem chance em 1d6 igual ao seu valor (2 pontos = 1-2 em 1d6; 5 pontos = 1-5 em 1d6). <strong>Máximo: 5.</strong></p>" +
  "<p><strong>Trava:</strong> ao subir de nível ele <strong>não pode pôr os 2 pontos no mesmo talento</strong> — tem que espalhar. A trava não vale para a distribuição inicial do 1º nível.</p>";

// As Sendas do Sensível à Força nunca tiveram trava de alinhamento. Foram as
// primeiras a ser soltas — e o argumento delas acabou valendo para o livro
// inteiro: em ago/2026 a trava caiu também nas dez trilhas mundanas.
const NOTA_SENDA_SEM_ALINHAMENTO =
  "<p><strong>As Sendas não têm restrição de alinhamento</strong> — e, desde ago/2026, <strong>nenhuma trilha deste cenário tem</strong>. O Sensível foi só o primeiro a ser solto.</p>"
      + "<p class='nota-casa'><em>O motivo é de design: a trava existia para diferenciar as trilhas, e no Sensível essa diferenciação já é feita pelo <strong>Caminho</strong> (Luz/Sombra) e pela <strong>Corrupção</strong>. Manter os dois eixos produzia aberrações: um Sith de sabre seria obrigatoriamente \"Guardião neutro\" com Corrupção 10, e um Inquisidor caçador de Jedi seria \"Sentinela caótico\" a serviço do regime mais ordeiro da galáxia. Depois se percebeu que o mesmo raciocínio valia fora: a diferenciação das trilhas mundanas também nunca veio do alinhamento, vem do kit de habilidades.</em></p>"
      + "<p class='nota-casa'><em>Variante opcional — se a sua mesa preferir a amarração antiga, a leitura mais coerente seria pelo <strong>Caminho</strong>, não pela Senda: Luz → Ordeiro ou Neutro · Sombra → Caótico ou Ordeiro (o Império é ordeiro) · sem Caminho → Neutro.</em></p>";

// ── Criações da casa inspiradas no suplemento "Jedi e Sith para Space Dragon"
// (Jonas Picholaro). A caixa abaixo acompanha as três regras novas — a
// Tentação, o Eco da Senda e o Mudar de Guarda — para deixar claro na mesa
// de onde veio a ideia e por que os números NÃO são os do suplemento.
const CAIXA_CASA = (o_que_veio_de_la) =>
  "<hr><p class='nota-casa'>🜂 <strong>Criação da casa.</strong> A ideia nasceu do suplemento oficial <em>Jedi e Sith para Space Dragon</em>, de Jonas Picholaro — " +
  o_que_veio_de_la +
  " Os <strong>números de lá não servem aqui</strong>: aquele suplemento roda noutra escala (personagens até o <strong>20º nível</strong>, especializações que só abrem no <strong>5º</strong>) e noutro vocabulário (\"pontos da força\", \"atributos da força\"). O que atravessou foi só a intuição; a mecânica foi reconstruída sobre o que este cenário já tem — <strong>Foco Diário</strong>, <strong>Grandezas</strong>, <strong>Sendas</strong> e a trilha de <strong>Corrupção</strong>.</p>";

const HAB_TENTACAO = {
  nome: "A Tentação — a Corrupção como moeda",
  level: 1,
  desc:
    "<p>Até agora a Corrupção só sabia <strong>punir</strong>. Mas na galáxia a Sombra não multa ninguém — ela <strong>oferece</strong>. É mais rápida, é mais fácil, e funciona.</p>" +
    "<p>Quando você <strong>falha numa rolagem decisiva</strong> — ou quando um golpe seu acerta e você quer que ele <em>termine</em> a questão —, a Força propõe um negócio. Escolha uma das três formas:</p><ul>" +
    "<li><strong>Insistir — +1 de Corrupção:</strong> <strong>rerrola</strong> a jogada falha e fica com o <strong>segundo resultado, seja ele qual for</strong>. A Força atende ao chamado, mas não obedece a você.</li>" +
    "<li><strong>Arrancar — +2 de Corrupção:</strong> <strong>rerrola</strong> e fica com o <strong>melhor dos dois</strong>. Não é mais pedir: é tomar. Custa o dobro porque a certeza é o que a Sombra vende mais caro.</li>" +
    "<li><strong>Sentenciar — +1 de Corrupção:</strong> um ataque que <strong>já acertou</strong> vira <strong>crítico</strong>, ou um poder que <strong>já passou</strong> tem dano, duração ou número de alvos <strong>dobrado</strong>.</li>" +
    "</ul>" +
    "<p><strong>Rolagem decisiva</strong> é aquela cuja falha <strong>fecha um caminho</strong>: o Duelo da Força que decide a sala, o teste que impede a nave de cair, o ataque que separa o aliado da morte. <strong>Não</strong> vale para rotina, iniciativa, dano avulso ou testes repetíveis. Quem decide é o Mestre, e decide <strong>antes</strong> da rolagem.</p>" +
    "<p><strong>Trava: uma vez por cena, no máximo três vezes por dia de jogo.</strong> Sem ela a regra se autodestrói — um Padawan sereno viraria Lorde Sith na segunda sessão e a Queda deixaria de ser tragédia para virar contabilidade. Com a trava, ir de 0 a 10 só pela Tentação leva no mínimo <strong>quatro dias de jogo</strong>.</p>" +
    "<p><strong>Vale igualmente para a Luz e para a Sombra</strong> — mesmo preço, mesma trilha, sem desconto para ninguém. O que muda é a cara da cena, não a matemática: para o Jedi a voz sussurra <em>\"só desta vez\"</em> e o empurra para a <strong>Queda</strong>; para quem já é da Sombra ela diz <em>\"você já pagou por isso, use\"</em> e o empurra para ser <strong>Consumido</strong>.</p>" +
    "<p><strong>Com os poderes ★, os custos somam.</strong> A Tentação <strong>nunca substitui</strong> a Corrupção que a ação já cobrava. Um personagem da Luz que lança um poder da Sombra (+1), erra e <em>Arranca</em> a rerrolagem (+2) sobe <strong>3 pontos numa única ação</strong>.</p>" +
    "<p><strong>Em Corrupção 9 — a última oferta.</strong> Nada impede o negócio. A Sombra oferece <strong>sozinha</strong>: o Mestre descreve a oferta em voz alta e <strong>avisa o preço</strong> — aceitar leva a <strong>10</strong>, e 10 é a <strong>Queda</strong> (Luz/neutro) ou o <strong>Consumido</strong> (Sombra). Você <strong>recebe o que pediu</strong> na hora; a Queda se resolve <strong>ao fim da cena</strong>. O herói ganha a luta e perde a si mesmo no mesmo plano.</p>" +
    "<p><strong>Recusar nunca exige rolagem</strong> e nunca tem penalidade mecânica. Uma Corrupção que se pega sem escolher não é tentação, é imposto.</p>" +
    "<p>A Corrupção ganha assim é <strong>Corrupção comum</strong>: conta na tabela de estados e <strong>sai pelos mesmos caminhos</strong> (os atos de compaixão e sacrifício que dão −1).</p>" +
    CAIXA_CASA(
      "de lá veio a ideia do Sith de 15º nível que podia \"gastar 1 ponto da força <strong>ou receber 1 ponto do lado negro</strong> e refazer qualquer teste de poder\", ou seja, <strong>pagar em Corrupção por um resultado</strong>."
    ),
};

const HAB_ECO_SENDA = {
  nome: "Eco da Senda",
  level: 10,
  desc:
    "<p>Chega um ponto em que a Força para de ser esforço. O gesto que lhe custava concentração vira respiração — e a corrente que você empurrou volta sozinha para a mão. Não em tudo: <strong>só naquilo que é o seu ofício</strong>.</p>" +
    "<p><strong>Eco (10º):</strong> sempre que gastar Foco num <strong>poder da sua Senda</strong>, role <strong>1d10</strong> depois de resolver o poder — num <strong>1</strong>, o ponto de Foco <strong>volta</strong> para a Grandeza de onde saiu. Vale <strong>por ponto gasto</strong> (um poder de 2 pontos rola dois d10).</p>" +
    "<p><strong>Eco Maior (15º):</strong> a rolagem passa a ser <strong>1d4</strong> (25%). Além disso, os <strong>poderes de 1ª Grandeza da sua Senda não custam mais Foco algum</strong> — <strong>no máximo um por rodada</strong>.</p>" +
    "<p class='nota-casa'><em>Por que 1ª Grandeza e não 2ª: aqui as Grandezas vão até a 10ª e a 1ª já carrega os cavalos de batalha do Sensível (Empurrão da Força, Truque Mental, Detectar a Força, Cura pela Força). Libertar a 2ª junto, num teto de 15º nível, faria o Consular abrir portas de aço o dia inteiro de graça. A trava de um por rodada existe pelo mesmo motivo: gratuito não pode significar infinito dentro de um combate.</em></p>" +
    "<p><strong>O que é \"poder da sua Senda\":</strong> cada Senda tem um <strong>Domínio</strong> — a família de efeitos que ela pratica até virar hábito. Vale para poderes de <strong>qualquer lista</strong> (Universal, Luz ou Sombra): conta <em>o que o poder faz</em>, não de que lado ele vem.</p><ul>" +
    "<li><strong>Guardião — O Corpo e a Lâmina:</strong> Empurrão da Força · Correr com a Força · Salto da Força · Telecinésia · Prisão Telecinética · Lâmina Guiada · Deflexão da Força · Choque da Força · Estrangular · Relâmpagos da Força ★</li>" +
    "<li><strong>Consular — A Mente e o Domínio:</strong> Truque Mental · Vínculo Telepático · Percepção Ampliada · Calma · Coragem · Aterrorizar · Sussurro Sombrio · Hipnose · Perturbar Mente · Reescrever Memória · Dominação Absoluta</li>" +
    "<li><strong>Sentinela — O Rastro e o Véu:</strong> Detectar a Força · Sentir o Perigo · Localizar pela Força · Véu da Força · Olho da Força · Discernir a Verdade · Manto de Escuridão · Enfraquecimento</li>" +
    "<li><strong>Vidente — A Vida e a Presciência:</strong> Cura pela Força · Cura de Aflições · Cura Maior · Serenidade · Estase da Força · Premonição · Visão da Verdade · Dissipar a Sombra · Libertar da Corrupção · Toque Sombrio · Repelir a Fera</li>" +
    "</ul>" +
    "<p><em>As listas são exemplos, não um cadastro. Um poder pode caber em dois Domínios — nesse caso conta se a <strong>maneira como foi usado na cena</strong> pertence ao Domínio do personagem. Na dúvida o Mestre decide, e decide antes da rolagem. Ninguém acumula dois Domínios.</em></p>" +
    "<p><strong>Quem trilhou a Senda Mandaloriana não tem Eco da Senda</strong> — abriu mão da especialização e, com ela, do Domínio. O clã lhe ensinou uma lâmina, não um atalho da Força.</p>" +
    CAIXA_CASA(
      "de lá veio a ideia do Jedi que escolhe um \"atributo da força favorito\" e passa a ter <strong>10% de chance no 10º nível</strong> e <strong>25% no 15º</strong> de recuperar o ponto gasto, além de não gastar mais nada com os poderes baixos daquele atributo."
    ),
};

// Habilidade curta que vai em cada especialização, nomeando o Domínio dela.
const dominioDaSenda = (senda, dominio, frase) => ({
  nome: `Domínio da Senda — ${dominio}`,
  level: 10,
  desc:
    `<p>O <strong>Domínio</strong> do ${senda} é <strong>${dominio}</strong>: ${frase}</p>` +
    "<p>É este o conjunto que dispara o <strong>Eco da Senda</strong> da classe-base — a chance de o Foco voltar no 10º nível e a gratuidade dos poderes de 1ª Grandeza no 15º. A lista completa de exemplos está na habilidade <em>Eco da Senda</em>.</p>",
});

// Restrições de equipamento por chassi.
// As restrições são escritas no vocabulário da tabela de Equipamentos: as armas
// trazem a coluna "Uso" (Leve / Marcial / Utilitária) e as armaduras a coluna
// "Tipo" (Leve / Média / Pesada). Antes as classes falavam em "armas de uma
// mão", "armas simples" e "regra de Vestes" — termos herdados do Space Dragon
// que nenhuma tabela deste
// cenário etiquetava (a "regra de Vestes" apontava para um degrau de armadura
// do SD que nunca foi transportado para cá), e que por isso o jogador não
// conseguia aplicar na loja.
const EQ_VETERANO = {
  weapons: "Leve, Marcial e Utilitária — qualquer arma do catálogo.",
  armors: "Leve, Média e Pesada, e pode usar escudo.",
  magic_items: "Aparatos defensivos e utilitários. Não opera aparatos ofensivos.",
};
const EQ_OPERATIVO = {
  weapons: "Leve e Utilitária, nenhuma de Duas Mãos.",
  armors: "Apenas Leve ou Média, e sem escudo — armadura Pesada ou escudo impede o uso dos talentos de classe.",
  magic_items: "Apenas aparatos utilitários.",
};
const EQ_TECNICO = {
  weapons: "Leve de energia e Utilitária (granadas, cortadores, lançadores). Nada Marcial.",
  armors: "Apenas Leve, sem escudo.",
  magic_items: "Constrói e opera qualquer aparato — ofensivos, defensivos e utilitários.",
};
const EQ_SENSIVEL = {
  weapons: "Sabre de luz e armas Leves.",
  armors: "Apenas Leve, sem escudo. (O Guardião também usa Média — ver a especialização.)",
  magic_items: "Apenas aparatos utilitários. Construir e operar qualquer aparato é o nicho do Técnico.",
};

// Espécies que podem ser Sensíveis à Força. O campo `restrictions.races` do OD2
// é uma LISTA DE PERMITIDAS (allowlist): a ficha recusa o drop da classe se a
// raça do personagem não estiver aqui. Como a regra do cenário é negativa
// ("Droides não podem"), ela vira a lista das oito espécies vivas.
const RACAS_SENSIVEL = [
  "Humano", "Wookiee", "Twi'lek", "Rodiano", "Zabrak",
  "Mon Calamari", "Trandoshano", "Chiss",
];

export const classes = [
  // ══════════════════════════════════════════════════════════════════════════
  // VETERANO — chassi Cosmonauta (d10)
  // ══════════════════════════════════════════════════════════════════════════
  {
    nome: "Veterano",
    tabela: "veterano",
    coluna: "normal",
    dv: 10,
    high_level_hp_bonus: 1,
    flavor: "<p>O herói de ação e o piloto da galáxia. <em>Chassi: Cosmonauta.</em></p>",
    descricao:
      "<p>Soldados, pistoleiros, caçadores, capitães e diplomatas de gatilho rápido. É a classe marcial do cenário: não há \"Guerreiro\" separado. <strong>Cassian, Boba Fett, Leia e um piloto de caça</strong> são todos Veteranos de especializações diferentes.</p>" +
      "<p><strong>Créditos iniciais:</strong> 2d10 × 50 CR.</p>" + APARATOS_NOTA + SEGUIDORES_NOTA + ALINHAMENTO_NOTA + FORA_DA_FAIXA_NOTA,
    equipment_restrictions: EQ_VETERANO,
    habilidades: [
      { nome: "Pilotar", level: 1, desc: "<p>Pilota qualquer nave ou veículo, e é o <strong>capitão natural</strong> de uma nave. Chance de <strong>1-2 em 1d6</strong>.</p>", level3: "<p>A chance aumenta para <strong>1-3 em 1d6</strong>.</p>", level6: "<p>A chance aumenta para <strong>1-4 em 1d6</strong>.</p>", level10: "<p>A chance aumenta para <strong>1-5 em 1d6</strong>.</p>" },
      { nome: "Desarmar e Subjugar", level: 1, desc: "<p>Sacrificando um de seus ataques, desarma um oponente (<strong>1-2 em 1d6</strong>). Se o alvo já está desarmado, pode subjugá-lo — também sacrificando um ataque, com a mesma chance.</p>", level3: "<p>Chance de <strong>1-3 em 1d6</strong>.</p>", level6: "<p>Chance de <strong>1-4 em 1d6</strong>.</p>", level10: "<p>Chance de <strong>1-5 em 1d6</strong>.</p>" },
      { nome: "Ataques Múltiplos", level: 3, desc: "<p>Adquire um <strong>segundo ataque</strong> (corpo a corpo ou à distância), realizado logo em sequência ao primeiro — antes da ação do próximo jogador na iniciativa — <strong>com a mesma Base de Ataque</strong> do primeiro.</p><p class='nota-casa'><em>Nota de balanço (correção da casa): o Space Dragon só dava o segundo ataque no 7º nível, e com a Base de Ataque menor; o Estrela Dracônica antecipou para o 1º nível com a BA cheia, o que dobra o dano por rodada da classe marcial já na primeira sessão e esvazia a troca do Mercenário [6]. Aqui o ganho foi movido para o <strong>3º nível</strong>, alinhado ao degrau que todas as outras habilidades usam. <strong>Variante:</strong> mesas que preferirem a versão do Estrela Dracônica podem devolvê-lo ao 1º nível.</em></p>" },
      { nome: "Dano Crítico", level: 1, desc: "<p>A intimidade do Veterano com armas faz seus acertos certeiros saírem <strong>mais vezes</strong> — e, no fim da carreira, doerem mais. <strong>Seus acertos críticos acontecem em 19–20</strong>, e não só no 20 natural: o dobro da frequência de qualquer outro personagem da galáxia. O dano segue <strong>dobrado</strong>, como manda o OD2.</p><p class='nota-casa'><em>Correção da casa: este degrau dizia \"[1] dano ×2\" — e ×2 é o que o OD2 já dá a todo mundo (\"quando um acerto crítico ocorre, o dano da arma deve ser dobrado\", LB1 p. 92). Na prática a assinatura da classe marcial entregava <strong>nada</strong> até o 10º nível. A causa foi uma compressão de escala: no Space Dragon o Cosmonauta tinha uma coluna de crítico ao longo de 20 níveis (×2 do 1º ao 5º, chegando a ×5 no 18º), e lá o crítico-padrão rolava numa tabela de 1d6 com o multiplicador da classe somando por cima. Espremida para 15 níveis e pousada num sistema cujo crítico já é ×2 por definição, a base da escada afundou abaixo do piso. A correção troca o <strong>multiplicador</strong> pela <strong>faixa</strong>: o Veterano não bate mais forte no 1º nível — ele <strong>crita duas vezes mais</strong>. É a forma nativa do OD2 de dizer \"esta pessoa vive com uma arma na mão\", e o cenário já a usa em Mestre Makashi e no Tiro de Passagem. <strong>Variante:</strong> mesas que preferirem a leitura antiga podem devolver o 1º nível a \"dano ×2\" — sabendo que ele não muda nada.</em></p>", level10: "<p>O dano crítico passa a <strong>×3</strong>.</p>" },
      reputacao(),
    ],
  },
  {
    nome: "Veterano — Mercenário",
    tabela: "veterano",
    coluna: "especial",
    dv: 10,
    high_level_hp_bonus: 1,
    flavor: "<p>O soldado e o pistoleiro. <em>Especialização de Veterano.</em></p>",
    descricao:
      "<p>Stormtroopers de elite, mercenários, pistoleiros do submundo, soldados clones. A arma preferida vira extensão do corpo.</p>" +
      "<p><strong>Em relação ao Veterano-base:</strong> abre mão de <em>Pilotar</em> e <em>Desarmar e Subjugar</em> já no 1º nível — em troca, é quem mais crita na galáxia: <strong>18–20 e ×3 desde o 1º nível</strong>, subindo até ×5. E, a partir do 10º, <strong>suas Jogadas de Proteção param de evoluir</strong>.</p>" + NOTA_SPEC_MUNDANA,
    equipment_restrictions: EQ_VETERANO,
    habilidades: [
      { nome: "Armado e Perigoso", level: 1, desc: "<p>Escolha <strong>uma arma</strong> — é a sua. Com ela, seus acertos críticos acontecem em <strong>18–20</strong> e o dano crítico é <strong>×3</strong>.</p><p>Com qualquer outra arma vale o <strong>Dano Crítico do Veterano</strong>: crítico em 19–20, dano dobrado.</p><p class='nota-casa'><em>Correção da casa: esta habilidade dava \"×2 na arma escolhida\", que é o padrão do OD2 restrito a uma arma — o próprio texto admitia que ela só ligava no 3º nível. Somada ao Dano Crítico ×2 herdado, a conta do 1º nível era: paga Pilotar e Desarmar, recebe nada. Agora a trilha nasce fazendo o que promete, e o <strong>Golpe Impiedoso</strong> do 3º nível foi absorvido aqui — a escada ficou ×3 → ×4 → ×5, sem degrau repetido nem degrau morto.</em></p>" },
      { nome: "Ataques Múltiplos", level: 3, desc: "<p>Adquire um <strong>segundo ataque</strong>, corpo a corpo ou à distância, feito em sequência ao primeiro — antes da ação do próximo jogador na iniciativa — <strong>com a mesma Base de Ataque</strong>.</p>" },
      { nome: "Mestre de Arma", level: 6, desc: "<p><strong>−5</strong> ao usar qualquer arma que não seja a sua, e <strong>+2</strong> em todas as jogadas com ela. Os críticos com a arma escolhida passam a <strong>×4</strong>.</p><p><strong>Golpe Certeiro — a aposta do Mercenário.</strong> No início do seu turno, declare que <strong>abre mão do segundo ataque</strong> para forçar um crítico e role <strong>1d6</strong>. Com <strong>1-3</strong>, você faz o ataque normalmente e, <strong>se ele acertar, é automaticamente um acerto crítico</strong>, não importa o que o d20 disser. Com <strong>4-6</strong>, você <strong>perde o resto do turno</strong> — nem ataque, nem manobra, nem movimento. É aposta, não bônus.</p><p class='nota-casa'><em>Correção da casa: o texto anterior dizia só \"sacrifique o segundo ataque para ter chance maior de crítico: 1-3 em 1d6\", sem dizer o que a jogada significa, se o ataque ainda precisa acertar ou o que acontece na falha. Não dava para rolar. O procedimento acima é o do livro, traduzido de porcentagem para 1d6.</em></p>" },
      { nome: "Super Comando", level: 10, desc: "<p>Os críticos com a arma escolhida passam a <strong>×5</strong>, e o <strong>Golpe Certeiro</strong> passa a valer para os <strong>dois</strong> ataques do turno, com a chance melhorada de <strong>1-4 em 1d6</strong> — uma jogada para cada ataque. A cláusula de falha continua de pé: errar a jogada encerra o turno na hora.</p><p>E, a partir daqui, <strong>suas Jogadas de Proteção param de evoluir</strong> — é o preço de ter dado a vida inteira a uma arma só.</p><p class='nota-casa'><em>Correção da casa: no Space Dragon o congelamento de JP caía no 10º de 20 níveis e custava 3 pontos. Herdado no 6º de uma escala de 15, passou a custar 8 — JP travada em 8 contra os 16 de todo mundo — por dois terços da carreira, o que fazia dele a habilidade mais cara do livro apresentada como upgrade. Movido para o 10º, volta a valer metade da carreira e chega junto com o prêmio. <strong>Variante:</strong> devolva-o ao 6º nível se quiser a versão dura.</em></p>" },
      reputacao("A fama do soldado que nunca erra — vale em quartéis, cantinas e mesas de contratação."),
    ],
  },
  {
    nome: "Veterano — Caçador de Recompensas",
    tabela: "veterano",
    coluna: "especial",
    dv: 10,
    high_level_hp_bonus: 1,
    flavor: "<p>O caçador. <em>Especialização de Veterano.</em></p>",
    descricao:
      "<p>Boba Fett, Cad Bane, Bossk, Fennec. Casa perfeitamente com a <strong>Senda Mandaloriana</strong>.</p>" +
      "<p><strong>Em relação ao Veterano-base:</strong> abre mão de <em>Pilotar</em> (a pilotagem vem embutida em <em>Operar Aparatos Ofensivos</em>, que também conserta máquinas) e recebe os <em>Ataques Múltiplos</em> mais tarde, no 6º nível. Em troca, é a única trilha não-Técnica que opera <strong>aparatos ofensivos</strong>, a única com um alvo marcado e a única classe do livro com um <strong>terceiro ataque</strong>.</p>" + NOTA_SPEC_MUNDANA,
    equipment_restrictions: {
      ...EQ_VETERANO,
      magic_items: "Exceção da trilha: opera aparatos ofensivos, defensivos e utilitários.",
    },
    habilidades: [
      { nome: "Dano Crítico", level: 1, desc: "<p>Como o Veterano: seus acertos críticos acontecem em <strong>19–20</strong>, e não só no 20 natural. O dano segue dobrado.</p>", level10: "<p>O dano crítico passa a <strong>×3</strong>.</p>" },
      { nome: "Operar Aparatos Ofensivos e Consertar Máquinas", level: 1, desc: "<p>Opera aparatos ofensivos (redes, detonadores, grilhões), <strong>pilota naves</strong> e conserta máquinas: <strong>1-2 em 1d6</strong>.</p>", level3: "<p>A chance sobe para <strong>1-3 em 1d6</strong>.</p>", level6: "<p>A chance sobe para <strong>1-4 em 1d6</strong>.</p>", level10: "<p>A chance sobe para <strong>1-5 em 1d6</strong>.</p>" },
      { nome: "Marcar a Presa", level: 3, desc: "<p>Declare um alvo como seu <strong>contrato</strong> — por nome, por rosto ou por um holo de recompensa. Contra ele, e só contra ele: <strong>+2 para acertar</strong>, seus críticos saem em <strong>18–20</strong>, e você sabe a <strong>direção geral</strong> em que ele está enquanto estiverem no mesmo planeta.</p><p><strong>Um contrato por vez</strong>; trocar exige um dia de preparação e uma pista nova.</p><p class='nota-casa'><em>Correção da casa: do 3º ao 5º nível o Caçador atacava uma vez enquanto o chassi atacava duas, sem nada no lugar — o segundo ataque da base foi antecipado para o 3º nível e ninguém revisou quem o recebia depois. (No Space Dragon o problema não existia: lá o segundo ataque só chegava no 7º para todo mundo.) A saída não foi empatar o número de ataques, foi inclinar a classe: contra o alvo que ele veio caçar, o Caçador é o melhor atirador do livro; contra tropa aleatória, continua atrás. É a diferença entre um soldado e um caçador.</em></p>" },
      { nome: "Desarmar e Subjugar", level: 3, desc: "<p>Recupera a manobra da classe-base, com chance de <strong>1-2 em 1d6</strong>.</p>" },
      { nome: "Ataques Múltiplos", level: 6, desc: "<p>Ganha um <strong>segundo ataque</strong> com a mesma Base de Ataque.</p>" },
      { nome: "Combate Rápido", level: 10, desc: "<p>Tenta um <strong>terceiro ataque</strong> (<strong>1-4 em 1d6</strong>, com a Base de Ataque do segundo). Falhar nessa jogada encerra o turno.</p>" },
      reputacao("O nome que faz um alvo largar o copo e correr — abre celas, cantinas e portas do submundo, nunca recepções diplomáticas."),
    ],
  },
  {
    nome: "Veterano — Emissário",
    tabela: "veterano",
    coluna: "especial",
    dv: 10,
    high_level_hp_bonus: 1,
    flavor: "<p>O diplomata, o senador, o capitão-líder. <em>Especialização de Veterano.</em></p>",
    descricao:
      "<p>Leia Organa, Bail, Mon Mothma, um capitão contrabandista que virou general da Aliança.</p>" +
      "<p><strong>Em relação ao Veterano-base:</strong> abre mão de <em>Desarmar e Subjugar</em> e de <em>Ataques Múltiplos</em> — <strong>ele nunca ataca duas vezes na mesma rodada</strong>, a carreira inteira. É a trilha menos marcial das três, de propósito. Em troca, é a única com <strong>renda passiva</strong>, <strong>nave patrocinada</strong>, <strong>tripulação</strong> e um número próprio na mesa de negociação.</p><p class='nota-casa'><em>As duas perdas nunca foram do livro: o Space Dragon não tira Ataques Múltiplos nem Desarmar do Emissário — quem inventou as duas perdas foi o Estrela Dracônica, provavelmente para fechar três trilhas simétricas. Ficaram, mas agora <strong>pagas</strong>, não herdadas em silêncio.</em></p>" + SEGUIDORES_NOTA + NOTA_SPEC_MUNDANA,
    equipment_restrictions: EQ_VETERANO,
    habilidades: [
      { nome: "Dano Crítico", level: 1, desc: "<p>Como o Veterano: seus acertos críticos acontecem em <strong>19–20</strong>, e não só no 20 natural. O dano segue dobrado.</p><p><em>A progressão <strong>para no 3º nível</strong>, com <strong>Palavra que Corta</strong> — o Emissário nunca chega ao ×3.</em></p>" },
      { nome: "Pilotar", level: 1, desc: "<p>Pilota qualquer nave: <strong>1-2 em 1d6</strong>.</p>", level3: "<p>Chance de <strong>1-3 em 1d6</strong>.</p>", level6: "<p>Chance de <strong>1-4 em 1d6</strong>.</p>", level10: "<p>Chance de <strong>1-5 em 1d6</strong>.</p>" },
      { nome: "Mecenas", level: 3, desc: "<p>Recebe salário mensal do indivíduo ou organização que representa, equivalente a <strong>200 CR × seu nível</strong>.</p><p class='nota-casa'><em>No Space Dragon era $20.000 × nível — o preço de uma pistola laser por nível, por mês. Aqui o valor foi convertido para a escala de Créditos do cenário, mantendo a proporção: cerca de um blaster pesado por nível.</em></p>" },
      { nome: "Palavra que Corta", level: 3, desc: "<p>Sua progressão de <strong>Dano Crítico para aqui</strong> — você nunca chega ao ×3. Em troca, a mesma perícia que multiplicava um golpe passa a multiplicar uma palavra: <strong>+2 em testes de reação, negociação e Moral</strong> que você conduza pessoalmente.</p><p class='nota-casa'><em>É a assinatura original da trilha, de volta. O Space Dragon dizia que o Emissário \"interrompe a progressão de dano crítico, mas pode usar essa mesma progressão como multiplicador do ajuste de reação\". A conversão a perdeu porque o atributo Comunicação não existe no OD2 — e, sem ela, a trilha social ficou sem número nenhum no único pilar que é dela.</em></p>", level6: "<p>O bônus sobe para <strong>+3</strong>.</p>", level10: "<p>O bônus sobe para <strong>+4</strong>.</p>" },
      { nome: "Enviado", level: 6, desc: "<p>Ganha uma <strong>nave patrocinada</strong> (combustível e reparos custeados) e pode ter tripulação conforme seu número de seguidores.</p>" },
      { nome: "Voz de Comando", level: 6, desc: "<p>Uma vez por combate, gaste <strong>sua ação</strong> para dar uma ordem a um aliado que possa ouvi-lo — ele <strong>age imediatamente</strong>, fora da iniciativa, com um ataque, um movimento ou uma manobra.</p><p><em>O Emissário abre mão de <strong>Ataques Múltiplos</strong> e nunca ataca duas vezes na mesma rodada, a carreira inteira. Em vez de devolver o segundo ataque tarde, esta habilidade transforma a falta em desenho: ele não ataca duas vezes, ele faz <strong>outra pessoa</strong> agir fora da iniciativa. É o capitão-líder que a trilha diz ser, e o segundo ataque dele é sempre o de quem faz melhor.</em></p>", level10: "<p><strong>Duas vezes</strong> por combate, e a <strong>primeira delas não custa a sua ação</strong>.</p>" },
      { nome: "Embaixador", level: 10, desc: "<p>A tripulação <strong>triplica</strong>, e os testes de Moral ou Carisma para obter reação amigável de uma criatura inteligente são <strong>Fáceis</strong>.</p>" },
      reputacao("A fama do diplomata respeitado — esta abre salões, audiências e linhas de crédito."),
    ],
  },

  // ══════════════════════════════════════════════════════════════════════════
  // OPERATIVO — chassi Gatuno (d6)
  // ══════════════════════════════════════════════════════════════════════════
  {
    nome: "Operativo",
    tabela: "operativo",
    coluna: "normal",
    dv: 6,
    high_level_hp_bonus: 1,
    flavor: "<p>O trapaceiro do submundo. <em>Chassi: Gatuno.</em></p>",
    descricao:
      "<p>Contrabandistas, ladrões, espiões, piratas e assassinos onde a lei não chega. <strong>Han Solo é um Operativo.</strong></p>" +
      "<p><strong>Créditos iniciais:</strong> 2d6 × 50 CR.</p>" + SEGUIDORES_NOTA + ALINHAMENTO_NOTA + FORA_DA_FAIXA_NOTA,
    equipment_restrictions: EQ_OPERATIVO,
    habilidades: [
      { nome: "Ataque Furtivo", level: 1, desc: "<p>Atacando após aproximação furtiva, faz um ataque <strong>muito fácil</strong> com dano <strong>×2</strong>.</p>", level6: "<p>O dano passa a <strong>×3</strong>.</p>", level10: "<p>O dano passa a <strong>×4</strong>.</p>" },
      { nome: "Percepção", level: 1, desc: "<p>Sentidos superiores: ouvir ruídos, identificar odores e sabores, perceber detalhes em superfícies pelo toque. Chance de <strong>1-2 em 1d6</strong>.</p>", level3: "<p>Chance de <strong>1-3 em 1d6</strong>.</p>", level6: "<p>Chance de <strong>1-4 em 1d6</strong>.</p>", level10: "<p>Chance de <strong>1-5 em 1d6</strong>.</p>" },
      {
        nome: "Talentos de Operativo",
        level: 1,
        desc: "<p>O núcleo do Gatuno, vestido de submundo galáctico. <strong>Bônus:</strong> no 1º nível, +1 ponto para cada ponto do modificador de <strong>Destreza</strong>.</p>" + TALENTOS_REGRA,
        rogue_talents: [T.sabotagem, T.escalar, T.furtividade, T.furtar, T.armadilha],
      },
      reputacao(),
    ],
  },
  {
    nome: "Operativo — Espião",
    tabela: "operativo",
    coluna: "especial",
    dv: 6,
    high_level_hp_bonus: 1,
    flavor: "<p>O agente de inteligência. <em>Especialização de Operativo.</em></p>",
    descricao:
      "<p>Cassian Andor, Fulcrum, agentes do ISB. Leal a uma organização ou governo.</p>" +
      "<p><strong>Perde Ataque Furtivo</strong>, mas <strong>mantém Percepção</strong>. <strong>Substituição de talentos:</strong> <em>Disfarce</em> substitui <em>Furtar</em> e <em>Obter Informação</em> substitui <em>Escalar</em> — ambos herdam os pontos do talento substituído e evoluem junto com os demais.</p>" + NOTA_SPEC_MUNDANA,
    equipment_restrictions: EQ_OPERATIVO,
    habilidades: [
      { nome: "Instintos Aguçados (Percepção)", level: 1, desc: "<p>Como a Percepção do Operativo: <strong>1-2 em 1d6</strong>.</p>", level3: "<p>Chance de <strong>1-3 em 1d6</strong>.</p>", level6: "<p>Chance de <strong>1-4 em 1d6</strong>.</p>", level10: "<p>Chance de <strong>1-5 em 1d6</strong>.</p>" },
      {
        nome: "Talentos de Espião",
        level: 1,
        desc: "<p><strong>Bônus:</strong> no 1º nível, +1 ponto por ponto do modificador de <strong>Destreza ou Carisma</strong>.</p>" + TALENTOS_REGRA,
        rogue_talents: [T.sabotagem, T.furtividade, T.obterInfo, T.disfarce, T.vigilancia],
      },
      { nome: "Infiltração Especializada", level: 3, desc: "<p><strong>Sabotador Furtivo:</strong> sua chance de <em>Sabotagem</em> <strong>aumenta em 1 ponto</strong> quando ele obtém sucesso numa jogada de <em>Furtividade</em> (máximo 1-5 em 1d6).</p>" },
      { nome: "Aparatos e Feitos Científicos", level: 6, desc: "<p>O Espião passa a <strong>criar máquinas e realizar experiências</strong> em seus laboratórios, com <strong>Nível Tecnológico igual ao de um Técnico do seu nível</strong> (a coluna NT da tabela do Técnico, teto 10; não há limite para os aparatos que pode <em>usar</em>). Vale para os aparatos de campo do ofício — escutas, bugs, credenciais forjadas, holoprojetores de disfarce. Seguem as regras de Criação de Aparatos do Space Dragon.</p>" },
      { nome: "Fantasma (Mestre Espião)", level: 10, desc: "<p><strong>Todos os seus talentos passam a ter a mesma chance de sucesso do maior deles.</strong></p>" },
      reputacao("A fama de um espião é uma faca de dois gumes: quem o reconhece também sabe para quem ele trabalha."),
    ],
  },
  {
    nome: "Operativo — Contrabandista",
    tabela: "operativo",
    coluna: "especial",
    dv: 6,
    high_level_hp_bonus: 1,
    flavor: "<p>O malandro espacial. <em>Especialização de Operativo — base: Pirata Espacial.</em></p>",
    descricao:
      "<p>Hondo Ohnaka, os capitães do Cartel, o próprio Han em modo pirataria.</p>" +
      "<p><strong>Perde Percepção e Ataque Furtivo</strong>; ganha pilotagem e uma lista de talentos própria.</p>" + SEGUIDORES_NOTA + NOTA_SPEC_MUNDANA,
    equipment_restrictions: EQ_OPERATIVO,
    habilidades: [
      { nome: "Piloto Nato", level: 1, desc: "<p>Pilota qualquer nave: <strong>1-2 em 1d6</strong>.</p>", level3: "<p>Chance de <strong>1-3 em 1d6</strong>.</p>", level6: "<p>Chance de <strong>1-4 em 1d6</strong>.</p>", level10: "<p>Chance de <strong>1-5 em 1d6</strong>.</p>" },
      {
        nome: "Talentos de Contrabandista",
        level: 1,
        desc: "<p><strong>Bônus:</strong> no 1º nível, +1 ponto por ponto do modificador de <strong>Destreza ou Carisma</strong>.</p>" + TALENTOS_REGRA,
        rogue_talents: [T.sabotagem, T.furtividade, T.contrabando, T.labia, T.avaliacao],
      },
      { nome: "Mercado Cinzento", level: 3, desc: "<p><em>(Negociação e Extorsão)</em> Extorque um alvo ou arranca desconto na compra de armas e equipamentos: <strong>1-3 em 1d6</strong> — o desconto é a <strong>margem de sucesso × 10%</strong>.</p>" },
      { nome: "Ação Ousada", level: 6, desc: "<p><em>(Ataques Múltiplos)</em> Adquire um <strong>segundo ataque</strong>, com a mesma Base de Ataque, logo em sequência ao primeiro.</p>" },
      { nome: "Lenda do Submundo", level: 10, desc: "<p>Sempre terá uma tripulação fiel igual a <strong>3× seu número máximo de seguidores</strong> (mínimo 4).</p>" },
      reputacao("Vale ouro em Nar Shaddaa, Tatooine e em qualquer doca sem alfândega — e absolutamente nada num salão de Coruscant."),
    ],
  },
  {
    nome: "Operativo — Assassino",
    tabela: "operativo",
    coluna: "especial",
    dv: 6,
    high_level_hp_bonus: 1,
    flavor: "<p>A lâmina do submundo. <em>Especialização de Operativo.</em></p>",
    descricao:
      "<p>Matadores da Aurora Negra, agentes de eliminação do submundo.</p>" +
      "<p><strong>Perde Percepção e Ataque Furtivo</strong> (substituído pelo Golpe Fatal).</p>" + NOTA_SPEC_MUNDANA,
    equipment_restrictions: EQ_OPERATIVO,
    habilidades: [
      { nome: "Golpe Fatal", level: 1, desc: "<p><em>(Ataque Assassino)</em> Ao atacar após aproximação furtiva, faz um ataque <strong>muito fácil</strong> com dano <strong>×2</strong>.</p>", level10: "<p><strong>Ataque Mortal:</strong> o Golpe Fatal passa a causar dano <strong>×3</strong>.</p>" },
      {
        nome: "Talentos de Assassino",
        level: 1,
        desc: "<p><strong>Bônus:</strong> no 1º nível, +1 ponto por ponto do modificador de <strong>Destreza</strong>.</p>" + TALENTOS_REGRA,
        rogue_talents: [T.sabotagem, T.furtividade, T.rastrear, T.vigilancia, T.venenos],
      },
      { nome: "Marcar Alvo", level: 3, desc: "<p><em>(Espreitar)</em> Uma rodada completa apenas observando o alvo torna o primeiro ataque contra ele <strong>Fácil</strong>; após <strong>4 rodadas</strong> de observação, <strong>Muito Fácil</strong>.</p>" },
      { nome: "Execução", level: 6, desc: "<p><em>(Assassinato)</em> Abre mão do ataque normal para desferir um golpe que <strong>mata o alvo na hora</strong>: <strong>1-2 em 1d6</strong>. Cada Dado de Vida do alvo igual ou acima do seu reduz a chance em 1. Falha = o alvo não sofre dano e fica <strong>imune a nova Execução</strong> até você subir de nível.</p>", level10: "<p>A chance de Execução sobe para <strong>1-3 em 1d6</strong>.</p>" },
      reputacao("A fama de um Assassino não abre portas amigáveis. Ela não o faz bem-vindo em lugar nenhum — apenas faz as pessoas obedecerem depressa e evitarem seus olhos."),
    ],
  },
  {
    nome: "Operativo — Sabotador",
    tabela: "operativo",
    coluna: "especial",
    dv: 6,
    high_level_hp_bonus: 1,
    flavor: "<p>Demolições e armadilhas. <em>Especialização de Operativo.</em></p>",
    descricao:
      "<p>Demolicionistas rebeldes, saboteurs de bases imperiais.</p>" +
      "<p><strong>Para de progredir</strong> em <em>Furtar</em> e em <em>Ataque Furtivo</em>.</p>" + NOTA_SPEC_MUNDANA,
    equipment_restrictions: EQ_OPERATIVO,
    habilidades: [
      { nome: "Percepção", level: 1, desc: "<p>Como a do Operativo: <strong>1-2 em 1d6</strong>.</p>", level3: "<p>Chance de <strong>1-3 em 1d6</strong>.</p>", level6: "<p>Chance de <strong>1-4 em 1d6</strong>.</p>", level10: "<p>Chance de <strong>1-5 em 1d6</strong>.</p>" },
      {
        nome: "Talentos de Sabotador",
        level: 1,
        desc: "<p><strong>Bônus:</strong> no 1º nível, +1 ponto por ponto do modificador de <strong>Destreza</strong>.</p>" + TALENTOS_REGRA,
        rogue_talents: [T.sabotagem, T.furtividade, T.demolicoes, T.eletronica, T.sabotagemNaves],
      },
      { nome: "Quebrar Máquinas", level: 3, desc: "<p><strong>+1</strong> nas jogadas do talento <em>Sabotagem</em> (a chance não pode passar de 1-5 em 1d6).</p>" },
      { nome: "Criar Armadilhas", level: 6, desc: "<p>Monta armadilhas com os equipamentos que sabota. <strong>Desarmar</strong> uma armadilha criada por ele é uma jogada de Sabotagem com chance de <strong>1d6 menos os pontos que o Sabotador tem no talento Sabotagem</strong> (mínimo de 1 em 1d6): quanto melhor o Sabotador, mais difícil desfazer sua obra.</p>" },
      { nome: "Mestre da Sabotagem", level: 10, desc: "<p>Sabotar máquinas e Criar Armadilhas a <strong>1-5 em 1d6</strong>.</p>" },
      reputacao("O nome sussurrado quando uma base imperial vai pelos ares sem que ninguém veja quem entrou."),
    ],
  },

  // ══════════════════════════════════════════════════════════════════════════
  // TÉCNICO — chassi Cientista (d8)
  // ══════════════════════════════════════════════════════════════════════════
  {
    nome: "Técnico",
    tabela: "tecnico",
    coluna: "normal",
    dv: 8,
    high_level_hp_bonus: 1,
    flavor: "<p>O gênio prático da galáxia. <em>Chassi: Cientista.</em></p>",
    descricao:
      "<p>Mecânicos de droides, médicos de campo, engenheiros e slicers que dobram a tecnologia à própria vontade. Onde o Jedi tem a Força, o Técnico tem a engenhoca: seus <strong>aparatos e feitos científicos</strong> são os \"itens mágicos\" deste universo, e ele os constrói com as próprias mãos. Numa tripulação, é quem mantém a nave voando, o droide obediente e o grupo respirando.</p>" +
      "<p><strong>Créditos iniciais:</strong> 1d8 × 50 CR.</p>" + APARATOS_NOTA + NT_NOTA + SEGUIDORES_NOTA + ALINHAMENTO_NOTA + FORA_DA_FAIXA_NOTA,
    equipment_restrictions: EQ_TECNICO,
    habilidades: [
      { nome: "Operar e Consertar Máquinas", level: 1, desc: "<p>Opera e conserta máquinas — religar um gerador, forçar um sistema, remendar tecnologia quebrada. Chance de <strong>1-2 em 1d6</strong>.</p><p><strong>Quando NÃO se rola:</strong> aparelhos que ele mesmo criou dispensam o teste, e usar um aparato pronto qualquer também não pede jogada. Só se rola ao lidar com um aparato <strong>desconhecido, alheio, danificado ou acima do seu NT</strong> — e a falha traz um defeito, a critério do Mestre.</p><p><strong>Pilotar</strong> naves com esta habilidade é só <strong>1 em 1d6</strong>, e <strong>não melhora</strong> com a escada abaixo — Veteranos pilotam melhor.</p>", level3: "<p>Chance de <strong>1-3 em 1d6</strong>.</p>", level6: "<p>Chance de <strong>1-4 em 1d6</strong>.</p>", level10: "<p>Chance de <strong>1-5 em 1d6</strong>.</p>" },
      { nome: "Aparatos e Feitos Científicos", level: 1, desc: "<p>Cria <strong>aparatos</strong> (Nível Tecnológico pela <strong>coluna NT</strong> da tabela, teto 10; não há limite para os aparatos que pode <em>usar</em>) e realiza <strong>feitos científicos</strong> — as duas famílias são a magia que a Força não absorveu:</p><ul><li><strong>Feitos médicos:</strong> diagnosticar e curar doenças, operações cirúrgicas (simples a complexa), destilar antídotos, imunizar pacientes, cirurgia e membros ou órgãos biônicos.</li><li><strong>Feitos genéticos e de laboratório:</strong> construir e consertar droides, reparos robóticos, decodificar DNA, clonagem e afins.</li></ul><p>A lista completa, com NT, custo, tempo e regra de cada feito, está no journal <strong>Feitos Científicos</strong>.</p><p><strong>Consertar, recarregar ou adaptar</strong> um aparato custa <strong>25% do valor</strong> e <strong>metade do tempo</strong> de criação; construir do zero já sai com o seu Desconto Tecnológico. Feitos costumam levar mais tempo que aparatos, e a maioria é permanente.</p><p><strong>Você começa o jogo com aparatos prontos, e ganha mais a cada nível.</strong> Eles <strong>não custam Créditos</strong>: você já os construiu, e a bancada, o tempo e as peças ficaram no passado do personagem. Um Técnico de 1º nível não é alguém que <em>poderá</em> construir coisas — é alguém que <strong>já construiu</strong>. São <strong>três de NT 1</strong> no 1º nível e <strong>mais um a cada nível</strong>, de qualquer NT que você já alcance.</p><p><strong>Nível Tecnológico e aparatos prontos, por nível.</strong> O <strong>NT</strong> é o teto do que você consegue <em>construir</em> — o equivalente ao círculo de magia mais alto de um conjurador. Não há teto para o que você consegue <em>usar</em>.</p><table><thead><tr><th>Nível</th><th>NT</th><th>Aparatos</th></tr></thead><tbody><tr><td>1º</td><td>1</td><td>3</td></tr><tr><td>2º</td><td>2</td><td>4</td></tr><tr><td>3º</td><td>3</td><td>5</td></tr><tr><td>4º</td><td>4</td><td>6</td></tr><tr><td>5º</td><td>5</td><td>7</td></tr><tr><td>6º</td><td>6</td><td>8</td></tr><tr><td>7º</td><td>7</td><td>9</td></tr><tr><td>8º</td><td>8</td><td>10</td></tr><tr><td>9º</td><td>9</td><td>11</td></tr><tr><td>10º</td><td>10</td><td>12</td></tr><tr><td>11º</td><td>10</td><td>13</td></tr><tr><td>12º</td><td>10</td><td>14</td></tr><tr><td>13º</td><td>10</td><td>15</td></tr><tr><td>14º</td><td>10</td><td>16</td></tr><tr><td>15º</td><td>10</td><td>17</td></tr></tbody></table><p><em>O <strong>Engenheiro</strong> anda uma casa atrás na coluna de aparatos (seu nível + 1): ele começa com dois.</em></p><p><em>É o que acontece com todo conjurador do sistema: o Sensível à Força começa com dois poderes de 1ª Grandeza e ganha mais a cada Grandeza que abre; o Mago de OD2 começa com o grimório escrito e acrescenta magias ao subir de nível. Ninguém entra em jogo com a lista em branco, e ninguém para de aprender.</em></p><p>Os <strong>Créditos iniciais continuam servindo para todo o resto</strong> — armas, roupa, passagem, suborno — e para comprar ou construir aparatos <em>além</em> destes, se você quiser mais.</p><p><strong>Sugestão de mesa:</strong> que um dos três primeiros seja o <strong>Disruptor Positrônico</strong> — é o aparato-assinatura da classe, é NT 1, e é o que faz <em>Desativar Droides</em> funcionar.</p><p><em>Variante para mesas mais duras: o aparato ganho ao subir de nível é de NT igual ou menor que o nível anterior — os brinquedos de ponta chegam com um nível de atraso.</em></p>" + "<p><strong>Você começa o jogo com três aparatos de NT 1 prontos.</strong> Eles não custam Créditos — você já os construiu antes de a campanha abrir. É o <strong>kit de partida</strong> da classe, dado <strong>uma vez</strong>, no 1º nível. Daí em diante, aparato se constrói ou se compra: o que o nível dá é <strong>NT</strong>, o alcance do que você consegue fabricar.</p><p><em>Sugestão de mesa: que um dos três seja o <strong>Disruptor Positrônico</strong> — é o aparato-assinatura da classe, é NT 1, e é o que faz</em> Desativar Droides <em>funcionar.</em></p>" + "<p>&#128260; <strong>Aparato destruído ou perdido:</strong> o projeto continua seu — refazer custa <strong>25% do valor e metade do tempo</strong>, como conserto. Construir um <strong>novo</strong> é preço e tempo cheios.</p>" + "<p>&#8987; <strong>Construir é atividade de entremeio:</strong> os tempos vão de 1d4 horas a 1d4 meses, e a construção acontece <strong>entre aventuras</strong>. Em cena, só se o Mestre declarar tempo parado.</p>" },
      { nome: "Desativar Droides", level: 1, desc: "<p>Com um <strong>disruptor positrônico</strong>, desativa droides a até <strong>18 metros</strong> que falhem num teste de Moral no fim da rodada.</p><p><strong>Destruição:</strong> se o droide falhar no teste <strong>e os dois dados saírem iguais</strong>, ele não é apenas desligado — é destruído.</p><p><strong>Tentativas extras:</strong> além dos usos seguros do dia dá para insistir, mas cada tentativa cumulativa torna o teste <strong>Difícil (−2)</strong> e depois <strong>Muito Difícil (−5)</strong>. Uma falha nessas condições causa um curto-circuito no disruptor, que precisa ser reparado.</p><p>No 1º nível, desativa droides sem bônus.</p>" +
        "<p><strong>Resistência por classe de droide:</strong> nem todo droide é igual diante de um disruptor. Aplique este ajuste <strong>ao Moral do alvo</strong> — quanto maior o Moral, mais difícil desligá-lo.</p>" +
        "<table><thead><tr><th>Classe do droide</th><th>Ajuste no Moral</th><th>Exemplos</th></tr></thead><tbody>" +
        "<tr><td>Serviçal, protocolo, astromecânico</td><td><strong>−2</strong></td><td>GNK, R2, C-3PO, droides de carga e mineração</td></tr>" +
        "<tr><td>Combate padrão</td><td><strong>—</strong></td><td>B1, droides de segurança, sondas</td></tr>" +
        "<tr><td>Combate avançado ou de comando</td><td><strong>+2</strong></td><td>B2 super battle droid, IG-88, comandos táticos</td></tr>" +
        "<tr><td>Blindado, único ou com escudo próprio</td><td><strong>+4</strong></td><td>Droideka, HK-47, magnaguardas, droides de guerra</td></tr>" +
        "</tbody></table>" +
        "<p class='nota-casa'><em>Por que assim: o Space Dragon tinha a tabela T3-2, com oito categorias de robô cruzadas com vinte níveis de disruptor — era ela que impedia um Cientista de 3º nível desligar o chefe da fase. A conversão para teste de Moral apagou essa granularidade; a tabela acima devolve o efeito sem a burocracia.</em></p>", level6: "<p><em>(a partir do 5º nível)</em> <strong>+1</strong> no teste de Moral e <strong>2 usos seguros por dia</strong>.</p>", level10: "<p><strong>+2</strong> no teste de Moral e <strong>3 usos seguros por dia</strong>.</p>" },
      { nome: "Desconto Tecnológico", level: 1, desc: "<p>Desconto em qualquer gasto com equipamentos: <strong>5%</strong>.</p>", level6: "<p><em>(a partir do 5º nível)</em> O desconto sobe para <strong>15%</strong>.</p>", level10: "<p>O desconto sobe para <strong>30%</strong>.</p>" },
      reputacao(),
    ],
  },
  {
    nome: "Técnico — Médico de Campo",
    tabela: "tecnico",
    coluna: "especial",
    dv: 8,
    high_level_hp_bonus: 1,
    flavor: "<p>O curandeiro. <em>Especialização de Técnico — base: Pesquisador.</em></p>",
    descricao:
      "<p><em>\"Enquanto houver um batimento, há trabalho a fazer.\"</em></p>" +
      "<p>O Médico de Campo é o Pesquisador que voltou as lentes para dentro do corpo. Onde o Engenheiro constrói e o Slicer invade, ele <strong>remenda, cura e mantém vivo</strong>. Como todo Pesquisador, prende-se a uma disciplina rígida: <strong>só usa armas e dispositivos que ele mesmo construiu</strong>.</p>" +
      "<p><strong>Perde</strong> <em>Operar e Consertar Máquinas</em> e <em>Desativar Droides</em>; o Desconto Tecnológico dá lugar a um <strong>Desconto Tecnológico Aprimorado</strong>.</p>" +
      "<p><strong>Sua caixa de ferramentas (onde é perito):</strong></p><ul>" +
      "<li><em>Cura direta:</em> Soro Reanimador · Pílula de Recuperação Rápida · Operação Cirúrgica Simples/Moderada/Complexa · Reanimar Cadáver.</li>" +
      "<li><em>Doença e veneno:</em> Diagnosticar Doença · Curar Doença · Identificar Veneno · Destilar Antídoto · Identificar Micro-organismo · Imunizar Paciente.</li>" +
      "<li><em>Suporte e aprimoramento:</em> Pílula de Aprimoramento · Aprimoramento Permanente · Fórmula de Controle Corporal · Respirador Subaquático.</li>" +
      "<li><em>Biônica:</em> Cirurgia Biônica · Membro Biônico · Órgão Biônico.</li>" +
      "<li><em>Preservação:</em> Hibernação Criogênica.</li></ul>" + NT_NOTA + NOTA_SPEC_MUNDANA,
    equipment_restrictions: {
      ...EQ_TECNICO,
      weapons: "Leve de energia e Utilitária — e, por disciplina do Pesquisador, apenas as que ele mesmo construiu.",
    },
    habilidades: [
      { nome: "Perito em Medicina", level: 1, desc: "<p>Cria aparatos e realiza feitos com <strong>Nível Tecnológico igual ao seu nível</strong> (NT máximo 10). Mas sobre os <strong>feitos e aparatos de cura e suporte</strong> da sua caixa de ferramentas, é um perito: realiza-os <strong>em metade do tempo</strong> e <strong>sem precisar de um laboratório completo</strong> — um kit de campo, uma maca improvisada e as próprias mãos bastam.</p><p>Ganha <strong>+1</strong> em todos os testes de Inteligência de diagnóstico, tratamento e cirurgia, e cada lote de consumíveis médicos que fabrica (injeções, pílulas, doses de antídoto) rende <strong>uma dose a mais</strong>. Quando é ele quem aplica uma <strong>Soro Reanimador</strong>, o paciente <strong>dispensa a JPC</strong> que o soro exige de quem tem ferimentos graves.</p>", level6: "<p><strong>Aparatos e Feitos Científicos Avançados:</strong> passa a criar aparatos e realizar feitos com <strong>Nível Tecnológico igual ao seu nível + 2</strong> (NT máximo 10) — medpacs de bacta, próteses cibernéticas, estimulantes e câmaras de recuperação anos além do que um técnico comum de seu nível alcançaria.</p>" },
      { nome: "Desconto Tecnológico Aprimorado", level: 3, desc: "<p>O desconto em qualquer gasto com equipamentos sobe para <strong>20%</strong>. Suprimentos de bacta, insumos cirúrgicos, componentes de prótese — tudo sai mais barato para quem compra em nome da cura.</p>", level6: "<p>O desconto sobe para <strong>35%</strong>.</p>", level10: "<p><strong>Autoridade Científica:</strong> os descontos chegam a <strong>50%</strong>. Em troca, submete-se a um <strong>rígido código de ética</strong>: está proibido de causar qualquer dano a seres vivos em combate, e prega que ninguém o faça. Se quebrar esse juramento, <strong>perde o acesso a todas as habilidades da especialização</strong> até realizar uma reparação adequada, a critério do Mestre.</p>" },
      reputacao("A fama do cirurgião que não perde paciente — abre hospitais, comitês, laboratórios e a confiança de quem está sangrando."),
    ],
  },
  {
    nome: "Técnico — Engenheiro",
    tabela: "tecnico",
    coluna: "especial",
    dv: 8,
    high_level_hp_bonus: 1,
    flavor: "<p>O inventor. <em>Especialização de Técnico — base: Inventor.</em></p>",
    descricao:
      "<p><em>\"Se existe, eu conserto. Se não existe, eu invento. Se quebrar, a culpa é da peça.\"</em></p>" +
      "<p>Construtores de droides (um Anakin criança), os engenheiros de estaleiro de Mon Cala, o gênio que monta uma nave com sucata.</p>" +
      "<p><strong>Perde</strong> <em>Operar e Consertar Máquinas</em> e <em>Desativar Droides</em>, começa com <strong>um aparato a menos</strong>, e paga <strong>prejuízo</strong> na bancada onde o Técnico tem desconto. É a trilha que mais perde — e a que ganha o pacote mais forte: <em>Tecnologia de Ponta</em> sozinha salta quatro Níveis Tecnológicos de uma vez, no 3º nível.</p>" + "<p><strong>Prejuízo Tecnológico — o que ele encarece, e o que não.</strong></p><p><strong>Encarece:</strong> aparatos e feitos científicos — construir, combinar, consertar e recarregar. É a bancada dele que custa caro.</p><p><strong>Não encarece:</strong> compra normal de equipamento. Um blaster, uma armadura, uma passagem ou um suborno custam a ele exatamente o que custam a qualquer um — ele apenas <strong>não tem o desconto</strong> do Técnico. Não é um mau comprador; é um construtor caro.</p><table><thead><tr><th>Nível</th><th>O aparato de 100 CR sai por</th></tr></thead><tbody><tr><td>1º</td><td><strong>105 CR</strong> (+5%)</td></tr><tr><td>3º</td><td><strong>115 CR</strong> (+15%)</td></tr><tr><td>6º</td><td><strong>130 CR</strong> (+30%)</td></tr><tr><td>10º</td><td><strong>150 CR</strong> (+50%)</td></tr></tbody></table><p>Enquanto os outros Técnicos compram e adaptam, ele insiste em fazer do zero — e do zero demora.</p>" + NT_NOTA + NOTA_SPEC_MUNDANA,
    equipment_restrictions: EQ_TECNICO,
    habilidades: [
      { nome: "Oficina do Inventor", level: 1, desc: "<p><em>(Aparatos e Feitos Científicos)</em> Cria máquinas e realiza experiências como um Técnico (NT = seu nível, máximo 10), mas com <strong>prejuízo tecnológico de 5%</strong> no custo de cada aparato e feito.</p><p>Começa com <strong>2 aparatos de NT 1</strong> prontos — um a menos que os outros Técnicos — e ganha <strong>+1 por nível</strong>.</p><p><em>O prejuízo vale só para a bancada: aparatos e feitos. Compra normal de equipamento sai pelo preço de tabela — ele não tem o desconto do Técnico, mas também não paga a mais.</em></p>" },
      { nome: "Tecnologia de Ponta", level: 3, desc: "<p>Salta direto para o <strong>5º Nível Tecnológico</strong> e evolui dali em diante, a cada nível (NT máximo 10). Prejuízo: <strong>15%</strong>.</p>" },
      { nome: "Engenho Improvisado", level: 6, desc: "<p>Combina até <strong>3 aparatos diferentes</strong> num só engenho: <strong>1-3 em 1d6</strong> (regras de combinação de aparatos do Space Dragon). Prejuízo: <strong>30%</strong>.</p>" },
      { nome: "Gênio da Invenção", level: 10, desc: "<p>Cria qualquer máquina e realiza qualquer experiência <strong>independente das condições</strong> — sem bancada, no meio de uma tempestade de areia, dentro de uma cela. Prejuízo: <strong>50%</strong>.</p>" },
      reputacao("O nome que faz um estaleiro abrir as portas e um cartel pagar adiantado."),
    ],
  },
  {
    nome: "Técnico — Slicer",
    tabela: "tecnico",
    coluna: "especial",
    dv: 8,
    high_level_hp_bonus: 1,
    flavor: "<p>O mestre dos sistemas. <em>Especialização de Técnico — base: Niilógico.</em></p>",
    descricao:
      "<p><em>\"A máquina não tem dono. Ela só ainda não me conheceu.\"</em></p>" +
      "<p>O Slicer é o Niilógico que deixou a lógica escorrer pelas beiradas. Onde o Médico cura e o Engenheiro constrói, ele <strong>conversa com as máquinas como quem sussurra segredos</strong> — e elas obedecem. Renegou o establishment tecnológico, seus fornecedores e seus selos de garantia.</p>" +
      "<p><strong>Perde</strong> <em>Operar e Consertar Máquinas</em> e o <em>Desconto Tecnológico</em>; <em>Desativar Droides</em> é substituída por <strong>Sequestrar Droides</strong> — no lugar de <em>desligar</em> um droide, ele aprendeu a <strong>tomá-lo para si</strong>.</p>" + NT_NOTA + NOTA_SPEC_MUNDANA,
    equipment_restrictions: EQ_TECNICO,
    habilidades: [
      { nome: "Aparatos e Feitos Científicos", level: 1, desc: "<p>Cria aparatos e realiza feitos em seus improvisos de laboratório, com <strong>Nível Tecnológico igual ao seu nível</strong> (NT máximo 10). Sem desconto nem prejuízo — o Slicer não barganha com ninguém: monta o que precisa com sucata, mercado negro e engenharia reversa, pagando o valor cheio dos componentes.</p>" },
      { nome: "Invasão de Sistemas", level: 3, desc: "<p><em>(Sabotagem)</em> O Slicer passa a sabotar, arrombar e reprogramar sistemas como um <strong>Operativo com um terço do seu nível</strong> — destranca fechaduras eletrônicas, derruba alarmes, força painéis e cofres de dados. Chance de <strong>1-2 em 1d6</strong>.</p>", level6: "<p>Chance de <strong>1-3 em 1d6</strong>.</p>", level10: "<p>Chance de <strong>1-4 em 1d6</strong>.</p>" },
      { nome: "Sequestrar Droides", level: 6, desc: "<p><em>(Controlar Robôs)</em> Em vez de neutralizar um droide, o Slicer o <strong>reprograma para servi-lo</strong>. Contra um droide que <strong>falhe num teste de Moral</strong>, ele assume o controle: numa falha comum, o alvo obedece a seus comandos por <strong>24 horas</strong>; se o droide falhar no teste <strong>com dois dados iguais</strong>, passa a servir o Slicer <strong>indefinidamente</strong>, até que alguém consiga reverter a intrusão.</p><p>É a marca do slicer: não destrói o exército de droides do inimigo — vira-o contra o dono.</p>" },
      { nome: "Faísca do Oculto", level: 10, desc: "<p><em>(Poderes Mentais)</em> De tanto mergulhar nos fluxos de dados e nos sistemas vivos das máquinas, a mente do Slicer <strong>passa a operar além dos limites normais da lógica e se conecta ao \"Espírito Galáctico\"</strong>. Ele manifesta <strong>poderes da Força de 1ª Grandeza</strong> da lista <strong>Universal</strong>, com <strong>Foco Diário igual ao seu modificador de Inteligência</strong> (mínimo 1).</p><p>⚠️ <strong>Exceção deliberada do cenário — não \"corrija\" isto.</strong> Em todo o resto do cenário a Força é regida pela <strong>Sabedoria</strong>. O Slicer é a única exceção, e é de propósito: ele não <em>sente</em> a Força, ele a <strong>arromba</strong> — chega ao Espírito Galáctico pela lógica, pelo cálculo e pela engenharia reversa.</p><p><strong>E por isso ele fica de fora das três engrenagens do Sensível.</strong> O Slicer <strong>não tem Caminho, não tem trilha de Corrupção e não tem Senda</strong> — logo <strong>não acessa <em>A Tentação</em></strong> (não há moeda para pagar: quem não corre risco de Queda não pode comprar nada da Sombra) <strong>nem o <em>Eco da Senda</em></strong> (não há Domínio). Se a mesa quiser um Slicer que flerte com a Sombra, o caminho é ele <strong>virar</strong> um Sensível à Força de verdade numa virada de campanha, não liberar a Tentação para ele.</p>" },
      reputacao("Um apelido de rede que ninguém sabe pronunciar em voz alta, mas que todo administrador de sistemas reconhece."),
    ],
  },

  // ══════════════════════════════════════════════════════════════════════════
  // SENSÍVEL À FORÇA — chassi Mentálico (d8)
  // ══════════════════════════════════════════════════════════════════════════
  {
    nome: "Sensível à Força",
    restricao_racas: RACAS_SENSIVEL,
    tabela: "sensivel",
    coluna: "normal",
    dv: 8,
    high_level_hp_bonus: 1,
    flavor: "<p>Jedi, Sith, Nightsisters e místicos de fronteira. <em>Chassi: Mentálico.</em></p>",
    descricao:
      "<p>Quem nasce com a Força mais forte nas veias é um <strong>Sensível à Força</strong> — uma classe-base que reskina os Poderes Mentais do Space Dragon como <strong>Poderes da Força</strong>. Corpo um pouco mais resistente que o do místico puro (Vida d8), mas Base de Ataque e Jogadas de Proteção fracas: a Força não faz do corpo uma arma — quem quer isso escolhe a especialização <strong>Guardião</strong>.</p>" +
      "<p><strong>Atributo-chave: Sabedoria</strong> (Foco da Força, testes de poder e o Duelo).</p><p class='nota-casa'><em>Adaptação deliberada do cenário: no Space Dragon os poderes mentais correm pela Inteligência. A Força do Jedi é sensibilidade e disciplina, não erudição.</em></p>" +
      "<p><strong>Créditos iniciais:</strong> 1d6 × 50 CR. <strong>Restrição:</strong> Droides não podem ser Sensíveis à Força.</p>" +
      FOCO_NOTA +
      "<p><strong>Foco Extra por Grandeza:</strong> some ao Foco Diário o Foco Extra lido na Tabela 1-2 do Estrela Dracônica — só que, aqui, pelo valor de <strong>Sabedoria</strong>. A tabela dá Foco Extra para 1ª, 2ª e 3ª Grandezas.</p>"
      + "<p><strong>Três regras da casa</strong> vivem nesta classe e valem para todas as Sendas: <strong>A Tentação</strong> (a Corrupção deixa de ser só castigo e vira moeda — a Força te dá o que você quer e cobra depois), o <strong>Eco da Senda</strong> (a partir do 10º nível o Foco gasto no seu próprio ofício às vezes volta) e, para o Guardião, o <strong>Mudar de Guarda</strong> (trocar de Forma de Sabre no meio do duelo). As três são detalhadas nas habilidades abaixo.</p>"
      + "<p><strong>Sendas (especializações):</strong> Guardião (sabre) · Consular (poderes) · Sentinela (caçador) · Vidente (os nexos da Força). Escolhidas no 1º nível e independentes do Caminho — existe Guardião da Luz e Guardião da Sombra.</p>"
      + NOTA_SENDA_SEM_ALINHAMENTO + FORA_DA_FAIXA_NOTA,
    equipment_restrictions: EQ_SENSIVEL,
    habilidades: [
      { nome: "Poderes da Força", level: 1, desc: "<p><em>(= Poderes Mentais)</em> Você canaliza a Força para mover, proteger, enganar ou destruir. Cada poder tem uma <strong>Grandeza</strong> (1ª a 10ª); o <strong>Foco Diário</strong> de cada uma vem da tabela da classe, somado ao <strong>Foco Extra</strong> da Sabedoria. Escolha livre entre a lista <strong>Universal</strong> e a do seu <strong>Caminho</strong>.</p>" + PODERES_CONHECIDOS_NOTA + "" },
      { nome: "Duelo da Força", level: 1, desc: "<p><em>(= Anulação e Contra-Ataque Mental)</em> Ao ser alvo de um poder da Força, você pode tentar <strong>anulá-lo</strong>: gaste Foco igual à Grandeza do poder e faça um <strong>teste resistido de Sabedoria</strong> contra quem o lançou. Antes de rolar, pode gastar Foco extra para <strong>+1 por ponto</strong> (o total gasto assim não pode exceder a Grandeza do poder resistido).</p><p>Num crítico (falha ou sucesso) há um <strong>choque da Força</strong>: um dos dois sofre <strong>1d4</strong> e faz <strong>JPS</strong> ou fica atordoado por 1d6 rodadas. Vencendo, você <strong>revida na hora</strong> com um poder seu (o agressor pode tentar anular).</p><p><em>Ataque de Sabedoria, defesa de JPS — não há duplicação: um alvo comum de um poder da Força rola JPS; só um Sensível pode gastar Foco para transformar aquilo num Duelo.</em></p>" },
      { nome: "Aprender Poderes da Força", level: 1, desc: "<p>O número da tabela é o <strong>piso garantido pelo nível</strong>; esta habilidade põe poderes <strong>acima</strong> dele — o holocron achado, o mestre que ensina, a técnica arrancada de um inimigo.</p><p>Por treino e intuição: gaste um uso do Foco da Grandeza desejada e passe num <strong>teste de Sabedoria</strong> — em sucesso o poder se manifesta, e você pode tentar <strong>memorizá-lo</strong> (novo teste) para usá-lo à vontade. Falha consome o uso e trava nova tentativa por 24 horas (falha crítica, 1d4 dias). Um mestre que o ensine torna o teste <strong>Fácil</strong>.</p>" },
      { nome: "O Caminho: Luz e Sombra", level: 1, desc: "<p>No 1º nível o Sensível escolhe um <strong>Caminho</strong>, que fica <em>por cima</em> da especialização e decide quais listas de poderes ele acessa.</p><ul><li><strong>Caminho da Luz</strong> — serenidade, defesa, cura, previdência. Acessa Universal + Luz.</li><li><strong>Caminho da Sombra</strong> — paixão, domínio, medo, destruição. Acessa Universal + Sombra.</li><li><strong>Neutralidade</strong> — pode começar sem Caminho declarado (só a lista Universal) e escolher mais tarde.</li></ul><p><strong>Cruzar de lista (a Queda):</strong> um personagem da Luz pode usar um poder da Sombra em desespero, mas cada uso marca <strong>+1 de Corrupção</strong>. Alguns poderes marcam Corrupção mesmo para a Sombra (vêm com ★ na lista).</p>" },
      { nome: "Corrupção — Queda e Redenção", level: 1, desc: "<p>A Corrupção é uma trilha de 0 a 10 que mede o quanto a Sombra já enraizou.</p><p><strong>Ganhar (+1):</strong> usar um poder da lista Sombra, usar qualquer poder para crueldade deliberada, ou ceder ao ódio numa cena-chave. <strong>Perder (−1):</strong> atos definidores de compaixão e sacrifício, meditação prolongada sob orientação, recusar o caminho fácil quando ele custa caro.</p><ul><li><strong>0–2 Sereno:</strong> sem penalidade.</li><li><strong>3–5 Marcado:</strong> olhos começam a amarelar sob esforço; testes sociais com não-corrompidos ficam Difíceis quando a Força é usada à vista.</li><li><strong>6–8 Tomado:</strong> surtos de fúria; o Mestre pode assumir uma ação em cena de estresse extremo.</li><li><strong>9 À beira:</strong> todas as penalidades de <em>Tomado</em> — e a Sombra passa a <strong>oferecer</strong> (ver <em>A Tentação</em>). Um passo do fim.</li><li><strong>10 Queda</strong> (Luz e neutro) ou <strong>Consumido</strong> (Sombra).</li></ul><p><strong>A Queda:</strong> ao chegar a Corrupção 10, um Sensível da Luz (ou neutro) cai — surto sombrio, troca definitiva para o Caminho da Sombra e uma marca física. Ao cair, sua Corrupção <strong>volta para 7</strong>: a Sombra deixou de ser um estranho dentro dele e virou casa.</p><p><strong>Consumido:</strong> ao chegar a Corrupção 10 já sendo do Caminho da Sombra, não sobra pessoa, só apetite. O personagem <strong>sai das mãos do jogador e vira NPC do Mestre</strong> — um Lorde Sith puro, um monstro que os antigos companheiros um dia terão de enfrentar. A Luz perde a alma; a Sombra perde a pessoa.</p><p class='nota-casa'><em>Criação da casa: a trilha de Corrupção nunca teve fim marcado para quem já era da Sombra, e passa a ter.</em></p><p><strong>A Redenção:</strong> exige reduzir a Corrupção a menos de 3 <em>e</em> um sacrifício definidor.</p>" },
      HAB_TENTACAO,
      HAB_ECO_SENDA,
      reputacao("O nome de um Mestre Jedi abre portas; o de um Lorde Sith \"funciona\" fechando as mesmas portas. Sob o Império, uma Reputação Jedi alta é tão útil quanto perigosa — o Mestre pode exigir que o teste seja rolado <em>contra</em> você."),
    ],
  },
  {
    nome: "Sensível à Força — Guardião",
    restricao_racas: RACAS_SENSIVEL,
    tabela: "sensivel",
    coluna: "especial",
    // Adestramento de Combate [1]: a Base de Ataque evolui como a de um
    // Veterano. A tabela já sai montada assim, para a ficha calcular certo.
    baDe: "veterano",
    dv: 8,
    high_level_hp_bonus: 1,
    // Sem trava de alinhamento: as Sendas do Sensível não têm restrição
    // (quem manda na moral dele é o Caminho — Luz/Sombra — e a Corrupção).
    flavor: "<p>O Jedi/Sith de sabre. <em>Especialização de Sensível à Força.</em></p>",
    descricao:
      "<p>Obi-Wan, Anakin, Ahsoka, Darth Maul, Darth Vader. A Força serve à lâmina.</p>" +
      "<p>Troca a amplitude do poder pela maestria da lâmina. Com o d8 da base, encara a linha de frente.</p>" +
      "<p><strong>Troca:</strong> seu <strong>teto de Grandeza passa a ser a 6ª</strong> — os feitos lendários (7ª a 10ª) ficam para os conjuradores. A lâmina cobra o preço da profundidade.</p>" +
      "<p><strong>Formas de Sabre:</strong> a Forma escolhida no 3º nível é sua <strong>Forma Mestra</strong> e progride inteira ([3]/[6]/[10]). No <strong>10º</strong> você aprende uma <strong>segunda Forma</strong> (até o [6]) e passa a poder <strong>trocar de Forma em combate</strong> gastando 1 turno; no <strong>15º</strong>, uma <strong>terceira</strong> (até o [3]) e a <em>Guarda Fluida</em>. Ver a habilidade <strong>Mudar de Guarda</strong>.</p>" + NOTA_SPEC + NOTA_SENDA_SEM_ALINHAMENTO,
    equipment_restrictions: {
      ...EQ_SENSIVEL,
      armors: "Leve e Média, sem escudo — exceção deliberada da Senda à restrição de armadura Leve do Sensível (o Jedi de armadura de guerra das Guerras Clônicas).",
    },
    habilidades: [
      { nome: "Adestramento de Combate", level: 1, desc: "<p>Sua <strong>Base de Ataque passa a evoluir como a de um Veterano</strong> (não mais a lenta do místico) e você usa <strong>armaduras médias</strong> sem penalizar a Força.</p><p><em>Na ficha: use a coluna de BA do Veterano no lugar da coluna desta classe.</em></p>" },
      { nome: "Formas de Sabre", level: 3, desc: "<p>Domina <strong>uma das sete Formas</strong> — Shii-Cho, Makashi, Soresu, Ataru, Djem So, Niman ou Juyo/Vaapad. A Forma é a linha de habilidades do Guardião: um poder de combate que <strong>progride com o nível</strong> nos degraus 3, 6 e 10.</p>", level6: "<p>A Forma escolhida avança para o seu segundo degrau.</p>", level10: "<p>A Forma escolhida avança para o seu degrau final.</p>" },
      { nome: "Investida da Força", level: 10, desc: "<p>Gastando <strong>1 de Foco</strong>, você desfere <strong>um ataque de sabre extra</strong> na rodada.</p>" },
      {
        nome: "Mudar de Guarda",
        level: 10,
        desc:
          "<p>Uma Forma não é um bônus: é <strong>como você fica de pé</strong>. Trocar de Forma no meio de um combate é abrir a guarda de propósito e recomeçar a leitura do inimigo — e o outro lado <strong>vê</strong> você fazendo isso. Custa caro, e ganha duelos: Obi-Wan não venceu Grievous com a Forma dos primeiros três minutos.</p>" +
          "<p><strong>Quantas Formas você conhece:</strong></p><ul>" +
          "<li><strong>3º nível — Forma Mestra:</strong> a primeira, a sua. Progride inteira: <strong>[3] → [6] → [10]</strong>.</li>" +
          "<li><strong>10º nível — segunda Forma</strong> à sua escolha, <strong>só até o degrau [6]</strong>.</li>" +
          "<li><strong>15º nível — terceira Forma</strong> à sua escolha, <strong>só até o degrau [3]</strong>.</li>" +
          "</ul><p><strong>Só a Forma Mestra chega ao [10].</strong> Esse é o eixo da regra e o motivo de ela não quebrar nada: você continua sendo <em>um</em> duelista com <em>um</em> estilo, e as outras Formas são respostas guardadas na manga. O Mestre Ataru que aprendeu Soresu não vira uma parede — ele consegue <strong>aguentar</strong> um tiroteio até voltar a dançar.</p>" +
          "<p><em>A segunda e a terceira Forma são aprendidas em jogo: exigem um mestre que as domine, um holocron de duelo, ou um adversário que as tenha usado contra você e sobrevivido para você estudar.</em></p>" +
          "<p><strong>A troca:</strong></p><ul>" +
          "<li><strong>Gasta 1 turno</strong> — toda a sua ação da rodada (sem ataque, sem poder, sem Duelo da Força). Você ainda pode <strong>se mover</strong>.</li>" +
          "<li><strong>É declarada em voz alta</strong> — inimigos com treino de sabre reconhecem a guarda nova e podem reagir a ela.</li>" +
          "<li><strong>Você fica aberto: −2 na CA</strong> até o seu próximo turno. Quem troca de Forma no meio do duelo aposta que a rodada perdida vale menos que as próximas cinco.</li>" +
          "<li><strong>Uma troca por rodada.</strong> Não existe alternar guarda a cada golpe.</li>" +
          "<li><strong>A Forma inicial é de graça:</strong> no começo de cada combate você declara em qual Forma entra, sem custo.</li>" +
          "</ul>" +
          "<p><strong>Guarda Fluida (15º):</strong> a troca passa a custar <strong>1 de Foco</strong> em vez do turno inteiro — <strong>uma vez por rodada</strong> e <strong>sem</strong> o −2 na CA.</p>" +
          "<p><em>Juyo/Vaapad:</em> trocar <strong>para</strong> a Forma feroz movido pela raiva é exatamente o gesto que a Sombra espera — o risco de +1 de Corrupção da <em>Fúria Canalizada</em> vale já naquele combate. Trocar <strong>para fora</strong> dela enquanto você ainda está ganhando é o tipo de recusa que rende <strong>−1 de Corrupção</strong>, a critério do Mestre.</p>" +
          "<p class='nota-casa'><em>Esta regra substitui a antiga nota opcional de \"aprender a técnica [6] de uma segunda Forma no 10º nível\", que era vaga e não dizia o que fazer com ela na mesa.</em></p>" +
          CAIXA_CASA(
            "de lá veio a ideia do Cavaleiro Jedi de 10º nível que ganha um segundo estilo de luta \"podendo alternar durante um duelo (…) <strong>essa ação leva 1 turno</strong>\", e um terceiro estilo mais tarde."
          ),
      },
      dominioDaSenda("Guardião", "O Corpo e a Lâmina", "a Força que <strong>empurra, sustenta, apara e golpeia matéria</strong> — telecinese aplicada ao mundo físico, mobilidade de combate, deflexão, e a mão que aperta uma garganta a dez metros."),
      reputacao(),
    ],
  },
  {
    nome: "Sensível à Força — Consular",
    restricao_racas: RACAS_SENSIVEL,
    tabela: "sensivel",
    coluna: "especial",
    dv: 8,
    high_level_hp_bonus: 1,
    // Sem trava de alinhamento (ver a classe-base).
    flavor: "<p>O Jedi/Sith conjurador. <em>Especialização de Sensível à Força.</em></p>",
    descricao:
      "<p>Yoda, Palpatine, Dooku, a Bruxa Mãe. A Força é a arma inteira — e o corpo, só o combustível.</p>" +
      "<p>Mergulha na Força até o fundo, deixando o corpo para trás. Alcança as <strong>Grandezas mais altas</strong> antes de todos — e, quando o Foco acaba, ainda tem a carne para queimar. O canhão de vidro que escolhe a hora de trincar.</p>" + NOTA_SPEC + NOTA_SENDA_SEM_ALINHAMENTO,
    equipment_restrictions: EQ_SENSIVEL,
    habilidades: [
      { nome: "Percepção Extrassensorial", level: 1, desc: "<p>Concentrando-se por 1 minuto, lê os pensamentos de criaturas inteligentes em <strong>18 metros</strong>, mesmo sem idioma comum. Não atravessa barreira grossa; com muitos alvos, gasta um turno extra para isolar a mente que quer.</p>" },
      { nome: "Mente Superior", level: 3, desc: "<p>Seu Foco da Força passa a contar como o de um Sensível <strong>+2 níveis</strong> — atinge as Grandezas altas mais cedo.</p>", level6: "<p><strong>Preço da Profundidade:</strong> o Foco passa a contar como <strong>+3 níveis</strong>. Além disso, você pode <strong>queimar 3 PV para comprar 1 ponto de Foco</strong> de qualquer Grandeza que já acesse, na hora da conjuração — sem limite de usos, mas o dano não é curável até um descanso longo.</p>" },
      { nome: "Ápice da Mente", level: 10, usos_dia: 1, desc: "<p>Uma vez por dia, você conjura um poder de <strong>uma Grandeza acima do seu teto atual</strong> ou <strong>dobra a área, a duração ou o número de alvos</strong> de um poder conhecido. Ao fazê-lo, faça <strong>JPC ou perca 1 de Constituição</strong> até o próximo descanso longo.</p><p>Se o feito for de <strong>10ª Grandeza</strong>, a perda de Constituição é <strong>permanente</strong> — e uma falha crítica significa <strong>morte por sobrecarga mental</strong>.</p>" },
      dominioDaSenda("Consular", "A Mente e o Domínio", "a Força que <strong>fala, convence, dobra e escraviza vontades</strong> — telepatia, sugestão, terror, ilusão e domínio, da conversa cordial à coroa na cabeça alheia."),
      reputacao(),
    ],
  },
  {
    nome: "Sensível à Força — Sentinela",
    restricao_racas: RACAS_SENSIVEL,
    tabela: "sensivel",
    coluna: "especial",
    dv: 8,
    high_level_hp_bonus: 1,
    // Sem trava de alinhamento (ver a classe-base).
    flavor: "<p>O equilíbrio — caçador e investigador. <em>Especialização de Sensível à Força.</em></p>",
    descricao:
      "<p>Kanan, Ezra, os Inquisidores caçando Jedi, os Guardas de Templo. A Força é ferramenta de sobrevivência.</p>" +
      "<p>Nem tanque nem canhão: o Sensível que se move pelo mundo real, farejando a Sombra e sobrevivendo a ela — caçador de Jedi renegados ou de Sith ocultos.</p>" + NOTA_SPEC + NOTA_SENDA_SEM_ALINHAMENTO,
    equipment_restrictions: EQ_SENSIVEL,
    habilidades: [
      {
        nome: "Ofícios do Submundo",
        level: 1,
        desc: "<p>Ganha <strong>três talentos de Operativo</strong> à escolha, com a chance de um Operativo de <strong>metade</strong> do seu nível — nível mínimo 1 (nunca cai abaixo disso).</p>",
        rogue_talents: [T.furtividade, T.sabotagem, T.escalar, T.rastrear, T.disfarce, T.vigilancia],
      },
      { nome: "Vontade Inquebrável", level: 3, desc: "<p>Suas Jogadas de Proteção contra poderes da Força e efeitos mentais são <strong>Fáceis</strong> — resiste ao Duelo e ao terror da Sombra melhor que qualquer um.</p>" },
      { nome: "Caçador da Força", level: 6, desc: "<p>Sente a presença de outros Sensíveis por perto e ganha <strong>vantagem no primeiro Duelo da Força</strong> de cada confronto.</p>" },
      { nome: "Progressão de Força", level: 10, desc: "<p>Mantém a coluna normal da tabela do Sensível — sem o teto do Guardião nem o salto do Consular. É o mais versátil dos três.</p>" },
      dominioDaSenda("Sentinela", "O Rastro e o Véu", "a Força que <strong>procura, revela e esconde</strong> — detectar, localizar, ler a verdade, apagar-se dos sentidos alheios e enfraquecer quem o caça."),
      reputacao(),
    ],
  },
  {
    nome: "Sensível à Força — Vidente",
    restricao_racas: RACAS_SENSIVEL,
    tabela: "sensivel",
    coluna: "especial",
    dv: 8,
    high_level_hp_bonus: 1,
    // Sem trava de alinhamento (ver a classe-base).
    flavor: "<p>O místico dos nexos. <em>Especialização de Sensível à Força — base: Radiestésico.</em></p>",
    descricao:
      "<p><em>\"A Força não está em mim. Eu é que estou nela.\"</em></p>" +
      "<p>As Nightsisters de Dathomir, Bendu, os místicos dos Whills, o guardião do Mundo-Entre-Mundos, a velha do vilarejo que sabia que você vinha.</p>" +
      "<p>Nem Jedi nem Sith: o Sensível que nunca passou por uma Ordem e aprendeu a Força ouvindo o <strong>lugar</strong>. Onde o Consular escava a própria mente e o Guardião treina o corpo, o Vidente <strong>puxa a Força do mundo ao redor</strong> — dos vivos, das raízes, das pedras, dos nexos onde a corrente corre grossa. É o místico de fronteira, a bruxa de Dathomir, o guardião de um templo esquecido, o eremita que sente uma nave se aproximar antes do sensor.</p>" +
      "<p><strong>Troca:</strong> o Vidente <strong>não é treinado</strong>. Nunca teve um mestre de sabre nem uma biblioteca de holocrons, e paga por isso: <strong>não pode usar sabre de luz sem a penalidade de quem não é Guardião</strong> (empunha, mas sem qualquer bônus de Forma) e seu <strong>teto de Grandeza é a 8ª</strong> — os feitos de 9ª e 10ª exigem uma disciplina formal que ele não tem.</p>" +
      "<p class='nota-casa'><em>Nota de conversão: esta Senda resgata o <strong>Radiestésico</strong> do Mentálico, que era a especialização Neutra da classe e tinha ficado de fora do cenário — o Sentinela ocupou a vaga sem herdar a mecânica. Canalizar a Força do ambiente é temático demais para Star Wars (Dathomir, a Ilha do Sagrado, os nexos) para ficar sem casa.</em></p>" +
      NOTA_SPEC + NOTA_SENDA_SEM_ALINHAMENTO,
    equipment_restrictions: {
      ...EQ_SENSIVEL,
      weapons: "Armas simples. Empunha o sabre de luz, mas sem treino formal: sofre a penalidade de quem não é Guardião e não recebe bônus de Forma alguma.",
    },
    habilidades: [
      { nome: "Sintonia com o Nexo", level: 1, desc: "<p>O Vidente <strong>sente a Força ao redor como quem sente vento</strong>. Percebe automaticamente lugares de convergência (nexos, templos, sítios de morte em massa), reconhece se um local tende à <strong>Luz ou à Sombra</strong> e sabe quando um Sensível esteve ali nas últimas <strong>24 horas</strong>.</p><p>Em compensação, sua sintonia é <strong>involuntária</strong>: energias soltas — raios, descargas, disparos de energia desviados, surtos de aparatos — são atraídas para ele com <strong>1-2 em 1d6</strong> sempre que ocorrerem por perto.</p>", level3: "<p>A atração involuntária de energia sobe para <strong>1-3 em 1d6</strong>.</p>", level6: "<p>A atração involuntária de energia sobe para <strong>1-4 em 1d6</strong>.</p>", level10: "<p>A atração involuntária de energia sobe para <strong>1-5 em 1d6</strong> — quanto mais sintonizado, mais o mundo o encontra.</p>" },
      { nome: "Comunhão", level: 3, usos_dia: 1, desc: "<p><strong>Uma vez por dia</strong>, o Vidente canaliza a Força que corre nos seres vivos inteligentes <strong>amigáveis ou neutros a até 20 metros</strong>. Ganha Foco extra igual à <strong>soma dos modificadores de Sabedoria</strong> de cada um deles, distribuído entre as Grandezas que ele já acessa — <strong>sem ultrapassar 1/4</strong> do seu Foco Diário total. O Foco assim obtido dura até ele <strong>dormir ou cair inconsciente</strong>.</p><p><em>Quem é canalizado não perde nada, mas sente: a cena pede descrição.</em></p>", level6: "<p><strong>Comunhão Profunda:</strong> a Comunhão passa a alcançar <strong>40 metros</strong> e o teto sobe para <strong>1/3</strong> do Foco Diário. Num <strong>nexo da Força</strong> (a critério do Mestre), o Vidente pode canalizar <strong>o próprio lugar</strong> em vez de pessoas, como se houvesse ali um número de criaturas com Sabedoria 18 igual ao seu nível de classe.</p>", level10: "<p><strong>Mente Coletiva:</strong> a Comunhão alcança <strong>100 metros</strong> e o teto sobe para <strong>metade</strong> do Foco Diário. Mas a fronteira entre ele e o mundo praticamente sumiu: ele <strong>interfere em ondas eletromagnéticas ao seu bel-prazer</strong> (comunicadores falham ou funcionam, sensores mentem, portas se abrem) — e a atração involuntária de energia agora é <strong>1-5 em 1d6</strong>. Estar perto do Vidente numa tempestade, num tiroteio de blasters ou numa sala de reatores é perigoso para ele <strong>e para quem está do lado</strong>.</p>" },
      dominioDaSenda("Vidente", "A Vida e a Presciência", "a Força que <strong>corre nos vivos e no tempo</strong> — curar, acalmar, suspender, prever e limpar o que a Sombra sujou; o único Domínio que inclui a cura, porque é o único que nunca aprendeu a Força como técnica."),
      reputacao(),
    ],
  },
];

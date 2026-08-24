// Feitos Científicos — transcrito de SW-SD-Feitos-Cientificos.md.
//
// A outra metade do ofício do Técnico. O aparato é coisa que se constrói e se
// carrega, e por isso vira Item; o feito é um PROCEDIMENTO — em geral sobre um
// paciente, em geral permanente — e não tem forma de item. Vai para o journal.
//
// A habilidade "Aparatos e Feitos Científicos" das quatro fichas de Técnico
// aponta para esta página: o cofre anunciava as duas famílias desde sempre e
// só descrevia uma.

function tabela(cabecalho, linhas) {
  return (
    "<table><thead><tr>" +
    cabecalho.map((c) => `<th>${c}</th>`).join("") +
    "</tr></thead><tbody>" +
    linhas.map((l) => "<tr>" + l.map((c) => `<td>${c}</td>`).join("") + "</tr>").join("") +
    "</tbody></table>"
  );
}

// [Feito, NT, Custo, Tempo, O que faz]
const CABECALHO = ["Feito", "NT", "Custo", "Tempo", "O que faz"];

const MEDICOS = [
  ["<strong>Diagnosticar doença</strong>", "1", "—", "1d10 min", "Descobre a <strong>causa</strong> — micro-organismo, veneno, radiação. Doença comum não pede teste; doença rara ou inédita pede <strong>Inteligência</strong>. Não cura: aponta o que curar"],
  ["<strong>Curar doença</strong>", "1", "variável", "variável", "Só depois do diagnóstico. Testes de <strong>Inteligência</strong> (Técnico) e <strong>JPC</strong> (paciente), quantos o Mestre pedir"],
  ["<strong>Operação cirúrgica simples</strong>", "2", "100 CR", "variável", "Extrair projétil, estancar hemorragia, suturar. Um ou mais testes de <strong>Inteligência</strong>, e o paciente faz o mesmo número de <strong>JPC</strong>"],
  ["<strong>Identificar veneno</strong>", "3", "—", "1d4 h", "Descobre como o veneno age. <strong>Pré-requisito do antídoto</strong>"],
  ["<strong>Destilar antídoto</strong>", "3", "800 CR", "1d4 h", "<strong>Uma dose</strong>, para um veneno já identificado. Neutraliza o efeito; <strong>não desfaz o dano já causado</strong>"],
  ["<strong>Operação cirúrgica moderada</strong>", "4", "2.000 CR", "variável", "Amputação, reconstrução de tecido. <strong>Falha em qualquer um dos testes = 3d6 de dano no paciente</strong>"],
  ["<strong>Operação cirúrgica complexa</strong>", "5", "3.000 CR", "variável", "Transplante de órgão, cirurgia cerebral. <strong>Falha = o paciente faz JPC ou morre</strong>"],
  ["<strong>Aprimoramento permanente</strong>", "5", "3.000 CR", "1d4 dias", "<strong>+2 permanentes num atributo</strong> — e <strong>−2 permanentes em outro da mesma categoria</strong> (físico com físico, mental com mental). <strong>Carisma</strong> pode subir prejudicando qualquer outro"],
  ["<strong>Cirurgia biônica</strong>", "6", "2.400 CR", "1d8 h", "Implanta um <strong>Membro</strong> ou <strong>Órgão Cibernético</strong>. O paciente faz <strong>JPC</strong>; falhando, o corpo rejeita e a cirurgia tem de ser refeita"],
  ["<strong>Imunizar paciente</strong>", "6", "variável", "variável", "Feito junto com a cura de uma doença: o paciente fica <strong>imune a ela para sempre</strong>, e resistente a parecidas"],
];

const GENETICOS = [
  ["<strong>Identificar espécie</strong>", "2", "—", "variável", "Nome biológico e hábitos de uma forma de vida não microbiana. Conforme o nível do Técnico, o Mestre solta ataques e atributos estimados — ou veta, se a espécie for rara"],
  ["<strong>Identificar micro-organismo</strong>", "4", "—", "1d8 h", "Nome científico e como se combate. Também diz se é uma variedade nova"],
  ["<strong>Decodificar DNA</strong>", "4", "3.200 CR", "1d4 meses", "<strong>Pré-requisito de clonagem, mutação e quimera.</strong> Funciona de micróbio a espécie complexa"],
  ["<strong>Clonagem animal</strong>", "5", "3.000 CR", "<strong>1 semana por DV</strong>", "Clone perfeito de um animal, a partir de DNA decodificado. Sem gestação"],
  ["<strong>Provocar mutação genética</strong>", "7", "7.000 CR", "1d8 sem.", "Altera características de uma espécie pelas regras de Aprimoramento e Degeneração do molde <strong>Mutante</strong>. Exige DNA decodificado"],
  ["<strong>Clonagem humana</strong>", "8", "8.000 CR", "<strong>1 mês por DV</strong>", "Clone de um humanoide. O original faz uma <strong>JPC</strong>: falhando, ele simplesmente <strong>não é clonável</strong>. O clone sai com as mesmas estatísticas — e <strong>sem a personalidade nem as memórias</strong>"],
  ["<strong>Combinar espécies</strong>", "9", "3.600 CR", "1d10 meses", "Quimera de duas espécies. Um teste de <strong>Inteligência por mês</strong>; <strong>duas falhas seguidas</strong> e o processo fracassa. Quimeras parte-humanas não têm direitos como cidadãs em lugar nenhum"],
  ["<strong>Criar nova espécie</strong>", "10", "6.000 CR", "1d4 anos", "Uma espécie inteira, do zero. Exige já ter feito decodificação, clonagem e combinação"],
];

const LABORATORIO = [
  ["<strong>Solidificar líquido</strong>", "3", "500 CR", "1d8 h", "Cristaliza qualquer líquido, que deixa de ferver, evaporar ou derreter. Reverte com algumas gotas do mesmo líquido"],
  ["<strong>Manutenção de droide</strong> <em>(reparos robóticos)</em>", "<strong>variável</strong>", "<strong>100 CR por NT</strong>", "1d10 min por NT", "Recupera <strong>1d10 PV</strong> de um corpo robótico <strong>por NT aplicado</strong>, até o NT do Técnico. <strong>Não</strong> serve para cérebro positrônico"],
  ["<strong>Montar um droide</strong>", "2+", "variável", "<strong>3 meses, no mínimo</strong>", "Constrói um droide que o obedece. <strong>Três sucessos consecutivos em 1d20</strong>, um por mês de trabalho, na dificuldade da categoria do droide. Custo a critério do Mestre. Um <strong>androide</strong> exige um cérebro positrônico"],
  ["<strong>Transplantar cérebro positrônico</strong>", "6", "—", "1d8 h", "Move um cérebro de um corpo robótico para outro. Um teste de <strong>Inteligência</strong> ao fim; falhando, refaz. O droide fica com <strong>−2 em tudo por 1d4 semanas</strong> de adaptação"],
  ["<strong>Construir cérebro positrônico</strong>", "8", "2.400 CR", "1d4 sem.", "O cérebro artificial em si — o que um androide exige para ser ativado. Também <strong>repara</strong> cérebros danificados"],
  ["<strong>Sondagem cerebral</strong>", "7", "5.000 CR", "1d4 h", "Sonda ligada ao cérebro de um paciente extrai <strong>qualquer informação</strong> que ele tenha, em áudio e vídeo, pela percepção dele. É interrogatório sem escapatória, e é tão sinistro quanto parece"],
  ["<strong>Congelamento em carbonita</strong> <em>(hibernação criogênica)</em>", "9", "5.500 CR", "indefinido", "Sono induzido <strong>virtualmente eterno</strong>. Exige <strong>manutenção anual</strong> pela regra de conserto; sem ela, <strong>10% cumulativos de defeito a cada 50 anos</strong>. O congelado acorda assim que o equipamento é desligado"],
  ["<strong>Reanimar cadáver</strong>", "10", "5.000 CR", "1d4 dias", "Traz um corpo de volta. Exige cérebro, coração e pulmões <strong>intactos</strong> (ou substituídos por órgãos cibernéticos) e <strong>morte há no máximo 48 horas</strong>. O reanimado <strong>não conserva personalidade nem memórias</strong>, e seus atributos mentais e sociais vão a <strong>0</strong>"],
];

export const feitosJournal = {
  title: "Feitos Científicos",
  pages: [
    {
      title: "Como funciona",
      content:
        "<p><strong>A outra metade do que o Técnico faz.</strong> Se o <strong>aparato</strong> é uma coisa que se constrói e se carrega, o <strong>feito</strong> é um procedimento que se realiza — em geral <strong>sobre um paciente</strong>, em geral <strong>permanente</strong>, e quase sempre mais demorado que montar uma engenhoca.</p>" +
        "<p>É daqui que saem a cirurgia, o antídoto, o membro cibernético, o clone, o droide construído do zero e o <strong>congelamento em carbonita</strong>.</p>" +
        "<p><strong>Só o Técnico realiza feitos científicos</strong> — e só ele, entre todas as classes. O acesso a materiais, laboratório e instalações é o mesmo da criação de aparatos: <strong>pague os Créditos da descrição</strong> e gaste o <strong>tempo listado</strong>, descontando o seu <strong>Desconto Tecnológico</strong> (5% no 1º nível, 15% no 5º, 30% no 10º).</p>" +
        "<p><strong>O Nível Tecnológico do feito é o mesmo eixo dos aparatos</strong>, e o seu NT é o seu nível de classe (máximo 10). Um Técnico de 4º nível realiza feitos de até NT 4.</p>" +
        "<h2>Duas diferenças em relação aos aparatos</h2>" +
        "<ul>" +
        "<li><strong>Muitos feitos não podem ser interrompidos.</strong> Cirurgia, transplante e reanimação exigem dedicação contínua durante todo o tempo listado. Os que levam semanas ou meses têm pausa natural e podem ser divididos entre sessões.</li>" +
        "<li><strong>A maioria é permanente.</strong> Não há \"recarga\" nem \"conserto\" de feito. O que foi feito, está feito.</li>" +
        "</ul>" +
        "<p>&#9888; <strong>Onde o feito pede rolagem.</strong> Vários pedem <strong>teste de Inteligência</strong> do Técnico e <strong>JPC</strong> do paciente. Onde o Space Dragon dizia <em>teste de Ciência</em>, leia <strong>Inteligência</strong>; onde dizia <em>JPF</em>, leia <strong>JPC</strong>.</p>",
    },
    {
      title: "Feitos médicos",
      content:
        "<p>O quintal do <strong>Médico de Campo</strong>, e a razão de a trilha existir.</p>" +
        tabela(CABECALHO, MEDICOS) +
        "<p><strong>A cirurgia biônica é a que mais aparece em jogo.</strong> Os aparatos <strong>Membro Cibernético</strong> (NT 6, 2.400 CR) e <strong>Órgão Cibernético</strong> (NT 7, 3.000 CR) do catálogo <strong>exigem este feito</strong> para serem implantados — o catálogo já dizia isso, apontando para uma regra que não existia no cenário. Agora existe. Custo total de um braço novo: <strong>2.400 do membro + 2.400 da cirurgia</strong>.</p>" +
        "<p><em>É também a resposta mecânica para a imagem mais recorrente da galáxia: a mão decepada. Um PJ que perde um membro não fica aleijado para sempre — fica devendo 4.800 CR e uma JPC.</em></p>",
    },
    {
      title: "Feitos genéticos",
      content:
        "<p>Onde a galáxia guarda os Kaminoanos, o Exército Clone e as coisas que dão errado.</p>" +
        tabela(CABECALHO, GENETICOS) +
        "<p><strong>O clone não é o original, e é isso que faz a coisa render.</strong> Nenhum feito de clonagem transfere personalidade ou memória — o corpo é idêntico e a pessoa não está lá. Um clone de um PJ morto é um estranho com o rosto dele, e a mesa decide o que isso significa.</p>",
    },
    {
      title: "Feitos de laboratório e robótica",
      content:
        tabela(CABECALHO, LABORATORIO) +
        "<p><strong>Manutenção de droide é como um PJ Droide se cura.</strong> A espécie <strong>não regenera PV sozinha</strong> — não dorme para recuperar, não bebe poção. É este feito, ou uma cura tecnológica, ou nada. Uma tripulação com um Droide na ficha e nenhum Técnico tem um problema de logística permanente, e isso é de propósito.</p>" +
        "<p><em>Custo real: 100 CR e 1d10 minutos por NT aplicado, recuperando 1d10 PV cada. Um Técnico de 4º nível pode aplicar até 4 NT de uma vez — 400 CR por 4d10 PV.</em></p>" +
        "<p><strong>A carbonita é um feito, não um aparato.</strong> É NT 9: fora do alcance de qualquer Técnico jogável abaixo do 9º nível, o que é exatamente o certo. Quando ela aparecer na sua campanha, vai ser porque um <strong>cartel ou um caçador de recompensas</strong> pagou por ela — e é assim que se prende um herói sem matá-lo.</p>",
    },
    {
      title: "Contratar quem faz — Serviços Científicos",
      content:
        "<p>Uma tripulação sem Técnico não fica de fora disso: paga alguém.</p>" +
        tabela(
          ["Serviço", "Preço"],
          [
            ["<strong>Identificar</strong> um aparato ou relíquia tecnológica", "<strong>NT × 100 CR</strong>"],
            ["<strong>Reparar</strong> um aparato ou relíquia", "<strong>metade do valor</strong> do aparato"],
            ["<strong>Encomendar a construção</strong> de um aparato", "<strong>o dobro</strong> do preço de tabela"],
            ["<strong>Encomendar um feito científico</strong>", "<strong>o triplo</strong> do preço de tabela"],
          ],
        ) +
        "<p>O Mestre decide se o cientista que a doca oferece <strong>é capaz</strong> do que se pede — um NT alto não se encontra em qualquer estação de fronteira, e às vezes o serviço em si é a aventura.</p>" +
        "<p class='nota-casa'><em>Duas notas de conversão. \"Encomendar aparato = dobro\" e \"feito = triplo\" são as razões originais do livro, e razão não precisa de conversão de escala — valem como estão. Identificar e reparar eram NT × 1.000 e NT × 5.000 no livro; convertidos por ÷100 dariam NT × 10 e NT × 50 CR, o que produzia absurdos nas duas pontas: identificar uma relíquia NT 7 custaria 70 CR, menos que uma refeição decente, enquanto reparar um Cortador de Fusão de 40 CR custaria 50. Foram recalibrados: identificar vira uma hora de especialista por degrau de NT, e reparar vira metade do valor — o dobro do que o Técnico pagaria por conta própria (¼), que é justamente a margem de quem terceiriza.</em></p>" +
        "<p class='nota-casa'><em>Regras e lista de Feitos Científicos do Space Dragon (cap. 8), trazidas por inteiro conforme instrui o guia \"Jogando Space Dragon com Old Dragon 2\" de Francisco Martellini. Preços passados pela escala de Créditos deste cenário; nomes de Star Wars onde havia equivalente óbvio (hibernação criogênica → carbonita, reparos robóticos → manutenção de droide, construir robô → montar um droide).</em></p>",
    },
  ],
};

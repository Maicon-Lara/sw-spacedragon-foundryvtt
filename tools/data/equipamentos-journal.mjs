// Journal de equipamento — transcrito de SW-SD-Equipamentos.md.
//
// O que vira Item vive em equipamentos.mjs. O que vai aqui é o que NÃO tem
// forma de item: as regras de uso que a tabela pressupõe (Porte,
// Disponibilidade, surpresa, mexer no que não é seu) e as tabelas de serviço,
// que são preços de coisas que ninguém carrega na ficha.
//
// O índice por Nível Tecnológico do cofre NÃO é repetido aqui: o pack de
// equipamentos já agrupa os aparatos em subpastas por NT, e uma segunda cópia
// da mesma lista seria a primeira a ficar desatualizada.

function tabela(cabecalho, linhas) {
  return (
    "<table><thead><tr>" +
    cabecalho.map((c) => `<th>${c}</th>`).join("") +
    "</tr></thead><tbody>" +
    linhas.map((l) => "<tr>" + l.map((c) => `<td>${c}</td>`).join("") + "</tr>").join("") +
    "</tbody></table>"
  );
}

export const equipamentosJournal = {
  title: "Equipamento — regras de uso e serviços",
  pages: [
    {
      title: "Quem pode usar o quê",
      content:
        "<p>Toda arma traz uma etiqueta de <strong>Uso</strong> e toda armadura uma de <strong>Tipo</strong>, e é com essas duas palavras que as classes escrevem as suas restrições. A etiqueta está na descrição de cada item do compêndio.</p>" +
        "<h2>As três etiquetas de arma</h2>" +
        "<ul>" +
        "<li><strong>Leve</strong> — arma de uma mão que qualquer pessoa treinada maneja: pistolas blaster, adagas, lâminas curtas, cassetetes.</li>" +
        "<li><strong>Marcial</strong> — exige treino de soldado: rifles, carabinas, lanças, machados, tudo que é Média ou Grande.</li>" +
        "<li><strong>Utilitária</strong> — engenhoca ou ferramenta que se aciona, não que se esgrime: granadas, detonadores, lançador de rede, cortador de fusão. <strong>Não exige treino de combate</strong> — é por isso que o Técnico e o Sabotador jogam granada sem ser gente de guerra.</li>" +
        "</ul>" +
        "<h2>A tabela mestra</h2>" +
        tabela(
          ["Classe", "Armas", "Armaduras", "Escudo", "Aparatos"],
          [
            [
              "<strong>Veterano</strong> <em>(e Mercenário, Caçador de Recompensas, Emissário)</em>",
              "Leve · Marcial · Utilitária",
              "Leve · Média · <strong>Pesada</strong>",
              "<strong>sim</strong>",
              "defensivos e utilitários — o <strong>Caçador de Recompensas</strong> opera ofensivos também",
            ],
            [
              "<strong>Operativo</strong> <em>(e Espião, Contrabandista, Assassino, Sabotador)</em>",
              "Leve · Utilitária — <strong>nenhuma de Duas Mãos</strong>",
              "Leve · Média",
              "não",
              "utilitários",
            ],
            [
              "<strong>Técnico</strong> <em>(e Médico de Campo, Engenheiro, Slicer)</em>",
              "Leve <strong>de energia</strong> · Utilitária",
              "Leve",
              "não",
              "<strong>constrói e opera todos</strong>",
            ],
            [
              "<strong>Sensível à Força</strong> <em>(e Consular, Sentinela, Vidente)</em>",
              "<strong>sabre de luz</strong> · Leve",
              "Leve",
              "não",
              "utilitários",
            ],
            [
              "<strong>Guardião</strong> <em>(Senda do Sensível)</em>",
              "<strong>sabre de luz</strong> · Leve",
              "Leve · <strong>Média</strong>",
              "não",
              "utilitários",
            ],
          ],
        ) +
        "<h2>O que acontece se usar fora da faixa</h2>" +
        "<p>Vestir armadura mais pesada que a permitida, ou empunhar arma fora da lista, <strong>não é proibido pelo universo — é proibido pelo treino</strong>. O personagem sofre <strong>−2 em todas as rolagens de ataque</strong> com a arma e <strong>perde o acesso às habilidades de classe que dependem de mobilidade ou de precisão</strong> enquanto estiver assim: os <strong>talentos do Operativo</strong>, a <strong>Forma de Sabre</strong> do Guardião, o <strong>Ataque Furtivo</strong>. As habilidades passivas continuam valendo.</p>" +
        "<p><em>Antes esta consequência só estava escrita para o Operativo; as outras três classes ficavam em silêncio.</em></p>" +
        "<h2>Porte — quantas mãos a arma pede</h2>" +
        tabela(
          ["Porte", "Como se usa"],
          [
            ["<strong>Pequena</strong>", "Uma mão. Pode ser usada <strong>com as duas mãos</strong> para <strong>+2 na rolagem de ataque</strong>"],
            ["<strong>Média</strong>", "Preferencialmente duas mãos. Pode ser empunhada <strong>com uma mão só</strong>, ao custo de <strong>−2 no ataque</strong>"],
            ["<strong>Grande</strong>", "<strong>Sempre</strong> as duas mãos. Não há como usá-la com uma"],
          ],
        ) +
        "<p><em>É a regra de Porte do Space Dragon. O cenário herdou os rótulos Pequena/Média/Grande e a etiqueta Duas Mãos, mas nunca escreveu o que eles faziam. Ela dá uma opção real a quem precisa de uma mão livre: um Rifle Blaster empunhado numa mão só é −2, não é proibido.</em></p>" +
        "<h2>Disponibilidade — o que a lei deixa você carregar</h2>" +
        "<p>Não muda nada em combate: muda <strong>onde você compra</strong> e <strong>o que acontece se um posto de controle te revistar</strong>.</p>" +
        tabela(
          ["Faixa", "O que significa"],
          [
            ["<strong>—</strong>", "Livre. Se vende em qualquer doca, e ninguém olha duas vezes"],
            ["<strong>Licenciada</strong>", "Precisa de licença de porte. Fácil de obter num mundo civilizado, e um caçador de recompensas registrado tem a dele"],
            ["<strong>Restrita</strong>", "Mercado cinzento. Não se compra numa loja de superfície — se compra de um contato, num cais, numa sala dos fundos"],
            ["<strong>Militar</strong>", "Só forças armadas. Um civil com isso na mão está <strong>roubando de alguém</strong>, e o dono vai querer de volta"],
            ["<strong>Ilegal</strong>", "Proibido em toda parte que se diga civilizada. Portar já é crime, e usar é o que fecha o caso"],
            ["<strong>Rara</strong>", "Não é questão de lei, é de <strong>existir</strong>. Não tem preço de prateleira: consegue-se por herança, conquista ou uma aventura inteira"],
          ],
        ) +
        "<p><strong>A regra, em uma frase:</strong> fora dos mundos de fronteira, portar item Restrito, Militar ou Ilegal <strong>de forma visível</strong> atrai a lei. Escondido, é um <strong>teste de Destreza</strong> contra a revista — Fácil se for pequeno, Difícil se for Grande, impossível se for uma armadura.</p>" +
        "<p><em>Esta coluna é escolha de projeto, não conserto: não vem do Space Dragon, vem da adaptação \"Star Wars para Space Dragon\" de Jonas Picholaro (CC BY 3.0). Se a sua mesa achar burocrático, ignore a coluna inteira e nada mais quebra. Um desvio consciente da fonte: o Picholaro marca a pistola blaster pesada como Militar; aqui ela é Restrita, porque o Blaster Pesado de 300 CR é a arma do contrabandista, não a do exército.</em></p>",
    },
    {
      title: "Surpresa, emboscada e mexer no que não é seu",
      content:
        "<h2>Surpresa e emboscada</h2>" +
        "<p>O Old Dragon 2 resolve surpresa com <strong>1d6: surpreendido em 1-2</strong>. O que faltava era o que o Space Dragon tinha e ninguém converteu — <strong>os fatores que mexem nessa chance</strong>, e o que exatamente acontece com quem foi pego.</p>" +
        "<p><strong>Some e subtraia da faixa</strong> (mínimo: ninguém é surpreendido · máximo: 1-5 em 1d6):</p>" +
        tabela(
          ["Situação", "Chance de surpreender"],
          [
            ["O grupo se move em silêncio", "<strong>+1</strong>"],
            ["Emboscada com cobertura preparada ou camuflagem", "<strong>+2</strong>"],
            ["Aproximação furtiva — <em>Furtividade</em> bem-sucedida", "<strong>+3</strong>"],
            ["Pouca luz, fumaça, tempestade de areia", "<strong>+2</strong>"],
            ["O alvo está relaxado: acampado, bebendo, dormindo", "<strong>+1</strong>"],
            ["O alvo está atento, com sentinela postada ou alarme disparado", "<strong>−3</strong>"],
          ],
        ) +
        "<p><strong>Quem é surpreendido não age na primeira rodada e sofre −2 na CA até o fim dela.</strong></p>" +
        "<p><em>Sobre o −2: no Space Dragon a penalidade era −5 de CP. Foi comprimida pela mesma proporção que o Estrela Dracônica usou ao converter os efeitos críticos de nave (−5 → −2, −10 → −1) — a escala de CA do OD2 é mais apertada que a de CP, e −5 numa CA de 13 é praticamente um acerto automático. −2 já faz a emboscada valer a pena sem transformá-la em execução.</em></p>" +
        "<h2>Quando você mexe no que não é seu</h2>" +
        "<p>Três coisas neste cenário são exclusivas de uma classe — os <strong>talentos</strong> do Operativo, os <strong>aparatos</strong> fora da sua faixa e os <strong>feitos</strong> do Técnico. Isso não quer dizer que ninguém mais possa tentar; quer dizer que <strong>quem não é da área tenta mal</strong>.</p>" +
        tabela(
          ["A situação", "Quem não é da área"],
          [
            [
              "<strong>Achar e desarmar uma armadilha</strong> <em>(talento do Operativo)</em>",
              "<strong>1 em 1d6</strong>, ou um teste <strong>Difícil</strong> de Sabedoria para achar e de Inteligência para desarmar. <strong>Falhar dispara a armadilha</strong>",
            ],
            [
              "<strong>Operar um aparato fora da faixa da sua classe</strong> — o Operativo pega o aparato ofensivo do Técnico caído",
              "<strong>1 em 1d6</strong>. Na falha, o aparato <strong>sofre curto-circuito</strong> e precisa de reparo antes de funcionar de novo",
            ],
            [
              "<strong>Realizar um feito científico</strong> sem ser Técnico",
              "<strong>Não dá.</strong> Cirurgia, clonagem e cérebro positrônico não têm versão improvisada — é a única das três que fecha de vez",
            ],
          ],
        ) +
        "<p><em>Esta regra existia no Space Dragon como porcentagem de aptidão tecnológica, e o Estrela Dracônica a converteu para 1 em 1d6 — mas o cenário nunca a repetiu, o que fazia parecer que a resposta era \"não pode\", quando a resposta certa é <strong>\"pode, mal, e provavelmente vai quebrar\"</strong>. É a diferença entre travar a cena e deixar o jogador tentar.</em></p>",
    },
    {
      title: "Serviços, despesas e contratação",
      content:
        "<p>Entre uma aventura e outra, é aqui que o Crédito significa alguma coisa.</p>" +
        "<h2>Vida cotidiana <em>(por dia, salvo indicação)</em></h2>" +
        tabela(
          ["Serviço", "Econômico", "Comum", "Bom", "Luxuoso"],
          [
            ["<strong>Refeição</strong>", "1 CR", "5 CR", "25 CR", "70 CR"],
            ["<strong>Alojamento</strong>", "10 CR", "25 CR", "50 CR", "100 CR"],
          ],
        ) +
        "<h2>Transporte</h2>" +
        tabela(
          ["Serviço", "Custo"],
          [
            ["Aluguel de moto speeder / speeder terrestre / speeder aéreo <em>(por dia)</em>", "20 / 50 / 250 CR"],
            ["Passagem interplanetária <em>(por dia de viagem, por pessoa)</em>", "900 CR"],
            ["Taxa de pouso numa estação ou doca <em>(por dia)</em>", "20 – 100 CR, conforme o mundo"],
          ],
        ) +
        "<h2>Cuidados médicos</h2>" +
        tabela(
          ["Serviço", "Custo"],
          [
            ["Cuidados médicos / aplicação de medpac <em>(por dia)</em>", "150 CR"],
            ["Tanque de bacta <em>(por hora)</em>", "150 CR"],
            ["Cirurgia <em>(por hora)</em>", "250 CR"],
            ["Tratar doença <em>(por dia)</em>", "250 CR"],
            ["Tratar veneno <em>(por dia)</em>", "50 CR"],
            ["Tratar envenenamento por radiação <em>(por dia)</em>", "500 CR"],
          ],
        ) +
        "<h2>Contratar tripulação</h2>" +
        "<p>Numa estação populosa se contrata quem falta ao grupo. <strong>Preço por mês de serviço</strong>; combate perigoso costuma pedir um bônus por fora, e nenhum contratado morre de graça pelos PJs.</p>" +
        tabela(
          ["Contratado", "Custo", "O que entrega"],
          [
            ["Guarda-costas", "200 CR", "Um corpo a mais na porta. Não segue os PJs para dentro de encrenca"],
            ["Piloto", "300 CR", "Tira a nave do chão sem ninguém do grupo largar o que está fazendo"],
            ["Mecânico", "500 CR", "Mantém a nave voando entre aventuras"],
            ["Médico", "1.500 CR", "Estabiliza, trata e opera"],
            ["Especialista", "3.000 CR", "Slicer, arqueólogo, intérprete — o que a missão exigir"],
          ],
        ) +
        "<p><strong>Contratado não é seguidor.</strong> Os <strong>seguidores</strong> do Emissário e do Contrabandista são leais por vínculo e limitados pelo Carisma; estes aqui são <strong>pagos</strong>, e param de aparecer no dia em que o pagamento para. Contam à parte.</p>" +
        "<p><em>Duas fontes: a tabela de tripulação vem dos serviços de estação espacial do Space Dragon (T10-8), pela régua ÷100. A de vida cotidiana e transporte vem da adaptação de Jonas Picholaro (CC BY 3.0), reescalada — os valores originais pressupunham uma pistola blaster a 500 CR, e aqui ela custa 150. O período de contratação (por mês) é leitura da casa: o livro traz o preço e não diz o prazo.</em></p>",
    },
  ],
};

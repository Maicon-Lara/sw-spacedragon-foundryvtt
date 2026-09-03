// Poderes da Força de "Star Dragon" — transcritos de
// SW-SD-Poderes-da-Forca.md.
//
// Os poderes do cenário são os Poderes Mentais do Space Dragon reskinados e
// distribuídos em três listas — Universal, Luz e Sombra — ao longo de dez
// GRANDEZAS (1ª a 10ª). O tipo "spell" do sistema OD2 só conhece círculos de
// 1 a 5, então:
//
//   • 1ª a 5ª Grandeza  → viram itens "spell" (circle = número da Grandeza).
//   • 6ª a 10ª Grandeza → NÃO viram spell; ficam só no JournalEntry de
//     referência, com o texto completo.
//
// O JournalEntry (poderesJournal) lista TODOS os poderes, de 1ª a 10ª, para
// consulta na mesa.
//
// school é definido pelo grupo (folder), não repetido item a item:
//   Universal → "arcane" | Luz → "divine" | Sombra → "necromancer"
//
// Poderes marcados com ★ são sempre corruptores: marcam +1 de Corrupção
// mesmo para quem já trilha a Sombra.

const CORRUPCAO =
  "<p><strong>★ Marca +1 de Corrupção sempre — inclusive para quem já trilha a Sombra.</strong></p>";

const g = (n) => `<p><strong>Grandeza:</strong> ${n}ª</p>`;

import { FOCO_NOTA, GRANDEZAS_REFERENCIA } from "./classes.mjs";

export const listasDePoder = [
  {
    folder: "Universal",
    school: "arcane",
    poderes: [
      {
        nome: "Detectar a Força",
        circle: 1,
        range: "100 m + 10 m/nível",
        duration: "instantâneo",
        jp: "nenhuma",
        reverse: false,
        desc:
          g(1) +
          "<p><strong>Alcance:</strong> 100 m + 10 m/nível · <strong>Duração:</strong> instantâneo · <strong>JP:</strong> nenhuma</p><p>Intui a <strong>direção</strong> e <strong>qual poder</strong> foi usado. Só capta poderes <strong>em execução naquele momento</strong> ou de <strong>efeito prolongado</strong> sobre um local.</p>" +
          "<p>Você abre os sentidos e a Força responde: sente a assinatura viva de criaturas, o peso de lugares carregados, o brilho latente de um cristal ou artefato, e o rastro fresco de qualquer poder usado por perto há pouco. Não diz nomes nem intenções — apenas <em>que ali há Força, e quanto</em>. É o primeiro poder de todo aprendiz e o radar silencioso do grupo.</p>" +
          "<p><em>Poder-base: Detectar Poderes Mentais (1ª).</em></p>",
      },
      {
        nome: "Truque Mental",
        circle: 1,
        range: "Visual",
        duration: "instantâneo",
        jp: "JPS",
        reverse: false,
        desc:
          g(1) +
          "<p><strong>Alcance:</strong> Visual · <strong>Duração:</strong> instantâneo · <strong>JP:</strong> JPS</p>" +
          "<p>O clássico aceno de mão e \"não são os droides que você procura\". Você impõe uma sugestão simples e curta a uma mente fraca, que a aceita como ideia própria — a sugestão é obedecida na hora e o alvo racionaliza o ato depois.</p>" +
          "<p>A frase deve ser <strong>imperativa, curta e com um só verbo</strong>, jamais ilógica ou letal. Só afeta alvos com <strong>DV até metade do seu nível</strong> (mínimo 1) — <strong>mentes fortes, líderes decididos e droides são imunes</strong> —, e o alvo ainda tem direito a uma <strong>JPS</strong> para resistir. Serve para abrir uma porta, dispensar um guarda ou desviar uma suspeita, nunca para forçar um ato contra a própria natureza.</p>" +
          "<p><em>(adaptação do cenário — não use o poder-base do v1.0.)</em></p>",
      },
      {
        nome: "Empurrão da Força",
        circle: 1,
        range: "18 metros",
        duration: "instantâneo",
        jp: "JPD",
        reverse: false,
        desc:
          g(1) +
          "<p><strong>Alcance:</strong> 18 metros · <strong>Duração:</strong> instantâneo · <strong>JP:</strong> JPD</p>" +
          "<p><strong>JP:</strong> JPD</p>" +
          "<p>Um estouro breve de telecinese: você lança a mão e a vontade contra um alvo, empurrando-o <strong>3 metros</strong> para trás e, se ele falhar numa <strong>JPD</strong>, derrubando-o. Alternativamente, arremessa um objeto solto por perto como projétil, causando <strong>1d6</strong> de dano. É a semente do Empurrão maior — no baixo nível, o suficiente para jogar um inimigo do parapeito ou abrir espaço num corredor.</p>" +
          "<p><em>(adaptação — 1ª.)</em></p>",
      },
      {
        nome: "Sentir o Perigo",
        circle: 1,
        range: "pessoal",
        duration: "até o próximo ataque-surpresa da cena",
        jp: "nenhuma",
        reverse: false,
        desc:
          g(1) +
          "<p><strong>JP:</strong> nenhuma</p>" +
          "<p>A Força formiga na nuca um instante antes do golpe. Como premonição passiva, você recebe <strong>+2 na JPD</strong> contra o próximo ataque-surpresa ou armadilha da cena. É a voz muda que faz o Jedi se abaixar sem saber por quê.</p>" +
          "<p><em>(adaptação — 1ª.)</em></p>",
      },
      {
        nome: "Vínculo Telepático",
        circle: 1,
        range: "1 km/nível",
        duration: "30 minutos/nível",
        jp: "nenhuma",
        reverse: false,
        desc:
          g(1) +
          "<p><strong>Alcance:</strong> 1 km/nível · <strong>Duração:</strong> 30 minutos/nível · <strong>JP:</strong> nenhuma</p><p>Você mantém <strong>tantos vínculos quanto metade do seu nível</strong>. O vínculo se perde se o alvo sair do alcance, ficar inconsciente ou morrer.</p>" +
          "<p>Você tece um fio mental com um aliado conhecido e conversa mente a mente, sem palavra falada, à distância. Útil para coordenar uma infiltração em silêncio ou pedir socorro sem acionar um comunicador rastreável. O vínculo carrega intenção e imagens simples, não frases longas nem segredos que o outro não queira dar.</p>" +
          "<p><em>Poder-base: Conexão Psíquica (1ª).</em></p>",
      },
      {
        nome: "Percepção Ampliada",
        circle: 2,
        duration: "1 minuto",
        jp: "nenhuma",
        range: "18 metros",
        reverse: false,
        desc:
          g(2) +
          "<p><strong>Alcance:</strong> 18 metros</p>" +
          "<p>Sua consciência se espalha pela cena e lê as <strong>superfícies de pensamento</strong> — humores, intenções imediatas, a tensão de quem esconde algo — em até <strong>18 metros</strong>. Ajuda a farejar uma mentira mal contada, sentir um disfarce que não convence ou perceber a emboscada antes de ela estourar.</p>" +
          "<p><em>(adaptação — 2ª; ver Detectar Invisibilidade/Mentiras, 2ª.)</em></p>",
      },
      {
        nome: "Véu da Força",
        circle: 2,
        range: "pessoal (ou toque)",
        duration: "1 hora por nível",
        jp: "nenhuma",
        reverse: false,
        desc:
          g(2) +
          "<p><strong>Alcance:</strong> pessoal (ou toque) · <strong>Duração:</strong> 1 hora por nível · <strong>JP:</strong> nenhuma</p>" +
          "<p>Você recolhe a própria assinatura na Força até virar um vazio morno, indistinguível de pedra ou de gente comum. Enquanto o Véu dura, <strong>Detectar a Força, Percepção Ampliada, Localizar pela Força e Caçador da Força não o encontram</strong>, e um Sensível que o observe diretamente precisa vencer um <strong>teste resistido de Sabedoria</strong> contra você para perceber que há algo ali. Por toque, você pode velar <strong>outra criatura</strong> em vez de si mesmo.</p>" +
          "<p>Não esconde o corpo: o Véu engana a Força, não os olhos, os sensores, nem os droides. E ele <strong>cai no instante em que você usa qualquer outro poder</strong> — a Força volta a acender no mapa, e quem procurava sabe exatamente onde você estava.</p>" +
          "<p class='nota-casa'><em>(adaptação do cenário — 2ª; ver Apagar Rastros Mentais, 6ª.) O poder-base apaga o rastro de um poder já usado — passado, não presente. O Véu resolve o outro lado: esconder quem você é enquanto não faz nada. É a mecânica que explica como um Jedi sobrevive à Ordem 66 — e por que um Sensível escondido não pode usar a Força para resolver problemas.</em></p>",
      },
      {
        nome: "Localizar pela Força",
        circle: 2,
        range: "18 metros + 2 m por nível",
        duration: "concentração",
        jp: "nenhuma",
        reverse: false,
        desc:
          g(2) +
          "<p><strong>Alcance:</strong> 18 metros + 2 m por nível · <strong>Duração:</strong> concentração · <strong>JP:</strong> nenhuma</p>" +
          "<p>Você fixa na mente um objeto, uma nave ou uma pessoa que já conheceu e a Força aponta a <strong>direção</strong> dela, como uma bússola viva. Não dá distância exata nem mapa, mas basta para seguir um rastro pela galáxia: um padawan perdido, um artefato roubado, o cargueiro que fugiu.</p>" +
          "<p><em>(adaptação — 2ª.)</em></p>",
      },
      {
        nome: "Correr com a Força",
        circle: 3,
        range: "pessoal",
        duration: "1 rodada por nível",
        jp: "nenhuma",
        reverse: false,
        desc:
          g(3) +
          "<p><strong>Alcance:</strong> pessoal · <strong>Duração:</strong> 1 rodada por nível · <strong>JP:</strong> nenhuma</p>" +
          "<p><strong>Efeito:</strong> Dobra o deslocamento e concede uma <strong>ação extra de movimento</strong> por rodada.</p>" +
          "<p>A Força alimenta os músculos e o tempo parece afinar: você <strong>dobra o deslocamento</strong> e ganha uma <strong>ação extra de movimento</strong> na rodada. É o borrão que cruza o hangar antes das portas fecharem.</p>" +
          "<p><em>(adaptação — 3ª.)</em></p>",
      },
      {
        nome: "Salto da Força",
        circle: 3,
        range: "pessoal",
        duration: "instantâneo",
        jp: "nenhuma",
        reverse: false,
        desc:
          g(3) +
          "<p><strong>Alcance:</strong> pessoal · <strong>Duração:</strong> instantâneo · <strong>JP:</strong> nenhuma</p>" +
          "<p><strong>Efeito:</strong> Salta até <strong>3 metros por nível</strong> na horizontal (metade na vertical) e <strong>ignora todo o dano de queda</strong> ao pousar.</p>" +
          "<p>Um impulso telecinético lança seu corpo a <strong>alturas e distâncias enormes</strong> — telhados, plataformas, o convés de uma nave em fuga — e você <strong>ignora o dano de queda</strong> ao pousar. O salto assinatura do duelista que reaparece de cima.</p>" +
          "<p><em>(adaptação — 3ª.)</em></p>",
      },
      {
        nome: "Ampliar Poder",
        circle: 3,
        range: "Pessoal",
        duration: "variável",
        jp: "nenhuma",
        reverse: false,
        desc:
          g(3) +
          "<p><strong>Alcance:</strong> Pessoal · <strong>Duração:</strong> variável · <strong>JP:</strong> nenhuma</p><p>Amplia em <strong>10%</strong> a duração do poder acompanhado, ou muda a sua <strong>forma de alcance</strong>. Gasta-se o Foco <strong>do poder principal E da ampliação, somados</strong>.</p>" +
          "<p>Em vez de um efeito novo, você molda um poder que já domina: <strong>estende sua duração</strong> ou <strong>muda a forma do alcance</strong> (de um alvo para uma pequena área, de toque para curta distância). O poder de refinar a própria técnica, gastando Foco para fazer um truque simples render mais.</p>" +
          "<p><em>Poder-base: Ampliar Poder Mental (3ª).</em></p>",
      },
      {
        nome: "Telecinésia",
        circle: 4,
        range: "10 m + 1 m/nível",
        duration: "10 segundos/nível, exigindo concentração",
        jp: "JPD para metade",
        reverse: false,
        desc:
          g(4) +
          "<p><strong>Alcance:</strong> 10 m + 1 m/nível · <strong>Duração:</strong> 10 segundos/nível, exigindo concentração · <strong>JP:</strong> JPD para metade</p>" +
          "<p>O controle telecinético pleno: você move, ergue e sustenta objetos à distância com precisão de mão invisível — arranca uma arma, fecha uma comporta, empilha destroços numa barricada, arremessa cargas como projéteis de guerra.</p>" +
          "<p><strong>Peso máximo: 100 kg por nível</strong> do Sensível (o objeto se move até 3 m por rodada). Um objeto arremessado causa <strong>1d6</strong> (miudezas e mobília), <strong>3d6</strong> (uma carga pesada, uma moto-speeder) ou <strong>5d6</strong> (destroços de nave, um bloco de alvenaria), com <strong>JPD</strong> para metade. Sustentar um alvo <em>vivo</em> é <strong>Prisão Telecinética</strong> (5ª), não este poder.</p>" +
          "<p><em>(adaptação do cenário — não use o poder-base do v1.0.)</em> O erguer-um-caça continua sendo façanha de mestre: Yoda, no 15º nível, chega a 1.500 kg — e o Mestre pode permitir mais em cena de clímax, com vários turnos de concentração e um teste de Sabedoria.</p>",
      },
      {
        nome: "Olho da Força",
        circle: 4,
        range: "100 metros + 10 m por nível",
        duration: "12 turnos",
        jp: "nenhuma",
        reverse: false,
        desc:
          g(4) +
          "<p><strong>Alcance:</strong> 100 metros + 10 m por nível · <strong>Duração:</strong> 12 turnos · <strong>JP:</strong> nenhuma</p>" +
          "<p>Você projeta um <strong>sensor invisível</strong> que se desprende de você e percorre o ambiente à distância, transmitindo de volta o que \"vê\" e \"ouve\". Um olho espião feito de pura percepção, ideal para vasculhar o corredor seguinte, contar guardas ou espiar uma reunião sem pôr um pé na sala.</p>" +
          "<p><em>(adaptação — 4ª.)</em></p>",
      },
      {
        nome: "Prisão Telecinética",
        circle: 5,
        range: "Visual",
        duration: "30 segundos/nível",
        jp: "JPS",
        reverse: false,
        desc:
          g(5) +
          "<p><strong>Alcance:</strong> Visual · <strong>Duração:</strong> 30 segundos/nível · <strong>JP:</strong> JPS</p><p>Afeta uma criatura com <strong>tantos DV quantos forem os seus níveis</strong>.</p>" +
          "<p>A garra telecinética levada ao extremo: você fecha o punho da vontade em torno de <strong>corpo e nervo</strong> de uma criatura, ainda que poderosa, e a trava no lugar — músculos presos, arma imóvel no ar. Onde a Estase apenas paralisa um humanoide, esta prende feras, brutamontes e alvos que uma mente fraca jamais seguraria.</p>" +
          "<p><em>Poder-base: Imobilizar Criatura (5ª).</em></p>",
      },
    ],
  },
  {
    folder: "Luz",
    school: "divine",
    poderes: [
      {
        nome: "Repelir a Sombra",
        circle: 2,
        range: "toque",
        duration: "10 minutos",
        jp: "nenhuma",
        reverse: false,
        desc:
          "<p>Você marca alguém — a si mesmo, se quiser — com uma quietude que a Sombra não " +
          "gosta de tocar.</p>" +
          "<p>Enquanto dura, as <strong>JPS do alvo contra qualquer poder da lista Sombra são " +
          "Fáceis (+2)</strong>, e criaturas visivelmente corrompidas <strong>não conseguem " +
          "encostar nele</strong>: podem atirar, podem usar poderes, mas a mão não fecha a " +
          "distância.</p>" +
          "<p>Se o próprio alvo <strong>atacar corpo a corpo</strong>, o afastamento cai — a " +
          "proteção não cobre quem avança.</p>",
      },
      {
        nome: "Vínculo da Díade",
        circle: 5,
        range: "ilimitado",
        duration: "até ser desfeito por um dos dois",
        jp: "nenhuma (exige consentimento)",
        reverse: false,
        desc:
          "<p>Duas pessoas passam a ser <strong>uma só coisa na Força</strong>. A qualquer " +
          "distância, cada uma <strong>vê e ouve o lugar onde a outra está</strong> por alguns " +
          "instantes, sente o que ela sente e sabe quando ela está em perigo.</p>" +
          "<p>Uma vez por dia, um objeto <strong>pequeno o bastante para caber na mão</strong> " +
          "pode passar de uma para a outra — e é assim que uma lâmina chega a quem precisa " +
          "dela.</p>" +
          "<p>Só é possível manter <strong>um Vínculo por vez</strong>.</p>",
      },
      {
        nome: "Cura pela Força",
        circle: 1,
        range: "toque",
        duration: "instantâneo",
        jp: "nenhuma",
        reverse: false,
        desc:
          g(1) +
          "<p><strong>Alcance:</strong> toque · <strong>Duração:</strong> instantâneo · <strong>JP:</strong> nenhuma</p>" +
          "<p><strong>Efeito:</strong> Restaura <strong>1d8 pontos de vida</strong>.</p>" +
          "<p>Pela imposição das mãos e da vontade serena, você fecha feridas e <strong>restaura pontos de vida</strong> de um aliado (ou de si). Não ressuscita nem regenera membros, mas tira o companheiro da beira da morte no meio da luta — a mão que muitos padawans aprendem cedo, e que a Sombra despreza por não render poder.</p>" +
          "<p><em>(adaptação — 1ª.)</em></p>",
      },
      {
        nome: "Calma",
        circle: 1,
        range: "Visual",
        duration: "o resto da cena",
        jp: "nenhuma",
        reverse: false,
        desc:
          g(1) +
          "<p><strong>Alcance:</strong> Visual · <strong>Duração:</strong> o resto da cena · <strong>JP:</strong> nenhuma</p>" +
          "<p>Você toca a emoção de um aliado e <strong>dissipa o medo e o pânico</strong>, firmando-o contra novo terror pelo resto da cena. A voz baixa que faz o soldado tremendo levantar a arma de novo.</p>" +
          "<p><em>Poder-base: Ajustar Emoções (1ª).</em></p>",
      },
      {
        nome: "Lâmina Guiada",
        circle: 1,
        duration: "10 rodadas",
        jp: "nenhuma",
        range: "toque",
        reverse: false,
        desc:
          g(1) +
          "<p><strong>Alcance:</strong> toque</p>" +
          "<p>Você entrega a mão que empunha à Força, e ela guia o golpe: pela duração, seus <strong>ataques com a arma tocada</strong> (o sabre, tipicamente) tornam-se <strong>Fáceis</strong>. Não é fúria — é a certeza tranquila de quem deixa a Força mirar por si.</p>" +
          "<p><em>(adaptação — 1ª.)</em></p>",
      },
      {
        nome: "Serenidade",
        circle: 2,
        range: "pessoal",
        duration: "enquanto você não atacar",
        jp: "JPS",
        reverse: false,
        desc:
          g(2) +
          "<p><strong>Duração:</strong> enquanto você não atacar · <strong>JP:</strong> JPS</p>" +
          "<p>Você se recolhe numa quietude tão profunda que os inimigos custam a te ver como ameaça: enquanto <strong>você não atacar</strong>, cada um que quiser te golpear precisa antes passar numa <strong>JPS</strong>. A calma do monge que atravessa o tiroteio sem sacar a lâmina.</p>" +
          "<p><em>(adaptação — 2ª.)</em></p>",
      },
      {
        nome: "Discernir a Verdade",
        circle: 2,
        range: "Visual",
        duration: "1 minuto",
        jp: "nenhuma",
        reverse: false,
        desc:
          g(2) +
          "<p><strong>Alcance:</strong> Visual · <strong>Duração:</strong> 1 minuto · <strong>JP:</strong> nenhuma</p>" +
          "<p>Você ouve não só as palavras, mas a intenção sob elas, e <strong>sabe quando lhe mentem</strong>. Não revela a verdade escondida — apenas acende o alarme de que aquilo é falso. O dom que desmonta o vilão cordial na mesa de negociação.</p>" +
          "<p><em>Poder-base: Detectar Mentiras (2ª).</em></p>",
      },
      {
        nome: "Cura de Aflições",
        circle: 3,
        jp: "nenhuma",
        range: "toque",
        duration: "instantâneo",
        reverse: false,
        desc:
          g(3) +
          "<p><strong>Alcance:</strong> toque · <strong>Duração:</strong> instantâneo</p>" +
          "<p>Você entra na mente ferida de um aliado e <strong>acalma o espírito quebrado</strong>, estabilizando quem foi despedaçado por tortura, terror ou um poder da Sombra. <strong>Toque · instantâneo, sem dano.</strong></p>" +
          "<p>Encerra na hora <strong>medo, pânico, terror, confusão e atordoamento</strong>, e <strong>cancela um efeito mental ou da Força em curso sobre o alvo, de até 3ª Grandeza</strong> (poderes de Grandeza maior exigem <em>Dissipar a Sombra</em>). Não cura pontos de vida — isso é <em>Cura pela Força</em>. Para insanidade permanente ou trauma enraizado, use <em>Curar Insanidade</em> (8ª) do v1.0.</p>" +
          "<p><em>(adaptação do cenário — não use o poder-base do v1.0.)</em></p>",
      },
      {
        nome: "Dissipar a Sombra",
        circle: 3,
        range: "10 m + 1 m/nível",
        duration: "instantâneo",
        jp: "nenhuma (teste resistido)",
        reverse: false,
        desc:
          g(3) +
          "<p><strong>Alcance:</strong> 10 m + 1 m/nível · <strong>Duração:</strong> instantâneo · <strong>JP:</strong> nenhuma (teste resistido)</p>" +
          "<p>Você desfaz o tecido de um poder inimigo, <strong>cancelando poderes da Força e efeitos sobrenaturais ativos</strong>. O antídoto direto contra a magia da Sombra em campo — apaga o terror, solta o estrangulamento, dissipa as trevas.</p>" +
          "<p>Funciona como o <strong>Duelo da Força</strong>, inclusive quanto a gastar Foco extra para bônus — mas o alvo <strong>não</strong> ganha a chance de revidar, e o sucesso significa que o poder foi simplesmente <strong>dissipado</strong>.</p>" +
          "<p><em>Poder-base: Dissipar Poder Mental (3ª).</em></p>",
      },
      {
        nome: "Coragem",
        circle: 3,
        range: "18 metros",
        duration: "10 rodadas",
        jp: "JPS (inimigos)",
        reverse: false,
        desc:
          g(3) +
          "<p><strong>Alcance:</strong> 18 metros · <strong>Duração:</strong> 10 rodadas · <strong>JP:</strong> JPS (inimigos)</p>" +
          "<p><strong>Efeito:</strong> Aliados que o escutem ganham <strong>+1 em ataque e em JP a cada 3 níveis</strong> seus; inimigos que falhem na JPS sofrem a mesma penalidade.</p>" +
          "<p>Você irradia uma aura de firmeza: <strong>aliados na área ganham bônus</strong> (ataque/moral) e <strong>inimigos sofrem penalidade</strong> enquanto ela dura. A presença que transforma um punhado de rebeldes assustados numa linha que segura.</p>" +
          "<p><em>(adaptação — 3ª.)</em></p>",
      },
      {
        nome: "Deflexão da Força",
        circle: 3,
        range: "pessoal",
        duration: "1 rodada por nível",
        jp: "JPD",
        reverse: false,
        desc:
          g(3) +
          "<p><strong>Alcance:</strong> pessoal · <strong>Duração:</strong> 1 rodada por nível · <strong>JP:</strong> JPD</p>" +
          "<p><strong>Efeito:</strong> Disparos dirigidos a você exigem que o atirador vença sua <strong>JPD</strong>; falhando, o tiro é aparado no ar.</p>" +
          "<p>Você ergue um campo de vontade que <strong>repele projéteis e disparos de blaster</strong>, aparando-os no ar. É a base mecânica da deflexão com o sabre das <strong>Formas do Guardião</strong>: com a lâmina, os tiros voltam; sem ela, apenas se desviam. O muro que faz um Jedi caminhar contra um pelotão.</p>" +
          "<p><em>(adaptação — 3ª.)</em></p>",
      },
      {
        nome: "Estase da Força",
        circle: 3,
        range: "Visual",
        duration: "30 segundos/nível",
        jp: "JPS nega",
        reverse: false,
        desc:
          g(3) +
          "<p><strong>Alcance:</strong> Visual · <strong>Duração:</strong> 30 segundos/nível · <strong>JP:</strong> JPS nega</p><p>Afeta um humanoide com <strong>tantos DV quantos forem os seus níveis</strong>.</p>" +
          "<p>Você prende a vontade de um humanoide e o <strong>paralisa no lugar</strong> (uma <strong>JPS</strong> nega). A Luz a usa para conter sem ferir — segurar o fugitivo, congelar o refém-tomador, encerrar a briga antes do sangue.</p>" +
          "<p><em>Poder-base: Imobilizar Pessoa (3ª).</em></p>",
      },
      {
        nome: "Premonição",
        circle: 4,
        range: "pessoal",
        duration: "instantâneo",
        jp: "nenhuma",
        reverse: false,
        desc:
          g(4) +
          "<p><strong>Alcance:</strong> pessoal · <strong>Duração:</strong> instantâneo · <strong>JP:</strong> nenhuma</p>" +
          "<p><strong>Efeito:</strong> Uma pergunta sobre um curso de ação <strong>imediato</strong> (a próxima hora); o Mestre responde <em>favorável</em>, <em>desfavorável</em> ou <em>nublado</em>.</p>" +
          "<p>Você abre uma fresta no fluxo do tempo e a Força <strong>sinaliza a sabedoria de um curso imediato</strong> — se aquela porta esconde uma cilada, se este acordo leva à ruína. Dá um sim/não ou uma imagem-relâmpago, não uma profecia detalhada (o <strong>Vidente</strong> do Consular aprofunda isto).</p>" +
          "<p><em>(adaptação — 4ª.)</em></p>",
      },
      {
        nome: "Libertar da Corrupção",
        circle: 4,
        range: "toque",
        duration: "instantâneo",
        jp: "JPS (se resistir)",
        reverse: false,
        desc:
          g(4) +
          "<p><strong>Alcance:</strong> toque · <strong>Duração:</strong> instantâneo · <strong>JP:</strong> JPS (se resistir)</p>" +
          "<p><strong>Efeito:</strong> Remove <strong>1 ponto de Corrupção</strong> do alvo e quebra um domínio mental imposto por poder da Sombra. Uma vez por alvo por descanso longo.</p>" +
          "<p>Pela Luz, você <strong>alivia a Corrupção que domina um alvo</strong> e <strong>quebra domínios mentais</strong> impostos por poderes da Sombra (a critério do Mestre). O toque redentor que arranca alguém das garras do Lado Sombrio — raro, difícil e nunca garantido.</p>" +
          "<p><em>(adaptação — 4ª.)</em></p>",
      },
      {
        nome: "Visão da Verdade",
        circle: 5,
        range: "pessoal",
        duration: "10 rodadas",
        jp: "nenhuma",
        reverse: false,
        desc:
          g(5) +
          "<p><strong>Alcance:</strong> pessoal · <strong>Duração:</strong> 10 rodadas · <strong>JP:</strong> nenhuma</p>" +
          "<p>Seus olhos passam a enxergar <strong>através de ilusões, disfarces, invisibilidade e mentiras da percepção</strong>. O metamorfo, o feitiço de sombra, o inimigo oculto — tudo se revela. Muito Jedi: ver o que é, não o que querem que você veja.</p>" +
          "<p><em>(adaptação — 5ª.)</em></p>",
      },
      {
        nome: "Cura Maior",
        circle: 5,
        range: "toque",
        duration: "instantâneo",
        jp: "nenhuma",
        reverse: false,
        desc:
          g(5) +
          "<p><strong>Alcance:</strong> toque · <strong>Duração:</strong> instantâneo · <strong>JP:</strong> nenhuma</p>" +
          "<p><strong>Efeito:</strong> Restaura <strong>3d8 pontos de vida</strong>; se o alvo estiver com PV negativos, também o estabiliza.</p>" +
          "<p>A cura levada ao limite da Luz: você <strong>restaura grande soma de pontos de vida</strong> ou traz um aliado da beira da morte de volta à luta em uma ação. O milagre que salva o herói caído no clímax.</p>" +
          "<p><em>(adaptação — 5ª.)</em></p>",
      },
    ],
  },
  {
    folder: "Sombra",
    school: "necromancer",
    poderes: [
      {
        nome: "Rasgar a Mente",
        circle: 5,
        range: "toque, ou 10 metros com esforço",
        duration: "instantâneo",
        jp: "JPS",
        reverse: false,
        desc:
          "<p>Você não pergunta: <strong>entra e arranca</strong>.</p>" +
          "<p>Falhando na JPS, o alvo entrega <strong>uma informação específica</strong> que " +
          "você tenha declarado buscar — um nome, um lugar, um rosto, uma senha — e sofre " +
          "<strong>2d6 de dano</strong>, ficando com <strong>−2 em todas as rolagens por 1d6 " +
          "horas</strong>.</p>" +
          "<p>Um <strong>sucesso</strong> na JPS ainda causa <strong>metade do dano</strong>: a " +
          "tentativa machuca mesmo quando falha.</p>" +
          "<p>Alvos que já sofreram este poder <strong>reconhecem a sensação</strong> e passam a " +
          "temer quem o usou.</p>",
      },
      {
        nome: "Choque da Força",
        circle: 1,
        range: "Visual",
        duration: "instantâneo",
        jp: "nenhuma",
        reverse: false,
        desc:
          g(1) +
          "<p><strong>Alcance:</strong> Visual · <strong>Duração:</strong> instantâneo · <strong>JP:</strong> nenhuma</p>" +
          "<p>Você concentra a Força num raio breve e o descarrega no alvo, causando <strong>1d6</strong> de dano (<strong>+2 por Foco extra gasto, até +10</strong>), <strong>sem direito a JPS</strong>. É o \"Force lightning\" menor, o primeiro fio de eletricidade da Sombra e o gatilho dos <strong>Relâmpagos</strong> que virão.</p>" +
          "<p><em>Poder-base: Disparo Mental (1ª).</em></p>",
      },
      {
        nome: "Toque Sombrio",
        circle: 1,
        duration: "instantâneo",
        range: "toque",
        jp: "JPC",
        reverse: false,
        desc:
          g(1) +
          "<p><strong>Alcance:</strong> toque · <strong>JP:</strong> JPC</p>" +
          "<p>Você toca a vítima e verte podridão pela pele: <strong>1d4</strong> de dano e, se ela falhar numa <strong>JPC</strong>, <strong>drena 1 ponto de vitalidade</strong>. O beijo frio do Lado Sombrio, que fere e enfraquece de uma vez.</p>" +
          "<p><em>(adaptação — 1ª.)</em></p>",
      },
      {
        nome: "Aterrorizar",
        circle: 2,
        range: "10 m + 3 m/nível",
        duration: "30 segundos/nível",
        jp: "JPS nega",
        reverse: false,
        desc:
          g(2) +
          "<p><strong>Alcance:</strong> 10 m + 3 m/nível · <strong>Duração:</strong> 30 segundos/nível · <strong>JP:</strong> JPS nega</p><p>Afeta inimigos com <strong>até 5 DV</strong> ao alcance.</p>" +
          "<p>Você projeta uma onda de pavor e <strong>inimigos fracos na área ficam apavorados</strong>: testes Difíceis, e <strong>1 em 1d6 de largar o que seguram</strong> a cada rodada (uma <strong>JPS</strong> nega). O grito silencioso que esvazia a coragem de um pelotão.</p>" +
          "<p><em>Poder-base: Aterrorizar (2ª).</em></p>",
      },
      {
        nome: "Enfraquecimento",
        circle: 2,
        range: "Visual",
        duration: "30 segundos/nível",
        jp: "JPS resiste",
        reverse: false,
        desc:
          g(2) +
          "<p><strong>Alcance:</strong> Visual · <strong>Duração:</strong> 30 segundos/nível · <strong>JP:</strong> JPS resiste</p><p>O alvo sofre <strong>−2 no atributo Força</strong>.</p>" +
          "<p>Você mina por dentro a <strong>força física e a resolução</strong> de um alvo, que definha e vacila (uma <strong>JPS</strong> resiste). Deixa o brutamontes fraco e o herói inseguro na hora exata do confronto.</p>" +
          "<p><em>Poder-base: Enfraquecimento (2ª).</em></p>",
      },
      {
        nome: "Manto de Escuridão",
        circle: 2,
        range: "18 metros",
        duration: "10 rodadas",
        jp: "nenhuma",
        reverse: false,
        desc:
          g(2) +
          "<p><strong>Alcance:</strong> 18 metros · <strong>Duração:</strong> 10 rodadas · <strong>JP:</strong> nenhuma</p>" +
          "<p><strong>Efeito:</strong> Esfera de <strong>6 metros de raio</strong> de trevas sobrenaturais; quem não tem infravisão fica <strong>cego</strong> dentro dela, e você e os que designar enxergam normalmente.</p>" +
          "<p>Você invoca <strong>trevas sobrenaturais</strong> que engolem a luz e <strong>cegam quem não enxerga no escuro</strong>, enquanto você e os seus se movem à vontade nelas. O breu que precede a chacina.</p>" +
          "<p><em>(adaptação — 2ª.)</em></p>",
      },
      {
        nome: "Relâmpagos da Força ★",
        circle: 3,
        range: "Visual",
        duration: "instantâneo",
        jp: "JPS",
        reverse: false,
        desc:
          g(3) +
          "<p><strong>Alcance:</strong> Visual · <strong>Duração:</strong> instantâneo · <strong>JP:</strong> JPS</p>" +
          "<p>A linha icônica de raios azul-brancos que jorra das mãos: <strong>1d4</strong> de dano e, se o alvo falhar numa <strong>JPS</strong>, <strong>atordoa por 1d6 rodadas</strong> (atordoado = todos os testes Difíceis). Escalável com Foco extra. A assinatura do Imperador.</p>" +
          CORRUPCAO +
          "<p><em>Poder-base: Choque Mental (3ª).</em></p>",
      },
      {
        nome: "Estrangular",
        circle: 3,
        range: "Visual",
        duration: "enquanto você se concentrar, até 1 rodada por nível",
        jp: "JPS",
        reverse: false,
        desc:
          g(3) +
          "<p><strong>Alcance:</strong> Visual · <strong>Duração:</strong> enquanto você se concentrar, até 1 rodada por nível · <strong>JP:</strong> JPS</p>" +
          "<p>A garra invisível fecha na garganta à distância: o alvo é <strong>erguido do chão, imobilizado e sufocado</strong> enquanto você mantém o punho cerrado.</p>" +
          "<p>Uma <strong>JPS</strong> inicial resiste; falhando, o alvo fica <strong>imobilizado</strong> (não fala, não age, não conjura) e sofre <strong>1d6 de dano por rodada</strong>, sem nova jogada — só quebrar sua concentração (dano, <em>Dissipar a Sombra</em>, um Duelo da Força vencido) o solta. Afeta um alvo com <strong>DV até o seu nível</strong>. \"Acho sua falta de fé perturbadora\" — a punição predileta do senhor Sith.</p>" +
          "<p><em>(adaptação do cenário — não use o poder-base do v1.0.)</em></p>",
      },
      {
        nome: "Sussurro Sombrio",
        circle: 3,
        range: "Visual",
        duration: "instantâneo",
        jp: "nenhuma",
        reverse: false,
        desc:
          g(3) +
          "<p><strong>Alcance:</strong> Visual · <strong>Duração:</strong> instantâneo · <strong>JP:</strong> nenhuma</p><p>A frase implantada deve ser <strong>curta</strong> e <strong>não pode conter conclusões lógicas</strong>.</p>" +
          "<p>Você planta na mente do alvo <strong>um pensamento ou impulso</strong> que ele toma por seu e passa a agir sobre ele. A dúvida semeada, a traição sugerida, o medo que ninguém plantou — só que plantou.</p>" +
          "<p><em>Poder-base: Induzir Pensamento (3ª).</em></p>",
      },
      {
        nome: "Hipnose",
        circle: 3,
        range: "Visual",
        duration: "1 minuto/nível",
        jp: "JPS nega",
        reverse: false,
        desc:
          g(3) +
          "<p><strong>Alcance:</strong> Visual · <strong>Duração:</strong> 1 minuto/nível · <strong>JP:</strong> JPS nega</p><p>Permite <strong>fazer perguntas</strong> e <strong>uma única sugestão</strong>. O alvo dorme por toda a duração e <strong>não lembra de nada</strong>.</p>" +
          "<p>Você captura a atenção de um alvo e o deixa <strong>dócil e sugestionável</strong> (uma <strong>JPS</strong> nega), pronto a ouvir e obedecer ordens brandas. O olhar que prende antes de a vontade quebrar.</p>" +
          "<p><em>Poder-base: Hipnose (3ª).</em></p>",
      },
      {
        nome: "Perturbar Mente",
        circle: 4,
        range: "Visual",
        duration: "15 segundos/nível",
        jp: "nenhuma",
        reverse: false,
        desc:
          g(4) +
          "<p><strong>Alcance:</strong> Visual · <strong>Duração:</strong> 15 segundos/nível · <strong>JP:</strong> nenhuma</p><p>A <strong>Inteligência do alvo é reduzida em 1/3</strong> e ele sofre <strong>−3 em qualquer rolagem</strong>.</p>" +
          "<p>Você embaralha os pensamentos do alvo e ele passa a <strong>agir de forma errática e imprevisível</strong>, tão capaz de atacar o próprio aliado quanto o inimigo. O caos injetado numa mente inteira.</p>" +
          "<p><em>Poder-base: Confundir Mente (4ª).</em></p>",
      },
      {
        nome: "Reescrever Memória",
        circle: 4,
        range: "Visual",
        duration: "permanente",
        jp: "JPS resiste",
        reverse: false,
        desc:
          g(4) +
          "<p><strong>Alcance:</strong> Visual · <strong>Duração:</strong> permanente · <strong>JP:</strong> JPS resiste</p><p>Alcança memórias de fatos ocorridos há até <strong>1 mês por nível</strong>; altera <strong>um elemento a cada 3 níveis</strong>.</p>" +
          "<p>Você <strong>altera um elemento da memória</strong> do alvo (uma <strong>JPS</strong> resiste): apaga o que ele viu, troca um rosto, some com uma conversa. O crime perfeito do Lado Sombrio — a testemunha que jura nunca ter visto nada.</p>" +
          "<p><em>Poder-base: Alterar Memória (4ª).</em></p>",
      },
      {
        nome: "Criar Pesadelo",
        circle: 4,
        range: "Visual",
        duration: "1 minuto/nível",
        jp: "JPS",
        reverse: false,
        desc:
          g(4) +
          "<p><strong>Alcance:</strong> Visual · <strong>Duração:</strong> 1 minuto/nível · <strong>JP:</strong> JPS</p><p>O alvo precisa estar <strong>adormecido</strong>. Ao acordar, a falha na JPS o deixa <strong>amedrontado por 24 horas</strong>: <strong>−2</strong> nas rolagens e <strong>−4</strong> em situações que lembrem o pesadelo.</p>" +
          "<p>Você infesta o sono do alvo com <strong>terror recorrente</strong>, drenando-lhe descanso, vontade e sanidade noite após noite. A tortura à distância que deixa a vítima exausta e quebrada sem uma marca no corpo.</p>" +
          "<p><em>Poder-base: Criar Pesadelo (4ª).</em></p>",
      },
      {
        nome: "Dominação Absoluta",
        circle: 5,
        range: "Visual",
        duration: "30 segundos/nível",
        jp: "JPS",
        reverse: false,
        desc:
          g(5) +
          "<p><strong>Alcance:</strong> Visual · <strong>Duração:</strong> 30 segundos/nível · <strong>JP:</strong> JPS</p><p>Afeta uma criatura com <strong>tantos DV quantos forem os seus níveis</strong>.</p>" +
          "<p>Você subjuga <strong>corpo e vontade até de criaturas poderosas</strong>, prendendo no lugar o que uma prisão comum não seguraria: feras colossais, brutamontes, alvos de vontade férrea.</p>" +
          "<p><em>Poder-base: Imobilizar Criatura (5ª).</em></p>",
      },
      {
        nome: "Repelir a Fera",
        circle: 5,
        range: "Visual",
        duration: "instantâneo",
        jp: "JPS nega",
        reverse: false,
        desc:
          g(5) +
          "<p><strong>Alcance:</strong> Visual · <strong>Duração:</strong> instantâneo · <strong>JP:</strong> JPS nega</p><p>Até <strong>8 DV</strong> afetados, começando pelas criaturas com <strong>menos</strong> DV (o excedente é desperdiçado). Uma <strong>falha crítica</strong> faz a criatura fugir a todo custo.</p>" +
          "<p>Você projeta repulsa pura e <strong>força criaturas não-humanas a recuar ou fugir</strong> — até <strong>8 DV</strong> afetados (uma <strong>JPS</strong> nega). O gesto que espanta a matilha, esvazia o fosso da fera ou abre caminho por um enxame.</p>" +
          "<p><em>Poder-base: Afastar Criatura (5ª).</em></p>",
      },
    ],
  },
];

// ---------------------------------------------------------------------------
// JournalEntry de referência — lista TODOS os poderes, de 1ª a 10ª Grandeza.
// Os de 6ª a 10ª aparecem aqui com o texto completo, porque não viram spell.
// ---------------------------------------------------------------------------

const paginas = [
  {
    title: "Como funcionam os Poderes da Força",
    content: `${FOCO_NOTA}

<h2>Os poderes são os Poderes Mentais do Space Dragon</h2>
<p>Os "poderes da Força" <strong>são os Poderes Mentais do Space Dragon</strong>, reskinados e reorganizados em três listas — <strong>Universal</strong>, <strong>Luz</strong> e <strong>Sombra</strong> — ao longo das dez <strong>Grandezas</strong>. Cada entrada cita o <strong>Poder Mental-base do SD</strong> (com a Grandeza), para o Mestre consultar alcance, duração e dano exatos. Onde não há um Poder Mental equivalente para um efeito clássico da Força (telecinese física, cura corporal, deflexão de sabre), a entrada vem marcada como <strong>adaptação</strong> e recebe uma Grandeza coerente.</p>

<h2>Grandeza, Caminho e Foco</h2>
<ul>
<li><strong>Grandeza = círculo.</strong> A Grandeza de um poder é a Grandeza do seu Poder Mental-base. Seu <strong>Foco da Força Diário</strong> por Grandeza vem da tabela da classe.</li>
<li><strong>O Caminho decide a lista:</strong> <strong>Luz</strong> acessa <strong>Universal + Luz</strong>; <strong>Sombra</strong> acessa <strong>Universal + Sombra</strong>; um <strong>neutro</strong> acessa só a <strong>Universal</strong>.</li>
<li><strong>Atributo-chave: Sabedoria</strong> (todos os testes de poder e o Duelo da Força). <em>Opção: Sombra por Carisma — ver a classe.</em> O Foco extra do Sensível vem da Sabedoria.</li>
<li><strong>Aprender:</strong> por treino/tentativa e erro (Aprender Poderes da Força), ou ensinado por um mestre (teste Fácil).</li>
<li><strong>Cruzar de lista (a Queda):</strong> um personagem da Luz pode usar um poder da Sombra em desespero, mas cada uso marca <strong>+1 de Corrupção</strong>. Alguns poderes marcam Corrupção <strong>mesmo para a Sombra</strong> — vêm com <strong>★</strong>.</li>
<li><strong>A Tentação (a Corrupção como moeda):</strong> numa <strong>rolagem decisiva</strong>, o Sensível pode <strong>aceitar Corrupção</strong> para rerrolar (<strong>+1</strong>, fica com o segundo resultado), rerrolar e ficar com o melhor (<strong>+2</strong>) ou transformar um acerto em crítico (<strong>+1</strong>). <strong>Uma vez por cena, três por dia de jogo.</strong> Os custos <strong>somam</strong> com o do poder: um personagem da Luz que lança um poder da Sombra e ainda paga para rerrolar sobe <strong>até 3 pontos numa ação só</strong>.</li>
<li><strong>Eco da Senda:</strong> do <strong>10º nível</strong> em diante, o Foco gasto em poderes do <strong>Domínio da sua Senda</strong> às vezes volta (1 em 1d10; 1 em 1d4 no 15º), e no <strong>15º</strong> os poderes de <strong>1ª Grandeza</strong> do seu Domínio saem de graça (um por rodada). Os quatro Domínios estão na classe.</li>
</ul>

<h2>Grandeza canônica (v1.0)</h2>
<p>A lista completa de Poderes Mentais do guia v1.0 define a Grandeza oficial de cada poder-base. Onde uma entrada citar um poder-base, a Grandeza vale a do v1.0 (ex.: <strong>Telecinésia = 4ª</strong>, <strong>Telepatia = 1ª</strong>, <strong>Levitação = 2ª</strong>, <strong>Palavra de Comando = 3ª</strong>, <strong>Predizer Futuro = 7ª</strong>, <strong>Morte Cerebral = 10ª</strong>). As entradas marcadas <em>(adaptação)</em> são efeitos "físicos" da Força que não têm poder mental equivalente e recebem uma Grandeza coerente.</p>

<h2>Três tipos de entrada — leia a etiqueta</h2>
<ul>
<li><strong>(Nome do poder-base, Grandeza)</strong> — reskin fiel: <strong>use o poder-base do v1.0</strong> para alcance, duração, dano e jogadas.</li>
<li><strong>(adaptação — Nª)</strong> — efeito clássico da Força <strong>sem</strong> poder mental equivalente. Os dados vêm da própria entrada.</li>
<li><strong>(adaptação do cenário — não use o poder-base do v1.0)</strong> — o efeito de Star Wars foi <strong>deliberadamente afastado</strong> do poder mental que o inspirou. A entrada <strong>fixa ali mesmo</strong> Grandeza, alcance, duração e dano; consultar o v1.0 aqui só confunde.</li>
</ul>

<h2>Grandeza 1ª–5ª viram itens; 6ª–10ª ficam aqui</h2>
<p>O tipo <em>Magia</em> do sistema Old Dragon 2 só reconhece círculos de 1 a 5. Por isso, os poderes de <strong>1ª a 5ª Grandeza</strong> existem como itens utilizáveis na ficha (círculo = Grandeza), enquanto os de <strong>6ª a 10ª Grandeza</strong> vivem apenas neste diário, com texto completo. Nas páginas seguintes, cada lista aparece inteira, agrupada por Grandeza.</p>
${GRANDEZAS_REFERENCIA}

<h2>Nota de reaproveitamento</h2>
<p>A lista de <strong>Poderes Mentais do Space Dragon</strong> é vasta (memória, sonho, telepatia, insanidade, domínio, contato com mortos). <strong>Qualquer Poder Mental do SD pode entrar na mesa</strong> com reskin direto — basta manter a Grandeza e distribuí-lo entre <strong>Universal</strong>, <strong>Luz</strong> ou <strong>Sombra</strong> pelo tema. Exemplos naturais ainda não usados: <em>Compartilhar Sonho</em> e <em>Conexão Psíquica</em> para vínculos de mestre-e-aprendiz; <em>Contatar Mente Desencarnada</em> para falar com um Jedi que virou Fantasma da Força; <em>Energizar Objeto</em> para carregar tecnologia com a Força. Esta lista é um núcleo fechado e pronto para jogar, não um teto.</p>
`,
  },
  {
    title: "A Corrupção e a Tentação",
    content: `
<h2>A trilha de Corrupção</h2>
<p>A Corrupção é uma trilha de <strong>0 a 10</strong> que mede o quanto a Sombra já enraizou. Ela sobe e desce, e o estado atual vale para qualquer Sensível — da Luz, da Sombra ou neutro.</p>
<ul>
<li><strong>Ganhar (+1):</strong> usar um poder da lista Sombra, usar qualquer poder para crueldade deliberada, ou ceder ao ódio numa cena-chave.</li>
<li><strong>Perder (−1):</strong> atos definidores de compaixão e sacrifício, meditação prolongada sob orientação, recusar o caminho fácil quando ele custa caro.</li>
</ul>

<h3>Os cinco estados</h3>
<table><thead><tr><th>Corrupção</th><th>Estado</th><th>O que acontece</th></tr></thead><tbody>
<tr><td><strong>0–2</strong></td><td><strong>Sereno</strong></td><td>Sem penalidade.</td></tr>
<tr><td><strong>3–5</strong></td><td><strong>Marcado</strong></td><td>Os olhos começam a amarelar sob esforço; testes sociais com não-corrompidos ficam <strong>Difíceis</strong> quando a Força é usada à vista.</td></tr>
<tr><td><strong>6–8</strong></td><td><strong>Tomado</strong></td><td>Surtos de fúria; o Mestre pode assumir uma ação em cena de estresse extremo.</td></tr>
<tr><td><strong>9</strong></td><td><strong>À beira</strong></td><td>Todas as penalidades de <em>Tomado</em> — e a Sombra passa a <strong>oferecer</strong> sozinha (veja abaixo).</td></tr>
<tr><td><strong>10</strong></td><td><strong>Queda</strong> ou <strong>Consumido</strong></td><td>O fim da trilha, e ele é diferente para cada Caminho.</td></tr>
</tbody></table>

<h3>O fim da trilha</h3>
<p><strong>A Queda</strong> (Luz e neutro): ao chegar a 10, o personagem cai — surto sombrio, troca definitiva para o <strong>Caminho da Sombra</strong> e uma marca física. Ao cair, sua Corrupção <strong>volta para 7</strong>: a Sombra deixou de ser um estranho dentro dele e virou casa.</p>
<p><strong>Consumido</strong> (quem já era da Sombra): ao chegar a 10, não sobra pessoa, só apetite. O personagem <strong>sai das mãos do jogador e vira PNJ do Mestre</strong> — um Lorde Sith puro, um monstro que os antigos companheiros um dia terão de enfrentar. A Luz perde a alma; a Sombra perde a pessoa.</p>
<p><strong>A Redenção</strong> exige reduzir a Corrupção a <strong>menos de 3</strong> e um sacrifício definidor.</p>

<h2>A Tentação — a Corrupção como moeda</h2>
<p>A Sombra não multa: ela <strong>oferece</strong>. Quando você <strong>falha numa rolagem decisiva</strong> — ou quando um golpe seu acerta e você quer que ele termine a questão —, a Força propõe um negócio. Escolha uma das três formas:</p>
<ul>
<li><strong>Insistir — +1 de Corrupção:</strong> rerrola a jogada falha e fica com o <strong>segundo resultado</strong>, seja ele qual for. A Força atende ao chamado, mas não obedece a você.</li>
<li><strong>Arrancar — +2 de Corrupção:</strong> rerrola e fica com o <strong>melhor dos dois</strong>. Não é mais pedir: é tomar. Custa o dobro porque a certeza é o que a Sombra vende mais caro.</li>
<li><strong>Sentenciar — +1 de Corrupção:</strong> um ataque que <strong>já acertou</strong> vira crítico, ou um poder que <strong>já passou</strong> tem dano, duração ou número de alvos <strong>dobrado</strong>.</li>
</ul>

<h3>O que conta como rolagem decisiva</h3>
<p>É aquela cuja falha <strong>fecha um caminho</strong>: o Duelo da Força que decide a sala, o teste que impede a nave de cair, o ataque que separa o aliado da morte. <strong>Não</strong> vale para rotina, iniciativa, dano avulso ou testes repetíveis. Quem decide é o Mestre, e decide <strong>antes</strong> da rolagem.</p>

<h3>A trava, e por que ela existe</h3>
<p><strong>Uma vez por cena, no máximo três vezes por dia de jogo.</strong> Sem ela a regra se autodestrói: um Padawan sereno viraria Lorde Sith na segunda sessão, e a Queda deixaria de ser tragédia para virar contabilidade. Com a trava, ir de 0 a 10 só pela Tentação leva no mínimo <strong>quatro dias de jogo</strong>.</p>

<h3>Os custos somam</h3>
<p>A Tentação <strong>nunca substitui</strong> a Corrupção que a ação já cobrava. Um personagem da Luz que lança um poder da Sombra (+1), erra, e <em>Arranca</em> a rerrolagem (+2) sobe <strong>3 pontos numa única ação</strong>. Com os poderes marcados <strong>★</strong>, que cobram mesmo de quem já é da Sombra, a conta é a mesma.</p>

<h3>Em Corrupção 9 — a última oferta</h3>
<p>Nada impede o negócio. A Sombra oferece <strong>sozinha</strong>: o Mestre descreve a oferta em voz alta e <strong>avisa o preço</strong> — aceitar leva a 10, e 10 é a Queda (Luz/neutro) ou o Consumido (Sombra). Você <strong>recebe o que pediu na hora</strong>; a Queda se resolve <strong>ao fim da cena</strong>. O herói ganha a luta e perde a si mesmo no mesmo plano.</p>

<h3>Recusar</h3>
<p><strong>Nunca exige rolagem e nunca tem penalidade mecânica.</strong> Uma Corrupção que se pega sem escolher não é tentação, é imposto.</p>
<p>A Corrupção ganha pela Tentação é <strong>Corrupção comum</strong>: conta na tabela de estados e sai pelos mesmos caminhos — os atos de compaixão e sacrifício que dão −1.</p>

<h3>Vale igual para os dois lados</h3>
<p>Mesmo preço, mesma trilha, sem desconto para ninguém. O que muda é a cara da cena, não a matemática: para o Jedi a voz sussurra <em>"só desta vez"</em> e o empurra para a <strong>Queda</strong>; para quem já é da Sombra ela diz <em>"você já pagou por isso, use"</em> e o empurra para ser <strong>Consumido</strong>.</p>
`,
  },
  {
    title: "O Eco da Senda e os Domínios",
    content: `
<h2>Quando a Força para de ser esforço</h2>
<p>Chega um ponto em que o gesto que lhe custava concentração vira respiração — e a corrente que você empurrou volta sozinha para a mão. Não em tudo: só naquilo que é o <strong>seu ofício</strong>.</p>
<ul>
<li><strong>Eco (10º):</strong> sempre que gastar Foco num <strong>poder da sua Senda</strong>, role <strong>1d10</strong> depois de resolver o poder — num <strong>1</strong>, o ponto de Foco volta para a Grandeza de onde saiu. Vale <strong>por ponto gasto</strong>: um poder de 2 pontos rola dois d10.</li>
<li><strong>Eco Maior (15º):</strong> a rolagem passa a <strong>1d4</strong> (25%). Além disso, os poderes de <strong>1ª Grandeza</strong> da sua Senda não custam mais Foco algum — no máximo <strong>um por rodada</strong>.</li>
</ul>
<p><em>Por que a 1ª Grandeza e não a 2ª:</em> aqui as Grandezas vão até a 10ª, e a 1ª já carrega os cavalos de batalha do Sensível (<em>Empurrão da Força</em>, <em>Truque Mental</em>, <em>Detectar a Força</em>, <em>Cura pela Força</em>). Libertar a 2ª junto, num teto de 15º nível, faria o Consular abrir portas de aço o dia inteiro de graça. A trava de um por rodada existe pelo mesmo motivo: gratuito não pode significar infinito dentro de um combate.</p>

<h2>O que é "poder da sua Senda"</h2>
<p>Cada Senda tem um <strong>Domínio</strong> — a família de efeitos que ela pratica até virar hábito. Vale para poderes de <strong>qualquer lista</strong> (Universal, Luz ou Sombra): conta o que o poder <em>faz</em>, não de que lado ele vem.</p>
<ul>
<li><strong>Guardião — O Corpo e a Lâmina:</strong> Empurrão da Força · Correr com a Força · Salto da Força · Telecinésia · Prisão Telecinética · Lâmina Guiada · Deflexão da Força · Choque da Força · Estrangular · Relâmpagos da Força ★</li>
<li><strong>Consular — A Mente e o Domínio:</strong> Truque Mental · Vínculo Telepático · Percepção Ampliada · Calma · Coragem · Aterrorizar · Sussurro Sombrio · Hipnose · Perturbar Mente · Reescrever Memória · Dominação Absoluta</li>
<li><strong>Sentinela — O Rastro e o Véu:</strong> Detectar a Força · Sentir o Perigo · Localizar pela Força · Véu da Força · Olho da Força · Discernir a Verdade · Manto de Escuridão · Enfraquecimento</li>
<li><strong>Vidente — A Vida e a Presciência:</strong> Cura pela Força · Cura de Aflições · Cura Maior · Serenidade · Estase da Força · Premonição · Visão da Verdade · Dissipar a Sombra · Libertar da Corrupção · Toque Sombrio · Repelir a Fera</li>
</ul>
<p>As listas são <strong>exemplos, não um cadastro</strong>. Um poder pode caber em dois Domínios — nesse caso conta se a <strong>maneira como foi usado na cena</strong> pertence ao Domínio do personagem. Na dúvida o Mestre decide, e decide <strong>antes</strong> da rolagem. Ninguém acumula dois Domínios.</p>
<p>O <strong>Sensível sem Senda</strong> escolhe o Domínio livremente no 10º nível. Quem trilhou a <strong>Senda Mandaloriana não tem Eco da Senda</strong>: abriu mão da especialização e, com ela, do Domínio. O clã lhe ensinou uma lâmina, não um atalho da Força.</p>
`,
  },
  {
    title: "Lista Universal",
    content: `
<h2>Poderes Universais</h2>
<p><em>Percepção, telecinese e mobilidade — os fundamentos que correm sob a pele de todo Sensível, sem pender para Luz ou Sombra. Qualquer Caminho os aprende.</em></p>

<h3>1ª Grandeza</h3>
<ul>
<li><strong>Detectar a Força</strong> <em>(Detectar Poderes Mentais, 1ª)</em> — você abre os sentidos e a Força responde: sente a assinatura viva de criaturas, o peso de lugares carregados, o brilho latente de um cristal ou artefato, e o rastro fresco de qualquer poder usado por perto há pouco. Não diz nomes nem intenções — apenas <em>que ali há Força, e quanto</em>.</li>
<li><strong>Truque Mental</strong> <em>(adaptação do cenário — não use o poder-base do v1.0)</em> — o clássico aceno de mão e "não são os droides que você procura". <strong>Alcance Visual · efeito instantâneo.</strong> Frase imperativa, curta e com um só verbo, jamais ilógica ou letal. Só afeta alvos com <strong>DV até metade do seu nível</strong> (mínimo 1); mentes fortes, líderes decididos e droides são imunes; <strong>JPS</strong> resiste.</li>
<li><strong>Empurrão da Força</strong> <em>(adaptação — 1ª)</em> — empurra o alvo <strong>3 metros</strong> para trás e, com <strong>JPD</strong> falha, o derruba; ou arremessa um objeto solto causando <strong>1d6</strong> de dano.</li>
<li><strong>Sentir o Perigo</strong> <em>(adaptação — 1ª)</em> — premonição passiva: <strong>+2 na JPD</strong> contra o próximo ataque-surpresa ou armadilha da cena.</li>
<li><strong>Vínculo Telepático</strong> <em>(Conexão Psíquica, 1ª)</em> — conversa mente a mente com um aliado conhecido, à distância, carregando intenção e imagens simples.</li>
</ul>

<h3>2ª Grandeza</h3>
<ul>
<li><strong>Percepção Ampliada</strong> <em>(adaptação — 2ª; ver Detectar Invisibilidade/Mentiras, 2ª)</em> — lê as superfícies de pensamento em até <strong>18 metros</strong>.</li>
<li><strong>Véu da Força</strong> <em>(adaptação do cenário — 2ª; ver Apagar Rastros Mentais, 6ª)</em> — recolhe a própria assinatura na Força: enquanto dura, adivinhação e rastreio não o encontram. É como um Sensível se esconde do Império — e o preço é não poder usar a Força para resolver nada.</li>
<li><strong>Localizar pela Força</strong> <em>(adaptação — 2ª)</em> — aponta a <strong>direção</strong> de um objeto, nave ou pessoa que você já conheceu. Sem distância exata nem mapa.</li>
</ul>

<h3>3ª Grandeza</h3>
<ul>
<li><strong>Correr com a Força</strong> <em>(adaptação — 3ª)</em> — <strong>dobra o deslocamento</strong> e concede uma <strong>ação extra de movimento</strong> na rodada.</li>
<li><strong>Salto da Força</strong> <em>(adaptação — 3ª)</em> — saltos enormes em altura e distância, <strong>ignorando o dano de queda</strong>.</li>
<li><strong>Ampliar Poder</strong> <em>(Ampliar Poder Mental, 3ª)</em> — estende a duração ou muda a forma do alcance de um poder que você já domina.</li>
</ul>

<h3>4ª Grandeza</h3>
<ul>
<li><strong>Telecinésia</strong> <em>(adaptação do cenário — não use o poder-base do v1.0)</em> — <strong>alcance 10 m + 1 m/nível · duração 10 segundos/nível, exigindo concentração.</strong> <strong>Peso máximo: 100 kg por nível</strong> (o objeto se move até 3 m por rodada). Objeto arremessado causa <strong>1d6</strong>, <strong>3d6</strong> ou <strong>5d6</strong> conforme a massa, com <strong>JPD</strong> para metade. Sustentar alvo vivo é <em>Prisão Telecinética</em> (5ª).</li>
<li><strong>Olho da Força</strong> <em>(adaptação — 4ª)</em> — projeta um sensor invisível que percorre o ambiente e transmite o que vê e ouve.</li>
</ul>

<h3>5ª Grandeza</h3>
<ul>
<li><strong>Prisão Telecinética</strong> <em>(Imobilizar Criatura, 5ª)</em> — trava corpo e nervo de uma criatura poderosa; prende feras e brutamontes que a Estase não seguraria.</li>
</ul>

<h3>6ª Grandeza</h3>
<p><em>Não existe como item de ficha — use o texto abaixo.</em></p>
<ul>
<li><strong>Fortaleza Mental</strong> <em>(Fortaleza Mental, 6ª)</em> — <strong>Alcance:</strong> 2 m²/nível · <strong>Duração:</strong> 1 minuto/nível · <strong>JP:</strong> nenhuma · <strong>Efeito:</strong> você e os aliados ao alcance passam a ter <strong>todos os testes de resistência mental considerados Fáceis</strong>; quem já estiver sob <em>Bloqueio Mental</em> mantém o efeito original e não acumula bônus — você ergue uma muralha ao redor da própria mente (e das de aliados próximos), <strong>blindando-a contra intrusão, leitura e domínio</strong>. Enquanto dura, truques mentais, sussurros e controles escorregam sem pegar. O escudo do mestre que entra na sala do tirano e não teme ter os pensamentos lidos.</li>
</ul>

<h3>7ª Grandeza</h3>
<p><em>Não existe como item de ficha — use o texto abaixo.</em></p>
<ul>
<li><strong>Barreira da Força</strong> <em>(adaptação — 7ª)</em> — <strong>Alcance:</strong> pessoal, esfera de 3 metros · <strong>Duração:</strong> 1 minuto por nível · <strong>JP:</strong> nenhuma · <strong>Efeito:</strong> você ergue uma casca de pura vontade ao seu redor. <strong>Nenhum poder da Força atravessa</strong> — nem de fora para dentro, nem de dentro para fora: enquanto a Barreira dura, você também não conjura. Ela <strong>não detém matéria</strong>: tiro de blaster, lâmina, granada e aparato passam normalmente. É o abrigo de quem está perdendo um Duelo, e é a jaula de quem esqueceu que precisava revidar.</li>
<li><strong>Mão do Titã</strong> <em>(adaptação — 7ª)</em> — <strong>Alcance:</strong> 30 metros · <strong>Duração:</strong> concentração, até 1 minuto · <strong>JP:</strong> JPD <em>(se usada contra uma criatura)</em> · <strong>Efeito:</strong> a telecinésia deixa de ser precisão e vira <strong>guindaste</strong>. Você ergue e desloca um objeto de até o porte de uma <strong>nave Pequena</strong> — um caça, um bloco de alvenaria, um contêiner de carga —, movendo-o <strong>3 metros por rodada</strong>. Enquanto concentra, você <strong>não faz mais nada</strong> e qualquer dano exige um teste de Sabedoria para não perder o controle. Largar a carga sobre alguém causa <strong>4d6</strong>, com JPD para metade. <em><strong>O Guardião nunca alcança este poder</strong> — o teto dele é a 6ª Grandeza. Quem ergue o caça é o Consular, o Vidente ou o Sensível puro, e isso é fiel ao cânone: foi o mestre sentado que tirou a nave do pântano, não o duelista.</em></li>
<li><strong>Repulsão da Força</strong> <em>(adaptação — 7ª)</em> — <strong>Alcance:</strong> 6 metros de raio, a partir de você · <strong>Duração:</strong> instantâneo · <strong>JP:</strong> JPD · <strong>Efeito:</strong> em vez de empurrar <strong>alguém</strong>, você empurra <strong>tudo</strong>. Uma onda sai de você em todas as direções: cada criatura na área sofre <strong>2d6</strong>, é arremessada <strong>6 metros</strong> e cai no chão. Uma JPD bem-sucedida reduz o dano à metade e evita a queda. <strong>Não escolhe alvos</strong> — aliados no raio são atingidos como qualquer um, e é por isso que o poder pede que você olhe ao redor antes.</li>
</ul>

<h3>8ª Grandeza</h3>
<p><em>Não existe como item de ficha — use o texto abaixo.</em></p>
<ul>
<li><strong>Deter o Instante</strong> <em>(adaptação — 8ª)</em> — <strong>Alcance:</strong> Visual · <strong>Duração:</strong> 1 rodada · <strong>JP:</strong> JPD · <strong>Efeito:</strong> você fecha a mão e <strong>o movimento para</strong>. Numa área de 10 metros, todo projétil em voo fica <strong>suspenso no ar</strong> e cada criatura faz uma JPD: falhando, perde a ação da rodada, presa no próprio gesto. Ao fim da rodada os projéteis simplesmente <strong>caem no chão</strong>, inertes. É a imagem de abertura do cenário: o tiro que ficou parado no corredor enquanto o atirador entendia o que tinha acabado de acontecer.</li>
<li><strong>Peso do Mundo</strong> <em>(adaptação — 8ª)</em> — <strong>Alcance:</strong> 30 metros · <strong>Duração:</strong> 1 minuto · <strong>JP:</strong> JPD · <strong>Efeito:</strong> numa área de <strong>10 metros de raio</strong>, você reescreve a gravidade: escolha ao conjurar entre <strong>dobrá-la</strong> (movimento pela metade, testes físicos Difíceis), <strong>anulá-la</strong> (todos flutuam, sem apoio para golpe corpo a corpo) ou <strong>invertê-la</strong> (tudo cai para cima, sofrendo <strong>2d6</strong> ao bater no teto — e outros 2d6 quando o poder acaba, se ainda estiver lá em cima). As regras de Gravidade do Space Dragon valem normalmente dentro da área.</li>
</ul>

<h3>9ª Grandeza</h3>
<p><em>Não existe como item de ficha — use o texto abaixo.</em></p>
<ul>
<li><strong>Projeção da Força</strong> <em>(adaptação — 9ª)</em> — <strong>Alcance:</strong> ilimitado, dentro da mesma galáxia · <strong>Duração:</strong> 1 minuto por nível · <strong>JP:</strong> nenhuma · <strong>Efeito:</strong> você aparece <strong>em outro lugar</strong>. A projeção fala, anda, tem sua voz e seu rosto, e é <strong>indistinguível de você</strong> para quem olha — ela não pode tocar em nada nem ser tocada, e ataques a atravessam sem efeito. Você, enquanto isso, permanece onde está, imóvel e cego para o que houver à sua volta.</li>
</ul>
`,
  },
  {
    title: "Lista do Caminho da Luz",
    content: `
<h2>Caminho da Luz</h2>
<p><em>Serenidade, cura, proteção e o golpe guiado pela Força — poder que flui da paz, sem recorrer ao medo ou ao ódio. O Sensível da Luz soma esta lista à Universal.</em></p>

<h3>1ª Grandeza</h3>
<ul>
<li><strong>Cura pela Força</strong> <em>(adaptação — 1ª)</em> — <strong>restaura pontos de vida</strong> de um aliado (ou de si) pela imposição das mãos. Não ressuscita nem regenera membros.</li>
<li><strong>Calma</strong> <em>(Ajustar Emoções, 1ª)</em> — <strong>dissipa medo e pânico</strong> de um aliado, firmando-o contra novo terror pelo resto da cena.</li>
<li><strong>Lâmina Guiada</strong> <em>(adaptação — 1ª)</em> — pela duração, seus <strong>ataques com a arma tocada</strong> tornam-se <strong>Fáceis</strong>.</li>
</ul>

<h3>2ª Grandeza</h3>
<ul>
<li><strong>Serenidade</strong> <em>(adaptação — 2ª)</em> — enquanto <strong>você não atacar</strong>, quem quiser te golpear precisa antes passar numa <strong>JPS</strong>.</li>
<li><strong>Discernir a Verdade</strong> <em>(Detectar Mentiras, 2ª)</em> — você <strong>sabe quando lhe mentem</strong>, mas não descobre a verdade escondida.</li>
<li><strong>Repelir a Sombra</strong> <em>(adaptação — 2ª)</em> — marca um alvo com uma quietude que a Sombra não toca: JPS <strong>Fáceis</strong> contra poderes da Sombra, e corrompidos não conseguem encostar nele. Cai se o próprio alvo atacar corpo a corpo.</li>
</ul>

<h3>3ª Grandeza</h3>
<ul>
<li><strong>Cura de Aflições</strong> <em>(adaptação do cenário — não use o poder-base do v1.0)</em> — <strong>Toque · instantâneo, sem dano.</strong> Encerra <strong>medo, pânico, terror, confusão e atordoamento</strong> e cancela um efeito mental ou da Força em curso <strong>de até 3ª Grandeza</strong>. Não cura pontos de vida.</li>
<li><strong>Dissipar a Sombra</strong> <em>(Dissipar Poder Mental, 3ª)</em> — cancela poderes da Força e efeitos sobrenaturais ativos. Funciona como o <strong>Duelo da Força</strong>, inclusive quanto a Foco extra, mas o alvo não revida.</li>
<li><strong>Coragem</strong> <em>(adaptação — 3ª)</em> — aura de firmeza: <strong>bônus a aliados</strong> (ataque/moral) e <strong>penalidade a inimigos</strong> na área.</li>
<li><strong>Deflexão da Força</strong> <em>(adaptação — 3ª)</em> — campo de vontade que <strong>repele projéteis e disparos de blaster</strong>. Base mecânica da deflexão das <strong>Formas do Guardião</strong>: com sabre, os tiros voltam; sem ele, apenas se desviam.</li>
<li><strong>Estase da Força</strong> <em>(Imobilizar Pessoa, 3ª)</em> — <strong>paralisa um humanoide</strong> no lugar (uma <strong>JPS</strong> nega).</li>
</ul>

<h3>4ª Grandeza</h3>
<ul>
<li><strong>Premonição</strong> <em>(adaptação — 4ª)</em> — sim/não ou imagem-relâmpago sobre a sabedoria de um curso imediato. Não é profecia detalhada.</li>
<li><strong>Libertar da Corrupção</strong> <em>(adaptação — 4ª)</em> — <strong>alivia a Corrupção</strong> de um alvo e <strong>quebra domínios mentais</strong> da Sombra, a critério do Mestre.</li>
</ul>

<h3>5ª Grandeza</h3>
<ul>
<li><strong>Visão da Verdade</strong> <em>(adaptação — 5ª)</em> — enxerga através de <strong>ilusões, disfarces, invisibilidade e mentiras da percepção</strong>.</li>
<li><strong>Cura Maior</strong> <em>(adaptação — 5ª)</em> — <strong>restaura grande soma de pontos de vida</strong> ou traz um aliado da beira da morte de volta à luta em uma ação.</li>
<li><strong>Vínculo da Díade</strong> <em>(adaptação — 5ª)</em> — duas pessoas viram uma só coisa na Força, a qualquer distância: veem, ouvem e sentem uma pela outra, e uma vez por dia passam um objeto de mão em mão. Um Vínculo por vez.</li>
</ul>

<h3>6ª Grandeza</h3>
<p><em>Não existe como item de ficha — use o texto abaixo.</em></p>
<ul>
<li><strong>Comunhão com a Força</strong> <em>(Contatar Espírito Galáctico, 6ª)</em> — <strong>Alcance:</strong> Pessoal · <strong>Duração:</strong> 1 minuto · <strong>JP:</strong> nenhuma — você medita e <strong>faz perguntas diretas à própria Força</strong>, recebendo respostas — em imagens, símbolos ou a voz de um mestre que já partiu. O canal pelo qual um Jedi ouve conselho de quem se tornou Fantasma da Força.</li>
<li><strong>Bloqueio Mental</strong> <em>(Bloqueio Mental, 6ª)</em> — <strong>Alcance:</strong> Pessoal ou toque · <strong>Duração:</strong> 10 minutos/nível · <strong>JP:</strong> nenhuma · <strong>Efeito:</strong> todos os testes de resistência mental do alvo ficam <strong>Fáceis</strong>; se o alvo for ele próprio um usuário de poderes, fica <strong>incapaz de usar poderes que não conhece</strong> e precisa de uma <strong>JPS Difícil</strong> para usar os que domina — você <strong>sela a mente de um alvo (ou a sua própria) contra novos poderes</strong>, fechando-a como um cofre. Protege o aliado prestes a ser dominado ou tranca a própria mente antes de entrar em território inimigo.</li>
</ul>

<h3>7ª Grandeza</h3>
<p><em>Não existe como item de ficha — use o texto abaixo.</em></p>
<ul>
<li><strong>Presença Serena</strong> <em>(adaptação — <strong>Alcance:</strong> 30 metros · <strong>Duração:</strong> 10 rodadas · <strong>JP:</strong> JPS — 7ª)</em> — a serenidade individual vira força de área: você <strong>projeta calma sobrenatural sobre uma multidão inteira</strong>, apaziguando pânico, fúria e violência iminente por toda a cena. O gesto que faz um motim baixar as armas, uma turba se dispersar, um salão à beira do massacre respirar de novo.</li>
<li><strong>Convergência</strong> <em>(adaptação — 7ª)</em> — <strong>Alcance:</strong> pessoal · <strong>Duração:</strong> 1 hora de meditação ininterrupta · <strong>JP:</strong> nenhuma · <strong>Efeito:</strong> você para de agir e <strong>pergunta</strong>. A Força responde a até <strong>três perguntas</strong> com <strong>sim</strong>, <strong>não</strong> ou <strong>talvez</strong> — nunca com explicação, nunca com detalhe, e nunca duas vezes sobre a mesma coisa no mesmo dia. <em>Talvez</em> é resposta legítima e costuma significar que a pergunta foi mal feita, ou que aquilo ainda não foi decidido por ninguém.</li>
</ul>

<h3>8ª Grandeza</h3>
<p><em>Não existe como item de ficha — use o texto abaixo.</em></p>
<ul>
<li><strong>Meditação de Batalha</strong> <em>(adaptação — 8ª)</em> — <strong>Alcance:</strong> 100 metros · <strong>Duração:</strong> 10 rodadas · <strong>JP:</strong> JPS <em>(inimigos)</em> · <strong>Efeito:</strong> você se senta, fecha os olhos <strong>no meio da batalha</strong> e a batalha muda de forma. Todos os seus aliados ao alcance ganham <strong>+2 em rolagens de ataque e Jogadas de Proteção</strong>; cada inimigo que falhe numa JPS sofre <strong>−2 nas mesmas coisas</strong>, e os de Moral mais baixo começam a recuar sem saber por quê. Você fica <strong>imóvel e indefeso</strong> enquanto medita, e <strong>qualquer dano sofrido encerra o poder</strong>.</li>
<li><strong>Purificar o Nexo</strong> <em>(adaptação — 8ª)</em> — <strong>Alcance:</strong> 30 metros de raio · <strong>Duração:</strong> <strong>permanente</strong> · <strong>JP:</strong> nenhuma · <strong>Efeito:</strong> um dia inteiro de ritual devolve à Luz um lugar que a Sombra tomou. Dentro da área purificada, <strong>poderes da lista Sombra custam o dobro do Foco</strong> e <strong>nenhum uso da Força marca Corrupção</strong>. O efeito não se desfaz sozinho — mas pode ser <strong>desfeito por <em>Corromper o Nexo</strong></em>, e essa disputa por um mesmo lugar é boa premissa de aventura.</li>
</ul>

<h3>9ª Grandeza</h3>
<p><em>Não existe como item de ficha — use o texto abaixo.</em></p>
<ul>
<li><strong>Restaurar a Carne</strong> <em>(adaptação — 9ª)</em> — <strong>Alcance:</strong> toque · <strong>Duração:</strong> instantâneo · <strong>JP:</strong> nenhuma · <strong>Efeito:</strong> você desfaz o que a medicina não alcança. Devolve <strong>pontos de atributo e níveis drenados</strong> por qualquer efeito, encerra paralisias e cegueiras de origem mental ou mística, e fecha um ferimento que se recusava a fechar. <strong>Não regenera membro perdido</strong> — isso é bancada de Técnico, não Força — e <strong>não ressuscita</strong>.</li>
<li><strong>Palavra da Luz</strong> <em>(adaptação — 9ª)</em> — <strong>Alcance:</strong> 20 metros · <strong>Duração:</strong> instantâneo · <strong>JP:</strong> JPC · <strong>Efeito:</strong> você diz <strong>uma palavra</strong> e a hostilidade ao alcance simplesmente cessa. Criaturas hostis com <strong>até 4 DV</strong> que falhem na JPC caem <strong>inconscientes</strong> por 1d6 minutos; as de <strong>5 a 12 DV</strong> ficam <strong>atordoadas</strong> por 1d4 rodadas; acima de 12 DV, nada acontece. <strong>A Palavra não mata</strong> — nem quando seria mais fácil, nem quando o alvo merece.</li>
</ul>

<h3>10ª Grandeza</h3>
<p><em>Não existe como item de ficha — use o texto abaixo.</em></p>
<ul>
<li><strong>Transferir a Vida</strong> <em>(adaptação — 10ª)</em> — <strong>Alcance:</strong> toque · <strong>Duração:</strong> instantâneo · <strong>JP:</strong> nenhuma · <strong>Efeito:</strong> alguém morreu há menos de um minuto, e você decide que não. O alvo volta <strong>com 1 PV</strong>, consciente e inteiro, sem perder memória nem personalidade — o oposto exato do que a <strong>clonagem</strong> e a <strong>reanimação</strong> do Técnico devolvem. Você, em troca, cai <strong>imediatamente a 0 PV</strong> e perde <strong>1d4 pontos de Constituição, permanentemente</strong>. Se isso levar sua Constituição a <strong>0, você morre</strong> — e é assim que costuma terminar.</li>
<li><strong>Redenção</strong> <em>(adaptação — 10ª)</em> — <strong>Alcance:</strong> toque · <strong>Duração:</strong> instantâneo · <strong>JP:</strong> nenhuma <em>(o alvo escolhe)</em> · <strong>Efeito:</strong> você alcança alguém que <strong>já caiu</strong> — Corrupção <strong>9 ou 10</strong>, inclusive um <strong>Consumido</strong> — e lhe oferece o caminho de volta. Não é ataque, não vence resistência e <strong>não há Jogada de Proteção</strong>: o alvo <strong>decide</strong>, e a decisão pertence a quem o interpreta. Aceitando, ele <strong>retorna ao Caminho da Luz</strong> com a Corrupção reduzida a <strong>3</strong>, recuperando a si mesmo — memória, vontade e nome.</li>
</ul>
`,
  },
  {
    title: "Lista do Caminho da Sombra",
    content: `
<h2>Caminho da Sombra</h2>
<p><em>Paixão, dor, domínio e destruição — poder arrancado do medo e da raiva, que dá muito e cobra mais. O Sensível da Sombra soma esta lista à Universal.</em></p>
<p><strong>As entradas ★ marcam +1 de Corrupção mesmo para quem já trilha a Sombra.</strong></p>

<h3>1ª Grandeza</h3>
<ul>
<li><strong>Choque da Força</strong> <em>(Disparo Mental, 1ª)</em> — <strong>1d6</strong> de dano (<strong>+2 por Foco extra gasto, até +10</strong>), <strong>sem direito a JPS</strong>. O "Force lightning" menor.</li>
<li><strong>Toque Sombrio</strong> <em>(adaptação — 1ª)</em> — <strong>1d4</strong> de dano ao toque e, com <strong>JPC</strong> falha, <strong>drena 1 ponto de vitalidade</strong>.</li>
</ul>

<h3>2ª Grandeza</h3>
<ul>
<li><strong>Aterrorizar</strong> <em>(Aterrorizar, 2ª)</em> — inimigos fracos na área ficam apavorados: testes Difíceis e <strong>1 em 1d6 de largar o que seguram</strong> por rodada (uma <strong>JPS</strong> nega).</li>
<li><strong>Enfraquecimento</strong> <em>(Enfraquecimento, 2ª)</em> — mina a <strong>força física e a resolução</strong> do alvo (uma <strong>JPS</strong> resiste).</li>
<li><strong>Manto de Escuridão</strong> <em>(adaptação — 2ª)</em> — <strong>trevas sobrenaturais</strong> que cegam quem não enxerga no escuro, enquanto você e os seus se movem à vontade nelas.</li>
</ul>

<h3>3ª Grandeza</h3>
<ul>
<li><strong>Relâmpagos da Força ★</strong> <em>(Choque Mental, 3ª)</em> — <strong>1d4</strong> de dano e, com <strong>JPS</strong> falha, <strong>atordoa por 1d6 rodadas</strong> (atordoado = todos os testes Difíceis). Escalável com Foco extra. <strong>Marca +1 de Corrupção sempre.</strong></li>
<li><strong>Estrangular</strong> <em>(adaptação do cenário — não use o poder-base do v1.0)</em> — <strong>alcance Visual · dura enquanto você se concentrar, até 1 rodada por nível.</strong> <strong>JPS</strong> inicial resiste; falhando, o alvo fica <strong>imobilizado</strong> (não fala, não age, não conjura) e sofre <strong>1d6 de dano por rodada</strong>, sem nova jogada. Afeta um alvo com <strong>DV até o seu nível</strong>.</li>
<li><strong>Sussurro Sombrio</strong> <em>(Induzir Pensamento, 3ª)</em> — planta <strong>um pensamento ou impulso</strong> que o alvo toma por seu.</li>
<li><strong>Hipnose</strong> <em>(Hipnose, 3ª)</em> — deixa o alvo <strong>dócil e sugestionável</strong> (uma <strong>JPS</strong> nega), pronto a obedecer ordens brandas.</li>
</ul>

<h3>4ª Grandeza</h3>
<ul>
<li><strong>Perturbar Mente</strong> <em>(Confundir Mente, 4ª)</em> — o alvo passa a <strong>agir de forma errática e imprevisível</strong>, capaz de atacar o próprio aliado.</li>
<li><strong>Reescrever Memória</strong> <em>(Alterar Memória, 4ª)</em> — <strong>altera um elemento da memória</strong> do alvo (uma <strong>JPS</strong> resiste).</li>
<li><strong>Criar Pesadelo</strong> <em>(Criar Pesadelo, 4ª)</em> — <strong>terror recorrente</strong> no sono do alvo, drenando descanso, vontade e sanidade noite após noite.</li>
</ul>

<h3>5ª Grandeza</h3>
<ul>
<li><strong>Dominação Absoluta</strong> <em>(Imobilizar Criatura, 5ª)</em> — subjuga <strong>corpo e vontade até de criaturas poderosas</strong>.</li>
<li><strong>Repelir a Fera</strong> <em>(Afastar Criatura, 5ª)</em> — <strong>força criaturas não-humanas a recuar ou fugir</strong> — até <strong>8 DV</strong> afetados (uma <strong>JPS</strong> nega).</li>
<li><strong>Rasgar a Mente</strong> <em>(adaptação — 5ª)</em> — não pergunta: entra e arranca. Falhando a JPS, o alvo entrega a informação buscada e sofre <strong>2d6</strong> com −2 em tudo por 1d6 horas; passando, ainda leva metade.</li>
</ul>

<h3>6ª Grandeza</h3>
<p><em>Não existe como item de ficha — use o texto abaixo.</em></p>
<ul>
<li><strong>Drenar Vida ★</strong> <em>(adaptação do cenário — não use o poder-base do v1.0)</em> — <strong>Alcance:</strong> Visual · <strong>Duração:</strong> instantâneo · <strong>JP:</strong> JPS — você suga a energia vital do alvo e a verte em si. <strong>Alcance Visual · instantâneo.</strong> O alvo faz uma <strong>JPS</strong>: falhando, sofre <strong>1d6 de dano</strong> e você <strong>recupera exatamente esse número em PV</strong> (nunca acima do seu máximo; o excedente vira <strong>PV temporários</strong> que duram até o próximo descanso longo). Cura à custa da vida alheia — a marca vampírica dos Sith mais antigos, e a corda de salvação de Palpatine. <strong>Marca +1 de Corrupção sempre.</strong></li>
<li><strong>Tempestade da Força ★</strong> <em>(adaptação — 6ª)</em> — <strong>Alcance:</strong> 20 metros · <strong>Duração:</strong> instantâneo · <strong>JP:</strong> JPD · <strong>Efeito:</strong> os relâmpagos deixam de sair de uma mão e passam a <strong>cair de todo lado</strong>. Numa área de <strong>10 metros de raio</strong>, tudo sofre <strong>4d6 de dano elétrico</strong>, com JPD para metade. Máquinas e droides na área sofrem o dano <strong>dobrado</strong> e ficam em curto-circuito, e aparatos tecnológicos carregados por quem estiver dentro precisam de reparo. <strong>Marca +1 de Corrupção sempre.</strong></li>
<li><strong>Corromper o Nexo ★</strong> <em>(adaptação — 6ª)</em> — <strong>Alcance:</strong> 30 metros de raio · <strong>Duração:</strong> <strong>permanente</strong> · <strong>JP:</strong> nenhuma · <strong>Efeito:</strong> um dia de ritual, e o lugar <strong>apodrece na Força</strong>. Dentro da área, <strong>poderes da lista Sombra custam metade do Foco</strong> (arredondando para baixo, mínimo 1) e <strong>todo uso da Força — de qualquer lista — marca +1 de Corrupção</strong>. Plantas murcham, animais evitam o lugar e quem dorme ali tem pesadelos. Só é desfeito por <strong><em>Purificar o Nexo</strong></em>. <strong>Marca +1 de Corrupção sempre</strong>, e mais 1 a cada mês em que o conjurador permanecer no lugar que criou.</li>
</ul>

<h3>7ª Grandeza</h3>
<p><em>Não existe como item de ficha — use o texto abaixo.</em></p>
<ul>
<li><strong>Causar Insanidade</strong> <em>(Causar Insanidade, 7ª)</em> — <strong>Alcance:</strong> Visual · <strong>Duração:</strong> permanente · <strong>JP:</strong> JPS · <strong>Efeito:</strong> o alvo faz uma <strong>nova JPS</strong> cada vez que a condição se manifestar, para evitar seus efeitos — você despedaça a <strong>sanidade</strong> do alvo (uma <strong>JPS</strong> resiste), mergulhando-o em loucura delirante. A mente inteira desfeita com um toque de vontade.</li>
<li><strong>Atormentar Mente</strong> <em>(Atormentar Mente, 7ª)</em> — <strong>Alcance:</strong> Visual · <strong>Duração:</strong> 5 segundos/nível · <strong>JP:</strong> JPS · <strong>Efeito:</strong> <strong>−8 em qualquer rolagem</strong> enquanto durar o tormento — você inflige à distância uma <strong>dor psíquica dilacerante</strong>, sem tocar um fio de cabelo: a vítima se contorce como se ardesse por dentro. Tortura pura, sem instrumento nem marca.</li>
</ul>

<h3>8ª Grandeza</h3>
<p><em>Não existe como item de ficha — use o texto abaixo.</em></p>
<ul>
<li><strong>Controlar Mente</strong> <em>(Controlar Mente, 8ª)</em> — <strong>Alcance:</strong> Visual · <strong>Duração:</strong> 1 minuto/nível · <strong>JP:</strong> JPS · <strong>Efeito:</strong> você deve manter o alvo <strong>ao alcance visual</strong>, senão o efeito se perde; grande estresse mental ou ordens potencialmente fatais quebram o controle e permitem <strong>nova JPS</strong> — o domínio pleno: o alvo <strong>obedece às suas ordens</strong> como marionete (uma <strong>JPS</strong> resiste), agindo por você contra os próprios companheiros. O fantoche do senhor Sith.</li>
<li><strong>Reescrever a Alma</strong> <em>(adaptação do cenário — não use o poder-base do v1.0)</em> — <strong>Alcance:</strong> Visual · <strong>Duração:</strong> permanente · <strong>JP:</strong> JPS — você <strong>remodela a personalidade</strong> do alvo, forjando um <strong>servo leal a partir do inimigo de ontem</strong>. <strong>Alcance Visual · permanente · sem dano.</strong> Uma <strong>JPS</strong> resiste. Falhando, a mecânica é a de <strong>Criar Dupla Personalidade (7ª)</strong> do v1.0 — nasce no alvo <strong>uma personalidade nova, de 1º nível</strong> (classe à escolha do Mestre) —, com <strong>três diferenças</strong>: a nova personalidade já vem <strong>ativa e devotada a você</strong>; ela conhece o alvo o bastante para vestir sua vida; e <strong>a personalidade antiga fica dormente, não morta</strong>. Sob estresse extremo, diante de alguém que o amou, ou por <em>Libertar da Corrupção</em> (4ª, Luz), o velho eu pode aflorar — este é o gancho de redenção do cenário, e o Mestre deve usá-lo.</li>
</ul>

<h3>9ª Grandeza</h3>
<p><em>Não existe como item de ficha — use o texto abaixo.</em></p>
<ul>
<li><strong>Dano Cerebral ★</strong> <em>(Dano Cerebral, 9ª)</em> — <strong>Alcance:</strong> Visual · <strong>Duração:</strong> permanente · <strong>JP:</strong> JPS — você <strong>devasta a mente do alvo</strong> com um só pensamento (uma <strong>JPS</strong> resiste): <strong>1d6 pontos de dano mental permanente</strong>, e o alvo <strong>desmaia na hora</strong>, inconsciente por <strong>1d4 dias</strong>. Não é a morte — é o <strong>vegetar</strong>: o inimigo que acorda dias depois já não é inteiro, e nunca mais será. Esse mesmo poder, aplicado com intenção contrária, <strong>restaura</strong> o dano que ele próprio causou (se o alvo <strong>passar</strong> na JPS). <strong>Marca +1 de Corrupção sempre.</strong></li>
<li><strong>Aprisionamento Mental</strong> <em>(Aprisionamento Mental, 9ª)</em> — <strong>Alcance:</strong> Visual · <strong>Duração:</strong> permanente · <strong>JP:</strong> JPS · <strong>Efeito:</strong> exige um <strong>cérebro positrônico</strong> sem personalidade programada; a mente aprisionada ganha a habilidade <em>Cérebro Positrônico</em> (efeitos mentais contra ela são <strong>Difíceis</strong>) e volta ao corpo original — ou ao Espírito Galáctico — se o cérebro for destruído — você tranca a <strong>consciência do alvo num cárcere sem corpo</strong>, deixando-o vivo mas preso na própria mente, mudo e imóvel. Um destino que muitos temem mais que a morte.</li>
</ul>

<h3>10ª Grandeza</h3>
<p><em>Não existe como item de ficha — use o texto abaixo.</em></p>
<ul>
<li><strong>Morte pela Força ★</strong> <em>(Morte Cerebral, 10ª)</em> — <strong>Alcance:</strong> Visual · <strong>Duração:</strong> instantâneo · <strong>JP:</strong> JPS — o feito de morte que o <strong>Dano Cerebral</strong> não é: um só pensamento <strong>desliga a vida</strong> do alvo, e ele cai. Uma <strong>JPS</strong> resiste; <strong>virtualmente qualquer criatura com cérebro</strong> é suscetível. O gesto é tão violento contra a própria Força que o conjurador <strong>sofre 1d6 de dano</strong> ao realizá-lo. Matar sem tocar, sem arma, sem testemunha — o pior do que a Sombra oferece. <strong>Marca +1 de Corrupção sempre.</strong></li>
<li><strong>Assumir o Espírito Galáctico ★</strong> <em>(Assumir Espírito Galáctico, 10ª)</em> — <strong>Alcance:</strong> Pessoal · <strong>Duração:</strong> 1 segundo/nível · <strong>JP:</strong> nenhuma · <strong>Efeito:</strong> ao final, o conjurador <strong>desmaia e fica desacordado por 1d4 dias</strong> — o feito supremo da Sombra: por um instante, você <strong>dobra a própria Força viva à sua vontade</strong>, moldando a realidade em torno de si. Cada uso fica mais difícil — exige um teste de <strong>Sabedoria com penalidade crescente</strong> — porque a galáxia resiste a ser escravizada. <strong>Marca +1 de Corrupção sempre.</strong></li>
</ul>
`,
  },
];

export const poderesJournal = {
  title: "Poderes da Força",
  pages: paginas,
};

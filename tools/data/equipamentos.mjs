// Equipamento de "Star Dragon" — transcrito de
// SW-SD-Equipamentos.md (armas corpo a corpo, blasters, sabre de luz,
// armaduras/vestes e aparatos) e de SW-SD-Sabre-e-Cristais.md (cristal kyber,
// sangramento e o Sabre Sombrio).
//
// Moeda: Crédito (CR). A tabela de preços deste arquivo É a escala canônica do
// cenário: ignore a antiga equivalência "1 CR = 1 Peça de Ouro" e os valores em
// dezenas de milhares do Space Dragon/Estrela Dracônica (um preço do
// ED-04-Equipamento dividido por 100 dá a ordem de grandeza certa aqui).
// 100 CR em chips pesam 1 ponto de carga.
// Carga (Tabela 5-1 do SD): armas pequenas = 1, médias = 2, grandes = 3.
// Munição de energia não conta carga; aparatos são leves demais para contar
// (ou usam a carga de um equipamento similar) — por isso vários itens saem sem
// weight_in_load.
//
// Aparatos: são construídos pelo Técnico. Operar — ofensivos (armas especiais,
// bombas) só o Técnico; defensivos (escudos, cintos, braceletes) também o
// Veterano; utilitários (visores, medpacs, jetpacks) qualquer um.
//
// tipo: "weapon" | "armor" | "misc"
// magic_item: reservado a sabres de luz e cristais kyber — o "loot mágico"
// desta galáxia.

// Faixas de alcance (SW-SD-Equipamentos.md § Alcance — as três faixas).
// O número entre parênteses é o alcance CURTO, sem penalidade.
const REGRA_NT =
  "<p><strong>Régua de preço por Nível Tecnológico.</strong> A conversão do Estrela Dracônica tem <strong>três faixas</strong>: <strong>NT 1–2 ÷ 1.000</strong> (20–160 CR, tecnologia difundida que se compra em qualquer doca), <strong>NT 3 ÷ 300</strong> (200–900 CR) e <strong>NT 4 ou mais ÷ 100</strong> (800–8.000 CR, o aparato raro, o \"item mágico\" desta galáxia).</p>"
  + "<p class='nota-casa'><em>Por que o NT 3 tem divisor próprio:</em> ele é a costura entre as duas escalas. Com ÷100 direto, o NT 2 terminava em 160 CR e o NT 3 começava em 600 — um salto de 10× num único degrau. Com ÷300 a sequência fica contínua (160 → 200 → 800) e <strong>nenhum degrau salta mais que 2×</strong>.</p>"
  + "<p class='nota-casa'><em>Por que o básico é barato:</em> um Técnico de 1º nível tem 1d8 × 50 CR e a classe exige que ele <strong>comece o jogo com aparatos prontos</strong>. A ÷100 ele mal compraria um, e a habilidade-assinatura da classe nasceria morta.</p>";

const ION_NOTA =
  "<p><strong>Íon.</strong> Afeta apenas <strong>máquinas</strong>. Contra droides e construtos causa <strong>dano dobrado</strong>; "
  + "contra veículos e naves <strong>desliga um sistema por 1d4 rodadas</strong> em vez de causar dano; contra criaturas vivas "
  + "<strong>não tem efeito nenhum</strong>.</p>"
  + "<p class='nota-casa'><em>Criação da casa:</em> a propriedade Íon já era citada pelo Bestiário e pela <em>Vulnerabilidade a Íon</em> do Droide, "
  + "mas não havia arma que a usasse. Valores calibrados contra a tabela do compêndio, não vindos do Space Dragon.</p>";

const ALCANCE_NOTA =
  "<p><strong>Alcance — as três faixas.</strong> O valor listado é o <strong>alcance curto</strong>, sem penalidade. Até o <strong>dobro</strong> dele o ataque sofre <strong>−2</strong>; até o <strong>triplo</strong>, <strong>−4</strong>. Além do triplo não há tiro.</p>";

// Propriedade Atordoante (SW-SD-Equipamentos.md § Tipos de Dano).
const ATORDOANTE_NOTA =
  "<p><strong>Atordoante (stun).</strong> Dano <strong>não-letal</strong>. O alvo faz uma <strong>JPC</strong>: falhando, cai <strong>inconsciente por 1d6 rodadas</strong>; passando, fica <strong>Difícil em tudo por 1 rodada</strong>. Ao acordar (ou ao passar na JPC) fica <strong>imune a novo atordoamento por 1 turno</strong>. Alvos <strong>sem sistema nervoso</strong> (droides, construtos) ignoram completamente o efeito.</p>";

// Todo blaster tem seletor de modo (mesma seção do cofre).
const MODO_ATORDOANTE_NOTA =
  "<p><strong>Modo atordoante.</strong> Este blaster tem um <strong>seletor de modo</strong>. No modo atordoante não causa dano: aplica a propriedade <strong>Atordoante</strong>. Trocar o modo é uma <strong>ação livre</strong> no início do turno.</p>" +
  ATORDOANTE_NOTA;

// Redução de movimento das vestes (SW-SD-Equipamentos.md § Armaduras).
const ESCUDO_FAMILIA =
  "<p><em>A família de escudos de energia tem três degraus e <strong>três permissões diferentes</strong>, que é o que impede o degrau de baixo de virar item obrigatório: <strong>Gerador de Escudo Pessoal</strong> (+1, 80 CR) é aparato defensivo — Técnico e Veterano; <strong>Escudo de Energia</strong> (+2, 1.500 CR) é escudo — só quem a classe permite; <strong>Campo de Força Individual</strong> (+4 por 1 minuto, 2.400 CR) é aparato defensivo. <strong>Nunca somam entre si:</strong> vale o maior bônus ativo. O Operativo e o Sensível não alcançam nenhum dos três — é a contrapartida de terem talento e Força.</em></p>";

const SOMA_ESCUDO_NOTA =
  "<p><strong>Escudo, armadura e gerador não se anulam</strong> — somam-se normalmente à CA, respeitada a restrição de classe. Só o <em>Gerador de Escudo Pessoal</em> e o <em>Campo de Força Individual</em> é que não acumulam entre si: vale o maior bônus ativo.</p>";

const MOVIMENTO_NOTA =
  "<p><em>A redução de movimento é subtraída do movimento-base de <strong>9 m</strong>, antes das penalidades de gravidade, terreno e carga.</em></p>";

// Quem opera cada faixa de aparato (SW-SD-Equipamentos.md § Quem pode usar um
// aparato). Usar um aparato pronto não pede rolagem.
const ACESSO_OFENSIVO =
  "<p><em>Aparato <strong>ofensivo</strong>: só o Técnico e o Caçador de Recompensas o operam.</em></p>";
const ACESSO_DEFENSIVO =
  "<p><em>Aparato <strong>defensivo</strong>: Técnico e Veterano.</em></p>";
const ACESSO_UTILITARIO =
  "<p><em>Aparato <strong>utilitário</strong>: qualquer um pode operar.</em></p>";

// Preço e tempo de construção vêm de ED-07-Aparatos-e-Feitos §7.7, com o preço
// convertido pela regra da casa (ED ÷ 100). Consertar, recarregar ou adaptar
// custa ¼ do valor e até metade do tempo.
const construcao = (tempo) =>
  `<p><em>Construção: ${tempo}. Consertar, recarregar ou adaptar custa <strong>¼ do valor</strong> e até <strong>metade do tempo</strong>.</em></p>`;

// Porte e Disponibilidade (SW-SD-Equipamentos.md § Porte / § Disponibilidade).
// O cenário já herdara os rótulos Pequena/Média/Grande e a etiqueta "Duas
// Mãos", mas nunca escrevera o que eles faziam.
const PORTE_NOTA =
  "<p><strong>Porte.</strong> <strong>Pequena:</strong> uma mão — pode ser usada com as duas para <strong>+2 na rolagem de ataque</strong>. <strong>Média:</strong> preferencialmente duas mãos; empunhada com uma só, <strong>−2 no ataque</strong>. <strong>Grande:</strong> sempre as duas mãos, sem alternativa.</p>";

const DISP_NOTA =
  "<p><strong>Disponibilidade</strong> não muda nada em combate: muda onde se compra e o que acontece numa revista. <strong>—</strong> livre · <strong>Licenciada</strong> exige licença de porte · <strong>Restrita</strong> mercado cinzento · <strong>Militar</strong> só forças armadas · <strong>Ilegal</strong> portar já é crime · <strong>Rara</strong> não é questão de lei, é de existir.</p>" +
  "<p><em>Fora dos mundos de fronteira, portar item Restrito, Militar ou Ilegal de forma visível atrai a lei. Escondido, é um teste de Destreza contra a revista — Fácil se for pequeno, Difícil se for Grande, impossível se for uma armadura.</em></p>";

// Consequência de usar fora da faixa da classe. Antes só o Operativo tinha isto
// escrito; agora vale para as quatro classes.
const FORA_DA_FAIXA_NOTA =
  "<p><strong>Fora da faixa da sua classe:</strong> <strong>−2 em todas as rolagens de ataque</strong> com a arma e <strong>perda das habilidades de classe que dependem de mobilidade ou precisão</strong> (talentos do Operativo, Forma de Sabre do Guardião, Ataque Furtivo) enquanto estiver assim. As passivas continuam valendo.</p>";

// A primeira linha da descrição de armas e armaduras é MONTADA a partir dos
// campos `uso`/`tipo_armadura` e `disp`, em vez de escrita à mão em cada item:
// etiqueta repetida em prosa é etiqueta que diverge da tabela na próxima
// revisão. Só quem declara os campos ganha a linha.
function anotaCategorias(cats) {
  for (const cat of cats) {
    for (const it of cat.itens) {
      const rotulo = it.uso ? "Uso" : it.tipo_armadura ? "Tipo" : null;
      if (!rotulo) continue;
      const valor = it.uso || it.tipo_armadura;
      const disp = it.disp && it.disp !== "—" ? ` · <strong>Disp.:</strong> ${it.disp}` : "";
      it.desc = `<p><strong>${rotulo}:</strong> ${valor}${disp}</p>` + (it.desc || "");
      if (it.uso) it.desc += PORTE_NOTA;
      it.desc += DISP_NOTA + FORA_DA_FAIXA_NOTA;
    }
  }
  return cats;
}

const CATEGORIAS = [
  {
    folder: "Armas Corpo a Corpo",
    tipo: "weapon",
    itens: [
      { nome: "Vibro-Adaga", uso: "Leve", disp: "—", damage: "1d4", damage_type: "perfurante", cost: "15 CR", weight_in_load: 1, throw_range: 9, desc: "<p>Pequena, Vibro, Perfurante, Arremesso (9 m).</p>" + ALCANCE_NOTA },
      { nome: "Bastão de Treinamento", uso: "Leve", disp: "—", damage: "1d4", damage_type: "impactante", cost: "10 CR", weight_in_load: 1, two_handed: true, desc: "<p>Pequena, Impactante, Duas Mãos.</p>" },
      { nome: "Cassetete de Choque", uso: "Leve", disp: "—", damage: "1d4", damage_type: "impactante", cost: "20 CR", weight_in_load: 1, desc: "<p>Pequena, Impactante, <em>Nocaute</em>.</p><p><strong>Nocaute:</strong> causa metade do dano e aplica a regra de nocaute (1 em 1d6, ou pelo modificador de Força, para desacordar o alvo).</p>" },
      { nome: "Vibro-Lâmina Curta", uso: "Leve", disp: "Licenciada", damage: "1d6", damage_type: "cortante", cost: "60 CR", weight_in_load: 1, desc: "<p>Pequena, Vibro, Cortante.</p>" },
      { nome: "Lança Vibro", uso: "Marcial", disp: "Licenciada", damage: "1d6", damage_type: "perfurante", cost: "80 CR", weight_in_load: 2, throw_range: 12, versatile: true, desc: "<p>Média, Vibro, Perfurante, Arremesso (12 m), Haste, Versátil.</p>" + ALCANCE_NOTA },
      { nome: "Vibro-Lâmina", uso: "Marcial", disp: "Licenciada", damage: "1d8", damage_type: "cortante", cost: "100 CR", weight_in_load: 2, desc: "<p>Média, Vibro, Cortante.</p>" },
      { nome: "Vibro-Machado", uso: "Marcial", disp: "Restrita", damage: "1d8", damage_type: "cortante", cost: "90 CR", weight_in_load: 2, desc: "<p>Média, Vibro, Cortante.</p>" },
      { nome: "Vibro-Lâmina Pesada", uso: "Marcial", disp: "Licenciada", damage: "1d8", damage_type: "cortante", cost: "150 CR", weight_in_load: 2, versatile: true, desc: "<p>Média, Vibro, Versátil, Cortante.</p>" },
      { nome: "Lança-Vibro Mandaloriana", uso: "Marcial", disp: "Rara", damage: "1d10", damage_type: "perfurante", cost: "400 CR", weight_in_load: 2, throw_range: 9, desc: "<p>Média, Vibro, Perfurante, Haste, Arremesso (9 m).</p><p>Exige <strong>treino cultural Mandaloriano</strong>.</p>" + ALCANCE_NOTA },
      { nome: "Vibro-Machado Pesado", uso: "Marcial", disp: "Restrita", damage: "2d6", damage_type: "cortante", cost: "220 CR", weight_in_load: 3, two_handed: true, desc: "<p>Grande, Vibro, Cortante, Duas Mãos.</p>" },
      { nome: "Bastão Eletrificado", uso: "Marcial", disp: "Restrita", damage: "1d8", damage_type: "impactante", cost: "250 CR", weight_in_load: 3, two_handed: true, desc: "<p>Grande, Impactante, Duas Mãos, <em>Nocaute</em>.</p><p><strong>Nocaute:</strong> causa metade do dano e aplica a regra de nocaute (1 em 1d6, ou pelo modificador de Força, para desacordar o alvo).</p>" },
    ],
  },
  {
    folder: "Blasters e Armas de Energia",
    tipo: "weapon",
    itens: [
      { nome: "Blaster Leve", uso: "Leve", disp: "Licenciada", damage: "1d6", cost: "150 CR", weight_in_load: 1, ranged: true, shoot_range: 36, desc: "<p>Pequena, Energia, Disparo (36 m).</p>" + ALCANCE_NOTA + MODO_ATORDOANTE_NOTA },
      { nome: "Carabina Blaster", uso: "Marcial", disp: "Restrita", damage: "1d6", cost: "350 CR", weight_in_load: 2, ranged: true, shoot_range: 54, two_handed: true, desc: "<p>Média, Energia, Disparo (54 m), Duas Mãos.</p>" + ALCANCE_NOTA + MODO_ATORDOANTE_NOTA },
      { nome: "Blaster Pesado (pistola)", uso: "Leve", disp: "Restrita", damage: "1d8", cost: "300 CR", weight_in_load: 1, ranged: true, shoot_range: 30, desc: "<p>Pequena, Energia, Disparo (30 m), <strong>Recarga</strong>.</p>" + ALCANCE_NOTA + MODO_ATORDOANTE_NOTA },
      { nome: "Rifle Blaster", uso: "Marcial", disp: "Restrita", damage: "1d8", cost: "450 CR", weight_in_load: 2, ranged: true, shoot_range: 72, two_handed: true, desc: "<p>Média, Energia, Disparo (72 m), Duas Mãos.</p>" + ALCANCE_NOTA + MODO_ATORDOANTE_NOTA },
      { nome: "Besta Wookiee (Bowcaster)", uso: "Marcial", disp: "Rara", damage: "1d10", cost: "700 CR", weight_in_load: 2, ranged: true, shoot_range: 54, two_handed: true, desc: "<p>Média, Energia, Disparo (54 m), Duas Mãos, <strong>Recarga</strong>.</p><p>Exige <strong>FOR 15+</strong>.</p>" + ALCANCE_NOTA + MODO_ATORDOANTE_NOTA },
      { nome: "Blaster de Assalto Pesado", uso: "Marcial", disp: "Militar", damage: "2d6", cost: "900 CR", weight_in_load: 3, ranged: true, shoot_range: 90, two_handed: true, desc: "<p>Grande, Energia, Disparo (90 m), Duas Mãos, <strong>Recarga</strong>.</p>" + ALCANCE_NOTA + MODO_ATORDOANTE_NOTA },
      { nome: "Rifle Íon", uso: "Marcial", disp: "Restrita", damage: "1d8", cost: "500 CR", weight_in_load: 2, ranged: true, shoot_range: 54, two_handed: true, desc: "<p>Média, Energia, Disparo (54 m), Duas Mãos, <strong>Íon</strong>. Rifle de projeção iônica, feito para derrubar droides sem furar a parede atrás deles.</p>" + ION_NOTA + ALCANCE_NOTA },
      { nome: "Lançador de Rede", uso: "Utilitária", disp: "Licenciada", cost: "200 CR", weight_in_load: 1, ranged: true, shoot_range: 18, desc: "<p>Pequena, Especial, Disparo (18 m), <strong>Enreda</strong>. Não causa dano.</p>" + ALCANCE_NOTA },
      { nome: "Granada de Fragmentação", uso: "Utilitária", disp: "Militar", damage: "2d6", cost: "150 CR", weight_in_load: 1, melee: false, throw_range: 9, desc: "<p>Pequena, Arremesso (9 m), <strong>Área</strong>.</p>" + ALCANCE_NOTA },
      { nome: "Detonador Térmico", uso: "Utilitária", disp: "Ilegal", damage: "3d6", cost: "400 CR", weight_in_load: 1, melee: false, throw_range: 9, desc: "<p>Pequena, Arremesso (9 m), <strong>Área</strong>.</p>" + ALCANCE_NOTA },
      { nome: "Granada Atordoante", uso: "Utilitária", disp: "Restrita", cost: "180 CR", weight_in_load: 1, melee: false, throw_range: 9, desc: "<p>Pequena, Arremesso (9 m), <strong>Área</strong>, <strong>Atordoante</strong>. Não causa dano.</p>" + ALCANCE_NOTA + ATORDOANTE_NOTA },
      { nome: "Granada de Íon", uso: "Utilitária", disp: "Restrita", damage: "2d6", cost: "200 CR", weight_in_load: 1, melee: false, throw_range: 9, desc: "<p>Pequena, Arremesso (9 m), <strong>Área</strong>, <strong>Íon</strong>. Estoura numa cúpula azul e silenciosa que derruba um esquadrão de droides de uma vez; um alvo vivo no meio da área não sente nada.</p>" + ION_NOTA + ALCANCE_NOTA },
    ],
  },
  {
    folder: "Sabres de Luz",
    tipo: "weapon",
    itens: [
      { nome: "Sabre de Luz", uso: "Leve", disp: "Rara", damage: "1d10", weight_in_load: 1, magic_item: true, desc: "<p>Pequena, Vibro-energia. <em>Exclusivo de personagens Sensíveis à Força.</em></p><p>Ignora o bônus de qualquer armadura que não seja <strong>Beskar</strong>.</p><p>Quem não for Sensível à Força e tentar empunhá-lo faz ataques sempre <strong>Muito Difíceis</strong>, com 1-2 em 1d6 de se ferir a cada uso.</p><p><strong>Sem preço de mercado</strong> — é construído por um rito da Força ou achado como item único.</p><p><strong>Construir o próprio sabre</strong> é um marco na vida de um Sensível — tradicionalmente sua primeira Provação, ou uma cena de <em>downtime</em> combinada com o Mestre. Exige um cristal kyber sintonizado + componentes técnicos (emissor, célula, empunhadura) + um período de concentração através da Força (horas a dias de meditação). Você pode empunhar o sabre alheio, mas <strong>o sabre que você mesmo construiu</strong> nunca falha nem \"sangra\" nas suas mãos — é uma extensão sua.</p>" },
      { nome: "Sabre Sombrio (Darksaber)", uso: "Leve", disp: "Rara", damage: "1d10", weight_in_load: 1, magic_item: true, desc: "<p>Lâmina <strong>negra, achatada como uma espada</strong> e mais curta que um sabre comum, forjada há mais de mil anos por <strong>Tarre Vizsla — o primeiro Mandaloriano admitido na Ordem Jedi</strong>. Artefato único e, entre os Mandalorianos, símbolo de liderança de Mandalore.</p><p><em>Artefato único, sem preço — conquistado ou encontrado.</em></p><ul><li><strong>Ficha:</strong> como um Sabre de Luz (1d10, Pequena), porém a lâmina negra <strong>corta até a Beskar</strong> — a única lâmina que ignora o bônus de CA da Armadura Beskar.</li><li><strong>O Peso da Dúvida:</strong> quem o empunha <strong>sem tê-lo conquistado em combate</strong> sofre <strong>−1 nos ataques</strong> com ele até vencer um duelo empunhando a lâmina. Quem o ganha por vitória não sofre a penalidade.</li><li><strong>O Direito de Mandalore:</strong> portá-lo é <strong>reivindicar a liderança de Mandalore</strong> — enorme gancho político, casando com o papel Portador da Herança.</li></ul><p>O Sabre Sombrio não exige ser Sensível à Força (Mandalorianos comuns o carregaram) — mas nas mãos de um Sensível que o conquistou, é uma lenda viva.</p>" },
    ],
  },
  {
    folder: "Cristais Kyber",
    tipo: "misc",
    itens: [
      { nome: "Cristal Kyber", magic_item: true, desc: "<p>No coração de todo sabre há um <strong>cristal kyber</strong>, pedra sensível à Força que focaliza a lâmina. Cristais são incolores ou pálidos; quando um usuário se <strong>sintoniza</strong> por meditação, o cristal <strong>assume uma cor</strong> que reflete o vínculo.</p><p>A cor é <strong>narrativa, não mecânica</strong> — não dá bônus —, mas costuma seguir a Senda do portador:</p><ul><li><strong>Azul:</strong> Guardiões da Luz (o Jedi de sabre).</li><li><strong>Verde:</strong> Consulares da Luz (mais ligados à Força que à lâmina).</li><li><strong>Amarelo / raros:</strong> Sentinelas e híbridos que equilibram combate e mística.</li><li><strong>Vermelho:</strong> Caminho da Sombra — obtido pelo Sangramento.</li></ul><p><strong>Sangrar o cristal (o vermelho Sith):</strong> um personagem do Caminho da Sombra pode sangrar um cristal, derramando ódio e dor até que ele racha e se recolore num vermelho ardente.</p><ul><li><strong>Custo:</strong> o ato marca <strong>+1 de Corrupção</strong>.</li><li><strong>Benefício:</strong> enquanto o portador estiver com <strong>Corrupção 3+</strong>, o sabre vermelho concede <strong>+1 no dano</strong>. Abaixo disso, é um sabre comum vermelho.</li><li><strong>Purificar:</strong> um cristal sangrado pode ser purificado por um ato da Luz, voltando à cor clara. Conta como um gesto de <strong>Redenção</strong> — simbólico e mecânico.</li></ul><p>O vermelho é uma tentação, não um upgrade grátis: o dano extra custa Corrupção e só vale enquanto o portador está fundo na Sombra.</p><p><em>Cristais raros/lendários podem conceder propriedades especiais (um segundo dado de dano, resistência a desarme), a critério do Mestre como recompensa única — não como padrão.</em></p>" },
    ],
  },
  {
    folder: "Armaduras e Escudos",
    tipo: "armor",
    itens: [
      { nome: "Traje Reforçado", tipo_armadura: "Leve", disp: "—", bonus_ca: 1, cost: "50 CR", weight_in_load: 1, desc: "<p>Veste Leve. <strong>Movimento:</strong> sem redução.</p>" },
      { nome: "Armadura de Combate Leve", tipo_armadura: "Leve", disp: "Licenciada", bonus_ca: 2, cost: "200 CR", weight_in_load: 1, desc: "<p>Veste Leve. <strong>Movimento:</strong> sem redução.</p>" },
      { nome: "Armadura Compósita", tipo_armadura: "Média", disp: "Licenciada", bonus_ca: 3, cost: "350 CR", weight_in_load: 2, desc: "<p>Veste Média. <strong>Movimento: −1 m.</strong></p>" + MOVIMENTO_NOTA },
      { nome: "Armadura de Assalto", tipo_armadura: "Média", disp: "Restrita", bonus_ca: 4, cost: "600 CR", weight_in_load: 2, desc: "<p>Veste Média. <strong>Movimento: −1 m.</strong></p>" + MOVIMENTO_NOTA },
      { nome: "Armadura Pesada", tipo_armadura: "Pesada", disp: "Militar", bonus_ca: 5, cost: "3.000 CR", weight_in_load: 3, desc: "<p>Veste Pesada. <strong>Movimento: −3 m.</strong></p>" + MOVIMENTO_NOTA },
      { nome: "Armadura de Batalha Completa", tipo_armadura: "Pesada", disp: "Militar", bonus_ca: 7, cost: "20.000 CR", weight_in_load: 3, desc: "<p>Veste Pesada. <strong>Movimento: −3 m.</strong></p>" + MOVIMENTO_NOTA },
      { nome: "Gerador de Escudo Pessoal", tipo_armadura: "aparato defensivo", disp: "—", bonus_ca: 1, cost: "80 CR", desc: "<p>Leve. <strong>Acoplado ao cinto, sempre ativo — não ocupa a mão.</strong> Movimento: sem redução.</p><p><strong>Equivalência:</strong> é o <em>Campo de força individual</em> do ED-07 (defensivo, NT 4) na sua versão civil. <strong>Não são o mesmo item mecânico:</strong> o gerador de cinto dá <strong>+1 de CA permanente por 80 CR</strong>; o aparato militar dá <strong>+4 de CA por 1 minuto</strong>, recarrega em 1d4 horas e custa <strong>2.400 CR</strong> (ED $240.000 ÷ 100). Quem tiver os dois <strong>não soma</strong>: vale o maior bônus ativo.</p>" + ACESSO_DEFENSIVO },
      { nome: "Escudo de Energia", tipo_armadura: "Escudo", disp: "Restrita", bonus_ca: 2, cost: "1.500 CR", desc: "<p>Projetor de campo preso ao antebraço, sempre ativo. <strong>Não ocupa a mão.</strong> É <strong>o escudo</strong> a que as classes se referem quando dizem \"e escudo\". Leve demais para contar carga.</p><p class='nota-casa'><em>Resgatado do livro, não inventado: é o Escudo de energia da tabela de vestes do Space Dragon (+2 de proteção, $150.000, \"muito leve para contar carga\"), que a conversão não trouxe — e sem ele três classes tinham permissão para usar um item que não existia. Entra pela régua ÷100.</em></p>" + ESCUDO_FAMILIA },
      { nome: "Escudo Antimotim", tipo_armadura: "Escudo", disp: "Licenciada", bonus_ca: 2, cost: "250 CR", weight_in_load: 2, desc: "<p>Placa física que cobre o corpo. <strong>Ocupa uma mão</strong> — esse é o preço de ser barato. <strong>Movimento: −1 m.</strong></p><p>O escudo da tropa de choque e da segurança corporativa, para quem não tem 1.500 CR.</p><p class='nota-casa'><em>Criação da casa — é o único da família que não vem do livro.</em></p>" },
      { nome: "Armadura Beskar (Beskar'gam)", tipo_armadura: "Média", disp: "Rara", bonus_ca: 6, weight_in_load: 2, desc: "<p>Proteção de armadura pesada com o peso de uma <strong>média</strong>. <strong>Movimento: −1 m.</strong></p><p><strong>Resistente a Sabres:</strong> sabres não ignoram seu bônus de CA.</p><p><em>Sem preço — herança/conquista.</em></p><p><em>O Beskar paga menos (−1 m) porque isso <strong>é</strong> a lenda do beskar: proteção de armadura pesada com a mobilidade de uma média. É a vantagem mecânica do Mandaloriano, não um esquecimento.</em></p><p class='nota-casa'><em>Correção da casa: ela estava classificada como <strong>Pesada</strong>, e isso a proibia a Operativo, Técnico e Sensível à Força — ou seja, só um Veterano poderia ser Mandaloriano, o que contradiz a Senda Mandaloriana ser explicitamente cross-class. Como já pagava a redução de movimento de uma média, a categoria virou <strong>Média</strong>: vestível pelo Operativo e pelo Guardião, e ainda fora do alcance do Técnico. O +6 não mudou.</em></p>" + MOVIMENTO_NOTA },
      { nome: "Selagem Espacial (acréscimo)", tipo_armadura: "acréscimo", disp: "—", bonus_ca: 0, cost: "+400 CR", weight_in_load: 1, desc: "<p><strong>Acréscimo</strong> a qualquer armadura desta lista: capacete e pressurização acoplados. Permite <strong>vácuo e atmosferas tóxicas</strong> enquanto houver oxigênio. <strong>Movimento: −2 m</strong> (soma-se à redução da armadura de base) e <strong>+1 de carga</strong>.</p><p>Exige um <strong>Cilindro de Oxigênio</strong> para funcionar: sem ele, o traje só protege de temperatura e pressão, não da falta de ar.</p>" + MOVIMENTO_NOTA },
      { nome: "Selagem Aquática (acréscimo)", tipo_armadura: "acréscimo", disp: "—", bonus_ca: 0, cost: "+300 CR", weight_in_load: 1, desc: "<p><strong>Acréscimo</strong> a qualquer armadura desta lista, para <strong>submersão</strong>. <strong>Movimento: −2 m</strong> em terra (<strong>sem redução</strong> dentro d'água) e <strong>+1 de carga</strong>.</p><p>Exige um <strong>Cilindro de Oxigênio</strong> para funcionar.</p>" + MOVIMENTO_NOTA },
    ],
  },
  {
    folder: "Aparatos Tecnológicos",
    tipo: "misc",
    itens: [
      { nome: "Carga Sísmica", nt: 8, cost: "4.000 CR", weight_in_load: 2, desc: "<p><strong>Ofensivo, NT 8.</strong> Enterrada ou fixada no solo e detonada por comunicador. Abala <strong>50 m de raio</strong>: <strong>4d6</strong> a tudo em contato com o chão (<strong>JPD</strong> reduz à metade) e estruturas frágeis desabam. <strong>Inútil no vácuo, na água ou em queda livre</strong> — precisa de solo para transmitir.</p>" + "<p class='nota-casa'><em>Criação da casa:</em> não tem equivalente no ED-07 — foi escrito para fechar uma lacuna do catálogo. Valores calibrados contra os aparatos vizinhos, não convertidos.</p>" + ACESSO_OFENSIVO + construcao("1d6 dias") },
      { nome: "Coleira Supressora", nt: 9, cost: "7.000 CR", desc: "<p><strong>Ofensivo, NT 9.</strong> Travada no pescoço de um <strong>Sensível à Força</strong>, corta o acesso à Força <strong>por completo</strong> — Foco nenhum, poder nenhum. Só sai com a chave, com um teste <strong>Difícil</strong> de Sabotagem, ou matando quem a veste. É o instrumento com que um regime prende um Jedi vivo.</p>" + "<p class='nota-casa'><em>Criação da casa:</em> não tem equivalente no ED-07 — foi escrito para fechar uma lacuna do catálogo. Valores calibrados contra os aparatos vizinhos, não convertidos.</p>" + ACESSO_OFENSIVO + construcao("1d4 meses") },
      { nome: "Inibidor de Campo da Força", nt: 8, cost: "5.000 CR", weight_in_load: 3, desc: "<p><strong>Defensivo, NT 8.</strong> Emissor fixo que cria uma <strong>zona morta de 15 m de raio</strong>: dentro dela <strong>nenhum poder da Força funciona</strong>, inclusive os de quem o ligou. Dura <strong>1 hora</strong>, recarga de 1d6 h. Um Sensível dentro da zona <strong>sente a ausência</strong> — é uma experiência descrita como surdez.</p>" + "<p class='nota-casa'><em>Criação da casa:</em> não tem equivalente no ED-07 — foi escrito para fechar uma lacuna do catálogo. Valores calibrados contra os aparatos vizinhos, não convertidos.</p>" + ACESSO_DEFENSIVO + construcao("1d6 semanas") },
      { nome: "Bastão Luminoso", nt: 1, cost: "20 CR", desc: "<p><strong>Utilitário, NT 1.</strong> Ilumina <strong>6 m</strong> de raio por <strong>12 horas</strong>. Pode ser fixado, jogado num corredor ou quebrado para um clarão único. Tem modo vermelho fraco que ilumina só <strong>2 m</strong> e não se vê de longe.</p>" + "<p class='nota-casa'><em>Criação da casa:</em> não tem equivalente no ED-07 — foi escrito para fechar uma lacuna do catálogo. Valores calibrados contra os aparatos vizinhos, não convertidos.</p>" + ACESSO_UTILITARIO + construcao("1d4 horas") },
      { nome: "Sintetizador de Rações", nt: 2, cost: "100 CR", weight_in_load: 2, desc: "<p><strong>Utilitário, NT 2.</strong> Converte biomassa — restos, vegetação, praticamente qualquer matéria orgânica — em ração comestível. Alimenta <strong>4 pessoas por dia</strong>. O gosto é uma ofensa, e ninguém finge o contrário.</p>" + "<p class='nota-casa'><em>Criação da casa:</em> não tem equivalente no ED-07 — foi escrito para fechar uma lacuna do catálogo. Valores calibrados contra os aparatos vizinhos, não convertidos.</p>" + ACESSO_UTILITARIO + construcao("1d4 dias") },
      { nome: "Vaporizador de Umidade", nt: 2, cost: "120 CR", weight_in_load: 3, desc: "<p><strong>Utilitário, NT 2.</strong> Extrai água potável do ar: <strong>20 litros por dia</strong> em clima seco, o dobro em úmido. <strong>Instalação fixa</strong> — não se carrega ligado. Em mundos desérticos, é a diferença entre um povoado e uma ruína.</p>" + "<p class='nota-casa'><em>Criação da casa:</em> não tem equivalente no ED-07 — foi escrito para fechar uma lacuna do catálogo. Valores calibrados contra os aparatos vizinhos, não convertidos.</p>" + ACESSO_UTILITARIO + construcao("1d4 dias") },
      { nome: "Arrombador Eletrônico", nt: 2, cost: "140 CR", desc: "<p><strong>Utilitário, NT 2.</strong> Burla fechaduras e painéis eletrônicos: <strong>1-3 em 1d6</strong>, <strong>uma tentativa por fechadura</strong>. Um <strong>Operativo</strong> usa a chance do próprio talento <em>Sabotagem</em> em vez desta, e o aparato lhe dá <strong>+1</strong>.</p>" + "<p class='nota-casa'><em>Criação da casa:</em> não tem equivalente no ED-07 — foi escrito para fechar uma lacuna do catálogo. Valores calibrados contra os aparatos vizinhos, não convertidos.</p>" + ACESSO_UTILITARIO + construcao("1d6 horas") },
      { nome: "Plataforma Repulsora de Carga", nt: 2, cost: "160 CR", desc: "<p><strong>Utilitário, NT 2.</strong> Disco repulsor que sustenta <strong>200 kg</strong> e acompanha quem o comanda a até <strong>20 m</strong>. Não sobe mais de 1 m do chão nem atravessa terreno quebrado.</p>" + "<p class='nota-casa'><em>Criação da casa:</em> não tem equivalente no ED-07 — foi escrito para fechar uma lacuna do catálogo. Valores calibrados contra os aparatos vizinhos, não convertidos.</p>" + ACESSO_UTILITARIO + construcao("1d4 dias") },
      { nome: "Garras de Aderência", nt: 3, cost: "400 CR", weight_in_load: 1, desc: "<p><strong>Utilitário, NT 3.</strong> Luvas e joelheiras magneto-adesivas: escala paredes e tetos ao <strong>deslocamento normal</strong>. Em superfície metálica, <strong>sucesso automático</strong>; em qualquer outra, <strong>1-4 em 1d6</strong> — falhar é cair.</p>" + "<p class='nota-casa'><em>Criação da casa:</em> não tem equivalente no ED-07 — foi escrito para fechar uma lacuna do catálogo. Valores calibrados contra os aparatos vizinhos, não convertidos.</p>" + ACESSO_UTILITARIO + construcao("1d6 dias") },
      { nome: "Amortecedor Acústico", nt: 4, cost: "1.200 CR", weight_in_load: 1, desc: "<p><strong>Utilitário, NT 4.</strong> Bolha de silêncio absoluto de <strong>5 m de raio</strong> por <strong>10 minutos</strong>: som nenhum entra ou sai. Dentro dela <strong>não funciona comunicador</strong> e <strong>não se usa poder que exija a voz</strong> — inclusive os seus.</p>" + "<p class='nota-casa'><em>Criação da casa:</em> não tem equivalente no ED-07 — foi escrito para fechar uma lacuna do catálogo. Valores calibrados contra os aparatos vizinhos, não convertidos.</p>" + ACESSO_UTILITARIO + construcao("1d4 dias") },
      { nome: "Mochila de Propulsão (Jetpack)", nt: 3, cost: "2.500 CR", desc: "<p>Voo/salto até 18 m, 6 rodadas por dia; recarrega após descanso.</p><p><strong>Equivalência:</strong> é a <em>Mochila a jato</em> do ED-07 (utilitário, NT 3). O valor convertido lá seria <strong>1.500 CR</strong> (ED $150.000 ÷ 100); vale o preço do cenário.</p>" + ACESSO_UTILITARIO },
      { nome: "Capacete com Visor Tático", acessorio: true, cost: "300 CR", desc: "<p>+1 em Procurar e em ataques à distância contra alvos distantes.</p><p>Acessório comercial. O aparato de verdade é o <strong>Visor de Precisão</strong> (+2 e ignora cobertura não sólida) — <strong>não acumulam</strong>: use o melhor.</p>" + ACESSO_UTILITARIO },
      { nome: "Lançador de Cabo", nt: 2, cost: "150 CR", desc: "<p>Como um Arpéu, dispara a 18 m sem teste.</p><p><strong>Equivalência:</strong> é o <em>Lançador de gancho</em> do ED-07 (utilitário, NT 2), cujo alcance de projeção é de <strong>30 m</strong> e cuja <strong>corda não vem inclusa</strong>. Valor convertido: <strong>800 CR</strong> (ED $80.000 ÷ 100); vale o preço do cenário.</p>" + ACESSO_UTILITARIO },
      { nome: "Algemas de Choque", nt: 2, cost: "50 CR", desc: "<p>+1d4 de choque se a vítima tentar se soltar sem o código.</p><p><strong>Equivalência:</strong> são as <em>Algemas eletrônicas</em> do ED-07 (utilitário, NT 2). Funcionam indefinidamente, mas podem sofrer curto-circuito se atingidas ou sabotadas, e <strong>só é possível algemar um inimigo inconsciente, imobilizado ou sob controle</strong> de outro personagem. Valor convertido: <strong>800 CR</strong>; vale o preço do cenário.</p>" + ACESSO_UTILITARIO },
      { nome: "Sensor de Movimento", acessorio: true, cost: "350 CR", desc: "<p>Detecta movimento em 9 m.</p><p><strong>Equivalência:</strong> o ED-07 <strong>não tem</strong> um sensor de movimento. O parente mais próximo é o <strong>Visor Térmico</strong> (<em>Óculos de visão térmica</em>, NT 1, 200 CR), que lê assinatura térmica. Trate este item como uma <strong>modificação de finalidade</strong> daquele projeto (§7.5: mesmo preço-base, tempo dobrado), sem a penalidade de −4 nos ataques — não é um visor que se usa no rosto.</p>" + ACESSO_UTILITARIO },
      { nome: "Mira a Laser", acessorio: true, cost: "120 CR", desc: "<p>+1 no primeiro ataque de cada combate com arma de energia.</p><p>Acessório comercial, versão barata do <strong>Visor de Precisão</strong> (+2 sempre e ignora cobertura não sólida). <strong>Não acumulam</strong>: use o melhor.</p>" + ACESSO_UTILITARIO },
      { nome: "Disruptor Positrônico", nt: 1, desc: "<p>Aparato do <strong>Técnico</strong> para <strong>Desativar Droides</strong> (ver Classes).</p><p><strong>Equivalência:</strong> é o <em>Disruptor positrônico</em> do ED-07 (ofensivo, NT 1). Parece um pequeno rádio e causa conflito nos cérebros positrônicos — quanto mais primitivo o droide, mais fácil desativá-lo. Corresponde ao <strong>1º nível</strong> do Técnico e <strong>deve ser atualizado a cada nível</strong> (custo de reparo); falhas em tentativas extras causam <strong>curto-circuito</strong> e exigem conserto. Custo de construção: <strong>700 CR</strong> (ED $70.000 ÷ 100) — não tem preço de tabela, é construído.</p>" + ACESSO_OFENSIVO },
    ],
  },
  {
    // Catálogo completo do ED-07 §7.7, reskinado para Star Wars: só o NOME muda,
    // NT/categoria/efeito são os do ED. Preços pela regra da casa: ED ÷ 100.
    // Os aparatos que o cenário já nomeava (Comlink, Algemas de Choque,
    // Lançador de Cabo, Jetpack, Gerador de Escudo Pessoal, Disruptor
    // Positrônico) NÃO se repetem aqui — a equivalência está declarada no item
    // original.
    folder: "Aparatos Tecnológicos — Catálogo do ED",
    tipo: "misc",
    itens: [
      { nome: "Cortador de Fusão", cost: "40 CR", weight_in_load: 1, desc: "<p><strong>Ofensivo, NT 1.</strong> Feixe de laser que corta lentamente superfícies finas (portas, paredes). Como arma: <strong>ataque corpo a corpo, 1d4 de dano</strong>.</p>" + ACESSO_OFENSIVO + construcao("1d10 horas") },
      { nome: "Manoplas de Choque", cost: "600 CR", desc: "<p><strong>Ofensivo, NT 3.</strong> Ataque corpo a corpo: <strong>1d6 elétrico</strong> ao toque; descarga à distância: <strong>1d4</strong>. Enquanto as usa, qualquer ataque corporal causa <strong>+2 de dano elétrico</strong> — mas outros aparatos que você esteja segurando podem sofrer <strong>curto-circuito</strong>.</p>" + ACESSO_OFENSIVO + construcao("1d4 dias") },
      { nome: "Carga de Detonita Remota", cost: "900 CR", weight_in_load: 1, desc: "<p><strong>Ofensivo, NT 3.</strong> Detonada por comunicador a até <strong>500 m</strong>. Causa <strong>1d8</strong> de dano a todos num raio de <strong>20 m</strong>. Serve para escavação, infiltração ou como arma.</p>" + ACESSO_OFENSIVO + construcao("1d4 horas") },
      { nome: "Blaster de Disparo Duplo", cost: "3.200 CR", weight_in_load: 1, desc: "<p><strong>Ofensivo, NT 4.</strong> Quase idêntico a uma pistola blaster, mas numa rolagem de ataque bem-sucedida <strong>efetua um segundo disparo automaticamente</strong>: dano <strong>2d6</strong>.</p>" + ACESSO_OFENSIVO + construcao("1d10 horas") },
      { nome: "Bracelete de Controle Neural", cost: "1.800 CR", desc: "<p><strong>Ofensivo, NT 6.</strong> Comandado remotamente a até <strong>100 m</strong>. O <strong>membro</strong> onde o bracelete estiver obedece ao operador, negando o controle ao usuário. O efeito se quebra se o bracelete for removido.</p>" + ACESSO_OFENSIVO + construcao("1d4 dias") },
      { nome: "Canhão de Plasma Portátil", cost: "4.800 CR", weight_in_load: 3, desc: "<p><strong>Ofensivo, NT 6.</strong> Formato de lança-granadas, dispara um feixe concentrado. Dano base <strong>1d10</strong>; é possível <strong>carregar o feixe</strong> por até duas rodadas, aumentando o dano para <strong>1d12</strong> e depois <strong>2d8</strong>.</p>" + ACESSO_OFENSIVO + construcao("1d6 semanas") },
      { nome: "Míssil de Perseguição Térmica", cost: "1.000 CR", weight_in_load: 1, desc: "<p><strong>Ofensivo, NT 6.</strong> Persegue a assinatura térmica do alvo por <strong>1d4+1 rodadas</strong>. Disparado por um lança-mísseis comum, <strong>não exige rolagem de ataque</strong>: só acerta se o alvo <strong>falhar numa JPD</strong> feita a cada rodada, causando <strong>2d10</strong>. Cada construção rende <strong>um único míssil</strong>.</p>" + ACESSO_OFENSIVO + construcao("1d6 horas") },
      { nome: "Coleira de Domesticação", cost: "7.000 CR", desc: "<p><strong>Ofensivo, NT 7.</strong> Coloca sob controle do operador qualquer <strong>espécie de inteligência inferior à humana</strong>, que obedece a qualquer comando enquanto a usar. <strong>No ato da criação</strong> define-se <strong>para qual espécie</strong> ela serve — não funciona em outras.</p>" + ACESSO_OFENSIVO + construcao("1d4 dias") },
      { nome: "Emissor de Raio Paralisante", cost: "3.500 CR", weight_in_load: 1, desc: "<p><strong>Ofensivo, NT 7.</strong> Ataque à distância; acertando, o alvo faz uma <strong>JPC</strong>. Falhando, fica <strong>completamente imobilizado por 30 segundos</strong>. <strong>Criaturas muito maiores que um humano não são afetadas.</strong> Só pode ser usado <strong>2 vezes</strong> antes de recarregar.</p>" + ACESSO_OFENSIVO + construcao("1d6 dias") },
      { nome: "Lança-Chamas Mandaloriano", cost: "5.600 CR", weight_in_load: 3, desc: "<p><strong>Ofensivo, NT 8.</strong> Rajada de fogo a até <strong>6 m</strong>. Dano por distância: <strong>até 2 m → 1d10</strong> · <strong>2 a 4 m → 1d6</strong> · <strong>além disso → 1d4</strong>. Chance de deixar o alvo <strong>em chamas</strong>: respectivamente <strong>1-3</strong>, <strong>1-2</strong> e <strong>1 em 1d6</strong>. Um alvo em chamas sofre o <strong>mesmo dano inicial a cada rodada</strong> até apagar o fogo.</p>" + ACESSO_OFENSIVO + construcao("1d4 dias") },
      { nome: "Repetidor Blaster Pesado", cost: "2.400 CR", weight_in_load: 3, desc: "<p><strong>Ofensivo, NT 8.</strong> Dispara <strong>até 4 vezes por rodada</strong>, causando <strong>1d10</strong> cada, com rolagem de ataque própria por disparo. Após <strong>duas rodadas consecutivas</strong> de uso, precisa <strong>esfriar por 30 segundos</strong>.</p>" + ACESSO_OFENSIVO + construcao("1d4 dias") },
      { nome: "Pistola Desintegradora", cost: "6.300 CR", weight_in_load: 1, desc: "<p><strong>Ofensivo, NT 9.</strong> <strong>Desintegra completamente</strong> qualquer inimigo atingido — <strong>sem direito a Jogada de Proteção</strong>. <strong>Uso único</strong>: fica permanentemente inutilizável depois.</p>" + ACESSO_OFENSIVO + construcao("1d4 meses") },
      { nome: "Traje Antirradiação", cost: "80 CR", weight_in_load: 1, desc: "<p><strong>Defensivo, NT 1.</strong> Traje hermético que protege de emissões radioativas. <strong>Se a vedação for comprometida</strong>, o usuário fica exposto — e não dá para reparar antes que isso aconteça.</p>" + ACESSO_DEFENSIVO + construcao("1d10 horas") },
      { nome: "Cinto Defletor", cost: "4.500 CR", desc: "<p><strong>Defensivo, NT 5.</strong> Qualquer ataque de energia ou projétil tem <strong>1-2 em 1d6</strong> de chance de <strong>ricochetear no campo de força e voltar contra o atacante</strong>. Se falhar, o ataque atravessa e atinge o usuário normalmente.</p>" + ACESSO_DEFENSIVO + construcao("1d10 horas") },
      { nome: "Escudo Defletor Coletivo", cost: "4.200 CR", desc: "<p><strong>Defensivo, NT 6.</strong> Como o escudo individual, mas cobre um raio de <strong>10 m</strong> ao redor do usuário. <strong>Dentro da área, escudos de energia não funcionam.</strong> Duração de <strong>1 minuto</strong>; recarga de <strong>1d8 horas</strong>.</p>" + ACESSO_DEFENSIVO + construcao("1d6 dias") },
      { nome: "Capacete Blindado contra a Força", cost: "2.100 CR", desc: "<p><strong>Defensivo, NT 7.</strong> Todo poder mental usado contra quem veste o capacete tem a <strong>JPS do alvo considerada Muito Fácil (+5)</strong> — ou, se preferir, o poder simplesmente <strong>falha com 1-4 em 1d6</strong>. Quem realiza o poder contra o portador corre risco de <strong>sofrer um choque mental</strong> (1-2 em 1d6).</p>" + ACESSO_DEFENSIVO + construcao("1d4 semanas") },
      { nome: "Cúpula Defletora de Perímetro", cost: "7.000 CR", desc: "<p><strong>Defensivo, NT 8.</strong> Torna impenetrável uma área com <strong>20 m de raio</strong>. O interior é visível através da parede hemisférica semitransparente. Quem tenta entrar sofre <strong>1d4 de dano</strong> por choque. Funciona por <strong>1 hora</strong>.</p>" + ACESSO_DEFENSIVO + construcao("1d6 dias") },
      { nome: "Visor Térmico", cost: "20 CR", desc: "<p><strong>Utilitário, NT 1.</strong> Mostra a assinatura térmica dos objetos. A visão imperfeita dá <strong>−4 nos ataques</strong>. Pode virar binóculo pelo dobro do custo e do tempo.</p>" + ACESSO_UTILITARIO + construcao("1d6 horas") },
      { nome: "Visor Noturno", cost: "40 CR", desc: "<p><strong>Utilitário, NT 1.</strong> Enxergar normalmente na <strong>escuridão total</strong>, sem penalidade, até <strong>15 m</strong>. Versão binóculo (dobro do custo e do tempo) enxerga até <strong>45 m</strong>.</p>" + ACESSO_UTILITARIO + construcao("1d6 horas") },
      { nome: "Medidor de Radiação", cost: "70 CR", desc: "<p><strong>Utilitário, NT 1.</strong> Detecta os níveis de radiação de um local, dizendo se é seguro permanecer sem traje.</p>" + ACESSO_UTILITARIO + construcao("1d4 horas") },
      { nome: "Projetor Holográfico", cost: "40 CR", desc: "<p><strong>Utilitário, NT 2.</strong> Cria uma representação audiovisual tridimensional de qualquer ser ou objeto previamente gravado. Seres de inteligência humana ou superior <strong>distinguem facilmente</strong> da realidade; espécies menos desenvolvidas podem ser enganadas.</p>" + ACESSO_UTILITARIO + construcao("1d4 dias") },
      { nome: "Baliza Rastreadora", cost: "60 CR", desc: "<p><strong>Utilitário, NT 2.</strong> Transmissor acoplável a qualquer superfície; transmite a localização em tempo real para um comunicador de vídeo. Só funciona se o alvo estiver <strong>no mesmo planeta</strong> (ou a distância similar no espaço).</p>" + ACESSO_UTILITARIO + construcao("1d4 horas") },
      { nome: "Broca de Mineração Portátil", cost: "140 CR", weight_in_load: 2, desc: "<p><strong>Utilitário, NT 2.</strong> Escava rocha e minerais ou força entrada por portas e paredes. <strong>Vida útil de 6 horas</strong> de uso contínuo, depois precisa de reparos.</p>" + ACESSO_UTILITARIO + construcao("1d6 horas") },
      { nome: "Cilindro de Dados", cost: "140 CR", desc: "<p><strong>Utilitário, NT 2.</strong> Do tamanho de uma caneta, transporta dados científicos entre laboratórios. Capacidade virtualmente ilimitada; leitura fácil em qualquer laboratório.</p>" + ACESSO_UTILITARIO + construcao("1d4 horas") },
      { nome: "Bloqueador de Sinal (jammer)", cost: "160 CR", desc: "<p><strong>Utilitário, NT 2.</strong> Bloqueia transmissão e recepção de rádio num raio de <strong>50 m</strong>. Nenhum transmissor ou controle remoto funciona até que o aparato seja desativado.</p>" + ACESSO_UTILITARIO + construcao("1d6 horas") },
      { nome: "Holocâmera Remota", cost: "160 CR", desc: "<p><strong>Utilitário, NT 2.</strong> Câmera minúscula que transmite imagem e som para um comunicador de vídeo, a até <strong>5 km</strong>. Sujeita a interferência.</p>" + ACESSO_UTILITARIO + construcao("1d4 dias") },
      { nome: "Granada de Fumaça", cost: "200 CR", weight_in_load: 1, desc: "<p><strong>Utilitário, NT 3.</strong> Fumaça espessa num raio de <strong>20 m</strong>. Todos na área sofrem <strong>−4 em rolagens de ataque</strong>.</p>" + ACESSO_UTILITARIO + construcao("1d6 horas") },
      { nome: "Analisador de Veracidade", cost: "300 CR", desc: "<p><strong>Utilitário, NT 3.</strong> Pequeno indicador preso às vestes que <strong>vibra</strong> quando alguém a até <strong>10 m</strong> mente. <strong>Não</strong> indica <strong>quem</strong> mentiu nem <strong>qual</strong> parte da informação é falsa.</p>" + ACESSO_UTILITARIO + construcao("1d8 horas") },
      { nome: "Comlink Holográfico", cost: "500 CR", desc: "<p><strong>Utilitário, NT 3.</strong> Como o Comlink, mas com <strong>imagem</strong>. Alcance menor: <strong>5 km</strong>; até <strong>4 aparelhos</strong> na mesma frequência.</p>" + ACESSO_UTILITARIO + construcao("1d10 horas") },
      { nome: "Módulo de Tradução", cost: "600 CR", desc: "<p><strong>Utilitário, NT 3.</strong> Fones e microfone que traduzem bilateralmente <strong>um idioma</strong>. Durante a criação, é preciso ter contato com um <strong>falante nativo</strong> e gravá-lo.</p>" + ACESSO_UTILITARIO + construcao("1d6 semanas") },
      { nome: "Visor de Precisão", cost: "800 CR", desc: "<p><strong>Utilitário, NT 4.</strong> Acoplável a qualquer arma à distância: <strong>+2 nas rolagens de ataque</strong>. Também faz o usuário <strong>ignorar cobertura não sólida</strong> (fumaça, neblina) ao calcular penalidades de visibilidade.</p><p>É o aparato completo de que a <strong>Mira a Laser</strong> e o <strong>Capacete com Visor Tático</strong> são versões comerciais de +1 — <strong>não acumulam</strong>: use o melhor.</p>" + ACESSO_UTILITARIO + construcao("1d6 horas") },
      { nome: "Injetor de Bacta de Emergência", cost: "1.200 CR", desc: "<p><strong>Utilitário, NT 4.</strong> Injetado num personagem com <strong>PV negativos</strong>, ele <strong>estabiliza automaticamente</strong> e recupera <strong>2 PV a cada 10 segundos</strong>, até chegar a <strong>1 PV</strong> — e para aí. O soro <strong>estabiliza o moribundo, não o cura</strong>. Ferimentos graves exigem uma <strong>JPC</strong> para que funcione. Rende <strong>2 doses</strong>.</p>" + ACESSO_UTILITARIO + construcao("1d6 horas") },
      { nome: "Cápsula de Bacta", cost: "1.800 CR", desc: "<p><strong>Utilitário, NT 4.</strong> Recupera <strong>1 PV a cada 2 níveis do personagem, por hora de descanso</strong>, no máximo por 24 horas. Quem tem <strong>Recuperação Acelerada</strong> recupera <strong>o dobro</strong> da taxa normal. Rende <strong>4 doses</strong>.</p>" + ACESSO_UTILITARIO + construcao("1d4 horas") },
      { nome: "Botas de Aderência Antigravidade", cost: "2.000 CR", desc: "<p><strong>Utilitário, NT 4.</strong> Permitem andar sobre superfícies íngremes como se fossem terreno plano. <strong>Operativos</strong> as usam perfeitamente — <strong>sucesso automático, não role</strong>. As demais classes rolam <strong>1-4 em 1d6</strong> para não se desequilibrar e cair.</p>" + ACESSO_UTILITARIO + construcao("1d6 dias") },
      { nome: "Visor de Varredura Densitométrica", cost: "3.000 CR", desc: "<p><strong>Utilitário, NT 4.</strong> Enxerga através de <strong>um único obstáculo</strong> (chumbo bloqueia). A imagem é apenas razoável: <strong>−2 nos ataques</strong> do usuário. Pode virar binóculo pelo dobro do custo e do tempo.</p>" + ACESSO_UTILITARIO + construcao("1d4 dias") },
      { nome: "Compressor Molecular", cost: "1.500 CR", desc: "<p><strong>Utilitário, NT 5.</strong> Reduz qualquer objeto <strong>inanimado</strong> a <strong>1/6</strong> do tamanho original por tempo indeterminado — e o restaura. <strong>Só uma miniaturização por vez.</strong></p>" + ACESSO_UTILITARIO + construcao("1d6 semanas") },
      { nome: "Trocador Instantâneo de Trajes", cost: "2.000 CR", desc: "<p><strong>Utilitário, NT 5.</strong> Troca instantaneamente as vestes do personagem. Funciona com qualquer veste <strong>que não seja pressurizada ou hermética</strong>.</p>" + ACESSO_UTILITARIO + construcao("1d4 semanas") },
      { nome: "Estimulante de Combate", cost: "2.000 CR", desc: "<p><strong>Utilitário, NT 5.</strong> Aumenta temporariamente <strong>um atributo em 2 pontos</strong> (definido na criação). Começa a agir <strong>1 minuto</strong> após ingerido e dura <strong>1 hora</strong>. Rende <strong>4 doses</strong>. <strong>Ilegal em boa parte da galáxia e pode causar vício</strong> — mais de uma por vez arrisca uma <strong>overdose potencialmente fatal</strong>.</p>" + ACESSO_UTILITARIO + construcao("1d6 horas") },
      { nome: "Respirador Aquático", cost: "850 CR", desc: "<p><strong>Utilitário, NT 3.</strong> Respirar normalmente embaixo d'água, com ou sem capacete. <strong>Autonomia indefinida</strong> na água; menos efetivo em outros líquidos.</p>" + ACESSO_UTILITARIO + construcao("1d4 horas") },
      { nome: "Laço Energético", cost: "4.000 CR", weight_in_load: 1, desc: "<p><strong>Utilitário, NT 5.</strong> Ataque à distância que <strong>não causa dano</strong>: se acertar, a criatura faz um <strong>teste de Força</strong> para resistir. Um sucesso <strong>interrompe o fluxo de energia</strong> do laço, mas não o destrói. Autonomia de <strong>4 horas</strong>.</p>" + ACESSO_UTILITARIO + construcao("1d4 semanas") },
      { nome: "Detector de Poderes (capacete sensorial)", cost: "1.200 CR", desc: "<p><strong>Utilitário, NT 6.</strong> Detecta poderes mentais em ação a até <strong>200 m</strong> e indica a direção — os que estão sendo executados naquele momento ou os de efeito prolongado num local. Só detecta um poder de <strong>manipulação individual</strong> se o próprio usuário tiver sido afetado por ele.</p>" + ACESSO_UTILITARIO + construcao("1d4 dias") },
      { nome: "Membro Cibernético", cost: "2.400 CR", desc: "<p><strong>Utilitário, NT 6.</strong> Substitui um membro ausente; funciona como um membro orgânico, mas pode apresentar defeitos. <strong>O implante exige o feito <em>Cirurgia Biônica</em>.</strong></p>" + ACESSO_UTILITARIO + construcao("1d4 semanas") },
      { nome: "Estimulante de Sustentação", cost: "4.200 CR", desc: "<p><strong>Utilitário, NT 6.</strong> Uma dose permite <strong>ignorar completamente uma necessidade básica</strong> do corpo (alimentação, sono…) por até <strong>1 dia</strong>; a função anulada é escolhida no ato da criação. <strong>Uso contínuo traz sérios problemas de saúde.</strong> Rende <strong>4 doses</strong>.</p>" + ACESSO_UTILITARIO + construcao("1d6 horas") },
      { nome: "Órgão Cibernético", cost: "3.000 CR", desc: "<p><strong>Utilitário, NT 7.</strong> Recria qualquer órgão humano <strong>exceto o cérebro</strong>, em forma de máquina. <strong>O implante exige o feito <em>Cirurgia Biônica</em>.</strong></p>" + ACESSO_UTILITARIO + construcao("1d4 semanas") },
      { nome: "Módulo de Protocolo Universal", cost: "2.800 CR", desc: "<p><strong>Utilitário, NT 7.</strong> Como o Módulo de Tradução, mas traduz <strong>virtualmente qualquer idioma</strong> — desde que o usuário tenha tido contato com um nativo de cada idioma que queira adicionar, durante ou após a construção.</p>" + ACESSO_UTILITARIO + construcao("2d6 semanas") },
      { nome: "Cinto de Camuflagem Óptica", cost: "4.200 CR", desc: "<p><strong>Utilitário, NT 7.</strong> Deixa o usuário <strong>completamente invisível</strong> à visão comum. Autonomia de <strong>1 hora</strong>, que pode ser dividida em vários usos; depois disso, recarga pela regra de conserto.</p>" + ACESSO_UTILITARIO + construcao("1d6 semanas") },
      { nome: "Visor de Realidade Alternativa", cost: "6.000 CR", desc: "<p><strong>Utilitário, NT 8.</strong> Permite observar uma realidade alternativa à que está ocorrendo. Na prática: em <strong>qualquer jogada de dados</strong>, o jogador <strong>rola duas vezes e fica com o melhor resultado</strong>.</p>" + ACESSO_UTILITARIO + construcao("1d10 dias") },
      { nome: "Teletransportador", cost: "8.000 CR", desc: "<p><strong>Utilitário, NT 9.</strong> Bracelete ou cinto que teletransporta o usuário até o local para o qual foi configurado. A criação envolve uma <strong>plataforma</strong> (marco zero) e o <strong>ativador</strong>; ativadores extras podem ser feitos no mesmo período, pagando o valor.</p>" + ACESSO_UTILITARIO + construcao("1d10 semanas") },
      { nome: "Máquina do Tempo", cost: "sem preço — artefato único", desc: "<p><strong>Utilitário, NT 10.</strong> Transporta uma ou mais pessoas pelo espaço-tempo a qualquer ponto do passado ou do futuro. <strong>Sua existência é apenas hipotética</strong> — nunca foi construída, pelas implicações paradoxais. Quem construir uma estará sujeito a todo tipo de controvérsia.</p><p><em>Sem preço de mercado, como o Sabre Sombrio e a Beskar: não se compra, se conquista. Se entrar numa campanha, é gancho de arco inteiro.</em></p>" + ACESSO_UTILITARIO + construcao("1d4 anos") },
    ],
  },
  {
    folder: "Equipamento Geral",
    tipo: "misc",
    itens: [
      { nome: "Kit Médico (Medpac)", cost: "200 CR", desc: "<p>Cura 1d8 PV; 1d4+2 usos.</p><p>Cura imediata de campo — não se confunde com a <strong>Cápsula de Bacta</strong> (recuperação por hora de descanso) nem com o <strong>Injetor de Bacta de Emergência</strong> (estabiliza quem está com PV negativos).</p>" + ACESSO_UTILITARIO },
      { nome: "Comunicador (Comlink)", cost: "40 CR", desc: "<p>Alcance planetário/orbital.</p><p><strong>Equivalência:</strong> é o <em>Bracelete radiocomunicador</em> do ED-07 (utilitário, NT 1) — comunicação por <strong>áudio</strong> entre aparelhos na mesma frequência, sujeita a interferência, com até <strong>6 aparelhos</strong> por frequência. Valor convertido: <strong>900 CR</strong> (ED $90.000 ÷ 100); vale o preço do cenário. A versão com <strong>imagem</strong> é o <strong>Comlink Holográfico</strong>.</p>" + ACESSO_UTILITARIO },
      { nome: "Datapad", cost: "100 CR", desc: "<p>Serve como livro, mapa ou dicionário reutilizável.</p>" },
      { nome: "Cilindro de Oxigênio", cost: "400 CR", weight_in_load: 1, desc: "<p><strong>Obrigatório</strong> para usar a <strong>Selagem Espacial</strong> ou a <strong>Selagem Aquática</strong>. Dura cerca de <strong>6 horas</strong>. Sem ele, o traje só protege de temperatura e pressão, não da falta de ar.</p>" },
    ],
  },
  {
    folder: "Vestes sob Encomenda",
    tipo: "misc",
    itens: [
      { nome: "Encomenda — Material mais Leve", cost: "400 CR", desc: "<p>Qualquer armadura pode ser levada a um alfaiate-armeiro e melhorada em <strong>um</strong> quesito. <strong>Uma melhoria por peça</strong> — não se acumulam. A encomenda leva de dias a semanas, a critério do Mestre, e não se faz em qualquer doca.</p><p><strong>Efeito:</strong> −1 de Carga.</p><p class='nota-casa'><em>Resgatado do livro: é a tabela T5-3, Vestes sob Encomenda, do Space Dragon, que o guia de conversão manda explicitamente manter. Uma coisa foi ajustada: o Reforço original dava +2 de proteção, e aqui dá +1 — lá a escada de vestes ia de 10 a 16 em quatro degraus largos, aqui vai de +1 a +7 em seis degraus finos, e um +2 avulso valeria dois degraus inteiros (a Armadura de Batalha Completa reforçada chegaria a +9). Se a sua mesa quiser o valor original, devolva o +2 e suba o preço para uns 1.200 CR.</em></p>" },
      { nome: "Encomenda — Reforço de Placas", cost: "600 CR", desc: "<p>Qualquer armadura pode ser levada a um alfaiate-armeiro e melhorada em <strong>um</strong> quesito. <strong>Uma melhoria por peça</strong> — não se acumulam. A encomenda leva de dias a semanas, a critério do Mestre, e não se faz em qualquer doca.</p><p><strong>Efeito:</strong> +1 de CA.</p><p class='nota-casa'><em>Resgatado do livro: é a tabela T5-3, Vestes sob Encomenda, do Space Dragon, que o guia de conversão manda explicitamente manter. Uma coisa foi ajustada: o Reforço original dava +2 de proteção, e aqui dá +1 — lá a escada de vestes ia de 10 a 16 em quatro degraus largos, aqui vai de +1 a +7 em seis degraus finos, e um +2 avulso valeria dois degraus inteiros (a Armadura de Batalha Completa reforçada chegaria a +9). Se a sua mesa quiser o valor original, devolva o +2 e suba o preço para uns 1.200 CR.</em></p>" },
      { nome: "Encomenda — Sob Medida", cost: "500 CR", desc: "<p>Qualquer armadura pode ser levada a um alfaiate-armeiro e melhorada em <strong>um</strong> quesito. <strong>Uma melhoria por peça</strong> — não se acumulam. A encomenda leva de dias a semanas, a critério do Mestre, e não se faz em qualquer doca.</p><p><strong>Efeito:</strong> +2 m de movimento, nunca acima dos 9 m base.</p><p class='nota-casa'><em>Resgatado do livro: é a tabela T5-3, Vestes sob Encomenda, do Space Dragon, que o guia de conversão manda explicitamente manter. Uma coisa foi ajustada: o Reforço original dava +2 de proteção, e aqui dá +1 — lá a escada de vestes ia de 10 a 16 em quatro degraus largos, aqui vai de +1 a +7 em seis degraus finos, e um +2 avulso valeria dois degraus inteiros (a Armadura de Batalha Completa reforçada chegaria a +9). Se a sua mesa quiser o valor original, devolva o +2 e suba o preço para uns 1.200 CR.</em></p>" },
    ],
  },
  {
    folder: "Kits e Estojos",
    tipo: "misc",
    itens: [
      { nome: "Kit de Ferramentas", cost: "150 CR", weight_in_load: 1, desc: "<p>Reparar e reprogramar droides, veículos e naves.</p><p><strong>Necessário</strong> para o Técnico consertar máquina — sem ele, só improviso, e o Mestre pede o teste <strong>Difícil</strong>.</p><p><em>Kits e estojos não são conforto: sem eles, a habilidade de classe correspondente não rola.</em></p>" },
      { nome: "Kit de Segurança", cost: "300 CR", weight_in_load: 1, desc: "<p>Gazuas eletrônicas e derivadores.</p><p><strong>Necessário</strong> para o talento <em>Sabotagem</em> do Operativo — o próprio talento diz \"exige os instrumentos consigo\".</p><p><strong>Ilegal sem licença</strong> em mundos do Núcleo.</p><p><em>Kits e estojos não são conforto: sem eles, a habilidade de classe correspondente não rola.</em></p>" },
      { nome: "Estojo Médico", cost: "250 CR", weight_in_load: 1, desc: "<p><strong>Necessário</strong> para reviver um moribundo e para tratar doença, veneno ou radiação.</p><p><em>Kits e estojos não são conforto: sem eles, a habilidade de classe correspondente não rola.</em></p>" },
      { nome: "Estojo Cirúrgico", cost: "500 CR", weight_in_load: 2, desc: "<p><strong>Necessário</strong> para as <em>operações cirúrgicas</em> do Médico de Campo.</p><p><em>Kits e estojos não são conforto: sem eles, a habilidade de classe correspondente não rola.</em></p>" },
      { nome: "Kit de Reparos Emergenciais", cost: "100 CR", weight_in_load: 1, desc: "<p>Recupera <strong>2d4+1 PV</strong> de droide, veículo ou dispositivo, no campo. <strong>Um uso.</strong></p>" },
      { nome: "Tanque de Bacta", cost: "5.000 CR (ou 150 CR/hora, alugado)", desc: "<p><em>Instalação</em> — cabe numa enfermaria de nave.</p><p>Recupera <strong>o dobro do nível em PV por dia</strong> dentro do tanque, além da recuperação normal.</p>" },
    ],
  },
  {
    folder: "Miudezas, Energia e Sobrevivência",
    tipo: "misc",
    itens: [
      { nome: "Carga de Energia", cost: "10 CR", desc: "<p>O \"pente\" de uma arma de energia. Raramente acaba em jogo — use só se quiser tensão.</p>" },
      { nome: "Carregador de Energia", cost: "50 CR", weight_in_load: 1, desc: "<p>Recarrega cargas e células: <strong>4 horas</strong> cada.</p>" },
      { nome: "Célula de Energia", cost: "10 CR", desc: "<p>Bateria de aparato, lanterna ou visor.</p>" },
      { nome: "Coldre de Cintura", cost: "15 CR", desc: "<p>Saque rápido.</p>" },
      { nome: "Coldre Oculto", cost: "40 CR", desc: "<p>Saque dissimulado. Engana revista superficial.</p>" },
      { nome: "Bandoleira", cost: "40 CR", weight_in_load: 1, desc: "<p>Munição e granadas de acesso rápido.</p>" },
      { nome: "Cinto de Utilidades", cost: "100 CR", weight_in_load: 1, desc: "<p>Organiza pequenos itens. O Mestre é generoso com \"eu tenho isso no cinto\".</p>" },
      { nome: "Macrobinóculos", cost: "120 CR", weight_in_load: 1, desc: "<p>Visão ampliada a longa distância. <em>Não dá bônus de ataque.</em></p>" },
      { nome: "Arpéu e Corda (18 m)", cost: "50 CR", weight_in_load: 2, desc: "<p>Versão manual do Lançador de Cabo, para quem não tem 150 CR.</p>" },
      { nome: "Bastão Extensível", cost: "10 CR", desc: "<p>Estende-se a até 3 m. Ferramenta, não arma.</p>" },
      { nome: "Cobertor de Sobrevivência", cost: "20 CR", desc: "<p>Resiste a calor e frio extremos por algumas horas.</p>" },
      { nome: "Barraca Térmica", cost: "200 CR", weight_in_load: 2, desc: "<p>Abriga 4 pessoas. Sobrevive à noite de um mundo extremo.</p>" },
      { nome: "Cantil Térmico", cost: "30 CR", weight_in_load: 1, desc: "<p>1 litro, mantém a temperatura.</p>" },
      { nome: "Frasco de Ácido", cost: "100 CR", desc: "<p>500 ml. Uso científico — ou arremessado, <strong>1d4</strong>.</p>" },
      { nome: "Isqueiro de Fusão", cost: "5 CR", desc: "<p>Fogo. Custa quase nada e resolve mais cena do que parece.</p>" },
      { nome: "Cartão de Identificação (2ª via)", cost: "20 CR", desc: "<p>Segunda via legítima. A <strong>falsa</strong> é serviço do submundo, e custa muito mais.</p>" },
    ],
  },
];



// ── Carregadores ────────────────────────────────────────────────────────────
//
// No Old Dragon o dano de uma arma de disparo mora na MUNIÇÃO, não na arma: o
// Arco Longo do SRD tem `damage` vazio e é a Flecha de Guerra que traz o 1d8.
// A automação de combate segue essa regra (`damageItem = ammunition ?? item`) e
// ABORTA o ataque de arma `ranged` sem munição equipada.
//
// Um blaster tem dano próprio, então nada de munição existia e nenhum tiro
// rolava. A saída é seguir o modelo do sistema: um carregador por arma,
// carregando o dano dela.
//
// O DANO CONTINUA TAMBÉM NA ARMA, de propósito. A automação usa o do
// carregador (ela ignora o da arma quando há munição), mas quem lê o compêndio
// ou a ficha precisa ver "Blaster Leve 1d6" — e o cofre diz que o dano é da
// arma. Gerar os carregadores A PARTIR das armas mantém um valor só: mudou na
// arma, muda no carregador, sem ninguém sincronizar à mão.
const ARMAS_DE_ENERGIA = "Blasters e Armas de Energia";

function carregadores(categorias) {
  const armas = categorias
    .find((c) => c.folder === ARMAS_DE_ENERGIA)
    .itens.filter((it) => it.damage && it.shoot_range);

  return {
    folder: "Carregadores",
    tipo: "weapon",
    itens: armas.map((arma) => ({
      // A automação casa munição por NOME antes de olhar o tipo: arma com
      // "besta" no nome exige munição com "virote", e "arco" exige "flecha".
      // A Besta Wookiee cai nessa regra, então o carregador dela precisa
      // trazer "Virote" no nome ou o ataque continua bloqueado.
      //
      // Felizmente é o nome certo por acaso: um bowcaster dispara quarrels —
      // virotes — de energia, e não uma célula como os blasters.
      nome: /besta|arco/i.test(arma.nome)
        ? `Virote Energético — ${arma.nome}`
        : `Carregador — ${arma.nome}`,
      ammunition: true,
      damage: arma.damage, // gerado da arma: uma fonte só
      damage_type: arma.damage_type,
      // 100 tiros porque o CENÁRIO NÃO CONTA TIROS: não há regra de munição
      // para arma de energia no capítulo de Equipamentos. O número existe só
      // para a automação ter o que decrementar (ela faz `quantity - 1` por
      // disparo) e é alto o bastante para nunca virar assunto na mesa. Não é
      // uma economia nova — se acabar, o Mestre repõe sem rolar nada.
      quantity: 100,
      cost: "25 CR",
      weight_in_load: 0,
      desc:
        `<p>Célula de energia do <strong>${arma.nome}</strong> — dano ` +
        `<strong>${arma.damage}</strong>, o mesmo da arma.</p>` +
        `<p><strong>Equipe o carregador junto com a arma.</strong> A automação de ` +
        `combate tira o dano dele, como o Old Dragon faz com a flecha: no SRD o ` +
        `Arco Longo não tem dano nenhum, quem tem é a Flecha de Guerra. Sem o ` +
        `carregador equipado, o ataque não chega a rolar.</p>` +
        `<p><em>O cenário não conta tiros de blaster. As 100 cargas existem para a ` +
        `automação ter o que descontar — não são uma regra nova de munição.</em></p>`,
    })),
  };
}

CATEGORIAS.push(carregadores(CATEGORIAS));

export const categorias = anotaCategorias(CATEGORIAS);

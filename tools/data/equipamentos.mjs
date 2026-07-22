// Equipamento de "Star Wars — Space Dragon" — transcrito de
// SW-SD-Equipamentos.md (armas corpo a corpo, blasters, sabre de luz,
// armaduras/vestes e aparatos) e de SW-SD-Sabre-e-Cristais.md (cristal kyber,
// sangramento e o Sabre Sombrio).
//
// Moeda: Crédito (CR), equivalência 1:1 com Peças de Ouro. 100 CR em chips
// pesam 1 ponto de carga.
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

export const categorias = [
  {
    folder: "Armas Corpo a Corpo",
    tipo: "weapon",
    itens: [
      { nome: "Vibro-Adaga", damage: "1d4", damage_type: "perfurante", cost: "15 CR", weight_in_load: 1, throw_range: 9, desc: "<p>Pequena, Vibro, Perfurante, Arremesso (9 m).</p>" },
      { nome: "Bastão de Treinamento", damage: "1d4", damage_type: "impactante", cost: "10 CR", weight_in_load: 1, two_handed: true, desc: "<p>Pequena, Impactante, Duas Mãos.</p>" },
      { nome: "Cassetete de Choque", damage: "1d4", damage_type: "impactante", cost: "20 CR", weight_in_load: 1, desc: "<p>Pequena, Impactante, <em>Nocaute</em>.</p><p><strong>Nocaute:</strong> causa metade do dano e aplica a regra de nocaute (1 em 1d6, ou pelo modificador de Força, para desacordar o alvo).</p>" },
      { nome: "Vibro-Lâmina Curta", damage: "1d6", damage_type: "cortante", cost: "60 CR", weight_in_load: 1, desc: "<p>Pequena, Vibro, Cortante.</p>" },
      { nome: "Lança Vibro", damage: "1d6", damage_type: "perfurante", cost: "80 CR", weight_in_load: 2, throw_range: 12, versatile: true, desc: "<p>Média, Vibro, Perfurante, Arremesso (12 m), Haste, Versátil.</p>" },
      { nome: "Vibro-Lâmina", damage: "1d8", damage_type: "cortante", cost: "100 CR", weight_in_load: 2, desc: "<p>Média, Vibro, Cortante.</p>" },
      { nome: "Vibro-Machado", damage: "1d8", damage_type: "cortante", cost: "90 CR", weight_in_load: 2, desc: "<p>Média, Vibro, Cortante.</p>" },
      { nome: "Vibro-Lâmina Pesada", damage: "1d8", damage_type: "cortante", cost: "150 CR", weight_in_load: 2, versatile: true, desc: "<p>Média, Vibro, Versátil, Cortante.</p>" },
      { nome: "Lança-Vibro Mandaloriana", damage: "1d10", damage_type: "perfurante", cost: "400 CR", weight_in_load: 2, throw_range: 9, desc: "<p>Média, Vibro, Perfurante, Haste, Arremesso (9 m).</p><p>Exige <strong>treino cultural Mandaloriano</strong>.</p>" },
      { nome: "Vibro-Machado Pesado", damage: "2d6", damage_type: "cortante", cost: "220 CR", weight_in_load: 3, two_handed: true, desc: "<p>Grande, Vibro, Cortante, Duas Mãos.</p>" },
      { nome: "Bastão Eletrificado", damage: "1d8", damage_type: "impactante", cost: "250 CR", weight_in_load: 3, two_handed: true, desc: "<p>Grande, Impactante, Duas Mãos, <em>Nocaute</em>.</p><p><strong>Nocaute:</strong> causa metade do dano e aplica a regra de nocaute (1 em 1d6, ou pelo modificador de Força, para desacordar o alvo).</p>" },
    ],
  },
  {
    folder: "Blasters e Armas de Energia",
    tipo: "weapon",
    itens: [
      { nome: "Blaster Leve", damage: "1d6", cost: "150 CR", weight_in_load: 1, ranged: true, shoot_range: 36, desc: "<p>Pequena, Energia, Disparo (36 m).</p>" },
      { nome: "Carabina Blaster", damage: "1d6", cost: "350 CR", weight_in_load: 2, ranged: true, shoot_range: 54, two_handed: true, desc: "<p>Média, Energia, Disparo (54 m), Duas Mãos.</p>" },
      { nome: "Blaster Pesado (pistola)", damage: "1d8", cost: "300 CR", weight_in_load: 1, ranged: true, shoot_range: 30, desc: "<p>Pequena, Energia, Disparo (30 m), <strong>Recarga</strong>.</p>" },
      { nome: "Rifle Blaster", damage: "1d8", cost: "450 CR", weight_in_load: 2, ranged: true, shoot_range: 72, two_handed: true, desc: "<p>Média, Energia, Disparo (72 m), Duas Mãos.</p>" },
      { nome: "Besta Wookiee (Bowcaster)", damage: "1d10", cost: "700 CR", weight_in_load: 2, ranged: true, shoot_range: 54, two_handed: true, desc: "<p>Média, Energia, Disparo (54 m), Duas Mãos, <strong>Recarga</strong>.</p><p>Exige <strong>FOR 15+</strong>.</p>" },
      { nome: "Blaster de Assalto Pesado", damage: "2d6", cost: "900 CR", weight_in_load: 3, ranged: true, shoot_range: 90, two_handed: true, desc: "<p>Grande, Energia, Disparo (90 m), Duas Mãos, <strong>Recarga</strong>.</p>" },
      { nome: "Lançador de Rede", cost: "200 CR", weight_in_load: 1, ranged: true, shoot_range: 18, desc: "<p>Pequena, Especial, Disparo (18 m), <strong>Enreda</strong>. Não causa dano.</p>" },
      { nome: "Granada de Fragmentação", damage: "2d6", cost: "150 CR", weight_in_load: 1, melee: false, throw_range: 9, desc: "<p>Pequena, Arremesso (9 m), <strong>Área</strong>.</p>" },
      { nome: "Detonador Térmico", damage: "3d6", cost: "400 CR", weight_in_load: 1, melee: false, throw_range: 9, desc: "<p>Pequena, Arremesso (9 m), <strong>Área</strong>.</p>" },
      { nome: "Granada Atordoante", cost: "180 CR", weight_in_load: 1, melee: false, throw_range: 9, desc: "<p>Pequena, Arremesso (9 m), <strong>Área</strong>, <strong>Nocaute (sem dano)</strong>.</p>" },
    ],
  },
  {
    folder: "Sabres de Luz",
    tipo: "weapon",
    itens: [
      { nome: "Sabre de Luz", damage: "1d10", weight_in_load: 1, magic_item: true, desc: "<p>Pequena, Vibro-energia. <em>Exclusivo de personagens Sensíveis à Força.</em></p><p>Ignora o bônus de qualquer armadura que não seja <strong>Beskar</strong>.</p><p>Quem não for Sensível à Força e tentar empunhá-lo faz ataques sempre <strong>Muito Difíceis</strong>, com 1-2 em 1d6 de se ferir a cada uso.</p><p><strong>Sem preço de mercado</strong> — é construído por um rito da Força ou achado como item único.</p><p><strong>Construir o próprio sabre</strong> é um marco na vida de um Sensível — tradicionalmente sua primeira Provação, ou uma cena de <em>downtime</em> combinada com o Mestre. Exige um cristal kyber sintonizado + componentes técnicos (emissor, célula, empunhadura) + um período de concentração através da Força (horas a dias de meditação). Você pode empunhar o sabre alheio, mas <strong>o sabre que você mesmo construiu</strong> nunca falha nem \"sangra\" nas suas mãos — é uma extensão sua.</p>" },
      { nome: "Sabre Sombrio (Darksaber)", damage: "1d10", weight_in_load: 1, magic_item: true, desc: "<p>Lâmina <strong>negra, achatada como uma espada</strong> e mais curta que um sabre comum, forjada há mais de mil anos por <strong>Tarre Vizsla — o primeiro Mandaloriano admitido na Ordem Jedi</strong>. Artefato único e, entre os Mandalorianos, símbolo de liderança de Mandalore.</p><p><em>Artefato único, sem preço — conquistado ou encontrado.</em></p><ul><li><strong>Ficha:</strong> como um Sabre de Luz (1d10, Pequena), porém a lâmina negra <strong>corta até a Beskar</strong> — a única lâmina que ignora o bônus de CA da Armadura Beskar.</li><li><strong>O Peso da Dúvida:</strong> quem o empunha <strong>sem tê-lo conquistado em combate</strong> sofre <strong>−1 nos ataques</strong> com ele até vencer um duelo empunhando a lâmina. Quem o ganha por vitória não sofre a penalidade.</li><li><strong>O Direito de Mandalore:</strong> portá-lo é <strong>reivindicar a liderança de Mandalore</strong> — enorme gancho político, casando com o papel Portador da Herança.</li></ul><p>O Sabre Sombrio não exige ser Sensível à Força (Mandalorianos comuns o carregaram) — mas nas mãos de um Sensível que o conquistou, é uma lenda viva.</p>" },
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
    folder: "Armaduras e Vestes",
    tipo: "armor",
    itens: [
      { nome: "Traje Reforçado", bonus_ca: 1, cost: "50 CR", weight_in_load: 1, desc: "<p>Veste Leve.</p>" },
      { nome: "Armadura de Combate Leve", bonus_ca: 2, cost: "200 CR", weight_in_load: 1, desc: "<p>Veste Leve.</p>" },
      { nome: "Armadura Compósita", bonus_ca: 3, cost: "350 CR", weight_in_load: 2, desc: "<p>Veste Média.</p>" },
      { nome: "Armadura de Assalto", bonus_ca: 4, cost: "600 CR", weight_in_load: 2, desc: "<p>Veste Média.</p>" },
      { nome: "Armadura Pesada", bonus_ca: 5, cost: "3.000 CR", weight_in_load: 3, desc: "<p>Veste Pesada.</p>" },
      { nome: "Armadura de Batalha Completa", bonus_ca: 7, cost: "20.000 CR", weight_in_load: 3, desc: "<p>Veste Pesada.</p>" },
      { nome: "Gerador de Escudo Pessoal", bonus_ca: 1, cost: "80 CR", desc: "<p>Leve. Ocupa uma <strong>mão exclusiva</strong>.</p>" },
      { nome: "Armadura Beskar (Beskar'gam)", bonus_ca: 6, weight_in_load: 2, desc: "<p>Pesada, mas leve para o peso.</p><p><strong>Resistente a Sabres:</strong> sabres não ignoram seu bônus de CA.</p><p><em>Sem preço — herança/conquista.</em></p>" },
    ],
  },
  {
    folder: "Aparatos Tecnológicos",
    tipo: "misc",
    itens: [
      { nome: "Mochila de Propulsão (Jetpack)", cost: "2.500 CR", desc: "<p>Voo/salto até 18 m, 6 rodadas por dia; recarrega após descanso.</p><p><em>Aparato utilitário: qualquer um pode operar.</em></p>" },
      { nome: "Capacete com Visor Tático", cost: "300 CR", desc: "<p>+1 em Procurar e em ataques à distância contra alvos distantes.</p><p><em>Aparato utilitário: qualquer um pode operar.</em></p>" },
      { nome: "Lançador de Cabo", cost: "150 CR", desc: "<p>Como um Arpéu, dispara a 18 m sem teste.</p>" },
      { nome: "Algemas de Choque", cost: "50 CR", desc: "<p>+1d4 de choque se a vítima tentar se soltar sem o código.</p>" },
      { nome: "Sensor de Movimento", cost: "350 CR", desc: "<p>Detecta movimento em 9 m.</p><p><em>Aparato utilitário: qualquer um pode operar.</em></p>" },
      { nome: "Mira a Laser", cost: "120 CR", desc: "<p>+1 no primeiro ataque de cada combate com arma de energia.</p>" },
      { nome: "Disruptor Positrônico", desc: "<p>Aparato do <strong>Técnico</strong> para <strong>Desativar Droides</strong> (ver Classes).</p><p><em>Aparato ofensivo: só o Técnico o opera. Não tem preço de tabela — é construído.</em></p>" },
    ],
  },
  {
    folder: "Equipamento Geral",
    tipo: "misc",
    itens: [
      { nome: "Kit Médico (Medpac)", cost: "200 CR", desc: "<p>Cura 1d8 PV; 1d4+2 usos.</p><p><em>Aparato utilitário: qualquer um pode operar.</em></p>" },
      { nome: "Comunicador (Comlink)", cost: "40 CR", desc: "<p>Alcance planetário/orbital.</p>" },
      { nome: "Datapad", cost: "100 CR", desc: "<p>Serve como livro, mapa ou dicionário reutilizável.</p>" },
    ],
  },
];

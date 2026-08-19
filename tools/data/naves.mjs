// Naves e Veículos de "Star Dragon" — transcrito de SW-SD-Naves.md.
//
// As naves NÃO viram Actors: o cenário as trata pelo Capítulo de Espaçonaves e
// Estações do Space Dragon, e este arquivo é apenas um de-para de nomenclatura.
// Por isso o conteúdo é uma JournalEntry de referência do Mestre, no mesmo
// formato consumido por journalDoc() de tools/lib.mjs.

const paginas = [
  {
    title: "Regras que faltavam — combate, aparatos e pilotagem",
    content: `
<h2>Ataque em área e arremesso</h2>
<p>Arremessar algo num ponto do mapa é um ataque à distância normal contra <strong>CA 10 + 1 para cada 3 metros</strong> de distância. Uma granada atirada a 15 metros enfrenta <strong>CA 15</strong>.</p>
<ul>
<li><strong>Errou?</strong> A diferença entre a sua rolagem e a CA é <strong>quantos metros a granada foi parar longe</strong> do ponto visado. CA 18, rolou 12 &rarr; cai a <strong>6 metros</strong> do alvo.</li>
<li><strong>Para que lado?</strong> Role <strong>1d8</strong>, contando 1 como &quot;de volta na sua direção&quot; e seguindo em sentido horário.</li>
<li>Objeto <strong>sem função ofensiva</strong> conta como <strong>1d4</strong> para efeito de ordem de ação.</li>
</ul>
<p><em>Granada é arma de área, não de precisão: quanto mais longe o alvo, maior a chance de limpar o corredor errado.</em></p>
<h2>Coronhada, desarmado e nocaute</h2>
<ul>
<li><strong>Coronhada:</strong> bater com um blaster causa <strong>1d4</strong>, substituindo o dado da arma; o modificador de Força continua valendo.</li>
<li><strong>Desarmado:</strong> o dano é o <strong>modificador de Força</strong>, mínimo 1.</li>
<li><strong>Nocautear em vez de matar:</strong> quem chega abaixo de 0 PV por ataque corpo a corpo com arma <strong>não-cortante</strong>, por coronhada ou desarmado <strong>não está morrendo — está inconsciente</strong>.</li>
</ul>
<p>É a regra que faltava para o ofício do <strong>Caçador de Recompensas</strong>: o contrato que paga mais pelo alvo vivo, a cela em vez do caixão. Somada ao modo atordoante dos blasters e à Granada Atordoante, capturar alguém vivo deixa de ser improviso.</p>
<h2>Quem pode usar um aparato</h2>
<p><strong>Usar um aparato pronto não pede rolagem.</strong> Qualquer personagem aciona o medpac, o visor ou o jetpack, respeitada a faixa da classe (ofensivos: só Técnico e Caçador de Recompensas &middot; defensivos: Técnico e Veterano &middot; utilitários: todos).</p>
<p>O teste só existe num caso, e só para o <strong>Técnico</strong>: quando ele mexe num aparato <strong>criado por outra pessoa</strong>, danificado, de procedência obscura ou <strong>acima do seu Nível Tecnológico</strong>. As outras classes não fazem esse teste porque nem saberiam por onde começar.</p>
<h2>Jogada de Proteção da nave</h2>
<p>Quando uma regra pede que a <strong>nave</strong> resista a algo, quem rola é a nave. Mas naves não têm atributos: quem faz a diferença é o piloto. <strong>Antes de cada JP da nave, o piloto faz um teste de <em>Pilotar</em></strong>, e o resultado modifica a jogada:</p>
<table><thead><tr><th>Teste de Pilotar</th><th>Modificador na JP da nave</th></tr></thead><tbody>
<tr><td><strong>1 no d6</strong></td><td><strong>+4</strong></td></tr>
<tr><td>Sucesso normal</td><td><strong>+2</strong></td></tr>
<tr><td>Falha</td><td><strong>&minus;2</strong></td></tr>
<tr><td><strong>6 no d6</strong></td><td><strong>&minus;4</strong></td></tr>
</tbody></table>
<h2>Avaria</h2>
<p>Opcional. <strong>A cada 25% dos PV que a nave perde, o piloto sofre &minus;1 na chance de <em>Pilotar</em></strong>, até o mínimo de 1 em 1d6. Um caça de 40 PV que já levou 22 está abaixo de 50%: <strong>&minus;2 na chance</strong>.</p>
`,
  },
  {
    title: "Naves e Veículos — como funcionam",
    content: `
<p><strong>Regras:</strong> naves, caças e veículos usam o <strong>Capítulo de Espaçonaves e Estações do Space Dragon</strong> sem alteração — combate espacial, PV, Base de Ataque, Jogadas de Proteção da nave, salto hiperespacial e câmaras. O <strong>combustível</strong> tem página própria nesta referência.</p>
<p>Esta referência é um <strong>de-para de nomenclatura</strong>: pegue a classe de nave que quiser e vista-a de Star Wars.</p>
<p>&#9888; <strong>De onde vêm os números.</strong> Use a tabela do <strong>Estrela Dracônica (ED-09)</strong>, <strong>não</strong> a do livro do Space Dragon: ao consolidar o ED as naves foram <strong>reescaladas</strong> para o Old Dragon 2, e os dois conjuntos são incompatíveis. O Caça saiu de <em>CP 28 / BA +16 / 150 m</em> para <strong>CA 50 / BA +36 / 100 m</strong>. Misturar as duas tabelas na mesma cena quebra o combate.</p>
<table><thead><tr><th>Tipo</th><th>Tripulação</th><th>PV</th><th>BA</th><th>CA</th><th>JP</th><th>Mov.</th></tr></thead><tbody>
<tr><td><strong>Caça</strong></td><td>1</td><td>1d100</td><td>+36</td><td>50</td><td>10</td><td>100 m</td></tr>
<tr><td><strong>Escolta</strong></td><td>1 a 4</td><td>1d100</td><td>+30</td><td>50</td><td>10</td><td>80 m</td></tr>
<tr><td><strong>Cargueiro</strong></td><td>50+</td><td>1d1000</td><td>+34</td><td>46</td><td>6</td><td>40 m</td></tr>
</tbody></table>
`,
  },
  {
    title: "De-para: tipos de nave",
    content: `
<table>
<thead><tr><th>Space Dragon</th><th>Tamanho · papel</th><th>Equivalentes em Star Wars</th></tr></thead>
<tbody>
<tr><td><strong>Caça</strong></td><td>Pequena · 1 tripulante · assalto</td><td>Caça TIE, TIE Interceptor, X-wing, A-wing, Y-wing, caça-estelar Jedi (Delta-7 / Eta-2), N-1 de Naboo</td></tr>
<tr><td><strong>Escolta</strong></td><td>Pequena · 1-4 · escolta e abordagem</td><td>Lançadeira de abordagem, canhoneira (LAAT), nave de patrulha, Slave I armada, corveta leve</td></tr>
<tr><td><strong>Cápsula de exploração e emergência</strong></td><td>Pequena · 1-4 · evacuação/sonda</td><td>Cápsula de fuga (<em>escape pod</em>), sonda-droide, cápsula de exploração planetária</td></tr>
<tr><td><strong>Espaçonave particular</strong></td><td>Média · 1-10 · grupo pequeno</td><td><strong>Millennium Falcon (YT-1300)</strong>, Ghost (VCX-100), Razor Crest, Slave I, iate pessoal — <em>a nave clássica de um grupo de heróis</em></td></tr>
<tr><td><strong>Cargueiro</strong></td><td>Gigantesca · 50+ · carga</td><td>Cargueiro corelliano, transporte rebelde GR-75, transporte de tropas Imperial, nave de mineração</td></tr>
<tr><td><strong>Transuniversal</strong></td><td>Gigantesca · 100+ · transporte/lazer civil</td><td>Transatlântico estelar, cruzeiro de passageiros, iate diplomático de luxo, nave-colônia civil</td></tr>
<tr><td><strong>Cruzador</strong></td><td>Colossal · 100+ · base militar móvel</td><td><strong>Destróier Estelar (classe Imperial)</strong>, Cruzador Mon Calamari (MC80), fragata Nebulon-B, cruzador Venator</td></tr>
<tr><td><strong>Nave-mãe</strong></td><td>Colossal · 1.000+ · lar de populações</td><td>Super Destróier Estelar <em>Executor</em>, encouraçado Lucrehulk, cidade-nave</td></tr>
</tbody>
</table>
<p><em><strong>Estrela da Morte</strong> e demais super-estruturas fixas são melhor tratadas como <strong>estações espaciais</strong> (também no capítulo de naves do SD), não como naves.</em></p>
`,
  },
  {
    title: "Combustível",
    content: `
<p><em>Regra do Space Dragon §10.3.1, que não estava em lugar nenhum da cadeia — antes o combustível era tratado como recurso narrativo.</em></p>
<p>Toda nave tem um <strong>nível de combustível de 0% a 100%</strong>, independente de quantos tanques ela tenha. O gasto sai de dois números:</p>
<ol>
<li><strong>A autonomia da fonte de energia</strong> dá o dado: <strong>autonomia baixa &rarr; d6 · média &rarr; d4 · alta &rarr; d2</strong>.</li>
<li><strong>O custo da ação</strong> dá quantos dados: <strong>1 a 3</strong>, a critério do Mestre.</li>
</ol>
<p>Role e desconte o resultado em <strong>pontos percentuais</strong>.</p>
<table><thead><tr><th>Ação</th><th>Custo típico</th></tr></thead><tbody>
<tr><td>Um dia de viagem espacial em rota tranquila</td><td><strong>1</strong></td></tr>
<tr><td>Decolagem, pouso, atracagem</td><td><strong>1</strong></td></tr>
<tr><td>Salto hiperespacial em espaço limpo</td><td><strong>2</strong></td></tr>
<tr><td>Salto com interferência gravitacional, rota longa ou às cegas</td><td><strong>3</strong></td></tr>
<tr><td>Manobra evasiva ou movimentação dupla em combate</td><td><strong>1</strong>, por uso</td></tr>
</tbody></table>
<p><em>Exemplo: o <strong>Falcon</strong> (particular, combustível líquido, autonomia média = <strong>d4</strong>) salta para um sistema distante sem interferência — gasto <strong>2</strong> &rarr; <strong>2d4%</strong> do tanque.</em></p>
<h2>Abastecer</h2>
<p>O preço é <strong>por ponto percentual</strong>, e varia com a fonte e o porte da nave.</p>
<table><thead><tr><th>Fonte</th><th>Raridade</th><th>Autonomia</th><th>P</th><th>M</th><th>G</th><th>C</th></tr></thead><tbody>
<tr><td>Incineração de detritos</td><td>Incomum</td><td><strong>Baixa (d6)</strong></td><td>0,5 CR</td><td>1 CR</td><td>10 CR</td><td>100 CR</td></tr>
<tr><td><strong>Combustível líquido</strong></td><td>Comum</td><td><strong>Média (d4)</strong></td><td>5 CR</td><td>10 CR</td><td>100 CR</td><td>1.000 CR</td></tr>
<tr><td>Reatores atômicos</td><td>Comum</td><td><strong>Alta (d2)</strong></td><td>10 CR</td><td>100 CR</td><td>1.000 CR</td><td>10.000 CR</td></tr>
<tr><td>Painéis termoenergéticos</td><td><strong>Rara</strong></td><td>variável</td><td>&mdash;</td><td>&mdash;</td><td>&mdash;</td><td>&mdash;</td></tr>
</tbody></table>
<p>&#9888; <strong>É aqui que o dinheiro da tripulação some, e é de propósito.</strong> Encher o tanque de uma nave particular a combustível líquido custa <strong>1.000 CR</strong> — quase o pagamento inteiro de um contrato de fronteira. É por isso que ninguém nesta galáxia recusa frete, e é por isso que <em>"não temos combustível para o salto"</em> é uma premissa de aventura em vez de uma desculpa.</p>
<p><em>Os <strong>painéis termoenergéticos</strong> não custam nada para abastecer, e são raros justamente por isso — é a nave que não depende de ninguém. Se o grupo achar uma, é uma recompensa de arco inteiro.</em></p>
`,
  },
  {
    title: "Personagem contra veículo, e veículo contra personagem",
    content: `
<p><em>Regra do Space Dragon §10.6, ausente da cadeia inteira. É a cena de Hoth, do AT-ST em Endor e do blaster contra o speeder.</em></p>
<h2>Atirando num veículo com arma de mão</h2>
<p>É um <strong>ataque à distância normal contra a CA do veículo</strong>. Não há redução de dano nem regra especial — o que protege o veículo é a CA alta.</p>
<ul>
<li><strong>Contra veículos</strong> (CA 24–30), é difícil mas possível. Um Veterano experiente com um rifle blaster acerta um speeder ou um AT-ST com uma rolagem alta.</li>
<li><strong>Contra naves de combate</strong> (CA 46–50), é <strong>impossível na prática</strong> — nem a melhor Base de Ataque de um personagem de 15º nível alcança. E está certo: <strong>blaster de mão não derruba caça.</strong></li>
</ul>
<p><strong>O que funciona contra o que não se acerta:</strong> explosivos e mísseis, que <strong>forçam uma JP da nave</strong> em vez de uma rolagem de ataque (e a JP passa pelo teste de <em>Pilotar</em>); armas <strong>Íon</strong>, que desligam sistema em vez de causar dano; e a solução clássica do gênero — <strong>abordar</strong>, e resolver lá dentro, onde a nave vira masmorra.</p>
<h2>A arma montada atirando em você</h2>
<p>Um canhão de veículo acertaria uma pessoa sem esforço. Como isto é space opera e não simulação, vale o contrário:</p>
<ol>
<li><strong>Role o ataque para cada alvo</strong>, somando o <strong>BA do veículo</strong> + o <strong>BA à distância de quem opera a arma</strong>.</li>
<li><strong>O alvo faz uma JPD.</strong> Passando, sofre <strong>metade do dano</strong>.</li>
<li><strong>A cada 20 pontos no resultado total do ataque, o alvo sofre &minus;2 na JPD.</strong></li>
</ol>
<p><em>Um resultado 37 impõe <strong>&minus;2</strong>; um resultado 41 impõe <strong>&minus;4</strong>.</em></p>
<p>&#9888; <strong>O efeito de mesa é o certo:</strong> heróis <strong>não morrem</strong> de um tiro de turbolaser — eles voam para trás, se levantam e correm. Mas um canhão bem operado, com BA alto, empilha penalidade suficiente para que a JPD comece a falhar. É a diferença entre a fuga de Hoth e a morte de um figurante.</p>
`,
  },
  {
    title: "Veículos terrestres, aquáticos e aéreos",
    content: `
<p>Mesmas regras de pilotagem e combate das naves, e a mesma escala de porte. Os números saem da <strong>Tabela 9-8 do ED-09</strong>; abaixo, o de-para de Star Wars.</p>
<table><thead><tr><th>Tipo (ED-09)</th><th>Porte · CA</th><th>Equivalentes em Star Wars</th></tr></thead><tbody>
<tr><td><strong>Aerocarro</strong></td><td>P · CA 30</td><td><strong>Speeder bike</strong> (74-Z), <strong>landspeeder</strong> (X-34), <strong>swoop</strong>, <strong>snowspeeder</strong> (T-47), airspeeder de Coruscant</td></tr>
<tr><td><strong>Hidrocarro</strong></td><td>P · CA 30</td><td>Barco de patrulha, skiff aquático de Naboo, transporte de superfície de Kamino</td></tr>
<tr><td><strong>Submersível</strong></td><td>M · CA 28</td><td><strong>Bongo</strong> gungan, submersível de exploração de Mon Cala</td></tr>
<tr><td><strong>Veículo de exploração</strong></td><td>M · CA 28</td><td><strong>AT-ST</strong>, AT-RT, AT-DP, skiff de carga do deserto, walker de reconhecimento</td></tr>
<tr><td><strong>Submarino</strong></td><td>G · CA 26</td><td>Transporte subaquático de Mon Cala, submarino de guerra</td></tr>
<tr><td><strong>Tanque de guerra</strong></td><td>G · CA 30</td><td><strong>AAT</strong> separatista, TX-130 <em>Saber</em>, AT-AP, canhoneira de solo</td></tr>
</tbody></table>
`,
  },
  {
    title: "Notas de conversão",
    content: `
<ul>
<li><p><strong>Quem comanda uma nave:</strong> no SD a nave própria chega por especialização/alto nível. Nesta adaptação, o <strong>Veterano</strong> é o capitão natural (com a habilidade <strong>Pilotar</strong>), e o <strong>Operativo</strong> da trilha <strong>Contrabandista</strong> também pilota (Piloto Nato); um <strong>Veterano/Emissário</strong> ganha uma <em>Espaçonave particular</em> ou <em>Transuniversal</em> patrocinada. Qualquer grupo pode ganhar, comprar ou roubar uma nave em jogo.</p></li>
<li><p><strong>Pilotagem:</strong> use a habilidade <strong>Pilotar</strong> do Veterano (1-2 a 1-5 em 1d6). O Técnico pilota mal (1 em 1d6).</p></li>
<li><p><strong>Salto hiperespacial:</strong> é o <em>salto hiperespacial</em> do SD (três testes de pilotagem consecutivos). "Hyperdrive" = <strong>acelerador hiperespacial</strong>.</p></li>
<li><p><strong>Armas de nave:</strong> as torretas laser do SD são os <strong>canhões laser</strong> (naves menores) e <strong>turbolasers</strong> (naves capitais). Mísseis de prótons e torpedos entram como as armas de maior dano/área do livro.</p></li>
<li><p><strong>Sabres, blasters e a escala pessoal</strong> continuam nas regras de personagem — o combate espacial só entra quando a cena é de nave contra nave.</p></li>
</ul>
`,
  },
];

export const navesJournal = {
  title: "Naves e Veículos",
  pages: paginas,
};

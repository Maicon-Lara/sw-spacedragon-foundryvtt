// Naves e Veículos de "Star Wars — Space Dragon" — transcrito de SW-SD-Naves.md.
//
// As naves NÃO viram Actors: o cenário as trata pelo Capítulo de Espaçonaves e
// Estações do Space Dragon, e este arquivo é apenas um de-para de nomenclatura.
// Por isso o conteúdo é uma JournalEntry de referência do Mestre, no mesmo
// formato consumido por journalDoc() de tools/lib.mjs.

const paginas = [
  {
    title: "Naves e Veículos — como funcionam",
    content: `
<p><strong>Regras:</strong> naves, caças e veículos usam o <strong>Capítulo de Espaçonaves e Estações do Space Dragon</strong> sem alteração — combate espacial, PV, Base de Ataque, Jogadas de Proteção da nave, combustível, salto hiperespacial e câmaras.</p>
<p>Esta referência é um <strong>de-para de nomenclatura</strong>: pegue a classe de nave do SD que quiser e vista-a de Star Wars. Os números vêm do livro de Space Dragon.</p>
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

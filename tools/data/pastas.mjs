// Cores das pastas dos compêndios.
//
// A cor serve para NAVEGAR, não para enfeitar. A regra é uma só: a cor marca a
// FAMÍLIA, e o filho herda a do pai. Assim "Guardião (Ataru)" tem a mesma cor
// de "Sensível à Força" e o olho agrupa a árvore sem ler.
//
// Onde a cor paga mais é no compêndio de Poderes: saber de relance se um poder
// é da Sombra é a diferença entre marcar Corrupção e não marcar.
//
// SOBRE A ESCOLHA DOS TONS: o Foundry pinta o NOME da pasta com esta cor, e o
// mundo pode estar no tema claro ou no escuro. Todos os tons abaixo ficam entre
// ~45% e ~65% de luminosidade — escuros demais somem no tema escuro, claros
// demais somem no claro. Nenhuma informação depende só da cor: o nome da pasta
// continua dizendo tudo, então quem não distingue as cores não perde nada.

export const CORES_DE_PASTA = {
  // ── Poderes da Força: o Caminho, à primeira vista ──
  "Luz": "#4a9edd", // azul de sabre Jedi
  "Sombra": "#c8433b", // vermelho de sabre Sith
  "Universal": "#8a8f98", // cinza: não pende para lado nenhum

  // ── Classes: um tom por chassi ──
  "Veterano": "#c1683a", // laranja queimado, o marcial
  "Operativo": "#7d5ba6", // roxo, o das sombras
  "Técnico": "#d9a441", // âmbar de bancada
  "Sensível à Força": "#5b8dd6", // azul, primo da Luz
  "Senda Mandaloriana": "#7f8c99", // cinza-aço do beskar
  "Formas de Sabre (Guardião)": "#5aa9a0", // verde-azulado: técnica, não classe

  // ── Espécies: todas iguais de propósito ──
  // Dar uma cor por espécie deixaria dez cores brigando e não diria nada — são
  // todas a mesma categoria. O que precisa se distinguir é o que NÃO é espécie.
  "Chiss": "#6f9b6e",
  "Droide": "#6f9b6e",
  "Humano": "#6f9b6e",
  "Mon Calamari": "#6f9b6e",
  "Mutante": "#6f9b6e",
  "Rodiano": "#6f9b6e",
  "Trandoshano": "#6f9b6e",
  "Twi'lek": "#6f9b6e",
  "Wookiee": "#6f9b6e",
  "Zabrak": "#6f9b6e",
  "Origens": "#b07fc4", // escolha por cima da espécie, não uma espécie
  "Molde Mutante (opcional)": "#a4894a", // opcional, e por isso destacado
  "Idiomas da galáxia": "#8a8f98", // referência

  // ── Equipamento: por natureza do item ──
  "Armas Corpo a Corpo": "#b3574a",
  "Blasters e Armas de Energia": "#b3574a",
  "Sabres de Luz": "#56b0a6", // a arma que não é como as outras
  "Cristais Kyber": "#56b0a6", // e o que a alimenta
  "Armaduras e Escudos": "#6f8fae",
  "Vestes sob Encomenda": "#6f8fae",
  "Aparatos Tecnológicos": "#d9a441",
  "Kits e Estojos": "#d9a441",
  "Equipamento Geral": "#8a8f98",
  "Miudezas, Energia e Sobrevivência": "#8a8f98",

  // ── Bestiário ──
  "Feras da Galáxia": "#6f9b6e",
  "Modelos de PNJ": "#5b8dd6",
  "Ameaças": "#c8433b", // as das aventuras, e é para saltar aos olhos
};

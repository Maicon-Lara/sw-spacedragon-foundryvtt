# Star Wars — Space Dragon (OD2) · módulo para Foundry VTT

Módulo de conteúdo da adaptação **Star Wars para Old Dragon 2** com o suplemento
sci-fi **Estrela Dracônica / Space Dragon**, para o sistema
[`olddragon2e`](https://github.com/olddragoneditora/olddragon2e-foundryvtt).

Obra de fã, não oficial e sem fins lucrativos. Texto de Maicon Lara.
Star Wars © Lucasfilm Ltd.

## Fonte de verdade

O conteúdo é transcrito dos arquivos do cofre Obsidian em
`Documents\Ekhoria\STAR WARS - OD2 - SD\` (`#SW-SD-Index.md` e `SW-SD-*.md`).
*(Pasta renomeada de "STAR WARS SPACE DRAGON" em jul/2026, quando o nome "Space Dragon" passou a designar a versão nativa.)*
**Mudou o compêndio? Edite `tools/data/*.mjs` e rode o build** — os packs nunca
são editados à mão.

## Compêndios

| Pack | Tipo | Conteúdo |
|---|---|---|
| `swsd-especies` | Item | 9 espécies (`race` + `race_ability`), o molde Mutante e a Origem *Filho de Mandalore* |
| `swsd-classes` | Item | 4 classes-base + 13 especializações (`class`), as 7 Formas de Sabre e o Núcleo Mandaloriano |
| `swsd-equipamentos` | Item | blasters, armas, sabres, cristais, armaduras e aparatos |
| `swsd-poderes` | Item | Poderes da Força de 1ª a 5ª Grandeza (`spell`) |
| `swsd-bestiario` | Actor | criaturas e modelos de PNJ (`monster`) |
| `swsd-journal` | JournalEntry | Poderes de 6ª a 10ª Grandeza e Naves & Veículos |

## Decisões de modelagem

- **Especializações são classes próprias.** É como o OD2 oficial trata
  Bárbaro/Paladino/Arqueiro. A classe-base usa a coluna de XP normal; a
  especialização, a coluna **XP Especial** da tabela do Space Dragon (escala
  1–15). Ver `tools/data/progressoes.mjs`.
- **Guardião ataca como Veterano.** *Adestramento de Combate* `[1]` troca a
  Base de Ataque do místico pela do Veterano — a tabela já sai montada assim
  (campo `baDe` em `tools/data/classes.mjs`).
- **Formas de Sabre e Senda Mandaloriana são habilidades avulsas**
  (`tools/data/avulsas.mjs`): o jogador arrasta para a ficha a que escolheu, em
  vez de o compêndio ter 7 variantes de Guardião.
- **Talentos de Operativo** usam o campo nativo `rogue_talents`, que é o que faz
  a ficha do OD2 exibir o alocador de pontos. Cada especialização tem a sua
  lista de cinco.
- **Poderes da Força:** o tipo `spell` do OD2 só tem círculos 1–5, e as
  Grandezas vão até a 10ª. Os de **1ª a 5ª viram `spell`** (usáveis na ficha,
  com a Grandeza real declarada no início da descrição); os de **6ª a 10ª vivem
  no journal**, com texto integral. Nada foi capado nem renumerado.
- **Ícones:** apenas os empacotados pelo próprio sistema OD2
  (`systems/olddragon2e/assets/...`), nunca ícones core de caminho incerto.

## Build

```sh
npm run build      # tools/data/*.mjs -> packs-src/*.json -> LevelDB em sw-spacedragon-module/packs/
npm run extract    # extrai os packs de volta para _verify/, para conferência
python tools/make-zip.py   # gera sw-spacedragon.zip para distribuição
```

Os IDs são **determinísticos** (sha1 do nome, em `tools/lib.mjs`), então
referências por UUID continuam válidas entre builds e entre mundos que já
importaram o conteúdo. Renomear um item **quebra** o vínculo — trate nome como
chave.

`.gitattributes` marca `sw-spacedragon-module/packs/**` como binário: LevelDB
corrompe se o git converter LF↔CRLF.

## Instalação no Foundry

O módulo instala por URL de manifesto, sem precisar de acesso ao servidor:

```
https://raw.githubusercontent.com/Maicon-Lara/sw-spacedragon-foundryvtt/main/sw-spacedragon-module/module.json
```

Requer Foundry v13+ e o sistema Old Dragon 2e 2.4.0+.

> Ao atualizar o módulo, abra o documento **direto do compêndio** — cópias já
> importadas para dentro de um mundo não se atualizam sozinhas.

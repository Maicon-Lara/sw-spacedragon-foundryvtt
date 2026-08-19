# Star Dragon (Star Wars no OD2) · módulo para Foundry VTT

Módulo de conteúdo da adaptação **Star Wars para Old Dragon 2** com o suplemento
sci-fi **Estrela Dracônica / Space Dragon**, para o sistema
[`olddragon2e`](https://github.com/olddragoneditora/olddragon2e-foundryvtt).

Obra de fã, não oficial e sem fins lucrativos. Texto de Maicon Lara.
Star Wars © Lucasfilm Ltd.

## Fonte de verdade

O conteúdo é transcrito dos arquivos do cofre Obsidian em
`Documents\Ekhoria\20 Space Dragon\Star Dragon\` (`#SW-SD-Index.md` e `SW-SD-*.md`).
*(A pasta já se chamou "STAR WARS SPACE DRAGON" e depois "STAR WARS - OD2 - SD"; em
ago/2026 virou `20 Space Dragon/Star Dragon`, com "Space Dragon" reservado para a
versão nativa e "Star Dragon" para esta adaptação de Star Wars.)*
**Mudou o compêndio? Edite `tools/data/*.mjs` e rode o build** — os packs nunca
são editados à mão.

## Compêndios

| Pack | Tipo | Conteúdo |
|---|---|---|
| `stardragon-especies` | Item | 9 espécies (`race` + `race_ability`), o molde Mutante e a Origem *Filho de Mandalore* |
| `stardragon-classes` | Item | 4 classes-base + 13 especializações (`class`), as 7 Formas de Sabre e o Núcleo Mandaloriano |
| `stardragon-equipamentos` | Item | blasters, armas, sabres, cristais, armaduras e aparatos |
| `stardragon-poderes` | Item | Poderes da Força de 1ª a 5ª Grandeza (`spell`) |
| `stardragon-bestiario` | Actor | criaturas e modelos de PNJ (`monster`) |
| `stardragon-journal` | JournalEntry | Poderes de 6ª a 10ª Grandeza e Naves & Veículos |

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

## Aparência

O módulo repinta as fichas do OD2 com uma paleta azul-aço ("Holocron"), mas só
depois de marcar a janela com a classe `stardragon-tema` — o que
`stardragon-module/module/stardragon.js` faz, e a opção **Tema Star Wars
nas fichas** (Configurações → Módulos) desliga. Estilizar
`.olddragon2e.sheet.character` direto repintaria a ficha de qualquer mundo que
instalasse o módulo, sem pedir licença.

O CSS dos journals é escopado em `.stardragon-doc`, container que `journalDoc()` põe
em volta do conteúdo das páginas.

> `tools/make-zip.py` tem a lista `ITEMS` do que vai no pacote. **Pasta nova no
> módulo precisa ser adicionada lá** — senão o arquivo existe no repositório e
> nunca chega ao servidor.

## Build

```sh
npm run build      # tools/data/*.mjs -> packs-src/*.json -> LevelDB em stardragon-module/packs/
npm run extract    # extrai os packs de volta para _verify/, para conferência
python tools/make-zip.py   # gera stardragon.zip para distribuição
```

Os IDs são **determinísticos** (sha1 do nome, em `tools/lib.mjs`), então
referências por UUID continuam válidas entre builds e entre mundos que já
importaram o conteúdo. Renomear um item **quebra** o vínculo — trate nome como
chave.

`.gitattributes` marca `stardragon-module/packs/**` como binário: LevelDB
corrompe se o git converter LF↔CRLF.

## Instalação no Foundry

O módulo instala por URL de manifesto, sem precisar de acesso ao servidor:

```
https://raw.githubusercontent.com/Maicon-Lara/sw-spacedragon-foundryvtt/main/stardragon-module/module.json
```

Requer Foundry v13+ e o sistema Old Dragon 2e 2.4.0+.

> ⚠️ **O módulo mudou de `id` em ago/2026:** era `sw-spacedragon`, agora é
> `stardragon`. Para o Foundry são dois módulos diferentes — quem tinha a versão
> antiga precisa **desinstalar** e instalar por esta URL. Documentos já copiados
> para dentro de um mundo continuam lá, mas os links `@UUID` que apontavam para
> `Compendium.sw-spacedragon.*` deixam de resolver: eles precisam ser refeitos a
> partir dos compêndios novos. O nome do repositório não mudou, só o do módulo.

> Ao atualizar o módulo, abra o documento **direto do compêndio** — cópias já
> importadas para dentro de um mundo não se atualizam sozinhas.

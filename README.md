# Star Dragon · módulo para Foundry VTT

**Star Wars jogado em Old Dragon 2**, pelo motor do suplemento sci-fi *Space
Dragon* / *Estrela Dracônica*. Módulo de conteúdo para o sistema
[`olddragon2e`](https://github.com/olddragoneditora/olddragon2e-foundryvtt):
espécies, classes, equipamento, Poderes da Força, bestiário e o material de
mesa do Mestre, tudo em compêndio.

Obra de fã, não oficial e sem fins lucrativos. Texto de Maicon Lara.
Star Wars © Lucasfilm Ltd. · *Space Dragon* © Old Dragon Editora.

---

## Instalação

Instala por URL de manifesto, sem precisar de acesso ao servidor:

```
https://raw.githubusercontent.com/Maicon-Lara/sw-spacedragon-foundryvtt/main/stardragon-module/module.json
```

Requer **Foundry v13+** e o sistema **Old Dragon 2e 2.4.0+**.

> ⚠️ **Veio de uma versão anterior à 1.0.0? Não dá para atualizar — tem que
> reinstalar.** O módulo mudou de `id` em ago/2026: era `sw-spacedragon`, agora
> é `stardragon`. Para o Foundry são **dois módulos diferentes** — o `id` é o
> nome da pasta em `Data/modules/` e o prefixo de todo UUID de compêndio.
>
> O Foundry guarda a URL de quando você instalou, então "Atualizar" vai bater no
> caminho antigo e falhar com **"No module manifest found"**. É esperado.
>
> 1. **Add-on Modules → Uninstall** na versão antiga.
> 2. **Install Module** com a URL acima.
> 3. No mundo, **Gerenciar Módulos**: marque *Star Dragon* e desmarque o antigo,
>    que aparecerá como faltando.
>
> **Documentos já arrastados para dentro do mundo continuam lá** — o compêndio
> some junto com o módulo e volta na instalação, mas fichas e itens que já estão
> no mundo são cópias independentes. O que quebra são os links `@UUID` que
> apontavam para `Compendium.sw-spacedragon.*`: precisam ser refeitos a partir
> dos compêndios novos. O nome do **repositório** não mudou, só o do módulo.

Histórico de versões em [`CHANGELOG.md`](CHANGELOG.md).

---

## O que vem dentro

| Pack | Tipo | Conteúdo |
|---|---|---|
| `stardragon-especies` | Item | 9 espécies escritas + o molde **Mutante** (`race` + `race_ability`), as 20 mutações da T2-1 do Space Dragon e a Origem *Filho de Mandalore* |
| `stardragon-classes` | Item | 4 classes-base + 14 especializações (`class`), as 7 variantes de Forma do Guardião e as 4 fichas da Senda Mandaloriana |
| `stardragon-equipamentos` | Item | armas brancas, blasters, sabres, cristais kyber, armaduras, escudos, kits e o catálogo de aparatos por Nível Tecnológico |
| `stardragon-poderes` | Item | Poderes da Força de 1ª a 5ª Grandeza (`spell`) |
| `stardragon-bestiario` | Actor | criaturas da galáxia, modelos de PNJ e as ameaças das aventuras (`monster`) |
| `stardragon-journal` | JournalEntry | Criando um Personagem · regras de equipamento e serviços · Feitos Científicos · Poderes de 6ª a 10ª Grandeza · Naves e Veículos · bestiário · Seção do Mestre |

> Ao atualizar o módulo, abra o documento **direto do compêndio**. Cópias já
> arrastadas para dentro de um mundo são snapshots independentes e não
> acompanham a atualização — é o comportamento normal do Foundry, não um bug.
> Para consertar cópias antigas em lote existe `tools/macro-limpar-descricoes.js`.

---

## Fonte de verdade

O conteúdo é **transcrito do cofre Obsidian**, em
`Documents\Ekhoria\20 Space Dragon\Star Dragon\` (`#SW-SD-Index.md` e
`SW-SD-*.md`).

**Mudou o compêndio? Edite `tools/data/*.mjs` e rode o build.** Os packs e o
`packs-src/` nunca são editados à mão — são saída, não entrada.

<details>
<summary>Duas notas sobre o cofre</summary>

- A pasta já se chamou "STAR WARS SPACE DRAGON" e depois "STAR WARS - OD2 - SD".
  Em ago/2026 virou `20 Space Dragon/Star Dragon`, com **Space Dragon**
  reservado para a versão nativa e **Star Dragon** para esta adaptação.
- Os arquivos do cofre **não têm final de linha uniforme**: `SW-SD-Especies.md`
  é CRLF e `#SW-SD-Index.md` é LF. Script que escreva lá precisa **detectar** a
  convenção de cada arquivo, ou o backup automático registra o arquivo inteiro
  como alterado.

</details>

---

## Build

```sh
npm run build              # tools/data/*.mjs → packs-src/*.json → LevelDB
npm run extract            # extrai os packs de volta para _verify/, para conferência
python tools/make-zip.py   # gera stardragon.zip para distribuição
```

Um build limpo hoje produz:

| Pack | Documentos |
|---|--:|
| espécies | 83 |
| classes | 258 |
| equipamentos | 154 |
| poderes | 60 |
| bestiário | 70 |
| journal | 7 |

### O que cada ferramenta faz

| Arquivo | Para quê |
|---|---|
| `tools/build.mjs` | O build. Monta os documentos e compila cada pack para LevelDB |
| `tools/lib.mjs` · `tools/lib-actors.mjs` | Fábricas de documento (`classDoc`, `raceDoc`, `weaponDoc`, `monsterDoc`…) e os IDs determinísticos |
| `tools/data/*.mjs` | **O conteúdo.** Um arquivo por assunto; os `*-journal.mjs` são as páginas de referência |
| `tools/extract.mjs` | Descompila os packs para `_verify/`, para conferir o que foi parar lá dentro |
| `tools/make-zip.py` | Empacota o módulo para distribuição |
| `tools/make-banners.mjs` | Gera as capas dos compêndios em SVG — o OD2 traz banners de fantasia medieval, e um cavaleiro na capa de "Espécies" fica pior que capa nenhuma |
| `tools/importar-ameacas.py` | Único importador automático: lê os blocos de PNJ das aventuras de *A Longa Sombra* no cofre e gera `tools/data/ameacas.mjs`. **Não edite esse arquivo à mão** |
| `tools/macro-limpar-descricoes.js` | Macro de mundo: limpa HTML de descrições em itens já importados |

### Três armadilhas do build

- **IDs são determinísticos** (sha1 do nome, em `tools/lib.mjs`). Referências
  por UUID sobrevivem a builds e a mundos que já importaram o conteúdo — mas
  **renomear um item quebra o vínculo**. Trate nome como chave primária.
- **`tools/make-zip.py` tem uma lista `ITEMS`** do que entra no pacote. Pasta
  nova no módulo precisa ser adicionada lá, senão o arquivo existe no
  repositório e nunca chega ao servidor.
- **`.gitattributes` marca os packs como binários.** LevelDB corrompe se o git
  converter LF↔CRLF.

---

## Decisões de modelagem

**Especializações são classes próprias.** É como o OD2 oficial trata
Bárbaro/Paladino/Arqueiro. A classe-base usa a coluna de XP normal; a
especialização, a coluna **XP Especial** da tabela do Space Dragon (escala
1–15). Ver `tools/data/progressoes.mjs`.

**As escolhas de trilha vêm em dois formatos, de propósito.** As Formas de Sabre
e o pacote de clã da Senda Mandaloriana existem como habilidades soltas
(`tools/data/avulsas.mjs`) **e** como fichas de classe já montadas
(`tools/data/variantes.mjs`): 7 variantes de Guardião e as 4 Sendas.

A duplicação não é descuido — é contorno. O sistema **não deixa soltar uma
`class_ability` direto no personagem**: a ficha bloqueia com *"Habilidades de
classe não podem ser adicionadas diretamente ao personagem"*. O caminho nativo
é abrir o item da classe que já está na ficha e soltar a habilidade dentro
dele, o que funciona mas quase ninguém descobre. As variantes prontas resolvem
o caso comum (arrastar *Guardião (Soresu)* e acabou); as avulsas continuam lá
para quem for trocar de Forma depois ou pegar a técnica de uma segunda.

**Guardião ataca como Veterano.** *Adestramento de Combate* `[1]` troca a Base
de Ataque do místico pela do Veterano — a tabela já sai montada assim (campo
`baDe` em `tools/data/classes.mjs`).

**Talentos de Operativo** usam o campo nativo `rogue_talents`, que é o que faz a
ficha do OD2 exibir o alocador de pontos. Cada especialização tem a sua lista de
cinco.

**Poderes da Força:** o tipo `spell` do OD2 só tem círculos 1–5, e as Grandezas
vão até a 10ª. Os de **1ª a 5ª viram `spell`** (usáveis na ficha, com a Grandeza
real declarada no início da descrição); os de **6ª a 10ª vivem no journal**, com
texto integral. Nada foi capado nem renumerado.

**Regra que não cabe em campo vira texto.** O OD2 não tem campo para "o DV da
classe sobe uma categoria" nem para "role 2d20 e fique com o pior". Onde existe
campo mecânico ele é preenchido (`xp`, `natural_armor`, `jp`, `daily_uses`,
`rogue_talents`); onde não existe, a regra fica na descrição, e o texto diz o
que o jogador tem de fazer à mão.

**Ícones:** apenas os empacotados pelo próprio sistema OD2
(`systems/olddragon2e/assets/...`), nunca ícones core de caminho incerto.

---

## Aparência

O módulo repinta as fichas do OD2 com uma paleta azul-aço ("Holocron"), mas só
depois de marcar o `<body>` com a classe `stardragon-tema` — o que
`stardragon-module/module/stardragon.js` faz, e a opção **Tema Star Wars nas
fichas** (Configurações → Módulos) desliga.

Duas decisões por trás disso:

- **A marca vai no `<body>`, não em cada janela.** A primeira versão usava
  `Hooks.on("renderActorSheet")`, e o gancho nunca disparou: o Foundry monta o
  nome do gancho a partir do nome interno da classe, e a ficha do OD2 herda da
  camada de compatibilidade, cujo nome interno não é garantido. Uma classe no
  `<body>` não depende de gancho nenhum.
- **Nada estiliza `.olddragon2e.sheet` direto.** Isso repintaria a ficha de
  qualquer mundo que instalasse o módulo, sem pedir licença.

O CSS dos journals é escopado em `.stardragon-doc`, container que `journalDoc()`
põe em volta do conteúdo das páginas.

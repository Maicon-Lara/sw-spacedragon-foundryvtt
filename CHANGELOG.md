# Changelog — Star Dragon

O módulo se chamava **Star Wars — Space Dragon** e tinha o `id` `sw-spacedragon`
até a 0.9.1. As versões anteriores a 1.0.0 não têm entrada aqui: o changelog
começou junto com o rename.

---

## 1.7.1 — 28/08/2026

### A ficha de Nave não abria: o template não estava no zip

`make-zip.py` montava o pacote a partir de uma **lista de inclusão**
(`["module.json", "packs", "styles", "assets", "module", "lang"]`) e pulava em
silêncio o que não existisse. A pasta `templates/`, criada na 1.7.0, não estava
na lista — o zip subiu sem ela, e a ficha morria com
`ENOENT: templates/nave.hbs` no cliente.

O comentário do próprio arquivo já avisava do risco (*"sem isso o CSS e as capas
existem no repositório mas nunca chegam ao servidor"*) e mesmo assim a armadilha
funcionou: lista de inclusão esquece, e o `continue` silencioso não deixa
ninguém notar.

**Agora é lista de exclusão.** Vai tudo o que está em `stardragon-module/`,
menos o que for explicitamente excluído. Pasta nova entra sozinha.

E o empacotador passou a **conferir o que empacotou**: todo `esmodules`,
`styles` e `packs` do manifesto, e todo caminho `modules/stardragon/…` citado
no código, precisam existir dentro do zip. Se faltar, o build falha com o nome
do arquivo em vez de publicar. Testado escondendo o `templates/` — a trava
apontou `template citado em nave-ficha.js: templates/nave.hbs`.

---

## 1.7.0 — 28/08/2026

### Ficha de Nave

Tipo de ator próprio (`stardragon.nave`), com modelo de dados e ficha do
módulo. Implementa o **Combate Tático de Naves** do cenário — o dogfight
posicional no espírito do *X-Wing* rodando sobre o motor do OD2.

Duas coisas da regra moldaram a ficha inteira:

**A CA de Casco é 44 para toda nave**, e por isso não é campo editável: é
constante do módulo, mostrada e travada. A agilidade saiu da CA e virou dado de
Esquiva — acertar a chapa de um caça e de um cruzador é igualmente difícil; o
que muda é o quanto ele consegue não estar lá. Um 43 numa ficha seria bug
silencioso, não variante.

**As fichas de rodada são estado, não anotação.** Foco, Esquiva, Trava e
Estresse ficam na ficha, e o botão *fim da rodada* limpa pela regra: saem Foco e
Esquiva, **permanecem Trava e Estresse**. No jogo de miniaturas são peças na
mesa; num VTT são exatamente o que se esquece.

**Botão de ataque** monta `1d20 + BA` contra a CA 44 somando alcance (+2/0/−2),
Foco (+2), porte do alvo (0/+2/+4/+6), a penalidade de G/C contra P (−4) e
estresse/avaria (−2). Gasta as fichas que usou. Trata 20 e 1 naturais.

**Botão de esquiva** rola os d6 de Agilidade contando **5-6** como êxito e
**3-4** também se gastar Foco, com +1 dado a alcance longo e −1 pela cauda. O
cartão diz quantos *dados de dano* foram cancelados — não pontos, que é o erro
mais comum de fazer de cabeça. Agilidade 0 avisa em vez de rolar: o cruzador não
se desvia, encaixa.

**O escudo regenera +1 só na rodada sem dano**, e a ficha sabe disso sozinha: um
hook em `preUpdateActor` marca quando casco ou escudo caem.

Também: *aplicar perfil* preenche BA, Agilidade, Velocidade e a fórmula de casco
a partir do chassi; *rolar* casco resolve o `1d100`/`3d100`/`1d1000` da tabela;
o escudo puxa o máximo do gerador cruzado com o porte. Postos do Modo Tripulação
na ficha.

---

## 1.6.1 — 28/08/2026

### As cores das pastas estavam ilegíveis, e eu tinha errado a premissa

A 1.5.0 dizia que *"o Foundry pinta o nome da pasta com esta cor"*. **Está
errado:** o Foundry usa a cor como **fundo** da barra e escreve o nome por cima
em creme (`rgb 239,230,216`). Toda a paleta foi escolhida para o modelo trocado.

Medido na tela, com o módulo instalado, a paleta inteira ficava abaixo dos
**4,5:1** que a WCAG pede para texto normal:

| | antes | agora |
|---|--:|--:|
| Técnico (âmbar) | 1,82:1 | **4,64:1** |
| Sabres de Luz | 2,08:1 | 4,67:1 |
| Luz | 2,35:1 | 4,62:1 |
| Sombra | 3,93:1 | 4,67:1 |
| *…as 15* | 1,82–4,33 | **4,61–4,72** |

Os matizes são os mesmos, só escurecidos até passar — azul continua azul,
vermelho continua vermelho. É também o que os outros módulos do mundo fazem: as
pastas do Tomo de Magia usam vinho escuro, 8,7:1.

Conferido depois num mostruário lado a lado: os seis tons das classes e os
cinco do equipamento continuam distinguíveis entre si.

---

## 1.6.0 — 27/08/2026

### Compêndio novo: Star Dragon: Tabelas

As tabelas de preparação do Mestre existiam como **texto estático** nas páginas
do journal — dava para ler e rolar de cabeça, não para clicar. Agora são
**10 RollTables** de verdade, em duas pastas:

- **Gerador de PNJ** — Espécie (1d8), Papel (1d8), Traço marcante (1d10)
- **Relíquia tecnológica** — Tipo (1d20), Função do aparato (1d6), Nível
  Tecnológico (1d20), Instabilidade (1d10), Particularidade (1d10), Quem a
  construiu (1d10), Consequência do uso (1d10)

As páginas do journal **continuam iguais**: quem quer ver a tabela inteira de
uma vez lê lá, quem quer rolar usa aqui. Os números são os mesmos.

**Uma tabela por coluna, e não uma por tabela do journal.** No journal elas
aparecem lado a lado, mas são rolagens independentes — espécie, papel e traço
não se correlacionam —, e uma RollTable tem uma fórmula só.

O `rollTableDoc` já existia em `lib.mjs` desde sempre e **nunca tinha sido
chamado**. Estava escrito para um Foundry antigo: o texto do resultado virou
`description` (era `text`), `type` virou a string `"text"` (era `0`) e
`documentId` virou `documentUuid`. Conferido contra
`olddragon2e.rollable-tables`.

### Quatro monstros que não tinham como atacar

O aviso `monstro-sem-ataque` da 1.4.0 apontava quatro. Os números saíram dos
irmãos do próprio módulo, não da imaginação:

| Criatura | Ataque | De onde veio |
|---|---|---|
| **Krayt Maior** (24 DV) | Mordida +24 (4d6) · 2× Garras +24 (2d6) · Cauda +24 (3d8 e derruba) | as mesmas armas do Dragão Krayt, de quem é a variação anciã, um passo de dado acima; BA = DV como no Exogorth |
| **Blaster automático de teto** (1 DV) | torreta blaster +4 (1d8) | o mesmo aparelho da *Armadilha de laser de parede*, montado no teto |
| **Técnico / engenheiro imperial** (5 DV) | Blaster | a forma do *Oficial / comandante*, o outro PNJ-com-classe de 5 DV |
| **Tmennit En'Dey** (6 DV) | sabre de luz +7 (1d10) | a forma do aluno dela, Lorik Feryss, um DV acima |

A Tmennit leva **um** ataque, não dois como os outros Jedi de 6 DV: nunca foi
Generala, era diplomata na Orla quando a Ordem 66 chegou — e é por isso que
sobreviveu. A ficha devia dizer isso.

---

## 1.5.0 — 27/08/2026

### Pastas coloridas nos compêndios

As 92 pastas dos seis compêndios ganharam cor. A regra é uma só: **a cor marca
a família, e o filho herda a do pai** — "Guardião (Ataru)" tem a mesma cor de
"Sensível à Força", três níveis acima, e o olho agrupa a árvore sem ler.

Onde paga mais é em **Poderes da Força**: Luz em azul de sabre Jedi, Sombra em
vermelho Sith, Universal em cinza. Saber de relance se um poder é da Sombra é a
diferença entre marcar Corrupção e não marcar.

Nas classes, um tom por chassi — Veterano em laranja queimado, Operativo em
roxo, Técnico em âmbar, Sensível em azul, a Senda em cinza-aço do beskar. Nas
espécies, todas as dez do **mesmo** verde de propósito: dez cores brigando não
diriam nada, e o que precisa se distinguir é o que **não** é espécie (Origens,
Idiomas, o Molde Mutante).

O Foundry não propaga cor de pasta sozinho, então a herança é feita no build,
depois de `aninhaPastas()` — antes disso a hierarquia ainda não existe.

**Sobre os tons:** o Foundry pinta o nome da pasta, e o mundo pode estar no tema
claro ou no escuro; todos ficam entre ~45% e ~65% de luminosidade, faixa que
sobrevive aos dois. E nenhuma informação depende só da cor — o nome da pasta
continua dizendo tudo, então quem não distingue as cores não perde nada.

A paleta é editável em `tools/data/pastas.mjs`. Verificação nova no validador:
**`pasta-sem-cor`** (aviso), para pasta nova que ficou de fora da paleta.

---

## 1.4.1 — 27/08/2026

### O Wookiee e o Trandoshano jogavam com CA −3

`natural_armor` **não é um bônus: é a CA base.** O sistema faz

```js
get ac_base() {
  for (const ability of this.race_abilities) {
    const naturalArmor = ability.system.natural_armor;
    if (naturalArmor && naturalArmor !== 0) return naturalArmor;  // RETORNA
  }
  return 10;
}
```

— o valor **substitui** os 10 padrão em vez de somar. A *Casca Peluda* do
Wookiee e as *Garras e Escamas* do Trandoshano diziam `natural_armor: 1` para
significar *"+1 natural na Classe de Armadura"*. Resultado, medido num
personagem de verdade: **CA base 1, CA total −3**. Toda criatura da galáxia
acertava automaticamente.

Agora escrevem **11** (os 10 de base mais o +1 natural), e o texto da habilidade
não mudou — ele sempre esteve certo.

Verificação nova no validador: **`armadura-natural-e-base`** (erro), que recusa
qualquer `natural_armor` entre 1 e 9 — nessa faixa é sempre bônus disfarçado de
base — e diz o número certo a escrever.

---

## 1.4.0 — 27/08/2026

Auditoria do que o **sistema** oferece e o módulo não estava usando, feita
contra o `olddragon2e` 2.6.0 rodando no servidor da mesa.

### O Rancor entrava em cena do tamanho de um stormtrooper

`prototypeToken` tinha `width: 1, height: 1` fixo, para todos. Os 63 monstros
nasciam ocupando **um quadrado**, incluindo os seis que o próprio módulo declara
como grandes em `system.size`:

| Criatura | Tamanho | Token antes | Agora |
|---|---|--:|--:|
| Exogorth (Verme das Areias) | colossal | 1×1 | **4×4** |
| Krayt Maior | colossal | 1×1 | **4×4** |
| Dragão Krayt | imenso | 1×1 | **3×3** |
| Rancor | imenso | 1×1 | **3×3** |
| Dianoga | grande | 1×1 | **2×2** |
| Wampa | grande | 1×1 | **2×2** |

O tamanho declarado já estava certo e no vocabulário do sistema
(`CONFIG.olddragon2e.monster_sizes`); só nunca chegava ao token. É o tipo de
erro que não aparece em teste nenhum e aparece na primeira vez que o bicho
entra na cena.

### Escudo é um tipo próprio no sistema

A ficha do OD2 tem uma **caixa separada** para escudo
(`templates/partials/tabs/character-tab-equipment.hbs`), com card próprio. O
módulo montava tudo como `armor`, então o **Escudo Antimotim** e o **Escudo de
Energia** caíam na lista de armaduras — no box errado, e sem como as classes
que dizem *"pode usar escudo"* conferirem.

O schema dos dois tipos é idêntico (ambos têm `bonus_ca`), então só o `type`
mudou. O **Gerador de Escudo Pessoal** continua `armor`: é aparato defensivo,
não escudo de mão.

O seed do `_id` continua `armor:` de propósito — trocar renomearia o UUID dos
escudos e quebraria quem já os tem na ficha. 623 documentos antes, 623 depois,
nenhum renomeado.

### Duas verificações novas no validador

- **`token-fora-de-escala`** (erro) — `system.size` e o token discordando.
- **`monstro-sem-ataque`** (aviso) — hoje aponta quatro: **Krayt Maior**
  (24+10 DV, colossal, e nada para clicar), **Blaster automático de teto** (uma
  torreta que não atira), **Técnico / engenheiro imperial** e **Tmennit En'Dey
  — Mestra Jedi Caamasi**. Os números são decisão de mesa e ficam para o autor;
  o validador só garante que não passem mais em silêncio.

### Verificado e descartado

`vehicle` existe no sistema, mas o schema é só equipamento genérico — naves
como item não ganhariam nada sobre o journal atual. `container`,
`monster_attack` e o ator `retainer` seguem sem uso; os ataques de monstro já
são itens `monster_attack` em 59 dos 63.

---

## 1.3.1 — 27/08/2026

Testado no servidor da mesa, em Foundry 13.351 com `olddragon2e` 2.6.0.

### A barra da Trilha saía apagada no diálogo

O sistema estiliza `div.title` e `p.result` **só dentro de `section #chat`**
(ver `src/styles/chat.less`). Os cartões de chat pegavam esse estilo de graça —
e por isso saíram certos, com o `+2 CORRUPÇÃO` em vermelho maiúsculo. O
**diálogo** não pega: lá as mesmas classes vinham sem formatação nenhuma, a
barra 0–10 ficava apagada e a faixa não se destacava do resto do texto.

O painel agora tem escopo próprio (`.stardragon-trilha`) com as regras
equivalentes no CSS do módulo, e a barra é monoespaçada para as onze casas
alinharem em qualquer fonte. Escopado, então não repinta diálogo do sistema nem
de outro módulo — e não depende do tema estar ligado: quem desliga o tema ainda
precisa ler a barra.

Nenhum teste fora do Foundry pegaria isto: era CSS.

### `verified` do sistema: 2.4.0 → 2.6.0

A mesa roda 2.6.0. Nada quebrou no que foi exercitado, e o Foundry para de
tratar o módulo como não-verificado.

### O que passou no teste ao vivo

Diálogo, Tentação (*Arrancar* +2 levando 0 → 2), cartões de chat, a trava de
uma vez por cena, *Nova cena* liberando a cena e preservando o teto do dia, a
**Queda** (9 → 10 → volta a 7 e o Caminho vira Sombra), o **Consumido**
(parando em 10 com a ficha intacta) e a trava embaixo de 0.

---

## 1.3.0 — 27/08/2026

### A Trilha de Corrupção

A Corrupção é a única engrenagem do cenário que o sistema não tem como saber que
existe: não é PV, não é Foco, não é uma JP. Vivia na memória da mesa — e é o tipo
de coisa que a memória perde, porque a trilha sobe de 1 em 1 ao longo de sessões
inteiras e só cobra no 10.

Novo compêndio **Star Dragon: Macros**, com três botões arrastáveis: a trilha do
personagem, *Nova cena* (libera a Tentação) e *Novo dia* (zera o teto de três).

A janela traz a barra 0–10, a faixa com a penalidade escrita, e os quatro
caminhos: **A Tentação** (Insistir +1 · Arrancar +2 · Sentenciar +1, com a trava
de uma vez por cena e três por dia), ganhar +1 pelos três motivos da regra,
perder −1 pelos outros três, e declarar o Caminho. Tudo sai em cartão de chat no
formato nativo do OD2.

**O que ele decide, e o que não decide.** A **Queda** está na regra e é
determinística — chegar a 10 vindo da Luz ou do neutro troca o Caminho para
Sombra e devolve a Corrupção para **7**; isso ele aplica. O **Consumido** ele
apenas anuncia: o personagem sair das mãos do jogador é decisão de mesa, não de
script, e a ficha fica intacta.

### Sobre onde a lógica mora

Dentro do módulo, não dentro da macro. A macro que o jogador arrasta vira uma
cópia dele, e cópias não recebem atualização; chamando `game.stardragon.*`,
atualizar o módulo atualiza a regra sem ninguém re-arrastar nada. A macro ainda
avisa, em vez de falhar calada, se o módulo estiver desligado.

Não há campo novo em `system.*` — o estado são flags do ator. O módulo é de
conteúdo e não inventa campo no sistema de outra pessoa.

Nada de gancho de render: `renderActorSheet` não dispara neste sistema (a ficha
herda da camada de compatibilidade `foundry.appv1.sheets.ActorSheet`), e o tema
já tinha apanhado disso na 1.0. Um diálogo próprio não depende de gancho nenhum.

### `npm run teste`

25 verificações da regra, fora do Foundry: as cinco faixas, a trava 0–10, a
Queda que pousa em 7 e troca o Caminho, o Consumido que não mexe na ficha, o
neutro que cai como a Luz, o *Arrancar* de 8 que estoura o 10, o exemplo da
própria habilidade (poder da Sombra +1 seguido de Arrancar +2 = 3 pontos numa
ação) e a diferença entre *nova cena* e *novo dia*.

O diálogo e os cartões não dá para testar aqui — dependem do Foundry. A regra
dá, e é onde um erro custa caro.

---

## 1.2.3 — 27/08/2026

### `npm run validar`

Nenhum erro desta semana quebrou o build. O pack compilou feliz nas cinco vezes,
e o problema só apareceu quando alguém abriu a ficha — as tags cruas do campo de
restrição só foram descobertas por um print de tela.

O validador confere o que o build **gerou**, e procura exatamente o que já
passou batido: tag em campo de texto puro, UUID quebrado, `_id` duplicado, tag
vazia (sobra de corte), nota de conversão vazando, habilidade que promete
equipamento que a restrição da classe proíbe, irmãs com contagem muito
desigual, frase repetida, parágrafo abrindo com conectivo sem antecedente e
ponteiro para nota que não existe mais.

Erro trava (`exit 1`); aviso só relata — são heurísticas, e falso positivo não
pode travar o trabalho de ninguém. Cada uma das cinco travas foi testada
injetando o bug num pack e conferindo que ela dispara.

### Um achado do próprio validador

A regra do **Consumido** trazia a atribuição no meio da frase — *"Consumido
(criação da casa — a trilha nunca teve fim marcado…)"*. Todas as outras
"criação da casa" já estavam marcadas; essa escapou por ser inline. Separada: a
regra ficou limpa e a atribuição virou nota.

---

## 1.2.2 — 24/08/2026

### As restrições de equipamento apareciam com as tags cruas

`equipment_restrictions` é renderizado pela ficha do OD2 como **texto**, não
HTML. A cláusula que a 1.2.1 acrescentou às Sendas vinha com `<strong>`, e o
jogador lia `<strong>Exceção da Senda:</strong>` escrito na ficha. Reescrita em
texto puro.

O build agora **falha** se qualquer classe puser uma tag nesse campo, em vez de
publicar o erro.

### O item da classe mostra só a especialização

`Operativo — Espião` virou **`Espião`**. O prefixo era repetição: a pasta já diz
`Operativo › Espião`, e o *flavor* logo abaixo do título continua dizendo
*"Especialização de Operativo"*. Vale para as 25 especializações, incluindo as
Sendas (`Guerreiro de Clã`, `Armeiro`…) e as Formas (`Guardião (Ataru)`).

**Nenhum UUID mudou** — 620 documentos antes, 620 depois, zero criados, zero
removidos. As pastas e os `_id` continuam semeados pelo nome completo: o
aninhamento depende do padrão `Pai — Filho` no nome da pasta, e trocar o seed
renomearia todas as classes e habilidades e quebraria as fichas já montadas.
Só o rótulo do item encurtou, então **não precisa reinstalar nem re-arrastar**.

---

## 1.2.1 — 24/08/2026

### As Sendas estavam fora do padrão do próprio compêndio

Toda especialização deste módulo traz na ficha só o que é dela: o Guardião não
repete o motor do Sensível, o Mercenário não repete Pilotar. As quatro Sendas
Mandalorianas repetiam a classe-base inteira e chegavam a **14 habilidades**
contra as 6 da irmã Guardião.

Agora seguem a mesma regra — a ficha carrega o que a Senda **toca** (congelou,
trocou, substituiu), o pacote de clã e a Reputação. O que ela mantém intacto é
citado por nome na descrição e continua na classe-base.

| ficha | antes | agora |
|---|---|---|
| Herege de Armadura | 14 | 7 |
| Guerreiro de Clã | 11 | 9 |
| Caçador Solitário | 10 | 9 |
| Armeiro | 9 | 6 |

Duas coisas junto: *A Senda Mandaloriana — como funciona* saiu das quatro fichas
(é verbete de compêndio — descrevia as trocas das quatro de uma vez, então cada
jogador lia na própria ficha o que os outros três trocam) e as habilidades
passaram a sair **ordenadas por nível**.

As Sendas também eram as únicas especializações que anexavam a descrição inteira
da classe-base. O Herege repetia o cartão do Sensível — *Créditos iniciais*,
*Restrição: Droides não podem* — que a ficha já renderiza a partir dos campos
estruturados. Descrições caíram de 2.083–3.390 para 635–932 caracteres.

### Bug de regra: a Senda proibia o que ela mesma dá

As variantes herdavam `equipment_restrictions` da classe-base sem tocar. Com
isso o **Herege de Armadura** — cuja habilidade-assinatura é o *Sangue de
Beskar* — vinha com *"Apenas Leve, sem escudo"* e ficava **proibido de vestir
Beskar**, que é armadura Média. O mesmo com o **Armeiro**, que é quem a forja. E
os dois ganhavam *+1 no dano com armas de haste* por *Treinamento de Clã* com a
linha de armas dizendo *"Nada Marcial"*.

O Guardião já resolvia isso do jeito certo. As Sendas passam a fazer o mesmo, e
**por detecção**: se a linha herdada já cobre o caso, nada é acrescentado — por
isso o Guerreiro de Clã não ganhou cláusula nenhuma e o Caçador Solitário só
ganhou a de armas. Se a restrição da classe-base mudar, a cláusula se ajusta.

### A prosa de conversão saiu das fichas

*"Correção da casa"*, *"Por que 1ª Grandeza e não 2ª"*, o de-para com o Space
Dragon no bestiário, a caixa *"Criação da casa"* repetida onze vezes: **22.415
caracteres** de documentação de conversão que serve a quem mantém o repositório,
não a quem está jogando. O maior era um ensaio de 527 caracteres sobre a trava
de alinhamento, copiado em **treze** fichas do Sensível.

Nada foi apagado. A prosa vive marcada como `<p class='nota-casa'>` nos arquivos
de `tools/data/` e é removida em `writeSource()`, o único ponto por onde todo
documento passa antes de virar pack — mesma convenção do compêndio em Markdown,
cujo `build_docx.py` corta os blocos *"Correção da casa"* antes de distribuir.

Para gerar o módulo **com** as notas: `NOTAS_CASA=1 npm run build`.

Sobraram 926 caracteres, deliberados: regra, conselho de mesa, a página de
de-para do bestiário (que existe para ser um de-para) e o aviso de não misturar
a tabela de naves do ED-09 com a do Space Dragon.

### Quatro cacos do corte

Achados varrendo o `packs-src` desta versão contra o da anterior:

- **Seção do Mestre** apontava *"ver a nota abaixo"* para uma nota cortada, e o
  parágrafo seguinte abria com *"E o problema maior é o outro"* sem antecedente.
  Essa nota não era arqueologia, era carga: a regra virou parágrafo normal e só
  o *"uma versão anterior dizia…"* ficou marcado.
- **Sensível à Força** apontava para *"a caixa que diz de onde veio a ideia"*.
- **Guerreiro de Clã** dizia duas vezes seguidas que mantém *Ataques Múltiplos*.
- Doze *"Criação da casa"* no equipamento que escaparam da primeira passada.

---

## 1.2.0 — 20/08/2026

### O Mutante virou escolha na ficha

As vinte mutações já estavam no compêndio, mas escolher uma exigia abrir duas
pastas e arrastar dois itens. Agora a raça traz **dois seletores na aba Raça** —
*Aprimoramento* e *Degeneração* —, no mesmo lugar onde o Humano escolhe qual JP
recebe o +1.

É o campo nativo `variable_construction` da `race_ability` do OD2: a habilidade
declara `choices_count` e `available_options`, a ficha desenha o dropdown, mostra
a descrição da opção escolhida e grava a seleção em
`actor.system.variable_construction_selections`.

**Um seletor por coluna, não um só com vinte opções.** Duas habilidades separadas
com uma escolha cada é o que garante, por construção, que ninguém saia com dois
Aprimoramentos e nenhuma Degeneração — o *balanço genético* deixa de depender de
o jogador lembrar da regra.

**As sub-tabelas vêm abertas.** *Sentido* e *Atributo* (ampliado e diminuído)
pediam um segundo 1d6 e uma consulta a outra tabela. Agora cada uma entra no
dropdown já nas seis variantes — escolhe-se "8. Atributo Ampliado — 3.
Constituição +3" numa tacada. Quem preferir rolar continua achando pelo número:
os rótulos mantêm o 1d10 e o 1d6. São 20 opções por coluna.

**"Personalizado" é regra, não sobra.** O dropdown do sistema sempre oferece uma
entrada personalizada com nome e descrição livres — e o livro **recomenda**
inventar o próprio fenótipo. A engenhoca do sistema calhou de ser exatamente o
que o texto pedia.

**Uma fonte, duas renderizações.** As mesmas listas geram as habilidades soltas
(texto completo em HTML) e as opções do dropdown (texto puro — o sistema passa a
descrição da opção por `escapeExpression`, e HTML sairia como texto literal). As
habilidades soltas continuam no compêndio para quem preferir arrastar a mutação
inteira.

> As chaves das opções (`08-constituicao`) ficam gravadas na ficha do
> personagem. **Renomear uma mutação apaga a escolha de quem já a tinha feito** —
> trate a chave como contrato.

Pack de espécies: **83 → 84 documentos**.

---

## 1.1.0 — 19/08/2026

### A raça Mutante (Homo novus)

O Mutante existia no módulo só como um **ponteiro**: uma habilidade avulsa
dizendo *"escolha um Aprimoramento e uma Degeneração na tabela T2-1 do SD"*. A
tabela nunca foi transportada — quem não tivesse o livro do Space Dragon aberto
na mesa não conseguia usar o molde.

Agora é uma **raça de verdade**, com as **20 mutações** da T2-1 como habilidades
arrastáveis, em duas pastas dentro dela. Fonte: o PDF do Space Dragon, cap. 2.3
e tabelas T2-1 a T2-5 — **não** o cofre, que só traz o ponteiro.

**O que a conversão precisou resolver** (o livro fala outra língua):

| No Space Dragon | Aqui |
|---|---|
| Intelecto · Ciência · Comunicação | Inteligência · Sabedoria · Carisma |
| JPR · JPF · JPM | JPD · JPC · JPS |
| ±2 no coeficiente de proteção | ±1 de CA *(mesma compressão da regra de surpresa)* |
| "resistência mental de 5%" | some — o OD2 não tem RM; sobra o bônus de JPS |
| "poder mental de 1ª grandeza" | **Poder da Força de 1ª Grandeza**, lista Universal |
| "magia arcana ou divina de 1º círculo" | **um aparato de NT 1–2** replicado pelo corpo |
| "Gatuno" | Operativo |

**Duas leituras da casa**, ambas declaradas na própria habilidade:

- *Superpoderes* mandava escolher uma magia do Old Dragon de fantasia, que não
  existe nesta galáxia. Pelo pilar do cenário — a Força ficou com a metade
  mental do livro de magias e todo o resto virou bancada do Técnico — e como a
  Força já é a mutação 9, o que sobra para a 10 é o **aparato**.
- *Dissonância Mental* tratava as duas personalidades como personagens
  separados **de 1º nível**. Numa escala de 15 níveis isso deixaria metade da
  carreira parada no primeiro degrau; aqui a segunda personalidade fica no 1º
  nível e a principal cresce, com PV e equipamento compartilhados pelo corpo.

**O que não entrou, e por quê:** o livro dá ao Humano +2 num atributo e −2 em
outro, e tira isso do Mutante. Neste cenário o Humano já não tem modificador de
atributo nenhum, então a cláusula não tem objeto — está anotada na ficha para
ninguém "consertar" somando os modificadores de volta. Os únicos ajustes de
atributo do molde vêm de *Atributo Ampliado* e *Atributo Diminuído*.

Pack de espécies: **56 → 83 documentos**.

---

## 1.0.0 — 19/08/2026

Duas coisas ao mesmo tempo: o módulo mudou de nome e o compêndio recebeu a
revisão de agosto do cofre. O 1.0.0 marca o corte porque a troca de `id` já
obriga a reinstalar de qualquer jeito.

### ⚠️ O módulo mudou de `id` — leia antes de atualizar

Era `sw-spacedragon`, agora é `stardragon`. Para o Foundry são **dois módulos
diferentes**: o `id` é o nome da pasta em `Data/modules/` e o prefixo de todo
UUID de compêndio.

- **Desinstale a versão antiga** e instale por esta URL de manifesto:
  `https://raw.githubusercontent.com/Maicon-Lara/sw-spacedragon-foundryvtt/main/stardragon-module/module.json`
- Documentos já **copiados** para dentro de um mundo continuam lá.
- Links `@UUID` que apontavam para `Compendium.sw-spacedragon.*` **deixam de
  resolver** e precisam ser refeitos a partir dos compêndios novos.
- **O nome do repositório não mudou**, só o do módulo. Os packs `swsd-*` viraram
  `stardragon-*`.

### Alinhamento livre em todas as classes

A trava de alinhamento por especialização caiu. Ela vinha da *Afiliação* do
Space Dragon (Leal/Neutro/Rebelde) e produzia personagens que a ficção
contradiz — o Caçador de Recompensas era obrigatoriamente caótico, num cenário
onde Boba Fett cumpre contrato à risca e Din Djarin segue um código religioso.
Cruzada com o alinhamento da espécie, ela fechava trilhas inteiras: um Rodiano
alcançava **3 das 10** trilhas mundanas.

As 29 fichas de classe saem com `restrictions.alignments` vazio, e Wookiee,
Twi'lek e Rodiano passam de alinhamento obrigatório a **tendência**.

### O Dano Crítico do Veterano era zero

`[1] dano ×2` é exatamente o que o OD2 já dá a todo mundo (LB1, p. 92) — a
assinatura da classe marcial entregava **nada** até o 10º nível. O degrau vira
**faixa**, não multiplicador: crítico em **19–20**. O Mercenário vai a **18–20**
com a arma escolhida.

### Mercenário refeito

- *Armado e Perigoso* `[1]` passa a valer alguma coisa (18–20 e ×3); o *Golpe
  Impiedoso* `[3]` foi absorvido nele, e a escada ficou **×3 → ×4 → ×5**.
- *Golpe Certeiro* dá **procedimento rolável** à aposta do `[6]`, que antes só
  dizia "1-3 em 1d6" sem explicar o que a jogada significava.
- O congelamento de JP saiu do `[6]` para o `[10]`: herdado numa escala de 15
  níveis, ele custava 8 pontos por dois terços da carreira.

### Duas trilhas ganharam o que lhes faltava

- **Caçador de Recompensas:** *Marcar a Presa* `[3]`. Do 3º ao 5º ele atacava
  uma vez enquanto o chassi atacava duas, sem nada no lugar.
- **Emissário:** *Palavra que Corta* `[3]` e *Voz de Comando* `[6]`. A trilha
  social do livro não tinha um único número social — a assinatura original se
  perdera porque o atributo *Comunicação* não existe no OD2.

### Técnico

A tabela da classe ganhou **NT** e **Aparatos**. Como a tabela do OD2 tem
colunas fixas, as duas viraram tabela dentro da habilidade que as governa:
**três aparatos prontos de graça** no 1º nível, **+1 por nível**. O Engenheiro
anda uma casa atrás, e o prejuízo dele agora declara o que encarece (a bancada)
e o que não (compra normal de equipamento).

### As quatro Sendas Mandalorianas

Ganharam nome próprio — **Guerreiro de Clã**, **Caçador Solitário**, **Armeiro**
e **Herege de Armadura** — e as travas viraram **mecânicas**, não avisos em
prosa: uma habilidade que "para de progredir" perdeu os degraus na ficha.

A Senda do Veterano não custava nada (a própria tabela de trocas dizia "sem
atrito nenhum"); agora *Pilotar*, *Desarmar* e o *Dano Crítico* congelam, e o
Resol'nare dele pede cinco votos. O Armeiro entrega *Desativar Droides* ao clã.
O Herege ganhou teto de Grandeza na 6ª, o mesmo do Guardião.

### Equipamento

As classes falavam em "armas de uma mão", "armas simples" e "regra de Vestes" —
termos que **nenhuma tabela do cenário etiquetava**. Agora armas trazem **Uso**
(Leve/Marcial/Utilitária), armaduras trazem **Tipo** (Leve/Média/Pesada), e as
duas mais a **Disponibilidade** entram na descrição de cada item.

- **Escudos.** Três classes diziam usar "qualquer veste **e escudo**" e não
  havia escudo nenhum no catálogo. O **Escudo de Energia** (+2, 1.500 CR) veio
  da tabela de vestes do Space Dragon pela régua ÷100, com o **Escudo
  Antimotim** (250 CR) ao lado.
- **A Beskar virou Média.** Como Pesada, ela só permitia Mandaloriano Veterano —
  contradizendo a Senda ser cross-class. Ela já pagava o movimento de uma média.
- **30 itens novos:** kits e estojos que *habilitam* habilidades (sem Kit de
  Segurança o talento *Sabotagem* não rola, e o próprio talento dizia isso),
  Vestes sob Encomenda (T5-3) e as miudezas de sobrevivência.

### Journal: de 3 para 7 documentos

- **Criando um Personagem** *(novo no compêndio)* — o capítulo do jogador.
- **Equipamento — regras de uso e serviços** *(novo)* — a tabela mestra de quem
  usa o quê, Porte, Disponibilidade, surpresa e emboscada, mexer no que não é
  seu, e as tabelas de serviço e contratação.
- **Feitos Científicos** *(novo)* — a outra metade do ofício do Técnico, que o
  cenário anunciava desde sempre e nunca descrevia.
- **Seção do Mestre** *(novo)* — tom, facções, tabelas de preparação, relíquias
  tecnológicas, geração de planetas, perigos do espaço, e a correção de onde
  vem o XP nesta galáxia (não é do pagamento de contrato).
- **Naves** ganhou combustível, personagem × veículo e veículos terrestres.
- **Bestiário** ganhou a tabela de **Prêmio**, o campo que a conversão perdera.

### Manutenção

- `tools/importar-ameacas.py` apontava para `20 Star Wars/Space Dragon/A Longa
  Sombra`, caminho que deixou de existir quando o cofre foi reorganizado.
- O `.pyc` de `importar-ameacas` estava versionado; saiu do índice, e
  `__pycache__/` entrou no `.gitignore`.

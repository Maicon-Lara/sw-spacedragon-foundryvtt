# Changelog — Star Dragon

O módulo se chamava **Star Wars — Space Dragon** e tinha o `id` `sw-spacedragon`
até a 0.9.1. As versões anteriores a 1.0.0 não têm entrada aqui: o changelog
começou junto com o rename.

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

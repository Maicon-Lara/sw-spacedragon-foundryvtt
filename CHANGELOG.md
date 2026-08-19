# Changelog — Star Dragon

O módulo se chamava **Star Wars — Space Dragon** e tinha o `id` `sw-spacedragon`
até a 0.9.1. As versões anteriores a 1.0.0 não têm entrada aqui: o changelog
começou junto com o rename.

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

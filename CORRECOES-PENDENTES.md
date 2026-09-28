# Correções pendentes — módulo Star Wars Space Dragon

**Levantado em 30/08/2026.** O módulo está parado no commit `9fadef1` (27/07) e não tem
nenhuma das mudanças de agosto no cofre.

> ⚠️ **Lembrete de fluxo.** A fonte de verdade é `tools/data/*.mjs`. **Não editar
> `packs-src/` à mão** — o build sobrescreve. Depois de editar: `node tools/build.mjs` e,
> para empacotar, **`python tools/make-zip.py`** (o `tar` do Windows quebra a instalação).

---

## 0. Antes de tudo — o README aponta para uma pasta que não existe

**`README.md:12-13`** diz que o conteúdo é transcrito de:

```
Documents\Ekhoria\STAR WARS - OD2 - SD\
```

O cofre hoje é **`Documents\Ekhoria\20 Star Wars\Star Dragon\`**. Corrigir no mesmo commit,
senão a próxima transcrição procura no lugar errado.

---

## 1. Regra nova: **a curva de NT do livro** (Técnico)

A coluna *Aparatos* **deixa de existir**, e a curva de NT volta a ser a da **T3-1 do Space
Dragon** — um NT a cada dois níveis, comprimida para a escala 1–15. O que era "aparato
grátis por nível" vira um **kit de partida de 3 aparatos de NT 1**, dado uma vez.

> 📖 **De onde vem.** A T3-1 do livro dá ao Cientista uma única coluna, *nível tecnológico
> máximo*, que sobe **um NT a cada dois níveis** e chega ao NT 10 no **19º de 20**. A versão
> anterior do cenário usava "NT = seu nível de classe", quase o dobro da velocidade — o que
> punha uma Mochila de Propulsão de 2.500 CR nas mãos de um Técnico de 3º nível.

### 1.1 — `tools/data/progressoes.mjs` — acrescentar a coluna NT

`TABELAS.tecnico` guarda só `[ba, jp, xp, xpEspecial]`. O NT não é fórmula: é tabela.

```js
// Nivel Tecnologico do Tecnico - curva da T3-1 do Space Dragon (um NT a cada dois
// niveis, NT 10 no 19o de 20), comprimida para a escala 1-15 do Old Dragon 2.
export const NT_TECNICO = [1, 1, 2, 3, 3, 4, 5, 5, 6, 7, 7, 8, 9, 9, 10];

export function tabelaNT() {
  const linhas = NT_TECNICO
    .map((nt, i) => "<tr><td>" + (i + 1) + "o</td><td>" + nt + "</td></tr>")
    .join("");
  return "<table><thead><tr><th>Nivel</th><th>NT maximo</th></tr></thead><tbody>"
       + linhas + "</tbody></table>";
}
```

> ⚠️ **O Engenheiro tem tabela própria.** *Tecnologia de Ponta* (degrau 3) o joga direto
> para **NT 5** — um salto de **três degraus** contra o NT 2 da base — e dali em diante ele
> sobe **a cada dois níveis**, como o Inventor do livro:
>
> ```js
> // NT do Engenheiro: curva normal ate o 2o nivel; do 3o em diante, salta para
> // 5 e sobe um degrau a cada dois niveis (NT 10 no 13o).
> export const NT_ENGENHEIRO = [1, 1, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 10];
> ```

### 1.2 — `tools/data/classes.mjs:25` — `APARATOS_NOTA` só fala de categoria

Hoje ela cobre **quem opera** (ofensivo / defensivo / utilitário) e nada mais. Acrescentar:

> **O kit de partida.** O Técnico entra em jogo com **três aparatos de NT 1** já
> construídos, de graça — dados **uma vez**, no 1º nível. Do 2º em diante, aparato se
> **compra ou se constrói**: o que o nível entrega é **NT**, o alcance do que ele fabrica.

### 1.3 — `tools/data/classes.mjs:401` — habilidade *Aparatos e Feitos Científicos*

- trocar "*Nível Tecnológico = seu nível de classe*" por "**pela coluna NT da tabela**";
- acrescentar o parágrafo do kit de partida;
- 🔁 **aparato destruído ou perdido:** refazer custa **25% do valor e metade do tempo**;
- ⏳ **construir é atividade de entremeio**, entre aventuras.

### 1.4 — As trilhas

| Onde | O quê |
|---|---|
| **Médico de Campo** (degrau 1) e **Slicer** (degrau 1) | "NT igual ao seu nível" → **coluna NT**; 3 aparatos de kit |
| **Médico de Campo** (degrau 6) | "seu nível + 2" → **o da coluna + 2** |
| **Engenheiro** | **2** aparatos de kit (um a menos); NT próprio a partir do degrau 3 |
| **Espião** (degrau 6, `classes.mjs:302`) | "NT igual ao seu nível" → **coluna NT de um Técnico do mesmo nível** |
| **Técnico Mandaloriano** (`variantes.mjs`) | mesma correção do Técnico-base |

---

## 2. Regra nova: **poderes conhecidos = o número da tabela, + 1**

Em cada Grandeza, o Sensível conhece o valor de Foco daquela linha **mais um**. No 1º nível
isso são os dois poderes de 1ª Grandeza da criação — a regra antiga vira caso particular.

### 2.1 — `tools/data/classes.mjs:509` — habilidade *Poderes da Força*

**Tirar** a frase "*Você **começa com dois poderes de 1ª Grandeza** de livre escolha*" e
**pôr** a regra geral:

> **Quantos poderes você conhece: o número da tabela, + 1 — em cada Grandeza.** Olhe a linha
> do seu nível: em cada Grandeza que tiver um número, você conhece **aquele número de
> poderes, mais um**. No 1º nível isso são **dois de 1ª Grandeza**; no 3º, **três de 1ª e
> dois de 2ª**. Ao abrir uma Grandeza nova você já entra nela sabendo **dois** poderes — o
> `+1` existe para isso, e é o que impede ter Foco de 2ª e nenhum poder de 2ª para gastar.
>
> **Quem lê a tabela em outra linha lê a linha inteira.** O **Consular** (*Mente Superior*,
> +2 níveis) não ganha só mais Foco: ganha **mais lista**. O **Mandaloriano** Sensível
> (−1 nível) conhece **menos** poderes. Um **teto de Grandeza** (Guardião 6ª, Vidente 8ª)
> corta as Grandezas acima dele nas duas colunas: sem Foco e sem lista.

### 2.2 — `tools/data/classes.mjs` — habilidade *Aprender Poderes da Força*

Acrescentar no começo da `desc`:

> O número da tabela é o **piso garantido pelo nível**; esta habilidade põe poderes **acima**
> dele — o holocron achado, o mestre que ensina, a técnica arrancada de um inimigo.

### 2.3 — 🔴 As três regras de Foco **não existem no módulo**

Confirmado por busca: nem `classes.mjs` nem `poderes.mjs` mencionam recarga, gasto na falha
ou reservas fechadas. As três vêm do guia do Martellini (p. 27) e nunca foram transcritas.
Criar uma constante `FOCO_NOTA` e usá-la na descrição da classe **e** no JournalEntry de
poderes:

> - **Declarou, gastou.** O Foco sai no instante em que você declara o poder, funcionando
>   ou não.
> - **Volta com 8 horas de descanso.** O Foco Diário zera e reabastece — não por dia de
>   calendário, e não aos poucos.
> - **Cada Grandeza é uma reserva fechada.** Foco de 2ª não paga poder de 1ª, e o de 1ª não
>   sobe para lançar um de 2ª. Não há conversão em nenhuma direção.

### 2.4 — `tools/data/progressoes.mjs:60` — `GRANDEZAS` está exportado e **nunca é usado**

Código morto: `grep` não acha nenhum consumidor. É justamente a tabela que deveria aparecer
na descrição do Sensível — e agora ela ganha uma segunda leitura (o `+1`). Sugestão:

```js
export function tabelaGrandezas() {
  const cab = ["1ª","2ª","3ª","4ª","5ª","6ª","7ª","8ª","9ª","10ª"];
  const linhas = GRANDEZAS.map((g, i) => {
    const focos = cab.map((_, j) => g[j] ?? "—");
    const sabe  = cab.map((_, j) => (g[j] ? g[j] + 1 : "—"));
    return `<tr><td>${i + 1}º</td><td>${focos.join(" / ")}</td><td>${sabe.join(" / ")}</td></tr>`;
  }).join("");
  return `<table><thead><tr><th>Nível</th><th>Foco Diário</th><th>Poderes conhecidos</th></tr></thead><tbody>${linhas}</tbody></table>`;
}
```

---

## 3. Dívida acumulada — o módulo carrega achados já auditados

Não bloqueiam as regras novas, mas se você regerar hoje, regera com eles dentro.
Ver `_auditoria/` no cofre.

| Onde | O quê |
|---|---|
| `classes.mjs:411` | *Desconto Tecnológico* usa `level6` com "(a partir do 5º nível)" — gambiarra para o degrau `[5]` do Técnico, que é o único fora do padrão `[1]/[3]/[6]/[10]`. Se o cofre normalizar o `[5]`, muda aqui. |
| `classes.mjs:207` | *Armado e Perigoso* `[1]` do Mercenário dá crítico ×2 — **igual** ao *Dano Crítico* herdado. Nasce inerte nos níveis 1–2. |
| `classes.mjs:188` e `:206` | *Dano Crítico* ×2 é o **padrão do OD2** (LB1 p. 92) — a habilidade entrega zero. Achado da auditoria do Veterano. |
| `classes.mjs:353` | *Marcar Alvo* `[3]` do Assassino custa 4 rodadas pelo "Muito Fácil" que o *Golpe Fatal* `[1]` já dá de graça pela furtividade. |
| `classes.mjs:378-380` | *Mestre da Sabotagem* `[10]` ("1-5 em 1d6") já é alcançável no 3º–4º nível via *Quebrar Máquinas* `[3]` + pontos de talento. |
| Sendas do Sensível | *Investida da Força* `[10]` do Guardião duplica o *Turbilhão* `[6]` de Ataru; o `[10]` do Sentinela não é poder; a Comunhão do Vidente é um poder só em três degraus. |

---

## 4. Limites estruturais — não são bugs, são o teto do sistema

Documentar, não tentar consertar:

- **`poderes.mjs:6`** — o tipo `spell` do OD2 só conhece **círculos 1 a 5**. Grandezas
  **6ª a 10ª não viram item**, ficam só no JournalEntry. Do 11º nível em diante o Sensível
  não é representável mecanicamente.
- **`poderes.mjs:17`** — `school` carrega o **Caminho**, não a trilha de conjuração:
  Universal → `arcane`, Luz → `divine`, Sombra → `necromancer`. **Isto é deliberado.** O
  efeito colateral é que a ficha do Foundry mostra duas listas com slots separados, e a
  regra de "reserva fechada por Grandeza" não tem como ser exibida corretamente. Vale um
  aviso no JournalEntry.

---

## Ordem sugerida

1. README (item 0) — um minuto, e evita erro na próxima transcrição.
2. Itens **2.1 → 2.4** (Sensível). São só texto e uma função; nenhum schema novo.
3. Itens **1.1 → 1.4** (Técnico). O 1.1 mexe na estrutura de dados, então vem depois.
4. Rodar `node tools/build.mjs`, conferir em `_verify/`, e só então `python tools/make-zip.py`.
5. A dívida do item 3 é decisão de design do autor — não mexer sem passar por ele.

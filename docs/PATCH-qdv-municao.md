# Patch sugerido ao *Old Dragon 2: Qualidade de Vida*

**Arquivo:** `scripts/features/combat/index.js` · `ammunitionFilterForWeapon()`

## O problema

A automação exige munição de **toda** arma `ranged` e aborta o ataque sem ela:

```js
if (weapon.system?.type === 'ranged' || attackButton?.dataset?.ba === 'bad') return () => true;
```
```js
if (ammunition.required && !ammunition.item) return;   // linha 593
```

Isso está **certo para o Old Dragon**, e por um motivo elegante: no SRD o arco
não tem dano nenhum — quem tem é a flecha.

| Item | `type` | `damage` |
|---|---|---|
| Arco Longo | `ranged` | *(vazio)* |
| Besta | `ranged` | *(vazio)* |
| Flecha de Guerra | `ammunition` | **1d8** |
| Virote pequeno | `ammunition` | **1d4** |

Daí `const damageItem = ammunition.item ?? item;` — sem a flecha, não há dano
para rolar. A regra do módulo é a do sistema.

## Onde ele quebra

Em cenários de ficção científica a arma **tem dano próprio** e a célula de
energia é só consumo. Num blaster de `1d6`, a automação:

1. exige munição, porque o tipo é `ranged`;
2. não acha nenhuma, porque o cenário não define munição;
3. **aborta o ataque**, e o jogador não rola nada.

Não há como contornar de fora: `game.od2Qdv` não expõe o combate, não há
opção de configuração para munição, e os quatro tipos de arma do sistema
(`melee`, `ranged`, `throwing`, `ammunition`) não dão um quinto lugar onde pôr
uma arma de energia.

## O patch

Exigir munição de arma de disparo **que não tenha dano próprio** — que é
exatamente o que a regra do OD2 diz, escrita como condição:

```js
function ammunitionFilterForWeapon(weapon, attackButton) {
  if (weapon?.type !== 'weapon') return null;
  if (weapon.system?.type === 'throwing') return null;
  const name = normalizedItemName(weapon);
  if (/\bbesta\s+de\s+mao\b/.test(name)) return (ammo) => normalizedItemName(ammo).includes('virote pequeno');
  if (name.includes('besta')) return (ammo) => normalizedItemName(ammo).includes('virote') && !normalizedItemName(ammo).includes('pequeno');
  if (name.includes('arco')) return (ammo) => normalizedItemName(ammo).includes('flecha');

  // A arma que JÁ TEM dano próprio não depende da munição para tê-lo. No SRD,
  // arco e besta vêm com `damage` vazio e é a flecha que o fornece — esses
  // continuam exigindo munição, sem mudança. Armas de energia de cenários de
  // ficção científica (blaster, rifle de íon) trazem o próprio dano e passam a
  // atacar sem munição, em vez de terem o ataque abortado.
  const temDanoProprio = Boolean(String(weapon.system?.damage ?? '').trim());
  if (temDanoProprio) return null;

  if (weapon.system?.type === 'ranged' || attackButton?.dataset?.ba === 'bad') return () => true;
  return null;
}
```

## Por que é seguro

As **quatro** armas de disparo do SRD — Arco Curto, Arco Longo, Besta e Besta
de Mão — têm `damage` vazio, então nenhuma muda de comportamento. As de nome
conhecido (`arco`, `besta`) já são tratadas nas linhas acima e nem chegam à
condição nova.

O único caso que muda é o que hoje está quebrado: arma de disparo com dano
próprio, que nenhum conteúdo do SRD tem.

## O que ele não resolve

Arma de disparo **sem dano** e **sem munição** — por exemplo, um lançador de
rede, que prende em vez de ferir. Continua exigindo munição. É defensável: dar
uma "rede" como munição é a modelagem certa para ela.

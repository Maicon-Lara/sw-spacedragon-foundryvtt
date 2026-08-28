/**
 * Movimento da nave no mapa — Star Dragon
 *
 * Traduz a manobra do dial em deslocamento e giro do token.
 *
 * DUAS COISAS QUE EU SUPUS ERRADO E MEDI NA CENA DE VERDADE (guardadas aqui
 * para ninguém refazer o mesmo erro):
 *
 *   · `getTranslatedPoint` recebe a distância em UNIDADES DE CENA, não em
 *     pixels. Uma casa é `grid.distance`, não `grid.size`. Passando pixels, a
 *     nave anda uma fração do que devia.
 *
 *   · O ângulo dessa API tem 0 = LESTE e cresce no sentido HORÁRIO (porque o
 *     eixo Y da tela cresce para baixo). Não é o ângulo trigonométrico.
 *
 * A rotação do token, por sua vez, tem 0 = norte e cresce no horário. Daí a
 * conversão de uma para a outra ser −90°.
 */

import { MANOBRAS, METROS_POR_HEX } from "./nave-modelo.js";

/** Rotação do token (0 = norte, horário) → ângulo da grade (0 = leste, horário). */
const anguloDaGrade = (rotacao) => (rotacao + 270) % 360;

/** Normaliza para 0–359. */
const norm = (g) => ((g % 360) + 360) % 360;

/**
 * A cena está na escala do combate de naves?
 *
 * As cenas de aventura em terra costumam estar em 1,5 m por casa (a escala
 * pessoal do OD2). Mover uma nave lá jogaria a velocidade 5 a 66 casas de
 * distância, então é melhor recusar e dizer o porquê.
 */
export function conferirEscala(cena) {
  const d = cena?.grid?.distance;
  if (!d) return { ok: false, motivo: "A cena não tem grade." };
  if (Math.abs(d - METROS_POR_HEX) > 0.01)
    return {
      ok: false,
      motivo:
        `Esta cena tem <strong>${d} ${cena.grid.units || ""}</strong> por casa, e o combate de naves ` +
        `usa <strong>1 hex = ${METROS_POR_HEX} m</strong>. Numa cena de ${d} m, a velocidade 5 andaria ` +
        `${Math.round((5 * METROS_POR_HEX) / d)} casas.`,
    };
  return { ok: true };
}

/**
 * Calcula onde a nave para e para onde fica virada, sem aplicar nada.
 * Devolve também o caminho, que a regra de colisão usa para recuar.
 */
export function calcularManobra(token, { tipo, velocidade, lado }) {
  const m = MANOBRAS[tipo];
  if (!m) return null;
  const grid = token.parent?.grid ?? canvas.grid;
  const passo = grid.distance; // uma casa, em unidades de cena

  const sinal = lado === "esq" ? -1 : 1;
  const giro = m.giro * (m.lado ? sinal : 1);

  // A curva "vira cedo": gira primeiro e anda já na direção nova. A inclinada
  // "desvia": anda e só então assenta os 45°.
  const rotInicial = token.rotation ?? 0;
  const rotDeSaida = norm(rotInicial + giro);
  const rotDoPercurso = m.viraAntes ? rotDeSaida : norm(rotInicial + giro / 2);

  const centro = grid.getCenterPoint({ x: token.x, y: token.y });
  const casas = m.re ? 1 : velocidade;
  const direcao = m.re ? norm(rotDoPercurso + 180) : rotDoPercurso;

  // O caminho casa a casa: é dele que a colisão recua.
  const caminho = [];
  for (let i = 1; i <= casas; i++) {
    const p = grid.getTranslatedPoint(centro, anguloDaGrade(direcao), i * passo);
    caminho.push(grid.getTopLeftPoint(p));
  }

  return {
    caminho,
    destino: caminho.at(-1) ?? { x: token.x, y: token.y },
    rotacao: rotDeSaida,
    casas,
    giro,
  };
}

/** Alguma outra nave já ocupa esta casa? */
function ocupada(cena, ponto, meuId) {
  const grid = cena.grid;
  const meu = grid.getOffset(ponto);
  return cena.tokens.some((t) => {
    if (t.id === meuId) return false;
    const o = grid.getOffset({ x: t.x, y: t.y });
    return o.i === meu.i && o.j === meu.j;
  });
}

/**
 * Aplica a manobra ao token.
 *
 * Colisão, pela regra: se a manobra terminar sobre outra nave, a nave recua
 * PELO CAMINHO PERCORRIDO até a primeira casa livre, fica colada e perde a
 * ação da rodada.
 */
export async function moverNave(token, manobra) {
  const cena = token.parent;
  const escala = conferirEscala(cena);
  if (!escala.ok) return { erro: escala.motivo };

  const calc = calcularManobra(token, manobra);
  if (!calc) return { erro: "Manobra desconhecida." };

  let destino = calc.destino;
  let colidiu = false;
  if (ocupada(cena, destino, token.id)) {
    colidiu = true;
    // Recua pelo caminho, da penúltima casa para trás.
    destino = null;
    for (let i = calc.caminho.length - 2; i >= 0; i--) {
      if (!ocupada(cena, calc.caminho[i], token.id)) {
        destino = calc.caminho[i];
        break;
      }
    }
    // Todo o caminho ocupado: fica onde estava.
    if (!destino) destino = { x: token.x, y: token.y };
  }

  await token.update({ x: destino.x, y: destino.y, rotation: calc.rotacao });
  return { ...calc, destino, colidiu };
}

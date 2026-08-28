/**
 * Modelo de dados da Nave — Star Dragon
 *
 * Segue o "Combate Tático de Naves" do cenário, que é dogfight posicional no
 * espírito do X-Wing rodando sobre o motor do OD2. Duas consequências que
 * moldam este arquivo inteiro:
 *
 *   · A CA de Casco é 44 PARA TODA NAVE. A agilidade saiu da CA e virou dado
 *     de Esquiva — acertar a chapa de um caça e de um cruzador é igualmente
 *     difícil; o que muda é o quanto ele consegue não estar lá. Por isso CA é
 *     constante do módulo e não campo editável: um 43 numa ficha seria um bug
 *     silencioso, não uma variante.
 *
 *   · As FICHAS de rodada (Foco, Esquiva, Trava, Estresse) são estado de
 *     verdade, não anotação. No jogo de miniaturas são peças na mesa; num VTT
 *     são o que a mesa esquece. Ficam no modelo para o botão de fim de rodada
 *     poder limpá-las pela regra — Foco e Esquiva saem, Trava e Estresse
 *     permanecem.
 */

const { fields } = foundry.data;

/** A CA de Casco é a mesma para todo chassi. Ver o cabeçalho. */
export const CA_CASCO = 44;

/** Perfil tático por chassi, da tabela do capítulo. */
export const CHASSIS = {
  caca: { rotulo: "Caça", porte: "P", ba: 36, agilidade: 3, casco: "1d100", velocidade: 5 },
  escolta: { rotulo: "Cápsula / Escolta", porte: "P", ba: 30, agilidade: 3, casco: "1d100", velocidade: 4 },
  particular: { rotulo: "Espaçonave particular", porte: "M", ba: 36, agilidade: 2, casco: "3d100", velocidade: 3 },
  cargueiro: { rotulo: "Cargueiro / Corveta", porte: "G", ba: 34, agilidade: 1, casco: "1d1000", velocidade: 2 },
  cruzador: { rotulo: "Cruzador / Nave-mãe", porte: "C", ba: 32, agilidade: 0, casco: "1d1000+", velocidade: 1 },
};

/** Escudo por gerador e porte. */
export const GERADORES = {
  nenhum: { rotulo: "Sem gerador", P: 0, M: 0, G: 0, C: 0 },
  leve: { rotulo: "Leve", P: 4, M: 6, G: 8, C: 10 },
  medio: { rotulo: "Médio", P: 6, M: 10, G: 14, C: 20 },
  pesado: { rotulo: "Pesado", P: 8, M: 16, G: 24, C: 40 },
};

/** Modificador de ataque pelo porte do ALVO. */
export const PORTES = { P: { rotulo: "Pequeno", mod: 0 }, M: { rotulo: "Médio", mod: 2 }, G: { rotulo: "Grande", mod: 4 }, C: { rotulo: "Colossal", mod: 6 } };

/** Alcance em hexes (1 hex = 20 m). */
export const ALCANCES = {
  1: { rotulo: "Curto (1-3 hex)", mod: 2, dadoExtra: 0 },
  2: { rotulo: "Médio (4-6 hex)", mod: 0, dadoExtra: 0 },
  3: { rotulo: "Longo (7-9 hex)", mod: -2, dadoExtra: 1 },
};

export const POSTOS = ["leme", "artilharia", "engenharia", "sensores", "comando", "enfermaria"];

export class NaveDataModel extends foundry.abstract.TypeDataModel {
  static defineSchema() {
    const txt = (initial = "") => new fields.StringField({ required: true, blank: true, initial });
    const num = (initial = 0) => new fields.NumberField({ required: true, integer: true, initial, nullable: false });

    return {
      chassi: new fields.StringField({
        required: true,
        initial: "caca",
        choices: Object.keys(CHASSIS),
      }),
      porte: new fields.StringField({ required: true, initial: "P", choices: Object.keys(PORTES) }),

      ba: num(36),
      agilidade: num(3), // dados d6 de Esquiva
      velocidade: num(5), // Mov ÷ 20

      casco: new fields.SchemaField({
        value: num(0),
        max: num(0),
        formula: txt("1d100"), // fica registrado de onde saiu o máximo
      }),
      escudo: new fields.SchemaField({
        value: num(0),
        max: num(0),
        gerador: new fields.StringField({ required: true, initial: "nenhum", choices: Object.keys(GERADORES) }),
      }),

      // Perícia de Piloto: mod. de Destreza do piloto + bônus de pilotagem.
      // Substitui a iniciativa e NÃO se rola — é número fixo.
      pp: num(0),

      // As fichas da rodada.
      fichas: new fields.SchemaField({
        foco: new fields.BooleanField({ initial: false }),
        esquiva: new fields.BooleanField({ initial: false }),
        estresse: new fields.BooleanField({ initial: false }),
        trava: txt(""), // nome do alvo travado
        avariada: new fields.BooleanField({ initial: false }),
        // Marcado sozinho quando casco ou escudo caem (ver o hook em
        // stardragon.js). O escudo só regenera na rodada em que a nave NÃO
        // sofreu dano, e é isso que a mesa esquece de conferir.
        sofreuDano: new fields.BooleanField({ initial: false }),
      }),

      armas: new fields.ArrayField(
        new fields.SchemaField({
          nome: txt("Disparadores laser"),
          dano: txt("2d10"),
          arco: new fields.StringField({ required: true, initial: "frontal", choices: ["frontal", "torre"] }),
          alcanceMin: num(1),
          alcanceMax: num(3),
          nota: txt(""),
        }),
        { initial: [] }
      ),

      postos: new fields.SchemaField(
        Object.fromEntries(POSTOS.map((p) => [p, txt("")]))
      ),

      descricao: new fields.HTMLField({ initial: "" }),
    };
  }

  /** Valores que a ficha lê prontos. */
  prepareDerivedData() {
    this.caCasco = CA_CASCO;
    this.perfil = CHASSIS[this.chassi] ?? CHASSIS.caca;
    this.escudoMaxSugerido = (GERADORES[this.escudo.gerador] ?? GERADORES.nenhum)[this.porte] ?? 0;
    this.modPorte = (PORTES[this.porte] ?? PORTES.P).mod;
    // Agilidade 0 nunca esquiva por rolagem: o cruzador não se desvia, encaixa.
    this.esquivaPorRolagem = this.agilidade > 0;
  }
}

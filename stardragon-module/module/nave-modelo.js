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

/**
 * Armas do módulo tático (Tabela 12-7). Escolher pela lista preenche dano,
 * arco e alcance de uma vez — a mesma ideia do seletor de chassi.
 */
export const ARMAS = {
  laser: { rotulo: "Disparadores laser", dano: "2d10", arco: "frontal", min: 1, max: 3, nota: "Arma padrão." },
  canhao: { rotulo: "Canhões de energia", dano: "4d10", arco: "frontal", min: 1, max: 2, nota: "Não alcança longe." },
  metralhadora: { rotulo: "Metralhadora de energia", dano: "4 × 1d6", arco: "frontal", min: 1, max: 1,
    nota: "Cada êxito de Esquiva cancela um ATAQUE INTEIRO, não um dado." },
  misseis: { rotulo: "Mísseis teleguiados", dano: "4d10", arco: "frontal", min: 2, max: 3,
    nota: "Exige Travar Alvo gasta. O alvo faz JP para o míssil errar; se não errar, persegue por 1d4+1 rodadas." },
  torre: { rotulo: "Torre de laser", dano: "2d10 −1 dado", arco: "torre", min: 1, max: 2,
    nota: "Naves M+. Troca potência por cobertura." },
  bateria: { rotulo: "Bateria pesada", dano: "6d10", arco: "frontal", min: 1, max: 3,
    nota: "Só porte G/C. Sofre o −4 contra alvos P." },
  outra: { rotulo: "— outra —", dano: "", arco: "frontal", min: 1, max: 3, nota: "" },
};

/**
 * Dial de manobras por chassi (Tabela 12-2). `v` marca a velocidade verde,
 * `V` marca a manobra vermelha inteira; sem marca é branca.
 *
 * NÃO INVENTAR ESTA TABELA. Um rascunho meu, derivado só das duas frases do
 * capítulo de Star Wars ("caças manobram tudo, cruzadores quase só andam para
 * a frente"), errou em oito células contra a 12-2 real — o Caça não tem Ré, o
 * Koiogran dele vai até 5 e o Cargueiro tem Parar. A fonte é
 * `30 Sistemas/Star Dragon/ED-12-Combate-Tatico-de-Naves.md`, §12.5.
 */
export const MANOBRAS = {
  // `giro` em graus. `lado` marca as manobras que existem em esquerda e
  // direita — o dial gera um botão para cada.
  //
  // `viraAntes` é a diferença entre Inclinada e Curva, e sai do texto do
  // capítulo: a inclinada "desvia" (anda na diagonal e termina 45° virada), a
  // curva "vira cedo" (gira primeiro, depois anda) — e é justamente por virar
  // antes que ela "perde alcance".
  reta: { rotulo: "Reta", simbolo: "↑", giro: 0 },
  inclinada: { rotulo: "Inclinada", simbolo: "↗", giro: 45, lado: true, viraAntes: false },
  curva: { rotulo: "Curva", simbolo: "⟳", giro: 90, lado: true, viraAntes: true },
  koiogran: { rotulo: "Koiogran", simbolo: "↑180°", giro: 180 },
  parar: { rotulo: "Parar", simbolo: "⊘", giro: 0 },
  re: { rotulo: "Ré", simbolo: "↓", giro: 0, re: true },
};

/** 1 hex = 20 m. Uma cena de combate de naves precisa estar nessa escala. */
export const METROS_POR_HEX = 20;

export const DIAL = {
  caca: { reta: { de: 1, ate: 5, verde: 2 }, inclinada: { de: 1, ate: 4, verde: 1 }, curva: { de: 1, ate: 3 },
          koiogran: { de: 3, ate: 5, vermelha: true }, parar: { de: 0, ate: 0, vermelha: true } },
  escolta: { reta: { de: 1, ate: 4, verde: 2 }, inclinada: { de: 1, ate: 3 }, curva: { de: 1, ate: 2 },
             koiogran: { de: 3, ate: 4, vermelha: true }, parar: { de: 0, ate: 0, vermelha: true },
             re: { de: 1, ate: 1, vermelha: true } },
  particular: { reta: { de: 1, ate: 3, verde: 2 }, inclinada: { de: 1, ate: 3 }, curva: { de: 1, ate: 2 },
                koiogran: { de: 3, ate: 3, vermelha: true }, parar: { de: 0, ate: 0, vermelha: true },
                re: { de: 1, ate: 1, vermelha: true } },
  cargueiro: { reta: { de: 1, ate: 2 }, inclinada: { de: 1, ate: 2 }, curva: { de: 1, ate: 1, vermelha: true },
               parar: { de: 0, ate: 0, vermelha: true } },
  cruzador: { reta: { de: 1, ate: 1 }, inclinada: { de: 1, ate: 1, vermelha: true },
              parar: { de: 0, ate: 0, vermelha: true } },
};

/** Ações de posto (Tabela 12-9). Uma por personagem, na Ativação. */
export const ACOES_DE_POSTO = {
  leme: "Escolhe a manobra da nave e executa a ação de manobra. A PP da nave é a dele.",
  artilharia: "Um ataque com UMA bateria. Cada artilheiro opera uma — é assim que a nave dispara mais de uma vez.",
  engenharia: "Repara 1d6 de casco, recarrega 1d4 de escudo, ou religa um sistema avariado.",
  sensores: "Travar Alvo (a trava fica com a nave, qualquer artilheiro usa), revelar nave camuflada, ou +2 no ataque de um artilheiro.",
  comando: "Coordenar: uma ficha de Foco a um posto ou nave aliada a Alcance 1-2. Com teste de Carisma, a dois.",
  enfermaria: "Primeiros socorros, controle de incêndio, evacuação de setor.",
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
        // Naves coladas (por colisão ou acoplagem) não se atacam — mas podem
        // ser abordadas.
        colada: new fields.BooleanField({ initial: false }),
        // Marcado sozinho quando casco ou escudo caem (ver o hook em
        // stardragon.js). O escudo só regenera na rodada em que a nave NÃO
        // sofreu dano, e é isso que a mesa esquece de conferir.
        sofreuDano: new fields.BooleanField({ initial: false }),
      }),

      armas: new fields.ArrayField(
        new fields.SchemaField({
          catalogo: new fields.StringField({ required: true, blank: true, initial: "laser" }),
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

      // Planejamento: a manobra é escolhida EM SEGREDO e só sai na Ativação.
      // Fica no modelo (e não numa flag solta) para o botão de revelar poder
      // aplicar a cor — verde tira Estresse, vermelha põe e cancela a ação.
      manobra: new fields.SchemaField({
        tipo: txt(""),
        velocidade: num(0),
        lado: txt(""), // "esq" | "dir" | "" para as que não têm lado
        revelada: new fields.BooleanField({ initial: false }),
      }),

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

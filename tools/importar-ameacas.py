#!/usr/bin/env python3
"""Gera tools/data/ameacas.mjs a partir dos blocos de PNJ de "A Longa Sombra".

A FONTE DE VERDADE é o cofre Obsidian. Diferente do módulo de Ekhoria, aqui as
fichas não estão em YAML: são linhas em prosa, no formato

    **Nome — papel**
    *Flavor em itálico.*
    DV 6 · PV 34 · CA 17 · Desloc. 12 m · **Ataque** sabre +7 (1d10) ·
    JPD 11 JPC 12 JPS 10 · Moral 11 · XP 800.

Este script transcreve — não inventa. O que a linha não declara (o XP de
alguns, a Moral de outros) é calculado pela tabela 9.4 do OD2 ou omitido.

Mudou uma ficha na aventura? Rode este script e depois `npm run build`.
Não edite ameacas.mjs à mão: ele é gerado.

Uso: python tools/importar-ameacas.py
"""
import json
import os
import re
import subprocess
import unicodedata

COFRE = os.path.join(
    os.path.expanduser("~"), "Documents", "Ekhoria", "20 Star Wars",
    "Space Dragon", "A Longa Sombra",
)
RAIZ = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SAIDA = os.path.join(RAIZ, "tools", "data", "ameacas.mjs")

# Dedup contra a FONTE do bestiário, nunca contra packs-src: packs-src é saída
# do build e passaria a conter as próprias ameaças, tornando o dedup
# auto-referente e gerando um arquivo vazio na segunda execução.
BESTIARIO_FONTE = os.path.join(RAIZ, "tools", "data", "bestiario.mjs")

AVENTURA = {
    "SW-SD-Aventura-Ecos-do-Passado.md": "Ecos do Passado",
    "SW-SD-Aventura-O-Longo-Braco-do-Hutt.md": "O Longo Braço do Hutt",
    "SW-SD-Aventura-Sob-um-Sol-Negro.md": "Sob um Sol Negro",
    "SW-SD-Aventura-Sombra-em-Vandor.md": "Sombra em Vandor",
    "SW-SD-Mesa-A-Longa-Sombra.md": "Mesa",
    "SW-SD-Campanha-A-Longa-Sombra.md": "Campanha",
}

XP_BASE = {0: 5, 1: 15, 2: 35, 3: 75, 4: 125, 5: 175, 6: 270, 7: 420, 8: 650, 9: 925}
XP_ADD = {0: 5, 1: 10, 2: 15, 3: 20, 4: 25, 5: 30, 6: 35, 7: 40, 8: 45, 9: 50}

# `tipo` não existe nestes blocos: o conceito sai do nome e do flavor, e serve
# só para escolher a arte de conceito que o próprio OD2 empacota.
#
# Os limites de palavra são obrigatórios: sem eles "ferida" (em "foge se muito
# ferida") casa com "fera", e uma Inquisidora humana ganha arte de besta.
CONCEITO = [
    (r"\b(droides?|aut[oô]matos?|torretas?|armadilhas?|sonda)\b", "Constructo"),
    (r"\b(gato|manka|horranth|enguia|verme|nexu|besta|criatura|matriarca)\b", "Besta"),
]

# A ficha renderiza HTML: `**assim**` apareceria com os asteriscos na tela.
NEGRITO = re.compile(r"\*\*(.+?)\*\*")
ITALICO = re.compile(r"(?<!\*)\*([^*\n]+?)\*(?!\*)")


def md_html(t):
    if not t:
        return t
    t = NEGRITO.sub(lambda m: "<strong>" + m.group(1) + "</strong>", t)
    t = ITALICO.sub(lambda m: "<em>" + m.group(1) + "</em>", t)
    return t


def norm(s):
    s = unicodedata.normalize("NFD", str(s)).encode("ascii", "ignore").decode().lower()
    return re.sub(r"[^a-z0-9]", "", s)


def xp_od2(dv, n_hab):
    m = re.match(r"(\d+)", str(dv or ""))
    if not m:
        return None
    v = int(m.group(1))
    if v >= 10:
        return 1250 + 350 * (v - 10) + 75 * n_hab
    return XP_BASE[v] + XP_ADD[v] * n_hab


def conceito_de(texto):
    for padrao, nome in CONCEITO:
        if re.search(padrao, texto, re.I):
            return nome
    return "Humanoide"


def parse_ataques(trecho):
    """ "pistola blaster +3 (1d6) ou sabre +6 (1d10, ignora armadura)" -> lista."""
    if not trecho or trecho.strip().startswith("—"):
        return []
    saida = []
    for m in re.finditer(r"([^,;·]+?)\s*\+(\d+)\s*\(([^)]*)\)", trecho):
        nome = re.sub(r"^\s*(ou|e)\s+", "", m.group(1)).replace("*", "").strip(" .,;")
        dano = m.group(3).split(",")[0].strip()
        qtd = 2 if re.search(r"2\s*(ataques|×)", trecho) else 1
        if nome:
            saida.append({"nome": nome[:60], "qtd": qtd, "bonus": int(m.group(2)), "dano": dano})
    return saida


def parse_bloco(linha):
    d = {}
    m = re.search(r"DV\s*([\d+]+)", linha)
    d["dv"] = m.group(1) if m else None
    m = re.search(r"PV\s*(\d+)", linha)
    d["pv"] = int(m.group(1)) if m else None
    m = re.search(r"CA\s*(\d+)\s*(?:\(([^)]*)\))?", linha)
    d["ca"] = int(m.group(1)) if m else None
    d["ca_nota"] = m.group(2) if m and m.group(2) else None
    m = re.search(r"Desloc\.\s*([^·]+)", linha)
    d["mov"] = m.group(1).strip(" .") if m else None
    m = re.search(r"Moral\s*(\d+)", linha)
    d["moral"] = int(m.group(1)) if m else None
    m = re.search(r"XP\s*([\d.]+)", linha)
    d["xp"] = int(m.group(1).replace(".", "")) if m else None
    d["jps"] = {k: int(v) for k, v in re.findall(r"\b(JPD|JPC|JPS)\s*(\d+)", linha)}
    m = re.search(r"\*\*Ataques?\*\*\s*(.+?)(?=\s*·\s*\*\*|\s*·\s*JP|\s*·\s*Moral|$)", linha)
    d["ataque"] = m.group(1).strip() if m else None
    resto = re.sub(
        r"DV\s*[\d+]+|PV\s*\d+|CA\s*\d+(\s*\([^)]*\))?|Desloc\.[^·]+|Moral\s*\d+"
        r"|XP\s*[\d.]+|\b(JPD|JPC|JPS)\s*\d+|\*\*Ataques?\*\*.+?(?=·\s*\*\*|·\s*JP|$)",
        "", linha)
    d["resto"] = re.sub(r"^[\s·.]+|[\s·.]+$", "", re.sub(r"\s*·\s*", " · ", resto)).strip(" ·")
    return d


def ja_no_bestiario():
    script = (
        "import('./tools/data/bestiario.mjs').then(({grupos}) => "
        "console.log(JSON.stringify(grupos.flatMap(g => (g.monstros||[]).map(m => m.nome)))))"
    )
    r = subprocess.run(["node", "-e", script], cwd=RAIZ, capture_output=True,
                       text=True, encoding="utf-8")
    if r.returncode != 0:
        raise SystemExit("falha ao ler bestiario.mjs:" + chr(10) + r.stderr)
    return {norm(n) for n in json.loads(r.stdout.strip())}


def coletar():
    existentes = ja_no_bestiario()
    achados, vistos = [], set()
    for arq in sorted(os.listdir(COFRE)):
        if not arq.endswith(".md"):
            continue
        linhas = open(os.path.join(COFRE, arq), encoding="utf-8").read().splitlines()
        for i, l in enumerate(linhas):
            if not re.match(r"^\s*DV\s*[\d+]+\s*[·,]", l):
                continue
            nome, flavor = None, None
            for j in range(i - 1, max(-1, i - 5), -1):
                s = linhas[j].strip()
                if not s:
                    continue
                if s.startswith("*") and s.endswith("*") and not s.startswith("**"):
                    flavor = s.strip("*")
                    continue
                m = re.match(r"^\*\*(.+?)\*\*\s*(.*)$", s)
                if m:
                    nome = m.group(1).strip()
                    flavor = flavor or (m.group(2).strip(" *()") or None)
                    break
                if s.startswith("#"):
                    nome = s.lstrip("#").strip()
                    break
            if not nome:
                continue
            chave = norm(nome)
            if chave in existentes or chave in vistos:
                continue
            vistos.add(chave)
            d = parse_bloco(l)
            d["nome"] = re.sub(r"\s*\*+\(.*?\)\*+\s*$", "", nome).strip()
            d["flavor"] = flavor
            d["aventura"] = AVENTURA.get(arq, os.path.splitext(arq)[0])
            achados.append(d)
    return achados


def js(v):
    return json.dumps(v, ensure_ascii=False)


def monstro_js(d):
    p = "        "
    habilidades = []
    # As três JPs não cabem no campo único que a ficha de monstro do OD2 tem:
    # viram habilidade, para o valor exato de cada uma continuar visível.
    if len(d["jps"]) > 1:
        txt = " · ".join(f"<strong>{k}</strong> {v}" for k, v in d["jps"].items())
        habilidades.append(("Jogadas de Proteção",
                            f"{txt}. O campo JP da ficha usa a mediana."))
    if d.get("ca_nota"):
        habilidades.append(("Armadura", md_html(d["ca_nota"])))
    if d.get("resto"):
        habilidades.append(("Notas da aventura", md_html(d["resto"])))

    linhas = ["      {"]
    linhas.append(f"{p}nome: {js(d['nome'])},")
    linhas.append(f"{p}tipo: {js('PNJ da campanha')},")
    linhas.append(f"{p}conceito: {js(conceito_de(d['nome'] + ' ' + (d.get('flavor') or '')))},")
    linhas.append(f'{p}tamanho: "medio",')
    if d.get("mov"):
        linhas.append(f"{p}movimento: {js(d['mov'])},")
    linhas.append(f"{p}dv: {js(str(d['dv']))},")
    if d.get("pv"):
        linhas.append(f"{p}pv: {d['pv']},")
    linhas.append(f"{p}ca: {js(str(d['ca']))},")
    if d["jps"]:
        mediana = sorted(d["jps"].values())[len(d["jps"]) // 2]
        linhas.append(f"{p}jp: {js(str(mediana))},")
    if d.get("moral"):
        linhas.append(f"{p}moral: {d['moral']},")
    xp = d.get("xp") or xp_od2(d["dv"], len(habilidades))
    if xp:
        linhas.append(f"{p}xp: {xp},")
    if d.get("flavor"):
        linhas.append(f"{p}descricao: {js('<p>' + md_html(d['flavor']) + '</p>')},")
    ataques = parse_ataques(d.get("ataque"))
    if ataques:
        linhas.append(f"{p}ataques: [")
        for a in ataques:
            linhas.append(f"{p}  {{ nome: {js(a['nome'])}, qtd: {a['qtd']}, "
                          f"bonus: {a['bonus']}, dano: {js(a['dano'])} }},")
        linhas.append(f"{p}],")
    if habilidades:
        linhas.append(f"{p}habilidades: [")
        for nome, desc in habilidades:
            linhas.append(f"{p}  {{ nome: {js(nome)}, desc: {js(desc)} }},")
        linhas.append(f"{p}],")
    linhas.append("      },")
    return "\n".join(linhas)


CABECALHO = '''// Ameaças de "A Longa Sombra" — GERADO, não editar à mão.
//
// Transcrito dos blocos de PNJ das quatro aventuras no cofre Obsidian. Lá as
// fichas são linhas em prosa (`DV 6 · PV 34 · CA 17 · …`), não YAML como no
// módulo de Ekhoria — por isso existe um parser, e não um yaml.safe_load.
//
// Mudou uma ficha na aventura? Rode `python tools/importar-ameacas.py` e
// depois `npm run build`.
//
// As três Jogadas de Proteção (JPD/JPC/JPS) não cabem no campo único que a
// ficha de monstro do OD2 tem: o campo recebe a MEDIANA e os três valores
// exatos ficam registrados como habilidade, para nada se perder.
//
// Encontro e tesouro ficam vazios de propósito: quantos aparecem e o que
// carregam é a cena que decide.

export const ameacas = [
'''


def main():
    monstros = coletar()
    por_aventura = {}
    for d in monstros:
        por_aventura.setdefault(d["aventura"], []).append(d)

    corpo = []
    for aventura in sorted(por_aventura):
        corpo.append("  {" + chr(10) + f'    folder: {js("Ameaças — " + aventura)},')
        corpo.append("    monstros: [")
        for d in sorted(por_aventura[aventura], key=lambda x: x["nome"]):
            corpo.append(monstro_js(d))
        corpo.append("    ],")
        corpo.append("  },")

    with open(SAIDA, "w", encoding="utf-8", newline="\n") as f:
        f.write(CABECALHO + "\n".join(corpo) + "\n];\n")

    print(f"  {len(monstros)} ameaças em {len(por_aventura)} grupos -> tools/data/ameacas.mjs")
    for a in sorted(por_aventura):
        print(f"     {a:26} {len(por_aventura[a])}")


if __name__ == "__main__":
    main()

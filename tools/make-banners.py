#!/usr/bin/env python3
"""Gera as capas dos compêndios em PNG.

Substitui o gerador SVG anterior: o navegador de compêndios do Foundry não
exibiu as capas em SVG (o próprio OD2 usa .webp nas dele). O desenho é o
mesmo — gradiente, campo de estrelas e um emblema geométrico por pack —, tudo
autoral e abstrato, sem arte licenciada nem silhueta reconhecível.

Duas escolhas que importam:
  * campo de estrelas com semente fixa: `random` sem semente geraria um
    arquivo diferente a cada execução e sujaria o diff sem motivo;
  * desenho em 4x e redução com LANCZOS: o PIL não tem antialias no traço, e
    sem isso as bordas ficam serrilhadas.

Uso: python tools/make-banners.py
"""
import math
import os
import random

from PIL import Image, ImageDraw

RAIZ = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SAIDA = os.path.join(RAIZ, "sw-spacedragon-module", "assets", "banners")

L, A = 600, 200
ESCALA = 4  # supersampling

FUNDO_A = (11, 22, 38)
FUNDO_B = (27, 58, 92)
FUNDO_C = (13, 33, 54)
TRACO = (207, 226, 245)
OURO = (184, 134, 43)
BRILHO = (77, 143, 208)


def mistura(c1, c2, t):
    return tuple(round(a + (b - a) * t) for a, b in zip(c1, c2))


def fundo(d, l, a):
    """Gradiente diagonal em duas etapas, linha a linha."""
    for y in range(a):
        for faixa in range(2):
            pass
        t = y / max(a - 1, 1)
        cor = mistura(FUNDO_A, FUNDO_B, t / 0.55) if t < 0.55 else mistura(FUNDO_B, FUNDO_C, (t - 0.55) / 0.45)
        d.line([(0, y), (l, y)], fill=cor)


def estrelas(d, l, a, semente):
    r = random.Random(semente)
    for _ in range(70):
        x, y = r.uniform(0, l), r.uniform(0, a)
        raio = r.uniform(0.4, 1.5) * ESCALA
        brilho = r.uniform(0.35, 0.75)
        cor = mistura(FUNDO_B, TRACO, brilho)
        d.ellipse([x - raio, y - raio, x + raio, y + raio], fill=cor)


def brilho_lateral(img):
    """Halo suave à direita, onde fica o emblema."""
    l, a = img.size
    camada = Image.new("RGB", (l, a), FUNDO_A)
    d = ImageDraw.Draw(camada)
    cx, cy = l * 0.78, a * 0.5
    raio = a * 1.2
    passos = 40
    for i in range(passos, 0, -1):
        t = i / passos
        rr = raio * t
        d.ellipse([cx - rr, cy - rr, cx + rr, cy + rr], fill=mistura(FUNDO_A, BRILHO, (1 - t) * 0.35))
    return Image.blend(img, Image.blend(img, camada, 0.5), 0.55)


def bezier(p0, p1, p2, n=40):
    pts = []
    for i in range(n + 1):
        t = i / n
        x = (1 - t) ** 2 * p0[0] + 2 * (1 - t) * t * p1[0] + t**2 * p2[0]
        y = (1 - t) ** 2 * p0[1] + 2 * (1 - t) * t * p1[1] + t**2 * p2[1]
        pts.append((x, y))
    return pts


def emblema(d, nome, e):
    """Traços do emblema, nas mesmas posições do gerador SVG anterior."""
    w = 3 * e
    def circ(cx, cy, r, largura=None):
        d.ellipse([(cx - r) * e, (cy - r) * e, (cx + r) * e, (cy + r) * e], outline=TRACO, width=largura or w)
    def linha(pts, largura=None):
        d.line([(x * e, y * e) for x, y in pts], fill=TRACO, width=largura or w, joint="curve")
    def arco(cx, cy, r, ini, fim):
        d.arc([(cx - r) * e, (cy - r) * e, (cx + r) * e, (cy + r) * e], ini, fim, fill=TRACO, width=w)

    if nome == "especies":
        circ(470, 86, 30); circ(500, 112, 30); circ(440, 112, 30)
    elif nome == "classes":
        for dy in (0, 22, 44):
            linha([(420, 106 + dy), (470, 70 + dy), (520, 106 + dy)])
    elif nome == "equipamentos":
        circ(470, 100, 34)
        linha([(470, 52), (470, 78)]); linha([(470, 122), (470, 148)])
        linha([(422, 100), (448, 100)]); linha([(492, 100), (518, 100)])
        d.ellipse([(470 - 6) * e, (100 - 6) * e, (470 + 6) * e, (100 + 6) * e], fill=TRACO)
    elif nome == "poderes":
        circ(470, 100, 16)
        arco(470, 100, 34, 270, 360); arco(470, 100, 34, 90, 180)
        arco(470, 100, 48, 270, 360); arco(470, 100, 48, 90, 180)
    elif nome == "bestiario":
        for x0, x1 in ((430, 442), (462, 474), (494, 506)):
            linha(bezier((x0, 62), (x0 + 22, 100), (x1, 140)))
    elif nome == "journal":
        d.rounded_rectangle([428 * e, 60 * e, 512 * e, 140 * e], radius=4 * e, outline=TRACO, width=w)
        for y in (84, 100):
            linha([(444, y), (496, y)])
        linha([(444, 116), (478, 116)])


def banner(nome, semente):
    l, a = L * ESCALA, A * ESCALA
    img = Image.new("RGB", (l, a), FUNDO_A)
    d = ImageDraw.Draw(img)
    fundo(d, l, a)
    estrelas(d, l, a, semente)
    img = brilho_lateral(img)
    d = ImageDraw.Draw(img)
    emblema(d, nome, ESCALA)
    d.rectangle([0, (A - 4) * ESCALA, l, a], fill=OURO)
    return img.resize((L, A), Image.LANCZOS)


def main():
    os.makedirs(SAIDA, exist_ok=True)
    nomes = ["especies", "classes", "equipamentos", "poderes", "bestiario", "journal"]
    for i, nome in enumerate(nomes):
        img = banner(nome, 7919 + i * 104729)
        destino = os.path.join(SAIDA, f"{nome}.png")
        img.save(destino, "PNG", optimize=True)
        print(f"  OK {nome}.png  ({os.path.getsize(destino) // 1024} KB)")
    print(f"  {len(nomes)} banners em assets/banners/")


if __name__ == "__main__":
    main()

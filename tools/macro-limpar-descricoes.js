/**
 * Limpa HTML das descrições de itens JÁ IMPORTADOS para dentro do mundo.
 *
 * O módulo publica o conteúdo correto, mas cópias arrastadas para fichas são
 * snapshots independentes e não acompanham a atualização do compêndio.
 *
 * Só toca nos tipos cuja ficha do OD2 exibe a descrição num <textarea>:
 * nesses, tag aparece como texto e o {{truncate}} da lista de equipamento
 * desmonta a tabela ao cortar no meio de um elemento.
 *
 * Uso: Macro nova -> tipo Script -> colar -> executar. Rode com SIMULAR = true
 * primeiro; ele só relata, não grava.
 */

const SIMULAR = true; // <- troque para false depois de conferir o relatório

const TIPOS = ['weapon', 'armor', 'shield', 'misc', 'container', 'vehicle'];

function htmlParaTexto(html) {
  if (!html) return '';
  return String(html)
    .replace(/<\s*br\s*\/?>/gi, '\n')
    .replace(/<\s*li[^>]*>/gi, '• ')
    .replace(/<\s*\/\s*(p|div|li|tr|h[1-6]|ul|ol)\s*>/gi, '\n')
    .replace(/<[^>]+>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&mdash;/g, '—')
    .replace(/&ndash;/g, '–')
    .replace(/&hellip;/g, '…')
    .replace(/&times;/g, '×')
    .replace(/&quot;/g, '"')
    .replace(/&(?:#0?39|apos);/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&')
    .replace(/[ \t]+/g, ' ')
    .replace(/[ \t]*\n[ \t]*/g, '\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

const temHtml = (s) => /<[a-z/][^>]*>/i.test(s ?? '');

let itensMundo = 0;
let itensAtores = 0;
const atoresTocados = new Set();

// Itens soltos no diretório do mundo
const alvosMundo = game.items.filter((i) => TIPOS.includes(i.type) && temHtml(i.system?.description));
if (alvosMundo.length && !SIMULAR) {
  await Item.updateDocuments(
    alvosMundo.map((i) => ({ _id: i.id, 'system.description': htmlParaTexto(i.system.description) })),
  );
}
itensMundo = alvosMundo.length;

// Itens dentro de cada ficha
for (const ator of game.actors) {
  const alvos = ator.items.filter((i) => TIPOS.includes(i.type) && temHtml(i.system?.description));
  if (!alvos.length) continue;
  atoresTocados.add(ator.name);
  itensAtores += alvos.length;
  if (!SIMULAR) {
    await ator.updateEmbeddedDocuments(
      'Item',
      alvos.map((i) => ({ _id: i.id, 'system.description': htmlParaTexto(i.system.description) })),
    );
  }
}

const msg = `
<h3>${SIMULAR ? 'Simulação' : 'Limpeza concluída'}</h3>
<p><strong>${itensMundo}</strong> itens no diretório do mundo</p>
<p><strong>${itensAtores}</strong> itens em <strong>${atoresTocados.size}</strong> fichas:
${[...atoresTocados].join(', ') || '—'}</p>
${SIMULAR ? '<p><em>Nada foi gravado. Troque SIMULAR para false para aplicar.</em></p>' : ''}`;

ChatMessage.create({ content: msg, whisper: [game.user.id] });
console.log('limpeza de descrições |', { itensMundo, itensAtores, atores: [...atoresTocados] });

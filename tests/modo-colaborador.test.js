const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');

const RUTA = path.join(__dirname, '..', 'public', 'index.html');
const K = 'sycchile_vol_v1', KM = 'sycchile_vol_metricas_v1';

async function abrir(guardado) {
  const emergentes = [];
  const dom = await JSDOM.fromFile(RUTA, {
    runScripts: 'dangerously', url: 'http://localhost/', pretendToBeVisual: true,
    beforeParse(w) {
      ['alert', 'confirm', 'prompt'].forEach((f) => { w[f] = () => { emergentes.push(f); return null; }; });
      if (guardado) Object.entries(guardado).forEach(([k, v]) => w.localStorage.setItem(k, v));
    },
  });
  if (dom.window.document.readyState !== 'complete') await new Promise((r) => dom.window.addEventListener('load', r));
  return { w: dom.window, emergentes };
}
const $ = (w, id) => w.document.getElementById(id);
const click = (w, id) => $(w, id).click();
function escribir(w, texto) { $(w, 'identidad').value = texto; click(w, 'btnSiguiente'); }
function registrar(w, texto) { escribir(w, texto); click(w, 'btnConfirmar'); click(w, 'btnOtra'); }
const visibles = (w) => ['paso1', 'paso2', 'paso3'].filter((p) => !$(w, p).hidden);

test('CA1: la pantalla inicial muestra una sola acción principal y sin paneles técnicos', async () => {
  const { w } = await abrir();
  assert.deepEqual(visibles(w), ['paso1']);
  const botones = Array.from($(w, 'paso1').querySelectorAll('button')).map((b) => b.textContent);
  assert.deepEqual(botones, ['Continuar']);
  assert.ok($(w, 'calma').textContent.includes('no pasa nada'));
  ['tablaInventario', 'mesaAgentes', 'sddDetalle'].forEach((id) => assert.equal($(w, id), null));
});

test('CA2: registrar toma 3 pasos y no usa ventanas emergentes', async () => {
  const { w, emergentes } = await abrir();
  escribir(w, 'María González');
  assert.deepEqual(visibles(w), ['paso2']);
  assert.equal($(w, 'confirmaNombre').textContent, 'María González');
  click(w, 'btnConfirmar');
  assert.deepEqual(visibles(w), ['paso3']);
  assert.ok($(w, 'resultado').textContent.includes('Muy bien'));
  assert.equal($(w, 'lista').children.length, 1);
  assert.equal($(w, 'contador').textContent, '1');
  assert.equal(emergentes.length, 0);
});

test('CA3: bloquea duplicados y rechaza RUT con dígito verificador incorrecto', async () => {
  const { w } = await abrir();
  registrar(w, 'María González');
  escribir(w, '  maria   GONZALEZ ');
  assert.ok($(w, 'resultado').textContent.includes('ya recibió'));
  assert.ok($(w, 'resultado').classList.contains('warn'));
  assert.equal($(w, 'lista').children.length, 1);
  click(w, 'btnOtra');
  registrar(w, '12.345.678-5');
  escribir(w, '123456785');
  assert.ok($(w, 'resultado').textContent.includes('ya recibió'));
  assert.equal($(w, 'lista').children.length, 2);
  click(w, 'btnOtra');
  escribir(w, '12.345.678-9');
  assert.ok($(w, 'error').textContent.includes('RUT inválido'));
  assert.deepEqual(visibles(w), ['paso1']);
  assert.equal($(w, 'lista').children.length, 2);
});

test('CA4: texto base de 20 px o más y controles de 56 px o más', () => {
  const html = fs.readFileSync(RUTA, 'utf8');
  const fs_ = html.match(/--fs-base:\s*([\d.]+)rem/);
  const btn = html.match(/--btn-h:\s*([\d.]+)rem/);
  assert.ok(parseFloat(fs_[1]) * 16 >= 20);
  assert.ok(parseFloat(btn[1]) * 16 >= 56);
  assert.match(html, /button\{min-height:var\(--btn-h\)/);
  assert.match(html, /input\{[^}]*min-height:var\(--btn-h\)/);
});

test('CA5: los contadores se guardan solo en el navegador, sin nombres ni RUT', async () => {
  const { w } = await abrir();
  click(w, 'btnAyuda');
  registrar(w, 'María González');
  escribir(w, '12.345.678-9');
  escribir(w, '12.345.678-5');
  click(w, 'btnConfirmar');
  const m = JSON.parse(w.localStorage.getItem(KM));
  assert.equal(m.registros, 2);
  assert.equal(m.primerIntento, 1);
  assert.equal(m.ayudas, 1);
  assert.equal(m.ttfv.length, 1);
  assert.deepEqual(m.usoAyuda, [1, 0]);
  assert.equal($(w, 'mAyuda').textContent, '1 de 2');
  assert.ok(!/Mar[ií]a|12\.345|123456|rut|nom:/i.test(JSON.stringify(m)));
  assert.equal($(w, 'mPrimero').textContent, '50%');
});

test('al recargar, las entregas del ciclo siguen en la lista', async () => {
  const a = await abrir();
  registrar(a.w, 'Ana Soto');
  const b = await abrir({ [K]: a.w.localStorage.getItem(K), [KM]: a.w.localStorage.getItem(KM) });
  assert.ok($(b.w, 'lista').textContent.includes('Ana Soto'));
  assert.equal($(b.w, 'contador').textContent, '1');
});

test('el texto escrito nunca se interpreta como HTML', async () => {
  const { w } = await abrir();
  registrar(w, '<img src=x onerror="window.__pwn=1">');
  assert.equal($(w, 'lista').querySelector('img'), null);
  assert.equal(w.__pwn, undefined);
});

test('CA3: la puntuación y las comas no distinguen a una familia de otra', async () => {
  const { w } = await abrir();
  registrar(w, 'María González');
  for (const variante of ['maria gonzalez.', 'María, González', 'maria-gonzalez', ' MARIA  GONZALEZ ... ']) {
    escribir(w, variante);
    assert.deepEqual(visibles(w), ['paso3'], variante);
    assert.ok($(w, 'resultado').classList.contains('warn'), variante);
    click(w, 'btnOtra');
  }
  assert.equal($(w, 'lista').children.length, 1);
});

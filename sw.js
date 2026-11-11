/*
 * Service worker do Gerador de Balaústres.
 *
 * Guarda no aparelho uma cópia do formulário (o app em branco) para que ele
 * abra sem internet. NÃO guarda nem envia atas: o que é preenchido fica no
 * armazenamento local do navegador, como na versão em arquivo.
 *
 * Atualização: a cada abertura com internet, o app é usado do cache e uma
 * cópia nova é baixada em segundo plano; a nova versão vale na abertura
 * seguinte. Ao publicar mudanças grandes, troque VERSAO para forçar a
 * limpeza do cache antigo.
 */
const VERSAO = '2026-11-11';
const CACHE = 'balaustres-' + VERSAO;
const ARQUIVOS = [
  './',
  './index.html',
  './manifest.webmanifest',
  './icon-192.png',
  './icon-512.png',
  './icon-maskable-512.png',
  './apple-touch-icon.png',
];

self.addEventListener('install', (evento) => {
  evento.waitUntil(
    caches.open(CACHE)
      .then((cache) => cache.addAll(ARQUIVOS.map((u) => new Request(u, { cache: 'reload' }))))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (evento) => {
  evento.waitUntil(
    caches.keys()
      .then((nomes) => Promise.all(
        nomes.filter((n) => n.startsWith('balaustres-') && n !== CACHE).map((n) => caches.delete(n))
      ))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (evento) => {
  const req = evento.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;

  // Qualquer abertura de página cai no index.html guardado.
  const chave = req.mode === 'navigate' ? './index.html' : req;

  evento.respondWith((async () => {
    const cache = await caches.open(CACHE);
    const guardado = await cache.match(chave, { ignoreSearch: true });

    const daRede = fetch(req, { cache: 'no-cache' })
      .then((resp) => {
        if (resp && resp.ok && resp.type === 'basic') cache.put(chave, resp.clone());
        return resp;
      })
      .catch(() => null);

    if (guardado) {
      evento.waitUntil(daRede);
      return guardado;
    }
    const resp = await daRede;
    return resp || new Response('Sem conexão e sem cópia guardada deste arquivo.', {
      status: 503, headers: { 'Content-Type': 'text/plain; charset=utf-8' },
    });
  })());
});

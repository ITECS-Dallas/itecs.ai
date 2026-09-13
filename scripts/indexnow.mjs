import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { constants, openSync, closeSync, fstatSync, readFileSync, writeFileSync, lstatSync, existsSync, renameSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

export const ORIGIN = 'https://itecs.ai';
export const KEY_URL = ORIGIN + '/indexnow-key.txt';
export const KEY_FILE = '/home/itecs/.config/itecs-indexnow/ownership-key';
export const STATE_FILE = '/home/itecs/.config/itecs-indexnow/state.json';
export const ENDPOINT = 'https://api.indexnow.org/indexnow';
export const digest = value => createHash('sha256').update(JSON.stringify(value)).digest('hex');
export const profile = { viewport: { width: 412, height: 915 }, deviceScaleFactor: 2.625, isMobile: true, hasTouch: true,
  userAgent: 'Mozilla/5.0 (Linux; Android 6.0.1; Nexus 5X Build/MMB29P) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.6723.69 Mobile Safari/537.36 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)' };

export function canonical(value) {
  const url = new URL(value);
  assert.equal(url.origin, ORIGIN, 'Foreign public URL');
  assert.ok(!url.username && !url.password && !url.search && !url.hash, 'Noncanonical URL');
  assert.ok(!/%|\\|\/\//.test(url.pathname) && !/^\/(p|api|_next)(\/|$)/.test(url.pathname), 'Excluded URL');
  assert.equal(value.replace(/\/$/, ''), (ORIGIN + url.pathname).replace(/\/$/, ''), 'URL normalization mismatch');
  return ORIGIN + (url.pathname === '/' ? '/' : url.pathname.replace(/\/$/, ''));
}

export function readKey(file = KEY_FILE) {
  const parent = lstatSync(dirname(file));
  assert.ok(parent.isDirectory() && !parent.isSymbolicLink() && parent.uid === process.getuid() && (parent.mode & 0o777) === 0o700, 'Unsafe key directory');
  const fd = openSync(file, constants.O_RDONLY | constants.O_NOFOLLOW);
  try {
    const stat = fstatSync(fd);
    assert.ok(stat.isFile() && stat.uid === process.getuid() && (stat.mode & 0o777) === 0o600, 'Unsafe key permissions');
    const key = readFileSync(fd, 'utf8');
    assert.ok(/^[a-zA-Z0-9-]{8,128}$/.test(key), 'Invalid key format');
    return key;
  } finally { closeSync(fd); }
}

export function provisionKey(candidate, key = readKey()) {
  const publicDir = resolve(candidate, 'public');
  assert.ok(lstatSync(publicDir).isDirectory() && !lstatSync(publicDir).isSymbolicLink(), 'Unsafe public directory');
  const file = publicDir + '/indexnow-key.txt';
  if (existsSync(file)) {
    assert.ok(lstatSync(file).isFile() && !lstatSync(file).isSymbolicLink(), 'Unsafe public key artifact');
    assert.ok(readFileSync(file, 'utf8') === key, 'Public key artifact mismatch');
  } else writeFileSync(file, key, { flag: 'wx', mode: 0o644 });
}

export function validateSnapshot(snapshot) {
  assert.equal(snapshot.version, 1, 'Unsupported snapshot');
  assert.ok(snapshot.pages && Object.keys(snapshot.pages).length > 0 && Object.keys(snapshot.pages).length <= 10000, 'Invalid page inventory');
  for (const [url, hash] of Object.entries(snapshot.pages)) {
    assert.equal(canonical(url), url);
    assert.match(hash, /^[a-f0-9]{64}$/);
  }
  return snapshot;
}

export function changes(before, after) {
  validateSnapshot(after); if (before) validateSnapshot(before);
  const previous = before?.pages ?? {};
  return {
    added: Object.keys(after.pages).filter(url => !(url in previous)).sort(),
    updated: Object.keys(after.pages).filter(url => url in previous && previous[url] !== after.pages[url]).sort(),
    deleted: Object.keys(previous).filter(url => !(url in after.pages)).sort(),
  };
}

// Reuse the site's existing Playwright dependency to parse public HTML.
// Hash semantic public content, not build IDs, script chunks, or verification tokens.
export async function captureSite(base = ORIGIN) {
  const origin = new URL(base);
  assert.ok(origin.origin === ORIGIN || (origin.protocol === 'http:' && origin.hostname === '127.0.0.1'), 'Invalid capture origin');
  const { chromium } = await import('playwright');
  const browser = await chromium.launch({ executablePath: '/usr/bin/google-chrome', args: ['--no-sandbox'] });
  try {
    const context = await browser.newContext(profile), parser = await context.newPage();
    const sitemap = await context.request.get(base + '/sitemap.xml', { timeout: 15000, maxRedirects: 0 });
    assert.equal(sitemap.status(), 200, 'Sitemap unavailable');
    const urls = await parser.evaluate(xml => {
      const doc = new DOMParser().parseFromString(xml, 'text/xml');
      if (doc.querySelector('parsererror') || !doc.querySelector('urlset')) throw Error('Invalid sitemap XML');
      return [...doc.querySelectorAll('url > loc')].map(n => n.textContent);
    }, await sitemap.text());
    const normalized = urls.map(canonical);
    assert.ok(normalized.length > 0 && normalized.length <= 10000 && new Set(normalized).size === normalized.length, 'Invalid sitemap inventory');
    const pages = {};
    for (const url of normalized.sort()) {
      const response = await context.request.get(base + new URL(url).pathname, { timeout: 15000, maxRedirects: 0 });
      assert.equal(response.status(), 200, 'Public page not ready');
      assert.ok(!/noindex/i.test(response.headers()['x-robots-tag'] ?? ''), 'Header excludes indexing');
      const data = await parser.evaluate(html => {
        const doc = new DOMParser().parseFromString(html, 'text/html');
        const schemas = [...doc.querySelectorAll('script[type="application/ld+json"]')].map(n => JSON.parse(n.textContent));
        const meta = [...doc.querySelectorAll('meta[name],meta[property]')].map(n => [n.getAttribute('name') || n.getAttribute('property'), n.content]).filter(([k]) => !['msvalidate.01','google-site-verification'].includes(k));
        doc.querySelectorAll('script,style').forEach(n => n.remove());
        return { canonical: doc.querySelector('link[rel="canonical"]')?.getAttribute('href'), h1: doc.querySelectorAll('h1').length,
          title: doc.title, meta, schemas, text: doc.body.textContent.replace(/\s+/g,' ').trim(),
          links: [...doc.querySelectorAll('a[href]')].map(n => [n.getAttribute('href'),n.textContent]),
          images: [...doc.querySelectorAll('img')].map(n => [n.getAttribute('src'),n.getAttribute('alt')]) };
      }, await response.text());
      assert.equal(canonical(data.canonical), url, 'Canonical mismatch');
      assert.ok(!data.meta.some(([k,v]) => /^(robots|googlebot|bingbot)$/.test(k) && /noindex/i.test(v)), 'Page excludes indexing');
      pages[url] = digest(data);
    }
    return validateSnapshot({ version: 1, capturedAt: new Date().toISOString(), pages });
  } finally { await browser.close(); }
}

export async function verifyKey(key, base = ORIGIN, request = fetch) {
  const response = await request(base + '/indexnow-key.txt', { redirect: 'manual', signal: AbortSignal.timeout(15000) });
  assert.equal(response.status, 200, 'Ownership file unavailable');
  assert.ok((await response.text()) === key, 'Ownership file mismatch');
  return { status: 200, matches: true };
}

export async function verifyDeleted(urls, request = fetch) {
  for (const value of urls) {
    const url = canonical(value), response = await request(url, { redirect: 'manual', signal: AbortSignal.timeout(15000) });
    if ([404,410].includes(response.status)) continue;
    if ([301,308].includes(response.status)) { canonical(new URL(response.headers.get('location'), url).href); continue; }
    throw Error('Removed sitemap URL is not a confirmed deletion/permanent redirect');
  }
}

export async function submitChanges(delta, key, request = fetch) {
  const urls = [...delta.added,...delta.updated,...delta.deleted].map(canonical);
  assert.ok(urls.length > 0 && urls.length <= 10000 && new Set(urls).size === urls.length, 'Invalid submission inventory');
  let response;
  try {
    response = await request(ENDPOINT, { method: 'POST', redirect: 'manual', signal: AbortSignal.timeout(30000),
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify({ host: 'itecs.ai', key, keyLocation: KEY_URL, urlList: urls }) });
  } catch { return { status: null, outcome: 'uncertain-transport', count: urls.length }; }
  // Never store request payload/key or an untrusted response body in receipts/logs.
  return { status: response.status, outcome: response.status === 200 ? 'received' : response.status === 202 ? 'received-key-validation-pending' : 'rejected', count: urls.length,
    retryAfter: response.headers.get('retry-after')?.replace(/[^0-9A-Za-z,: -]/g,'').slice(0,80) ?? null };
}

export function savePrivate(file, data) {
  const dir = lstatSync(dirname(file));
  assert.ok(dir.isDirectory() && !dir.isSymbolicLink() && dir.uid === process.getuid() && (dir.mode & 0o777) === 0o700, 'Unsafe evidence directory');
  if (existsSync(file)) assert.ok(lstatSync(file).isFile() && !lstatSync(file).isSymbolicLink(), 'Unsafe evidence file');
  const temporary = file + '.tmp-' + process.pid;
  writeFileSync(temporary, JSON.stringify(data,null,2), { flag: 'wx', mode: 0o600 }); renameSync(temporary,file);
}

export async function notify({ after, key, stateFile = STATE_FILE, receiptFile, request = fetch }) {
  const previous = existsSync(stateFile) ? validateSnapshot(JSON.parse(readFileSync(stateFile,'utf8'))) : null;
  const delta = changes(previous,after), count = delta.added.length + delta.updated.length + delta.deleted.length;
  if (!count) { const receipt = { at: new Date().toISOString(), outcome: 'no-content-changes', count: 0 }; savePrivate(receiptFile,receipt); return receipt; }
  await verifyKey(key,ORIGIN,request); await verifyDeleted(delta.deleted,request);
  savePrivate(receiptFile,{ at: new Date().toISOString(), outcome: 'attempting', delta, count });
  const receipt = { at: new Date().toISOString(), ...await submitChanges(delta,key,request), delta, endpoint: ENDPOINT };
  savePrivate(receiptFile,receipt);
  if ([200,202].includes(receipt.status)) {
    savePrivate(stateFile,{ ...after, lastReceipt: { at: receipt.at, status: receipt.status, outcome: receipt.outcome } });
  }
  return receipt;
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  try {
    if (process.argv[2] === 'prepare-key') {
      assert.equal(process.argv.length, 4); provisionKey(process.argv[3]); console.log('Public ownership artifact prepared; value withheld.');
    } else {
      assert.equal(process.argv[2], 'notify');
      let receiptFile = dirname(STATE_FILE) + '/receipt-' + new Date().toISOString().replace(/[:.]/g,'-') + '.json';
      if (process.argv.length > 3) {
        assert.equal(process.argv[3], '--receipt'); assert.equal(process.argv.length, 5); receiptFile = resolve(process.argv[4]);
      }
      const receipt = await notify({ after: await captureSite(), key: readKey(), receiptFile });
      console.log(JSON.stringify({ status: receipt.status ?? null, outcome: receipt.outcome, count: receipt.count }));
      if (receipt.count && ![200,202].includes(receipt.status)) process.exitCode = 1;
    }
  } catch { console.error('IndexNow failed; check public readiness, key-file permissions and usage in docs/seo/indexnow.md. No key or provider body emitted. Retry notify after resolving the error.'); process.exitCode = 1; }
}

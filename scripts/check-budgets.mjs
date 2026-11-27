import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { gzipSync } from 'node:zlib';

const root = process.cwd();
const assetDirectory = join(root, 'dist', '_astro');
const fontDirectory = join(root, 'dist', 'fonts');
const failures = [];
const productionHostname = new URL(process.env.SITE_URL ?? 'https://leelanshkharbanda.github.io')
  .hostname;

const gzipSize = (buffer) => gzipSync(buffer).length;
const files = readdirSync(assetDirectory);
const cssBytes = files
  .filter((file) => file.endsWith('.css'))
  .reduce((total, file) => total + gzipSize(readFileSync(join(assetDirectory, file))), 0);
const inspectorBytes = files
  .filter((file) => /^(TraceInspector|client|react)\./.test(file) && file.endsWith('.js'))
  .reduce((total, file) => total + gzipSize(readFileSync(join(assetDirectory, file))), 0);
const signalToyBytes = files
  .filter((file) => /^SignalToy\./.test(file) && file.endsWith('.js'))
  .reduce((total, file) => total + gzipSize(readFileSync(join(assetDirectory, file))), 0);
const diagramInspectorBytes = files
  .filter((file) => /^(DiagramInspector|diagram-inspector)\./.test(file) && file.endsWith('.js'))
  .reduce((total, file) => total + gzipSize(readFileSync(join(assetDirectory, file))), 0);
const fontBytes = readdirSync(fontDirectory)
  .filter((file) => file.endsWith('.woff2'))
  .reduce((total, file) => total + statSync(join(fontDirectory, file)).size, 0);

if (cssBytes > 30_000) failures.push(`CSS exceeds 30 KB gzip: ${cssBytes}`);
if (inspectorBytes > 75_000)
  failures.push(`Inspector JavaScript exceeds 75 KB gzip: ${inspectorBytes}`);
if (signalToyBytes > 6_000)
  failures.push(`SignalToy JavaScript exceeds 6 KB gzip: ${signalToyBytes}`);
if (diagramInspectorBytes > 6_000)
  failures.push(`DiagramInspector JavaScript exceeds 6 KB gzip: ${diagramInspectorBytes}`);
if (fontBytes > 60_000) failures.push(`Fonts exceed 60 KB: ${fontBytes}`);

function htmlFiles(directory) {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) return htmlFiles(path);
    return entry.name.endsWith('.html') ? [path] : [];
  });
}

let maxInlineBytes = 0;
let thirdPartyRequests = 0;

for (const file of htmlFiles(join(root, 'dist'))) {
  const html = readFileSync(file, 'utf8');
  const scripts = [...html.matchAll(/<script(?![^>]*\bsrc=)[^>]*>([\s\S]*?)<\/script>/g)]
    .filter((match) => !/application\/ld\+json/i.test(match[0]))
    .map((match) => match[1])
    .join('\n');
  const inlineBytes = gzipSize(Buffer.from(scripts));
  maxInlineBytes = Math.max(maxInlineBytes, inlineBytes);
  if (inlineBytes > 125_000)
    failures.push(`Inline JavaScript exceeds 125 KB gzip in ${file}: ${inlineBytes}`);

  const runtimeTags = html.match(/<(?:script|link|img|iframe|source)\b[^>]*>/g) ?? [];
  for (const tag of runtimeTags) {
    const isRuntimeAsset =
      /^<script\b/i.test(tag) ||
      /^<(?:img|iframe|source)\b/i.test(tag) ||
      (/^<link\b/i.test(tag) && /rel=["']stylesheet["']/i.test(tag));
    const remote = tag.match(/(?:src|href)=["'](https?:\/\/[^"']+)/i);
    const remoteUrl = remote?.[1];
    if (!isRuntimeAsset || !remoteUrl) continue;
    const url = new URL(remoteUrl);
    if (url.hostname !== productionHostname) thirdPartyRequests += 1;
  }
}

if (thirdPartyRequests > 0)
  failures.push(`Unexpected third-party runtime assets: ${thirdPartyRequests}`);

console.log(
  JSON.stringify(
    {
      cssGzipBytes: cssBytes,
      inspectorGzipBytes: inspectorBytes,
      signalToyGzipBytes: signalToyBytes,
      diagramInspectorGzipBytes: diagramInspectorBytes,
      fontBytes,
      maxInlineGzipBytes: maxInlineBytes,
      thirdPartyRequests,
    },
    null,
    2,
  ),
);

if (failures.length) {
  console.error(failures.join('\n'));
  process.exitCode = 1;
}

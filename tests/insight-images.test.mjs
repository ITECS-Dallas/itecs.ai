import assert from "node:assert/strict";
import { readFileSync, readdirSync } from "node:fs";
import test from "node:test";
import ts from "typescript";

const read = (path) => readFileSync(new URL(`../${path}`, import.meta.url), "utf8");
const source = read("src/lib/constants.ts");
const ast = ts.createSourceFile("constants.ts", source, ts.ScriptTarget.Latest, true);
let entries;
function walk(node) {
  if (ts.isVariableDeclaration(node) && node.name.getText(ast) === "INSIGHTS") entries = node.initializer.elements;
  ts.forEachChild(node, walk);
}
walk(ast);
const property = (node, key) => node.properties.find((p) => p.name?.getText(ast) === key)?.initializer;

test("every article owns a real public image and descriptive alt", () => {
  const routes = readdirSync(new URL("../src/app/insights/", import.meta.url), { withFileTypes: true }).filter((e) => e.isDirectory());
  assert.equal(entries.length, routes.length);
  for (const entry of entries) {
    const slug = property(entry, "slug").text;
    const image = property(entry, "image");
    assert.ok(image && ts.isObjectLiteralExpression(image), `${slug}: image is required`);
    const src = property(image, "src").text;
    const alt = property(image, "alt").text;
    assert.match(src, /^\/images\/insights\/[a-z0-9-]+-hero\.(png|svg)$/);
    assert.ok(alt.trim().length > 15, `${slug}: describe the illustration`);
    const asset = readFileSync(new URL(`../public${src}`, import.meta.url));
    assert.ok(asset.length > 0, `${slug}: image must not be empty`);
    if (src.endsWith(".png")) assert.ok(asset.subarray(1, 4).toString() === "PNG" || asset.subarray(0, 3).equals(Buffer.from([0xff, 0xd8, 0xff])), `${slug}: valid existing PNG/JPEG asset`);
    else {
      assert.match(asset.toString(), /viewBox="0 0 1600 900"/);
      assert.doesNotMatch(asset.toString(), /<script|<foreignObject|(?:href|src)="https?:/i);
    }
    const route = read(`src/app/insights/${slug}/page.tsx`);
    assert.match(route, /ogImage: insight\.image\.src/);
    assert.doesNotMatch(route, /heroImage(?:Alt)?[=\s]/, `${slug}: do not fork image ownership`);
  }
});

test("archive and article use the same image contract without hiding mobile images", () => {
  const cards = read("src/components/sections/InsightCards.tsx");
  const layout = read("src/components/insights/InsightArticleLayout.tsx");
  for (const owner of ["featured", "insight"]) {
    assert.match(cards, new RegExp(`src=\\{${owner}\\.image\\.src\\}`));
    assert.match(cards, new RegExp(`alt=\\{${owner}\\.image\\.alt\\}`));
  }
  assert.doesNotMatch(cards, /use client|(?:className="| )hidden(?: |")|FeaturedIcon/);
  assert.equal((cards.match(/<Image\b/g) ?? []).length, 2);
  assert.equal((cards.match(/sizes=/g) ?? []).length, 2);
  assert.doesNotMatch(cards, /priority|loading="eager"/, "archive images below the hero stay lazy");
  assert.match(layout, /src=\{insight\.image\.src\}/);
  assert.match(layout, /alt=\{insight\.image\.alt\}/);
  assert.match(layout, /const imageUrl = `\$\{SITE_CONFIG.url\}\$\{insight.image.src\}`/);
  assert.match(layout, /image: imageUrl/);
});

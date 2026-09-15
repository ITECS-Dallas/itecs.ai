import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync, readdirSync } from "node:fs";
import ts from "typescript";

const layout = readFileSync(new URL("../src/components/insights/InsightArticleLayout.tsx", import.meta.url), "utf8");

test("article header and every article body use the same responsive reading column", () => {
  const ast = ts.createSourceFile("layout.tsx", layout, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
  const divs = [];
  function walk(node) {
    if (ts.isJsxElement(node) && node.openingElement.tagName.getText(ast) === "div") divs.push(node);
    ts.forEachChild(node, walk);
  }
  walk(ast);
  const header = divs.find((node) => node.getText(ast).includes("<h1") && node.openingElement.getText(ast).includes("articleColumnClassName"));
  assert.ok(header, "header must use the shared reading column");
  assert.match(layout, /const articleColumnClassName = "mx-auto max-w-3xl px-6 md:px-8";/);
  function checkArticles(node) {
    if (ts.isJsxElement(node) && node.openingElement.tagName.getText(ast) === "article") {
      const column = node.children.find(ts.isJsxElement);
      assert.ok(column, "article needs a content column");
      assert.match(column.openingElement.getText(ast), /articleColumnClassName/, "body, CTA and trust sections must align with the header");
    }
    ts.forEachChild(node, checkArticles);
  }
  checkArticles(ast);
  assert.doesNotMatch(layout, /max-w-5xl/, "do not reintroduce a wider header rail");
  assert.match(layout, /sizes="\(min-width: 768px\) 704px, calc\(100vw - 48px\)"/);
});

test("every existing Insights article uses the shared layout", () => {
  const root = new URL("../src/app/insights/", import.meta.url);
  const routes = readdirSync(root, { withFileTypes: true }).filter((entry) => entry.isDirectory());
  assert.ok(routes.length > 0);
  for (const route of routes) {
    const source = readFileSync(new URL(`${route.name}/page.tsx`, root), "utf8");
    assert.match(source, /<InsightArticleLayout\b/, route.name);
  }
});

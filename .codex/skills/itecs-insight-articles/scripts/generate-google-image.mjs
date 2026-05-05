#!/usr/bin/env node

import { mkdir, writeFile } from "node:fs/promises";
import { dirname } from "node:path";

const args = process.argv.slice(2);

function readFlag(name, fallback = undefined) {
  const index = args.indexOf(`--${name}`);
  if (index === -1) return fallback;
  return args[index + 1] ?? fallback;
}

const prompt = readFlag("prompt");
const outPath = readFlag("out");
const aspectRatio = readFlag("aspect-ratio", "16:9");
const imageSize = readFlag("image-size", "2K");
const model = readFlag(
  "model",
  process.env.GEMINI_IMAGE_MODEL || "gemini-3.1-flash-image-preview"
);
const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
  console.error("Missing GEMINI_API_KEY in the environment.");
  process.exit(1);
}

if (!prompt || !outPath) {
  console.error(
    "Usage: node generate-google-image.mjs --prompt \"...\" --out public/images/insights/<slug>-hero.png [--aspect-ratio 16:9] [--image-size 2K] [--model gemini-3.1-flash-image-preview]"
  );
  process.exit(1);
}

const safePrompt = `${prompt}

Hard constraints: no people, no faces, no hands, no crowds, no visible brand logos, no readable text, no fake UI labels. Make it polished, hyperrealistic, executive business technology photography or dimensional digital art suitable for ITECS AI consulting.`;

const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`;

const response = await fetch(endpoint, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "x-goog-api-key": apiKey,
  },
  body: JSON.stringify({
    contents: [
      {
        parts: [{ text: safePrompt }],
      },
    ],
    generationConfig: {
      responseModalities: ["Image"],
      imageConfig: {
        aspectRatio,
        imageSize,
      },
    },
  }),
});

if (!response.ok) {
  const body = await response.text();
  console.error(`Google image generation failed: ${response.status}`);
  console.error(body);
  process.exit(1);
}

const data = await response.json();
const parts = data?.candidates?.[0]?.content?.parts ?? [];
const imagePart = parts.find((part) => part.inlineData?.data);

if (!imagePart) {
  console.error("Google image generation returned no inline image data.");
  console.error(JSON.stringify(data, null, 2));
  process.exit(1);
}

await mkdir(dirname(outPath), { recursive: true });
await writeFile(outPath, Buffer.from(imagePart.inlineData.data, "base64"));

console.log(`Saved ${outPath}`);

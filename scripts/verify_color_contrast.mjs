#!/usr/bin/env node

import fs from "node:fs";

const source = fs.readFileSync("src/app/globals.css", "utf8");
const failures = [];

const parseBlock = (selector) => {
  const escaped = selector.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const match = source.match(new RegExp(`${escaped}\\s*\\{([\\s\\S]*?)\\n\\s*\\}`, "m"));
  if (!match) throw new Error(`missing palette block: ${selector}`);
  const variables = {};
  for (const token of match[1].matchAll(/--([\w-]+):\s*([\d.]+)\s+([\d.]+)%\s+([\d.]+)%\s*;/g)) {
    variables[token[1]] = [Number(token[2]), Number(token[3]), Number(token[4])];
  }
  return variables;
};

const hslToRgb = ([h, s, l]) => {
  const hue = (((h % 360) + 360) % 360) / 360;
  const saturation = s / 100;
  const lightness = l / 100;
  if (saturation === 0) return [lightness, lightness, lightness];
  const q = lightness < 0.5
    ? lightness * (1 + saturation)
    : lightness + saturation - lightness * saturation;
  const p = 2 * lightness - q;
  const channel = (offset) => {
    let t = hue + offset;
    if (t < 0) t += 1;
    if (t > 1) t -= 1;
    if (t < 1 / 6) return p + (q - p) * 6 * t;
    if (t < 1 / 2) return q;
    if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
    return p;
  };
  return [channel(1 / 3), channel(0), channel(-1 / 3)];
};

const luminance = (hsl) => {
  const linear = hslToRgb(hsl).map((channel) =>
    channel <= 0.04045
      ? channel / 12.92
      : ((channel + 0.055) / 1.055) ** 2.4,
  );
  return 0.2126 * linear[0] + 0.7152 * linear[1] + 0.0722 * linear[2];
};

const contrast = (foreground, background) => {
  const high = Math.max(luminance(foreground), luminance(background));
  const low = Math.min(luminance(foreground), luminance(background));
  return (high + 0.05) / (low + 0.05);
};

const light = parseBlock(":root");
const dark = parseBlock(".dark");

const checks = [
  ["light body text", light.foreground, light.background, 7],
  ["light muted text", light["muted-foreground"], light.background, 4.5],
  ["light primary links", light.primary, light.background, 4.5],
  ["light primary button", light["primary-foreground"], light.primary, 4.5],
  ["light accent button", light["accent-foreground"], light.accent, 4.5],
  ["dark body text", dark.foreground, dark.background, 7],
  ["dark muted text", dark["muted-foreground"], dark.background, 4.5],
  ["dark primary links", dark.primary, dark.background, 4.5],
  ["dark primary button", dark["primary-foreground"], dark.primary, 4.5],
  ["dark accent button", dark["accent-foreground"], dark.accent, 4.5],
];

for (const [label, foreground, background, minimum] of checks) {
  if (!foreground || !background) {
    failures.push(`${label}: missing color token`);
    continue;
  }
  const ratio = contrast(foreground, background);
  if (ratio < minimum) {
    failures.push(`${label}: ${ratio.toFixed(2)}:1 is below ${minimum}:1`);
  }
}

if (failures.length) {
  console.error(`Color contrast validation failed:\n${failures.join("\n")}`);
  process.exit(1);
}

console.log(
  `Color contrast validation passed: ${checks.length} light and dark text/action pairs meet WCAG AA or enhanced body-text thresholds.`,
);

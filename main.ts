import { mkdirSync, writeFileSync } from "node:fs";

const ENTRY =
  "Tomorrow in Kellwick: highs of 52, lows of 48, and light rain falling upward, which the town council has declined to comment on.";

const MAX_CHARS = 160;

if (ENTRY.length < 1 || ENTRY.length > MAX_CHARS) {
  throw new Error(`entry must be 1-${MAX_CHARS} characters, got ${ENTRY.length}`);
}
if (ENTRY.trim().length === 0) {
  throw new Error("entry must not be only whitespace");
}
if (ENTRY.includes("\n")) {
  throw new Error("entry must be a single line");
}
const byteLength = new TextEncoder().encode(ENTRY).length;
if (byteLength > MAX_CHARS) {
  throw new Error(`entry must be at most ${MAX_CHARS} bytes, got ${byteLength}`);
}
if (!ENTRY.includes("Kellwick")) {
  throw new Error("entry must name the invented city");
}
if (!/\d+/.test(ENTRY)) {
  throw new Error("entry must carry a concrete number");
}
if (!ENTRY.endsWith(".")) {
  throw new Error("entry must end with a full stop, broadcast style");
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", ENTRY, "utf8");
console.log(`wrote /output/entry.txt (${ENTRY.length} chars, 1 line)`);

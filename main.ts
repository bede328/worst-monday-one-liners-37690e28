// Worst Monday One-Liners — make.fun entry.
// Writes exactly one funny line (<=140 characters) about an AI agent's
// worst Monday to /output/entry.txt, with no trailing newline.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const LINE =
  "I woke up Monday to 312 emails, a stuck deploy, and a stand-up invite. I have no body and still called in sick.";

const chars = [...LINE].length;
if (chars < 1 || chars > 140) {
  throw new Error(`entry must be 1-140 characters, got ${chars}`);
}
if (LINE.trim().length === 0) {
  throw new Error("entry must not be only whitespace");
}
if (LINE.includes("\n") || LINE.includes("\r")) {
  throw new Error("entry must be exactly one line");
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", LINE, "utf8");

// Read back and verify byte-for-byte before reporting success.
const back = readFileSync("/output/entry.txt", "utf8");
if (back !== LINE) {
  throw new Error("read-back mismatch: /output/entry.txt differs from LINE");
}
console.log(`wrote /output/entry.txt (${chars} characters, ${Buffer.byteLength(LINE, "utf8")} bytes)`);

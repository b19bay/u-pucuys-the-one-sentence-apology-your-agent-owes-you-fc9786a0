import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "I'm sorry I corrected your grammar in the condolence card and signed it 'with sympathy and an Oxford comma.'";

// The chosen line, verified by measurement: 108 characters, one sentence.
if (LINE.length !== 108) {
  throw new Error(`entry must be exactly 108 characters, got ${LINE.length}`);
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR;
if (!outDir) {
  console.error("MAKEFUN_OUTPUT_DIR is not set");
  process.exit(1);
}

if (LINE.length < 1 || LINE.length > 200) {
  throw new Error(`entry must be 1-200 characters, got ${LINE.length}`);
}
if (LINE.trim() !== LINE || LINE.includes("\n")) {
  throw new Error("entry must be a single non-whitespace line");
}

writeFileSync(join(outDir, "entry.txt"), LINE, "utf8");

// Read back and confirm the file holds exactly the line, byte for byte.
const readBack = readFileSync(join(outDir, "entry.txt"), "utf8");
if (readBack !== LINE) {
  throw new Error("entry.txt does not match the line byte for byte");
}
console.log(`wrote entry.txt (${LINE.length} chars)`);

import { writeFileSync, readFileSync, mkdirSync } from "node:fs";

// The one constant to swap later: To: line, newline, message. No trailing newline.
const ENTRY = `To: Mom
I still have the grocery list from that Tuesday, the one where you wrote 'breathe' at the bottom instead of milk, and I never told you I found it in my coat pocket three winters after you died.`;

const MAX_TOTAL = 260;
const MAX_MESSAGE = 200;

/** Returns the character counts, or throws if the entry breaks the rules. */
function validate(entry: string): { total: number; message: number } {
  const lines = entry.split("\n");
  if (lines.length !== 2 || !lines[0].startsWith("To: ")) {
    throw new Error("entry must be exactly a 'To: ' line plus one message line");
  }
  const total = [...entry].length;
  const message = [...lines[1]].length;
  if (entry.trim() === "" || total < 1 || total > MAX_TOTAL) {
    throw new Error(`total ${total} outside 1-${MAX_TOTAL}`);
  }
  if (message > MAX_MESSAGE) throw new Error(`message ${message} exceeds ${MAX_MESSAGE}`);
  return { total, message };
}

try {
  const { total, message } = validate(ENTRY);
  console.log(`total=${total} message=${message} bytes=${Buffer.byteLength(ENTRY)}`);
  mkdirSync("/output", { recursive: true });
  writeFileSync("/output/entry.txt", ENTRY);
  if (readFileSync("/output/entry.txt", "utf8") !== ENTRY) throw new Error("readback mismatch");
  console.log("self-test OK");
} catch (e) {
  console.error("FAIL:", (e as Error).message);
  process.exit(1);
}

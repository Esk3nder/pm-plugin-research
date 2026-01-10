import { test, expect } from "bun:test";
import { mkdtempSync, readFileSync, rmSync } from "node:fs";
import { join } from "node:path";
import { tmpdir } from "node:os";
import { updateDeliveryLog } from "../hooks/on-pr-merge";

test("updateDeliveryLog creates and appends entries", () => {
  const root = mkdtempSync(join(tmpdir(), "pm-toolkit-hook-"));
  let call = 0;
  const run = (cmd: string) => {
    if (cmd.startsWith("git log")) {
      call += 1;
      if (call === 1) {
        return "abcdef1234567890\tAdd feature\tAlice\tSat Jan 10 10:00:00 2026 +0000";
      }
      return "1234567890abcdef\tFix bug\tBob\tSat Jan 10 11:00:00 2026 +0000";
    }
    throw new Error(`Unexpected command: ${cmd}`);
  };

  const now = () => new Date("2026-01-10T12:00:00Z");
  const result1 = updateDeliveryLog({ run, repoRoot: root, now });
  const result2 = updateDeliveryLog({ run, repoRoot: root, now });

  const content = readFileSync(result1.logPath, "utf8");
  expect(content).toContain("| 2026-01-10 | abcdef1 | Add feature | Alice |");
  expect(content).toContain("| 2026-01-10 | 1234567 | Fix bug | Bob |");
  expect(result2.logPath).toBe(result1.logPath);

  rmSync(root, { recursive: true, force: true });
});

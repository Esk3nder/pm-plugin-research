import { execSync } from "node:child_process";
import { appendFileSync, existsSync, mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

export type DeliveryLogDeps = {
  run?: (cmd: string) => string;
  now?: () => Date;
  repoRoot?: string;
};

export type DeliveryLogResult = {
  logPath: string;
  entry: {
    date: string;
    hash: string;
    message: string;
    author: string;
  };
};

const defaultRun = (cmd: string) => execSync(cmd, { encoding: "utf8" }).trim();

export function ensureLog(path: string) {
  if (existsSync(path)) return;
  writeFileSync(
    path,
    "# Delivery Log\n\n| Date | Commit | Message | Author |\n|---|---|---|---|\n",
    "utf8"
  );
}

export function updateDeliveryLog(deps: DeliveryLogDeps = {}): DeliveryLogResult {
  const run = deps.run ?? defaultRun;
  const now = deps.now ?? (() => new Date());
  const repoRoot = deps.repoRoot ?? run("git rev-parse --show-toplevel");
  const logDir = join(repoRoot, ".pm-toolkit");
  const logPath = join(logDir, "delivery-log.md");

  mkdirSync(logDir, { recursive: true });
  ensureLog(logPath);

  const [hash, message, author] = run(
    "git log -1 --pretty=format:%H%x09%s%x09%an%x09%ad"
  ).split("\t");

  const entry = {
    date: now().toISOString().slice(0, 10),
    hash: hash.slice(0, 7),
    message,
    author,
  };

  const line = `| ${entry.date} | ${entry.hash} | ${entry.message} | ${entry.author} |\n`;
  appendFileSync(logPath, line, "utf8");

  return { logPath, entry };
}

if (import.meta.main) {
  try {
    const result = updateDeliveryLog();
    // eslint-disable-next-line no-console
    console.log(`Updated delivery log: ${result.logPath}`);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    // eslint-disable-next-line no-console
    console.error(`Delivery log update failed: ${message}`);
  }
}

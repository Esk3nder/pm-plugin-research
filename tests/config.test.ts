import { afterEach, test, expect } from "bun:test";
import { mkdtempSync, writeFileSync, mkdirSync, rmSync } from "node:fs";
import { join } from "node:path";
import { tmpdir } from "node:os";
import { loadConfig } from "../mcp-servers/shared/config";

const originalEnv = { ...process.env };

function restoreEnv() {
  for (const key of Object.keys(process.env)) {
    if (!(key in originalEnv)) delete process.env[key];
  }
  for (const [key, value] of Object.entries(originalEnv)) {
    process.env[key] = value;
  }
}

afterEach(() => {
  restoreEnv();
});

test("loadConfig uses explicit PM_TOOLKIT_CONFIG", () => {
  const dir = mkdtempSync(join(tmpdir(), "pm-toolkit-config-"));
  const configPath = join(dir, "explicit.json");
  writeFileSync(
    configPath,
    JSON.stringify({ integrations: { jira: { projectKey: "PROJ" } } }),
    "utf8"
  );

  process.env.PM_TOOLKIT_CONFIG = configPath;

  const result = loadConfig();
  expect(result.path).toBe(configPath);
  expect(result.config.integrations?.jira?.projectKey).toBe("PROJ");

  rmSync(dir, { recursive: true, force: true });
});

test("loadConfig finds .pm-toolkit.json by walking up", () => {
  const root = mkdtempSync(join(tmpdir(), "pm-toolkit-root-"));
  const nested = join(root, "a", "b");
  mkdirSync(nested, { recursive: true });
  const configPath = join(root, ".pm-toolkit.json");

  writeFileSync(
    configPath,
    JSON.stringify({ integrations: { intercom: { accessToken: "token" } } }),
    "utf8"
  );

  process.env.PM_TOOLKIT_PROJECT_ROOT = nested;

  const result = loadConfig();
  expect(result.path).toBe(configPath);
  expect(result.config.integrations?.intercom?.accessToken).toBe("token");

  rmSync(root, { recursive: true, force: true });
});

test("loadConfig returns empty config when missing", () => {
  const root = mkdtempSync(join(tmpdir(), "pm-toolkit-empty-"));
  const nested = join(root, "x", "y");
  mkdirSync(nested, { recursive: true });

  process.env.PM_TOOLKIT_PROJECT_ROOT = nested;

  const result = loadConfig();
  expect(result.path).toBeUndefined();
  expect(result.config).toEqual({});

  rmSync(root, { recursive: true, force: true });
});

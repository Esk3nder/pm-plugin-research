import { existsSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";

export type PMToolkitConfig = {
  integrations?: {
    jira?: {
      baseUrl?: string;
      email?: string;
      apiToken?: string;
      pat?: string;
      projectKey?: string;
      issueType?: string;
      statusTransitions?: Record<string, string>;
    };
    intercom?: {
      accessToken?: string;
      baseUrl?: string;
    };
    zendesk?: {
      subdomain?: string;
      email?: string;
      apiToken?: string;
      baseUrl?: string;
    };
  };
};

export function loadConfig(): { config: PMToolkitConfig; path?: string } {
  const explicit = process.env.PM_TOOLKIT_CONFIG;
  if (explicit && existsSync(explicit)) {
    return { config: readJson(explicit), path: explicit };
  }

  const startDir = process.env.PM_TOOLKIT_PROJECT_ROOT ?? process.cwd();
  const found = findUp(startDir, ".pm-toolkit.json", 8);
  if (found) {
    return { config: readJson(found), path: found };
  }

  return { config: {}, path: undefined };
}

function readJson(path: string): PMToolkitConfig {
  const raw = readFileSync(path, "utf8");
  return JSON.parse(raw);
}

function findUp(startDir: string, filename: string, maxDepth: number): string | undefined {
  let current = startDir;
  for (let depth = 0; depth <= maxDepth; depth += 1) {
    const candidate = join(current, filename);
    if (existsSync(candidate)) return candidate;
    const parent = dirname(current);
    if (parent === current) break;
    current = parent;
  }
  return undefined;
}

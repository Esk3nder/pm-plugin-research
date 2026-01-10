import { afterEach, test, expect } from "bun:test";
import { mkdtempSync, writeFileSync, rmSync } from "node:fs";
import { join } from "node:path";
import { tmpdir } from "node:os";
import {
  fetchFromFile,
  fetchFromIntercom,
  fetchFromZendesk,
} from "../mcp-servers/feedback-hub/index";

const originalEnv = { ...process.env };
const originalFetch = globalThis.fetch;

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
  globalThis.fetch = originalFetch;
});

test("fetchFromFile normalizes feedback items", async () => {
  const dir = mkdtempSync(join(tmpdir(), "pm-toolkit-feedback-"));
  const filePath = join(dir, "feedback.json");
  const payload = [
    { id: 1, description: "Need export", tags: ["feature"], created_at: "2026-01-01" },
    { id: 2, subject: "Bug report", tags: ["bug"] },
  ];
  writeFileSync(filePath, JSON.stringify(payload), "utf8");

  const items = await fetchFromFile(filePath);
  expect(items.length).toBe(2);
  expect(items[0].source).toBe("file");
  expect(items[0].text).toBe("Need export");
  expect(items[1].text).toBe("Bug report");

  rmSync(dir, { recursive: true, force: true });
});

test("fetchFromIntercom builds request with auth headers", async () => {
  const calls: Array<{ url: string; init?: RequestInit }> = [];
  globalThis.fetch = async (url: string | URL, init?: RequestInit) => {
    calls.push({ url: String(url), init });
    return new Response(JSON.stringify({ data: [], pages: {} }), { status: 200 });
  };

  process.env.INTERCOM_ACCESS_TOKEN = "token";

  await fetchFromIntercom({ days: 7, limit: 5 });

  expect(calls.length).toBe(1);
  const requestUrl = new URL(calls[0].url);
  expect(requestUrl.pathname).toBe("/conversations");
  expect(requestUrl.searchParams.get("per_page")).toBe("5");

  const headers = new Headers(calls[0].init?.headers);
  expect(headers.get("Authorization")).toBe("Bearer token");
  expect(headers.get("Intercom-Version")).toBe("2.14");
});

test("fetchFromZendesk builds request with auth headers", async () => {
  const calls: Array<{ url: string; init?: RequestInit }> = [];
  globalThis.fetch = async (url: string | URL, init?: RequestInit) => {
    calls.push({ url: String(url), init });
    return new Response(JSON.stringify({ results: [], next_page: null }), { status: 200 });
  };

  process.env.ZENDESK_SUBDOMAIN = "acme";
  process.env.ZENDESK_EMAIL = "user@example.com";
  process.env.ZENDESK_API_TOKEN = "token";

  await fetchFromZendesk({ days: 1, tag: "feature-request", limit: 3 });

  expect(calls.length).toBe(1);
  const requestUrl = new URL(calls[0].url);
  const query = requestUrl.searchParams.get("query") ?? "";
  expect(query).toContain("type:ticket");
  expect(query).toContain("tags:feature-request");
  expect(query).toMatch(/created>=\d{4}-\d{2}-\d{2}/);

  const headers = new Headers(calls[0].init?.headers);
  const expectedAuth = Buffer.from("user@example.com/token:token").toString("base64");
  expect(headers.get("Authorization")).toBe(`Basic ${expectedAuth}`);
});

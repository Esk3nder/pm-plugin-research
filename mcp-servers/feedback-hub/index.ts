import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import { z } from "zod";
import { requestJson, buildBasicAuth } from "../shared/http.js";
import { loadConfig } from "../shared/config.js";
import { readFileSync } from "node:fs";

const FetchFeedbackSchema = z.object({
  source: z.enum(["intercom", "zendesk", "file", "all"]).optional(),
  days: z.number().int().optional(),
  tag: z.string().optional(),
  filePath: z.string().optional(),
  limit: z.number().int().optional(),
});

const ValidateConfigSchema = z.object({
  source: z.enum(["intercom", "zendesk", "all"]).optional(),
});

type IntercomConfig = {
  accessToken?: string;
  baseUrl?: string;
  version?: string;
};

type ZendeskConfig = {
  subdomain?: string;
  baseUrl?: string;
  email?: string;
  apiToken?: string;
};

const server = new Server(
  { name: "feedback-hub", version: "0.1.0" },
  { capabilities: { tools: {} } }
);

server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: "feedback_validate_config",
        description: "Validate feedback source configuration.",
        inputSchema: {
          type: "object",
          properties: {
            source: { type: "string", enum: ["intercom", "zendesk", "all"] },
          },
        },
      },
      {
        name: "feedback_fetch",
        description: "Fetch feedback from Intercom, Zendesk, or a local JSON file.",
        inputSchema: {
          type: "object",
          properties: {
            source: { type: "string", enum: ["intercom", "zendesk", "file", "all"] },
            days: { type: "integer" },
            tag: { type: "string" },
            filePath: { type: "string" },
            limit: { type: "integer" },
          },
        },
      },
    ],
  };
});

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  try {
    switch (request.params.name) {
      case "feedback_validate_config":
        return { content: [{ type: "text", text: JSON.stringify(await validateConfig(request.params.arguments ?? {}), null, 2) }] };
      case "feedback_fetch":
        return { content: [{ type: "text", text: JSON.stringify(await fetchFeedback(request.params.arguments ?? {}), null, 2) }] };
      default:
        throw new Error(`Unknown tool: ${request.params.name}`);
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return { content: [{ type: "text", text: JSON.stringify({ error: message }, null, 2) }] };
  }
});

export async function validateConfig(args: unknown) {
  const input = ValidateConfigSchema.parse(args);
  const intercom = getIntercomConfig();
  const zendesk = getZendeskConfig();

  const sources = input.source === "all" || !input.source ? ["intercom", "zendesk"] : [input.source];
  const result: Record<string, unknown> = {};

  if (sources.includes("intercom")) {
    result.intercom = {
      baseUrl: intercom.baseUrl,
      hasToken: Boolean(intercom.accessToken),
      version: intercom.version,
    };
  }
  if (sources.includes("zendesk")) {
    result.zendesk = {
      baseUrl: zendesk.baseUrl ?? (zendesk.subdomain ? `https://${zendesk.subdomain}.zendesk.com` : undefined),
      hasToken: Boolean(zendesk.apiToken),
      email: zendesk.email,
      subdomain: zendesk.subdomain,
    };
  }

  return result;
}

export async function fetchFeedback(args: unknown) {
  const input = FetchFeedbackSchema.parse(args);
  const source = input.source ?? "all";
  const limit = input.limit ?? 200;
  const days = input.days ?? 30;
  const tag = input.tag;

  const collected: Array<Record<string, unknown>> = [];

  if (source === "file" || input.filePath) {
    const fromFile = await fetchFromFile(input.filePath ?? "feedback.json");
    return { source: "file", count: fromFile.length, items: fromFile.slice(0, limit) };
  }

  if (source === "intercom" || source === "all") {
    const intercomItems = await fetchFromIntercom({ days, tag, limit });
    collected.push(...intercomItems);
  }

  if (source === "zendesk" || source === "all") {
    const zendeskItems = await fetchFromZendesk({ days, tag, limit });
    collected.push(...zendeskItems);
  }

  return {
    source,
    count: collected.length,
    items: collected.slice(0, limit),
  };
}

export async function fetchFromFile(path: string) {
  const raw = readFileSync(path, "utf8");
  const parsed = JSON.parse(raw) as unknown;
  const items = Array.isArray(parsed)
    ? parsed
    : typeof parsed === "object" && parsed && Array.isArray((parsed as { data?: unknown[] }).data)
      ? (parsed as { data: unknown[] }).data
      : [];

  return items.map((item, index) => normalizeItem({
    id: String((item as { id?: string }).id ?? index),
    source: "file",
    createdAt: (item as { created_at?: string }).created_at ?? undefined,
    text: extractText(item),
    tags: (item as { tags?: string[] }).tags ?? [],
    raw: item,
  }));
}

export async function fetchFromIntercom({ days, tag, limit }: { days: number; tag?: string; limit: number }) {
  const config = getIntercomConfig();
  if (!config.accessToken) throw new Error("INTERCOM_ACCESS_TOKEN or integrations.intercom.accessToken is required");

  const baseUrl = (config.baseUrl ?? "https://api.intercom.io").replace(/\/$/, "");
  const headers: HeadersInit = {
    Authorization: `Bearer ${config.accessToken}`,
    Accept: "application/json",
    "Content-Type": "application/json",
    "Intercom-Version": config.version ?? "2.14",
  };

  const cutoff = cutoffTimestamp(days);
  const items: Array<Record<string, unknown>> = [];
  let startingAfter: string | undefined;

  while (items.length < limit) {
    const params = new URLSearchParams();
    params.set("per_page", String(Math.min(150, limit - items.length)));
    if (startingAfter) params.set("starting_after", startingAfter);

    const res = await requestJson<{ data?: Array<Record<string, unknown>>; pages?: { next?: { starting_after?: string } } }>(
      `${baseUrl}/conversations?${params.toString()}`,
      { headers }
    );

    if (!res.ok) {
      throw new Error(`Intercom fetch failed (${res.status}): ${res.text ?? ""}`.trim());
    }

    const data = res.data?.data ?? [];
    for (const convo of data) {
      const createdAt = typeof convo.created_at === "number" ? new Date(convo.created_at * 1000).toISOString() : undefined;
      if (createdAt && cutoff && createdAt < cutoff) continue;
      const tags = extractTags(convo);
      if (tag && !tags.includes(tag)) continue;
      items.push(
        normalizeItem({
          id: String(convo.id ?? ""),
          source: "intercom",
          createdAt,
          text: extractText(convo),
          tags,
          raw: convo,
        })
      );
    }

    const next = res.data?.pages?.next?.starting_after;
    if (!next) break;
    startingAfter = next;
  }

  return items;
}

export async function fetchFromZendesk({ days, tag, limit }: { days: number; tag?: string; limit: number }) {
  const config = getZendeskConfig();
  const baseUrl = (config.baseUrl ?? (config.subdomain ? `https://${config.subdomain}.zendesk.com` : "")).replace(/\/$/, "");
  if (!baseUrl) throw new Error("ZENDESK_SUBDOMAIN or integrations.zendesk.subdomain is required");
  if (!config.email || !config.apiToken) throw new Error("ZENDESK_EMAIL and ZENDESK_API_TOKEN are required");

  const auth = buildBasicAuth(`${config.email}/token`, config.apiToken);
  const headers: HeadersInit = {
    Authorization: `Basic ${auth}`,
    Accept: "application/json",
  };

  const queryParts = [`type:ticket`, `created>=${cutoffDate(days)}`];
  if (tag) queryParts.push(`tags:${tag}`);
  const query = queryParts.join(" ");

  let nextUrl: string | undefined = `${baseUrl}/api/v2/search.json?query=${encodeURIComponent(query)}`;
  const items: Array<Record<string, unknown>> = [];

  while (nextUrl && items.length < limit) {
    const res = await requestJson<{ results?: Array<Record<string, unknown>>; next_page?: string }>(nextUrl, { headers });
    if (!res.ok) {
      throw new Error(`Zendesk fetch failed (${res.status}): ${res.text ?? ""}`.trim());
    }

    const results = res.data?.results ?? [];
    for (const ticket of results) {
      items.push(
        normalizeItem({
          id: String(ticket.id ?? ""),
          source: "zendesk",
          createdAt: ticket.created_at as string | undefined,
          text: extractText(ticket),
          tags: Array.isArray(ticket.tags) ? (ticket.tags as string[]) : [],
          raw: ticket,
        })
      );
      if (items.length >= limit) break;
    }

    nextUrl = res.data?.next_page ?? undefined;
  }

  return items;
}

export function normalizeItem(item: {
  id: string;
  source: string;
  createdAt?: string;
  text: string;
  tags?: string[];
  raw?: unknown;
}) {
  return {
    id: item.id,
    source: item.source,
    createdAt: item.createdAt,
    text: item.text,
    tags: item.tags ?? [],
    raw: item.raw,
  };
}

export function extractText(data: unknown): string {
  if (!data || typeof data !== "object") return "";
  const record = data as Record<string, unknown>;
  return (
    (record.body as string) ??
    (record.description as string) ??
    (record.title as string) ??
    (record.subject as string) ??
    (record.summary as string) ??
    ""
  );
}

export function extractTags(data: Record<string, unknown>) {
  const tags = data.tags;
  if (Array.isArray(tags)) return tags as string[];
  const tagData = (tags as { data?: Array<{ name?: string }> } | undefined)?.data;
  if (Array.isArray(tagData)) return tagData.map((tag) => tag.name ?? "").filter(Boolean);
  return [] as string[];
}

export function cutoffTimestamp(days: number) {
  const now = new Date();
  const cutoff = new Date(now.getTime() - days * 24 * 60 * 60 * 1000);
  return cutoff.toISOString();
}

export function cutoffDate(days: number) {
  const now = new Date();
  const cutoff = new Date(now.getTime() - days * 24 * 60 * 60 * 1000);
  return cutoff.toISOString().slice(0, 10);
}

export function getIntercomConfig(): IntercomConfig {
  const { config } = loadConfig();
  const intercom = config.integrations?.intercom ?? {};
  return {
    accessToken: process.env.INTERCOM_ACCESS_TOKEN ?? intercom.accessToken,
    baseUrl: process.env.INTERCOM_BASE_URL ?? intercom.baseUrl,
    version: process.env.INTERCOM_VERSION,
  };
}

export function getZendeskConfig(): ZendeskConfig {
  const { config } = loadConfig();
  const zendesk = config.integrations?.zendesk ?? {};
  return {
    subdomain: process.env.ZENDESK_SUBDOMAIN ?? zendesk.subdomain,
    baseUrl: process.env.ZENDESK_BASE_URL ?? zendesk.baseUrl,
    email: process.env.ZENDESK_EMAIL ?? zendesk.email,
    apiToken: process.env.ZENDESK_API_TOKEN ?? zendesk.apiToken,
  };
}

const shouldConnect = process.env.PM_TOOLKIT_TEST !== "1";
if (shouldConnect) {
  const transport = new StdioServerTransport();
  await server.connect(transport);
}

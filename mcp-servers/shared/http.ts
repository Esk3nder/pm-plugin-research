export type HttpResult<T> = {
  ok: boolean;
  status: number;
  statusText: string;
  data?: T;
  text?: string;
};

export async function requestJson<T>(url: string, init: RequestInit): Promise<HttpResult<T>> {
  const res = await fetch(url, init);
  const text = await res.text();
  let data: T | undefined;
  if (text) {
    try {
      data = JSON.parse(text) as T;
    } catch {
      // Non-JSON response
    }
  }
  return {
    ok: res.ok,
    status: res.status,
    statusText: res.statusText,
    data,
    text,
  };
}

export function buildBasicAuth(user: string, token: string): string {
  const raw = `${user}:${token}`;
  return Buffer.from(raw).toString("base64");
}

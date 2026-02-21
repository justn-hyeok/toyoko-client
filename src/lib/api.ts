const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001";

async function request<T>(
  path: string,
  options: RequestInit = {},
  token?: string
): Promise<T> {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };

  const res = await fetch(`${BASE_URL}${path}`, { ...options, headers });

  const json = await res.json().catch(() => ({}));

  if (!res.ok) {
    const msg = Array.isArray(json.message) ? json.message[0] : json.message;
    throw new Error(msg ?? `${res.status} ${res.statusText}`);
  }

  return json.data;
}

export const api = {
  get: <T>(path: string, token?: string) =>
    request<T>(path, { method: "GET" }, token),
  post: <T>(path: string, body: unknown, token?: string) =>
    request<T>(path, { method: "POST", body: JSON.stringify(body) }, token),
};

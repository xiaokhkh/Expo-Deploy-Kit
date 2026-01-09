import { getAppConfig } from "../config";
import { HttpError } from "./error";

export async function fetchJson<T>(path: string, init?: RequestInit): Promise<T> {
  const { apiBaseUrl } = getAppConfig();

  if (!apiBaseUrl) {
    throw new HttpError(0, "CONFIG_MISSING", "API base URL is not set.");
  }

  const normalizedBase = apiBaseUrl.replace(/\/$/, "");
  const normalizedPath = path.replace(/^\//, "");
  const url = `${normalizedBase}/${normalizedPath}`;

  const response = await fetch(url, {
    method: "GET",
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers ?? {})
    }
  });

  const text = await response.text();
  let payload: unknown = null;

  if (text) {
    try {
      payload = JSON.parse(text);
    } catch {
      payload = text;
    }
  }

  if (!response.ok) {
    throw new HttpError(response.status, "HTTP_ERROR", response.statusText, payload);
  }

  return payload as T;
}

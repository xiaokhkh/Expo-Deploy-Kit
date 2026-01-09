import { fetchJson } from "../../services/http/fetcher";

import type { SampleResponse } from "./types";

export const sampleKeys = {
  ping: () => "sample/ping"
};

export function fetchSamplePing() {
  return fetchJson<SampleResponse>(sampleKeys.ping());
}

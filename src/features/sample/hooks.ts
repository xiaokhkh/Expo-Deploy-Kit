import useSWR from "swr";

import { getAppConfig } from "../../services/config";

import { fetchSamplePing, sampleKeys } from "./api";
import { useSampleStore } from "./store";

export function useSample() {
  const config = getAppConfig();
  const apiReady = Boolean(config.apiBaseUrl);
  const swr = useSWR(apiReady ? sampleKeys.ping() : null, fetchSamplePing);
  const count = useSampleStore((state) => state.count);
  const increment = useSampleStore((state) => state.increment);
  const decrement = useSampleStore((state) => state.decrement);

  return {
    apiReady,
    data: swr.data,
    error: swr.error,
    isLoading: swr.isLoading,
    count,
    increment,
    decrement
  };
}

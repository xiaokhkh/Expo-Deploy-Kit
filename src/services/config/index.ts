import Constants from "expo-constants";

import type { AppConfig, TargetEnv } from "./types";

const allowedTargets = new Set<TargetEnv>(["dev", "prod"]);

let cachedConfig: AppConfig | null = null;

function parseTargetEnv(value: unknown): TargetEnv {
  if (typeof value === "string" && allowedTargets.has(value as TargetEnv)) {
    return value as TargetEnv;
  }

  return "dev";
}

export function getAppConfig(): AppConfig {
  if (cachedConfig) {
    return cachedConfig;
  }

  const extra = (Constants.expoConfig?.extra ?? {}) as Record<string, unknown>;

  const targetEnv = parseTargetEnv(extra.targetEnv);
  const channel = typeof extra.channel === "string" && extra.channel.length > 0 ? extra.channel : "production";
  const appVersion = typeof extra.appVersion === "string" ? extra.appVersion : Constants.expoConfig?.version ?? "0.0.0";
  const buildNumber = typeof extra.buildNumber === "string" ? extra.buildNumber : "0";
  const versionCode = typeof extra.versionCode === "number" ? extra.versionCode : 0;
  const gitSha = typeof extra.gitSha === "string" ? extra.gitSha : "unknown";
  const apiBaseUrl = typeof extra.apiBaseUrl === "string" ? extra.apiBaseUrl : "";
  const androidApkUrl = typeof extra.androidApkUrl === "string" ? extra.androidApkUrl : "";

  cachedConfig = {
    targetEnv,
    channel,
    appVersion,
    buildNumber,
    versionCode,
    gitSha,
    apiBaseUrl,
    androidApkUrl
  };

  return cachedConfig;
}

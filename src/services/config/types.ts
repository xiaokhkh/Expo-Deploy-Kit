export type TargetEnv = "dev" | "prod";

export type AppConfig = {
  targetEnv: TargetEnv;
  channel: string;
  appVersion: string;
  buildNumber: string;
  versionCode: number;
  gitSha: string;
  apiBaseUrl: string;
  androidApkUrl: string;
};

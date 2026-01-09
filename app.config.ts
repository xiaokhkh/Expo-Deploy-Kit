import type { ConfigContext, ExpoConfig } from "expo/config";

const appJson = require("./app.json");
const buildJson = require("./build.json");

const targetEnv = process.env.TARGET_ENV ?? "dev";
const channel = process.env.CHANNEL ?? "production";
const gitSha = process.env.GIT_SHA ?? "unknown";
const apiBaseUrl = process.env.EXPO_PUBLIC_API_BASE_URL ?? "";

const allowedTargets = new Set(["dev", "prod"]);
if (!allowedTargets.has(targetEnv)) {
  throw new Error("TARGET_ENV must be dev or prod");
}

const version = appJson.expo.version ?? "1.0.0";
const name = appJson.expo.name ?? "Expo Router i18n Starter";
const slug = appJson.expo.slug ?? "expo-router-i18n-starter";
const scheme = appJson.expo.scheme ?? "expo-router-i18n-starter";

const iosBuildNumber = String(buildJson?.ios?.buildNumber ?? "1");
const androidVersionCode = Number(buildJson?.android?.versionCode ?? 1);

const iosBundleId = appJson.expo.ios?.bundleIdentifier ?? "com.example.exporouterstarter";
const androidPackage = appJson.expo.android?.package ?? "com.example.exporouterstarter";

const updatesUrl = process.env.EAS_UPDATE_URL;

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name,
  slug,
  scheme,
  version,
  orientation: "portrait",
  icon: "./assets/icon.png",
  splash: {
    image: "./assets/splash.png",
    resizeMode: "contain",
    backgroundColor: "#F7F4EF"
  },
  updates: updatesUrl ? { url: updatesUrl } : undefined,
  runtimeVersion: {
    policy: "appVersion"
  },
  ios: {
    ...(config.ios ?? {}),
    bundleIdentifier: iosBundleId,
    buildNumber: iosBuildNumber,
    supportsTablet: true
  },
  android: {
    ...(config.android ?? {}),
    package: androidPackage,
    versionCode: androidVersionCode,
    adaptiveIcon: {
      foregroundImage: "./assets/adaptive-icon.png",
      backgroundColor: "#F7F4EF"
    }
  },
  plugins: ["expo-router", "expo-dev-client"],
  experiments: {
    typedRoutes: true
  },
  extra: {
    targetEnv,
    channel,
    gitSha,
    appVersion: version,
    buildNumber: iosBuildNumber,
    versionCode: androidVersionCode,
    apiBaseUrl
  }
});

import fs from "fs";
import path from "path";

export function getProjectRoot() {
  return path.resolve(__dirname, "..", "..");
}

export function readJson<T>(filePath: string): T {
  const raw = fs.readFileSync(filePath, "utf8");
  return JSON.parse(raw) as T;
}

export function writeJson(filePath: string, data: unknown) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2) + "\n");
}

export function getReleaseMeta() {
  const root = getProjectRoot();
  const pkg = readJson<{ version: string }>(path.join(root, "package.json"));
  const build = readJson<{ ios?: { buildNumber?: string }; android?: { versionCode?: number } }>(
    path.join(root, "build.json")
  );

  return {
    version: pkg.version,
    buildNumber: String(build.ios?.buildNumber ?? "0"),
    versionCode: Number(build.android?.versionCode ?? 0),
    gitSha: process.env.GIT_SHA ?? "unknown"
  };
}

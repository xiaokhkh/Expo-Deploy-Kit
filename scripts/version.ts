import path from "path";

import { parseArgs } from "./lib/args";
import { getProjectRoot, readJson, writeJson } from "./lib/meta";

type PackageJson = {
  version: string;
};

type BuildJson = {
  ios?: { buildNumber?: string };
  android?: { versionCode?: number };
};

function bumpVersion(current: string, bump: string) {
  const [major, minor, patch] = current.split(".").map((value) => Number(value));

  if ([major, minor, patch].some((value) => Number.isNaN(value))) {
    throw new Error(`Invalid version: ${current}`);
  }

  if (bump === "major") {
    return `${major + 1}.0.0`;
  }

  if (bump === "minor") {
    return `${major}.${minor + 1}.0`;
  }

  if (bump === "patch") {
    return `${major}.${minor}.${patch + 1}`;
  }

  throw new Error("Bump must be major, minor, or patch.");
}

const args = parseArgs(process.argv.slice(2));
const root = getProjectRoot();
const pkgPath = path.join(root, "package.json");
const buildPath = path.join(root, "build.json");

const pkg = readJson<PackageJson>(pkgPath);
const build = readJson<BuildJson>(buildPath);

const bump = args.bump ?? args.type ?? "patch";
const setVersion = args.set;

const nextVersion = setVersion ? setVersion : bumpVersion(pkg.version, bump);

const nextBuildNumber = String(Number(build.ios?.buildNumber ?? 0) + 1);
const nextVersionCode = Number(build.android?.versionCode ?? 0) + 1;

writeJson(pkgPath, { ...pkg, version: nextVersion });
writeJson(buildPath, {
  ios: { buildNumber: nextBuildNumber },
  android: { versionCode: nextVersionCode }
});

console.log(`Version -> ${nextVersion}`);
console.log(`iOS buildNumber -> ${nextBuildNumber}`);
console.log(`Android versionCode -> ${nextVersionCode}`);

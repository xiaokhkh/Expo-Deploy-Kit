import fs from "fs";
import path from "path";

import { parseArgs } from "./lib/args";
import {
  mapPlatformForEas,
  requireValue,
  validateAndroidArtifact,
  validatePlatform,
  validateTargetEnv
} from "./lib/env";
import { exec } from "./lib/exec";
import { getProjectRoot, getReleaseMeta } from "./lib/meta";
import { appendRecord } from "./lib/release-records";

function readNotes(args: Record<string, string>) {
  if (args.notes) {
    return args.notes.trim();
  }

  if (args["notes-file"]) {
    const filePath = path.resolve(getProjectRoot(), args["notes-file"]);
    return fs.readFileSync(filePath, "utf8").trim();
  }

  if (process.env.RELEASE_NOTES) {
    return process.env.RELEASE_NOTES.trim();
  }

  return "";
}

const args = parseArgs(process.argv.slice(2));
const targetEnv = validateTargetEnv(
  requireValue("TARGET_ENV", args.targetEnv ?? process.env.TARGET_ENV)
);
const channel = requireValue("CHANNEL", args.channel ?? process.env.CHANNEL);
const platform = validatePlatform(
  requireValue("PLATFORM", args.platform ?? process.env.PLATFORM)
);
const easPlatform = mapPlatformForEas(platform);
const androidArtifactValue = args["android-artifact"] ?? process.env.ANDROID_ARTIFACT ?? "AAB";
const androidArtifact = validateAndroidArtifact(androidArtifactValue);
const notes = readNotes(args);

const meta = getReleaseMeta();
const createdAt = new Date().toISOString();
const id = createdAt.replace(/[-:T.Z]/g, "").slice(0, 14);

appendRecord({
  id,
  type: "PACKAGE",
  targetEnv,
  channel,
  platform,
  version: meta.version,
  buildNumber: meta.buildNumber,
  versionCode: meta.versionCode,
  gitSha: meta.gitSha,
  notes,
  createdAt
});

if (process.env.DRY_RUN === "1") {
  console.log("DRY_RUN enabled, skipping eas build.");
  process.exit(0);
}

const buildArgs = [
  "eas",
  "build",
  "--platform",
  easPlatform,
  "--profile",
  targetEnv,
  "--non-interactive"
];

if (platform === "android" || platform === "both") {
  buildArgs.push("--android-artifact", androidArtifact.toLowerCase());
}

exec("npx", buildArgs);

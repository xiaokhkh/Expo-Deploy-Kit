import fs from "fs";
import path from "path";

import { parseArgs } from "./lib/args";
import { mapPlatformForEas, requireValue, validatePlatform, validateTargetEnv } from "./lib/env";
import { exec } from "./lib/exec";
import { getProjectRoot, getReleaseMeta } from "./lib/meta";
import { appendRecord, findLatestRecord } from "./lib/release-records";

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
const range = requireValue("VERSION_RANGE", args.range ?? process.env.VERSION_RANGE);
const notes = readNotes(args);

if (!notes) {
  throw new Error("Release notes are required for HOTPATCH.");
}

const previousRecord = findLatestRecord({ targetEnv, channel, platform });
const rollbackTo = args["rollback-to"] ?? process.env.ROLLBACK_TO ?? previousRecord?.id;

if (!rollbackTo) {
  throw new Error("HOTPATCH requires a rollback point. Provide --rollback-to or publish a prior release.");
}

const meta = getReleaseMeta();
const createdAt = new Date().toISOString();
const id = createdAt.replace(/[-:T.Z]/g, "").slice(0, 14);

appendRecord({
  id,
  type: "HOTPATCH",
  targetEnv,
  channel,
  platform,
  version: meta.version,
  buildNumber: meta.buildNumber,
  versionCode: meta.versionCode,
  gitSha: meta.gitSha,
  notes,
  range,
  rollbackTo,
  createdAt
});

if (process.env.DRY_RUN === "1") {
  console.log("DRY_RUN enabled, skipping eas update.");
  process.exit(0);
}

exec("npx", [
  "eas",
  "update",
  "--channel",
  channel,
  "--platform",
  easPlatform,
  "--message",
  notes,
  "--non-interactive"
]);

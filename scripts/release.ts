import path from "path";

import { parseArgs } from "./lib/args";
import { requireValue, validateReleaseType } from "./lib/env";
import { exec } from "./lib/exec";
import { getProjectRoot } from "./lib/meta";

const args = parseArgs(process.argv.slice(2));
const releaseType = validateReleaseType(
  requireValue("RELEASE_TYPE", args.type ?? process.env.RELEASE_TYPE)
);

const scriptMap: Record<string, string> = {
  PACKAGE: "package.ts",
  OTA: "ota.ts",
  HOTPATCH: "hotpatch.ts"
};

const scriptName = scriptMap[releaseType];
const scriptPath = path.join(getProjectRoot(), "scripts", scriptName);

exec("npx", ["tsx", scriptPath]);

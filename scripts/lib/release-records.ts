import fs from "fs";
import path from "path";

import { getProjectRoot, readJson, writeJson } from "./meta";

export type ReleaseRecord = {
  id: string;
  type: "PACKAGE" | "HOTPATCH";
  targetEnv: string;
  channel: string;
  platform: string;
  version: string;
  buildNumber: string;
  versionCode: number;
  gitSha: string;
  notes?: string;
  range?: string;
  rollbackTo?: string;
  createdAt: string;
};

const recordPath = path.join(getProjectRoot(), "release", "records.json");

export function readRecords(): ReleaseRecord[] {
  if (!fs.existsSync(recordPath)) {
    return [];
  }

  return readJson<ReleaseRecord[]>(recordPath);
}

export function appendRecord(record: ReleaseRecord) {
  const records = readRecords();
  records.push(record);
  writeJson(recordPath, records);
  return record;
}

export function findLatestRecord(filter: {
  targetEnv: string;
  channel: string;
  platform: string;
}) {
  const records = readRecords();

  return records
    .slice()
    .reverse()
    .find(
      (record) =>
        record.targetEnv === filter.targetEnv &&
        record.channel === filter.channel &&
        record.platform === filter.platform
    );
}

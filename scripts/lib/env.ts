const allowedTargets = ["dev", "prod"] as const;
const allowedReleaseTypes = ["PACKAGE", "OTA", "HOTPATCH"] as const;
const allowedPlatforms = ["android", "ios", "both"] as const;
const allowedAndroidArtifacts = ["APK", "AAB"] as const;

export type TargetEnv = (typeof allowedTargets)[number];
export type ReleaseType = (typeof allowedReleaseTypes)[number];
export type Platform = (typeof allowedPlatforms)[number];
export type AndroidArtifact = (typeof allowedAndroidArtifacts)[number];

export function requireValue(name: string, value?: string) {
  if (!value) {
    throw new Error(`${name} is required.`);
  }

  return value;
}

export function validateTargetEnv(value: string): TargetEnv {
  if (allowedTargets.includes(value as TargetEnv)) {
    return value as TargetEnv;
  }

  throw new Error(`TARGET_ENV must be one of ${allowedTargets.join(", ")}.`);
}

export function validateReleaseType(value: string): ReleaseType {
  if (allowedReleaseTypes.includes(value as ReleaseType)) {
    return value as ReleaseType;
  }

  throw new Error(`RELEASE_TYPE must be one of ${allowedReleaseTypes.join(", ")}.`);
}

export function validatePlatform(value: string): Platform {
  if (allowedPlatforms.includes(value as Platform)) {
    return value as Platform;
  }

  throw new Error(`PLATFORM must be one of ${allowedPlatforms.join(", ")}.`);
}

export function validateAndroidArtifact(value: string): AndroidArtifact {
  if (allowedAndroidArtifacts.includes(value as AndroidArtifact)) {
    return value as AndroidArtifact;
  }

  throw new Error(`ANDROID_ARTIFACT must be one of ${allowedAndroidArtifacts.join(", ")}.`);
}

export function mapPlatformForEas(value: Platform) {
  return value === "both" ? "all" : value;
}

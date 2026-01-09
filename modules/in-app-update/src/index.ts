import { requireOptionalNativeModule } from "expo-modules-core";

export type InAppUpdateModule = {
  startUpdate: (apkUrl: string) => Promise<string>;
  isInstallPermissionGranted: () => Promise<boolean>;
  openInstallPermissionSettings: () => void;
  checkPlayUpdate: () => Promise<{
    available: boolean;
    availability: number;
    immediateAllowed: boolean;
    flexibleAllowed: boolean;
    availableVersionCode: number;
    packageName: string;
  }>;
  startPlayUpdate: (mode: "immediate" | "flexible") => Promise<string>;
};

export const InAppUpdate = requireOptionalNativeModule<InAppUpdateModule>(
  "InAppUpdate"
);

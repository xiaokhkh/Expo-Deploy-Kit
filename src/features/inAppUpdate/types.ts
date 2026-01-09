export type InAppUpdateStatus = "idle" | "starting" | "started" | "error";

export type InAppUpdateErrorCode =
  | "permission_check_failed"
  | "missing_apk_url"
  | "start_failed";

export type InAppUpdateState = {
  status: InAppUpdateStatus;
  errorCode?: InAppUpdateErrorCode;
  hasPermission: boolean;
};

export type PlayUpdateStatus =
  | "idle"
  | "checking"
  | "available"
  | "unavailable"
  | "starting"
  | "started"
  | "error";

export type PlayUpdateErrorCode =
  | "check_failed"
  | "start_failed"
  | "not_available"
  | "not_allowed";

export type PlayUpdateInfo = {
  available: boolean;
  availability: number;
  immediateAllowed: boolean;
  flexibleAllowed: boolean;
  availableVersionCode: number;
  packageName: string;
};

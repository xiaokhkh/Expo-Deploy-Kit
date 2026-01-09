import { useCallback, useEffect } from "react";
import { Platform } from "react-native";

import { InAppUpdate } from "@starter/in-app-update";

import { getAppConfig } from "../../services/config";

import { useInAppUpdateStore } from "./store";
import type { PlayUpdateInfo } from "./types";

export function useInAppUpdate() {
  const config = getAppConfig();
  const isAndroid = Platform.OS === "android";
  const isSupported = isAndroid && Boolean(InAppUpdate);
  const apkUrl = config.androidApkUrl;

  const status = useInAppUpdateStore((state) => state.status);
  const errorCode = useInAppUpdateStore((state) => state.errorCode);
  const hasPermission = useInAppUpdateStore((state) => state.hasPermission);
  const setStatus = useInAppUpdateStore((state) => state.setStatus);
  const setError = useInAppUpdateStore((state) => state.setError);
  const setPermission = useInAppUpdateStore((state) => state.setPermission);

  const refreshPermission = useCallback(async () => {
    if (!isSupported) {
      setPermission(false);
      return false;
    }

    try {
      const granted = await InAppUpdate!.isInstallPermissionGranted();
      setPermission(granted);
      return granted;
    } catch {
      setError("permission_check_failed");
      return false;
    }
  }, [isSupported, setError, setPermission]);

  useEffect(() => {
    refreshPermission().catch(() => undefined);
  }, [refreshPermission]);

  const openPermissionSettings = useCallback(() => {
    if (!isSupported) {
      return;
    }

    InAppUpdate!.openInstallPermissionSettings();
  }, [isSupported]);

  const startUpdate = useCallback(async () => {
    if (!isSupported) {
      return;
    }

    if (!apkUrl) {
      setError("missing_apk_url");
      return;
    }

    setError(undefined);
    setStatus("starting");

    try {
      await InAppUpdate!.startUpdate(apkUrl);
      setStatus("started");
    } catch {
      setError("start_failed");
    }
  }, [apkUrl, isSupported, setError, setStatus]);

  return {
    isSupported,
    apkUrl,
    status,
    errorCode,
    hasPermission,
    startUpdate,
    refreshPermission,
    openPermissionSettings
  };
}

export function usePlayUpdate() {
  const isAndroid = Platform.OS === "android";
  const isSupported = isAndroid && Boolean(InAppUpdate);

  const playStatus = useInAppUpdateStore((state) => state.playStatus);
  const playErrorCode = useInAppUpdateStore((state) => state.playErrorCode);
  const playInfo = useInAppUpdateStore((state) => state.playInfo);
  const setPlayStatus = useInAppUpdateStore((state) => state.setPlayStatus);
  const setPlayError = useInAppUpdateStore((state) => state.setPlayError);
  const setPlayInfo = useInAppUpdateStore((state) => state.setPlayInfo);

  const refreshPlayUpdate = useCallback(async () => {
    if (!isSupported) {
      setPlayStatus("unavailable");
      return;
    }

    setPlayError(undefined);
    setPlayStatus("checking");

    try {
      const info = (await InAppUpdate!.checkPlayUpdate()) as PlayUpdateInfo;
      setPlayInfo(info);
      setPlayStatus(info.available ? "available" : "unavailable");
    } catch {
      setPlayError("check_failed");
    }
  }, [isSupported, setPlayError, setPlayInfo, setPlayStatus]);

  useEffect(() => {
    refreshPlayUpdate().catch(() => undefined);
  }, [refreshPlayUpdate]);

  const startPlayUpdate = useCallback(
    async (mode: "immediate" | "flexible") => {
      if (!isSupported) {
        return;
      }

      if (!playInfo?.available) {
        setPlayError("not_available");
        return;
      }

      const allowed = mode === "immediate" ? playInfo.immediateAllowed : playInfo.flexibleAllowed;
      if (!allowed) {
        setPlayError("not_allowed");
        return;
      }

      setPlayError(undefined);
      setPlayStatus("starting");

      try {
        await InAppUpdate!.startPlayUpdate(mode);
        setPlayStatus("started");
      } catch {
        setPlayError("start_failed");
      }
    },
    [isSupported, playInfo, setPlayError, setPlayStatus]
  );

  return {
    isSupported,
    playStatus,
    playErrorCode,
    playInfo,
    refreshPlayUpdate,
    startPlayUpdate
  };
}

import { create } from "zustand";

import type {
  InAppUpdateErrorCode,
  InAppUpdateState,
  InAppUpdateStatus,
  PlayUpdateErrorCode,
  PlayUpdateInfo,
  PlayUpdateStatus
} from "./types";

type InAppUpdateStore = InAppUpdateState & {
  setStatus: (status: InAppUpdateStatus) => void;
  setError: (code?: InAppUpdateErrorCode) => void;
  setPermission: (hasPermission: boolean) => void;
  playStatus: PlayUpdateStatus;
  playErrorCode?: PlayUpdateErrorCode;
  playInfo?: PlayUpdateInfo;
  setPlayStatus: (status: PlayUpdateStatus) => void;
  setPlayError: (code?: PlayUpdateErrorCode) => void;
  setPlayInfo: (info?: PlayUpdateInfo) => void;
};

export const useInAppUpdateStore = create<InAppUpdateStore>((set) => ({
  status: "idle",
  hasPermission: true,
  errorCode: undefined,
  playStatus: "idle",
  playErrorCode: undefined,
  playInfo: undefined,
  setStatus: (status) => set({ status }),
  setError: (code) => set({ errorCode: code, status: code ? "error" : "idle" }),
  setPermission: (hasPermission) => set({ hasPermission }),
  setPlayStatus: (status) => set({ playStatus: status }),
  setPlayError: (code) => set({ playErrorCode: code, playStatus: code ? "error" : "idle" }),
  setPlayInfo: (info) => set({ playInfo: info })
}));

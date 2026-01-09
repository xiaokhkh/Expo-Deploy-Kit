import { Pressable, Text, View } from "react-native";
import { useTranslation } from "react-i18next";

import { useTheme } from "../../../style/theme";
import type { PlayUpdateErrorCode, PlayUpdateInfo, PlayUpdateStatus } from "../types";

type PlayUpdateModel = {
  isSupported: boolean;
  playStatus: PlayUpdateStatus;
  playErrorCode?: PlayUpdateErrorCode;
  playInfo?: PlayUpdateInfo;
  startPlayUpdate: (mode: "immediate" | "flexible") => void;
  refreshPlayUpdate: () => void;
};

type Props = {
  update: PlayUpdateModel;
};

export function PlayUpdateCard({ update }: Props) {
  const { t } = useTranslation();
  const theme = useTheme();

  const isBusy = update.playStatus === "checking" || update.playStatus === "starting";
  const availableVersion = update.playInfo?.availableVersionCode;

  return (
    <View
      style={{
        borderWidth: 1,
        borderColor: theme.colors.border,
        borderRadius: theme.radius.md,
        padding: theme.spacing.md,
        backgroundColor: theme.colors.surface,
        gap: theme.spacing.sm
      }}
    >
      <View style={{ gap: theme.spacing.xs }}>
        <Text style={{ fontWeight: "600" }}>{t("settings.playUpdate.title")}</Text>
        <Text style={{ color: theme.colors.textMuted }}>{t("settings.playUpdate.subtitle")}</Text>
      </View>

      {!update.isSupported ? (
        <Text style={{ color: theme.colors.textMuted }}>{t("settings.playUpdate.unsupported")}</Text>
      ) : update.playStatus === "checking" ? (
        <Text style={{ color: theme.colors.textMuted }}>{t("settings.playUpdate.checking")}</Text>
      ) : update.playStatus === "unavailable" ? (
        <Text style={{ color: theme.colors.textMuted }}>{t("settings.playUpdate.unavailable")}</Text>
      ) : update.playStatus === "available" || update.playStatus === "started" ? (
        <Text style={{ color: theme.colors.textMuted }}>
          {t("settings.playUpdate.available", {
            value: availableVersion ?? "-"
          })}
        </Text>
      ) : null}

      {update.playErrorCode ? (
        <Text style={{ color: theme.colors.textMuted }}>
          {t(`settings.playUpdate.errors.${update.playErrorCode}`)}
        </Text>
      ) : null}

      {update.isSupported ? (
        <View style={{ flexDirection: "row", gap: theme.spacing.sm, flexWrap: "wrap" }}>
          <Pressable
            disabled={isBusy}
            onPress={() => update.startPlayUpdate("immediate")}
            style={({ pressed }) => ({
              paddingVertical: theme.spacing.xs,
              paddingHorizontal: theme.spacing.md,
              borderRadius: theme.radius.sm,
              backgroundColor: pressed ? theme.colors.surfaceMuted : theme.colors.surface,
              borderWidth: 1,
              borderColor: theme.colors.border,
              opacity: isBusy ? 0.6 : 1
            })}
          >
            <Text>{t("settings.playUpdate.immediate")}</Text>
          </Pressable>
          <Pressable
            disabled={isBusy}
            onPress={() => update.startPlayUpdate("flexible")}
            style={({ pressed }) => ({
              paddingVertical: theme.spacing.xs,
              paddingHorizontal: theme.spacing.md,
              borderRadius: theme.radius.sm,
              backgroundColor: pressed ? theme.colors.surfaceMuted : theme.colors.surface,
              borderWidth: 1,
              borderColor: theme.colors.border,
              opacity: isBusy ? 0.6 : 1
            })}
          >
            <Text>{t("settings.playUpdate.flexible")}</Text>
          </Pressable>
          <Pressable
            disabled={isBusy}
            onPress={update.refreshPlayUpdate}
            style={({ pressed }) => ({
              paddingVertical: theme.spacing.xs,
              paddingHorizontal: theme.spacing.md,
              borderRadius: theme.radius.sm,
              backgroundColor: pressed ? theme.colors.surfaceMuted : theme.colors.surface,
              borderWidth: 1,
              borderColor: theme.colors.border,
              opacity: isBusy ? 0.6 : 1
            })}
          >
            <Text>{t("settings.playUpdate.checkButton")}</Text>
          </Pressable>
        </View>
      ) : null}
    </View>
  );
}

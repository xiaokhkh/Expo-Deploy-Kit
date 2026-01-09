import { Pressable, Text, View } from "react-native";
import { useTranslation } from "react-i18next";

import { useTheme } from "../../../style/theme";
import type { InAppUpdateErrorCode, InAppUpdateStatus } from "../types";

type InAppUpdateModel = {
  isSupported: boolean;
  apkUrl: string;
  status: InAppUpdateStatus;
  errorCode?: InAppUpdateErrorCode;
  hasPermission: boolean;
  startUpdate: () => void;
  openPermissionSettings: () => void;
};

type Props = {
  update: InAppUpdateModel;
};

export function InAppUpdateCard({ update }: Props) {
  const { t } = useTranslation();
  const theme = useTheme();

  const isBusy = update.status === "starting";

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
        <Text style={{ fontWeight: "600" }}>{t("settings.update.title")}</Text>
        <Text style={{ color: theme.colors.textMuted }}>{t("settings.update.subtitle")}</Text>
      </View>

      {!update.isSupported ? (
        <Text style={{ color: theme.colors.textMuted }}>{t("settings.update.unsupported")}</Text>
      ) : !update.apkUrl ? (
        <Text style={{ color: theme.colors.textMuted }}>{t("settings.update.missingUrl")}</Text>
      ) : !update.hasPermission ? (
        <View style={{ gap: theme.spacing.sm }}>
          <Text style={{ color: theme.colors.textMuted }}>{t("settings.update.permissionRequired")}</Text>
          <Pressable
            onPress={update.openPermissionSettings}
            style={({ pressed }) => ({
              paddingVertical: theme.spacing.xs,
              paddingHorizontal: theme.spacing.md,
              borderRadius: theme.radius.sm,
              backgroundColor: pressed ? theme.colors.surfaceMuted : theme.colors.surface,
              borderWidth: 1,
              borderColor: theme.colors.border
            })}
          >
            <Text>{t("settings.update.permissionButton")}</Text>
          </Pressable>
        </View>
      ) : (
        <View style={{ gap: theme.spacing.sm }}>
          {update.status === "starting" ? (
            <Text style={{ color: theme.colors.textMuted }}>{t("settings.update.starting")}</Text>
          ) : update.status === "started" ? (
            <Text style={{ color: theme.colors.textMuted }}>{t("settings.update.started")}</Text>
          ) : update.errorCode ? (
            <Text style={{ color: theme.colors.textMuted }}>
              {t(`settings.update.errors.${update.errorCode}`)}
            </Text>
          ) : null}

          <Pressable
            disabled={isBusy}
            onPress={update.startUpdate}
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
            <Text>{t("settings.update.startButton")}</Text>
          </Pressable>
        </View>
      )}
    </View>
  );
}

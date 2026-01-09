import { Pressable, Text, View } from "react-native";
import { useTranslation } from "react-i18next";

import { useTheme } from "../../../style/theme";
import type { SampleResponse } from "../types";

type SampleState = {
  apiReady: boolean;
  data?: SampleResponse;
  error?: unknown;
  isLoading: boolean;
  count: number;
  increment: () => void;
  decrement: () => void;
};

type Props = {
  sample: SampleState;
};

export function SampleCard({ sample }: Props) {
  const { t } = useTranslation();
  const theme = useTheme();

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
      <Text style={{ fontWeight: "600" }}>{t("home.sample.title")}</Text>
      <Text>{t("home.sample.apiReady", { value: sample.apiReady })}</Text>

      {!sample.apiReady ? (
        <Text style={{ color: theme.colors.textMuted }}>{t("home.sample.apiMissing")}</Text>
      ) : sample.isLoading ? (
        <Text style={{ color: theme.colors.textMuted }}>{t("home.sample.loading")}</Text>
      ) : sample.error ? (
        <Text style={{ color: theme.colors.textMuted }}>{t("home.sample.error")}</Text>
      ) : sample.data ? (
        <Text style={{ color: theme.colors.textMuted }}>
          {sample.data.message ?? t("home.sample.empty")}
        </Text>
      ) : (
        <Text style={{ color: theme.colors.textMuted }}>{t("home.sample.empty")}</Text>
      )}

      <Text>{t("home.sample.counter", { value: sample.count })}</Text>
      <View style={{ flexDirection: "row", gap: theme.spacing.sm }}>
        <Pressable
          onPress={sample.decrement}
          style={({ pressed }) => ({
            paddingVertical: theme.spacing.xs,
            paddingHorizontal: theme.spacing.md,
            borderRadius: theme.radius.sm,
            backgroundColor: pressed ? theme.colors.surfaceMuted : theme.colors.surface,
            borderWidth: 1,
            borderColor: theme.colors.border
          })}
        >
          <Text>{t("home.sample.decrement")}</Text>
        </Pressable>
        <Pressable
          onPress={sample.increment}
          style={({ pressed }) => ({
            paddingVertical: theme.spacing.xs,
            paddingHorizontal: theme.spacing.md,
            borderRadius: theme.radius.sm,
            backgroundColor: pressed ? theme.colors.surfaceMuted : theme.colors.surface,
            borderWidth: 1,
            borderColor: theme.colors.border
          })}
        >
          <Text>{t("home.sample.increment")}</Text>
        </Pressable>
      </View>
    </View>
  );
}

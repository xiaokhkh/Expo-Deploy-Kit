import { Text, View } from "react-native";
import { useTranslation } from "react-i18next";

import { Screen } from "../../src/components/ui/Screen";
import { SampleCard } from "../../src/features/sample/components/SampleCard";
import { useSample } from "../../src/features/sample/hooks";
import { getAppConfig } from "../../src/services/config";
import { useTheme } from "../../src/style/theme";

export default function HomeScreen() {
  const { t } = useTranslation();
  const theme = useTheme();
  const sample = useSample();
  const config = getAppConfig();

  return (
    <Screen>
      <View style={{ gap: theme.spacing.md }}>
        <View style={{ gap: theme.spacing.xs }}>
          <Text style={{ fontSize: 24, fontWeight: "600", color: theme.colors.textPrimary }}>
            {t("home.header.title")}
          </Text>
          <Text style={{ color: theme.colors.textMuted }}>{t("home.header.subtitle")}</Text>
        </View>

        <View
          style={{
            borderWidth: 1,
            borderColor: theme.colors.border,
            borderRadius: theme.radius.md,
            padding: theme.spacing.md,
            backgroundColor: theme.colors.surface
          }}
        >
          <Text style={{ fontWeight: "600", marginBottom: theme.spacing.sm }}>
            {t("home.meta.title")}
          </Text>
          <View style={{ gap: theme.spacing.xs }}>
            <Text>{t("home.meta.env", { value: config.targetEnv })}</Text>
            <Text>{t("home.meta.channel", { value: config.channel })}</Text>
            <Text>{t("home.meta.version", { value: config.appVersion })}</Text>
            <Text>{t("home.meta.build", { value: config.buildNumber })}</Text>
            <Text>{t("home.meta.sha", { value: config.gitSha })}</Text>
          </View>
        </View>

        <SampleCard sample={sample} />
      </View>
    </Screen>
  );
}

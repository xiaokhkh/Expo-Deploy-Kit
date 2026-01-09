import { Link } from "expo-router";
import { Text, View } from "react-native";
import { useTranslation } from "react-i18next";

import { Screen } from "../src/components/ui/Screen";
import { useTheme } from "../src/style/theme";

export default function NotFoundScreen() {
  const { t } = useTranslation();
  const theme = useTheme();

  return (
    <Screen>
      <View style={{ gap: theme.spacing.md }}>
        <Text style={{ fontSize: 24, fontWeight: "600", color: theme.colors.textPrimary }}>
          {t("notFound.header.title")}
        </Text>
        <Text style={{ color: theme.colors.textMuted }}>{t("notFound.header.subtitle")}</Text>
        <Link href="/" style={{ color: theme.colors.accent }}>
          {t("notFound.action.home")}
        </Link>
      </View>
    </Screen>
  );
}

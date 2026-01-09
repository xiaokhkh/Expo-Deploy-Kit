import { Pressable, Text, View } from "react-native";
import { useTranslation } from "react-i18next";

import { Screen } from "../../src/components/ui/Screen";
import { InAppUpdateCard } from "../../src/features/inAppUpdate/components/InAppUpdateCard";
import { PlayUpdateCard } from "../../src/features/inAppUpdate/components/PlayUpdateCard";
import { useInAppUpdate, usePlayUpdate } from "../../src/features/inAppUpdate/hooks";
import { setLanguage, SUPPORTED_LANGUAGES } from "../../src/i18n";
import { useTheme } from "../../src/style/theme";

export default function SettingsScreen() {
  const { t, i18n } = useTranslation();
  const theme = useTheme();
  const update = useInAppUpdate();
  const playUpdate = usePlayUpdate();

  return (
    <Screen>
      <View style={{ gap: theme.spacing.lg }}>
        <View style={{ gap: theme.spacing.xs }}>
          <Text style={{ fontSize: 24, fontWeight: "600", color: theme.colors.textPrimary }}>
            {t("settings.header.title")}
          </Text>
          <Text style={{ color: theme.colors.textMuted }}>{t("settings.header.subtitle")}</Text>
        </View>

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
          <Text style={{ fontWeight: "600" }}>{t("settings.language.title")}</Text>
          <Text>{t("settings.language.current", { value: i18n.language })}</Text>
          <View style={{ flexDirection: "row", gap: theme.spacing.sm }}>
            {SUPPORTED_LANGUAGES.map((lang) => (
              <Pressable
                key={lang}
                onPress={() => setLanguage(lang)}
                style={({ pressed }) => ({
                  paddingVertical: theme.spacing.xs,
                  paddingHorizontal: theme.spacing.md,
                  borderRadius: theme.radius.sm,
                  backgroundColor:
                    i18n.language === lang
                      ? theme.colors.accent
                      : pressed
                        ? theme.colors.surfaceMuted
                        : theme.colors.surface,
                  borderWidth: 1,
                  borderColor: theme.colors.border
                })}
              >
                <Text style={{ color: theme.colors.textPrimary }}>
                  {t(`settings.language.${lang}`)}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>

        <InAppUpdateCard update={update} />
        <PlayUpdateCard update={playUpdate} />
      </View>
    </Screen>
  );
}

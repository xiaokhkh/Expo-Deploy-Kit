import { Tabs } from "expo-router";
import { useTranslation } from "react-i18next";

export default function TabsLayout() {
  const { t } = useTranslation();

  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen
        name="index"
        options={{
          title: t("tabs.home.title")
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: t("tabs.settings.title")
        }}
      />
    </Tabs>
  );
}

import { type ReactNode } from "react";
import { SafeAreaView, ScrollView } from "react-native";

import { useTheme } from "../../style/theme";

export function Screen({ children }: { children: ReactNode }) {
  const theme = useTheme();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <ScrollView contentContainerStyle={{ padding: theme.spacing.lg, gap: theme.spacing.lg }}>
        {children}
      </ScrollView>
    </SafeAreaView>
  );
}

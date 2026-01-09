import { useEffect, useState, type ReactNode } from "react";
import { ActivityIndicator, View } from "react-native";
import { I18nextProvider } from "react-i18next";
import { SWRConfig } from "swr";

import i18n, { initI18n } from "../../i18n";
import { fetchJson } from "../../services/http/fetcher";
import { ThemeProvider } from "../../style/theme";
import { colors } from "../../style/tokens";
import { AppErrorBoundary } from "../biz/AppErrorBoundary";

type Props = {
  children: ReactNode;
};

export function AppProviders({ children }: Props) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let mounted = true;

    initI18n()
      .catch(() => undefined)
      .finally(() => {
        if (mounted) {
          setReady(true);
        }
      });

    return () => {
      mounted = false;
    };
  }, []);

  if (!ready) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator color={colors.accent} />
      </View>
    );
  }

  return (
    <I18nextProvider i18n={i18n}>
      <ThemeProvider>
        <SWRConfig
          value={{
            fetcher: fetchJson,
            shouldRetryOnError: false,
            revalidateOnFocus: false
          }}
        >
          <AppErrorBoundary>{children}</AppErrorBoundary>
        </SWRConfig>
      </ThemeProvider>
    </I18nextProvider>
  );
}

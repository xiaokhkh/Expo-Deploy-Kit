import { Component, type ReactNode } from "react";
import { Pressable, Text, View } from "react-native";

import i18n from "../../i18n";
import { colors, radius, spacing } from "../../style/tokens";

type Props = {
  children: ReactNode;
};

type State = {
  hasError: boolean;
};

export class AppErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  handleReset = () => {
    this.setState({ hasError: false });
  };

  render() {
    if (!this.state.hasError) {
      return this.props.children;
    }

    const title = i18n.isInitialized ? i18n.t("common.error.title") : "";
    const retry = i18n.isInitialized ? i18n.t("common.error.retry") : "";

    return (
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: colors.background,
          padding: spacing.lg,
          gap: spacing.md
        }}
      >
        {title ? <Text style={{ fontSize: 18, fontWeight: "600" }}>{title}</Text> : null}
        <Pressable
          onPress={this.handleReset}
          style={({ pressed }) => ({
            paddingVertical: spacing.xs,
            paddingHorizontal: spacing.md,
            borderRadius: radius.sm,
            backgroundColor: pressed ? colors.surfaceMuted : colors.surface,
            borderWidth: 1,
            borderColor: colors.border
          })}
        >
          <Text>{retry}</Text>
        </Pressable>
      </View>
    );
  }
}

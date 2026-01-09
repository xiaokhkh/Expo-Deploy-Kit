import { createContext, useContext, type ReactNode } from "react";

import { colors, radius, spacing } from "./tokens";

export type Theme = {
  colors: typeof colors;
  spacing: typeof spacing;
  radius: typeof radius;
};

const defaultTheme: Theme = { colors, spacing, radius };

const ThemeContext = createContext<Theme>(defaultTheme);

export function ThemeProvider({ children }: { children: ReactNode }) {
  return <ThemeContext.Provider value={defaultTheme}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  return useContext(ThemeContext);
}

import { Text } from "react-native";
import { useTranslation } from "react-i18next";

import { Screen } from "../../src/components/ui/Screen";

export default function SignInScreen() {
  const { t } = useTranslation();

  return (
    <Screen>
      <Text>{t("auth.signIn.title")}</Text>
    </Screen>
  );
}

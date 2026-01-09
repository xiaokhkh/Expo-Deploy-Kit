import { requireOptionalNativeModule } from "expo-modules-core";

export type NativeExampleModule = {
  hello(name: string): string;
  pi: number;
};

export const NativeExample = requireOptionalNativeModule<NativeExampleModule>("NativeExample");

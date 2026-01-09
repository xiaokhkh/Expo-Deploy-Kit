import { create } from "zustand";

type SampleStore = {
  count: number;
  increment: () => void;
  decrement: () => void;
};

export const useSampleStore = create<SampleStore>((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: Math.max(0, state.count - 1) }))
}));

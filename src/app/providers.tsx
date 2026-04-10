"use client";

import { Provider } from "react-redux";

import { store } from "@/store/store";
import type { ProvidersProps } from "@/types/component-props";

export function Providers({ children }: ProvidersProps) {
  return <Provider store={store}>{children}</Provider>;
}

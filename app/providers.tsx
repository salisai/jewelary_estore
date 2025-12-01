'use client';

import type { ReactNode } from "react";
import { StoreProvider } from "@/context/StoreContext";

export const Providers = ({ children }: { children: ReactNode }) => {
  return <StoreProvider>{children}</StoreProvider>;
};


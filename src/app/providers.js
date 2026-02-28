"use client";
import { SessionProvider } from "next-auth/react";
import { Providers } from "./redux/provider";
import { appUserCheck } from "./redux/appUserCheck";
import { store } from "./redux/store";

export const SessionProviderWrapper = ({ children }) => {
  return (
    <SessionProvider>
      <Providers store={store}>{children}</Providers>
    </SessionProvider>
  );
};

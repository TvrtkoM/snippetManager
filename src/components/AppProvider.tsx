"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React, { PropsWithChildren } from "react";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Theme } from "@radix-ui/themes";

const queryClient = new QueryClient();

function AppProvider({ children }: PropsWithChildren) {
  return (
    <Theme>
      <QueryClientProvider client={queryClient}>
        {process.env.NODE_ENV === "development" && (
          <ReactQueryDevtools initialIsOpen={false} />
        )}
        {children}
      </QueryClientProvider>
    </Theme>
  );
}

export default AppProvider;

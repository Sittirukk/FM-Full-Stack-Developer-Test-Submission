"use client";

import { ApolloProvider as BaseApolloProvider } from "@apollo/client";
import type { ReactNode } from "react";
import { useMemo } from "react";
import { createApolloClient } from "@/lib/apollo-client";

export function ApolloProvider({ children }: { children: ReactNode }) {
  const client = useMemo(() => createApolloClient(), []);

  return <BaseApolloProvider client={client}>{children}</BaseApolloProvider>;
}

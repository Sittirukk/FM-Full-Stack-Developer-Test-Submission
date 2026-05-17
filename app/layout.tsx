import type { Metadata } from "next";
import type { ReactNode } from "react";
import { ApolloProvider } from "@/components/ApolloProvider";
import "./globals.css";

export const metadata: Metadata = {
  title: "Search Pokemon FM Tech",
  description: "Search Pokemon data with Next.js, Apollo Client, and GraphQL.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ApolloProvider>{children}</ApolloProvider>
      </body>
    </html>
  );
}

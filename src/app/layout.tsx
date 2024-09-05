import "@/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";

import { TRPCReactProvider } from "@/trpc/react";
import { ChatProvider } from "@/context/chat-context";

export const metadata: Metadata = {
  title: "DumbBot - Artificial Unintelligence",
  description: "World's unsmartest chatbot",
  icons: [{ rel: "icon", url: "/favicon.png" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <body>
        <TRPCReactProvider>
          <ChatProvider>{children}</ChatProvider>
        </TRPCReactProvider>
      </body>
    </html>
  );
}

"use client";
import "dotenv/config";

import "./globals.css";
import { Provider } from "react-redux";
import { store } from "@store";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body>
        <Provider store={store}>
          <main className="flex-1">{children}</main>
        </Provider>
      </body>
    </html>
  );
}

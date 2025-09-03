import "./globals.css";
import { ReduxProvider } from "@components/providers/ReduxProvider";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body>
        <ReduxProvider>
          <main className="flex-1">{children}</main>
        </ReduxProvider>
      </body>
    </html>
  );
}

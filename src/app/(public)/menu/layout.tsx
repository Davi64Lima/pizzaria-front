export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className="flex flex-col min-h-screen font-sans">
        <main className="flex-1">{children}</main>
      </body>
    </html>
  );
}


import '@app/globals.css';
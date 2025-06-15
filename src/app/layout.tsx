
import {AppProvider} from '@/context/index'
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import './globals.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className="flex flex-col min-h-screen font-sans">
          <AppProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          </AppProvider>
      </body>
    </html>
  );
}

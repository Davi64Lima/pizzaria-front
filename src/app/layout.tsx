export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className="flex flex-col min-h-screen font-sans">
        <CartProvider>
          <PizzaProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          </PizzaProvider>
        </CartProvider>
      </body>
    </html>
  );
}

import { PizzaProvider } from "@/context/PizzaContext";
import { CartProvider } from "@/context/CartContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import './globals.css';
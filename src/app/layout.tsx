'use client'

import {AppProvider} from '@context/index'
import Header from "@components/Header";
import Footer from "@components/Footer";
import './globals.css';
import { Provider } from 'react-redux';
import { store } from '@store';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className="flex flex-col min-h-screen font-sans">
          <Provider store={store}>
          <AppProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          </AppProvider>
          </Provider>
      </body>
    </html>
  );
}

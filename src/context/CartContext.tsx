"use client";

import {  IProduct } from "@/types/pizza";
import { createContext, useContext, useState, useEffect } from "react";



interface CartContextType {
  cart: IProduct[];
  addToCart: (item: IProduct) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  decrementFromCart: (id: string) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<IProduct[]>([]);

  // Carregar carrinho salvo no localStorage
  useEffect(() => {
    const stored = localStorage.getItem("cart");
    if (stored) setCart(JSON.parse(stored));
  }, []);

  // Salvar no localStorage sempre que o carrinho mudar
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (item: IProduct) => {
    setCart((prev) => {
      const exists = prev.find((i) => i.id === item.id);
      if (exists) {
        return prev.map((i) =>
          i.id === item.id
            ? { ...i, quantity: (i.quantity ?? 1) + (1) }
            : i
        );
      }
      return [...prev, item];
    });
  };

  const decrementFromCart = (id: string) => {
    setCart((prev) => {
      const exists = prev.find((i) => i.id === id);
      if (exists) {
        if (exists.quantity === 1) {
          removeFromCart(id);
        }
        return prev.map((i) =>
          i.id === id
            ? { ...i, quantity: (i.quantity ?? 1) - (1) }
            : i
        );
      }
      return [...prev];
    });
  };

  const removeFromCart = (id: string) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const clearCart = () => setCart([]);

  return (
    <CartContext.Provider value={{ cart, addToCart, decrementFromCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within a CartProvider");
  return context;
}

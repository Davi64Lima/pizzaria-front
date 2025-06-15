'use client'

import React, { createContext, useContext, useEffect, useState } from "react";
import { IAddress, IProduct, IUser, IOrderPaymentMethod, IOrderStatus } from "@/@types/pizza";
import { v4 as uuidv4 } from 'uuid';

export type IOrder = {
  id: string;
  products: IProduct[],
  address: IAddress,
  user: IUser,
  value: number,
  paymentMethod: IOrderPaymentMethod
  status: IOrderStatus,
}

export type TOrderContex = {
  order: IOrder
  setOrder: React.Dispatch<React.SetStateAction<IOrder>>
  generateOrder: (products: IProduct[], user: IUser, address: IAddress, paymentMethod: IOrderPaymentMethod) => void
  updateOrderStatus: (status: IOrderStatus) => void
  clearOrder: () => void
}

const OrderContext = createContext<TOrderContex>({} as TOrderContex);

export const OrderProvider = ({ children }: { children: React.ReactNode }) => {
  const initialOrder: IOrder = {
    id: uuidv4(),
    products: [],
    address: {
      street: "",
      number: "",
      complement: "",
      neighborhood: "",
      city: "",
      state: "",
      zipcode: "",
    },
    user: {
      name: "",
      phone: "",
    },
    value: 0,
    paymentMethod: "cash",
    status: "pending",
  };


    const [order, setOrder] = useState<IOrder>(initialOrder);

    useEffect(() => {
        // Só tenta acessar localStorage no browser
        if (typeof window !== "undefined") {
            const stored = localStorage.getItem("order");
            if (stored) {
                setOrder(JSON.parse(stored));
            }
        }
    }, []);

    useEffect(() => {
        if (typeof window !== "undefined") {
            localStorage.setItem("order", JSON.stringify(order));
        }
    }, [order]);

  const generateOrder = (products: IProduct[], user: IUser, address: IAddress, paymentMethod: IOrderPaymentMethod) => {
    const totalOrderValue = products.reduce((acc, i) => acc + (i.price * (i.quantity ?? 1)), 0);
    setOrder({
      id: uuidv4(),
      products,
      address,
      user,
      value: totalOrderValue,
      paymentMethod,
      status: "pending",
    });
  };

  const updateOrderStatus = (status: IOrderStatus) => {
    setOrder(prev => ({ ...prev, status }));
  };

  const clearOrder = () => {
    setOrder(initialOrder);
  };

  return (
    <OrderContext.Provider value={{ order, setOrder, generateOrder, updateOrderStatus, clearOrder }}>
      {children}
    </OrderContext.Provider>
  );
};


export const useOrder = () => {
  const context = useContext(OrderContext)
  if (!context) throw new Error("useOrder must be used within a OrderProvider");

  return context
}
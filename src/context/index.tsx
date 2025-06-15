import React from "react"
import { CartProvider } from "./CartContext"
import { PizzaProvider } from "./PizzaContext";
import { OrderProvider } from "./OrderContext";

export const AppProvider = ({children}: {children:React.ReactNode}) => {
    return <OrderProvider><CartProvider><PizzaProvider>{children}</PizzaProvider></CartProvider></OrderProvider>
};
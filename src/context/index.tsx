import React from "react"
import { CartProvider } from "./CartContext"
import { PizzaProvider } from "./PizzaContext";

export const AppProvider = ({children}: {children:React.ReactNode}) => {
    return <CartProvider><PizzaProvider>{children}</PizzaProvider></CartProvider>
};
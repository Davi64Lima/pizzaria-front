import React from "react"
import { CartProvider } from "./CartContext"
import { PizzaProvider } from "./PizzaContext";
import { OrderProvider } from "./OrderContext";
import { UserProvider } from "./UserContext";

export const AppProvider = ({children}: {children:React.ReactNode}) => {
    return <UserProvider><OrderProvider><CartProvider><PizzaProvider>{children}</PizzaProvider></CartProvider></OrderProvider></UserProvider>
};
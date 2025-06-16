import React from "react"
import { PizzaProvider } from "./PizzaContext";
import { OrderProvider } from "./OrderContext";
import { UserProvider } from "./UserContext";

export const AppProvider = ({children}: {children:React.ReactNode}) => {
    return <UserProvider><OrderProvider><PizzaProvider>{children}</PizzaProvider></OrderProvider></UserProvider>
};
import React from "react"
import { OrderProvider } from "./OrderContext";
import { UserProvider } from "./UserContext";

export const AppProvider = ({children}: {children:React.ReactNode}) => {
    return <UserProvider><OrderProvider>{children}</OrderProvider></UserProvider>
};
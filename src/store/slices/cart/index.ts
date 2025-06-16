import { IProduct } from "@@types/pizza";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ESliceNames } from "../types";

const initialState = {
    cart:[] as IProduct[]
}



export const cartSlice = createSlice({
    name : ESliceNames.CART,
    initialState,
    reducers : {
        saveCart: (state, action)=>{
            state.cart = action.payload
        },
        addToCart: (state, action:PayloadAction<IProduct>)=>{
            const exists = state.cart.find((product) => product.name === action.payload.name)
            if (exists) {
                state.cart = state.cart.map((product) =>
                    product.name === action.payload.name
                        ? { ...product, quantity: (product.quantity ?? 1) + 1 }
                        : product
                );
            } else {
                state.cart.push({ ...action.payload, quantity: 1 });
            }
        },
        removeFromCart: (state,action:PayloadAction<string>) => {
            state.cart = state.cart.filter((product)=> product.name !== action.payload)
        },
        decrementFromCart: (state, action: PayloadAction<string>) => {
            const exists = state.cart.find((product) => product.name === action.payload);
            if (exists) {
                if ((exists.quantity ?? 1) === 1) {
                    state.cart = state.cart.filter((product) => product.name !== action.payload);
                } else {
                    state.cart = state.cart.map((product) =>
                        product.name === action.payload
                            ? { ...product, quantity: (product.quantity ?? 2) - 1 }
                            : product
                    );
                }
            }
        },
        clearCart: (state)=>{
            state.cart=[]
        }
        
    }
})

export const {reducer:cartSliceReducer,actions:cartSliceActions} = cartSlice



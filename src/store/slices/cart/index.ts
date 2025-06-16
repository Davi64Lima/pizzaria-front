import { IProduct } from "@@types/pizza";
import { createSlice } from "@reduxjs/toolkit";
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
        }
    }
})

export const {reducer:cartSliceReducer,actions:cartSliceActions} = cartSlice